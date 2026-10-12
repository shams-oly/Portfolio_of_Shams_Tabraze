"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Counter, FadeIn, Magnetic, Marquee, Parallax, SplitReveal } from "@/components/motion";
import type { Profile, Project } from "@/lib/types";

export function Intro({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = profile.intro.split(" ");
  return (
    <section className="container-x py-[18vh]">
      <p className="label mb-8">(01) Hello</p>
      <div ref={ref} className="max-w-[1150px] font-display text-[clamp(1.7rem,4.2vw,3.9rem)] font-bold leading-[1.08]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function Stats({ profile }: { profile: Profile }) {
  return (
    <section className="border-y border-[var(--line)]">
      <div className="container-x grid grid-cols-2 md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08} className="border-[var(--line)] py-10 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0">
            <Counter value={s.value} className="font-display text-[clamp(2.6rem,5.4vw,5.2rem)] font-extrabold leading-none" />
            <p className="label mt-3">{s.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Apps({ apps }: { apps: Project[] }) {
  return (
    <section className="py-[16vh]">
      <div className="container-x mb-14 grid gap-6 md:grid-cols-2 md:items-end">
        <div>
          <p className="label mb-4">(03) Live on the stores</p>
          <SplitReveal as="h2" text="Apps people open every day" className="font-display text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold leading-[0.92]" />
        </div>
        <FadeIn>
          <p className="max-w-md text-lg text-[var(--fg-2)] md:ml-auto">
            Designed and supervised at Kite Games Studio across iOS and Android — from AI photo tools to video editors.
          </p>
        </FadeIn>
      </div>
      <div className="container-x grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:gap-5">
        {apps.map((a, i) => (
          <FadeIn key={a.slug} delay={(i % 6) * 0.05}>
            <Link href={`/work/${a.slug}`} data-cursor="Open" className="group block">
              <motion.div
                whileHover={{ y: -8, rotate: i % 2 ? 3 : -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative aspect-square overflow-hidden rounded-[23%] shadow-[var(--shadow)]"
              >
                {a.icon && <Image src={a.icon} alt={a.title} fill sizes="160px" className="scale-[1.2] object-cover" />}
              </motion.div>
              <p className="mt-3 text-center text-sm font-semibold">{a.title}</p>
              <p className="text-center text-xs text-[var(--fg-3)]">{a.platforms.join(" · ")}</p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Capabilities({ profile }: { profile: Profile }) {
  return (
    <section className="overflow-hidden border-y border-[var(--line)] py-10">
      <Marquee duration={45}>
        {profile.skills.map((s) => (
          <span key={s} className="flex items-center whitespace-nowrap font-display text-[clamp(2rem,5vw,4.5rem)] font-bold">
            <span className="px-8">{s}</span>
            <span className="h-4 w-4 bg-[var(--accent-2)] clip-corner-sm" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function AboutTeaser({ profile }: { profile: Profile }) {
  return (
    <section className="container-x grid gap-12 py-[18vh] md:grid-cols-[0.9fr_1.1fr] md:items-center">
      <div className="clip-corner relative aspect-[4/5] w-full max-w-[520px]">
        <Parallax speed={0.12} className="absolute inset-0">
          {profile.photo && (
            <Image src={profile.photo} alt={profile.name} fill sizes="(max-width:768px) 90vw, 40vw" className="object-cover object-top" />
          )}
        </Parallax>
        <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur">
          {profile.name}
        </div>
      </div>
      <div>
        <p className="label mb-6">(04) About</p>
        <SplitReveal
          as="h2"
          text="Engineer by training. Designer by obsession. Researcher by habit."
          className="font-display text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[0.95]"
        />
        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--fg-2)]">{profile.bio}</p>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Link href="/about" className="btn btn-primary">
              More about me →
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={profile.resumeUrl} download className="btn btn-ghost">
              Download resume ↓
            </a>
          </Magnetic>
        </FadeIn>
      </div>
    </section>
  );
}
