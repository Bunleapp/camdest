"use client";

import { useMemo, useState } from "react";
import { Destination } from "@/types/destination";
import DestinationCard from "@/components/cards/DestinationCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { useDestinationSearch } from "@/hooks/useDestinationSearch";
import { useFilters } from "@/context/FilterContext";
import { applyFilters, getUniqueProvinces } from "@/utils/filter-destinations";

interface DestinationsExplorerProps {
  initialDestinations: Destination[];
  initialQuery: string;
}

/**
 * Client-side layer for the /destinations listing page. Renders the
 * server-fetched initial list immediately (fast first paint, SEO),
 * then switches to live debounced search results (via /api/search)
 * as soon as the user edits the search box — with loading, empty,
 * and no-result states. Filters (province, category, price, rating,
 * family-friendly, sort) are applied client-side on top of either
 * source via FilterContext.
 */
export default function DestinationsExplorer({
  initialDestinations,
  initialQuery,
}: DestinationsExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [hasEdited, setHasEdited] = useState(false);
  const { filters } = useFilters();

  const searchParams = useMemo(() => ({ q: query }), [query]);
  const { results, status } = useDestinationSearch(searchParams, {
    minLength: 0,
    debounceMs: 300,
  });

  const isSearching = hasEdited && query.trim().length > 0;
  const baseDestinations = isSearching ? results : initialDestinations;
  const isLoading = isSearching && status === "loading";

  const provinces = useMemo(
    () => getUniqueProvinces(initialDestinations),
    [initialDestinations]
  );

  const destinations = useMemo(
    () => applyFilters(baseDestinations, filters),
    [baseDestinations, filters]
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <FilterSidebar provinces={provinces} />
      </div>

      <div className="lg:col-span-3">
        <label htmlFor="destinations-filter" className="sr-only">
          Filter destinations
        </label>
        <div className="glass flex items-center gap-2 rounded-full p-2 shadow-lg">
          <svg
            className="ml-2 h-5 w-5 flex-shrink-0 text-muted"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" />
            <path d="M17 17l-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            id="destinations-filter"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHasEdited(true);
            }}
            placeholder="Filter by name, province, category, or activity..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>

        {isSearching && (
          <p className="mt-6 text-center text-sm text-muted" aria-live="polite">
            {isLoading
              ? "Searching..."
              : baseDestinations.length > 0
                ? `Showing ${destinations.length} result${destinations.length === 1 ? "" : "s"} for "${query}"`
                : `No results found for "${query}"`}
          </p>
        )}

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-black/5" />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="text-lg font-medium text-foreground">
              No destinations found
            </p>
            <p className="mt-1 text-sm text-muted">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                priority={index < 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
