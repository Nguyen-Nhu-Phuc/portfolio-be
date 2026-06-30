import "dotenv/config";
import { connectDB } from "../config/db";
import Admin from "../models/Admin";
import { hashPassword } from "../utils/password";

const MONGODB_URI = process.env.MONGODB_URI;
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD ?? "admin123";

async function seedAdmin() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is required in .env");
    process.exit(1);
  }

  await connectDB(MONGODB_URI);

  const existing = await Admin.findOne({ username: DEFAULT_USERNAME });
  if (existing) {
    console.log(`Admin "${DEFAULT_USERNAME}" already exists — skipped.`);
    process.exit(0);
  }

  const passwordHash = await hashPassword(DEFAULT_PASSWORD);
  await Admin.create({ username: DEFAULT_USERNAME, passwordHash });
  console.log(`Created admin user "${DEFAULT_USERNAME}".`);
  console.log("Change the password after first login.");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
