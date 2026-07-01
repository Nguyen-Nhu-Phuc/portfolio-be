import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is required in .env");
  process.exit(1);
}

if (process.env.NODE_ENV === "production" && !process.env.ADMIN_JWT_SECRET) {
  console.error("ADMIN_JWT_SECRET is required in production.");
  process.exit(1);
}

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
