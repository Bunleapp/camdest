import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className = "", ...props },
  ref
) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
        {label}
        {props.required && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>
      <input
        id={inputId}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 ${
          error ? "border-red-400" : "border-black/10"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
