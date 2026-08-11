import { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./session";

/**
 * Server-side authorization guard for API route handlers.
 *
 * This is the API-layer half of "defense in depth": even though the
 * admin middleware already blocks unauthenticated access to /admin/**
 * pages, every mutating destination endpoint independently re-verifies
 * the session here. A request that reaches the route handler (e.g. via
 * curl/Postman, bypassing the browser/middleware entirely) is still
 * checked before any mutation happens.
 *
 * Returns the verified session payload when authorized, or `null` when
 * not. Callers should respond with 401 Unauthorized when this is null.
 */
export async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  return session; // null when missing/invalid/expired
}
