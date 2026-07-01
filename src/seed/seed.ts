import "dotenv/config";
import { connectDB } from "../config/db";
import Portfolio from "../models/Portfolio";
import Admin from "../models/Admin";
import { hashPassword } from "../utils/password";
import { seedData } from "./data";

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "admin123";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required in .env");
    process.exit(1);
  }

  await connectDB(uri);

  await Portfolio.deleteMany({});
  await Portfolio.create(seedData);
  console.log("Portfolio seeded successfully (bilingual en/vi)");

  const existingAdmin = await Admin.findOne({ username: DEFAULT_ADMIN_USERNAME });
  if (!existingAdmin) {
    const passwordHash = await hashPassword(DEFAULT_ADMIN_PASSWORD);
    await Admin.create({
      username: DEFAULT_ADMIN_USERNAME,
      passwordHash,
    });
    console.log(
      `Admin account created — username: ${DEFAULT_ADMIN_USERNAME}, password: ${DEFAULT_ADMIN_PASSWORD}`
    );
    console.log("Store credentials in DB only. Change password after first login.");
  } else {
    console.log("Admin account already exists, skipped.");
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
