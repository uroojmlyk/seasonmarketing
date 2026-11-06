"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

// A card with a soft light that follows the cursor. Optional gentle 3D tilt.
// Pass href to make the whole card a link.
export default function SpotlightCard({
  children,
  className = "",
  href,
  tilt = false,
  spot,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  tilt?: boolean;
  spot?: string; // e.g. "rgba(255,255,255,0.12)"
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      const px = x / r.width - 0.5;
      const py = y / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 6}deg) translateZ(0)`;
    }
  };

  const onLeave = () => {
    if (ref.current && tilt) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={spot ? ({ "--spot": spot } as React.CSSProperties) : undefined}
      className={`spotlight group relative overflow-hidden transition-[transform,box-shadow,border-color] duration-300 focus-within:ring-4 focus-within:ring-brand-500/30 ${className}`}
    >
      {href ? (
        <Link href={href} className="block h-full focus-visible:outline-none">
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  );
}