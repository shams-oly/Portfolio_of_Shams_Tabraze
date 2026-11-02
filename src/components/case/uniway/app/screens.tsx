/**
 * Uniway 2026 redesign — 13 screens on a 375pt canvas.
 * Content mirrors the original app's information architecture.
 */
import type { ReactNode } from "react";
import { Btn, Campus, Chip, Crest, Header, Icon, Pill, Search, SectionTitle, Status, TabBar, UNIS } from "./kit";

function Screen({ children, h = 812, tab }: { children: ReactNode; h?: number; tab?: number }) {
  return (
    <div className="relative w-[375px] overflow-hidden bg-[var(--bg)] font-sans text-[var(--fg)]" style={{ height: h }}>
      <Status />
      {children}
      {tab !== undefined && <TabBar active={tab} />}
    </div>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-[-0.04em] ${className}`}>
      Uni<span className="text-grad">way</span>
    </span>
  );
}

/* 01 Splash */
function Splash() {
  return (
    <Screen>
      <div className="grid-lines absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-[38%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl" style={{ background: "var(--grad)" }} />
      <div className="relative flex h-[700px] flex-col items-center justify-center">
        <span className="rounded-2xl mb-6 flex h-20 w-20 items-center justify-center text-white" style={{ background: "var(--grad)" }}>
          <svg viewBox="0 0 40 28" className="h-9 w-auto" aria-hidden>
            <path d="M20 2 38 9 20 16 2 9Z" fill="#fff" />
            <path d="M9 12v7c0 3 5 6 11 6s11-3 11-6v-7l-11 4.5Z" fill="#fff" opacity=".7" />
          </svg>
        </span>
        <Wordmark className="text-[54px] leading-none" />
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--fg-3)]">Higher study, guided</p>
      </div>
      <div className="absolute inset-x-0 bottom-12 flex justify-center">
        <span className="h-1 w-24 overflow-hidden rounded-full bg-[var(--line)]">
          <span className="block h-full w-2/3 rounded-full" style={{ background: "var(--grad)" }} />
        </span>
      </div>
    </Screen>
  );
}

/* 02 Onboarding */
function Onboarding() {
  return (
    <Screen>
      <div className="flex justify-end px-6 pt-2 text-[13px] font-semibold text-[var(--fg-3)]">Skip</div>
      <div className="relative mx-auto mt-6 h-[360px] w-[300px]">
        {UNIS.slice(0, 3).map((u, i) => (
          <div
            key={u.code}
            className="rounded-2xl absolute left-1/2 w-[230px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,.5)]"
            style={{ top: 30 + i * 92, transform: `translateX(-50%) rotate(${(i - 1) * -6}deg) translateX(${(i - 1) * 26}px)`, zIndex: 3 - i }}
          >
            <div className="flex items-center gap-3">
              <Crest code={u.code} color={u.color} size={40} />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold">{u.name}</p>
                <p className="text-[11px] text-[var(--fg-3)]">{u.place}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Pill tone="violet">{u.match}% match</Pill>
              <Icon n="bookmark" s={16} className="text-[var(--fg-3)]" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-3)]">01 / 03</p>
        <h1 className="mt-2 text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em]">
          Universities that <span className="text-grad">fit you</span>, not the other way round.
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--fg-2)]">Matched to your degree, budget and grades — with every requirement in one place.</p>
      </div>
      <div className="absolute inset-x-6 bottom-10 flex items-center justify-between">
        <span className="flex gap-1.5">
          <span className="h-1.5 w-8 rounded-full" style={{ background: "var(--grad)" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
        </span>
        <span className="rounded-xl flex h-14 w-14 items-center justify-center text-white" style={{ background: "var(--grad)" }}>
          <Icon n="arrow" s={22} w={2.2} />
        </span>
      </div>
    </Screen>
  );
}

/* 03 Study questions */
function Questions() {
  return (
    <Screen>
      <div className="px-6 pt-2">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)]">
            <Icon n="chevL" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-3)]">Step 2 of 3</span>
        </div>
        <div className="mt-4 flex gap-1.5">
          {[1, 1, 0].map((on, i) => (
            <span key={i} className="h-1 flex-1 rounded-full" style={{ background: on ? "var(--grad)" : "var(--line)" }} />
          ))}
        </div>
        <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.035em]">What do you want to study?</h1>
        <p className="mt-2 text-[13.5px] text-[var(--fg-2)]">We&apos;ll tailor universities, scholarships and events to this.</p>

        <p className="mt-7 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Degree</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["Bachelor", "Masters", "PhD"].map((d, i) => (
            <span key={d} className={`flex h-12 items-center justify-center rounded-xl text-[13px] font-bold ${i === 1 ? "text-white" : "border border-[var(--line)]"}`} style={i === 1 ? { background: "var(--grad)" } : undefined}>
              {d}
            </span>
          ))}
        </div>

        <p className="mt-6 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Course</p>
        <div className="mt-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="flex flex-wrap gap-2">
            <Chip on>Electrical Engineering ✕</Chip>
            <Chip on>Computer Science ✕</Chip>
          </div>
          <p className="mt-3 text-[13px] text-[var(--fg-3)]">Add another course…</p>
        </div>

        <p className="mt-6 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Countries</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip on>🇺🇸 USA</Chip>
          <Chip on>🇨🇦 Canada</Chip>
          <Chip>🇩🇪 Germany</Chip>
          <Chip>🇬🇧 UK</Chip>
          <Chip>🇯🇵 Japan</Chip>
          <Chip>+ More</Chip>
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-10">
        <Btn>
          Continue <Icon n="arrow" s={18} w={2.2} />
        </Btn>
      </div>
    </Screen>
  );
}

/* 04 Home */
function Home() {
  return (
    <Screen h={1180} tab={0}>
      <div className="flex items-center justify-between px-5 pb-4 pt-2">
        <div>
          <p className="text-[12.5px] text-[var(--fg-3)]">Good evening</p>
          <p className="text-[24px] font-extrabold tracking-[-0.03em]">Hi, Edward 👋</p>
        </div>
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)]">
          <Icon n="bell" s={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#E5484D]" />
        </span>
      </div>
      <Search />

      {/* application status — trust first */}
      <div className="mx-5 mt-5 overflow-hidden rounded-[22px] p-5 text-white" style={{ background: "var(--grad)" }}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6ff3d]" /> Your application
          </span>
          <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10.5px] font-bold">Step 3 / 5</span>
        </div>
        <p className="mt-3 text-[21px] font-extrabold leading-tight">Harvard · MS Electrical Engineering</p>
        <p className="mt-1 text-[12.5px] text-white/80">Documents under expert review — 1 needs a fix</p>
        <div className="mt-4 flex gap-1.5">
          {[1, 1, 1, 0, 0].map((d, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${d ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
      </div>

      <div className="mt-7">
        <SectionTitle>Recommended for you</SectionTitle>
        <div className="flex gap-3 overflow-hidden pl-5">
          {UNIS.slice(0, 3).map((u) => (
            <div key={u.code} className="w-[200px] shrink-0 overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)]">
              <Campus hue={u.color} src={u.photo} className="h-[104px]">
                <span className="absolute left-3 top-3">
                  <Pill tone="violet">{u.match}% match</Pill>
                </span>
              </Campus>
              <div className="relative p-3.5 pt-6">
                <span className="absolute -top-6 left-3.5">
                  <Crest code={u.code} color={u.color} size={42} />
                </span>
                <p className="truncate text-[14px] font-bold">{u.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-[var(--fg-3)]">
                  <Icon n="pin" s={12} /> {u.place}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <SectionTitle>Scholarships by test</SectionTitle>
        <div className="flex gap-2.5 overflow-hidden pl-5">
          {[
            ["ECA based", "Activities", 48],
            ["IELTS", "English", 126],
            ["GRE", "Graduate", 74],
            ["GMAT", "Business", 39],
            ["SAT", "Undergrad", 52],
          ].map(([t, sub, n], k) => (
            <div key={t as string} className="w-[112px] shrink-0 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <div className="flex h-9 items-center">
                {k === 0 ? (
                  <span className="flex h-7 items-center rounded-md bg-white px-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/case/uniway/eca-logo.png" alt="ECA" className="h-3.5 w-auto" />
                  </span>
                ) : (
                  <span className="text-[17px] font-extrabold tracking-tight">{t as string}</span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-[var(--fg-3)]">{sub as string}</p>
              <p className="mt-2 text-[12px] font-bold">{n as number} awards</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <SectionTitle>Upcoming ECAs</SectionTitle>
        <div className="mx-5 flex gap-4 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/case/uniway/eca-olympiad.jpg" alt="" className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <Pill tone="violet">Olympiad</Pill>
            <p className="mt-1.5 text-[14px] font-bold leading-snug">National Mathematical Olympiad 2026</p>
            <p className="mt-1 flex items-center gap-1 text-[11.5px] text-[var(--fg-3)]">
              <Icon n="cal" s={12} /> Dec 18 · Dhaka · Free entry
            </p>
          </div>
        </div>
        <div className="mx-5 mt-3 flex gap-4 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/case/uniway/eca-math.jpg" alt="" className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <Pill tone="blue">Online</Pill>
            <p className="mt-1.5 text-[14px] font-bold leading-snug">Writing an SOP that gets read</p>
            <p className="mt-1 flex items-center gap-1 text-[11.5px] text-[var(--fg-3)]">
              <Icon n="cal" s={12} /> Jan 4 · Online · 2 experts
            </p>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* 05 Search + filters */
function Filters() {
  return (
    <Screen>
      <div className="px-5 pt-2">
        <Search text="Electrical engineering" typed />
      </div>
      <div className="mt-4 flex gap-2 px-5">
        <Chip on>Universities</Chip>
        <Chip>Scholarships</Chip>
        <Chip>Courses</Chip>
      </div>
      <p className="mt-4 px-5 text-[12px] font-semibold text-[var(--fg-3)]">176 results · sorted by match</p>
      <div className="mt-2 space-y-2 px-5 opacity-50">
        {UNIS.slice(0, 2).map((u) => (
          <div key={u.code} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-3">
            <Crest code={u.code} color={u.color} size={36} />
            <span className="text-[13px] font-bold">{u.name}</span>
          </div>
        ))}
      </div>
      {/* bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 h-[560px] rounded-t-[30px] border-t border-[var(--line)] bg-[var(--surface)] px-6 pt-3 shadow-[0_-30px_60px_-20px_rgba(0,0,0,.4)]">
        <span className="mx-auto block h-1 w-10 rounded-full bg-[var(--line)]" />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[20px] font-extrabold">Filters</p>
          <span className="text-[13px] font-semibold text-[var(--fg-3)]">Reset</span>
        </div>
        <p className="mt-5 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Country</p>
        <div className="mt-2 flex h-12 items-center justify-between rounded-xl border border-[var(--line)] px-4 text-[13.5px] font-semibold">
          🇺🇸 United States, 🇨🇦 Canada <Icon n="chevR" s={16} />
        </div>
        <p className="mt-5 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Level</p>
        <div className="mt-2 flex gap-2">
          <Chip>Bachelor</Chip>
          <Chip on>Masters</Chip>
          <Chip>PhD</Chip>
        </div>
        <p className="mt-5 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Tuition per year</p>
        <div className="relative mt-4 h-1.5 rounded-full bg-[var(--line)]">
          <span className="absolute inset-y-0 left-[12%] right-[30%] rounded-full" style={{ background: "var(--grad)" }} />
          <span className="absolute left-[12%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--surface)] bg-[#404040] shadow" />
          <span className="absolute right-[30%] top-1/2 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full border-4 border-[var(--surface)] bg-[#E5484D] shadow" />
        </div>
        <div className="mt-2 flex justify-between text-[11.5px] font-semibold text-[var(--fg-3)]">
          <span>$5k</span>
          <span>$45k</span>
        </div>
        <p className="mt-5 text-[12px] font-bold uppercase tracking-wider text-[var(--fg-3)]">Scholarship type</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip on>ECA based</Chip>
          <Chip>IELTS</Chip>
          <Chip on>GRE waived</Chip>
          <Chip>Need based</Chip>
        </div>
        <div className="absolute inset-x-6 bottom-8">
          <Btn>Show 42 universities</Btn>
        </div>
      </div>
    </Screen>
  );
}

/* 06 University page */
function University() {
  const u = UNIS[0];
  return (
    <Screen h={1240}>
      <Campus hue={u.color} src={u.photo} className="absolute inset-x-0 top-0 h-[270px]" />
      <div className="relative">
        <div className="flex justify-between px-5 pt-1 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 backdrop-blur">
            <Icon n="chevL" />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 backdrop-blur">
            <Icon n="bookmark" />
          </span>
        </div>
        <div className="mx-5 mt-[130px] rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-5 pt-10 shadow-[0_24px_50px_-28px_rgba(0,0,0,.5)]">
          <span className="absolute -mt-[68px]">
            <Crest code={u.code} color={u.color} size={56} />
          </span>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[22px] font-extrabold leading-tight tracking-[-0.02em]">{u.name}</p>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-[var(--fg-3)]">
                <Icon n="pin" s={12} /> {u.place}
              </p>
            </div>
            <Pill tone="violet">{u.match}% match</Pill>
          </div>
          <div className="mt-4 grid grid-cols-3 divide-x divide-[var(--line)] rounded-xl bg-[var(--bg)] py-3 text-center">
            {[
              ["Tuition", u.fee],
              ["Intake", "Fall 27"],
              ["Deadline", "Dec 1"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[16px] font-extrabold">{v}</p>
                <p className="text-[10.5px] text-[var(--fg-3)]">{k}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex gap-5 border-b border-[var(--line)] px-5 text-[13.5px] font-semibold">
          {["About", "Courses", "Scholarships", "Admission & visa"].map((t, i) => (
            <span key={t} className={`relative whitespace-nowrap pb-3 ${i === 0 ? "" : "text-[var(--fg-3)]"}`}>
              {t}
              {i === 0 && <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full" style={{ background: "var(--grad)" }} />}
            </span>
          ))}
        </div>
        <div className="px-5 pt-5">
          <p className="text-[13.5px] leading-relaxed text-[var(--fg-2)]">
            One of the oldest universities in the US, with a strong engineering school, deep research funding and a historic campus in
            Cambridge, Massachusetts.
          </p>
          <p className="mt-6 text-[16px] font-extrabold">What you&apos;ll need</p>
          <div className="mt-3 space-y-2">
            {[
              ["Transcripts", true],
              ["GRE (optional)", true],
              ["IELTS 7.0 / TOEFL 100", true],
              ["3 recommendation letters", false],
              ["Statement of purpose", false],
            ].map(([t, ok]) => (
              <div key={t as string} className="flex items-center justify-between rounded-xl border border-[var(--line)] px-4 py-3 text-[13px] font-semibold">
                {t as string}
                {ok ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#16a34a] text-white">
                    <Icon n="check" s={14} w={2.6} />
                  </span>
                ) : (
                  <Pill>To do</Pill>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[16px] font-extrabold">Campus</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Campus src="/case/uniway/campus-harvard.jpg" pos="20% 60%" className="h-24 rounded-xl" />
            <Campus src="/case/uniway/campus-harvard.jpg" pos="80% 40%" className="h-24 rounded-xl" />
            <Campus src="/case/uniway/campus-toronto.jpg" pos="50% 30%" className="h-24 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-[var(--line)] bg-[var(--bg)]/90 px-5 pb-8 pt-3 backdrop-blur-xl">
        <Btn>
          Start your application · $120 <Icon n="arrow" s={18} w={2.2} />
        </Btn>
      </div>
    </Screen>
  );
}

/* 07 Documents with expert review */
function Documents() {
  const docs: { t: string; s: "ok" | "fix" | "review" | "missing"; note?: string }[] = [
    { t: "Statement of purpose", s: "ok" },
    { t: "Academic transcript", s: "fix", note: "Page 2 is cropped. Please re-scan the full page with the registrar's seal visible." },
    { t: "IELTS score report", s: "review" },
    { t: "Passport", s: "ok" },
    { t: "Bank statement", s: "missing" },
    { t: "Birth certificate", s: "missing" },
  ];
  const tone = { ok: ["lime", "Approved"], fix: ["pink", "Needs fix"], review: ["violet", "In review"], missing: ["neutral", "Missing"] } as const;
  return (
    <Screen h={980}>
      <Header title="Your documents" right={<Icon n="help" />} />
      <div className="mx-5 mt-2 flex items-center gap-4 rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-4">
        <div className="relative h-16 w-16">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" strokeWidth="4" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="url(#ug)" strokeWidth="4" strokeDasharray="94.2" strokeDashoffset="47" strokeLinecap="round" />
            <defs>
              <linearGradient id="ug" x1="0" x2="1">
                <stop offset="0" stopColor="#F37500" />
                <stop offset=".5" stopColor="#F98018" />
                <stop offset="1" stopColor="#FF8A1F" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[15px] font-extrabold">3/6</span>
        </div>
        <div>
          <p className="text-[17px] font-extrabold">Harvard · MS EE</p>
          <p className="text-[12px] text-[var(--fg-3)]">Reviewed by an expert within 24h</p>
        </div>
      </div>
      <div className="mt-5 space-y-2.5 px-5">
        {docs.map((d) => (
          <div key={d.t} className={`rounded-2xl border bg-[var(--surface)] p-4 ${d.s === "fix" ? "border-[#E5484D]/60" : "border-[var(--line)]"}`}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-2)]">
                <Icon n="file" s={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-bold">{d.t}</p>
                <Pill tone={tone[d.s][0]}>{tone[d.s][1]}</Pill>
              </div>
              {d.s === "missing" ? (
                <span className="rounded-xl flex h-9 items-center gap-1 px-3 text-[12px] font-bold text-white" style={{ background: "var(--grad)" }}>
                  <Icon n="upload" s={14} w={2.2} /> Upload
                </span>
              ) : (
                <span className="text-[12px] font-semibold text-[var(--fg-3)]">View demo</span>
              )}
            </div>
            {d.note && (
              <div className="mt-3 flex gap-2.5 rounded-xl bg-[#E5484D]/10 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--fg)] text-[10px] font-bold text-[var(--bg)]">AR</span>
                <p className="text-[12px] leading-relaxed">
                  <span className="font-bold">Expert · Anika R.</span> {d.note}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* 08 Scholarships */
function Scholarships() {
  return (
    <Screen h={1020} tab={1}>
      <div className="px-5 pb-3 pt-2">
        <p className="text-[28px] font-extrabold tracking-[-0.035em]">Scholarships</p>
        <p className="text-[12.5px] text-[var(--fg-3)]">Filtered for Masters · EEE · USA, Canada</p>
      </div>
      <div className="flex gap-2 overflow-hidden px-5">
        <Chip on>All</Chip>
        <Chip>ECA based</Chip>
        <Chip>GRE</Chip>
        <Chip>IELTS</Chip>
        <Chip>Fully funded</Chip>
      </div>
      <div className="relative mx-5 mt-5 overflow-hidden rounded-[24px] bg-[var(--fg)] p-5 text-[var(--bg)]">
        <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-2xl" style={{ background: "var(--grad)" }} />
        <div className="relative">
          <div className="flex items-center justify-between">
            <Pill tone="violet">Fully funded</Pill>
            <span className="text-[11.5px] font-semibold opacity-70">Closes in 12 days</span>
          </div>
          <p className="mt-4 text-[22px] font-extrabold leading-tight">Fulbright Foreign Student Program</p>
          <p className="mt-1 text-[12.5px] opacity-70">Tuition, living stipend, airfare & health cover</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              {["#8C1515", "#A51C30", "#002147"].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full border-2 border-[var(--fg)]" style={{ background: c }} />
              ))}
              <span className="flex h-7 items-center rounded-full border-2 border-[var(--fg)] bg-[var(--bg)] px-2 text-[10px] font-bold text-[var(--fg)]">+140</span>
            </div>
            <span className="flex items-center gap-1 text-[12.5px] font-bold">
              Apply <Icon n="arrow" s={16} w={2.2} />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <SectionTitle>Matched to your profile</SectionTitle>
        <div className="space-y-2.5 px-5">
          {[
            ["Lester B. Pearson Scholarship", "University of Toronto", "ECA based", "violet", "Full"],
            ["Knight-Hennessy Scholars", "Stanford University", "Leadership", "blue", "Full"],
            ["GRE-waived Merit Award", "McGill University", "GRE waived", "pink", "$15k"],
            ["Global Excellence Grant", "University of Oxford", "Need based", "neutral", "£12k"],
          ].map(([t, u, tag, tone, amt]) => (
            <div key={t} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <div className="min-w-0 flex-1">
                <Pill tone={tone as "violet"}>{tag}</Pill>
                <p className="mt-1.5 truncate text-[13.5px] font-bold">{t}</p>
                <p className="text-[11.5px] text-[var(--fg-3)]">{u}</p>
              </div>
              <span className="text-[15px] font-extrabold">{amt}</span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

/* 09 Events / ECA */
function Events() {
  return (
    <Screen h={1000} tab={1}>
      <div className="flex items-center justify-between px-5 pb-3 pt-2">
        <p className="text-[28px] font-extrabold tracking-[-0.035em]">Events</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)]">
          <Icon n="search" />
        </span>
      </div>
      <div className="mx-5 flex rounded-xl bg-[var(--bg-2)] p-1 text-[13px] font-bold">
        {["Top", "Saved", "Attended"].map((t, i) => (
          <span key={t} className={`flex-1 rounded-lg py-2 text-center ${i === 0 ? "bg-[var(--surface)] shadow" : "text-[var(--fg-3)]"}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-4 px-5">
        {[
          { d: "18", m: "Dec", t: "National Mathematical Olympiad 2026", tag: "Olympiad", tone: "violet", where: "Dhaka · Offline", hue: "#F37500", seats: "312 going", img: "/case/uniway/eca-olympiad.jpg" },
          { d: "04", m: "Jan", t: "Writing an SOP that gets read", tag: "Workshop", tone: "blue", where: "Online · Live", hue: "#404040", seats: "1.2k going", img: "/case/uniway/eca-math.jpg" },
          { d: "21", m: "Jan", t: "Study in Germany Virtual Fair", tag: "Fair", tone: "pink", where: "Online · 40 universities", hue: "#E5484D", seats: "860 going", img: "/case/uniway/campus-toronto.jpg" },
        ].map((e, i) => (
          <div key={e.t} className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)]">
            {i === 0 && (
              <Campus hue={e.hue} src={e.img} className="h-[120px]">
                <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">{e.seats}</span>
              </Campus>
            )}
            <div className="flex gap-4 p-4">
              <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-[var(--line)] py-1.5">
                <span className="text-[18px] font-extrabold leading-none">{e.d}</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase text-[var(--fg-3)]">{e.m}</span>
              </div>
              <div className="min-w-0 flex-1">
                <Pill tone={e.tone as "violet"}>{e.tag}</Pill>
                <p className="mt-1.5 text-[14px] font-bold leading-snug">{e.t}</p>
                <p className="mt-1 text-[11.5px] text-[var(--fg-3)]">{e.where}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              <Btn ghost className="!h-10 !text-[13px]">
                <Icon n="bookmark" s={15} /> Save
              </Btn>
              <Btn className="!h-10 !text-[13px]">Book a seat</Btn>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* 10 Application status */
function Status_() {
  const steps = [
    ["Application submitted", "Nov 2", "done"],
    ["Documents verified", "Nov 4", "done"],
    ["Expert review", "In progress · 1 fix needed", "now"],
    ["Sent to university", "Est. Nov 12", "next"],
    ["Decision", "Est. Feb 2027", "next"],
    ["Visa guidance", "After offer", "next"],
  ] as const;
  return (
    <Screen h={1040} tab={4}>
      <Header title="Application status" right={<Icon n="msg" />} />
      <div className="flex gap-2 overflow-hidden px-5">
        {UNIS.slice(0, 3).map((u, i) => (
          <span key={u.code} className={`flex shrink-0 items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-3 text-[12.5px] font-bold ${i === 0 ? "bg-[var(--fg)] text-[var(--bg)]" : "border border-[var(--line)]"}`}>
            <Crest code={u.code} color={u.color} size={26} />
            {u.short}
          </span>
        ))}
      </div>
      <div className="mx-5 mt-5 rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5">
        {steps.map(([t, d, s], i) => (
          <div key={t} className="relative flex gap-4 pb-6 last:pb-0">
            {i < steps.length - 1 && (
              <span className="absolute left-[13px] top-7 h-[calc(100%-20px)] w-0.5" style={{ background: s === "done" ? "var(--grad)" : "var(--line)" }} />
            )}
            <span
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                s === "done" ? "bg-[#16a34a] text-white" : s === "now" ? "text-white ring-4 ring-[#F37500]/25" : "border-2 border-[var(--line)] bg-[var(--surface)]"
              }`}
              style={s === "now" ? { background: "var(--grad)" } : undefined}
            >
              {s === "done" ? <Icon n="check" s={14} w={2.8} /> : s === "now" ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
            </span>
            <div className="-mt-0.5">
              <p className={`text-[14px] font-bold ${s === "next" ? "text-[var(--fg-3)]" : ""}`}>{t}</p>
              <p className={`text-[12px] ${s === "now" ? "font-semibold text-[#E5484D]" : "text-[var(--fg-3)]"}`}>{d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-[22px] p-4 text-white" style={{ background: "var(--grad)" }}>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
          <Icon n="shield" s={20} />
        </span>
        <div className="flex-1">
          <p className="text-[13.5px] font-bold">Stuck? Book a 1:1 expert call</p>
          <p className="text-[11.5px] text-white/80">Free with your application package</p>
        </div>
        <Icon n="chevR" />
      </div>
    </Screen>
  );
}

/* 11 Community */
function Community() {
  return (
    <Screen h={1000} tab={3}>
      <div className="flex items-center justify-between px-5 pb-3 pt-2">
        <p className="text-[28px] font-extrabold tracking-[-0.035em]">Community</p>
        <span className="rounded-xl flex h-10 items-center gap-1 px-3 text-[12.5px] font-bold text-white" style={{ background: "var(--grad)" }}>
          <Icon n="plus" s={15} w={2.4} /> Ask
        </span>
      </div>
      <div className="flex gap-2 overflow-hidden px-5">
        <Chip on>All</Chip>
        <Chip>Visa</Chip>
        <Chip>Scholarships</Chip>
        <Chip>SOP</Chip>
        <Chip>Germany</Chip>
      </div>
      <div className="mt-5 space-y-3 px-5">
        {[
          { q: "How long does a German student visa take from Dhaka right now?", who: "Rifa K.", tag: "Visa", tone: "blue", ans: "Wait times change with the season — book your embassy appointment as early as you can, even before the admission letter arrives.", n: 24 },
          { q: "Do ECAs actually matter for Canadian master's scholarships?", who: "Nafee A.", tag: "Scholarships", tone: "violet", ans: "For many named awards, yes — leadership and volunteering count. Show how they connect to your field.", n: 41 },
          { q: "Which bank should I use to pay my application fee abroad?", who: "Sayor A.", tag: "Payments", tone: "pink", ans: null, n: 6 },
        ].map((p) => (
          <div key={p.q} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[12px] font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-2)] text-[10px] font-bold">{p.who[0]}</span>
                {p.who}
              </span>
              <Pill tone={p.tone as "violet"}>{p.tag}</Pill>
            </div>
            <p className="mt-3 text-[14.5px] font-bold leading-snug">{p.q}</p>
            {p.ans ? (
              <div className="mt-3 rounded-xl bg-[var(--bg)] p-3">
                <p className="flex items-center gap-1.5 text-[11.5px] font-bold">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#16a34a] text-white">
                    <Icon n="check" s={10} w={3} />
                  </span>
                  Verified by an expert
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--fg-2)]">{p.ans}</p>
              </div>
            ) : (
              <p className="mt-3 text-[12px] font-semibold text-[#E5484D]">Waiting for an expert answer</p>
            )}
            <div className="mt-3 flex gap-4 text-[12px] font-semibold text-[var(--fg-3)]">
              <span className="flex items-center gap-1">
                <Icon n="heart" s={14} /> {p.n}
              </span>
              <span className="flex items-center gap-1">
                <Icon n="msg" s={14} /> Reply
              </span>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* 12 Appointment confirmed */
function Confirmed() {
  return (
    <Screen>
      <div className="grid-lines absolute inset-0 opacity-50" />
      <div className="relative flex flex-col items-center px-7 pt-20 text-center">
        <span className="rounded-2xl flex h-24 w-24 items-center justify-center text-white" style={{ background: "var(--grad)" }}>
          <Icon n="check" s={44} w={2.6} />
        </span>
        <p className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.035em]">You&apos;re booked.</p>
        <p className="mt-2 text-[13.5px] text-[var(--fg-2)]">An expert will review your transcript fix and plan your next steps with you.</p>
      </div>
      <div className="rounded-2xl relative mx-6 mt-8 border border-[var(--line)] bg-[var(--surface)] p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--fg)] text-[15px] font-extrabold text-[var(--bg)]">AR</span>
          <div>
            <p className="text-[14.5px] font-bold">Anika Rahman</p>
            <p className="text-[12px] text-[var(--fg-3)]">Admissions expert · US & Canada</p>
          </div>
        </div>
        <div className="my-4 border-t border-dashed border-[var(--line)]" />
        <div className="grid grid-cols-2 gap-3 text-[12.5px]">
          {[
            ["cal", "Thu, Nov 6"],
            ["clock", "7:30 PM"],
            ["video", "Video call"],
            ["card", "$15 · Paid"],
          ].map(([i, t]) => (
            <span key={t} className="flex items-center gap-2 font-semibold">
              <Icon n={i} s={16} className="text-[#F37500]" /> {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-10 space-y-2.5">
        <Btn>Add to calendar</Btn>
        <Btn ghost>Back to home</Btn>
      </div>
    </Screen>
  );
}

/* 13 Profile */
function Profile() {
  return (
    <Screen tab={4}>
      <div className="flex items-center justify-between px-5 pt-2">
        <p className="text-[28px] font-extrabold tracking-[-0.035em]">Profile</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)]">
          <Icon n="cog" />
        </span>
      </div>
      <div className="mx-5 mt-4 flex items-center gap-4">
        <span className="rounded-2xl flex h-[72px] w-[72px] items-center justify-center text-[24px] font-extrabold text-white" style={{ background: "var(--grad)" }}>
          ED
        </span>
        <div>
          <p className="text-[20px] font-extrabold">Edward Rahman</p>
          <p className="text-[12.5px] text-[var(--fg-3)]">Masters · EEE · Dhaka</p>
          <span className="mt-1 inline-block">
            <Pill tone="violet">Profile 80% complete</Pill>
          </span>
        </div>
      </div>
      <div className="mx-5 mt-5 grid grid-cols-3 gap-2">
        {[
          ["3", "Applied"],
          ["12", "Saved"],
          ["5", "Events"],
        ].map(([v, k]) => (
          <div key={k} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-4 text-center">
            <p className="text-[24px] font-extrabold">{v}</p>
            <p className="text-[11.5px] text-[var(--fg-3)]">{k}</p>
          </div>
        ))}
      </div>
      <div className="mx-5 mt-5 divide-y divide-[var(--line)] rounded-[22px] border border-[var(--line)] bg-[var(--surface)]">
        {[
          ["shield", "Check status"],
          ["globe", "Applied universities"],
          ["bookmark", "Bookmarks"],
          ["spark", "Study preferences"],
          ["file", "My documents"],
          ["help", "Help & FAQs"],
        ].map(([i, t]) => (
          <div key={t} className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-2)]">
              <Icon n={i} s={17} />
            </span>
            <span className="flex-1 text-[13.5px] font-semibold">{t}</span>
            <Icon n="chevR" s={16} className="text-[var(--fg-3)]" />
          </div>
        ))}
      </div>
    </Screen>
  );
}

export const APP_SCREENS = {
  splash: { C: Splash, h: 812, label: "Splash" },
  onboarding: { C: Onboarding, h: 812, label: "Onboarding" },
  questions: { C: Questions, h: 812, label: "Study preferences" },
  home: { C: Home, h: 1180, label: "Home" },
  filters: { C: Filters, h: 812, label: "Search & filters" },
  university: { C: University, h: 1240, label: "University" },
  documents: { C: Documents, h: 980, label: "Documents" },
  scholarships: { C: Scholarships, h: 1020, label: "Scholarships" },
  events: { C: Events, h: 1000, label: "Events & ECA" },
  status: { C: Status_, h: 1040, label: "Application status" },
  community: { C: Community, h: 1000, label: "Community" },
  confirmed: { C: Confirmed, h: 812, label: "Expert booked" },
  profile: { C: Profile, h: 812, label: "Profile" },
} as const;

export type AppScreen = keyof typeof APP_SCREENS;
