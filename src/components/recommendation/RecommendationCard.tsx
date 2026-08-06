import { Recommendation } from "@/types/destination";
import DestinationImage from "@/components/ui/DestinationImage";
import { CATEGORY_LABEL, formatPrice } from "@/utils/destination-display";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const { destination, estimatedBudget, reasons } = recommendation;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative h-40 w-full">
        <DestinationImage src={destination.images[0]} alt={destination.name} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          {CATEGORY_LABEL[destination.category]}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-foreground">
          {destination.name}
        </h3>
        <p className="text-sm text-muted">{destination.province}</p>

        <ul className="mt-3 space-y-1.5">
          {reasons.slice(0, 2).map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {reason}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
          <span className="text-sm text-muted">Est. Budget</span>
          <span className="font-bold text-primary-dark">
            {formatPrice(estimatedBudget)}
          </span>
        </div>
      </div>
    </div>
  );
}
