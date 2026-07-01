export type Locale = "en" | "vi";

export interface LocalizedString {
  en: string;
  vi: string;
}

export interface LocalizedAbout {
  en: string[];
  vi: string[];
}

export function emptyLocalized(en = "", vi = ""): LocalizedString {
  return { en, vi };
}

export function pickLocalized(
  value: LocalizedString | undefined | null,
  locale: Locale
): string {
  if (!value) return "";
  return value[locale]?.trim() || value.en?.trim() || value.vi?.trim() || "";
}

export function pickLocalizedArray(
  value: LocalizedAbout | undefined | null,
  locale: Locale
): string[] {
  if (!value) return [];
  const items = value[locale]?.length ? value[locale] : value.en;
  return items ?? [];
}
