export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type TourismCategory =
  | "eco-tourism"
  | "cultural-heritage"
  | "dark-tourism";

export interface Destination {
  id: string;
  name: string;
  province: string;
  category: TourismCategory;
  price: number;
  rating: number;
  description: string;
  activities: string[];
  images: string[];
  coordinates: Coordinates;
  openingHours: string;
  reviews: Review[];
  nearbyAttractions: string[];
  familyFriendly: boolean;
  popularity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface RecommendationCriteria {
  budget: number;
  activities: string[];
  province?: string;
  travelDuration: number;
  travelerType: "family" | "couple" | "solo" | "adventure" | "beach" | "culture";
  category?: TourismCategory;
}

export interface Recommendation {
  destination: Destination;
  estimatedBudget: number;
  reasons: string[];
}

export interface EstimateRequest {
  destinationId: string;
  transportation: "car" | "bus" | "train" | "flight";
  accommodation: "budget" | "standard" | "luxury";
  foodBudget: "low" | "medium" | "high";
  travelDays: number;
  travelers: number;
  activities: string[];
}

export interface EstimateBreakdown {
  accommodationCost: number;
  transportationCost: number;
  foodCost: number;
  activityCost: number;
  grandTotal: number;
}
