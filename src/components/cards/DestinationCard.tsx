import Link from "next/link";
import { Destination } from "@/types/destination";
import DestinationImage from "@/components/ui/DestinationImage";
import RatingStars from "@/components/ui/RatingStars";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_LABEL,
  formatPrice,
} from "@/utils/destination-display";

interface DestinationCardProps {
  destination: Destination;
  priority?: boolean;
}

export default function DestinationCard({
  destination,
  priority = false,
}: DestinationCardProps) {
  return (
    // labeling the parent <Link> as a group, any child element inside the card
    // can react when the user hovers over the parent. 
    // hovering anywehre on the card, image zoomed in and change the color of 
    // "view details" text simultaneously
    <Link
      href={`/destinations/${destination.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <DestinationImage
          src={destination.images[0]}
          alt={destination.name}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_BADGE_CLASS[destination.category]}`}
        >
          {CATEGORY_LABEL[destination.category]}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {destination.name}
          </h3>
          <RatingStars rating={destination.rating} />
        </div>

        <p className="mt-1 text-sm text-muted">{destination.province}</p>

        <p className="mt-2 text-sm text-muted line-clamp-2">
          {destination.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-bold text-primary-dark">
            {formatPrice(destination.price)}
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-primary-dark transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
