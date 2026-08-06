interface ActivityToggleGroupProps {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (activity: string) => void;
}

export default function ActivityToggleGroup({
  legend,
  options,
  selected,
  onToggle,
}: ActivityToggleGroupProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((activity) => {
          const isSelected = selected.includes(activity);
          return (
            <button
              key={activity}
              type="button"
              onClick={() => onToggle(activity)}
              aria-pressed={isSelected}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-primary-dark text-white"
                  : "bg-black/5 text-foreground hover:bg-black/10"
              }`}
            >
              {activity}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
