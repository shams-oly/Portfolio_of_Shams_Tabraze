"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Counter, EASE_OUT, FadeIn } from "@/components/motion";
import { glance, meta, recognition } from "./data";
import { Phone, UniwayMark } from "./phone";
import type { ScreenKey } from "./screens";

const FAN: { screen: ScreenKey; i: number }[] = [
  { screen: "onboarding-1", i: -2 },
  { screen: "recommended", i: -1 },
  { screen: "home", i: 0 },
  { screen: "uni-about", i: 1 },
  { screen: "upload", i: 2 },
];

function useSpread() {
  const [s, setS] = useState(1);
  useEffect(() => {
    const f = () => setS(window.innerWidth < 640 ? 0.55 : window.innerWidth < 1024 ? 0.8 : 1);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return s;
}

function FanPhone({ p, i, spread, screen }: { p: MotionValue<number>; i: number; spread: number; screen: ScreenKey }) {
  const a = Math.abs(i);
  const x = useTransform(p, [0, 0.42], [`${i * 5 * spread}vw`, `${i * 19 * spread}vw`]);
  const y = useTransform(p, [0, 0.42, 0.85], [a * 26, a * 54, -260 - a * 40]);
  const rotate = useTransform(p, [0, 0.42], [i * 7, i * 2]);
  const rotateY = useTransform(p, [0, 0.42], [0, i * -14]);
  const scale = useTransform(p, [0, 0.42, 0.85], [1 - a * 0.04, 1 - a * 0.07, 0.8]);
  const opacity = useTransform(p, [0.6, 0.86], [1, 0]);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[clamp(150px,17vw,270px)] -translate-x-1/2 -translate-y-1/2"
      style={{ x, y, rotate, rotateY, scale, opacity, zIndex: 10 - a, transformPerspective: 1200 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 220, rotate: i * 6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.5 + a * 0.12 }}
      >
        <Phone screen={screen} priority={i === 0} sizes="270px" hoverScroll={false} />
      </motion.div>
    </motion.div>
  );
}

/** Pinned hero: phones fan out on scroll while an orange disc swallows the screen. */
export function UniwayHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const spread = useSpread();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const disc = useTransform(p, [0.36, 0.95], [0.18, 7]);
  const titleScale = useTransform(p, [0, 0.4], [1, 0.82]);
  const titleOpacity = useTransform(p, [0.25, 0.5], [1, 0]);
  const metaOpacity = useTransform(p, [0, 0.18], [1, 0]);

  return (
    <section ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="u-dots absolute inset-0 opacity-70" />
        {/* the orange disc */}
        <motion.div
          className="absolute left-1/2 top-1/2 aspect-square w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F37500]"
          style={{ scale: reduce ? 0.2 : disc }}
        />
        {/* giant wordmark behind the phones */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[17vh] text-center md:top-[13vh]"
          style={{ scale: titleScale, opacity: titleOpacity }}
        >
          <motion.p
            className="label mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Case study · {meta.platform}
          </motion.p>
          <h1 className="font-uniway text-[clamp(5rem,22vw,22rem)] font-extrabold leading-[0.8] tracking-[-0.05em]">
            {"Uniway".split("").map((c, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${i >= 3 ? "text-[#F37500]" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 + i * 0.06 }}
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="absolute inset-0 top-[6vh] md:top-[14vh]" style={{ perspective: 1200 }}>
          {FAN.map((f) => (
            <FanPhone key={f.screen} p={p} i={f.i} spread={spread} screen={f.screen} />
          ))}
        </div>

        <motion.div
          className="container-x absolute inset-x-0 bottom-6 z-20 grid grid-cols-2 gap-3 text-xs md:grid-cols-4 md:gap-4 md:text-sm"
          style={{ opacity: metaOpacity }}
        >
          {[
            ["Role", meta.role],
            ["Team", meta.team],
            ["Timeline", meta.timeline],
            ["Platform", meta.platform],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.08 }}
              className={`rounded-2xl border border-[var(--line)] bg-[var(--bg)]/70 px-4 py-3 backdrop-blur ${i % 2 ? "hidden md:block" : ""}`}
            >
              <p className="label !text-[0.62rem]">{k}</p>
              <p className="mt-1 font-semibold">{v}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** The orange band that the hero disc hands over to. */
export function UniwayGlance() {
  return (
    <section className="relative -mt-px overflow-hidden bg-[#F37500] text-white">
      <div className="u-grid-bg absolute inset-0 opacity-40" />
      <div className="container-x relative pb-[14vh] pt-[8vh]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <FadeIn>
              <UniwayMark light className="text-3xl" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-8 font-uniway text-[clamp(1.8rem,3.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                {meta.summary}
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="space-y-4 text-white/85">
            <p>
              A 12-week team project I led with four designers and a mentor — from 100+ surveys and interviews to a 60-screen
              product and a usability test.
            </p>
            <div className="flex flex-wrap gap-2">
              {meta.tools.map((t) => (
                <span key={t} className="rounded-full border border-white/40 px-3 py-1 text-sm">
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={meta.behance}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#F37500] transition-transform hover:scale-105"
            >
              Original Behance case study ↗
            </Link>
          </FadeIn>
        </div>

        <div className="mt-[10vh] grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/25 md:grid-cols-6">
          {[...glance, ...recognition].map((g, i) => (
            <FadeIn key={g.label} delay={i * 0.06} className="bg-[#F37500] p-6 md:p-8">
              <Counter value={g.value} className="font-uniway text-[clamp(2.4rem,4.6vw,4.4rem)] font-bold leading-none" />
              <p className="mt-2 text-sm text-white/80">{g.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
