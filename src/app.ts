import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import portfolioRoutes from "./routes/portfolio";
import contactRoutes from "./routes/contact";
import adminRoutes from "./routes/admin";
import { isCloudinaryConfigured } from "./config/cloudinary";
import { UPLOADS_DIR } from "./middleware/upload";
import { securityHeaders } from "./middleware/security";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const corsOrigins = [
  ...CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const app = express();

app.use(securityHeaders);
app.use(
  cors({
    origin: corsOrigins,
  })
);
app.use(express.json({ limit: "2mb" }));
if (!isCloudinaryConfigured()) {
  app.use("/uploads", express.static(UPLOADS_DIR));
}

app.use(async (_req, _res, next) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    next(new Error("MONGODB_URI is not configured"));
    return;
  }

  try {
    await connectDB(uri);
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
);

export default app;
