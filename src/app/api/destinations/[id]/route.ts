import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  deleteDestination,
  getDestinationById,
  updateDestination,
} from "@/lib/destinations-repository";
import { destinationUpdateSchema } from "@/lib/validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/destinations/[id]
 * Returns a single destination by ID.
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
 * Updates an existing destination.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
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
 * Deletes a destination.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deleted = await deleteDestination(id);

  if (!deleted) {
    return apiError("Destination not found", 404);
  }

  return apiSuccess({ id, deleted: true });
}
