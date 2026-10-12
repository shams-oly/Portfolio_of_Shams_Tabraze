import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <p className="font-display text-[clamp(6rem,24vw,18rem)] font-extrabold leading-none text-grad">404</p>
      <p className="text-lg text-[var(--fg-2)]">This page wandered off.</p>
      <Link href="/" className="btn btn-primary">
        Back home →
      </Link>
    </div>
  );
}
