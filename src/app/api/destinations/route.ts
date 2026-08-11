import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  createDestination,
  getAllDestinations,
} from "@/lib/destinations-repository";
import { destinationInputSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth/require-admin";

/**
 * GET /api/destinations
 * Returns all destinations. Public — no authentication required.
 */
export async function GET() {
  try {
    const destinations = await getAllDestinations();
    return apiSuccess(destinations);
  } catch {
    return apiError("Failed to load destinations", 500);
  }
}

/**
 * POST /api/destinations
 * Creates a new destination. Admin-only.
 *
 * Authorization is verified here independently of the /admin route
 * middleware — a request that reaches this handler directly (e.g. via
 * curl/Postman) without a valid admin session is rejected with 401,
 * regardless of what the frontend UI does or doesn't show.
 */
export async function POST(request: NextRequest) {
  const session = await requireAdmin(request);
  if (!session) {
    return apiError("Authentication required.", 401);
  }

  try {
    const body = await request.json();
    const parsed = destinationInputSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues.map((i) => i.message).join(", "), 400);
    }

    const created = await createDestination(parsed.data);
    return apiSuccess(created, 201);
  } catch {
    return apiError("Failed to create destination", 500);
  }
}
