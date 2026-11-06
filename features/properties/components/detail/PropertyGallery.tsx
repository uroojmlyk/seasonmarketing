"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faImages, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { GalleryImage } from "@/features/properties/lib/propertyDetail";

interface Props {
  images: GalleryImage[];
  purpose: string;
  promoted?: boolean;
}

export default function PropertyGallery({ images, purpose, promoted }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0); // lightbox index
  const [slide, setSlide] = useState(0); // mobile carousel index
  const trackRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const total = images.length;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Lightbox: keyboard + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  const badges = (
    <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2 sm:left-4 sm:top-4">
      <span className="rounded-full bg-ink/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
        {purpose}
      </span>
      {promoted && (
        <span className="rounded-full bg-brand-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
          Promoted
        </span>
      )}
    </div>
  );

  // desktop grid: kitne tiles dikhane hain
  const visible = total >= 5 ? 5 : total >= 3 ? 3 : total;
  const tiles = images.slice(0, visible);

  const tileClass = (i: number) => {
    if (visible === 1) return "col-span-4 row-span-2";
    if (visible === 2) return "col-span-2 row-span-2";
    if (i === 0) return "col-span-2 row-span-2";
    if (visible === 3) return "col-span-2 row-span-1";
    return "col-span-1 row-span-1";
  };

  return (
    <>
      {/* MOBILE: swipe carousel */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-200 md:hidden">
        {badges}
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Open photo ${i + 1} of ${total}`}
              className="relative aspect-[4/3] w-full shrink-0 snap-center"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center 45%" }}
              />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          <FontAwesomeIcon icon={faImages} className="!h-3 !w-3" />
          {slide + 1} / {total}
        </span>
      </div>

      {/* TABLET + DESKTOP: bento grid */}
      <div className="relative hidden h-[360px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl md:grid lg:h-[480px]">
        {badges}
        {tiles.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openAt(i)}
            aria-label={`Open photo ${i + 1} of ${total}: ${img.label}`}
            className={`group relative overflow-hidden bg-neutral-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-500/60 ${tileClass(i)}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes={i === 0 ? "(min-width: 1024px) 50vw, 60vw" : "(min-width: 1024px) 25vw, 30vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: "center 45%" }}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            {i === visible - 1 && (
              <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-lg">
                <FontAwesomeIcon icon={faImages} className="!h-3.5 !w-3.5" />
                {total > visible ? `View all ${total} photos` : `${total} photos`}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Property photos"
          className="fixed inset-0 z-[130] flex flex-col bg-black/95"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="text-sm font-semibold">
              {index + 1} / {total}
              <span className="ml-3 hidden font-normal text-white/70 sm:inline">{images[index].label}</span>
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close photos"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <FontAwesomeIcon icon={faXmark} className="!h-5 !w-5" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <Image
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-brand-500 sm:left-5"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="!h-4 !w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-brand-500 sm:right-5"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="!h-4 !w-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity sm:h-16 sm:w-24 ${
                  i === index ? "opacity-100 ring-2 ring-brand-500" : "opacity-50 hover:opacity-90"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}