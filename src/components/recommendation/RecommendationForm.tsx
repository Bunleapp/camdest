"use client";

import { useState } from "react";
import { Recommendation, RecommendationCriteria } from "@/types/destination";
import { fetchRecommendations } from "@/services/destinationService";
import RecommendationCard from "@/components/recommendation/RecommendationCard";
import Button from "@/components/ui/Button";

const TRAVELER_TYPES: { value: RecommendationCriteria["travelerType"]; label: string }[] = [
  { value: "family", label: "Family" },
  { value: "couple", label: "Couple" },
  { value: "solo", label: "Solo" },
  { value: "adventure", label: "Adventure" },
  { value: "beach", label: "Beach" },
  { value: "culture", label: "Culture" },
];

export default function RecommendationForm() {
  const [budget, setBudget] = useState(40);
  const [travelDuration, setTravelDuration] = useState(3);
  const [travelerType, setTravelerType] =
    useState<RecommendationCriteria["travelerType"]>("culture");
  const [province, setProvince] = useState("");

  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchRecommendations({
        budget,
        travelDuration,
        travelerType,
        province: province || undefined,
        activities: [travelerType],
      });
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recommendations.");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="rec-budget" className="text-sm font-medium text-foreground">
            Budget (USD)
          </label>
          <input
            id="rec-budget"
            type="number"
            min={5}
            max={500}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
            className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label htmlFor="rec-duration" className="text-sm font-medium text-foreground">
            Travel Days
          </label>
          <input
            id="rec-duration"
            type="number"
            min={1}
            max={30}
            value={travelDuration}
            onChange={(e) => setTravelDuration(Number(e.target.value) || 1)}
            className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label htmlFor="rec-traveler-type" className="text-sm font-medium text-foreground">
            Traveler Type
          </label>
          <select
            id="rec-traveler-type"
            value={travelerType}
            onChange={(e) =>
              setTravelerType(e.target.value as RecommendationCriteria["travelerType"])
            }
            className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {TRAVELER_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rec-province" className="text-sm font-medium text-foreground">
            Province (optional)
          </label>
          <input
            id="rec-province"
            type="text"
            placeholder="e.g. Siem Reap"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Finding matches..." : "Get Recommendations"}
          </Button>
        </div>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {results && (
        results.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted">
            No matches found. Try adjusting your budget or traveler type.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((rec) => (
              <RecommendationCard key={rec.destination.id} recommendation={rec} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
