import { ReactNode } from "react";
import type { Metadata } from "next";

/**
 * Layout for /admin/** (root of the admin route segment).
 *
 * Deliberately does NOT render SiteLayout, Navbar, or Footer — the
 * admin dashboard is a completely separate management application from
 * the public tourism website. It lives outside the `(site)` route
 * group, so it never inherits the public chrome.
 *
 * This layout only provides shared metadata. The sidebar/topbar chrome
 * (AdminShell) is applied one level deeper, in
 * src/app/admin/(protected)/layout.tsx, so the login page can render
 * its own standalone full-page layout without a sidebar that would be
 * meaningless before the admin is authenticated.
 *
 * `robots: { index: false }` keeps the admin area out of search engine
 * results — it should not be discoverable via search, even though the
 * real security boundary is the middleware + API authorization, not
 * obscurity.
 */
export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
