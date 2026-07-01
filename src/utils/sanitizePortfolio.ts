const PORTFOLIO_KEYS = [
  "profile",
  "about",
  "services",
  "testimonials",
  "clients",
  "education",
  "experience",
  "skills",
  "projects",
  "projectCategories",
  "blogs",
] as const;

const STRIPPED_KEYS = new Set([
  "_id",
  "__v",
  "createdAt",
  "updatedAt",
  "id",
]);

export function sanitizePortfolioUpdate(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Invalid portfolio payload");
  }

  const source = body as Record<string, unknown>;
  const clean: Record<string, unknown> = {};

  for (const key of PORTFOLIO_KEYS) {
    if (key in source) {
      clean[key] = source[key];
    }
  }

  for (const key of Object.keys(source)) {
    if (STRIPPED_KEYS.has(key)) continue;
    if (!PORTFOLIO_KEYS.includes(key as (typeof PORTFOLIO_KEYS)[number])) {
      throw new Error(`Unexpected field: ${key}`);
    }
  }

  return clean;
}
