import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";
import { isCloudinaryConfigured } from "../config/cloudinary";

/** Local disk fallback when Cloudinary is not configured. */
export const UPLOADS_DIR = process.env.VERCEL
  ? path.join("/tmp", "uploads")
  : path.join(process.cwd(), "uploads");

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

if (!isCloudinaryConfigured() && !fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function safeFilename(originalname: string): string {
  const ext = path.extname(originalname).toLowerCase() || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    ? ext
    : ".jpg";
  return `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${safeExt}`;
}

const storage = isCloudinaryConfigured()
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, UPLOADS_DIR);
      },
      filename: (_req, file, cb) => {
        cb(null, safeFilename(file.originalname));
      },
    });

export const imageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
  },
});

export function publicUploadUrl(filename: string): string {
  return `/uploads/${filename}`;
}
