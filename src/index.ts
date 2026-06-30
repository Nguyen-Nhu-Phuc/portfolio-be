import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import portfolioRoutes from "./routes/portfolio";
import contactRoutes from "./routes/contact";
import adminRoutes from "./routes/admin";
import { UPLOADS_DIR } from "./middleware/upload";
import { securityHeaders } from "./middleware/security";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const corsOrigins = [
  CORS_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

if (!MONGODB_URI) {
  console.error("MONGODB_URI is required in .env");
  process.exit(1);
}

if (process.env.NODE_ENV === "production" && !process.env.ADMIN_JWT_SECRET) {
  console.error("ADMIN_JWT_SECRET is required in production.");
  process.exit(1);
}

app.use(securityHeaders);
app.use(
  cors({
    origin: corsOrigins,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

async function start() {
  await connectDB(MONGODB_URI!);
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
