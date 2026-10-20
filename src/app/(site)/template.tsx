"use client";

import { motion } from "motion/react";
import { EASE } from "@/components/motion";

/** Page transition: a curtain wipes up, then the page fades in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top"
        style={{ background: "var(--grad)" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
