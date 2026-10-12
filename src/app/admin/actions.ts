"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { getDb, hasDb } from "@/lib/db";
import { CONTENT_TAG } from "@/lib/content";
import { seedProfile, seedProjects } from "@/data/seed";
import type { Profile, Project } from "@/lib/types";

export type ActionResult = { ok: boolean; message: string };

const str = z.string().trim();
const link = z.object({ label: str, url: str });

const projectSchema = z.object({
  slug: str.min(1).regex(/^[a-z0-9-]+$/, "Slug: lowercase letters, numbers and dashes only"),
  title: str.min(1, "Title is required"),
  subtitle: str.default(""),
  category: z.enum(["app", "web", "case-study", "research", "other"]),
  platforms: z.array(str).default([]),
  year: str.default(""),
  role: str.default(""),
  client: str.default(""),
  summary: str.default(""),
  cover: str.default(""),
  icon: str.optional(),
  accent: str.regex(/^#[0-9a-fA-F]{6}$/, "Accent must be a hex colour like #8B3DFF"),
  tags: z.array(str).default([]),
  links: z.array(link).default([]),
  metrics: z.array(z.object({ value: str, label: str })).default([]),
  sections: z.array(z.object({ heading: str, body: z.string(), image: str.optional() })).default([]),
  gallery: z.array(str).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().default(0),
});

function noDb(): ActionResult {
  return { ok: false, message: "MONGODB_URI is not set — add it in Vercel → Settings → Environment Variables." };
}

export async function login(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!process.env.ADMIN_PASSWORD) return { ok: false, message: "ADMIN_PASSWORD is not set on the server." };
  if (!checkPassword(String(formData.get("password") || ""))) return { ok: false, message: "Wrong password." };
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

export async function saveProject(project: Project, originalSlug?: string): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  const parsed = projectSchema.safeParse(project);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid data" };
  const data = { ...parsed.data, updatedAt: new Date().toISOString() };
  const col = (await getDb()).collection("projects");
  if (originalSlug !== data.slug) {
    const clash = await col.findOne({ slug: data.slug });
    if (clash) return { ok: false, message: `Slug "${data.slug}" is already used.` };
  }
  await col.updateOne({ slug: originalSlug ?? data.slug }, { $set: data }, { upsert: true });
  updateTag(CONTENT_TAG);
  return { ok: true, message: "Saved. The live site is updated." };
}

export async function deleteProject(slug: string): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  await (await getDb()).collection("projects").deleteOne({ slug });
  updateTag(CONTENT_TAG);
  return { ok: true, message: "Deleted." };
}

export async function reorderProjects(slugs: string[]): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  const col = (await getDb()).collection("projects");
  await col.bulkWrite(slugs.map((slug, i) => ({ updateOne: { filter: { slug }, update: { $set: { order: i + 1 } } } })));
  updateTag(CONTENT_TAG);
  return { ok: true, message: "Order saved." };
}

export async function toggleProject(slug: string, field: "featured" | "published", value: boolean): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  await (await getDb()).collection("projects").updateOne({ slug }, { $set: { [field]: value } });
  updateTag(CONTENT_TAG);
  return { ok: true, message: "Updated." };
}

export async function saveProfile(profile: Profile): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  if (!profile.name?.trim()) return { ok: false, message: "Name is required." };
  await (await getDb())
    .collection("settings")
    .updateOne({ key: "profile" }, { $set: { ...profile, key: "profile" } }, { upsert: true });
  updateTag(CONTENT_TAG);
  return { ok: true, message: "Profile saved." };
}

export async function importStarterContent(): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  const db = await getDb();
  const projects = db.collection("projects");
  await projects.createIndex({ slug: 1 }, { unique: true });
  let added = 0;
  for (const p of seedProjects) {
    const r = await projects.updateOne({ slug: p.slug }, { $setOnInsert: p }, { upsert: true });
    added += r.upsertedCount;
  }
  await db
    .collection("settings")
    .updateOne({ key: "profile" }, { $setOnInsert: { ...seedProfile, key: "profile" } }, { upsert: true });
  updateTag(CONTENT_TAG);
  return { ok: true, message: `Imported ${added} new project(s). Existing ones were left untouched.` };
}

export async function setMessageRead(id: string, read: boolean): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  await (await getDb()).collection("messages").updateOne({ _id: new ObjectId(id) }, { $set: { read } });
  return { ok: true, message: "Updated." };
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!hasDb) return noDb();
  await (await getDb()).collection("messages").deleteOne({ _id: new ObjectId(id) });
  return { ok: true, message: "Deleted." };
}
