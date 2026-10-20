import type { Metadata } from "next";
import { FadeIn, SplitReveal } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <div className="container-x pb-[12vh] pt-[22vh]">
      <p className="label mb-6">Contact</p>
      <SplitReveal as="h1" text="Let's make something good." className="block max-w-[14ch] font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.88]" />
      <div className="mt-[10vh] grid gap-16 md:grid-cols-[1fr_1.3fr]">
        <FadeIn className="space-y-10">
          <div>
            <p className="label mb-2">Email</p>
            <a href={`mailto:${profile.email}`} className="font-display text-2xl font-bold hover:underline md:text-3xl">
              {profile.email}
            </a>
          </div>
          {profile.phone && (
            <div>
              <p className="label mb-2">Phone / WhatsApp</p>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="text-xl font-semibold hover:underline">
                {profile.phone}
              </a>
            </div>
          )}
          <div>
            <p className="label mb-2">Based in</p>
            <p className="text-xl font-semibold">{profile.location}</p>
          </div>
          <div>
            <p className="label mb-3">Elsewhere</p>
            <div className="flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2 text-sm">
                  {s.label} ↗
                </a>
              ))}
              <a href={profile.resumeUrl} download className="btn btn-ghost !py-2 text-sm">
                Resume ↓
              </a>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <ContactForm email={profile.email} />
        </FadeIn>
      </div>
    </div>
  );
}
