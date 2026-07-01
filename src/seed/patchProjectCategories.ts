import "dotenv/config";
import { connectDB } from "../config/db";
import Portfolio from "../models/Portfolio";

const DEFAULT_CATEGORIES = [
  { slug: "web design", label: { en: "Web design", vi: "Thiết kế web" } },
  { slug: "applications", label: { en: "Applications", vi: "Ứng dụng" } },
  {
    slug: "web development",
    label: { en: "Web development", vi: "Phát triển web" },
  },
];

async function patchProjectCategories() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required in .env");
    process.exit(1);
  }

  await connectDB(uri);

  const portfolio = await Portfolio.findOne();
  if (!portfolio) {
    console.error("No portfolio document found. Run seed first.");
    process.exit(1);
  }

  if (portfolio.projectCategories?.length) {
    console.log("projectCategories already set — skipped.");
    process.exit(0);
  }

  portfolio.projectCategories = DEFAULT_CATEGORIES;
  await portfolio.save();
  console.log("Added default projectCategories to portfolio.");
  process.exit(0);
}

patchProjectCategories().catch((error) => {
  console.error(error);
  process.exit(1);
});
