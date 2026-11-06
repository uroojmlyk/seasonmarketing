"use client";

import { useRef, type ReactNode } from "react";

export default function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full transition-transform duration-200 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}