import { Coordinates } from "@/types/destination";

interface MapPlaceholderProps {
  coordinates: Coordinates;
  name: string;
}

export default function MapPlaceholder({ coordinates, name }: MapPlaceholderProps) {
  return (
    <div
      className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-black/5"
      aria-label={`Map location placeholder for ${name}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#cbd5e1_1px,_transparent_0)] [background-size:16px_16px] opacity-60" />
      <div className="relative flex flex-col items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
            fill="#0ea5a3"
          />
          <circle cx="12" cy="9.5" r="2.5" fill="white" />
        </svg>
        <p className="text-sm font-medium text-muted">
          {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
        </p>
        <p className="text-xs text-muted">Map integration coming soon</p>
      </div>
    </div>
  );
}
