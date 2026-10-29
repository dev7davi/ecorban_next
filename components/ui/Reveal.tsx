import type { ReactNode } from "react";

// Marca o bloco para a entrada suave em lote (ver components/motion/ScrollScenes.tsx).
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
