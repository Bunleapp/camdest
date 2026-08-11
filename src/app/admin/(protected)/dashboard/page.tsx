import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Star, DollarSign, Plus } from "lucide-react";
import { fetchDestinations } from "@/services/destinationService";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * /admin/dashboard
 *
 * Server Component — fetches destinations via the same public
 * GET /api/destinations endpoint the visitor site uses (no duplicated
 * business logic), then renders admin-only statistics and quick
 * actions. This page itself is protected by src/middleware.ts.
 */
export default async function AdminDashboardPage() {
  let destinations: Awaited<ReturnType<typeof fetchDestinations>> = [];
  let loadError: string | null = null;

  try {
    destinations = await fetchDestinations();
  } catch {
    loadError = "Unable to load destination statistics right now.";
  }

  const totalDestinations = destinations.length;
  const averageRating =
    totalDestinations > 0
      ? (
          destinations.reduce((sum, d) => sum + d.rating, 0) /
          totalDestinations
        ).toFixed(1)
      : "—";
  const averagePrice =
    totalDestinations > 0
      ? Math.round(
          destinations.reduce((sum, d) => sum + d.price, 0) /
            totalDestinations
        )
      : 0;

  const recentDestinations = destinations.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of destination content.
          </p>
        </div>
        <Button href="/admin/destinations/create" size="sm">
          <Plus size={16} aria-hidden="true" />
          New Destination
        </Button>
      </div>

      {loadError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {loadError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={MapPin}
          label="Total Destinations"
          value={String(totalDestinations)}
        />
        <StatCard icon={Star} label="Average Rating" value={`${averageRating} / 5`} />
        <StatCard
          icon={DollarSign}
          label="Average Price"
          value={`$${averagePrice}`}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Recently Added Destinations
          </h2>
          <Link
            href="/admin/destinations"
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentDestinations.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No destinations yet. Create your first one to get started.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {recentDestinations.map((destination) => (
              <li
                key={destination.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {destination.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {destination.province} · {destination.category}
                  </p>
                </div>
                <Link
                  href={`/admin/destinations/${destination.id}/edit`}
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <Icon size={20} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
