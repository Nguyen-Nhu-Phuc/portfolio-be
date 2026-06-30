import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "dev-admin-jwt-secret");

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  console.error("ADMIN_JWT_SECRET is required in production.");
}

export interface AdminRequest extends Request {
  admin?: boolean;
}

export function signAdminToken(): string {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not configured");
  }
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
}

export function requireAdmin(
  req: AdminRequest,
  res: Response,
  next: NextFunction
): void {
  if (!JWT_SECRET) {
    res.status(503).json({ message: "Admin auth is not configured on the server." });
    return;
  }

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = header.slice(7);
  try {
    jwt.verify(token, JWT_SECRET);
    req.admin = true;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
