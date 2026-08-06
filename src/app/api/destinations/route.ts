import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  createDestination,
  getAllDestinations,
} from "@/lib/destinations-repository";
import { destinationInputSchema } from "@/lib/validation";

/**
 * GET /api/destinations
 * Returns all destinations.
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
 * Creates a new destination.
 */
export async function POST(request: NextRequest) {
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
