import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Media, Paragraphs } from "@/components/media";
import { FadeIn, ImageReveal, Parallax, SplitReveal } from "@/components/motion";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, getProjects } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.title,
    description: p.summary,
    openGraph: { images: p.cover ? [p.cover] : p.icon ? [p.icon] : undefined },
  };
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!p) notFound();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all[(idx + 1) % all.length];
  const cat = CATEGORIES.find((c) => c.value === p.category)?.label;

  const meta = [
    { k: "Role", v: p.role },
    { k: "Client", v: p.client },
    { k: "Platform", v: p.platforms.join(", ") },
    { k: "Year", v: p.year },
  ].filter((m) => m.v);

  return (
    <article style={{ ["--project" as string]: p.accent }}>
      <header className="container-x pb-12 pt-[20vh]">
        <FadeIn className="mb-6 flex flex-wrap items-center gap-3">
          <Link href="/work" className="label hover:text-[var(--fg)]">
            ← Work
          </Link>
          <span className="label">/ {cat}</span>
          <span className="h-2 w-2 clip-corner-sm" style={{ background: p.accent }} />
        </FadeIn>
        <SplitReveal as="h1" text={p.title} className="block font-display text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.86]" />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <FadeIn delay={0.2}>
            <p className="font-display text-[clamp(1.3rem,2.4vw,2rem)] font-semibold leading-snug">{p.subtitle}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">{p.summary}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <dl className="grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="label mb-1">{m.k}</dt>
                  <dd className="font-medium">{m.v}</dd>
                </div>
              ))}
            </dl>
            {p.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2 text-sm">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </header>

      <div className="container-x">
        <ImageReveal className="clip-corner relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <Parallax speed={0.1} className="absolute inset-0">
            <ProjectVisual project={p} priority sizes="100vw" />
          </Parallax>
        </ImageReveal>
      </div>

      {p.metrics.length > 0 && (
        <section className="container-x mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {p.metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.08} className="border-t border-[var(--line)] pt-5">
              <div className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-none" style={{ color: p.accent }}>
                {m.value}
              </div>
              <p className="label mt-2">{m.label}</p>
            </FadeIn>
          ))}
        </section>
      )}

      {p.sections.length > 0 && (
        <section className="container-x mt-[14vh] space-y-[12vh]">
          {p.sections.map((s, i) => (
            <div key={i} className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
              <div className="md:sticky md:top-28 md:self-start">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">{s.heading}</h2>
              </div>
              <div>
                <FadeIn>
                  <Paragraphs text={s.body} className="mb-5 text-lg leading-relaxed text-[var(--fg-2)] md:text-xl" />
                </FadeIn>
                {s.image && (
                  <ImageReveal className="clip-corner relative mt-8 aspect-[16/10] overflow-hidden bg-[var(--bg-2)]">
                    <Media src={s.image} alt={s.heading} sizes="(max-width:768px) 100vw, 60vw" />
                  </ImageReveal>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {p.gallery.length > 0 && (
        <section className="container-x mt-[14vh] grid gap-6 md:grid-cols-2">
          {p.gallery.map((g, i) => (
            <ImageReveal
              key={g}
              delay={(i % 2) * 0.1}
              className={`clip-corner relative overflow-hidden bg-[var(--bg-2)] ${i % 3 === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"}`}
            >
              <Media src={g} alt={`${p.title} ${i + 1}`} sizes="(max-width:768px) 100vw, 50vw" />
            </ImageReveal>
          ))}
        </section>
      )}

      {p.tags.length > 0 && (
        <div className="container-x mt-16 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--fg-2)]">
              {t}
            </span>
          ))}
        </div>
      )}

      {next && next.slug !== p.slug && (
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group mt-[16vh] block border-t border-[var(--line)]">
          <div className="container-x grid items-center gap-8 py-[10vh] md:grid-cols-[1fr_auto]">
            <div>
              <p className="label mb-4">Next project</p>
              <p className="font-display text-[clamp(2.8rem,9vw,8rem)] font-extrabold leading-[0.9] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-6">
                {next.title}
              </p>
            </div>
            <div className="clip-corner relative hidden aspect-[4/3] w-[28vw] overflow-hidden transition-transform duration-700 group-hover:scale-105 md:block">
              <ProjectVisual project={next} sizes="30vw" />
            </div>
          </div>
        </Link>
      )}
    </article>
  );
}

export default function ProjectPage(props: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <CaseStudy params={props.params} />
    </Suspense>
  );
}
