"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--fg-2)]">{label}</span>
        {hint && <span className="text-[11px] text-[var(--fg-3)]">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function Text({ label, value, onChange, hint, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; hint?: string; placeholder?: string; type?: string }) {
  return (
    <Field label={label} hint={hint}>
      <input type={type} className="field" value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function Area({ label, value, onChange, hint, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; hint?: string; rows?: number }) {
  return (
    <Field label={label} hint={hint}>
      <textarea className="field resize-y" rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

/** Array of strings edited as one-per-line. */
export function Lines({ label, value, onChange, hint = "One per line", rows = 4 }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string; rows?: number }) {
  const [text, setText] = useState((value ?? []).join("\n"));
  return (
    <Field label={label} hint={hint}>
      <textarea
        className="field resize-y font-mono text-sm"
        rows={rows}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean));
        }}
      />
    </Field>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex items-center gap-3 text-sm font-medium">
      <span className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-[var(--accent-2)]" : "bg-[var(--line)]"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${value ? "left-[22px]" : "left-0.5"}`} />
      </span>
      {label}
    </button>
  );
}

type Spec<T> = { key: keyof T & string; label: string; type?: "text" | "area" | "image"; placeholder?: string };

/** Repeatable group of objects (metrics, links, sections, experience…). */
export function List<T extends Record<string, unknown>>({
  label,
  value,
  onChange,
  fields,
  empty,
  blobReady,
}: {
  label: string;
  value: T[];
  onChange: (v: T[]) => void;
  fields: Spec<T>[];
  empty: T;
  blobReady: boolean;
}) {
  const items = value ?? [];
  const set = (i: number, patch: Partial<T>) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--fg-2)]">{label}</p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-[var(--line)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-[var(--fg-3)]">#{i + 1}</span>
              <div className="flex gap-1 text-xs">
                <button type="button" onClick={() => move(i, -1)} className="rounded px-2 py-1 hover:bg-[var(--bg-2)]">↑</button>
                <button type="button" onClick={() => move(i, 1)} className="rounded px-2 py-1 hover:bg-[var(--bg-2)]">↓</button>
                <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded px-2 py-1 text-[var(--accent-3)] hover:bg-[var(--bg-2)]">
                  Remove
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.type === "area" || f.type === "image" ? "sm:col-span-2" : ""}>
                  {f.type === "area" ? (
                    <Area label={f.label} value={String(it[f.key] ?? "")} onChange={(v) => set(i, { [f.key]: v } as Partial<T>)} hint="Blank line = new paragraph" />
                  ) : f.type === "image" ? (
                    <ImageInput label={f.label} value={String(it[f.key] ?? "")} onChange={(v) => set(i, { [f.key]: v } as Partial<T>)} blobReady={blobReady} />
                  ) : (
                    <Text label={f.label} placeholder={f.placeholder} value={String(it[f.key] ?? "")} onChange={(v) => set(i, { [f.key]: v } as Partial<T>)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, { ...empty }])} className="mt-3 rounded-lg border border-dashed border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--fg)]">
        + Add
      </button>
    </div>
  );
}

export function ImageInput({ label, value, onChange, blobReady, hint }: { label: string; value: string; onChange: (v: string) => void; blobReady: boolean; hint?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const isVid = /\.(mp4|webm|mov)(\?|$)/i.test(value);

  async function onFile(file: File) {
    setErr("");
    setBusy(true);
    try {
      const blob = await upload(`portfolio/${file.name}`, file, { access: "public", handleUploadUrl: "/api/upload" });
      onChange(blob.url);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Field label={label} hint={hint ?? "Upload, or paste an image/video URL"}>
      <div className="flex gap-3">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-2)]">
          {value &&
            (isVid ? (
              <video src={value} muted className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            ))}
        </div>
        <div className="flex-1 space-y-2">
          <input className="field !py-2 text-sm" value={value ?? ""} placeholder="https://… or /work/file.jpg" onChange={(e) => onChange(e.target.value)} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!blobReady || busy}
              onClick={() => input.current?.click()}
              className="rounded-lg bg-[var(--fg)] px-3 py-1.5 text-xs font-semibold text-[var(--bg)] disabled:opacity-40"
              title={blobReady ? "" : "Connect Vercel Blob to enable uploads"}
            >
              {busy ? "Uploading…" : "Upload file"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="text-xs text-[var(--fg-3)] hover:text-[var(--fg)]">
                Clear
              </button>
            )}
            {!blobReady && <span className="text-[11px] text-[var(--fg-3)]">Uploads need Vercel Blob</span>}
          </div>
          {err && <p className="text-xs text-[var(--accent-3)]">{err}</p>}
        </div>
        <input
          ref={input}
          type="file"
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>
    </Field>
  );
}

export function GalleryInput({ value, onChange, blobReady }: { value: string[]; onChange: (v: string[]) => void; blobReady: boolean }) {
  const items = value ?? [];
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--fg-2)]">Gallery</p>
      <div className="space-y-3">
        {items.map((g, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1">
              <ImageInput label={`Image ${i + 1}`} value={g} blobReady={blobReady} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="mt-6 rounded px-2 py-1 text-xs text-[var(--accent-3)] hover:bg-[var(--bg-2)]">
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, ""])} className="mt-3 rounded-lg border border-dashed border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--fg)]">
        + Add image
      </button>
    </div>
  );
}
