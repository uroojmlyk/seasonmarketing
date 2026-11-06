


// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";
// import PropertyCard from "@/features/properties/components/PropertyCard";
// import { allProperties } from "@/lib/constants/data";
// import type { Property } from "@/lib/constants/data";
// import { pickDiverse } from "@/lib/constants/home";

// type Tab = "buy" | "rent";

// const daysAgo = (p: Property) => Number(p.updated.match(/\d+/)?.[0] ?? 9);

// function build(intent: Tab) {
//   const list = allProperties.filter((p) => p.intent === intent);
//   const featured = pickDiverse(list.filter((p) => p.promoted), 6);
//   const used = new Set(featured.map((p) => p.slug));
//   const fresh = pickDiverse(
//     list.filter((p) => !used.has(p.slug)).sort((a, b) => daysAgo(a) - daysAgo(b)),
//     6
//   );
//   return { featured, fresh, total: list.length };
// }

// // Ek dafa module load par bana lete hain
// const DATA: Record<Tab, ReturnType<typeof build>> = { buy: build("buy"), rent: build("rent") };

// export default function FeaturedSection() {
//   const [tab, setTab] = useState<Tab>("buy");
//   const { featured, fresh, total } = DATA[tab];

//   return (
//     <>
//       {/* Featured (paid) listings, hamesha labelled */}
//       <section className="bg-white py-20 sm:py-28">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <Reveal>
//             <SectionHeading
//               eyebrow="Featured"
//               title="Featured properties"
//               subtitle="Paid placements are marked Promoted. Every listing shows when it was last updated."
//               href={`/properties?intent=${tab}&promoted=1`}
//               hrefLabel="View featured"
//             />
//           </Reveal>

//           <div role="tablist" aria-label="Buy or rent" className="mb-8 inline-flex rounded-full bg-neutral-100 p-1">
//             {(["buy", "rent"] as const).map((t) => (
//               <button
//                 key={t}
//                 role="tab"
//                 aria-selected={tab === t}
//                 onClick={() => setTab(t)}
//                 className={`rounded-full px-6 py-2 text-sm font-bold transition ${
//                   tab === t ? "bg-ink text-white shadow" : "text-neutral-600 hover:text-ink"
//                 }`}
//               >
//                 {t === "buy" ? "For Sale" : "For Rent"}
//               </button>
//             ))}
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {featured.map((p) => (
//               <PropertyCard key={p.slug} item={p} />
//             ))}
//           </div>

//           <div className="mt-10 flex justify-center">
//             <Link
//               href={`/properties?intent=${tab}`}
//               className="group inline-flex h-12 items-center gap-2 rounded-full border border-neutral-300 px-7 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-white"
//             >
//               Browse all {total} {tab === "buy" ? "properties for sale" : "rentals"}
//               <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Recently added: compact list, map par khulti hai */}
//       <section className="bg-neutral-50 py-20">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <Reveal>
//             <SectionHeading
//               eyebrow="Recently added"
//               title="New on Season Marketing"
//               subtitle="The freshest listings from every city. Tap one to see it on the map."
//               href={`/properties?intent=${tab}&sort=newest`}
//               hrefLabel="View all new listings"
//             />
//           </Reveal>

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {fresh.map((p) => (
//               <Link
//                 key={p.slug}
//                 href={`/map-search?property=${p.slug}`}
//                 className="group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
//               >
//                 <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-200 sm:h-28 sm:w-32">
//                   <div className="absolute inset-0" style={{ transform: p.imageTransform }}>
//                     <Image
//                       src={p.image}
//                       alt={p.title}
//                       fill
//                       sizes="128px"
//                       style={{ objectPosition: p.imageFocus }}
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
//                   <div>
//                     <p className="font-display text-base font-extrabold text-brand-600">{p.price}</p>
//                     <h3 className="mt-0.5 line-clamp-1 text-sm font-bold text-ink group-hover:text-brand-600">{p.title}</h3>
//                     <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
//                       <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 shrink-0 text-brand-500" />
//                       <span className="line-clamp-1">{p.location}</span>
//                     </p>
//                   </div>
//                   <p className="text-[11px] font-semibold text-neutral-400">{p.updated}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyCard from "@/features/properties/components/PropertyCard";
import { allProperties } from "@/lib/constants/data";
import type { Property } from "@/lib/constants/data";
import { pickDiverse } from "@/lib/constants/home";

type Tab = "buy" | "rent";

// imageFocus / imageTransform optional hain, is liye safe access
type WithImgStyle = Property & { imageFocus?: string; imageTransform?: string };
const focusOf = (p: Property) => (p as WithImgStyle).imageFocus ?? "center 45%";
const transformOf = (p: Property) => (p as WithImgStyle).imageTransform;

const daysAgo = (p: Property) => Number(p.updated.match(/\d+/)?.[0] ?? 9);

function build(intent: Tab) {
  const list = allProperties.filter((p) => p.intent === intent);
  const featured = pickDiverse(list.filter((p) => p.promoted), 6);
  const used = new Set(featured.map((p) => p.slug));
  const fresh = pickDiverse(
    list.filter((p) => !used.has(p.slug)).sort((a, b) => daysAgo(a) - daysAgo(b)),
    6
  );
  return { featured, fresh, total: list.length };
}

const DATA: Record<Tab, ReturnType<typeof build>> = { buy: build("buy"), rent: build("rent") };

export default function FeaturedSection() {
  const [tab, setTab] = useState<Tab>("buy");
  const { featured, fresh, total } = DATA[tab];

  return (
    <>
      {/* Featured (paid) listings, hamesha labelled */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Featured"
              title="Featured properties"
              subtitle="Paid placements are marked Promoted. Every listing shows when it was last updated."
              href={`/properties?intent=${tab}&promoted=1`}
              hrefLabel="View featured"
            />
          </Reveal>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" aria-label="Buy or rent" className="inline-flex rounded-full bg-neutral-100 p-1">
              {(["buy", "rent"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`h-10 min-w-[104px] rounded-full px-5 text-sm font-bold transition-colors ${
                    tab === t ? "bg-ink text-white shadow-sm" : "text-neutral-600 hover:text-ink"
                  }`}
                >
                  {t === "buy" ? "For Sale" : "For Rent"}
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-neutral-500">{total} listings available</p>
          </div>

          <div role="tabpanel" className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.slug} item={p} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href={`/properties?intent=${tab}`}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              Browse all {total} {tab === "buy" ? "properties for sale" : "rentals"}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recently added: compact list, map par khulti hai */}
      <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={`Recently added  /  ${tab === "buy" ? "For sale" : "For rent"}`}
              title="New on Season Marketing"
              subtitle="The freshest listings from every city. Tap one to see it on the map."
              href={`/properties?intent=${tab}&sort=newest`}
              hrefLabel="View all new listings"
            />
          </Reveal>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fresh.map((p) => (
              <Link
                key={p.slug}
                href={`/map-search?property=${p.slug}`}
                className="group flex gap-3.5 rounded-2xl border border-neutral-200 bg-white p-3 transition-all duration-300 hover:border-brand-300 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-200 sm:h-28 sm:w-32">
                  <div className="absolute inset-0" style={{ transform: transformOf(p) }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="128px"
                      style={{ objectPosition: focusOf(p) }}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div>
                    <p className="font-display text-base font-extrabold text-brand-600">{p.price}</p>
                    <h3 className="mt-0.5 line-clamp-1 text-sm font-bold text-ink transition-colors group-hover:text-brand-600">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                      <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 shrink-0 text-brand-500" />
                      <span className="line-clamp-1">{p.location}</span>
                    </p>
                  </div>
                  <p className="text-[11px] font-semibold text-neutral-400">{p.updated}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}