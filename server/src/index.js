import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getAnalytics, getSearches, getStats, getUsers, updateUserRole } from "./admin.js";
import { recommendWithAi } from "./ai.js";
import { login, register, requireAdmin, requireAuth } from "./auth.js";
import { compareProducts } from "./ecommerce.js";
import { compareRides } from "./rides.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "RideCompare", database: process.env.DATABASE_URL ? "postgres" : "in-memory-mock" });
});

// Authentication
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// User Features (Protected)
app.post("/api/rides/compare", requireAuth, compareRides);
app.post("/api/ecommerce/compare", requireAuth, compareProducts);
app.post("/api/ai/recommend", requireAuth, recommendWithAi);

// Admin Dashboard Features (Protected & Restricted to Admin Role)
app.get("/api/admin/stats", requireAdmin, getStats);
app.get("/api/admin/users", requireAdmin, getUsers);
app.put("/api/admin/users/:id/role", requireAdmin, updateUserRole);
app.get("/api/admin/searches", requireAdmin, getSearches);
app.get("/api/admin/analytics", requireAdmin, getAnalytics);

app.listen(port, () => {
  console.log(`RideCompare API running on http://localhost:${port}`);
});
