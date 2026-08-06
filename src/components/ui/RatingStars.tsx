interface RatingStarsProps {
  rating: number;
  className?: string;
}

export default function RatingStars({ rating, className = "" }: RatingStarsProps) {
  const rounded = Math.round(rating * 2) / 2;
  const roundedLabel = rounded.toFixed(1);

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`Rated ${roundedLabel} out of 5`}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
      </svg>
      <span className="text-sm font-medium text-foreground">{roundedLabel}</span>
    </div>
  );
}
