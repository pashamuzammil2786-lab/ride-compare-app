import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "./db.js";

const demoUsers = new Map();

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" }
  );
}

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email.toLowerCase(), passwordHash]
    );
    const user = { id: result.insertId, name, email: email.toLowerCase() };
    return res.status(201).json({ user, token: signToken(user), mode: "mysql" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "This email is already registered." });
    }

    const id = demoUsers.size + 1;
    const user = { id, name, email: email.toLowerCase(), passwordHash };
    demoUsers.set(user.email, user);
    return res.status(201).json({
      user: { id, name, email: user.email },
      token: signToken(user),
      mode: "demo",
      notice: "MySQL is not connected, so this login is stored in memory for this session."
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const rows = await query("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const safeUser = { id: user.id, name: user.name, email: user.email };
    return res.json({ user: safeUser, token: signToken(safeUser), mode: "mysql" });
  } catch {
    const user = demoUsers.get(email.toLowerCase());

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: signToken(user),
      mode: "demo"
    });
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
    return res.status(401).json({ message: "Invalid auth token." });
  }
}
