import Link from "next/link";
import { cities } from "@/lib/constants/data";

// Sirf 5 target cities aur unke top localities
const CITY_LOCALITIES: Record<string, string[]> = {
  lahore: ["DHA Phase 6", "Gulberg", "Bahria Town", "Johar Town"],
  karachi: ["Clifton", "DHA Phase 8", "Gulshan-e-Iqbal", "PECHS"],
  islamabad: ["F-10", "E-11", "DHA Phase 2", "G-11"],
  peshawar: ["Hayatabad", "University Town", "Saddar"],
  quetta: ["Jinnah Town", "Samungli Road"],
};

// Items generate karein: Har city aur uske top 2 localities
const items = cities
  .filter((c) => CITY_LOCALITIES[c.slug])
  .flatMap((c) => {
    const localities = CITY_LOCALITIES[c.slug].slice(0, 2); // Sirf top 2 areas
    return [
      { label: c.name, href: `/properties?city=${c.slug}&intent=buy`, strong: true },
      ...localities.map((l) => ({
        label: `${l}, ${c.name}`,
        href: `/properties?city=${c.slug}&locality=${encodeURIComponent(l)}&intent=buy`,
        strong: false,
      })),
    ];
  });

export default function MarqueeStrip() {
  return (
    <section aria-label="Popular locations" className="relative overflow-hidden border-y border-white/10 bg-ink py-5">
      
      {/* Gradient Masks for smooth fade on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-8 px-4">
            {items.map((it) => (
              <li key={`${copy}-${it.label}`}>
                <Link
                  href={it.href}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className={`group inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
                    it.strong
                      ? "text-brand-400 hover:text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {/* Dot indicator for strong items */}
                  {it.strong && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500 group-hover:bg-white transition-colors" />
                  )}
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}