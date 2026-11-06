"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamondTurnRight, faLocationDot, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

interface Props {
  lat?: number;
  lng?: number;
  location: string;
  title: string;
}

// Map tab load hota hai jab user us tak scroll kare: page fast rehta hai
export default function LocationMap({ lat, lng, location, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasPin = typeof lat === "number" && typeof lng === "number";
  const src = hasPin
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng! - 0.012}%2C${lat! - 0.007}%2C${lng! + 0.012}%2C${lat! + 0.007}&layer=mapnik&marker=${lat}%2C${lng}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=13&output=embed`;
  const q = hasPin ? `${lat},${lng}` : encodeURIComponent(location);

  return (
    <div>
      <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[16/9]">
        {load ? (
          <iframe
            src={src}
            title={`Map showing ${title}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="bg-grid absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink text-white/80">
            <FontAwesomeIcon icon={faMapLocationDot} className="!h-8 !w-8 text-brand-500" />
            <p className="text-sm font-medium">Loading map...</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm text-neutral-600">
          <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 !h-4 !w-4 shrink-0 text-brand-500" />
          {location}
        </p>
        <div className="flex gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-xs font-bold text-ink ring-1 ring-neutral-200 transition-colors hover:bg-neutral-100"
          >
            Open in Google Maps
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 text-xs font-bold text-white transition-colors hover:bg-brand-600"
          >
            <FontAwesomeIcon icon={faDiamondTurnRight} className="!h-3 !w-3" /> Directions
          </a>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-neutral-500">
        The pin shows the approximate area of this listing. The exact address is shared by the advertiser when you enquire.
      </p>
    </div>
  );
}