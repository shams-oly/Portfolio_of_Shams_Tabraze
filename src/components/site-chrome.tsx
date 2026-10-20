"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { EASE, Magnetic } from "@/components/motion";
import type { Profile } from "@/lib/types";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
  return null;
}

/** Dot + ring cursor. Any element with data-cursor="Label" grows the ring and shows the label. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor], a, button") as HTMLElement | null;
      setLabel(t?.dataset.cursor ?? null);
      setHover(Boolean(t));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--fg)] mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 96 : hover ? 56 : 34,
          height: label ? 96 : hover ? 56 : 34,
          backgroundColor: label ? "rgba(139,61,255,0.92)" : "rgba(0,0,0,0)",
          borderWidth: label ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="absolute inset-0 rounded-full border border-[var(--fg-3)]" style={{ opacity: label ? 0 : 0.6 }} />
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="label !text-[0.65rem] !text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted ? resolvedTheme === "dark" : true;
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--fg)]"
    >
      <motion.span
        className="block h-4 w-4 rounded-full"
        animate={{
          background: dark ? "var(--fg)" : "linear-gradient(135deg,#ffb020,#ff3d8b)",
          boxShadow: dark ? "inset -5px -3px 0 0 var(--bg)" : "0 0 14px 2px rgba(255,176,32,0.6)",
          rotate: dark ? -30 : 0,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </button>
  );
}

function Logo({ profile }: { profile: Profile }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.shortName} — home`}>
      {profile.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={profile.logo} alt="" className="h-9 w-auto" />
      ) : (
        <span className="clip-corner-sm flex h-9 w-9 items-center justify-center bg-[var(--fg)] font-display text-sm font-extrabold text-[var(--bg)] transition-transform duration-500 group-hover:rotate-90">
          ST
        </span>
      )}
      <span className="hidden font-display text-[0.95rem] font-bold sm:block">{profile.shortName}</span>
    </Link>
  );
}

export function Nav({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 40);
    setHidden(scroll > 300 && direction === 1);
  });

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`container-x flex h-20 items-center justify-between transition-[background-color,backdrop-filter] duration-500 ${
            scrolled && !open ? "backdrop-blur-xl" : ""
          }`}
        >
          <Logo profile={profile} />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className={`relative ${active ? "text-[var(--fg)]" : ""}`}>{n.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--fg)] sm:block"
            >
              Resume ↓
            </a>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-[var(--line)] md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-px w-4 bg-[var(--fg)]" />
              <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="block h-px w-4 bg-[var(--fg)]" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-[var(--bg)] pb-12 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="container-x">
              {[{ href: "/", label: "Home" }, ...NAV].map((n, i) => (
                <div key={n.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.06 }}
                  >
                    <Link href={n.href} className="block py-1 font-display text-6xl font-bold">
                      {n.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
              <a href={profile.resumeUrl} download className="label mt-8 inline-block">
                Download resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LocalTime({ tz = "Asia/Dhaka" }: { tz?: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date()));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, [tz]);
  return <span suppressHydrationWarning>{t || "--:--"}</span>;
}

export function Footer({ profile }: { profile: Profile }) {
  const lenis = useLenis();
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] pt-24">
      <div className="container-x">
        <p className="label mb-6">Have a project, a role or a research idea?</p>
        <Link href="/contact" data-cursor="Say hi" className="group block">
          <span className="block font-display text-[clamp(3rem,11vw,11rem)] font-extrabold leading-[0.9]">
            Let&apos;s <span className="text-grad">talk</span>
            <span className="inline-block transition-transform duration-700 group-hover:translate-x-6 group-hover:-rotate-45">→</span>
          </span>
        </Link>
        <div className="mt-20 grid gap-10 border-t border-[var(--line)] py-10 text-sm md:grid-cols-4">
          <div>
            <p className="label mb-3">Email</p>
            <a href={`mailto:${profile.email}`} className="hover:underline">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="label mb-3">Elsewhere</p>
            <ul className="space-y-1">
              {profile.socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="hover:underline">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-3">Local time</p>
            <p>
              {profile.location} · <LocalTime />
            </p>
          </div>
          <div className="md:text-right">
            <Magnetic>
              <button
                onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
                className="btn btn-ghost"
                data-cursor="Up"
              >
                Back to top ↑
              </button>
            </Magnetic>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pb-8 text-xs text-[var(--fg-3)] sm:flex-row">
          <span>© {profile.name}</span>
          <span>Designed & built with care in Dhaka</span>
        </div>
      </div>
    </footer>
  );
}
