import { Destination } from "@/types/destination";
import { DestinationFilters } from "@/context/FilterContext";

export function applyFilters(
  destinations: Destination[],
  filters: DestinationFilters
): Destination[] {
  const filtered = destinations.filter((destination) => {
    if (filters.province && destination.province !== filters.province) {
      return false;
    }
    if (filters.category && destination.category !== filters.category) {
      return false;
    }
    if (destination.price < filters.minPrice || destination.price > filters.maxPrice) {
      return false;
    }
    if (destination.rating < filters.minRating) {
      return false;
    }
    if (filters.familyFriendly && !destination.familyFriendly) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
    default:
      sorted.sort((a, b) => b.popularity - a.popularity);
  }

  return sorted;
}

export function getUniqueProvinces(destinations: Destination[]): string[] {
  return Array.from(new Set(destinations.map((d) => d.province))).sort();
}
