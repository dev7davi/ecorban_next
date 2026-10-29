import type { ReactNode } from "react";

// Janela do sistema: chrome escuro no topo e menu lateral, área clara de trabalho.
export function AppWindow({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden rounded-xl bg-chrome shadow-[0_24px_60px_-16px_rgba(17,24,39,.35)] ring-1 ring-black/5 ${className}`}>
      <div className="flex items-center gap-2 border-b border-neutral-800 px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-pipe-pendencia" />
        <span className="size-2 rounded-full bg-pipe-digitada" />
        <span className="size-2 rounded-full bg-pipe-averbado" />
        <span className="ml-2 text-[11px] text-neutral-400">{title}</span>
      </div>
      <div className="flex">
        <div className="hidden w-10 shrink-0 flex-col items-center gap-3 bg-chrome py-3 sm:flex">
          <span className="size-5 rounded-md bg-brand-600" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="size-4 rounded bg-neutral-700" />
          ))}
        </div>
        <div className="min-w-0 flex-1 bg-neutral-100 p-3 sm:p-4 dark:bg-neutral-800">{children}</div>
      </div>
    </div>
  );
}

export function StatusPill({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap" style={{ color, background: `${color}1f` }}>
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
