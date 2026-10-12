"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";

export function ContactForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, null);

  if (state?.ok) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="clip-corner bg-[var(--surface)] p-10">
        <p className="font-display text-4xl font-extrabold">Thank you ✦</p>
        <p className="mt-3 text-[var(--fg-2)]">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label mb-2 block">Name</span>
          <input name="name" required className="field" autoComplete="name" />
        </label>
        <label className="block">
          <span className="label mb-2 block">Email</span>
          <input name="email" type="email" required className="field" autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="label mb-2 block">Subject</span>
        <input name="subject" className="field" placeholder="A role, a project, a collaboration…" />
      </label>
      <label className="block">
        <span className="label mb-2 block">Message</span>
        <textarea name="message" required rows={6} className="field resize-none" />
      </label>
      <AnimatePresence>
        {state && !state.ok && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-sm text-[var(--accent-3)]">
            {state.message}{" "}
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
          </motion.p>
        )}
      </AnimatePresence>
      <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center disabled:opacity-60" data-cursor="Send">
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
