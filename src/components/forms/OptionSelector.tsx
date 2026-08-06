interface OptionSelectorProps<T extends string> {
  legend: string;
  options: { value: T; label: string; description: string }[];
  value: T;
  onChange: (value: T) => void;
  name: string;
}

export default function OptionSelector<T extends string>({
  legend,
  options,
  value,
  onChange,
  name,
}: OptionSelectorProps<T>) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-xl border p-3 text-sm transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-black/10 hover:bg-black/5"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="block font-medium text-foreground">{option.label}</span>
              <span className="block text-xs text-muted">{option.description}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
