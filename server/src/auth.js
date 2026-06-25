import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "./db.js";

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "user"
    },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" }
  );
}

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const lowerEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  // Assign admin role if email matches special pattern or env variable
  const isAdminEmail =
    lowerEmail.includes("@admin") ||
    lowerEmail === process.env.INITIAL_ADMIN_EMAIL ||
    lowerEmail === "admin@farefinder.com";
  const role = isAdminEmail ? "admin" : "user";

  try {
    const result = await query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, lowerEmail, passwordHash, role]
    );

    const userId = result[0]?.id;
    const user = { id: userId, name, email: lowerEmail, role };

    // Log Activity
    await query(
      "INSERT INTO user_activity_logs (user_id, activity_type, details, ip_address) VALUES ($1, $2, $3, $4)",
      [userId, "register", `User registered with role: ${role}`, req.ip]
    );

    return res.status(201).json({
      user,
      token: signToken(user),
      notice: role === "admin" ? "Registered successfully as Admin!" : undefined
    });
  } catch (error) {
    if (error.code === "23505" || error.message?.includes("Duplicate")) {
      return res.status(409).json({ message: "This email is already registered." });
    }
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Registration failed due to server error." });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const lowerEmail = email.trim().toLowerCase();

  try {
    const rows = await query("SELECT * FROM users WHERE email = $1", [lowerEmail]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Update last login
    await query("UPDATE users SET last_login = NOW() WHERE id = $1", [user.id]);

    // Log Activity
    await query(
      "INSERT INTO user_activity_logs (user_id, activity_type, details, ip_address) VALUES ($1, $2, $3, $4)",
      [user.id, "login", "User logged in successfully", req.ip]
    );

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.json({
      user: safeUser,
      token: signToken(safeUser)
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed due to server error." });
  }
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing auth token." });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired auth token." });
  }
}

export function requireAdmin(req, res, next) {
  return requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin privileges required." });
    }
    return next();
  });
}
