import { Destination } from "@/types/destination";

interface DestinationSelectProps {
  destinations: Destination[];
  value: string;
  onChange: (id: string) => void;
}

export default function DestinationSelect({
  destinations,
  value,
  onChange,
}: DestinationSelectProps) {
  return (
    <div>
      <label htmlFor="destination" className="text-sm font-medium text-foreground">
        Destination
      </label>
      <select
        id="destination"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name} — {destination.province}
          </option>
        ))}
      </select>
    </div>
  );
}
