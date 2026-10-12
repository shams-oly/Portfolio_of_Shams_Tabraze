import { Cursor, Footer, Nav, SmoothScroll } from "@/components/site-chrome";
import { getProfile } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <SmoothScroll>
      <div className="grain">
        <Nav profile={profile} />
        <Cursor />
        <main>{children}</main>
        <Footer profile={profile} />
      </div>
    </SmoothScroll>
  );
}
