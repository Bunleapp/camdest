"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { TourismCategory } from "@/types/destination";

export interface DestinationFilters {
  province: string | null;
  category: TourismCategory | null;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  familyFriendly: boolean;
  sortBy: "popularity" | "rating" | "price-low" | "price-high";
}

export const DEFAULT_FILTERS: DestinationFilters = {
  province: null,
  category: null,
  minPrice: 0,
  maxPrice: 100,
  minRating: 0,
  familyFriendly: false,
  sortBy: "popularity",
};

type FilterAction =
  | { type: "SET_PROVINCE"; payload: string | null }
  | { type: "SET_CATEGORY"; payload: TourismCategory | null }
  | { type: "SET_PRICE_RANGE"; payload: { min: number; max: number } }
  | { type: "SET_MIN_RATING"; payload: number }
  | { type: "TOGGLE_FAMILY_FRIENDLY" }
  | { type: "SET_SORT_BY"; payload: DestinationFilters["sortBy"] }
  | { type: "RESET" };

function filterReducer(
  state: DestinationFilters,
  action: FilterAction
): DestinationFilters {
  switch (action.type) {
    case "SET_PROVINCE":
      return { ...state, province: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, minPrice: action.payload.min, maxPrice: action.payload.max };
    case "SET_MIN_RATING":
      return { ...state, minRating: action.payload };
    case "TOGGLE_FAMILY_FRIENDLY":
      return { ...state, familyFriendly: !state.familyFriendly };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "RESET":
      return DEFAULT_FILTERS;
    default:
      return state;
  }
}

interface FilterContextValue {
  filters: DestinationFilters;
  setProvince: (province: string | null) => void;
  setCategory: (category: TourismCategory | null) => void;
  setPriceRange: (min: number, max: number) => void;
  setMinRating: (rating: number) => void;
  toggleFamilyFriendly: () => void;
  setSortBy: (sortBy: DestinationFilters["sortBy"]) => void;
  reset: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, dispatch] = useReducer(filterReducer, DEFAULT_FILTERS);

  const value: FilterContextValue = {
    filters,
    setProvince: (province) => dispatch({ type: "SET_PROVINCE", payload: province }),
    setCategory: (category) => dispatch({ type: "SET_CATEGORY", payload: category }),
    setPriceRange: (min, max) => dispatch({ type: "SET_PRICE_RANGE", payload: { min, max } }),
    setMinRating: (rating) => dispatch({ type: "SET_MIN_RATING", payload: rating }),
    toggleFamilyFriendly: () => dispatch({ type: "TOGGLE_FAMILY_FRIENDLY" }),
    setSortBy: (sortBy) => dispatch({ type: "SET_SORT_BY", payload: sortBy }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
