import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost-dark" | "soft" | "white";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-[0_8px_20px_rgba(39,81,197,.25)] hover:bg-brand-700",
  secondary: "bg-surface text-strong border border-line hover:border-brand-600 hover:text-brand-600",
  "ghost-dark": "text-white border border-white/25 hover:bg-white/10",
  white: "bg-white text-brand-600 shadow-[0_6px_16px_-6px_rgba(0,0,0,.45)] hover:bg-brand-50",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[15px]",
  md: "px-5 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; external?: boolean; arrow?: boolean };

export function Button({ variant = "primary", size = "md", external, arrow, className = "", children, ...props }: Props) {
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <ArrowUpRightIcon className="size-4" strokeWidth={2.2} aria-hidden="true" />}
    </a>
  );
}
