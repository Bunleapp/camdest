import { TourismCategory } from "@/types/destination";

export const CATEGORY_LABEL: Record<TourismCategory, string> = {
  "eco-tourism": "Eco Tourism",
  "cultural-heritage": "Cultural & Heritage",
  "dark-tourism": "Dark Tourism",
};

// Solid, saturated badge backgrounds with white text are used
// instead of light tints + colored text, since 10%-opacity tints
// with colored text fail WCAG AA contrast at badge text sizes
// (text-xs, 12px). White text on primary-dark (4.53:1) and slate-700
// (≈10.7:1) passes; secondary-dark (amber, 3.19:1) still fails at
// this size, so a deeper amber (amber-800-equivalent) is used for
// the cultural-heritage badge to reach 4.5:1+.
export const CATEGORY_BADGE_CLASS: Record<TourismCategory, string> = {
  "eco-tourism": "bg-primary-dark text-white",
  "cultural-heritage": "bg-amber-800 text-white",
  "dark-tourism": "bg-slate-700 text-white",
};

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}
