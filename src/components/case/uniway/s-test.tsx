"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Counter, EASE_OUT, FadeIn, Magnetic, SplitReveal } from "@/components/motion";
import { affinity, meta, survey, team } from "./data";
import { ChapterHead } from "./parts";
import { Phone } from "./phone";
import type { ScreenKey } from "./screens";

/* ---------- 08 · Testing: survey bars + draggable affinity notes ---------- */

function SurveyBars() {
  return (
    <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <p className="font-uniway text-2xl font-bold">Post-test survey · 11 participants</p>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#F37500]" />Agree</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#C4C4C4]" />Neutral</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#404040]" />Disagree</span>
        </div>
      </div>
      <div className="space-y-5">
        {survey.map((s, i) => (
          <div key={s.q} className="grid items-center gap-2 md:grid-cols-[1fr_1.3fr] md:gap-6">
            <p className="text-sm font-medium">{s.q}</p>
            <div className="flex h-8 overflow-hidden rounded-lg bg-[var(--bg)]">
              {(
                [
                  ["agree", s.agree, "#F37500", "text-white"],
                  ["neutral", s.neutral, "#C4C4C4", "text-[#404040]"],
                  ["disagree", s.disagree, "#404040", "text-white"],
                ] as const
              ).map(([k, v, c, t], j) =>
                v > 0 ? (
                  <motion.div
                    key={k}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v}%` }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 1, ease: EASE_OUT, delay: i * 0.05 + j * 0.15 }}
                    className={`flex items-center justify-center overflow-hidden whitespace-nowrap text-[11px] font-semibold ${t}`}
                    style={{ background: c }}
                  >
                    {v >= 9 ? `${Math.round(v)}%` : ""}
                  </motion.div>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NOTE_COLORS = { problems: "#FFF3B0", exceptions: "#9ED9D3", changes: "#3F6E86" };

function AffinityBoard() {
  const board = useRef<HTMLDivElement>(null);
  const cols = [
    { key: "problems", title: "Common problems", items: affinity.problems },
    { key: "exceptions", title: "Exceptions", items: affinity.exceptions },
    { key: "changes", title: "What we changed", items: affinity.changes },
  ] as const;
  return (
    <div className="mt-[10vh]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-uniway text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">Affinity map</p>
          <p className="mt-3 text-[var(--fg-2)]">What usability testing told us — and what we shipped because of it.</p>
        </div>
        <p className="label">Psst — the notes are draggable</p>
      </div>
      <div ref={board} className="u-dots relative mt-8 grid gap-8 rounded-[2rem] border border-[var(--line)] p-6 md:grid-cols-3 md:p-10">
        {cols.map((c, ci) => (
          <div key={c.key}>
            <p
              className="mb-6 inline-block rounded-md px-4 py-2 text-sm font-bold"
              style={{ background: NOTE_COLORS[c.key], color: c.key === "changes" ? "#fff" : "#1f2937" }}
            >
              {c.title}
            </p>
            <div className="flex flex-wrap gap-4">
              {c.items.map((it, i) => (
                <motion.div
                  key={it}
                  drag
                  dragConstraints={board}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.08, rotate: 0, zIndex: 30 }}
                  initial={{ opacity: 0, y: -80, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: ((i + ci) % 2 ? 1 : -1) * (2 + i) }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 180, damping: 12, delay: ci * 0.2 + i * 0.12 }}
                  className="relative w-40 cursor-grab touch-none p-4 pt-6 text-sm leading-snug shadow-[0_12px_24px_-12px_rgba(0,0,0,.35)] active:cursor-grabbing"
                  style={{ background: NOTE_COLORS[c.key], color: c.key === "changes" ? "#fff" : "#1f2937" }}
                  data-cursor="Drag"
                >
                  <span className="absolute left-1/2 top-0 h-3 w-14 -translate-x-1/2 -translate-y-1/2 bg-white/50" />
                  {it}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestingSection() {
  return (
    <section className="container-x">
      <ChapterHead
        n="08"
        eyebrow="Testing"
        title="Handed to strangers. Mostly, they got it."
        intro="We ran a usability test on the mid-fidelity prototype, followed by a System Usability Scale survey, then grouped what we observed in an affinity map."
      />
      <div className="mt-[8vh] grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { v: "100%", l: "thought most people would learn it quickly" },
          { v: "90.9%", l: "found the main user flow clear" },
          { v: "100%", l: "disagreed it was unnecessarily complex" },
        ].map((s, i) => (
          <FadeIn key={s.l} delay={i * 0.08} className="rounded-3xl bg-[#F37500] p-7 text-white">
            <Counter value={s.v} className="font-uniway text-6xl font-bold" />
            <p className="mt-2 text-white/90">{s.l}</p>
          </FadeIn>
        ))}
      </div>
      <div className="mt-6">
        <SurveyBars />
      </div>
      <AffinityBoard />
    </section>
  );
}

/* ---------- All screens: tilted 3D wall ---------- */

const WALL: ScreenKey[][] = [
  ["splash", "onboarding-1", "onboarding-2", "onboarding-3", "signup", "verification", "login", "questions", "notifications"],
  ["home", "search", "recommended", "all-universities", "filters", "country-results", "uni-about", "uni-courses", "uni-scholarships"],
  ["uni-admission", "services", "upload", "payment", "payment-received", "submitted", "scholarship", "scholarship-page", "ielts"],
  ["eca", "eca-event", "events", "event-page", "internship", "community", "community-post", "chats", "faqs"],
  ["profile", "check-status", "appointment", "appointment-confirmed", "bookmarks", "congratulations", "get-help", "applied", "home"],
];

export function ScreensWall() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["4%", "-22%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-22%", "4%"]);
  const rows = WALL.map((_, i) => (i % 2 ? b : a));
  return (
    <section ref={ref} className="relative mt-[16vh] overflow-hidden bg-[#F37500] py-[12vh]">
      <div className="u-grid-bg absolute inset-0 opacity-40" />
      <div className="container-x relative mb-12 text-white">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">All screens</p>
        <SplitReveal as="h2" text="60+ screens, one system." className="block font-uniway text-[clamp(2.4rem,6vw,5.6rem)] font-bold leading-[0.95]" />
      </div>
      <div className="relative h-[110vh] min-h-[760px]" style={{ perspective: 1600 }}>
        <div
          className="absolute left-1/2 top-0 flex w-[260vw] -translate-x-1/2 flex-col gap-6 md:w-[180vw]"
          style={{ transform: "rotateX(28deg) rotateZ(-14deg)", transformStyle: "preserve-3d" }}
        >
          {WALL.map((row, i) => (
            <motion.div key={i} style={{ x: rows[i] }} className="flex gap-6">
              {row.map((s, j) => (
                <div key={`${s}-${j}`} className="w-[150px] shrink-0 md:w-[210px]">
                  <Phone screen={s} sizes="210px" />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 · Reflection, team, next ---------- */

export function Reflection() {
  return (
    <section className="container-x pt-[16vh]">
      <ChapterHead n="09" eyebrow="Reflection" title="Trust is the feature." />
      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <div className="space-y-5 text-lg leading-relaxed text-[var(--fg-2)]">
            <p>
              Every interview came back to the same word: <span className="font-semibold text-[var(--fg)]">trust</span>. Students didn&apos;t
              lack ambition — they lacked a source they could believe. So the product leans on verifiable things: demo documents,
              expert reviews, live application status and a community moderated by experts.
            </p>
            <p>
              Leading a team of five for twelve weeks taught me to run research as a shared ritual, not a hand-off. Testing changed
              our minds twice — the global search and the Event icon — and both made the product better.
            </p>
            <p>
              Next, I&apos;d validate the hi-fi build with a larger, more varied group, especially students outside major cities, and
              measure the goal-statement metrics after launch.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="label mb-4">The team</p>
          <ul className="divide-y divide-[var(--line)] rounded-3xl border border-[var(--line)]">
            {team.map((t) => (
              <li key={t.name} className="flex items-center justify-between gap-4 px-5 py-4">
                <span className={`font-semibold ${t.me ? "text-[#F37500]" : ""}`}>{t.name}</span>
                <span className="text-right text-sm text-[var(--fg-3)]">{t.role}</span>
              </li>
            ))}
          </ul>
          <Magnetic className="mt-6">
            <Link href={meta.behance} target="_blank" className="btn btn-ghost">
              See it on Behance ↗
            </Link>
          </Magnetic>
        </FadeIn>
      </div>
    </section>
  );
}
