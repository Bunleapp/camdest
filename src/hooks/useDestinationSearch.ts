"use client";

import { useEffect, useRef, useState } from "react";
import { Destination } from "@/types/destination";
import {
  SearchParams,
  searchDestinationsRequest,
} from "@/services/destinationService";
import { useDebounce } from "@/hooks/useDebounce";

export type SearchStatus = "idle" | "loading" | "success" | "error";

interface UseDestinationSearchResult {
  results: Destination[];
  status: SearchStatus;
  error: string | null;
}

function hasSearchCriteria(params: SearchParams, minLength: number): boolean {
  return (
    (params.q?.trim().length ?? 0) >= minLength &&
    Boolean(params.q?.trim() || params.province || params.category || params.activity)
  );
}

/**
 * Debounced instant search against /api/search. Fetches through the
 * service layer only — never reads mock data directly.
 */
export function useDestinationSearch(
  params: SearchParams,
  { minLength = 0, debounceMs = 350 }: { minLength?: number; debounceMs?: number } = {}
): UseDestinationSearchResult {
  const debouncedParams = useDebounce(params, debounceMs);
  const [results, setResults] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  // "settled" status only — "loading" is derived at render time below,
  // so no synchronous setState is needed at the start of the effect.
  const [settledStatus, setSettledStatus] = useState<"idle" | "success" | "error">("idle");
  const [settledParams, setSettledParams] = useState(debouncedParams);
  const requestIdRef = useRef(0);

  const isActive = hasSearchCriteria(debouncedParams, minLength);
  const isPending = isActive && settledParams !== debouncedParams;

  useEffect(() => {
    if (!isActive) {
      requestIdRef.current += 1;
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    searchDestinationsRequest(debouncedParams)
      .then((data) => {
        if (currentRequestId !== requestIdRef.current) return;
        setResults(data);
        setSettledStatus("success");
        setSettledParams(debouncedParams);
      })
      .catch((err: Error) => {
        if (currentRequestId !== requestIdRef.current) return;
        setError(err.message);
        setSettledStatus("error");
        setSettledParams(debouncedParams);
      });
  }, [debouncedParams, isActive]);

  const status: SearchStatus = !isActive
    ? "idle"
    : isPending
      ? "loading"
      : settledStatus === "idle"
        ? "loading"
        : settledStatus;

  return { results: isActive ? results : [], status, error };
}
