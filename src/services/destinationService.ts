import {
  Destination,
  EstimateBreakdown,
  EstimateRequest,
  Recommendation,
  RecommendationCriteria,
} from "@/types/destination";

/**
 * Client-facing service layer. All functions here call internal
 * Next.js Route Handlers via fetch() — never the mock JSON files
 * directly. This is the only layer components should import from
 * to read or mutate destination data.
 *
 * Works in both Client Components (relative URL, browser resolves
 * it against the current origin) and Server Components (absolute
 * URL required, resolved via getBaseUrl()).
 */

async function getBaseUrl(): Promise<string> {
  if (typeof window !== "undefined") return "";

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Server Component / Route Handler context: derive origin from
  // the incoming request headers so this works in dev, behind a
  // reverse proxy, and in most hosting platforms without extra config.
  try {
    const { headers } = await import("next/headers");
    const headerList = await headers();
    const host = headerList.get("host");
    const protocol = headerList.get("x-forwarded-proto") ?? "http";
    if (host) return `${protocol}://${host}`;
  } catch {
    // headers() throws outside a request scope (e.g. build-time
    // static generation) — fall back to localhost for dev/build.
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchDestinations(): Promise<Destination[]> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destinations`, {
    cache: "no-store",
  });
  return handleResponse<Destination[]>(res);
}

export async function fetchDestinationById(
  id: string
): Promise<Destination> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destinations/${id}`, {
    cache: "no-store",
  });
  return handleResponse<Destination>(res);
}

export async function createDestinationRequest(
  input: Omit<Destination, "id">
): Promise<Destination> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Destination>(res);
}

export async function updateDestinationRequest(
  id: string,
  input: Partial<Omit<Destination, "id">>
): Promise<Destination> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destinations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Destination>(res);
}

export async function deleteDestinationRequest(
  id: string
): Promise<{ id: string; deleted: boolean }> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destinations/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ id: string; deleted: boolean }>(res);
}

export interface SearchParams {
  q?: string;
  province?: string;
  category?: string;
  activity?: string;
}

export async function searchDestinationsRequest(
  params: SearchParams
): Promise<Destination[]> {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.province) query.set("province", params.province);
  if (params.category) query.set("category", params.category);
  if (params.activity) query.set("activity", params.activity);

  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/search?${query.toString()}`, {
    cache: "no-store",
  });
  return handleResponse<Destination[]>(res);
}

export async function fetchRecommendations(
  criteria: Partial<RecommendationCriteria>
): Promise<Recommendation[]> {
  const query = new URLSearchParams();
  if (criteria.budget !== undefined) query.set("budget", String(criteria.budget));
  if (criteria.activities?.length) query.set("activities", criteria.activities.join(","));
  if (criteria.province) query.set("province", criteria.province);
  if (criteria.travelDuration !== undefined) query.set("travelDuration", String(criteria.travelDuration));
  if (criteria.travelerType) query.set("travelerType", criteria.travelerType);
  if (criteria.category) query.set("category", criteria.category);

  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/recommendations?${query.toString()}`, {
    cache: "no-store",
  });
  return handleResponse<Recommendation[]>(res);
}

export async function submitEstimate(
  request: EstimateRequest
): Promise<EstimateBreakdown & { destination: Destination }> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/estimate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  return handleResponse<EstimateBreakdown & { destination: Destination }>(res);
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<{ success: boolean; message: string }>(res);
}
