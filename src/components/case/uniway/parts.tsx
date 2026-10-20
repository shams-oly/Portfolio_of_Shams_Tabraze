"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE_OUT, FadeIn, SplitReveal } from "@/components/motion";

/** Numbered chapter header: mono eyebrow, giant outlined number, masked title. */
export function ChapterHead({
  n,
  eyebrow,
  title,
  intro,
  id,
}: {
  n: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  return (
    <div ref={ref} id={id} className="relative scroll-mt-24">
      <motion.span
        aria-hidden
        style={{ y, WebkitTextStroke: "1.5px var(--line)" }}
        className="pointer-events-none absolute -top-[0.35em] right-0 select-none font-uniway text-[clamp(8rem,22vw,20rem)] font-black leading-none text-transparent"
      >
        {n}
      </motion.span>
      <p className="label relative mb-5 flex items-center gap-3">
        <span className="inline-block h-2 w-2 bg-[#F37500] clip-corner-sm" />
        {n} · {eyebrow}
      </p>
      <SplitReveal
        as="h2"
        text={title}
        className="relative block max-w-[16ch] font-uniway text-[clamp(2.4rem,6vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.035em]"
      />
      {intro && (
        <FadeIn delay={0.15}>
          <div className="relative mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">{intro}</div>
        </FadeIn>
      )}
    </div>
  );
}

/** Full-bleed orange stage divider (Empathize, Define, Ideate, Design, Test). */
export function StageBand({ index, name, items }: { index: number; name: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(12% 6% 12% 6% round 40px)", "inset(0% 0% 0% 0% round 0px)"]);
  return (
    <motion.section ref={ref} style={{ clipPath: clip }} className="relative my-[12vh] overflow-hidden bg-[#F37500] text-white">
      <div className="u-grid-bg absolute inset-0 opacity-40" />
      <motion.p
        aria-hidden
        style={{ x }}
        className="pointer-events-none whitespace-nowrap font-uniway text-[clamp(7rem,20vw,19rem)] font-black leading-[0.85] tracking-[-0.05em] text-white/15"
      >
        {name} · {name} · {name}
      </motion.p>
      <div className="container-x relative -mt-[0.6em] flex flex-col gap-6 pb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Stage {String(index).padStart(2, "0")} / 05</p>
          <p className="mt-2 font-uniway text-[clamp(2.6rem,6vw,5rem)] font-bold leading-none">{name}</p>
        </div>
        <ul className="flex flex-wrap gap-2 md:max-w-[50%] md:justify-end">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: EASE_OUT }}
              className="rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
            >
              {it}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[var(--line)] bg-[var(--surface)] ${className}`}>{children}</div>;
}
