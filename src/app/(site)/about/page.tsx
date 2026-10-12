import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, Parallax, SplitReveal } from "@/components/motion";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const profile = await getProfile();
  return (
    <div className="pb-[10vh] pt-[22vh]">
      <section className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="label mb-6">About</p>
          <SplitReveal
            as="h1"
            text={`Hi, I'm ${profile.shortName.split(" ")[0]}.`}
            className="block font-display text-[clamp(3.2rem,11vw,10rem)] font-extrabold leading-[0.86]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-10 max-w-2xl font-display text-[clamp(1.3rem,2.4vw,2rem)] font-semibold leading-snug">{profile.tagline}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">{profile.bio}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={profile.resumeUrl} download className="btn btn-primary">
                Download resume ↓
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                {profile.email}
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="clip-corner relative aspect-[4/5] w-full overflow-hidden md:mt-24">
          <Parallax speed={0.1} className="absolute inset-0">
            {profile.photo && <Image src={profile.photo} alt={profile.name} fill priority sizes="(max-width:768px) 100vw, 35vw" className="object-cover object-top" />}
          </Parallax>
        </div>
      </section>

      <section className="container-x mt-[16vh]">
        <p className="label mb-8">Experience</p>
        <div>
          {profile.experience.map((e, i) => (
            <FadeIn key={i} className="grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-[1fr_1.6fr_auto]">
              <div>
                <h3 className="font-display text-2xl font-bold md:text-3xl">{e.role}</h3>
                <p className="mt-1 text-[var(--fg-2)]">{e.org}</p>
              </div>
              <p className="leading-relaxed text-[var(--fg-2)]">{e.description}</p>
              <span className="label whitespace-nowrap md:text-right">{e.period}</span>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x mt-[14vh] grid gap-16 md:grid-cols-2">
        <div>
          <p className="label mb-8">Education & training</p>
          <ul>
            {profile.education.map((e, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <li className="flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-5">
                  <div>
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-sm text-[var(--fg-3)]">{e.org}</p>
                  </div>
                  <span className="label whitespace-nowrap">{e.year}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-8">Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span key={s} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
                {s}
              </span>
            ))}
          </div>
          <p className="label mb-6 mt-14">Tools</p>
          <div className="flex flex-wrap gap-2">
            {profile.tools.map((s) => (
              <span key={s} className="clip-corner-sm bg-[var(--surface)] px-4 py-2 text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {profile.creative.length > 0 && (
        <section className="container-x mt-[16vh]">
          <SplitReveal as="h2" text="Outside the screen" className="block font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.9]" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {profile.creative.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.08} className="clip-corner bg-[var(--surface)] p-8">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-bold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--fg-2)]">{c.description}</p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
