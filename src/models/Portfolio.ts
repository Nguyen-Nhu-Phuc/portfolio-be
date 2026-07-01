import mongoose, { Document, Schema } from "mongoose";
import { LocalizedAbout, LocalizedString } from "../types/localized";

export interface ISocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface IProfile {
  name: LocalizedString;
  title: LocalizedString;
  tagline?: LocalizedString;
  avatar: string;
  email: string;
  phone: string;
  birthday: string;
  birthdayDisplay: LocalizedString;
  location: LocalizedString;
  mapEmbedUrl: string;
  availability?: LocalizedString;
  availabilityStatus?: string;
  resumeUrl?: string;
  yearsExperience?: number;
  remoteFriendly?: boolean;
  socialLinks: ISocialLink[];
}

export interface IService {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ITestimonial {
  avatar: string;
  name: LocalizedString;
  role?: LocalizedString;
  text: LocalizedString;
  date: string;
}

export interface IClient {
  logo: string;
  url: string;
}

export interface ITimelineItem {
  title: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
}

export interface ISkill {
  name: LocalizedString;
  percentage: number;
}

export interface IProject {
  title: LocalizedString;
  category: LocalizedString;
  categorySlug: string;
  image: string;
  url: string;
  description?: LocalizedString;
  techStack?: string[];
  featured?: boolean;
}

export interface IBlogPost {
  title: LocalizedString;
  category: LocalizedString;
  image: string;
  excerpt: LocalizedString;
  date: string;
  url: string;
}

export interface IPortfolio extends Document {
  profile: IProfile;
  about: LocalizedAbout;
  services: IService[];
  testimonials: ITestimonial[];
  clients: IClient[];
  education: ITimelineItem[];
  experience: ITimelineItem[];
  skills: ISkill[];
  projects: IProject[];
  blogs: IBlogPost[];
}

const localizedStringSchema = new Schema(
  { en: { type: String, default: "" }, vi: { type: String, default: "" } },
  { _id: false }
);

const portfolioSchema = new Schema<IPortfolio>(
  {
    profile: {
      name: localizedStringSchema,
      title: localizedStringSchema,
      tagline: localizedStringSchema,
      avatar: String,
      email: String,
      phone: String,
      birthday: String,
      birthdayDisplay: localizedStringSchema,
      location: localizedStringSchema,
      mapEmbedUrl: String,
      availability: localizedStringSchema,
      availabilityStatus: String,
      resumeUrl: String,
      yearsExperience: Number,
      remoteFriendly: Boolean,
      socialLinks: [{ platform: String, url: String, icon: String }],
    },
    about: {
      en: [String],
      vi: [String],
    },
    services: [
      {
        icon: String,
        title: localizedStringSchema,
        description: localizedStringSchema,
      },
    ],
    testimonials: [
      {
        avatar: String,
        name: localizedStringSchema,
        role: localizedStringSchema,
        text: localizedStringSchema,
        date: String,
      },
    ],
    clients: [{ logo: String, url: String }],
    education: [
      {
        title: localizedStringSchema,
        period: localizedStringSchema,
        description: localizedStringSchema,
      },
    ],
    experience: [
      {
        title: localizedStringSchema,
        period: localizedStringSchema,
        description: localizedStringSchema,
      },
    ],
    skills: [{ name: localizedStringSchema, percentage: Number }],
    projects: [
      {
        title: localizedStringSchema,
        category: localizedStringSchema,
        categorySlug: String,
        image: String,
        url: String,
        description: localizedStringSchema,
        techStack: [String],
        featured: Boolean,
      },
    ],
    blogs: [
      {
        title: localizedStringSchema,
        category: localizedStringSchema,
        image: String,
        excerpt: localizedStringSchema,
        date: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolio>("Portfolio", portfolioSchema);
