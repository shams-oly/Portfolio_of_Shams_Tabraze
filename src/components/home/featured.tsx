"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { CATEGORIES, type Project } from "@/lib/types";

function catLabel(c: Project["category"]) {
  return CATEGORIES.find((x) => x.value === c)?.label ?? c;
}

function Card({ p, i, total }: { p: Project; i: number; total: number }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      data-cursor="View"
      className="group relative flex h-full w-[86vw] shrink-0 flex-col md:w-[62vw] lg:w-[54vw]"
    >
      <div className="clip-corner relative flex-1 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]">
          <ProjectVisual project={p} sizes="(max-width:768px) 86vw, 56vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
        <div className="absolute left-5 top-5 flex gap-2">
          {p.platforms.slice(0, 3).map((pl) => (
            <span key={pl} className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {pl}
            </span>
          ))}
        </div>
        {p.metrics[0] && (
          <div className="absolute bottom-5 right-5 text-right text-white">
            <div className="font-display text-5xl font-extrabold leading-none">{p.metrics[0].value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-white/80">{p.metrics[0].label}</div>
          </div>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="label mb-2">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {catLabel(p.category)}
          </p>
          <h3 className="font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-bold leading-none">{p.title}</h3>
          <p className="mt-2 text-[var(--fg-2)]">{p.subtitle}</p>
        </div>
        <span className="mt-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-lg transition-all duration-500 group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)]">
          →
        </span>
      </div>
    </Link>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * distance);
  useMotionValueEvent(scrollYProgress, "change", setProgress);

  return (
    <section ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="container-x mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3">Selected work</p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.9]">
              Things I&apos;ve <span className="text-grad">shipped</span>
            </h2>
          </div>
          <Link href="/work" className="btn btn-ghost hidden whitespace-nowrap md:inline-flex">
            All projects →
          </Link>
        </div>
        <motion.div ref={track} style={{ x }} className="flex h-[58vh] gap-6 pl-[clamp(16px,4vw,56px)] pr-[10vw] will-change-transform md:gap-10">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} total={projects.length} />
          ))}
        </motion.div>
        <div className="container-x mt-8">
          <div className="h-px w-full bg-[var(--line)]">
            <div className="h-px bg-[var(--fg)]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
