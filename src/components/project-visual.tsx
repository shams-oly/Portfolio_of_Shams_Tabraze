import Image from "next/image";
import type { Project } from "@/lib/types";

/** Cover image if set; otherwise a generated card from the project's accent colour and icon. */
export function ProjectVisual({
  project,
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  className = "",
  fit = "contain",
}: {
  project: Pick<Project, "cover" | "icon" | "accent" | "title">;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fit?: "contain" | "cover";
}) {
  if (project.cover) {
    const video = /\.(mp4|webm|mov)(\?|$)/i.test(project.cover);
    if (video)
      return (
        <div className={`relative h-full w-full overflow-hidden bg-[var(--bg-2)] ${className}`}>
          <video src={project.cover} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        </div>
      );
    // Blurred backdrop + contained image: any aspect ratio looks intentional.
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: `${project.accent || "#8b3dff"}33` }}>
        <Image src={project.cover} alt="" aria-hidden fill sizes="40px" className="scale-125 object-cover opacity-50 blur-2xl" />
        <Image src={project.cover} alt={project.title} fill sizes={sizes} priority={priority} className={fit === "cover" ? "object-cover" : "object-contain"} />
      </div>
    );
  }
  const a = project.accent || "#8b3dff";
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${a}55 0%, transparent 55%), radial-gradient(90% 80% at 90% 100%, ${a}aa 0%, transparent 60%), linear-gradient(160deg, ${a}22, ${a}66)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
        }}
      />
      {project.icon ? (
        <div className="relative aspect-square w-[34%] max-w-[220px] overflow-hidden rounded-[22%] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
          <Image src={project.icon} alt={project.title} fill sizes="220px" className="scale-[1.2] object-cover" />
        </div>
      ) : (
        <span className="relative px-6 text-center font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-none text-white/90 mix-blend-overlay">
          {project.title}
        </span>
      )}
    </div>
  );
}
