import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, SplitReveal } from "@/components/motion";
import { ProjectVisual } from "@/components/project-visual";
import { getProfile, getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Research", description: "Publications and research-led design by Shams Tabraze." };

export default async function ResearchPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const research = projects.filter((p) => p.category === "research" || p.category === "case-study");
  return (
    <div className="container-x pb-[10vh] pt-[22vh]">
      <p className="label mb-6">Research</p>
      <SplitReveal as="h1" text="Design starts with people." className="block font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.88]" />
      <FadeIn delay={0.2}>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">
          Qualitative interviews, usability evaluation, thematic coding and competitor analysis — the methods behind every interface I ship.
        </p>
      </FadeIn>

      {profile.publications.length > 0 && (
        <section className="mt-[12vh]">
          <p className="label mb-6">Publications</p>
          {profile.publications.map((pub, i) => {
            const Wrapper = pub.url ? "a" : "div";
            return (
              <FadeIn key={i}>
                <Wrapper
                  {...(pub.url ? { href: pub.url, target: "_blank", rel: "noreferrer", "data-cursor": "Read" } : {})}
                  className="group grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-[1fr_2fr_auto]"
                >
                  <div>
                    <p className="font-semibold">{pub.venue}</p>
                    <p className="label mt-1">{pub.year}</p>
                  </div>
                  <div>
                    <h2 className="font-display text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold leading-tight">{pub.title}</h2>
                    <p className="mt-3 text-[var(--fg-2)]">{pub.description}</p>
                  </div>
                  {pub.url && <span className="text-2xl transition-transform group-hover:-rotate-45">→</span>}
                </Wrapper>
              </FadeIn>
            );
          })}
        </section>
      )}

      <section className="mt-[12vh]">
        <p className="label mb-8">Research-led projects</p>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
          {research.map((p, i) => (
            <FadeIn key={p.slug} delay={(i % 2) * 0.08}>
              <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
                <div className="clip-corner relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                    <ProjectVisual project={p} sizes="(max-width:640px) 100vw, 50vw" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-1 text-[var(--fg-2)]">{p.subtitle}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
