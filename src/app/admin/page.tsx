import { connection } from "next/server";
import { Suspense } from "react";
import { AdminApp } from "@/components/admin/admin-app";
import { LoginForm } from "@/components/admin/login-form";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { getAllProjectsFresh, getProfileFresh } from "@/lib/content";
import { getDb, hasDb } from "@/lib/db";
import type { Message } from "@/lib/types";

async function loadMessages(): Promise<Message[]> {
  if (!hasDb) return [];
  try {
    const docs = await (await getDb()).collection("messages").find({}).sort({ createdAt: -1 }).limit(200).toArray();
    return docs.map((d) => ({ ...(JSON.parse(JSON.stringify(d)) as Message), _id: String(d._id) }));
  } catch {
    return [];
  }
}

async function dbHasProjects() {
  if (!hasDb) return false;
  try {
    return (await (await getDb()).collection("projects").countDocuments()) > 0;
  } catch {
    return false;
  }
}

async function Gate() {
  await connection(); // always render at request time (reads cookies + env)
  if (!(await isAdmin())) return <LoginForm configured={adminConfigured()} />;
  const [projects, profile, messages, seeded] = await Promise.all([
    getAllProjectsFresh(),
    getProfileFresh(),
    loadMessages(),
    dbHasProjects(),
  ]);
  return (
    <AdminApp
      projects={projects}
      profile={profile}
      messages={messages}
      status={{ db: hasDb, seeded, blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN) }}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-[var(--fg-3)]">Loading…</div>}>
      <Gate />
    </Suspense>
  );
}
