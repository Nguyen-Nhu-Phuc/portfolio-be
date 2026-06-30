import { Router, Request, Response } from "express";
import Portfolio from "../models/Portfolio";
import { Locale } from "../types/localized";
import { localizePortfolio } from "../utils/localizePortfolio";

const router = Router();

function parseLocale(value: unknown): Locale {
  return value === "vi" ? "vi" : "en";
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const locale = parseLocale(req.query.lang);
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio) {
      res.status(404).json({ message: "Portfolio data not found. Run seed script." });
      return;
    }
    res.json(localizePortfolio(portfolio as unknown as Record<string, unknown>, locale));
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    res.status(500).json({ message: "Failed to fetch portfolio data" });
  }
});

export default router;
