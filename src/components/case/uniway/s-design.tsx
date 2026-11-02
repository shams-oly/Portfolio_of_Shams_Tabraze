"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { EASE_OUT } from "@/components/motion";
import type { AppScreen } from "./app/screens";
import { styleGuide } from "./data";
import { ChapterHead } from "./parts";
import { Phone } from "./phone";

/* ---------- Research → redesign decisions ---------- */

const DECISIONS = [
  {
    from: "“Agencies scam people.” Trust came up in every interview.",
    to: "Trust first",
    text: "Home opens on your live application status. Expert notes sit inline on documents, and community answers carry an expert-verified badge.",
    screen: "home" as AppScreen,
  },
  {
    from: "Rifa: “No clear indication of which documents should be submitted.”",
    to: "Show what's missing",
    text: "Every document has one of four states — approved, needs fix, in review, missing — with a demo version one tap away.",
    screen: "documents" as AppScreen,
  },
  {
    from: "Nafee wanted universities shortlisted for his qualifications.",
    to: "Match, don't just list",
    text: "Study preferences power a match score on every university, and requirements become a checklist you can tick off.",
    screen: "university" as AppScreen,
  },
  {
    from: "Testing: users wanted global search; the Event icon confused people.",
    to: "Say it, don't icon it",
    text: "Search and filters live on Home. The active tab shows its label, and events use date blocks instead of an abstract icon.",
    screen: "events" as AppScreen,
  },
];

function Decisions() {
  const [i, setI] = useState(0);
  const d = DECISIONS[i];
  return (
    <div className="mt-[8vh] grid items-center gap-10 md:grid-cols-[1.1fr_auto]">
      <div className="space-y-3">
        {DECISIONS.map((x, j) => (
          <button
            key={x.to}
            onClick={() => setI(j)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setI(j)}
            className={`block w-full rounded-3xl border p-5 text-left transition-colors md:p-6 ${
              i === j ? "border-transparent bg-[var(--surface)] shadow-[var(--shadow)]" : "border-[var(--line)]"
            }`}
          >
            <p className="text-xs text-[var(--fg-3)]">{x.from}</p>
            <div className="mt-2 flex items-center gap-3">
              <span className={`font-mono text-xs ${i === j ? "text-[var(--u)]" : "text-[var(--fg-3)]"}`}>0{j + 1}</span>
              <p className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] font-bold tracking-tight">{i === j ? <span className="text-grad">{x.to}</span> : x.to}</p>
            </div>
            <AnimatePresence initial={false}>
              {i === j && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="overflow-hidden pt-2 leading-relaxed text-[var(--fg-2)]"
                >
                  {x.text}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <div className="relative mx-auto w-[min(70vw,320px)]">
        <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full opacity-40 blur-3xl" style={{ background: "var(--grad)" }} />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={d.screen}
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -40, rotate: -3 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <Phone screen={d.screen} autoScroll />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Light ↔ dark comparison slider ---------- */

const THEME_SCREENS: { s: AppScreen; label: string }[] = [
  { s: "home", label: "Home" },
  { s: "university", label: "University" },
  { s: "documents", label: "Documents" },
  { s: "status", label: "Status" },
];

function ThemeCompare() {
  const [i, setI] = useState(0);
  const [p, setP] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (x: number) => {
    const r = ref.current!.getBoundingClientRect();
    setP(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div className="mt-[14vh] grid items-center gap-12 md:grid-cols-[1fr_auto]">
      <div>
        <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none tracking-tight">Light and dark, one system</p>
        <p className="mt-3 max-w-md text-[var(--fg-2)]">
          Every screen is built on the same tokens as this portfolio, so it switches themes cleanly. Drag the handle — or flip the theme switch
          at the top of the page.
        </p>
        <LayoutGroup>
          <div className="mt-8 flex flex-wrap gap-2">
            {THEME_SCREENS.map((x, j) => (
              <button key={x.s} onClick={() => setI(j)} className={`relative rounded-full px-4 py-2 text-sm font-semibold ${i === j ? "text-white" : "text-[var(--fg-2)]"}`}>
                {i === j && <motion.span layoutId="themecmp" className="absolute inset-0 rounded-full" style={{ background: "var(--grad)" }} />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <div
        ref={ref}
        className="relative mx-auto w-[min(78vw,330px)] cursor-ew-resize touch-none"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => e.buttons && move(e.clientX)}
        data-cursor="Drag"
      >
        <Phone screen={THEME_SCREENS[i].s} theme="dark" hoverScroll={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>
          <Phone screen={THEME_SCREENS[i].s} theme="light" hoverScroll={false} shadow={false} />
        </div>
        <div className="pointer-events-none absolute inset-y-[-14px] w-0.5" style={{ left: `${p}%`, background: "var(--grad)" }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg" style={{ background: "var(--grad)" }}>
            ⇆
          </span>
        </div>
        <span className="absolute -top-8 left-0 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-3)]">Light</span>
        <span className="absolute -top-8 right-0 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-3)]">Dark</span>
      </div>
    </div>
  );
}

/* ---------- Style guide: 2022 vs 2026 ---------- */

const NOW_COLORS = [
  { hex: "#0D0D12", name: "Ink", use: "Text · dark surfaces" },
  { hex: "#F3F1EC", name: "Paper", use: "Light background" },
  { hex: "#8B3DFF", name: "Violet", use: "Brand · focus" },
  { hex: "#C6FF3D", name: "Lime", use: "Success · approved" },
];

function Swatch({ hex, name, use, i }: { hex: string; name: string; use: string; i: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06, ease: EASE_OUT, duration: 0.6 }}
      whileHover={{ y: -5 }}
      onClick={() => {
        navigator.clipboard?.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1300);
      }}
      className="overflow-hidden rounded-2xl border border-[var(--line)] text-left"
      data-cursor="Copy"
    >
      <div className="relative flex h-20 items-center justify-center" style={{ background: hex }}>
        {copied && <span className="text-xs font-bold text-white mix-blend-difference">Copied ✓</span>}
      </div>
      <div className="bg-[var(--surface)] p-3">
        <p className="font-mono text-xs font-semibold">{hex}</p>
        <p className="text-sm">{name}</p>
        <p className="text-[11px] text-[var(--fg-3)]">{use}</p>
      </div>
    </motion.button>
  );
}

function ThenNow() {
  return (
    <div className="mt-[14vh]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none tracking-tight">Style guide · then and now</p>
        <p className="label">Click a colour to copy it</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[var(--line)] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="label">2022 · Original</p>
            <span className="rounded-full bg-[var(--bg-2)] px-3 py-1 text-xs">Gilroy · rounded · light only</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {styleGuide.colors.map((c, i) => (
              <Swatch key={c.hex} {...c} i={i} />
            ))}
          </div>
          <div className="mt-6 space-y-2">
            {styleGuide.type.map((t) => (
              <div key={t.tag} className="flex items-baseline gap-4 border-t border-[var(--line)] pt-2 text-sm">
                <span className="w-6 font-mono text-xs text-[var(--fg-3)]">{t.tag}</span>
                <span className="flex-1 font-uniway" style={{ fontWeight: t.weight }}>
                  {t.label}
                </span>
                <span className="font-mono text-xs text-[var(--fg-3)]">{t.size}px</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface)] p-6 shadow-[var(--shadow)] md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl" style={{ background: "var(--grad)" }} />
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <p className="label !text-[var(--u)]">2026 · Redesign</p>
            <span className="rounded-full bg-[var(--bg-2)] px-3 py-1 text-xs">Syne + Manrope · angular · light & dark</span>
          </div>
          <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {NOW_COLORS.map((c, i) => (
              <Swatch key={c.hex} {...c} i={i} />
            ))}
          </div>
          <div className="rounded-xl relative mt-3 h-10" style={{ background: "var(--grad)" }}>
            <span className="absolute inset-0 flex items-center justify-between px-4 font-mono text-[11px] font-semibold text-white">
              <span>#2F6BFF</span>
              <span>Signature gradient</span>
              <span>#FF3D8B</span>
            </span>
          </div>
          <div className="relative mt-6 space-y-2">
            {[
              ["Display", "Syne 800", "font-display font-extrabold text-2xl tracking-tight"],
              ["Heading", "Syne 700 · 17pt", "font-display font-bold text-lg"],
              ["Body", "Manrope 500 · 13.5pt", "text-sm font-medium"],
              ["Label", "JetBrains Mono · caps", "font-mono text-xs uppercase tracking-widest"],
            ].map(([k, v, cls]) => (
              <div key={k} className="flex items-baseline gap-4 border-t border-[var(--line)] pt-2">
                <span className={`flex-1 ${cls}`}>{k}</span>
                <span className="font-mono text-xs text-[var(--fg-3)]">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Live components (2026) ---------- */

const NAV = ["Home", "Explore", "Help", "Community", "Profile"];
const STATES = [
  { k: "Approved", c: "bg-[#c6ff3d] text-black" },
  { k: "Needs fix", c: "bg-[#ff3d8b]/15 text-[#ff3d8b]" },
  { k: "In review", c: "bg-[#8b3dff]/15 text-[#8b3dff]" },
  { k: "Missing", c: "bg-[var(--bg-2)] text-[var(--fg-2)]" },
];

function LiveComponents() {
  const [tab, setTab] = useState(0);
  const [chip, setChip] = useState(1);
  const [state, setState] = useState(1);
  const [started, setStarted] = useState(false);
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="label mb-5">Primary action</p>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setStarted((v) => !v)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white shadow-[0_14px_28px_-14px_#8b3dff]"
          style={{ background: "var(--grad)" }}
        >
          {started ? "Application started ✓" : "Start your application · $120 →"}
        </motion.button>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Bachelor", "Masters", "PhD"].map((c, i) => (
            <button
              key={c}
              onClick={() => setChip(i)}
              className={`h-10 rounded-xl text-sm font-semibold transition-colors ${chip === i ? "bg-[var(--fg)] text-[var(--bg)]" : "border border-[var(--line)] text-[var(--fg-2)]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="label mb-5">Document state — tap to cycle</p>
        <button onClick={() => setState((s) => (s + 1) % STATES.length)} className="flex w-full items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-left" data-cursor="Tap">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-2)]">📄</span>
          <span className="flex-1">
            <span className="block text-sm font-bold">Academic transcript</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={state}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${STATES[state].c}`}
              >
                {STATES[state].k}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
        <p className="mt-3 text-xs text-[var(--fg-3)]">Colour is never the only signal — every state carries a word.</p>
      </div>
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="label mb-5">Tab bar — the active tab says its name</p>
        <div className="flex items-center justify-between rounded-[22px] border border-[var(--line)] bg-[var(--bg)] p-2">
          {NAV.map((n, i) => (
            <button key={n} onClick={() => setTab(i)} className="relative flex h-10 items-center justify-center px-2 text-xs font-bold">
              {tab === i && (
                <motion.span layoutId="navpill" className="rounded-xl absolute inset-0" style={{ background: "var(--grad)" }} transition={{ type: "spring", stiffness: 500, damping: 36 }} />
              )}
              <span className={`relative ${tab === i ? "px-1.5 text-white" : "text-[var(--fg-3)]"}`}>{tab === i ? n : n[0]}</span>
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
        eyebrow="Redesign · 2026"
        title="Same research. A sharper product."
        intro="In 2022 we shipped a warm orange UI. Four years on, I redesigned every core screen in my own design language — keeping the research and sharpening the decisions it pointed to. Every screen on this page is live code, not an image."
      />
      <Decisions />
      <ThemeCompare />
      <ThenNow />
      <LiveComponents />
    </section>
  );
}

/* ---------- 07 · Feature tour: sticky phone, scroll-driven screens ---------- */

const FEATURES: { screen: AppScreen; title: string; text: string; tag: string }[] = [
  { screen: "questions", tag: "Onboarding", title: "It starts with you", text: "Degree, course and countries — three answers personalise everything that follows." },
  { screen: "home", tag: "Home", title: "Status first, then discovery", text: "Your live application leads; matched universities, scholarships by test and upcoming ECAs follow." },
  { screen: "filters", tag: "Search", title: "Filters that think like a student", text: "Country, level, tuition range and scholarship type in one sheet — the global search testing asked for." },
  { screen: "university", tag: "University", title: "One page, every answer", text: "Match score, tuition, intake and deadline up top; requirements as a checklist; one sticky call to action." },
  { screen: "documents", tag: "Documents", title: "Upload, check, fix", text: "Four clear states, demo documents, and an expert's note exactly where the fix is needed." },
  { screen: "scholarships", tag: "Scholarships", title: "Money, matched", text: "Filtered to your profile, with deadlines and award size visible before you tap." },
  { screen: "events", tag: "ECA & events", title: "Never miss an event", text: "Top, saved and attended — date blocks that read at a glance, and one-tap booking." },
  { screen: "status", tag: "Tracking", title: "Know where you stand", text: "A timeline per university, from submission to visa guidance, with expert help one tap away." },
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
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl md:left-[68%]"
            style={{ background: "var(--grad)" }}
          />
          <div className="container-x relative grid w-full items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="order-2 md:order-1">
              <div className="mb-8 hidden h-1 w-full max-w-md overflow-hidden rounded-full bg-[var(--line)] md:block">
                <motion.div className="h-full" style={{ width: bar, background: "var(--grad)" }} />
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
                  <p className="label !text-[var(--u)]">
                    {String(active + 1).padStart(2, "0")} · {FEATURES[active].tag}
                  </p>
                  <p className="mt-3 font-display text-[clamp(2rem,4.6vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">{FEATURES[active].title}</p>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--fg-2)]">{FEATURES[active].text}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 hidden flex-wrap gap-2 md:flex">
                {FEATURES.map((f, i) => (
                  <span key={f.tag} className={`rounded-full px-3 py-1 text-xs transition-colors ${i === active ? "bg-[var(--fg)] text-[var(--bg)]" : "bg-[var(--bg-2)] text-[var(--fg-3)]"}`}>
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
                  <Phone screen={FEATURES[active].screen} autoScroll />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
