import type { Metadata } from "next";
import { fetchDestinations } from "@/services/destinationService";
import DestinationsTable from "@/components/admin/DestinationsTable";

export const metadata: Metadata = {
  title: "Destinations",
};

/**
 * /admin/destinations
 *
 * Server Component — loads all destinations via the public
 * GET /api/destinations endpoint (reused, not duplicated), then hands
 * off to a Client Component for search/filter/delete interactivity.
 */
export default async function AdminDestinationsPage() {
  let destinations: Awaited<ReturnType<typeof fetchDestinations>> = [];
  let loadError: string | null = null;

  try {
    destinations = await fetchDestinations();
  } catch {
    loadError = "Unable to load destinations right now. Please try again.";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all tourism destinations.
          </p>
        </div>
      </div>

      {loadError ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {loadError}
        </p>
      ) : (
        <DestinationsTable initialDestinations={destinations} />
      )}
    </div>
  );
}
