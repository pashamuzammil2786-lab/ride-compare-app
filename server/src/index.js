import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { login, register, requireAuth } from "./auth.js";
import { compareProducts } from "./ecommerce.js";
import { compareRides } from "./rides.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "RideCompare" });
});

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/rides/compare", requireAuth, compareRides);
app.post("/api/ecommerce/compare", requireAuth, compareProducts);

app.listen(port, () => {
  console.log(`RideCompare API running on http://localhost:${port}`);
});
