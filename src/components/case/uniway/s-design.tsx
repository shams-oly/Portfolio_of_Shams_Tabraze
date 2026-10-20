"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { EASE_OUT } from "@/components/motion";
import { styleGuide } from "./data";
import { ChapterHead } from "./parts";
import { Phone } from "./phone";
import type { ScreenKey } from "./screens";

/* ---------- Wireframe ↔ hi-fi comparison slider ---------- */

const PAIRS: { wf: ScreenKey; hi: ScreenKey; label: string; note: string }[] = [
  { wf: "wf-home", hi: "home", label: "Home", note: "Recommendations, scholarships and ECAs stacked by what students asked about most." },
  { wf: "wf-university", hi: "uni-about", label: "University", note: "Tabs for About, Courses, Scholarships and Admission & visa, with one sticky call to action." },
  { wf: "wf-search", hi: "search", label: "Search", note: "Voice and keyword search with filters close to hand — added after testing." },
  { wf: "wf-onboarding", hi: "onboarding-1", label: "Onboarding", note: "Three promises, told in plain language, before any sign-up." },
];

function Compare() {
  const [i, setI] = useState(0);
  const pos = useMotionValue(50);
  const [p, setP] = useState(50);
  useMotionValueEvent(pos, "change", setP);
  const ref = useRef<HTMLDivElement>(null);
  const pair = PAIRS[i];

  const move = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="mt-[8vh] grid items-center gap-10 md:grid-cols-[1fr_auto]">
      <div>
        <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Wireframe → final</p>
        <p className="mt-3 max-w-md text-[var(--fg-2)]">
          Paper sketches became mid-fidelity wireframes, tested, then turned into the final UI. Drag the handle to compare.
        </p>
        <LayoutGroup>
          <div className="mt-8 flex flex-wrap gap-2">
            {PAIRS.map((x, j) => (
              <button
                key={x.label}
                onClick={() => {
                  setI(j);
                  pos.set(50);
                }}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold ${i === j ? "text-white" : "text-[var(--fg-2)]"}`}
              >
                {i === j && <motion.span layoutId="cmp" className="absolute inset-0 rounded-full bg-[#F37500]" />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 max-w-md text-lg leading-relaxed"
          >
            {pair.note}
          </motion.p>
        </AnimatePresence>
      </div>
      <div
        ref={ref}
        className="relative mx-auto w-[min(78vw,330px)] cursor-ew-resize touch-none"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => e.buttons && move(e.clientX)}
        data-cursor="Drag"
      >
        <Phone screen={pair.hi} hoverScroll={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>
          <Phone screen={pair.wf} hoverScroll={false} shadow={false} className="grayscale" />
        </div>
        <div className="pointer-events-none absolute inset-y-[-12px] w-0.5 bg-[#F37500]" style={{ left: `${p}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F37500] text-white shadow-lg">
            ⇆
          </span>
        </div>
        <span className="absolute -top-8 left-0 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-3)]">Wireframe</span>
        <span className="absolute -top-8 right-0 font-mono text-[10px] uppercase tracking-widest text-[#F37500]">Final</span>
      </div>
    </div>
  );
}

/* ---------- Style guide: tokens + live components ---------- */

function Swatches() {
  const [copied, setCopied] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {styleGuide.colors.map((c, i) => (
        <motion.button
          key={c.hex}
          type="button"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, ease: EASE_OUT, duration: 0.7 }}
          whileHover={{ y: -6 }}
          onClick={() => {
            navigator.clipboard?.writeText(c.hex);
            setCopied(c.hex);
            setTimeout(() => setCopied(null), 1400);
          }}
          className="group overflow-hidden rounded-3xl border border-[var(--line)] text-left"
          data-cursor="Copy"
        >
          <div className="relative h-36" style={{ background: c.hex }}>
            <AnimatePresence>
              {copied === c.hex && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-sm font-bold mix-blend-difference text-white"
                >
                  Copied ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="bg-[var(--surface)] p-4">
            <p className="font-mono text-sm font-semibold">{c.hex}</p>
            <p className="text-sm">{c.name}</p>
            <p className="text-xs text-[var(--fg-3)]">{c.use}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function TypeScale() {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="label">Typeface</p>
          <p className="font-uniway text-6xl font-bold">Gilroy</p>
        </div>
        <p className="font-uniway text-7xl font-bold text-[#F37500]">Aa</p>
      </div>
      <div className="mt-6 space-y-3">
        {styleGuide.type.map((t, i) => (
          <motion.div
            key={t.tag}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-baseline gap-4 border-t border-[var(--line)] pt-3"
          >
            <span className="w-8 font-mono text-xs text-[#F37500]">{t.tag}</span>
            <span className="flex-1 font-uniway" style={{ fontWeight: t.weight, fontSize: t.size * 1.6 }}>
              {t.label}
            </span>
            <span className="font-mono text-xs text-[var(--fg-3)]">
              {t.size}px · {t.weight}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--fg-3)]">Specimen shown in a Gilroy-like web font.</p>
    </div>
  );
}

const NAV = ["Home", "Event", "Get help", "Community", "Profile"];
const CHIPS = ["Bachelor", "Masters", "PhD"];

function LiveComponents() {
  const [tab, setTab] = useState(0);
  const [chip, setChip] = useState(1);
  const [saved, setSaved] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
      <p className="label">Components · try them</p>
      <div className="mt-6 space-y-7 font-uniway text-[#404040]">
        <div className="rounded-2xl bg-white p-5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setPressed((v) => !v)}
            className="w-full rounded-xl bg-[#F37500] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_#F37500]"
          >
            {pressed ? "Application started ✓" : "Start your application ($120)"}
          </motion.button>
          <div className="mt-4 flex gap-2">
            {CHIPS.map((c, i) => (
              <button
                key={c}
                onClick={() => setChip(i)}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${chip === i ? "border-[#F37500] bg-[#F37500] text-white" : "border-[#C4C4C4] text-[#404040]"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#eee] p-3">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#8c1515] to-[#5a0d0d]" />
              <div>
                <p className="text-sm font-semibold">Stanford University</p>
                <p className="text-xs text-[#888]">📍 Stanford, United States</p>
              </div>
            </div>
            <motion.button whileTap={{ scale: 0.8 }} onClick={() => setSaved((v) => !v)} aria-label="Bookmark" className="text-xl">
              <motion.span animate={{ scale: saved ? [1, 1.4, 1] : 1 }} className={saved ? "text-[#F37500]" : "text-[#C4C4C4]"}>
                {saved ? "★" : "☆"}
              </motion.span>
            </motion.button>
          </div>
        </div>
        <div className="relative flex justify-between rounded-2xl bg-white px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,.25)]">
          {NAV.map((n, i) => (
            <button key={n} onClick={() => setTab(i)} className="relative flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium">
              {tab === i && <motion.span layoutId="unav" className="absolute inset-0 rounded-xl bg-[#F37500]/10" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
              <span className={`relative h-1.5 w-1.5 rounded-full ${tab === i ? "bg-[#F37500]" : "bg-[#C4C4C4]"}`} />
              <span className={`relative ${tab === i ? "text-[#F37500]" : "text-[#9a9a9a]"}`}>{n}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DesignSection() {
  return (
    <section className="container-x">
      <ChapterHead
        n="06"
        eyebrow="Design"
        title="Warm, clear, and quietly confident."
        intro="Orange carries every action and highlight; graphite text and soft silver dividers keep dense information calm. 40+ components cover 60+ screens."
      />
      <Compare />
      <div className="mt-[14vh]">
        <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Style guide</p>
        <p className="mt-3 text-[var(--fg-2)]">Click a colour to copy it.</p>
        <div className="mt-8">
          <Swatches />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <TypeScale />
          <LiveComponents />
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 · Feature tour: sticky phone, scroll-driven screens ---------- */

const FEATURES: { screen: ScreenKey; title: string; text: string; tag: string }[] = [
  { screen: "questions", tag: "Onboarding", title: "It starts with you", text: "Three quick questions — degree, course and country — personalise everything that follows." },
  { screen: "home", tag: "Home", title: "Everything in one feed", text: "Recommended universities, scholarship categories and upcoming ECAs, ordered by what students asked for most." },
  { screen: "filters", tag: "Search", title: "Filters that think like a student", text: "Filter by country, level, category and provider — the global search that usability testing asked for." },
  { screen: "uni-about", tag: "University", title: "One page, every answer", text: "About, courses, scholarships, admission & visa — and one call to action to start your application." },
  { screen: "upload", tag: "Documents", title: "Upload, check, fix", text: "Upload each document, view demo versions, and get corrections from an expert before you submit." },
  { screen: "scholarship", tag: "Scholarships", title: "Scholarships by category", text: "Browse by IELTS, GRE, GMAT, SAT or ECA — plus articles on how to win them." },
  { screen: "events", tag: "ECA & events", title: "Never miss an event", text: "Top, saved and attended events, online or offline, with one-tap booking." },
  { screen: "check-status", tag: "Tracking", title: "Know where you stand", text: "Live status for every application, from documents received to visa decision." },
];

export function FeatureTour() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(FEATURES.length - 1, Math.max(0, Math.floor(v * FEATURES.length)))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative">
      <div className="container-x pt-[16vh]">
        <ChapterHead n="07" eyebrow="The product" title="Eight moments that matter." />
      </div>
      <div ref={ref} className="relative" style={{ height: `${FEATURES.length * 85}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F37500]/15 blur-3xl md:left-[68%]" />
          <div className="container-x relative grid w-full items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="order-2 md:order-1">
              <div className="mb-8 hidden h-1 w-full max-w-md overflow-hidden rounded-full bg-[var(--line)] md:block">
                <motion.div className="h-full bg-[#F37500]" style={{ width: bar }} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="max-w-lg"
                >
                  <p className="label !text-[#F37500]">
                    {String(active + 1).padStart(2, "0")} · {FEATURES[active].tag}
                  </p>
                  <p className="mt-3 font-uniway text-[clamp(2rem,4.6vw,4.2rem)] font-bold leading-[0.95] tracking-tight">
                    {FEATURES[active].title}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--fg-2)]">{FEATURES[active].text}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 hidden flex-wrap gap-2 md:flex">
                {FEATURES.map((f, i) => (
                  <span
                    key={f.tag}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${i === active ? "bg-[var(--fg)] text-[var(--bg)]" : "bg-[var(--bg-2)] text-[var(--fg-3)]"}`}
                  >
                    {f.tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative order-1 mx-auto w-[min(56vw,300px)] md:order-2 md:mr-[6vw] md:w-[330px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={FEATURES[active].screen}
                  initial={{ opacity: 0, y: 60, rotate: 4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -60, rotate: -4, scale: 0.94 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  <Phone screen={FEATURES[active].screen} autoScroll sizes="330px" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
