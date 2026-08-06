import Link from "next/link";
import { Destination } from "@/types/destination";
import DestinationImage from "@/components/ui/DestinationImage";
import { CATEGORY_LABEL, formatPrice } from "@/utils/destination-display";

interface SearchResultItemProps {
  destination: Destination;
  onSelect?: () => void;
}

export default function SearchResultItem({
  destination,
  onSelect,
}: SearchResultItemProps) {
  return (
    <Link
      href={`/destinations/${destination.id}`}
      onClick={onSelect}
      className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-black/5"
    >
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
        <DestinationImage src={destination.images[0]} alt={destination.name} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {destination.name}
        </p>
        <p className="truncate text-xs text-muted">
          {destination.province} · {CATEGORY_LABEL[destination.category]}
        </p>
      </div>
      <span className="flex-shrink-0 text-sm font-semibold text-primary-dark">
        {formatPrice(destination.price)}
      </span>
    </Link>
  );
}
