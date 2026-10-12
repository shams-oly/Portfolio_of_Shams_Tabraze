"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EASE, EASE_OUT } from "@/components/motion";
import { ProjectVisual } from "@/components/project-visual";
import { CATEGORIES, type Category, type Project } from "@/lib/types";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [view, setView] = useState<"list" | "grid">("list");
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const cats = useMemo(() => CATEGORIES.filter((c) => projects.some((p) => p.category === c.value)), [projects]);
  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <LayoutGroup>
          <div className="flex flex-wrap gap-1">
            {[{ value: "all" as const, label: "All" }, ...cats].map((c) => {
              const count = c.value === "all" ? projects.length : projects.filter((p) => p.category === c.value).length;
              const active = filter === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setFilter(c.value)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "text-[var(--bg)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"}`}
                >
                  {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-[var(--fg)]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">
                    {c.label} <sup className="opacity-60">{count}</sup>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <div className="flex gap-1 rounded-full border border-[var(--line)] p-1 text-sm">
          {(["list", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1.5 capitalize transition-colors ${view === v ? "bg-[var(--surface)] font-semibold shadow-sm" : "text-[var(--fg-3)]"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div
          onPointerMove={(e) => {
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <motion.ul layout>
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.025 }}
                  className="border-b border-[var(--line)]"
                >
                  <Link
                    href={`/work/${p.slug}`}
                    onPointerEnter={() => setHovered(p)}
                    data-cursor="View"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[60px_1.4fr_1fr_120px_40px] md:py-8"
                  >
                    <span className="label hidden md:inline">{String(i + 1).padStart(2, "0")}</span>
                    <span className="clip-corner-sm relative block h-12 w-16 overflow-hidden md:hidden">
                      <ProjectVisual project={p} sizes="64px" fit="cover" />
                    </span>
                    <span className="font-display text-[clamp(1.6rem,4vw,3.4rem)] font-bold leading-none transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4">
                      {p.title}
                    </span>
                    <span className="hidden text-[var(--fg-2)] md:block">{p.subtitle}</span>
                    <span className="hidden text-right text-sm text-[var(--fg-3)] md:block">{p.year}</span>
                    <span className="text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[260px] w-[360px] md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key={hovered.slug}
                  className="clip-corner absolute inset-0 overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <ProjectVisual project={hovered} sizes="360px" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
              >
                <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
                  <div className="clip-corner relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105">
                      <ProjectVisual project={p} sizes="(max-width:640px) 100vw, 33vw" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                    <span className="label">{p.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--fg-2)]">{p.subtitle}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
