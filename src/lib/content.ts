import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getDb, hasDb } from "@/lib/db";
import { seedProfile, seedProjects } from "@/data/seed";
import type { Profile, Project } from "@/lib/types";

export const CONTENT_TAG = "content";

function clean<T>(doc: unknown): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = doc as Record<string, unknown>;
  return JSON.parse(JSON.stringify(rest)) as T;
}

async function loadProjects(): Promise<Project[]> {
  if (!hasDb) return seedProjects;
  try {
    const db = await getDb();
    const docs = await db.collection("projects").find({}).sort({ order: 1 }).toArray();
    if (!docs.length) return seedProjects;
    return docs.map((d) => clean<Project>(d));
  } catch (err) {
    console.error("[content] projects fallback to seed:", err);
    return seedProjects;
  }
}

async function loadProfile(): Promise<Profile> {
  if (!hasDb) return seedProfile;
  try {
    const db = await getDb();
    const doc = await db.collection("settings").findOne({ key: "profile" });
    if (!doc) return seedProfile;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...profile } = clean<Profile & { key: string }>(doc);
    return { ...seedProfile, ...profile };
  } catch (err) {
    console.error("[content] profile fallback to seed:", err);
    return seedProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return (await loadProjects()).filter((p) => p.published);
}

export async function getProject(slug: string): Promise<Project | null> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return (await loadProjects()).find((p) => p.slug === slug && p.published) ?? null;
}

export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return loadProfile();
}

/** Uncached reads for the admin dashboard. */
export async function getAllProjectsFresh(): Promise<Project[]> {
  return loadProjects();
}
export async function getProfileFresh(): Promise<Profile> {
  return loadProfile();
}
