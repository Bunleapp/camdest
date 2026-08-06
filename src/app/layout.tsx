import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/layout/SiteLayout";
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
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

// children prop represent specific page.tsx the user is currently visiting
// <SiteLayout> contains nav bar and footer