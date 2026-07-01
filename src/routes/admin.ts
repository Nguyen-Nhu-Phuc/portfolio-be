import { Router, Request, Response } from "express";
import Portfolio from "../models/Portfolio";
import Admin from "../models/Admin";
import Contact from "../models/Contact";
import { verifyPassword, hashPassword } from "../utils/password";
import { requireAdmin, signAdminToken, AdminRequest } from "../middleware/adminAuth";
import { isCloudinaryConfigured } from "../config/cloudinary";
import { uploadImageToCloudinary } from "../services/cloudinaryUpload";
import {
  imageUpload,
  publicUploadUrl,
} from "../middleware/upload";
import { rateLimit } from "../middleware/rateLimit";
import { sanitizePortfolioUpdate } from "../utils/sanitizePortfolio";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Try again later.",
});

router.post("/login", loginLimiter, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };

    const normalizedUsername = username?.trim().toLowerCase();
    if (!normalizedUsername || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const admin = await Admin.findOne({ username: normalizedUsername });
    if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    res.json({ token: signAdminToken() });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

router.post(
  "/change-password",
  requireAdmin,
  async (req: AdminRequest, res: Response) => {
    try {
      const { username, currentPassword, newPassword } = req.body as {
        username?: string;
        currentPassword?: string;
        newPassword?: string;
      };

      const normalizedUsername = username?.trim().toLowerCase();
      if (!normalizedUsername || !currentPassword || !newPassword) {
        res.status(400).json({ message: "All password fields are required" });
        return;
      }

      if (newPassword.length < 8) {
        res.status(400).json({ message: "New password must be at least 8 characters" });
        return;
      }

      const admin = await Admin.findOne({ username: normalizedUsername });
      if (!admin || !(await verifyPassword(currentPassword, admin.passwordHash))) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }

      admin.passwordHash = await hashPassword(newPassword);
      await admin.save();

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  }
);

router.get("/portfolio", requireAdmin, async (_req: AdminRequest, res: Response) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio) {
      res.status(404).json({ message: "Portfolio not found. Run seed script." });
      return;
    }
    res.json(portfolio);
  } catch {
    res.status(500).json({ message: "Failed to fetch portfolio" });
  }
});

router.put("/portfolio", requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const payload = sanitizePortfolioUpdate(req.body);

    const updated = await Portfolio.findOneAndUpdate({}, payload, {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    }).lean();

    res.json(updated);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update portfolio";
    console.error("Admin update error:", error);
    res.status(400).json({ message });
  }
});

router.get("/contacts", requireAdmin, async (_req: AdminRequest, res: Response) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    res.json(contacts);
  } catch {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

router.patch(
  "/contacts/:id/read",
  requireAdmin,
  async (req: AdminRequest, res: Response) => {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { returnDocument: "after" }
      ).lean();

      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }

      res.json(contact);
    } catch {
      res.status(500).json({ message: "Failed to update contact" });
    }
  }
);

router.delete(
  "/contacts/:id",
  requireAdmin,
  async (req: AdminRequest, res: Response) => {
    try {
      const result = await Contact.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      res.json({ message: "Contact deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete contact" });
    }
  }
);

router.post(
  "/upload",
  requireAdmin,
  (req: AdminRequest, res: Response) => {
    imageUpload.single("image")(req, res, (err: unknown) => {
      if (err) {
        const message =
          err instanceof Error ? err.message : "Upload failed";
        res.status(400).json({ message });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: "No image file provided" });
        return;
      }

      if (isCloudinaryConfigured()) {
        if (!req.file.buffer) {
          res.status(500).json({ message: "Upload buffer missing" });
          return;
        }

        uploadImageToCloudinary(req.file.buffer)
          .then((url) => res.json({ url }))
          .catch((err: unknown) => {
            const message =
              err instanceof Error ? err.message : "Cloudinary upload failed";
            res.status(500).json({ message });
          });
        return;
      }

      res.json({ url: publicUploadUrl(req.file.filename) });
    });
  }
);

export default router;
