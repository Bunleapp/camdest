import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className = "", ...props },
  ref
) {
  const textareaId = id ?? props.name;

  return (
    <div className="w-full">
      <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
        {label}
        {props.required && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>
      <textarea
        id={textareaId}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 ${
          error ? "border-red-400" : "border-black/10"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Textarea;
