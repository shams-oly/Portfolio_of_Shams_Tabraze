import { getDb, hasDb } from "@/lib/db";

/** Serves images stored in MongoDB (see /api/media). */
export async function GET(_req: Request, ctx: RouteContext<"/media/[name]">) {
  const { name } = await ctx.params;
  if (!hasDb) return new Response("Not found", { status: 404 });
  const doc = await (await getDb()).collection("media").findOne({ name });
  if (!doc) return new Response("Not found", { status: 404 });
  const data = doc.data as { buffer: ArrayBuffer | Uint8Array };
  const bytes = data.buffer instanceof Uint8Array ? data.buffer : new Uint8Array(data.buffer);
  return new Response(bytes as BodyInit, {
    headers: {
      "content-type": String(doc.type),
      "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
