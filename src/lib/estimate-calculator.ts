import { Destination, EstimateBreakdown, EstimateRequest } from "@/types/destination";

const TRANSPORTATION_RATES: Record<EstimateRequest["transportation"], number> = {
  car: 25,
  bus: 8,
  train: 12,
  flight: 120,
};

const ACCOMMODATION_RATES: Record<EstimateRequest["accommodation"], number> = {
  budget: 10,
  standard: 30,
  luxury: 100,
};

const FOOD_RATES: Record<EstimateRequest["foodBudget"], number> = {
  low: 8,
  medium: 18,
  high: 40,
};

const ACTIVITY_RATE_PER_ACTIVITY = 12;

export function calculateEstimate(
  request: EstimateRequest,
  destination: Destination
): EstimateBreakdown {
  const travelers = Math.max(1, request.travelers);
  const days = Math.max(1, request.travelDays);

  const transportationCost =
    TRANSPORTATION_RATES[request.transportation] * travelers;

  const accommodationCost =
    ACCOMMODATION_RATES[request.accommodation] * days;

  const foodCost = FOOD_RATES[request.foodBudget] * days * travelers;

  const activityCost =
    (request.activities.length > 0
      ? request.activities.length * ACTIVITY_RATE_PER_ACTIVITY
      : 0) *
    travelers +
    destination.price * travelers;

  const grandTotal =
    transportationCost + accommodationCost + foodCost + activityCost;

  return {
    accommodationCost,
    transportationCost,
    foodCost,
    activityCost,
    grandTotal,
  };
}
