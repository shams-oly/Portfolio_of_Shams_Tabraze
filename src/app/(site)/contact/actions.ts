"use server";

import { z } from "zod";
import { getDb, hasDb } from "@/lib/db";

export type ContactState = { ok: boolean; message: string } | null;

const schema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(120),
  email: z.string().trim().email("Please add a valid email").max(200),
  subject: z.string().trim().max(200).default(""),
  message: z.string().trim().min(10, "Message is a little short").max(5000),
});

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (formData.get("company")) return { ok: true, message: "Thanks!" }; // honeypot
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Please check the form" };
  if (!hasDb) return { ok: false, message: "The inbox isn't connected yet — please email me directly." };
  try {
    await (await getDb())
      .collection("messages")
      .insertOne({ ...parsed.data, createdAt: new Date().toISOString(), read: false });
    return { ok: true, message: "Message sent. I'll get back to you soon." };
  } catch {
    return { ok: false, message: "Something went wrong — please email me directly." };
  }
}
