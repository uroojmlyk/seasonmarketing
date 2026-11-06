"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faHeart,
  faLocationDot,
  faRulerCombined,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import type { Property } from "@/lib/constants/data";

export default function PropertyCard({ item }: { item: Property }) {
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <div className="absolute inset-0" style={{ transform: item.imageTransform }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectPosition: item.imageFocus }}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-md bg-ink/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {item.purpose}
          </span>
          {item.promoted && (
            <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              Promoted
            </span>
          )}
        </div>

        {/* Right Side Icons (Heart + Map) */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110"
          >
            <FontAwesomeIcon icon={faHeart} className={`h-4 w-4 ${saved ? "text-red-500" : "text-neutral-400"}`} />
          </button>
          
          {/* Map Icon Button - UPDATED: Passes slug to URL */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault(); 
              router.push(`/map-search?property=${item.slug}`);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 hover:text-brand-500"
            title="View on map"
          >
            <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
          </button>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10">
          <p className="font-display text-xl font-extrabold text-white">{item.price}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/properties/${item.slug}`}>
          <h3 className="line-clamp-1 text-base font-bold text-ink transition-colors group-hover:text-brand-600">
            {item.title}
          </h3>
        </Link>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-500">
          <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-brand-500" />
          <span className="line-clamp-1">{item.location}</span>
        </p>

        {/* Key Facts */}
        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-4 text-sm font-medium text-neutral-600">
          {item.beds !== undefined && item.beds > 0 && (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faBed} className="h-4 w-4 text-neutral-400" />
              {item.beds} <span className="hidden sm:inline">Beds</span>
            </span>
          )}
          {item.baths !== undefined && item.baths > 0 && (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faBath} className="h-4 w-4 text-neutral-400" />
              {item.baths} <span className="hidden sm:inline">Baths</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faRulerCombined} className="h-4 w-4 text-neutral-400" />
            {item.area}
          </span>
        </div>
      </div>
    </article>
  );
}