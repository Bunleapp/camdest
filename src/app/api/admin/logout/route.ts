import { apiSuccess } from "@/lib/api-response";
import { clearSessionCookie } from "@/lib/auth/session-cookie";

/**
 * POST /api/admin/logout
 *
 * Invalidates the admin session by clearing the session cookie.
 * Since sessions are stateless signed JWTs, "invalidation" means the
 * browser no longer holds a usable token — this endpoint clears it
 * client-side via a Set-Cookie with maxAge=0.
 */
export async function POST() {
  await clearSessionCookie();
  return apiSuccess({ loggedOut: true });
}
