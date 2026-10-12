import { FeaturedWork } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import { AboutTeaser, Apps, Capabilities, Intro, Stats } from "@/components/home/sections";
import { getProfile, getProjects } from "@/lib/content";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const featured = projects.filter((p) => p.featured);
  const apps = projects.filter((p) => p.category === "app" && p.icon);
  const icons = apps.map((a) => a.icon!).slice(0, 12);

  return (
    <>
      <Hero profile={profile} icons={icons} />
      <Intro profile={profile} />
      <Stats profile={profile} />
      {featured.length > 0 && <FeaturedWork projects={featured} />}
      <Capabilities profile={profile} />
      {apps.length > 0 && <Apps apps={apps} />}
      <AboutTeaser profile={profile} />
    </>
  );
}
