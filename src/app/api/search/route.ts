import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import { searchDestinations } from "@/lib/destinations-repository";

/**
 * GET /api/search?q=&province=&category=&activity=
 * Searches destinations by name, province, category, or activity.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? undefined;
    const province = searchParams.get("province") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const activity = searchParams.get("activity") ?? undefined;

    const results = await searchDestinations({ q, province, category, activity });
    return apiSuccess(results);
  } catch {
    return apiError("Search failed", 500);
  }
}
