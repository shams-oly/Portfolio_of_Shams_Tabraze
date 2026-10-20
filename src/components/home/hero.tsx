"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { EASE, EASE_OUT, Magnetic, SplitReveal } from "@/components/motion";
import type { Profile } from "@/lib/types";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

function RotatingRole({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (roles.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);
  // All roles share one grid cell so the box is as wide as the longest role.
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {roles.map((r, j) => (
        <motion.span
          key={r}
          aria-hidden={j !== i}
          initial={false}
          animate={{ y: j === i ? "0%" : j === (i - 1 + roles.length) % roles.length ? "-110%" : "110%", opacity: j === i ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-grad col-start-1 row-start-1 whitespace-nowrap pb-[0.08em]"
        >
          {r}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ profile, icons }: { profile: Profile; icons: string[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 800], [0, -160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [first, ...rest] = profile.shortName.split(" ");

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: EASE_OUT, delay: 0.3 }}
      >
        {mounted && !reduce && <HeroScene icons={icons} dark={resolvedTheme !== "light"} />}
        {mounted && reduce && (
          <div className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl" style={{ background: "var(--grad)" }} />
        )}
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="container-x pointer-events-none relative flex h-full flex-col justify-end pb-[9vh]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          {profile.available && (
            <span className="clip-corner-sm flex items-center gap-2 bg-[var(--lime)] px-3 py-1.5 text-xs font-bold text-black">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
              </span>
              Open to opportunities
            </span>
          )}
          <span className="label">{profile.location}</span>
        </motion.div>

        <h1 className="font-display text-[clamp(3.2rem,10.5vw,10.5rem)] font-extrabold leading-[0.86]">
          <SplitReveal text={first} delay={0.35} />
          <br />
          <span className="flex items-end gap-[0.12em]">
            <SplitReveal text={rest.join(" ")} delay={0.5} />
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 1.1 }}
              className="mb-[0.14em] inline-block h-[0.22em] w-[0.22em] bg-[var(--accent-3)] clip-corner-sm"
            />
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.9 }}
            className="font-display text-[clamp(1.35rem,2.4vw,2.2rem)] font-semibold leading-tight"
          >
            <RotatingRole roles={profile.roles} />
            <br />
            <span className="text-[var(--fg-2)]">{profile.tagline}</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 1.05 }}
            className="pointer-events-auto flex flex-wrap gap-3 md:justify-end"
          >
            <Magnetic>
              <Link href="/work" className="btn btn-primary" data-cursor="Explore">
                See the work <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="btn btn-ghost backdrop-blur">
                Get in touch
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="label absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="relative h-8 w-px overflow-hidden bg-[var(--line)]">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-[var(--fg)]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll
      </motion.div>
    </section>
  );
}
