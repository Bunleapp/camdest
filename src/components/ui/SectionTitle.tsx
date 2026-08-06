import { HTMLAttributes } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  ...props
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`} {...props}>
      {eyebrow && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary-dark mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted text-base sm:text-lg">{description}</p>
      )}
    </div>
  );
}
