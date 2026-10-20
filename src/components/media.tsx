import Image from "next/image";

export const isVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url);

export function Media({ src, alt, sizes = "100vw", className = "" }: { src: string; alt: string; sizes?: string; className?: string }) {
  if (isVideo(src)) {
    return <video src={src} autoPlay muted loop playsInline className={`h-full w-full object-cover ${className}`} />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />;
}

export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t, i) => (
          <p key={i} className={className}>
            {t}
          </p>
        ))}
    </>
  );
}
