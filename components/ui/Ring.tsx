// Anel decorativo grosso que flutua devagar (animado em components/motion/ScrollScenes.tsx).
const tones = {
  light: "border-white/55 dark:border-white/[.04]",
  brand: "border-brand-600/12",
  soft: "border-brand-200/40 dark:border-brand-400/[.06]",
};

type Props = { size: number; thickness?: number; tone?: keyof typeof tones; className?: string };

export function Ring({ size, thickness = Math.round(size * 0.14), tone = "light", className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      data-float-ring
      className={`pointer-events-none absolute rounded-full ${tones[tone]} ${className}`}
      style={{ width: size, height: size, borderWidth: thickness }}
    />
  );
}
