/**
 * Uniway 2026 redesign — UI kit.
 * Screens are drawn on a 375pt canvas and use the portfolio's theme tokens,
 * so they follow light/dark automatically.
 */
import type { ReactNode } from "react";

const P: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5z",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2.5-11.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14m0 3h.01",
  users: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1m6.5-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 19v-1a4 4 0 0 0-3-3.9M15 3.1a3.5 3.5 0 0 1 0 6.8",
  user: "M19 20v-1a5 5 0 0 0-5-5h-4a5 5 0 0 0-5 5v1m7-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  bell: "M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8m4.3 12a2 2 0 0 0 3.4 0",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3",
  filter: "M4 6h16M7 12h10m-7 6h4",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm7-3a7 7 0 0 1-14 0m7 7v3",
  bookmark: "M6 3h12v18l-6-4-6 4z",
  chevR: "m9 6 6 6-6 6",
  chevL: "m15 6-6 6 6 6",
  check: "m5 12 5 5 9-10",
  x: "M6 6l12 12M18 6 6 18",
  upload: "M12 16V4m-5 5 5-5 5 5M4 20h16",
  file: "M14 3H6v18h12V7zM14 3v4h4",
  cal: "M4 6h16v15H4zM4 10h16M8 3v4m8-4v4",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zm-3.5 9 2.5 2.5 4.5-5",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  msg: "M4 5h16v11H8l-4 4z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18m0-12-2.5 2.5m-7 7L6 18",
  plus: "M12 5v14M5 12h14",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2.2-1.3L14.3 3h-4.6l-.4 2.4a7.5 7.5 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1c.7.6 1.4 1 2.2 1.3l.4 2.4h4.6l.4-2.4c.8-.3 1.5-.7 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3Z",
  card: "M3 6h18v12H3zM3 10h18",
  video: "M3 7h12v10H3zm12 3 6-3v10l-6-3",
};

export function Icon({ n, s = 18, className = "", w = 1.8 }: { n: keyof typeof P | string; s?: number; className?: string; w?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={P[n]} />
    </svg>
  );
}

export function Status() {
  return (
    <div className="flex h-11 items-center justify-between px-7 pt-1 text-[13px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-current p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

const TABS = [
  ["home", "Home"],
  ["compass", "Explore"],
  ["help", "Help"],
  ["users", "Community"],
  ["user", "Profile"],
] as const;

export function TabBar({ active = 0 }: { active?: number }) {
  return (
    <div className="absolute inset-x-3 bottom-4 z-20 flex items-center justify-between rounded-[22px] border border-[var(--line)] bg-[var(--surface)]/90 px-2 py-2 shadow-[0_16px_40px_-18px_rgba(0,0,0,.45)] backdrop-blur-xl">
      {TABS.map(([icon, label], i) =>
        i === active ? (
          <span key={label} className="rounded-xl flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-bold text-white" style={{ background: "var(--grad)" }}>
            <Icon n={icon} s={16} w={2.2} />
            {label}
          </span>
        ) : (
          <span key={label} className="flex h-9 w-11 items-center justify-center text-[var(--fg-3)]">
            <Icon n={icon} s={20} />
          </span>
        ),
      )}
    </div>
  );
}

/** Angular university crest. */
export function Crest({ code, color, size = 44 }: { code: string; color: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-sans font-extrabold text-white ring-2 ring-[var(--surface)]"
      style={{ width: size, height: size, background: color, fontSize: size * 0.32 }}
    >
      {code}
    </span>
  );
}

export function Btn({ children, ghost = false, className = "" }: { children: ReactNode; ghost?: boolean; className?: string }) {
  return ghost ? (
    <span className={`flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--line)] text-[14px] font-bold ${className}`}>{children}</span>
  ) : (
    <span className={`flex h-12 items-center justify-center gap-2 rounded-2xl text-[14px] font-bold text-white shadow-[0_14px_28px_-14px_#F37500] ${className}`} style={{ background: "var(--grad)" }}>
      {children}
    </span>
  );
}

export function Chip({ children, on = false }: { children: ReactNode; on?: boolean }) {
  return (
    <span
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 text-[13px] font-semibold ${
        on ? "bg-[var(--fg)] text-[var(--bg)]" : "border border-[var(--line)] text-[var(--fg-2)]"
      }`}
    >
      {children}
    </span>
  );
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "lime" | "pink" | "violet" | "blue" }) {
  const t = {
    neutral: "bg-[var(--bg-2)] text-[var(--fg-2)]",
    lime: "bg-[#16a34a] text-white",
    pink: "bg-[#E5484D]/15 text-[#E5484D]",
    violet: "bg-[#F37500]/15 text-[#F37500] dark:text-[#ff9a3d]",
    blue: "bg-[#404040]/15 text-[#404040] dark:text-[#a3a3a3]",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${t}`}>{children}</span>;
}

export function Header({ title, back = true, right }: { title: string; back?: boolean; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-1">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)]">{back && <Icon n="chevL" />}</span>
      <span className="text-[17px] font-extrabold tracking-tight">{title}</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)]">{right}</span>
    </div>
  );
}

export function SectionTitle({ children, action = "See all" }: { children: ReactNode; action?: string | null }) {
  return (
    <div className="mb-3 flex items-baseline justify-between px-5">
      <span className="text-[17px] font-extrabold tracking-tight">{children}</span>
      {action && <span className="text-[12px] font-semibold text-[var(--fg-3)]">{action} →</span>}
    </div>
  );
}

export function Search({ text = "Universities, courses, scholarships…", typed = false }: { text?: string; typed?: boolean }) {
  return (
    <div className="flex gap-2 px-5">
      <div className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
        <Icon n="search" s={18} className="text-[var(--fg-3)]" />
        <span className={`flex-1 truncate text-[13.5px] ${typed ? "font-semibold" : "text-[var(--fg-3)]"}`}>{text}</span>
        <Icon n="mic" s={18} className="text-[var(--fg-3)]" />
      </div>
      <span className="rounded-xl flex h-12 w-12 shrink-0 items-center justify-center text-white" style={{ background: "var(--grad)" }}>
        <Icon n="filter" s={20} w={2.2} />
      </span>
    </div>
  );
}

/** Abstract campus artwork (no photos needed). */
export function Campus({
  hue = "#F37500",
  src,
  pos = "center",
  className = "",
  children,
}: {
  hue?: string;
  src?: string;
  pos?: string;
  className?: string;
  children?: ReactNode;
}) {
  const abs = /(^|\s)(absolute|fixed)(\s|$)/.test(className);
  return (
    <div className={`overflow-hidden ${abs ? "" : "relative"} ${className}`} style={{ background: `linear-gradient(160deg, ${hue}, #0d0d12)` }}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: pos }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      {children}
    </div>
  );
}

export const UNIS = [
  { name: "Harvard University", short: "Harvard", code: "HU", place: "Cambridge, USA", color: "#A51C30", fee: "$59k", match: 92, photo: "/case/uniway/campus-harvard.jpg" },
  { name: "University of Toronto", short: "Toronto", code: "UT", place: "Toronto, Canada", color: "#1E3765", fee: "C$61k", match: 88, photo: "/case/uniway/campus-toronto.jpg" },
  { name: "Stanford University", short: "Stanford", code: "SU", place: "Stanford, USA", color: "#8C1515", fee: "$58k", match: 84, photo: undefined },
  { name: "University of Oxford", short: "Oxford", code: "OX", place: "Oxford, UK", color: "#002147", fee: "£39k", match: 81, photo: undefined },
  { name: "McGill University", short: "McGill", code: "MG", place: "Montréal, Canada", color: "#ED1B2F", fee: "C$45k", match: 79, photo: undefined },
  { name: "TU Munich", short: "TUM", code: "TU", place: "Munich, Germany", color: "#3070B3", fee: "€6k", match: 77, photo: undefined },
];
