import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shamstabraze.vercel.app";
  const projects = await getProjects();
  return [
    ...["", "/work", "/research", "/about", "/contact"].map((p) => ({ url: `${base}${p}` })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
  ];
}
