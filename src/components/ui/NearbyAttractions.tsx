import Link from "next/link";

interface NearbyAttractionsProps {
  attractions: string[];
}

export default function NearbyAttractions({ attractions }: NearbyAttractionsProps) {
  if (attractions.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {attractions.map((attraction) => (
        <li key={attraction}>
          <Link
            href={`/destinations?q=${encodeURIComponent(attraction)}`}
            className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-colors hover:text-primary-dark"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 18s6-5.5 6-10a6 6 0 0 0-12 0c0 4.5 6 10 6 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {attraction}
          </Link>
        </li>
      ))}
    </ul>
  );
}
