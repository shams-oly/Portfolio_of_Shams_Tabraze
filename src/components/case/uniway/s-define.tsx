"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT, FadeIn } from "@/components/motion";
import { coreFlow, goals, hypotheses, ia, problems } from "./data";
import { ChapterHead } from "./parts";

/* ---------- Problem → hypothesis ---------- */

function ProblemToHypothesis() {
  return (
    <div className="mt-[8vh] grid gap-6 md:grid-cols-2">
      <div className="rounded-[2rem] border border-[var(--line)] p-8">
        <p className="label mb-6">What hurts</p>
        <ol className="space-y-5">
          {problems.map((p, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <li className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-xs font-bold text-rose-500">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-[var(--fg-2)]">{p}</span>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] bg-[#F37500] p-8 text-white">
        <div className="u-grid-bg absolute inset-0 opacity-30" />
        <p className="relative mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/80">We believe that…</p>
        <ol className="relative space-y-5">
          {hypotheses.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, ease: EASE_OUT, duration: 0.7 }}
              className="flex gap-4"
            >
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#F37500]">
                {i + 1}
              </span>
              <span className="font-medium leading-relaxed">{h}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Goal statements: pinned horizontal scroll ---------- */

function Goals() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 64));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * dist);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(goals.length - 1, Math.floor(v * goals.length))));

  return (
    <div ref={section} className="relative mt-[12vh]" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3">Goal statements</p>
            <p className="font-uniway text-[clamp(2rem,4.4vw,4rem)] font-bold leading-[0.95]">Seven promises, each with a metric.</p>
          </div>
          <p className="font-uniway text-5xl font-black text-[#F37500] tabular-nums">
            {String(active + 1).padStart(2, "0")}
            <span className="text-[var(--line)]">/07</span>
          </p>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-5 pl-[clamp(16px,4vw,56px)] pr-[8vw]">
          {goals.map((g, i) => (
            <div
              key={g.title}
              className={`flex h-[42vh] min-h-[300px] w-[78vw] shrink-0 flex-col justify-between rounded-[2rem] p-8 transition-colors duration-500 sm:w-[420px] ${
                i === active ? "bg-[#F37500] text-white" : "border border-[var(--line)] bg-[var(--surface)]"
              }`}
            >
              <span
                className="font-uniway text-[7rem] font-black leading-none"
                style={{ WebkitTextStroke: i === active ? "2px rgba(255,255,255,.7)" : "2px #F37500", color: "transparent" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-uniway text-2xl font-bold">{g.title}</p>
                <p className={`mt-2 leading-relaxed ${i === active ? "text-white/85" : "text-[var(--fg-2)]"}`}>{g.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function DefineSection() {
  return (
    <section className="container-x">
      <ChapterHead
        n="04"
        eyebrow="Define"
        title="From frustrations to a bet worth making."
        intro="We turned every recurring pain point into a testable hypothesis, then wrote goal statements that told us how we'd know it worked."
      />
      <ProblemToHypothesis />
    </section>
  );
}

export { Goals as DefineGoals };

/* ---------- Ideate: core flow + IA ---------- */

const KIND: Record<string, string> = {
  node: "rounded-full bg-[#F37500] text-white",
  step: "rounded-2xl border-2 border-[#F37500] bg-[var(--surface)]",
  decision: "rotate-45 bg-[#F37500] text-white",
  end: "rounded-2xl bg-[var(--fg)] text-[var(--bg)]",
};

function CoreFlow() {
  return (
    <div className="mt-[8vh] rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-uniway text-2xl font-bold">Core flow · Apply with confidence</p>
        <p className="label">University → documents → expert</p>
      </div>
      <div className="flex flex-wrap items-center gap-y-8">
        {coreFlow.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.12 }}
              className={`flex items-center justify-center text-center text-xs font-semibold ${KIND[s.kind]} ${
                s.kind === "decision" ? "h-16 w-16" : s.kind === "node" ? "h-24 w-24 p-2" : "min-h-14 px-4 py-3"
              }`}
            >
              <span className={s.kind === "decision" ? "-rotate-45 leading-tight" : ""}>{s.label}</span>
            </motion.div>
            {i < coreFlow.length - 1 && (
              <svg width="52" height="12" viewBox="0 0 52 12" className="mx-1 shrink-0">
                <motion.path
                  d="M2 6 H44"
                  stroke="#F37500"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
                />
                <motion.path
                  d="M42 1 L50 6 L42 11"
                  stroke="#F37500"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.4 }}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-xs text-[var(--fg-3)]">
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#F37500]" /> Action</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded border-2 border-[#F37500]" /> Screen</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rotate-45 bg-[#F37500]" /> Decision</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-[var(--fg)]" /> Outcome</span>
      </div>
    </div>
  );
}

function IATree() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-[10vh]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Information architecture</p>
        <p className="label">Tap a branch to expand</p>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {ia.onboarding.map((o, i) => (
          <FadeIn key={o} delay={i * 0.06} className="flex items-center gap-2">
            <span className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm">{o}</span>
            <span className="text-[var(--fg-3)]">→</span>
          </FadeIn>
        ))}
        <FadeIn delay={0.3}>
          <span className="rounded-xl bg-[#F37500] px-5 py-2 text-sm font-bold text-white">{ia.root}</span>
        </FadeIn>
      </div>
      <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {ia.branches.map((b, i) => {
          const isOpen = open === null || open === i;
          return (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07, ease: EASE_OUT, duration: 0.6 }}
              className="relative"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full rounded-xl px-3 py-3 text-sm font-bold transition-colors ${open === i ? "bg-[var(--fg)] text-[var(--bg)]" : "bg-[#F37500] text-white"}`}
              >
                {b.name}
              </button>
              <motion.ul
                animate={{ opacity: isOpen ? 1 : 0.25 }}
                className="ml-4 mt-2 space-y-2 border-l border-dashed border-[#F37500]/60 pl-3"
              >
                {b.children.map((c, j) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07 + j * 0.05 }}
                    className="rounded-lg border border-[#F37500]/40 px-3 py-1.5 text-xs"
                  >
                    {c}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function IdeateSection() {
  return (
    <section className="container-x">
      <ChapterHead
        n="05"
        eyebrow="Ideate"
        title="How it's wired."
        intro="We mapped user flows for the home page, university requirements, scholarships and the community — then organized 60+ screens into one architecture."
      />
      <CoreFlow />
      <IATree />
    </section>
  );
}
