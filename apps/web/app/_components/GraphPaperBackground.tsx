import { BORDER } from "./themes";

export function GraphPaperBackground({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle, ${BORDER} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    />
  );
}