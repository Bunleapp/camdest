import { redirect } from "next/navigation";

/**
 * /admin
 *
 * Bare /admin has no dedicated UI — redirect to the dashboard.
 * Unauthenticated visitors hitting /admin are still caught by
 * src/middleware.ts (matcher: "/admin/:path*"), which redirects them
 * to /admin/login before this page's redirect would even matter.
 */
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
