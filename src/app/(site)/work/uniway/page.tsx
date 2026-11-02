import type { Metadata } from "next";
import { UniwayCaseStudy } from "@/components/case/uniway/case-study";
import { meta } from "@/components/case/uniway/data";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Uniway — UX case study & 2026 redesign",
  description: meta.summary,
};

export default async function UniwayPage() {
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === "uniway");
  const n = projects[(idx + 1) % Math.max(1, projects.length)];
  const next = n && n.slug !== "uniway" ? { slug: n.slug, title: n.title } : undefined;
  return <UniwayCaseStudy next={next} />;
}
