"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useRef, useState } from "react";
import { useDestinationSearch } from "@/hooks/useDestinationSearch";
import SearchResultItem from "@/components/search/SearchResultItem";

interface InstantSearchProps {
  className?: string;
  placeholder?: string;
}

/**
 * Instant, debounced search box with a live results dropdown.
 * Falls back to full navigation to /destinations?q= on submit,
 * so it also works as a standard search entry point.
 *
 * Results are exposed via a plain aria-live region rather than a
 * combobox/listbox ARIA pattern, since arrow-key navigation between
 * suggestions isn't implemented — using those roles without full
 * keyboard support would misrepresent the widget to assistive tech.
 * Keyboard users can Tab from the input directly into result links.
 */
export default function InstantSearch({
  className = "",
  placeholder = "Search temples, islands, provinces...",
}: InstantSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchParams = useMemo(() => ({ q: query }), [query]);
  const { results, status } = useDestinationSearch(searchParams, {
    minLength: 2,
  });

  const showDropdown = isFocused && query.trim().length >= 2;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/destinations?${params.toString()}`);
  }

  function handleContainerBlur(event: React.FocusEvent<HTMLDivElement>) {
    // Only close once focus has actually left the whole search
    // widget (input + dropdown), not when it merely moves from the
    // input to a result link inside the same container.
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      onBlur={handleContainerBlur}
    >
      <form
        role="search"
        onSubmit={handleSubmit}
        className="glass flex w-full items-center gap-2 rounded-full p-2 shadow-lg"
      >
        <label htmlFor="instant-search" className="sr-only">
          Search destinations
        </label>
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
          id="instant-search"
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 rounded-full bg-primary-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
        >
          Search
        </button>
      </form>

      {showDropdown && (
        <div
          id="instant-search-results"
          aria-live="polite"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5"
        >
          {status === "loading" && (
            <div className="flex flex-col gap-2 p-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-black/5" />
              ))}
            </div>
          )}

          {status === "success" && results.length === 0 && (
            <p className="p-4 text-center text-sm text-muted">
              No destinations found for &ldquo;{query}&rdquo;.
            </p>
          )}

          {status === "error" && (
            <p className="p-4 text-center text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}

          {status === "success" && results.length > 0 && (
            <>
              {results.slice(0, 6).map((destination) => (
                <SearchResultItem
                  key={destination.id}
                  destination={destination}
                  onSelect={() => setIsFocused(false)}
                />
              ))}
              <Link
                href={`/destinations?q=${encodeURIComponent(query)}`}
                className="mt-1 block rounded-xl p-2.5 text-center text-sm font-medium text-primary-dark hover:bg-primary/5"
              >
                View all results →
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
