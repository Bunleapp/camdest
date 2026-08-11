import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth/require-admin";

/**
 * GET /api/admin/me
 *
 * Lets the admin dashboard UI check whether the current session is
 * still valid (e.g. after the JWT expires) without exposing the
 * session token or secret to client-side JavaScript.
 */
export async function GET(request: NextRequest) {
  const session = await requireAdmin(request);

  if (!session) {
    return apiError("Not authenticated.", 401);
  }

  return apiSuccess({ email: session.sub, role: session.role });
}
