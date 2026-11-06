// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";
// import { cities, allProperties } from "@/lib/constants/data"; // Yahan data.ts se cities import karein

// // Pehla shehar bara card (2x2), baqi chhote.
// const SPAN = ["lg:col-span-2 lg:row-span-2", "", "", "", ""];

// export default function CitiesSection() {
//   return (
//     <section className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <SectionHeading
//             eyebrow="Explore by city"
//             title="Browse properties in major cities"
//             subtitle="Pick a city to see homes for sale and rent, or open the map to explore locality by locality."
//             href="/map-search"
//             hrefLabel="Open map"
//           />
//         </Reveal>

//         <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:gap-5 lg:auto-rows-[250px] lg:grid-cols-4">
//           {cities.slice(0, 5).map((c, i) => {
//             const big = i === 0;
            
//             // Data se automatically counts nikaal lein
//             const buyCount = allProperties.filter(p => p.city === c.slug && p.intent === "buy").length;
//             const rentCount = allProperties.filter(p => p.city === c.slug && p.intent === "rent").length;

//             return (
//               <Reveal key={c.slug} delay={i * 70} className={`${SPAN[i] ?? ""} ${big ? "col-span-2" : ""}`}>
//                 <div className="group relative h-full overflow-hidden rounded-2xl bg-neutral-200">
                  
//                   {/* Image - fallback ke sath */}
//                   <Image
//                     src={c.image || "/images/lahore.jpg"} // Agar image khali ho toh fallback
//                     alt={`${c.name} skyline`}
//                     fill
//                     sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
                  
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:from-black/90" />

//                   {/* Poora card Buy listings par le jata hai */}
//                   <Link
//                     href={`/properties?city=${c.slug}&intent=buy`}
//                     aria-label={`Properties for sale in ${c.name}`}
//                     className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/60"
//                   />

//                   <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
//                     <div className="mt-1 flex items-end justify-between gap-3">
//                       <div>
//                         <h3 className={`font-display font-extrabold text-white ${big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
//                           {c.name}
//                         </h3>
//                         <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
//                           {buyCount} for sale &middot; {rentCount} for rent
//                         </p>
//                       </div>
//                       <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-ink transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white">
//                         <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
//                       </span>
//                     </div>

//                     {/* Quick links */}
//                     <div className="pointer-events-auto relative z-30 mt-3 hidden gap-2 sm:flex">
//                       <Link
//                         href={`/properties?city=${c.slug}&intent=rent`}
//                         className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
//                       >
//                         Rent
//                       </Link>
//                       <Link
//                         href={`/map-search?city=${c.slug}`}
//                         className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
//                       >
//                         <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3" />
//                         Map
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }





import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
// home.ts ke cities: sahi image paths (/images/lahore.jpg ...) aur live counts
import { cities } from "@/lib/constants/home";

const FOCUS: Record<string, string> = {
  lahore: "center 30%",
  karachi: "center 40%",
  islamabad: "center 55%",
  peshawar: "center 40%",
  quetta: "center 35%",
};

// Sirf wohi cities jin ki image aur listings maujood hain
const shown = cities.filter((c) => c.image && c.buyCount + c.rentCount > 0).slice(0, 5);

export default function CitiesSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Explore by city"
            title="Browse properties in major cities"
            subtitle="Pick a city to see homes for sale and rent, or open the map to explore locality by locality."
            href="/map-search"
            hrefLabel="Open map"
          />
        </Reveal>

        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-5 lg:auto-rows-[250px] lg:grid-cols-4">
          {shown.map((c, i) => {
            const big = i === 0;
            return (
              <Reveal key={c.slug} delay={i * 60} className={big ? "col-span-2 lg:row-span-2" : ""}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-neutral-200 sm:rounded-3xl">
                  <Image
                    src={c.image}
                    alt={`${c.name} city view`}
                    fill
                    priority={false}
                    sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    style={{ objectPosition: FOCUS[c.slug] ?? "center" }}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <Link
                    href={`/properties?city=${c.slug}&intent=buy`}
                    aria-label={`Properties for sale in ${c.name}`}
                    className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-500/70"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3.5 sm:p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className={`font-display font-extrabold leading-tight text-white ${big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
                          {c.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-neutral-300 sm:text-sm">
                          {c.buyCount} for sale &middot; {c.rentCount} for rent
                        </p>
                        {c.startingPrice && big && (
                          <p className="mt-1 text-xs font-semibold text-brand-300">Starting from {c.startingPrice}</p>
                        )}
                      </div>
                      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white sm:flex">
                        <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <div className="pointer-events-auto relative z-30 mt-2.5 flex gap-2">
                      <Link
                        href={`/properties?city=${c.slug}&intent=rent`}
                        className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
                      >
                        Rent
                      </Link>
                      <Link
                        href={`/map-search?city=${c.slug}`}
                        className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
                      >
                        <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3" />
                        Map
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}