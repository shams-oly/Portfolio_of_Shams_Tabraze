"use client";

import { motion, useInView } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { APP_SCREENS, type AppScreen } from "./app/screens";

export function UniwayMark({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] font-display font-extrabold leading-none tracking-[-0.04em] ${className}`}>
      <svg viewBox="0 0 40 28" className="h-[0.85em] w-auto" aria-hidden>
        <path d="M20 2 38 9 20 16 2 9Z" fill={light ? "#fff" : "#8b3dff"} />
        <path d="M9 12v7c0 3 5 6 11 6s11-3 11-6v-7l-11 4.5Z" fill={light ? "rgba(255,255,255,.7)" : "currentColor"} />
      </svg>
      <span>
        Uni<span className={light ? "text-white/70" : "text-grad"}>way</span>
      </span>
    </span>
  );
}

/**
 * Device frame rendering a live, coded Uniway screen (375pt canvas, scaled to fit).
 * Tall screens scroll inside the frame on hover, or automatically with `autoScroll`.
 * `theme` forces light/dark inside the device; by default it follows the site.
 */
export function Phone({
  screen,
  className = "",
  autoScroll = false,
  hoverScroll = true,
  shadow = true,
  theme,
}: {
  screen: AppScreen;
  className?: string;
  autoScroll?: boolean;
  hoverScroll?: boolean;
  shadow?: boolean;
  theme?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
}) {
  const { C, h, label } = APP_SCREENS[screen];
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { margin: "0px 0px -20% 0px" });
  const [scale, setScale] = useState(0);
  const [hover, setHover] = useState(false);

  useLayoutEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 375));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const extra = Math.max(0, h - 812) * scale;
  const scrolling = extra > 0 && ((hoverScroll && hover) || (autoScroll && inView));
  const loop = scrolling && autoScroll && !hover;

  return (
    <div
      role="img"
      aria-label={`Uniway redesign — ${label} screen`}
      className={`relative aspect-[375/812] select-none rounded-[13%/6%] bg-[#0b0b0f] p-[3.2%] ${
        shadow ? "shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.1)]" : ""
      } ${className}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div ref={frame} data-theme={theme} className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-[var(--bg)]">
        {scale > 0 && (
          <motion.div
            animate={{ y: scrolling ? -extra : 0 }}
            transition={{
              duration: scrolling ? Math.max(2.5, (h - 812) / 110) : 0.8,
              ease: [0.45, 0, 0.25, 1],
              delay: loop ? 0.8 : 0,
              repeat: loop ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 1.4,
            }}
          >
            <div style={{ width: 375, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <C />
            </div>
          </motion.div>
        )}
        <div className="pointer-events-none absolute left-1/2 top-[1.6%] z-30 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0b0f]" />
      </div>
    </div>
  );
}
