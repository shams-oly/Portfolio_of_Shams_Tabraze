import "server-only";
import fs from "node:fs";
import path from "node:path";
import { SCREENS, type ScreenMap } from "./screens";

const DIR = path.join(process.cwd(), "public", "case", "uniway");

/** Finds which exported screens are present (webp/png/jpg). */
export function loadScreens(): ScreenMap {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return {};
  }
  const out: ScreenMap = {};
  for (const key of [...Object.keys(SCREENS), "thumbnail"] as (keyof ScreenMap)[]) {
    const f = ["webp", "png", "jpg"].map((ext) => `${key}.${ext}`).find((n) => files.includes(n));
    if (f) out[key] = `/case/uniway/${f}`;
  }
  return out;
}
