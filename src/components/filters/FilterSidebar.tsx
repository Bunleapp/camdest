"use client";

import { useFilters } from "@/context/FilterContext";
import { TourismCategory } from "@/types/destination";
import { CATEGORY_LABEL } from "@/utils/destination-display";

const CATEGORY_OPTIONS: TourismCategory[] = [
  "eco-tourism",
  "cultural-heritage",
  "dark-tourism",
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

interface FilterSidebarProps {
  provinces: string[];
}

export default function FilterSidebar({ provinces }: FilterSidebarProps) {
  const {
    filters,
    setProvince,
    setCategory,
    setPriceRange,
    setMinRating,
    toggleFamilyFriendly,
    setSortBy,
    reset,
  } = useFilters();

  return (
    <aside className="space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Filters</h2>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-medium text-primary-dark hover:underline"
        >
          Reset Filters
        </button>
      </div>

      <div>
        <label htmlFor="filter-province" className="text-sm font-medium text-foreground">
          Province
        </label>
        <select
          id="filter-province"
          value={filters.province ?? ""}
          onChange={(e) => setProvince(e.target.value || null)}
          className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="">All Provinces</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">Category</legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              name="category-filter"
              checked={filters.category === null}
              onChange={() => setCategory(null)}
            />
            All Categories
          </label>
          {CATEGORY_OPTIONS.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name="category-filter"
                checked={filters.category === category}
                onChange={() => setCategory(category)}
              />
              {CATEGORY_LABEL[category]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="text-sm font-medium text-foreground">
          Price Range: ${filters.minPrice} – ${filters.maxPrice}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="range"
            min={0}
            max={100}
            value={filters.minPrice}
            onChange={(e) =>
              setPriceRange(Math.min(Number(e.target.value), filters.maxPrice), filters.maxPrice)
            }
            aria-label="Minimum price"
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={100}
            value={filters.maxPrice}
            onChange={(e) =>
              setPriceRange(filters.minPrice, Math.max(Number(e.target.value), filters.minPrice))
            }
            aria-label="Maximum price"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="filter-rating" className="text-sm font-medium text-foreground">
          Minimum Rating: {filters.minRating.toFixed(1)}+
        </label>
        <input
          id="filter-rating"
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="mt-2 w-full"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={filters.familyFriendly}
          onChange={toggleFamilyFriendly}
        />
        Family Friendly Only
      </label>

      <div>
        <label htmlFor="filter-sort" className="text-sm font-medium text-foreground">
          Sort By
        </label>
        <select
          id="filter-sort"
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof filters.sortBy)}
          className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
