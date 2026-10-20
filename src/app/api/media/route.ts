import { createHash } from "node:crypto";
import { Binary } from "mongodb";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb, hasDb } from "@/lib/db";

// One-time import key (sha256). Lets a design import script store images
// without an admin session. Expires automatically.
const IMPORT_KEY_SHA256 = "61131ce0c3af6206a916b1b00839822fd55f06adde87d940039419b1f6404622";
const IMPORT_KEY_EXPIRES = Date.parse("2026-10-27T00:00:00Z");

const NAME = /^[a-z0-9][a-z0-9._-]{0,120}$/;

async function authorized(req: Request) {
  const key = req.headers.get("x-import-key");
  if (key && Date.now() < IMPORT_KEY_EXPIRES) {
    if (createHash("sha256").update(key).digest("hex") === IMPORT_KEY_SHA256) return true;
  }
  return isAdmin();
}

/** Store an image: POST /api/media?name=uniway-home.webp with the raw bytes as body. */
export async function POST(req: Request) {
  if (!(await authorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDb) return NextResponse.json({ error: "No database" }, { status: 500 });
  const name = new URL(req.url).searchParams.get("name") ?? "";
  if (!NAME.test(name)) return NextResponse.json({ error: "Bad name" }, { status: 400 });
  const type = req.headers.get("content-type") || "application/octet-stream";
  if (!/^(image|video)\//.test(type)) return NextResponse.json({ error: "Images/videos only" }, { status: 400 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (buf.length > 12 * 1024 * 1024) return NextResponse.json({ error: "Too large" }, { status: 413 });
  const col = (await getDb()).collection("media");
  await col.updateOne(
    { name },
    { $set: { name, type, size: buf.length, data: new Binary(buf), updatedAt: new Date().toISOString() } },
    { upsert: true },
  );
  return NextResponse.json({ ok: true, name, size: buf.length, url: `/media/${name}` });
}

/** List stored media names. */
export async function GET(req: Request) {
  if (!(await authorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDb) return NextResponse.json([]);
  const docs = await (await getDb())
    .collection("media")
    .find({}, { projection: { _id: 0, name: 1, size: 1, type: 1 } })
    .toArray();
  return NextResponse.json(docs);
}
