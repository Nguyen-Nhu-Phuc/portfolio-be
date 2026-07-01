import {
  Locale,
  LocalizedAbout,
  LocalizedString,
  pickLocalized,
  pickLocalizedArray,
} from "../types/localized";

function loc(value: LocalizedString | undefined, locale: Locale): string {
  return pickLocalized(value, locale);
}

function locAbout(value: LocalizedAbout | undefined, locale: Locale): string[] {
  return pickLocalizedArray(value, locale);
}

/** Converts bilingual DB document to single-locale API response for the public UI. */
export function localizePortfolio(doc: Record<string, unknown>, locale: Locale) {
  const profile = doc.profile as Record<string, unknown>;
  const about = doc.about as LocalizedAbout;
  const services = (doc.services as Record<string, unknown>[]) ?? [];
  const testimonials = (doc.testimonials as Record<string, unknown>[]) ?? [];
  const education = (doc.education as Record<string, unknown>[]) ?? [];
  const experience = (doc.experience as Record<string, unknown>[]) ?? [];
  const skills = (doc.skills as Record<string, unknown>[]) ?? [];
  const projects = (doc.projects as Record<string, unknown>[]) ?? [];
  const blogs = (doc.blogs as Record<string, unknown>[]) ?? [];
  const clients = doc.clients ?? [];

  return {
    profile: {
      name: loc(profile.name as LocalizedString, locale),
      title: loc(profile.title as LocalizedString, locale),
      tagline: loc(profile.tagline as LocalizedString | undefined, locale) || undefined,
      avatar: profile.avatar,
      email: profile.email,
      phone: profile.phone,
      birthday: profile.birthday,
      birthdayDisplay: loc(profile.birthdayDisplay as LocalizedString, locale),
      location: loc(profile.location as LocalizedString, locale),
      mapEmbedUrl: profile.mapEmbedUrl,
      availability: loc(profile.availability as LocalizedString | undefined, locale) || undefined,
      availabilityStatus: profile.availabilityStatus,
      resumeUrl: profile.resumeUrl,
      yearsExperience: profile.yearsExperience,
      remoteFriendly: profile.remoteFriendly,
      socialLinks: profile.socialLinks,
    },
    about: locAbout(about, locale),
    services: services.map((s) => ({
      icon: s.icon,
      title: loc(s.title as LocalizedString, locale),
      description: loc(s.description as LocalizedString, locale),
    })),
    testimonials: testimonials.map((t) => ({
      avatar: t.avatar,
      name: loc(t.name as LocalizedString, locale),
      role: t.role ? loc(t.role as LocalizedString, locale) : undefined,
      text: loc(t.text as LocalizedString, locale),
      date: t.date,
    })),
    clients,
    education: education.map((e) => ({
      title: loc(e.title as LocalizedString, locale),
      period: loc(e.period as LocalizedString, locale),
      description: loc(e.description as LocalizedString, locale),
    })),
    experience: experience.map((e) => ({
      title: loc(e.title as LocalizedString, locale),
      period: loc(e.period as LocalizedString, locale),
      description: loc(e.description as LocalizedString, locale),
    })),
    skills: skills.map((s) => ({
      name: loc(s.name as LocalizedString, locale),
      percentage: s.percentage,
    })),
    projects: projects.map((p) => ({
      title: loc(p.title as LocalizedString, locale),
      category: loc(p.category as LocalizedString, locale),
      categorySlug: p.categorySlug as string,
      image: p.image,
      url: p.url,
      description: p.description
        ? loc(p.description as LocalizedString, locale)
        : undefined,
      techStack: p.techStack,
      featured: p.featured,
    })),
    blogs: blogs.map((b) => ({
      title: loc(b.title as LocalizedString, locale),
      category: loc(b.category as LocalizedString, locale),
      image: b.image,
      excerpt: loc(b.excerpt as LocalizedString, locale),
      date: b.date,
      url: b.url,
    })),
  };
}
