import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, children, className = "" }: { eyebrow?: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && <div className="mb-3 text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-300">{eyebrow}</div>}
      <h2 data-split className="text-[clamp(30px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-strong">{title}</h2>
      {children && <p className="mt-4 text-lg text-pretty text-muted">{children}</p>}
    </div>
  );
}
