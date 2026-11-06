// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPause, faPlay, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
// import HeroSearch from "@/features/search/components/HeroSearch";
// import { popularSearches } from "@/lib/constants/home";

// const HERO_IMAGES = [
//   "/images/islamabadhero1.jpg",
//   "/images/islamabadhero.jpg",
//   "/images/islamabad.jpg",
// ];

// const SLIDE_MS = 6000;

// export default function HeroSection() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     if (paused) return;
//     const timer = setInterval(() => {
//       if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
//       setCurrentImage((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
//     }, SLIDE_MS);
//     return () => clearInterval(timer);
//   }, [paused]);

//   return (
//     <section className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink pt-20 pb-16">
      
//       {/* Background Images */}
//       {HERO_IMAGES.map((src, index) => (
//         <div
//           key={src}
//           aria-hidden="true"
//           className={`absolute inset-0 -z-20 transition-opacity duration-1000 ease-in-out ${
//             index === currentImage ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Image
//             src={src}
//             alt=""
//             fill
//             priority={index === 0}
//             sizes="100vw"
//             className="animate-kenburns object-cover object-center"
//           />
//         </div>
//       ))}

//       {/* Simple, Clean Overlay */}
//       <div className="absolute inset-0 -z-10 bg-black/60 sm:bg-black/50" />
//       <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-transparent" />

//       {/* Main Content Container */}
//       <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col items-center text-center">
          
//           {/* Trust Badge */}
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
//             <FontAwesomeIcon icon={faShieldHalved} className="h-3.5 w-3.5 text-brand-400" />
//             Pakistan's Trusted Property Portal
//           </div>

//           {/* Headline */}
//           <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
//             <span className="sr-only">Find your next property anywhere in Pakistan</span>
//             <span aria-hidden="true">
//               Find your next{" "}
//               <span className="word-rotator text-brand-400">
//                 <span className="word-rotator__inner">
//                   <span>home</span>
//                   <span>plot</span>
//                   <span>shop</span>
//                   <span>office</span>
//                   <span>home</span>
//                 </span>
//               </span>
//               <br className="hidden sm:block" />
//               anywhere in Pakistan
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="mt-5 max-w-2xl text-base text-neutral-300 sm:text-lg">
//             Houses, flats, plots and commercial spaces to buy or rent, with every listing clearly labelled and a live map to explore each locality.
//           </p>

//           {/* Search Bar */}
//           <div className="mt-8 w-full max-w-4xl">
//             <HeroSearch />
//           </div>

//           {/* Popular Searches (Compact) */}
//           <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
//             <span className="font-semibold text-white/60">Popular:</span>
//             {popularSearches.map((s) => (
//               <Link
//                 key={s.label}
//                 href={s.href}
//                 className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-medium text-white/80 backdrop-blur transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
//               >
//                 {s.label}
//               </Link>
//             ))}
//           </div>

//         </div>
//       </div>

//       {/* Pause Button (Bottom Right) */}
//       <button
//         type="button"
//         onClick={() => setPaused((p) => !p)}
//         aria-label={paused ? "Play background slideshow" : "Pause background slideshow"}
//         className="absolute bottom-6 right-6 hidden h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 sm:flex"
//       >
//         <FontAwesomeIcon icon={paused ? faPlay : faPause} className="h-3 w-3" />
//       </button>

//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import HeroSearch from "@/features/search/components/HeroSearch";

const HERO_IMAGES = [
  "/images/islamabadhero1.jpg",
  "/images/islamabadhero.jpg",
  "/images/islamabad.jpg",
];

const SLIDE_MS = 6000;

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setCurrentImage((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink pt-20 pb-16">
      
      {/* Background Images */}
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          aria-hidden="true"
          className={`absolute inset-0 -z-20 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="animate-kenburns object-cover object-center"
          />
        </div>
      ))}

      {/* Simple, Clean Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60 sm:bg-black/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-transparent" />

      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Trust Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
            <FontAwesomeIcon icon={faShieldHalved} className="h-3.5 w-3.5 text-brand-400" />
            Pakistan's Trusted Property Portal
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="sr-only">Find your next property anywhere in Pakistan</span>
            <span aria-hidden="true">
              Find your next{" "}
              <span className="word-rotator text-brand-400">
                <span className="word-rotator__inner">
                  <span>home</span>
                  <span>plot</span>
                  <span>shop</span>
                  <span>office</span>
                  <span>home</span>
                </span>
              </span>
              <br className="hidden sm:block" />
              anywhere in Pakistan
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-base text-neutral-300 sm:text-lg">
            Houses, flats, plots and commercial spaces to buy or rent, with every listing clearly labelled and a live map to explore each locality.
          </p>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-4xl">
            <HeroSearch />
          </div>

        </div>
      </div>

      {/* Pause Button (Bottom Right) */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play background slideshow" : "Pause background slideshow"}
        className="absolute bottom-6 right-6 hidden h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 sm:flex"
      >
        <FontAwesomeIcon icon={paused ? faPlay : faPause} className="h-3 w-3" />
      </button>

    </section>
  );
}