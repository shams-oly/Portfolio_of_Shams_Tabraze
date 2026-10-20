"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { EASE_OUT, FadeIn } from "@/components/motion";
import { problemCopy, problems, stages, timeline } from "./data";
import { ChapterHead } from "./parts";

/* ---------- 01 · Problem: stacking cards ---------- */

function StackCard({ i, total, text, progress }: { i: number; total: number; text: string; progress: MotionValue<number> }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [start, Math.min(1, start + 0.35)], [0, (total - 1 - i) * 0.12]);
  return (
    <div className="sticky h-[62vh]" style={{ top: `calc(18vh + ${i * 22}px)` }}>
      <motion.div
        style={{ scale }}
        className="relative flex h-[46vh] min-h-[280px] origin-top flex-col justify-between overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] md:p-10"
      >
        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />
        <div className="flex items-start justify-between">
          <span className="font-uniway text-6xl font-black text-[#F37500]">{String(i + 1).padStart(2, "0")}</span>
          <span className="rounded-full bg-[#F37500]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F37500]">
            Problem
          </span>
        </div>
        <p className="font-uniway text-[clamp(1.4rem,2.4vw,2.2rem)] font-semibold leading-tight">{text}</p>
      </motion.div>
    </div>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="container-x pt-[16vh]">
      <ChapterHead n="01" eyebrow="The problem" title="Thousands of dreams, lost to missing information." />
      <div className="mt-[8vh] grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="md:sticky md:top-[18vh] md:self-start">
          <FadeIn>
            <p className="font-uniway text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-snug">{problemCopy.lead}</p>
            <p className="mt-6 text-lg leading-relaxed text-[var(--fg-2)]">{problemCopy.body}</p>
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-dashed border-[#F37500]/50 p-5">
              <span className="text-4xl">🎓</span>
              <p className="text-sm text-[var(--fg-2)]">
                After our interviews, four frustrations kept coming back. Scroll through them →
              </p>
            </div>
          </FadeIn>
        </div>
        <div ref={ref} className="relative">
          {problems.map((t, i) => (
            <StackCard key={i} i={i} total={problems.length} text={t} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 02 · Process: design-thinking arc + 12-week gantt ---------- */

const ARC_POINTS = [0.08, 0.28, 0.5, 0.72, 0.92];

function ArcNode({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const t = ARC_POINTS[i];
  const angle = Math.PI * (1 - t);
  const cx = 50 + Math.cos(angle) * 42;
  const cy = 8 + Math.sin(angle) * 78;
  const on = useTransform(progress, [t - 0.08, t], [0, 1]);
  const scale = useTransform(on, [0, 1], [0.4, 1]);
  return (
    <motion.span
      style={{ left: `${cx}%`, top: `${cy}%`, scale, opacity: on }}
      className="absolute -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[var(--bg)] bg-[#F37500] font-uniway text-sm font-bold text-white shadow-[0_0_0_6px_rgba(243,117,0,0.18)]"
    >
      {i + 1}
    </motion.span>
  );
}

function StageLegend({ i, progress, name, items }: { i: number; progress: MotionValue<number>; name: string; items: string[] }) {
  const t = ARC_POINTS[i];
  const opacity = useTransform(progress, [t - 0.08, t], [0.25, 1]);
  const y = useTransform(progress, [t - 0.08, t], [12, 0]);
  return (
    <motion.div style={{ opacity, y }} className="border-t-2 border-[#F37500] pt-4">
      <p className="font-mono text-xs text-[#F37500]">0{i + 1}</p>
      <p className="font-uniway text-xl font-bold">{name}</p>
      <ul className="mt-2 space-y-1 text-sm text-[var(--fg-3)]">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function DesignThinkingArc() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative mx-auto mb-[260px] mt-16 hidden aspect-[2.2/1] max-w-5xl md:block">
      <svg viewBox="0 0 100 45.45" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
        <path d="M8 3.6 A42 35.4 0 0 0 92 3.6" fill="none" stroke="var(--line)" strokeWidth="0.35" strokeDasharray="1 1" />
        <motion.path
          d="M8 3.6 A42 35.4 0 0 0 92 3.6"
          fill="none"
          stroke="#F37500"
          strokeWidth="0.6"
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
      </svg>
      <div className="absolute inset-x-0 top-[22%] text-center">
        <p className="label">Our framework</p>
        <p className="mt-2 font-uniway text-3xl font-bold">
          Design <span className="text-[#F37500]">thinking</span>
        </p>
      </div>
      {stages.map((s, i) => (
        <ArcNode key={s.name} i={i} progress={draw} />
      ))}
      <div className="absolute inset-x-0 top-[104%] grid grid-cols-5 gap-6">
        {stages.map((s, i) => (
          <StageLegend key={s.name} i={i} progress={draw} name={s.name} items={s.items} />
        ))}
      </div>
    </div>
  );
}

function StagesMobile() {
  return (
    <ol className="mt-12 space-y-4 md:hidden">
      {stages.map((s, i) => (
        <FadeIn key={s.name} delay={i * 0.05}>
          <li className="flex gap-4 rounded-2xl border border-[var(--line)] p-5">
            <span className="font-uniway text-2xl font-black text-[#F37500]">{i + 1}</span>
            <div>
              <p className="font-uniway text-xl font-bold">{s.name}</p>
              <p className="mt-1 text-sm text-[var(--fg-3)]">{s.items.join(" · ")}</p>
            </div>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}

function Gantt() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="mt-[10vh] overflow-x-auto" data-lenis-prevent-wheel>
      <div className="min-w-[760px] rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="font-uniway text-2xl font-bold">12 weeks, overlapping by design</p>
          <p className="label">Oct 20, 2021 → Jan 2022</p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-12 border-b border-[var(--line)] pb-3">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="label text-center !text-[0.65rem]">
                W{i + 1}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 top-8 grid grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="border-l border-dashed border-[var(--line)] first:border-l-0" />
            ))}
          </div>
          <div className="relative space-y-3 pt-5">
            {timeline.map((t, i) => (
              <div key={t.name} className="relative h-12">
                <motion.button
                  type="button"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
                  className="absolute inset-y-0 flex origin-left items-center gap-3 overflow-hidden rounded-xl px-4 text-left text-sm font-semibold text-white"
                  style={{
                    left: `${((t.start - 1) / 12) * 100}%`,
                    width: `${((t.end - t.start) / 12) * 100}%`,
                    background: t.color,
                  }}
                >
                  <span className="whitespace-nowrap">{t.name}</span>
                  <span
                    className={`truncate text-xs font-normal text-white/85 transition-opacity ${hover === i ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
                  >
                    {t.detail}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section className="container-x pt-[16vh]">
      <ChapterHead
        n="02"
        eyebrow="Process"
        title="Five stages. Twelve weeks. One loop."
        intro="We followed the design-thinking process end to end. Before the empathize stage we ran secondary research, so we knew which questions were worth asking in interviews."
      />
      <DesignThinkingArc />
      <StagesMobile />
      <Gantt />
    </section>
  );
}
