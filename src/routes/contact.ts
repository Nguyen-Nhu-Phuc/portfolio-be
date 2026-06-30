import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact";
import { rateLimit } from "../middleware/rateLimit";
import { notifyContactSubmission } from "../utils/notifyContact";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: "Too many messages sent. Please try again later.",
});

router.post(
  "/",
  contactLimiter,
  [
    body("fullname")
      .trim()
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ max: 120 }),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Valid email is required")
      .isLength({ max: 254 }),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ max: 5000 }),
    body("projectType").optional().trim().isLength({ max: 120 }),
    body("budget").optional().trim().isLength({ max: 120 }),
    body("timeline").optional().trim().isLength({ max: 120 }),
    body("_website").optional().isEmpty().withMessage("Invalid submission"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const first = errors.array()[0];
      res.status(400).json({
        message: first.msg,
        errors: errors.array(),
      });
      return;
    }

    try {
      const { fullname, email, message, projectType, budget, timeline } =
        req.body;

      const contact = await Contact.create({
        fullname,
        email,
        message,
        projectType: projectType || undefined,
        budget: budget || undefined,
        timeline: timeline || undefined,
      });

      void notifyContactSubmission({
        fullname,
        email,
        message,
        projectType,
        budget,
        timeline,
      });

      res.status(201).json({
        message: "Message sent successfully",
        id: contact._id,
      });
    } catch {
      res.status(500).json({ message: "Failed to send message" });
    }
  }
);

export default router;
