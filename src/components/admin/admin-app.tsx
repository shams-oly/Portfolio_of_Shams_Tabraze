"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ThemeToggle } from "@/components/site-chrome";
import {
  deleteMessage,
  deleteProject,
  importStarterContent,
  logout,
  reorderProjects,
  saveProfile,
  saveProject,
  setMessageRead,
  toggleProject,
  type ActionResult,
} from "@/app/admin/actions";
import { Area, GalleryInput, ImageInput, Lines, List, Text, Toggle } from "@/components/admin/fields";
import { CATEGORIES, type Category, type Message, type Profile, type Project } from "@/lib/types";

type Status = { db: boolean; seeded: boolean; blob: boolean };

const blankProject = (order: number): Project => ({
  slug: "",
  title: "",
  subtitle: "",
  category: "app",
  platforms: [],
  year: String(new Date().getFullYear()),
  role: "",
  client: "",
  summary: "",
  cover: "",
  icon: "",
  accent: "#8B3DFF",
  tags: [],
  links: [],
  metrics: [],
  sections: [],
  gallery: [],
  featured: false,
  published: true,
  order,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function useToast() {
  const [toast, setToast] = useState<ActionResult | null>(null);
  const show = (r: ActionResult) => {
    setToast(r);
    setTimeout(() => setToast(null), 3500);
  };
  const node = toast && (
    <div className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium shadow-xl ${toast.ok ? "bg-[var(--fg)] text-[var(--bg)]" : "bg-[#e5484d] text-white"}`}>
      {toast.message}
    </div>
  );
  return { show, node };
}

export function AdminApp({ projects, profile, messages, status }: { projects: Project[]; profile: Profile; messages: Message[]; status: Status }) {
  const [tab, setTab] = useState<"works" | "profile" | "inbox" | "setup">(status.db && status.seeded ? "works" : "setup");
  const unread = messages.filter((m) => !m.read).length;
  const { show, node } = useToast();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="clip-corner-sm flex h-9 w-9 items-center justify-center bg-[var(--fg)] font-display text-sm font-extrabold text-[var(--bg)]">ST</span>
          <div>
            <p className="font-display text-xl font-bold">Portfolio admin</p>
            <a href="/" target="_blank" className="text-xs text-[var(--fg-3)] hover:underline">
              View live site ↗
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <form action={logout}>
            <button className="btn btn-ghost !py-2 text-sm">Sign out</button>
          </form>
        </div>
      </header>

      <nav className="mb-8 flex flex-wrap gap-1 border-b border-[var(--line)]">
        {(
          [
            ["works", `Works (${projects.length})`],
            ["profile", "Profile"],
            ["inbox", `Inbox${unread ? ` · ${unread}` : ""}`],
            ["setup", "Setup"],
          ] as const
        ).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold ${tab === k ? "border-[var(--fg)]" : "border-transparent text-[var(--fg-3)]"}`}>
            {l}
          </button>
        ))}
      </nav>

      {!status.db && tab !== "setup" && (
        <p className="mb-6 rounded-xl bg-[var(--bg-2)] p-4 text-sm">
          Read-only preview: MongoDB is not connected, so changes can&apos;t be saved yet. See <b>Setup</b>.
        </p>
      )}

      {tab === "works" && <Works projects={projects} status={status} toast={show} />}
      {tab === "profile" && <ProfileEditor initial={profile} status={status} toast={show} />}
      {tab === "inbox" && <Inbox messages={messages} toast={show} />}
      {tab === "setup" && <Setup status={status} toast={show} />}
      {node}
    </div>
  );
}

function Works({ projects, status, toast }: { projects: Project[]; status: Status; toast: (r: ActionResult) => void }) {
  const router = useRouter();
  const [list, setList] = useState(projects);
  const [editing, setEditing] = useState<{ project: Project; original?: string } | null>(null);
  const [dirtyOrder, setDirtyOrder] = useState(false);
  const [pending, start] = useTransition();
  const [filter, setFilter] = useState<Category | "all">("all");

  const run = (fn: () => Promise<ActionResult>) =>
    start(async () => {
      const r = await fn();
      toast(r);
      if (r.ok) router.refresh();
    });

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    setList(next);
    setDirtyOrder(true);
  };

  if (editing) {
    return (
      <ProjectEditor
        initial={editing.project}
        original={editing.original}
        blobReady={status.blob}
        onCancel={() => setEditing(null)}
        onSaved={(r) => {
          toast(r);
          if (r.ok) {
            setEditing(null);
            router.refresh();
          }
        }}
      />
    );
  }

  const shown = filter === "all" ? list : list.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <select className="field !w-auto !py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value as Category | "all")}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {dirtyOrder && (
            <button disabled={pending} onClick={() => run(async () => { const r = await reorderProjects(list.map((p) => p.slug)); if (r.ok) setDirtyOrder(false); return r; })} className="btn btn-ghost !py-2 text-sm">
              Save order
            </button>
          )}
          <button onClick={() => setEditing({ project: blankProject(list.length + 1) })} className="btn btn-primary !py-2 text-sm">
            + New project
          </button>
        </div>
      </div>
      <ul className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
        {shown.map((p) => {
          const i = list.indexOf(p);
          return (
            <li key={p.slug} className="flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap">
              <div className="flex flex-col">
                <button disabled={filter !== "all"} onClick={() => move(i, -1)} className="px-2 text-xs text-[var(--fg-3)] hover:text-[var(--fg)] disabled:opacity-20">▲</button>
                <button disabled={filter !== "all"} onClick={() => move(i, 1)} className="px-2 text-xs text-[var(--fg-3)] hover:text-[var(--fg)] disabled:opacity-20">▼</button>
              </div>
              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg" style={{ background: p.accent }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {(p.cover || p.icon) && <img src={p.cover || p.icon} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.title}</p>
                <p className="truncate text-xs text-[var(--fg-3)]">
                  {CATEGORIES.find((c) => c.value === p.category)?.label} · /work/{p.slug}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Toggle label="Featured" value={p.featured} onChange={(v) => run(() => toggleProject(p.slug, "featured", v))} />
                <Toggle label="Live" value={p.published} onChange={(v) => run(() => toggleProject(p.slug, "published", v))} />
                <button onClick={() => setEditing({ project: { ...blankProject(0), ...p }, original: p.slug })} className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-sm hover:border-[var(--fg)]">
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.title}"? This cannot be undone.`)) run(() => deleteProject(p.slug));
                  }}
                  className="text-sm text-[var(--accent-3)]"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ProjectEditor({
  initial,
  original,
  blobReady,
  onCancel,
  onSaved,
}: {
  initial: Project;
  original?: string;
  blobReady: boolean;
  onCancel: () => void;
  onSaved: (r: ActionResult) => void;
}) {
  const [p, setP] = useState<Project>(initial);
  const [pending, start] = useTransition();
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setP((x) => ({ ...x, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => onSaved(await saveProject({ ...p, slug: p.slug || slugify(p.title) }, original)));
      }}
      className="space-y-8"
    >
      <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--bg)]/90 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <button type="button" onClick={onCancel} className="text-sm text-[var(--fg-2)] hover:text-[var(--fg)]">
          ← Back
        </button>
        <p className="truncate font-semibold">{original ? `Edit · ${initial.title}` : "New project"}</p>
        <button disabled={pending} className="btn btn-primary !py-2 text-sm disabled:opacity-60">
          {pending ? "Saving…" : "Save & publish"}
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <Text label="Title" value={p.title} onChange={(v) => setP((x) => ({ ...x, title: v, slug: original || x.slug !== slugify(x.title) ? x.slug : slugify(v) }))} />
        <Text label="URL slug" hint="/work/…" value={p.slug} onChange={(v) => set("slug", slugify(v))} />
        <Text label="Subtitle" value={p.subtitle} onChange={(v) => set("subtitle", v)} />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--fg-2)]">Category</span>
          <select className="field" value={p.category} onChange={(e) => set("category", e.target.value as Category)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <Text label="Role" value={p.role} onChange={(v) => set("role", v)} />
        <Text label="Client / company" value={p.client} onChange={(v) => set("client", v)} />
        <Text label="Year" value={p.year} onChange={(v) => set("year", v)} />
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Text label="Accent colour" value={p.accent} onChange={(v) => set("accent", v)} />
          </div>
          <input type="color" value={/^#[0-9a-f]{6}$/i.test(p.accent) ? p.accent : "#8b3dff"} onChange={(e) => set("accent", e.target.value)} className="h-[46px] w-14 cursor-pointer rounded-lg border border-[var(--line)] bg-transparent" />
        </div>
        <div className="sm:col-span-2">
          <Area label="Summary" value={p.summary} onChange={(v) => set("summary", v)} rows={3} />
        </div>
        <div className="flex gap-6 sm:col-span-2">
          <Toggle label="Featured on home" value={p.featured} onChange={(v) => set("featured", v)} />
          <Toggle label="Published" value={p.published} onChange={(v) => set("published", v)} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <ImageInput label="Cover image / video" value={p.cover} onChange={(v) => set("cover", v)} blobReady={blobReady} hint="Leave empty to use icon + accent" />
        <ImageInput label="App icon" value={p.icon ?? ""} onChange={(v) => set("icon", v)} blobReady={blobReady} hint="Square, for apps" />
        <Lines label="Platforms" value={p.platforms} onChange={(v) => set("platforms", v)} rows={3} />
        <Lines label="Tags" value={p.tags} onChange={(v) => set("tags", v)} rows={3} />
      </section>

      <List
        label="Key metrics"
        value={p.metrics}
        onChange={(v) => set("metrics", v)}
        empty={{ value: "", label: "" }}
        blobReady={blobReady}
        fields={[
          { key: "value", label: "Value", placeholder: "4M+" },
          { key: "label", label: "Label", placeholder: "Users" },
        ]}
      />
      <List
        label="Case study sections"
        value={p.sections as { heading: string; body: string; image?: string }[]}
        onChange={(v) => set("sections", v)}
        empty={{ heading: "", body: "", image: "" }}
        blobReady={blobReady}
        fields={[
          { key: "heading", label: "Heading" },
          { key: "body", label: "Text", type: "area" },
          { key: "image", label: "Image / video", type: "image" },
        ]}
      />
      <GalleryInput value={p.gallery} onChange={(v) => set("gallery", v)} blobReady={blobReady} />
      <List
        label="Links"
        value={p.links}
        onChange={(v) => set("links", v)}
        empty={{ label: "", url: "" }}
        blobReady={blobReady}
        fields={[
          { key: "label", label: "Label", placeholder: "App Store" },
          { key: "url", label: "URL", placeholder: "https://" },
        ]}
      />
    </form>
  );
}

function ProfileEditor({ initial, status, toast }: { initial: Profile; status: Status; toast: (r: ActionResult) => void }) {
  const router = useRouter();
  const [p, setP] = useState(initial);
  const [pending, start] = useTransition();
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((x) => ({ ...x, [k]: v }));
  const b = status.blob;
  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await saveProfile(p);
          toast(r);
          if (r.ok) router.refresh();
        });
      }}
    >
      <div className="flex justify-end">
        <button disabled={pending} className="btn btn-primary !py-2 text-sm disabled:opacity-60">
          {pending ? "Saving…" : "Save profile"}
        </button>
      </div>
      <section className="grid gap-4 sm:grid-cols-2">
        <Text label="Full name" value={p.name} onChange={(v) => set("name", v)} />
        <Text label="Display name" value={p.shortName} onChange={(v) => set("shortName", v)} />
        <Text label="Email" value={p.email} onChange={(v) => set("email", v)} />
        <Text label="Phone" value={p.phone} onChange={(v) => set("phone", v)} />
        <Text label="Location" value={p.location} onChange={(v) => set("location", v)} />
        <div className="flex items-end pb-3">
          <Toggle label="Show “Open to opportunities”" value={p.available} onChange={(v) => set("available", v)} />
        </div>
        <ImageInput label="Profile photo" value={p.photo} onChange={(v) => set("photo", v)} blobReady={b} />
        <ImageInput label="Logo (optional)" value={p.logo} onChange={(v) => set("logo", v)} blobReady={b} hint="SVG/PNG; replaces the ST mark" />
        <ImageInput label="Resume file" value={p.resumeUrl} onChange={(v) => set("resumeUrl", v)} blobReady={b} hint="Upload a PDF" />
        <Lines label="Rotating roles (hero)" value={p.roles} onChange={(v) => set("roles", v)} />
        <div className="sm:col-span-2">
          <Area label="Tagline" value={p.tagline} onChange={(v) => set("tagline", v)} rows={2} />
        </div>
        <div className="sm:col-span-2">
          <Area label="Intro (home, scroll-revealed)" value={p.intro} onChange={(v) => set("intro", v)} rows={3} />
        </div>
        <div className="sm:col-span-2">
          <Area label="Bio" value={p.bio} onChange={(v) => set("bio", v)} rows={5} />
        </div>
      </section>
      <List label="Stats" value={p.stats} onChange={(v) => set("stats", v)} empty={{ value: "", label: "" }} blobReady={b} fields={[{ key: "value", label: "Value" }, { key: "label", label: "Label" }]} />
      <List label="Social links" value={p.socials} onChange={(v) => set("socials", v)} empty={{ label: "", url: "" }} blobReady={b} fields={[{ key: "label", label: "Label" }, { key: "url", label: "URL" }]} />
      <List
        label="Experience"
        value={p.experience}
        onChange={(v) => set("experience", v)}
        empty={{ role: "", org: "", period: "", description: "" }}
        blobReady={b}
        fields={[
          { key: "role", label: "Role" },
          { key: "org", label: "Organisation" },
          { key: "period", label: "Period" },
          { key: "description", label: "Description", type: "area" },
        ]}
      />
      <List label="Education & training" value={p.education} onChange={(v) => set("education", v)} empty={{ title: "", org: "", year: "" }} blobReady={b} fields={[{ key: "title", label: "Title" }, { key: "org", label: "Institution" }, { key: "year", label: "Year" }]} />
      <List
        label="Publications"
        value={p.publications}
        onChange={(v) => set("publications", v)}
        empty={{ title: "", venue: "", year: "", url: "", description: "" }}
        blobReady={b}
        fields={[
          { key: "title", label: "Title" },
          { key: "venue", label: "Venue" },
          { key: "year", label: "Year" },
          { key: "url", label: "URL" },
          { key: "description", label: "Description", type: "area" },
        ]}
      />
      <List label="Outside the screen" value={p.creative} onChange={(v) => set("creative", v)} empty={{ title: "", description: "" }} blobReady={b} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", type: "area" }]} />
      <section className="grid gap-4 sm:grid-cols-2">
        <Lines label="Skills" value={p.skills} onChange={(v) => set("skills", v)} rows={8} />
        <Lines label="Tools" value={p.tools} onChange={(v) => set("tools", v)} rows={8} />
      </section>
    </form>
  );
}

function Inbox({ messages, toast }: { messages: Message[]; toast: (r: ActionResult) => void }) {
  const router = useRouter();
  const [, start] = useTransition();
  const run = (fn: () => Promise<ActionResult>) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) toast(r);
      router.refresh();
    });
  if (!messages.length) return <p className="text-[var(--fg-3)]">No messages yet. Messages from the contact form land here.</p>;
  return (
    <ul className="space-y-3">
      {messages.map((m) => (
        <li key={m._id} className={`rounded-2xl border p-5 ${m.read ? "border-[var(--line)]" : "border-[var(--accent-2)]"}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold">
              {m.name} · <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Your message")}`} className="text-[var(--accent-2)] hover:underline">{m.email}</a>
            </p>
            <span className="text-xs text-[var(--fg-3)]">{new Date(m.createdAt).toLocaleString()}</span>
          </div>
          {m.subject && <p className="mt-1 text-sm font-medium">{m.subject}</p>}
          <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--fg-2)]">{m.message}</p>
          <div className="mt-3 flex gap-4 text-xs">
            <button onClick={() => run(() => setMessageRead(m._id!, !m.read))} className="hover:underline">
              Mark {m.read ? "unread" : "read"}
            </button>
            <button onClick={() => confirm("Delete this message?") && run(() => deleteMessage(m._id!))} className="text-[var(--accent-3)] hover:underline">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Setup({ status, toast }: { status: Status; toast: (r: ActionResult) => void }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const Row = ({ ok, title, children }: { ok: boolean; title: string; children: React.ReactNode }) => (
    <li className="flex gap-4 rounded-2xl border border-[var(--line)] p-5">
      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${ok ? "bg-[var(--lime)] text-black" : "bg-[var(--bg-2)] text-[var(--fg-3)]"}`}>{ok ? "✓" : "•"}</span>
      <div className="text-sm">
        <p className="font-semibold">{title}</p>
        <div className="mt-1 text-[var(--fg-2)]">{children}</div>
      </div>
    </li>
  );
  return (
    <ul className="space-y-3">
      <Row ok title="Admin password">Signed in.</Row>
      <Row ok={status.db} title="MongoDB">
        {status.db ? "Connected." : <>Add <code>MONGODB_URI</code> (MongoDB Atlas free cluster) in Vercel → Project → Settings → Environment Variables, then redeploy.</>}
      </Row>
      <Row ok={status.seeded} title="Starter content">
        {status.seeded ? "Your projects are in the database." : "Copy the built-in projects and profile into MongoDB so you can edit them."}
        {status.db && (
          <button
            disabled={pending}
            onClick={() =>
              start(async () => {
                const r = await importStarterContent();
                toast(r);
                router.refresh();
              })
            }
            className="btn btn-primary mt-3 !py-2 text-sm disabled:opacity-60"
          >
            {pending ? "Importing…" : "Import starter content"}
          </button>
        )}
      </Row>
      <Row ok={status.blob} title="Image & video uploads (Vercel Blob)">
        {status.blob ? "Ready — use “Upload file” on any image field." : "In Vercel → Storage, create a Blob store and connect it to this project. Until then, paste image URLs."}
      </Row>
    </ul>
  );
}
