import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getRecommendations } from "@/lib/recommendations-repository";
import { recommendationQuerySchema } from "@/lib/validation";

/**
 * GET /api/recommendations?budget=&activities=&province=&travelDuration=&travelerType=&category=
 * Returns recommended destinations based on user criteria.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = recommendationQuerySchema.safeParse({
      budget: searchParams.get("budget") ?? undefined,
      activities: searchParams.get("activities") ?? undefined,
      province: searchParams.get("province") ?? undefined,
      travelDuration: searchParams.get("travelDuration") ?? undefined,
      travelerType: searchParams.get("travelerType") ?? undefined,
      category: searchParams.get("category") ?? undefined,
    });

    if (!parsed.success) {
      return apiError(parsed.error.issues.map((i) => i.message).join(", "), 400);
    }

    const { activities, ...rest } = parsed.data;

    const recommendations = await getRecommendations({
      ...rest,
      activities: activities ? activities.split(",").map((a) => a.trim()) : [],
    });

    return apiSuccess(recommendations);
  } catch {
    return apiError("Failed to load recommendations", 500);
  }
}
