import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

/**
 * Protects all /admin/** pages except /admin/login.
 *
 * Named `proxy.ts` per the Next.js 16 file convention (the older
 * `middleware.ts` convention is deprecated as of v16.0.0, same API,
 * renamed export). See https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 *
 * This is page-level protection only (redirect to /admin/login when
 * unauthenticated). It is NOT a substitute for server-side authorization
 * inside the API route handlers — those independently re-verify the
 * session (see src/lib/auth/require-admin.ts) so that direct API
 * requests (curl/Postman) that bypass this proxy's page redirect
 * are still rejected before any data mutation happens.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminArea = pathname.startsWith("/admin");

  if (!isAdminArea || isLoginPage) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
