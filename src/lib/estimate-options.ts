import { EstimateRequest } from "@/types/destination";

export const TRANSPORTATION_OPTIONS: {
  value: EstimateRequest["transportation"];
  label: string;
  description: string;
}[] = [
  { value: "bus", label: "Bus", description: "Budget-friendly, shared transport" },
  { value: "car", label: "Private Car", description: "Comfortable, flexible schedule" },
  { value: "train", label: "Train", description: "Scenic and relaxed" },
  { value: "flight", label: "Flight", description: "Fastest for long distances" },
];

export const ACCOMMODATION_OPTIONS: {
  value: EstimateRequest["accommodation"];
  label: string;
  description: string;
}[] = [
  { value: "budget", label: "Budget", description: "Guesthouses & hostels" },
  { value: "standard", label: "Standard", description: "3-star hotels" },
  { value: "luxury", label: "Luxury", description: "5-star resorts" },
];

export const FOOD_BUDGET_OPTIONS: {
  value: EstimateRequest["foodBudget"];
  label: string;
  description: string;
}[] = [
  { value: "low", label: "Low", description: "Street food & local eateries" },
  { value: "medium", label: "Medium", description: "Mix of local & restaurants" },
  { value: "high", label: "High", description: "Fine dining experiences" },
];

export const ESTIMATE_ACTIVITY_OPTIONS = [
  "Guided Tour",
  "Photography",
  "Wildlife Watching",
  "Jungle Trekking",
  "Snorkeling",
  "Temple Exploration",
  "Historical Education",
  "Boat Tour",
  "Cycling",
  "Camping",
];
