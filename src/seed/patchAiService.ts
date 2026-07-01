import "dotenv/config";
import { connectDB } from "../config/db";
import Portfolio from "../models/Portfolio";

const AI_SERVICE = {
  icon: "/images/icon-ai.svg",
  title: {
    en: "AI solutions",
    vi: "Giải pháp AI",
  },
  description: {
    en: "LLM integrations, intelligent automation, and AI-powered features tailored to your product.",
    vi: "Tích hợp LLM, tự động hóa thông minh và tính năng AI phù hợp với sản phẩm của bạn.",
  },
};

function isPhotographyService(icon: string, titleEn?: string, titleVi?: string): boolean {
  return (
    icon.includes("icon-photo") ||
    titleEn === "Photography" ||
    titleVi === "Nhiếp ảnh"
  );
}

async function patchAiService() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required in .env");
    process.exit(1);
  }

  await connectDB(uri);

  const portfolio = await Portfolio.findOne();
  if (!portfolio) {
    console.error("No portfolio document found. Run npm run seed first.");
    process.exit(1);
  }

  const index = portfolio.services.findIndex((service) =>
    isPhotographyService(
      service.icon,
      service.title?.en,
      service.title?.vi
    )
  );

  if (index === -1) {
    console.log("Photography service not found — nothing to patch.");
    process.exit(0);
  }

  portfolio.services[index] = AI_SERVICE;
  portfolio.markModified("services");
  await portfolio.save();

  console.log(`Updated service #${index + 1} to AI (icon: ${AI_SERVICE.icon})`);
  process.exit(0);
}

patchAiService().catch((err) => {
  console.error(err);
  process.exit(1);
});
