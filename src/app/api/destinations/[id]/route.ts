import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  deleteDestination,
  getDestinationById,
  updateDestination,
} from "@/lib/destinations-repository";
import { destinationUpdateSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth/require-admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/destinations/[id]
 * Returns a single destination by ID. Public — no authentication required.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const destination = await getDestinationById(id);

  if (!destination) {
    return apiError("Destination not found", 404);
  }

  return apiSuccess(destination);
}

/**
 * PUT /api/destinations/[id]
 * Updates an existing destination. Admin-only.
 *
 * Order of checks: authentication -> authorization -> input validation
 * -> ID validation/existence -> mutation. This mirrors the "defense in
 * depth" requirement — this check is independent of the /admin route
 * middleware and runs even if the request comes directly from
 * curl/Postman.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin(request);
  if (!session) {
    return apiError("Authentication required.", 401);
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = destinationUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues.map((i) => i.message).join(", "), 400);
    }

    const updated = await updateDestination(id, parsed.data);

    if (!updated) {
      return apiError("Destination not found", 404);
    }

    return apiSuccess(updated);
  } catch {
    return apiError("Failed to update destination", 500);
  }
}

/**
 * DELETE /api/destinations/[id]
 * Deletes a destination. Admin-only.
 *
 * The frontend confirmation dialog is a UX nicety only — this server
 * check is what actually prevents unauthorized deletion.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await requireAdmin(request);
  if (!session) {
    return apiError("Authentication required.", 401);
  }

  const { id } = await params;

  try {
    const deleted = await deleteDestination(id);

    if (!deleted) {
      return apiError("Destination not found", 404);
    }

    return apiSuccess({ id, deleted: true });
  } catch {
    return apiError("Failed to delete destination", 500);
  }
}
