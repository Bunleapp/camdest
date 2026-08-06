"use client";

import { useState } from "react";
import { Destination, EstimateBreakdown, EstimateRequest } from "@/types/destination";
import { submitEstimate } from "@/services/destinationService";
import {
  ACCOMMODATION_OPTIONS,
  ESTIMATE_ACTIVITY_OPTIONS,
  FOOD_BUDGET_OPTIONS,
  TRANSPORTATION_OPTIONS,
} from "@/lib/estimate-options";
import OptionSelector from "@/components/forms/OptionSelector";
import DestinationSelect from "@/components/forms/DestinationSelect";
import ActivityToggleGroup from "@/components/forms/ActivityToggleGroup";
import EstimateBreakdownCard from "@/components/cards/EstimateBreakdownCard";
import Button from "@/components/ui/Button";

interface CostEstimatorFormProps {
  destinations: Destination[];
}

type EstimateResult = EstimateBreakdown & { destination: Destination };

export default function CostEstimatorForm({ destinations }: CostEstimatorFormProps) {
  const [destinationId, setDestinationId] = useState(destinations[0]?.id ?? "");
  const [transportation, setTransportation] =
    useState<EstimateRequest["transportation"]>("car");
  const [accommodation, setAccommodation] =
    useState<EstimateRequest["accommodation"]>("standard");
  const [foodBudget, setFoodBudget] = useState<EstimateRequest["foodBudget"]>("medium");
  const [travelDays, setTravelDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [activities, setActivities] = useState<string[]>([]);

  const [result, setResult] = useState<EstimateResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleActivity(activity: string) {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destinationId) {
      setError("Please select a destination.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const data = await submitEstimate({
        destinationId,
        transportation,
        accommodation,
        foodBudget,
        travelDays,
        travelers,
        activities,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate estimate.");
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
        <DestinationSelect
          destinations={destinations}
          value={destinationId}
          onChange={setDestinationId}
        />

        <OptionSelector
          name="transportation"
          legend="Transportation"
          options={TRANSPORTATION_OPTIONS}
          value={transportation}
          onChange={setTransportation}
        />

        <OptionSelector
          name="accommodation"
          legend="Accommodation"
          options={ACCOMMODATION_OPTIONS}
          value={accommodation}
          onChange={setAccommodation}
        />

        <OptionSelector
          name="foodBudget"
          legend="Food Budget"
          options={FOOD_BUDGET_OPTIONS}
          value={foodBudget}
          onChange={setFoodBudget}
        />

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="travelDays" className="text-sm font-medium text-foreground">
              Travel Days
            </label>
            <input
              id="travelDays"
              type="number"
              min={1}
              max={60}
              value={travelDays}
              onChange={(e) => setTravelDays(Number(e.target.value) || 1)}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label htmlFor="travelers" className="text-sm font-medium text-foreground">
              Number of Travelers
            </label>
            <input
              id="travelers"
              type="number"
              min={1}
              max={50}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value) || 1)}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <ActivityToggleGroup
          legend="Activities"
          options={ESTIMATE_ACTIVITY_OPTIONS}
          selected={activities}
          onToggle={toggleActivity}
        />

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? "Calculating..." : "Calculate Estimate"}
        </Button>
      </form>

      <div className="lg:col-span-1">
        {result ? (
          <EstimateBreakdownCard
            destinationName={result.destination.name}
            items={[
              { label: "Accommodation", value: result.accommodationCost },
              { label: "Transportation", value: result.transportationCost },
              { label: "Food", value: result.foodCost },
              { label: "Activities", value: result.activityCost },
            ]}
            grandTotal={result.grandTotal}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-surface p-8 text-center ring-1 ring-black/5">
            <p className="text-sm text-muted">
              Fill in the form and calculate to see your estimated trip cost
              breakdown here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
