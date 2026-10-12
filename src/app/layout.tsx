import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shamstabraze.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shams Tabraze — Product & Interaction Designer",
    template: "%s — Shams Tabraze",
  },
  description:
    "Portfolio of Shams Tabraze Uddin Ahmed — Senior UI/UX Designer and researcher designing consumer apps used by 4M+ people.",
  openGraph: {
    type: "website",
    siteName: "Shams Tabraze",
    images: ["/brand/photo.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#08080b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
