import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Signed session token handling for the admin dashboard.
 *
 * Uses `jose` (HS256 signed JWT) so the exact same implementation works in
 * both the Edge middleware runtime and Node.js API route handlers.
 *
 * The session is intentionally stateless (no server-side session store):
 * the signature + expiry claim are the security boundary. This is
 * appropriate for a single-administrator system backed by JSON file
 * storage with no database.
 */

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 hours

export interface AdminSessionPayload extends JWTPayload {
  sub: string; // admin email
  role: "admin";
}

function getAuthSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET environment variable is missing or too short. " +
        "Set a random string of at least 32 characters."
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Creates a signed JWT session token for an authenticated admin.
 */
export async function createSessionToken(email: string): Promise<string> {
  const key = getAuthSecretKey();

  return new SignJWT({ role: "admin" } satisfies Pick<AdminSessionPayload, "role">)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(key);
}

/**
 * Verifies a session token's signature and expiry.
 * Returns the decoded payload if valid, or null if invalid/expired/missing.
 *
 * This never throws — callers should treat `null` as "unauthenticated".
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token) return null;

  try {
    const key = getAuthSecretKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    if (payload.role !== "admin" || typeof payload.sub !== "string") {
      return null;
    }

    return payload as AdminSessionPayload;
  } catch {
    // Invalid signature, malformed token, or expired token.
    return null;
  }
}
