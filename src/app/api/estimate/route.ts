import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getDestinationById } from "@/lib/destinations-repository";
import { calculateEstimate } from "@/lib/estimate-calculator";
import { estimateRequestSchema } from "@/lib/validation";

/**
 * POST /api/estimate
 * Calculates a travel cost estimate breakdown for a destination.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = estimateRequestSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues.map((i) => i.message).join(", "), 400);
    }

    const destination = await getDestinationById(parsed.data.destinationId);

    if (!destination) {
      return apiError("Destination not found", 404);
    }

    const breakdown = calculateEstimate(parsed.data, destination);
    return apiSuccess({ destination, ...breakdown });
  } catch {
    return apiError("Failed to calculate estimate", 500);
  }
}
