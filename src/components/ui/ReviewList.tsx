import { Review } from "@/types/destination";
import RatingStars from "@/components/ui/RatingStars";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted">
        No reviews yet. Be the first to share your experience.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">{review.author}</span>
            <RatingStars rating={review.rating} />
          </div>
          <p className="mt-2 text-sm text-muted">{review.comment}</p>
          <p className="mt-2 text-xs text-muted">{review.date}</p>
        </li>
      ))}
    </ul>
  );
}
