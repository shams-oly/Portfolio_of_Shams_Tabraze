import type { Metadata } from "next";
import { SplitReveal } from "@/components/motion";
import { WorkIndex } from "@/components/work-index";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Work", description: "Apps, websites, case studies and research by Shams Tabraze." };

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <div className="container-x pb-[12vh] pt-[22vh]">
      <p className="label mb-6">Index · {projects.length} projects</p>
      <SplitReveal
        as="h1"
        text="Work that ships."
        className="mb-[10vh] block font-display text-[clamp(3.2rem,12vw,11rem)] font-extrabold leading-[0.86]"
      />
      <WorkIndex projects={projects} />
    </div>
  );
}
