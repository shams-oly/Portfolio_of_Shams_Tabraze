"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { SCREENS, type ScreenKey, type ScreenMap } from "./screens";

const Ctx = createContext<ScreenMap>({});
export const ScreensProvider = ({ value, children }: { value: ScreenMap; children: ReactNode }) => (
  <Ctx.Provider value={value}>{children}</Ctx.Provider>
);
export const useScreens = () => useContext(Ctx);

export function UniwayMark({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] font-uniway font-bold leading-none ${className}`}>
      <svg viewBox="0 0 40 28" className="h-[0.9em] w-auto" aria-hidden>
        <path d="M20 2 38 9 20 16 2 9Z" fill="#F37500" />
        <path d="M9 12v7c0 3 5 6 11 6s11-3 11-6v-7l-11 4.5Z" fill={light ? "#fff" : "currentColor"} />
        <path d="M35 10v9" stroke="#F37500" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>
        Uni<span className={light ? "text-white/70" : "text-[#F37500]"}>way</span>
      </span>
    </span>
  );
}

/** Screen shown when an exported Figma frame isn't in /public/case/uniway yet. */
function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#fff4ea] to-white text-[#404040]">
      <UniwayMark className="text-[22px]" />
      <span className="rounded-full bg-[#F37500]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F37500]">
        {label}
      </span>
    </div>
  );
}

/**
 * iPhone-style frame around an exported Figma screen. Tall screens scroll
 * inside the frame on hover (or automatically with `autoScroll`).
 */
export function Phone({
  screen,
  className = "",
  autoScroll = false,
  hoverScroll = true,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 320px",
  shadow = true,
}: {
  screen: ScreenKey;
  className?: string;
  autoScroll?: boolean;
  hoverScroll?: boolean;
  priority?: boolean;
  sizes?: string;
  shadow?: boolean;
}) {
  const screens = useScreens();
  const src = screens[screen];
  const meta = SCREENS[screen];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [hover, setHover] = useState(false);
  const extra = Math.max(0, meta.h - 812);
  const travel = extra ? `-${((extra / meta.h) * 100).toFixed(2)}%` : "0%";
  const scrolling = extra > 0 && ((hoverScroll && hover) || (autoScroll && inView));

  return (
    <div
      ref={ref}
      className={`relative aspect-[375/812] select-none rounded-[13%/6%] bg-[#0b0b0f] p-[3.2%] ${
        shadow ? "shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]" : ""
      } ${className}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-white">
        {src ? (
          <motion.div
            className="relative w-full"
            style={{ aspectRatio: `375 / ${meta.h}` }}
            animate={{ y: scrolling ? travel : "0%" }}
            transition={{
              duration: scrolling ? Math.max(2.5, extra / 120) : 0.9,
              ease: [0.45, 0, 0.25, 1],
              delay: scrolling && autoScroll && !hover ? 0.8 : 0,
              repeat: scrolling && autoScroll && !hover ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 1.2,
            }}
          >
            <Image src={src} alt={meta.label} fill sizes={sizes} priority={priority} className="object-cover object-top" />
          </motion.div>
        ) : (
          <Placeholder label={meta.label} />
        )}
        <div className="pointer-events-none absolute left-1/2 top-[1.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0b0f]" />
      </div>
    </div>
  );
}
