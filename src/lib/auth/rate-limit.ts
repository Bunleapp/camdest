/**
 * Best-effort in-memory sliding-window rate limiter for the admin login
 * endpoint.
 *
 * LIMITATION (documented, not hidden): this state lives in the Node.js
 * process memory. It resets on server restart and is NOT shared across
 * multiple instances/serverless invocations. On platforms like Vercel,
 * each serverless function invocation may run in a different process,
 * which makes this limiter unreliable as the sole brute-force defense in
 * a horizontally-scaled or serverless production deployment.
 *
 * For real production durability, replace this with a shared store
 * (e.g. Upstash Ratelimit / Redis) or a platform-level control (e.g. a
 * WAF rule or reverse-proxy rate limit in front of /api/admin/login).
 * This implementation is intentionally simple and is documented as a
 * remaining risk in the final report rather than presented as a
 * complete solution.
 */

interface AttemptRecord {
  timestamps: number[];
}

const attempts = new Map<string, AttemptRecord>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_WINDOW = 10;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export function checkLoginRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const record = attempts.get(identifier) ?? { timestamps: [] };

  // Drop timestamps outside the current window.
  record.timestamps = record.timestamps.filter(
    (ts) => now - ts < WINDOW_MS
  );

  if (record.timestamps.length >= MAX_ATTEMPTS_PER_WINDOW) {
    const oldestInWindow = record.timestamps[0];
    const retryAfterSeconds = Math.ceil(
      (WINDOW_MS - (now - oldestInWindow)) / 1000
    );
    attempts.set(identifier, record);
    return { allowed: false, retryAfterSeconds };
  }

  record.timestamps.push(now);
  attempts.set(identifier, record);
  return { allowed: true };
}

/**
 * Extracts a best-effort client identifier for rate limiting purposes.
 * Falls back to a constant when no forwarded IP header is present
 * (e.g. local dev) — acceptable since this is a best-effort limiter.
 */
export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "unknown";
}
