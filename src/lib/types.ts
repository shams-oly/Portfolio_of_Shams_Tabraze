export type Category = "app" | "web" | "case-study" | "research" | "other";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "app", label: "Mobile Apps" },
  { value: "web", label: "Websites" },
  { value: "case-study", label: "Case Studies" },
  { value: "research", label: "Research" },
  { value: "other", label: "Other" },
];

export type Link = { label: string; url: string };
export type Metric = { value: string; label: string };
export type Section = { heading: string; body: string; image?: string };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  platforms: string[];
  year: string;
  role: string;
  client: string;
  summary: string;
  cover: string;
  icon?: string;
  accent: string;
  tags: string[];
  links: Link[];
  metrics: Metric[];
  sections: Section[];
  gallery: string[];
  featured: boolean;
  published: boolean;
  order: number;
  updatedAt?: string;
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export type Education = { title: string; org: string; year: string };
export type Publication = { title: string; venue: string; year: string; url: string; description: string };
export type Creative = { title: string; description: string };

export type Profile = {
  name: string;
  shortName: string;
  roles: string[];
  tagline: string;
  intro: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  photo: string;
  logo: string;
  resumeUrl: string;
  available: boolean;
  socials: Link[];
  stats: Metric[];
  experience: Experience[];
  education: Education[];
  skills: string[];
  tools: string[];
  publications: Publication[];
  creative: Creative[];
};

export type Message = {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
};
