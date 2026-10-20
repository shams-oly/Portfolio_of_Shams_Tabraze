"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { stages } from "./data";
import { UniwayGlance, UniwayHero } from "./hero";
import { StageBand } from "./parts";
import { ScreensProvider } from "./phone";
import type { ScreenMap } from "./screens";
import { DesignSection, FeatureTour } from "./s-design";
import { DefineGoals, DefineSection, IdeateSection } from "./s-define";
import { ProblemSection, ProcessSection } from "./s-problem";
import { ResearchSection } from "./s-research";
import { Reflection, ScreensWall, TestingSection } from "./s-test";

const CHAPTERS = ["Problem", "Process", "Research", "Define", "Ideate", "Design", "Product", "Testing", "Reflection"];

function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div className="pointer-events-none fixed left-4 top-1/2 z-40 hidden h-40 w-1 -translate-y-1/2 overflow-hidden rounded-full bg-[var(--line)] xl:block">
      <motion.div className="h-full w-full origin-top bg-[#F37500]" style={{ scaleY }} />
    </div>
  );
}

export function UniwayCaseStudy({ screens, next }: { screens: ScreenMap; next?: { slug: string; title: string } }) {
  return (
    <ScreensProvider value={screens}>
      <ProgressRail />
      <UniwayHero />
      <UniwayGlance />

      <nav aria-label="Chapters" className="container-x flex flex-wrap gap-2 pt-10">
        {CHAPTERS.map((c, i) => (
          <span key={c} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--fg-3)]">
            {String(i + 1).padStart(2, "0")} {c}
          </span>
        ))}
      </nav>

      <ProblemSection />
      <ProcessSection />

      <StageBand index={1} name={stages[0].name} items={stages[0].items} />
      <ResearchSection />

      <StageBand index={2} name={stages[1].name} items={stages[1].items} />
      <DefineSection />
      <DefineGoals />

      <StageBand index={3} name={stages[2].name} items={stages[2].items} />
      <IdeateSection />

      <StageBand index={4} name={stages[3].name} items={stages[3].items} />
      <DesignSection />
      <FeatureTour />

      <StageBand index={5} name={stages[4].name} items={stages[4].items} />
      <TestingSection />
      <ScreensWall />
      <Reflection />

      {next && (
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group mt-[16vh] block border-t border-[var(--line)]">
          <div className="container-x py-[10vh]">
            <p className="label mb-4">Next project</p>
            <p className="font-display text-[clamp(2.8rem,9vw,8rem)] font-extrabold leading-[0.9] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-6">
              {next.title} →
            </p>
          </div>
        </Link>
      )}
    </ScreensProvider>
  );
}
