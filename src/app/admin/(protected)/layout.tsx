import { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

/**
 * Layout for the `(protected)` route group under /admin — applies the
 * sidebar/topbar chrome (AdminShell) to every authenticated admin page
 * (dashboard, destinations list/create/edit) without affecting
 * /admin/login, which renders its own standalone page.
 *
 * Route groups don't affect the URL, so /admin/dashboard and
 * /admin/destinations paths are unchanged.
 *
 * Note: this layout renders the shell UI only. Actual access control
 * for these pages is enforced by src/middleware.ts (redirects
 * unauthenticated visitors to /admin/login before this layout ever
 * renders).
 */
export default function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
