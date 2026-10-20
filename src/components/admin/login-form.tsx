"use client";

import { useActionState } from "react";
import { login, type ActionResult } from "@/app/admin/actions";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(login, null);
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form action={action} className="clip-corner w-full max-w-sm space-y-5 bg-[var(--surface)] p-8">
        <div className="flex items-center gap-3">
          <span className="clip-corner-sm flex h-9 w-9 items-center justify-center bg-[var(--fg)] font-display text-sm font-extrabold text-[var(--bg)]">ST</span>
          <div>
            <p className="font-display text-xl font-bold">Portfolio admin</p>
            <p className="text-xs text-[var(--fg-3)]">Edit works, profile and inbox</p>
          </div>
        </div>
        {!configured && (
          <p className="rounded-lg bg-[var(--bg-2)] p-3 text-sm text-[var(--fg-2)]">
            Set <code>ADMIN_PASSWORD</code> in Vercel → Settings → Environment Variables, then redeploy.
          </p>
        )}
        <label className="block">
          <span className="label mb-2 block">Password</span>
          <input name="password" type="password" required autoFocus className="field" />
        </label>
        {state && !state.ok && <p className="text-sm text-[var(--accent-3)]">{state.message}</p>}
        <button disabled={pending} className="btn btn-primary w-full justify-center disabled:opacity-60">
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
