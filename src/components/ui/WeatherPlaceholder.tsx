interface WeatherPlaceholderProps {
  province: string;
}

export default function WeatherPlaceholder({ province }: WeatherPlaceholderProps) {
  return (
    <div className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-100 to-primary/10 ring-1 ring-black/5">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="10" r="5" fill="#f59e0b" />
        <path
          d="M8 17h9a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.5-1.5A4.5 4.5 0 0 0 8 17Z"
          fill="#94a3b8"
        />
      </svg>
      <p className="text-2xl font-bold text-foreground">28°C</p>
      <p className="text-sm text-muted">Typical weather in {province}</p>
      <p className="text-xs text-muted">Live weather data coming soon</p>
    </div>
  );
}
