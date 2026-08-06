"use client";

import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after
 * `delayMs` has elapsed without the value changing.
 */
export function useDebounce<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout); // clean up function
  }, [value, delayMs]);

  return debounced;
}
