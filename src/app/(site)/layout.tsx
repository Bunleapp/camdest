import { ReactNode } from "react";
import SiteLayout from "@/components/layout/SiteLayout";

/**
 * Layout for the `(site)` route group — the public visitor-facing
 * website. This is the ONLY place that renders the public Navbar and
 * Footer, so the admin dashboard (src/app/admin/**) never inherits
 * them, since it lives outside this route group.
 *
 * Route groups like `(site)` do not appear in the URL, so all existing
 * public paths (`/`, `/about`, `/destinations`, etc.) are unchanged.
 */
export default function SiteRouteGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
