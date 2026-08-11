import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import { adminLoginSchema } from "@/lib/validation";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createSessionToken } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/session-cookie";
import { checkLoginRateLimit, getClientIdentifier } from "@/lib/auth/rate-limit";

/**
 * POST /api/admin/login
 *
 * Authenticates the administrator and issues a signed HttpOnly session
 * cookie. Never reveals whether the submitted email matches a known
 * account — all failures return the same generic "Invalid credentials"
 * message and 401 status, to avoid account enumeration.
 */
export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = checkLoginRateLimit(clientId);

  if (!rateLimit.allowed) {
    return apiError(
      "Too many login attempts. Please try again later.",
      429
    );
  }

  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid credentials.", 400);
    }

    const { email, password } = parsed.data;
    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return apiError("Invalid credentials.", 401);
    }

    const token = await createSessionToken(email);
    await setSessionCookie(token);

    return apiSuccess({ email });
  } catch {
    return apiError("Unable to sign in. Please try again.", 500);
  }
}
