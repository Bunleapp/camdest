import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "outlineOnDark" | "ghost";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<Variant, string> = {
  // Uses primary-dark as the resting background (not the lighter
  // primary teal) so white button text meets WCAG AA contrast
  // (4.53:1) at normal button text sizes.
  primary:
    "bg-primary-dark text-white hover:bg-primary shadow-sm hover:shadow-md",
  // Amber does not reach 4.5:1 with white text at any usable shade,
  // so dark foreground text is used instead (≈8.5:1, passes AA).
  secondary:
    "bg-secondary text-foreground hover:bg-secondary-dark hover:text-white shadow-sm hover:shadow-md",
  outline:
    "border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white",
  // For use on dark/photo backgrounds (e.g. Hero, CTASection) where
  // a light outline + light text is needed instead of the default
  // dark-on-light outline styling.
  outlineOnDark:
    "border border-white text-white hover:bg-white hover:text-slate-900",
  ghost: "text-foreground hover:bg-black/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
