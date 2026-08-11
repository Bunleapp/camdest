import bcrypt from "bcryptjs";

/**
 * Verifies admin login credentials against environment-configured values.
 *
 * The admin account is not stored in a database — this is a
 * single-administrator system. Credentials live in environment
 * variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`), never in source code.
 *
 * Returns true only if both the email matches (case-insensitive) and the
 * password matches the stored bcrypt hash.
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    // Misconfiguration — fail closed.
    return false;
  }

  const emailMatches =
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

  // Always run bcrypt.compare (even when the email doesn't match) so that
  // response timing doesn't leak whether the email exists.
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

  return emailMatches && passwordMatches;
}
