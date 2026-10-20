"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { EASE, EASE_OUT, FadeIn } from "@/components/motion";
import { competitors, empathyMaps, interviewGroups, journey, personas, stories } from "./data";
import { ChapterHead } from "./parts";

/* ---------- Interview guide: tabbed question sets ---------- */

function InterviewGuide() {
  const [g, setG] = useState(1);
  const group = interviewGroups[g];
  return (
    <div className="mt-[8vh] grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="font-uniway text-2xl font-bold">The interview guide</p>
        <p className="mt-2 text-[var(--fg-2)]">Five themes, 20+ questions. Pick one.</p>
        <LayoutGroup>
          <div className="mt-6 flex flex-wrap gap-2 md:flex-col md:items-start">
            {interviewGroups.map((x, i) => (
              <button
                key={x.title}
                onClick={() => setG(i)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${g === i ? "text-white" : "text-[var(--fg-2)] hover:text-[var(--fg)]"}`}
              >
                {g === i && <motion.span layoutId="iq" className="absolute inset-0 rounded-full bg-[#F37500]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">
                  {String(i + 1).padStart(2, "0")} {x.title}
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <div className="relative min-h-[320px] rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.ol key={g} className="space-y-3" initial="h" animate="s" exit="h">
            {group.questions.map((q, i) => (
              <motion.li
                key={q}
                variants={{ h: { opacity: 0, x: 24 }, s: { opacity: 1, x: 0, transition: { delay: i * 0.06, ease: EASE_OUT, duration: 0.5 } } }}
                className="flex gap-4 border-b border-[var(--line)] pb-3 last:border-0"
              >
                <span className="font-mono text-xs text-[#F37500]">Q{i + 1}</span>
                <span className="font-medium">{q}</span>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Empathy maps: participant switcher ---------- */

const QUADS = [
  { k: "says", label: "Says", icon: "💬" },
  { k: "thinks", label: "Thinks", icon: "💭" },
  { k: "does", label: "Does", icon: "🛠️" },
  { k: "feels", label: "Feels", icon: "❤️" },
] as const;

function EmpathyMaps() {
  const [p, setP] = useState(0);
  const m = empathyMaps[p];
  return (
    <div className="mt-[14vh]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Empathy maps</p>
          <p className="mt-3 max-w-md text-[var(--fg-2)]">What three interviewees said, thought, did and felt while trying to study abroad.</p>
        </div>
        <div className="flex gap-2 rounded-full border border-[var(--line)] p-1">
          {empathyMaps.map((e, i) => (
            <button
              key={e.who}
              onClick={() => setP(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${p === i ? "bg-[var(--fg)] text-[var(--bg)]" : "text-[var(--fg-3)]"}`}
            >
              {String.fromCharCode(65 + i)}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <p className="label mt-8">
            {m.who} — {m.context}
          </p>
          <div className="relative mt-4 grid gap-4 md:grid-cols-2">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[var(--bg)] bg-[#F37500] font-uniway text-3xl font-black text-white md:flex">
              {String.fromCharCode(65 + p)}
            </div>
            {QUADS.map((q, i) => (
              <motion.div
                key={q.k}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE_OUT }}
                style={{ transformPerspective: 900 }}
                className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6"
              >
                <p className="flex items-center gap-2 font-uniway text-lg font-bold text-[#F37500]">
                  <span>{q.icon}</span> {q.label}
                </p>
                <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-[var(--fg-2)]">
                  {m[q.k].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--fg-3)]" />
                      {q.k === "says" ? `“${t}”` : t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Personas: 3D tilt cards ---------- */

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function Personas() {
  return (
    <div className="mt-[14vh]">
      <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Meet the people we designed for</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {personas.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.12}>
            <TiltCard className="h-full overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)]">
              <div className="relative p-8" style={{ background: `linear-gradient(135deg, ${p.tone}22, transparent 70%)` }}>
                <div className="flex items-center gap-5">
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-full font-uniway text-2xl font-black text-white"
                    style={{ background: p.tone }}
                  >
                    {p.initials}
                  </span>
                  <div>
                    <p className="font-uniway text-3xl font-bold">{p.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.facts.map(([k, v]) => (
                        <span key={k} className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs">
                          <span className="text-[var(--fg-3)]">{k}</span> {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-6 font-uniway text-xl leading-snug">
                  <span className="text-4xl leading-none text-[#F37500]">“</span>
                  {p.quote}
                </p>
              </div>
              <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
                {[
                  ["Goals", p.goals, "✓"],
                  ["Frustrations", p.frustrations, "✕"],
                ].map(([title, list, mark]) => (
                  <div key={title as string} className="bg-[var(--surface)] p-6">
                    <p className="label mb-3">{title as string}</p>
                    <ul className="space-y-2 text-sm leading-relaxed">
                      {(list as string[]).map((g) => (
                        <li key={g} className="flex gap-2">
                          <span className={mark === "✓" ? "text-emerald-500" : "text-rose-500"}>{mark as string}</span>
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TiltCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ---------- User stories: chat bubbles ---------- */

function Stories() {
  return (
    <div className="mt-[14vh] grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <div className="md:sticky md:top-28 md:self-start">
        <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">User stories</p>
        <p className="mt-3 text-[var(--fg-2)]">“As a…, I need…, so that…” — five stories that became our feature list.</p>
      </div>
      <div className="space-y-4">
        {stories.map((s, i) => {
          const right = i % 2 === 1;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30, scale: 0.9, x: right ? 30 : -30 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`flex items-end gap-3 ${right ? "flex-row-reverse" : ""}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-2)] text-sm font-bold">
                {s.name[0]}
              </span>
              <div
                className={`max-w-[34rem] rounded-3xl px-5 py-4 ${right ? "rounded-br-md bg-[#F37500] text-white" : "rounded-bl-md border border-[var(--line)] bg-[var(--surface)]"}`}
              >
                <p className={`mb-1 text-xs font-semibold ${right ? "text-white/80" : "text-[#F37500]"}`}>{s.name}</p>
                <p className="leading-relaxed">{s.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Journey map: emotion curve draws on scroll ---------- */

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const draw = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const n = journey.steps.length;
  const pts = journey.steps.map((s, i) => ({ x: ((i + 0.5) / n) * 100, y: 90 - (s.mood / 5) * 80 }));
  const W = 1000;
  const H = 200;
  const d = pts.reduce((acc, p, i) => {
    const X = (p.x / 100) * W;
    const Y = (p.y / 100) * H;
    if (i === 0) return `M ${X} ${Y}`;
    const prev = pts[i - 1];
    const PX = (prev.x / 100) * W;
    const PY = (prev.y / 100) * H;
    const cx = (PX + X) / 2;
    return `${acc} C ${cx} ${PY}, ${cx} ${Y}, ${X} ${Y}`;
  }, "");
  return (
    <div ref={ref} className="mt-[14vh]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Journey map · {journey.persona}</p>
          <p className="mt-3 max-w-xl text-[var(--fg-2)]">
            <span className="font-semibold text-[#F37500]">Goal:</span> {journey.goal}
          </p>
        </div>
        <p className="label">With today&apos;s tools — before Uniway</p>
      </div>
      <div className="mt-8 overflow-x-auto" data-lenis-prevent-wheel>
        <div className="min-w-[820px] rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <div className="grid grid-cols-5 gap-3">
            {journey.steps.map((s, i) => (
              <div key={s.stage} className="rounded-2xl bg-[var(--bg)] p-4">
                <p className="font-mono text-xs text-[#F37500]">{String(i + 1).padStart(2, "0")}</p>
                <p className="font-uniway text-lg font-bold">{s.stage}</p>
                <ul className="mt-2 space-y-1 text-xs text-[var(--fg-3)]">
                  {s.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-48 rounded-2xl bg-[var(--bg)]">
            <span className="label absolute left-4 top-3 !text-[0.6rem]">Feelings</span>
            <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <motion.path d={d} fill="none" stroke="#F37500" strokeWidth="3" strokeLinecap="round" style={{ pathLength: draw }} />
            </svg>
            {journey.steps.map((s, i) => (
              <JourneyEmoji key={s.stage} x={pts[i].x} y={pts[i].y} emoji={s.emoji} at={i / (n - 1)} progress={draw} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {journey.steps.map((s, i) => (
              <motion.div
                key={s.stage}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-dashed border-[#F37500]/50 p-4 text-sm"
              >
                <p className="label mb-1 !text-[0.6rem] !text-[#F37500]">Opportunity</p>
                {s.opportunity}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyEmoji({ x, y, emoji, at, progress }: { x: number; y: number; emoji: string; at: number; progress: MotionValue<number> }) {
  const s = useTransform(progress, [Math.max(0, at - 0.1), at + 0.02], [0, 1]);
  return (
    <motion.span
      className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl drop-shadow"
      style={{ left: `${x}%`, top: `${y}%`, scale: s }}
    >
      {emoji}
    </motion.span>
  );
}

/* ---------- Competitors ---------- */

function Competitors() {
  return (
    <div className="mt-[14vh]">
      <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Competitor analysis</p>
      <p className="mt-3 max-w-xl text-[var(--fg-2)]">Three popular study-abroad products, judged on what students told us matters.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {competitors.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 60, rotate: (i - 1) * 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl font-uniway text-xl font-black text-white" style={{ background: c.color }}>
                {c.name.slice(-1)}
              </span>
              <div>
                <p className="font-uniway text-lg font-bold">{c.name}</p>
                <p className="text-xs text-[var(--fg-3)]">{c.kind}</p>
              </div>
            </div>
            <p className="label mt-6 mb-2 !text-emerald-500">Strengths</p>
            <ul className="space-y-1.5 text-sm">
              {c.strengths.map((s) => (
                <li key={s}>+ {s}</li>
              ))}
            </ul>
            <p className="label mt-5 mb-2 !text-rose-500">Weaknesses</p>
            <ul className="space-y-1.5 text-sm text-[var(--fg-2)]">
              {c.weaknesses.map((s) => (
                <li key={s}>− {s}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ResearchSection() {
  return (
    <section className="container-x">
      <ChapterHead
        n="03"
        eyebrow="Research"
        title="We asked before we drew."
        intro="Secondary research shaped our interview guide. Then we interviewed students, graduates and working professionals planning to study abroad, and mapped what we heard."
      />
      <InterviewGuide />
      <EmpathyMaps />
      <Personas />
      <Stories />
      <Journey />
      <Competitors />
    </section>
  );
}
