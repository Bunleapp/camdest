import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

// font loading (NExt.js downloads these fonts at build time and serves directly from server)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  // ensure all URLs generated in the <head> are absolute
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Explore the World`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  // when passing website link in a text message, it create a nice preview card instead of boring blue link
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// this is HTML document. It establishes <html> and <body> tags
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a // allows keyboard users to jump straight to the acutal page content
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-2 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

// children prop represents the active route segment's own layout+page.
// The root layout only provides the <html>/<body> shell + fonts, so that
// the public site (Navbar/Footer via (site)/layout.tsx) and the admin
// dashboard (its own chrome via admin/layout.tsx) can render completely
// different UI without either one leaking into the other.