// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faArrowUpRightFromSquare,
// //   faBuilding,
// //   faDiagramProject,
// //   faHouse,
// //   faMountainSun,
// // } from "@fortawesome/free-solid-svg-icons";
// // import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// // import Reveal from "@/components/ui/Reveal";
// // import SectionHeading from "@/components/ui/SectionHeading";
// // import SpotlightCard from "@/components/ui/SpotlightCard";

// // interface Tile {
// //   title: string;
// //   text: string;
// //   chips: string[];
// //   href: string;
// //   icon: IconDefinition;
// //   span: string;
// //   theme: "dark" | "orange" | "light" | "gray";
// //   big?: boolean;
// // }

// // const tiles: Tile[] = [
// //   {
// //     title: "Homes",
// //     text: "Houses, flats and portions for sale or rent.",
// //     chips: ["House", "Flat", "Portion"],
// //     href: "/properties?category=residential",
// //     icon: faHouse,
// //     span: "sm:col-span-2 lg:row-span-2",
// //     theme: "dark",
// //     big: true,
// //   },
// //   {
// //     title: "Plots and Land",
// //     text: "Residential, commercial and farm land.",
// //     chips: ["Marla", "Kanal"],
// //     href: "/properties?category=plot",
// //     icon: faMountainSun,
// //     span: "",
// //     theme: "orange",
// //   },
// //   {
// //     title: "Commercial",
// //     text: "Offices, shops, warehouses and more.",
// //     chips: ["Office", "Shop"],
// //     href: "/properties?category=commercial",
// //     icon: faBuilding,
// //     span: "",
// //     theme: "light",
// //   },
// //   {
// //     title: "New Projects",
// //     text: "Developer projects with unit types and timelines.",
// //     chips: ["Under construction", "Ready", "Launching soon"],
// //     href: "/properties?intent=project",
// //     icon: faDiagramProject,
// //     span: "sm:col-span-2",
// //     theme: "gray",
// //   },
// // ];

// // const THEME: Record<Tile["theme"], { card: string; text: string; sub: string; chip: string; mark: string; spot?: string }> = {
// //   dark: {
// //     card: "bg-ink",
// //     text: "text-white",
// //     sub: "text-neutral-400",
// //     chip: "border-white/20 text-white/80",
// //     mark: "text-white/[0.06]",
// //     spot: "rgba(255,106,0,0.22)",
// //   },
// //   orange: {
// //     card: "bg-brand-500",
// //     text: "text-white",
// //     sub: "text-white/85",
// //     chip: "border-white/40 text-white",
// //     mark: "text-black/10",
// //     spot: "rgba(255,255,255,0.25)",
// //   },
// //   light: {
// //     card: "border border-neutral-200 bg-white",
// //     text: "text-ink",
// //     sub: "text-neutral-600",
// //     chip: "border-neutral-300 text-neutral-700",
// //     mark: "text-neutral-100",
// //   },
// //   gray: {
// //     card: "bg-neutral-100",
// //     text: "text-ink",
// //     sub: "text-neutral-600",
// //     chip: "border-neutral-300 text-neutral-700",
// //     mark: "text-neutral-200",
// //   },
// // };

// // export default function CategoriesSection() {
// //   return (
// //     <section className="bg-neutral-50 py-20 sm:py-28">
// //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// //         <Reveal>
// //           <SectionHeading
// //             eyebrow="Property types"
// //             title="Whatever you are looking for"
// //             subtitle="Each type has its own filters, so you only see what matters."
// //           />
// //         </Reveal>

// //         <div className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(230px,auto)]">
// //           {tiles.map((t, i) => {
// //             const th = THEME[t.theme];
// //             return (
// //               <Reveal key={t.title} delay={i * 80} className={t.span}>
// //                 <SpotlightCard
// //                   href={t.href}
// //                   spot={th.spot}
// //                   className={`h-full rounded-3xl hover:shadow-2xl hover:shadow-black/10 ${th.card}`}
// //                 >
// //                   {/* Big watermark icon */}
// //                   <FontAwesomeIcon
// //                     icon={t.icon}
// //                     aria-hidden="true"
// //                     className={`pointer-events-none absolute -bottom-6 -right-4 !h-40 !w-40 -rotate-12 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${th.mark} ${t.big ? "sm:!h-72 sm:!w-72" : ""}`}
// //                   />

// //                   <div className={`flex h-full min-h-[220px] flex-col p-7 ${t.big ? "sm:min-h-[300px] sm:p-9" : ""}`}>
// //                     <div className="flex items-start justify-between">
// //                       <span
// //                         className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
// //                           t.theme === "dark" || t.theme === "orange" ? "bg-white/15 text-white" : "bg-brand-500 text-white"
// //                         }`}
// //                       >
// //                         <FontAwesomeIcon icon={t.icon} className="h-5 w-5" />
// //                       </span>
// //                       <span
// //                         className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 ${
// //                           t.theme === "dark" || t.theme === "orange"
// //                             ? "border-white/30 text-white group-hover:bg-white group-hover:text-ink"
// //                             : "border-neutral-300 text-ink group-hover:bg-ink group-hover:text-white"
// //                         }`}
// //                       >
// //                         <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
// //                       </span>
// //                     </div>

// //                     <div className="mt-auto pt-10">
// //                       <h3 className={`font-bold leading-none ${th.text} ${t.big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
// //                         {t.title}
// //                       </h3>
// //                       <p className={`mt-3 max-w-sm text-sm sm:text-base ${th.sub}`}>{t.text}</p>
// //                       <div className="mt-4 flex flex-wrap gap-2">
// //                         {t.chips.map((c) => (
// //                           <span key={c} className={`rounded-full border px-3 py-1 text-xs font-semibold ${th.chip}`}>
// //                             {c}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </SpotlightCard>
// //               </Reveal>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }





// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowUpRightFromSquare,
//   faBuilding,
//   faHouse,
//   faMapLocationDot,
//   faMountainSun,
// } from "@fortawesome/free-solid-svg-icons";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";
// import SpotlightCard from "@/components/ui/SpotlightCard";
// import { allProperties } from "@/lib/constants/data";

// const count = (category: string, intent: "buy" | "rent") =>
//   allProperties.filter((p) => p.category === category && p.intent === intent).length;

// interface Tile {
//   title: string;
//   text: string;
//   chips: string[];
//   stats: string;
//   href: string;
//   icon: IconDefinition;
//   span: string;
//   theme: "dark" | "orange" | "light" | "gray";
//   big?: boolean;
// }

// const tiles: Tile[] = [
//   {
//     title: "Homes",
//     text: "Houses, flats, portions, penthouses and farm houses for sale or rent.",
//     chips: ["House", "Flat", "Portion", "Penthouse", "Farm House"],
//     stats: `${count("homes", "buy")} for sale  ·  ${count("homes", "rent")} for rent`,
//     href: "/properties?intent=buy&category=homes",
//     icon: faHouse,
//     span: "sm:col-span-2 lg:row-span-2",
//     theme: "dark",
//     big: true,
//   },
//   {
//     title: "Plots",
//     text: "Residential and commercial plots.",
//     chips: ["Residential", "Commercial"],
//     stats: `${count("plots", "buy")} for sale  ·  ${count("plots", "rent")} for rent`,
//     href: "/properties?intent=buy&category=plots",
//     icon: faMountainSun,
//     span: "",
//     theme: "orange",
//   },
//   {
//     title: "Commercial",
//     text: "Shops and offices in business districts.",
//     chips: ["Shop", "Office"],
//     stats: `${count("commercial", "buy")} for sale  ·  ${count("commercial", "rent")} for rent`,
//     href: "/properties?intent=buy&category=commercial",
//     icon: faBuilding,
//     span: "",
//     theme: "light",
//   },
//   {
//     title: "Search on Map",
//     text: "Zoom from city to locality and open any listing straight from its pin.",
//     chips: ["5 cities", "Price pins", "Live filters"],
//     stats: `${allProperties.length} listings mapped`,
//     href: "/map-search",
//     icon: faMapLocationDot,
//     span: "sm:col-span-2",
//     theme: "gray",
//   },
// ];

// const THEME: Record<Tile["theme"], { card: string; text: string; sub: string; chip: string; mark: string; stat: string; spot?: string }> = {
//   dark: {
//     card: "bg-ink",
//     text: "text-white",
//     sub: "text-neutral-400",
//     chip: "border-white/20 text-white/80",
//     mark: "text-white/[0.06]",
//     stat: "bg-white/10 text-brand-300",
//     spot: "rgba(255,106,0,0.22)",
//   },
//   orange: {
//     card: "bg-brand-500",
//     text: "text-white",
//     sub: "text-white/85",
//     chip: "border-white/40 text-white",
//     mark: "text-black/10",
//     stat: "bg-black/15 text-white",
//     spot: "rgba(255,255,255,0.25)",
//   },
//   light: {
//     card: "border border-neutral-200 bg-white",
//     text: "text-ink",
//     sub: "text-neutral-600",
//     chip: "border-neutral-300 text-neutral-700",
//     mark: "text-neutral-100",
//     stat: "bg-brand-50 text-brand-700",
//   },
//   gray: {
//     card: "bg-neutral-100",
//     text: "text-ink",
//     sub: "text-neutral-600",
//     chip: "border-neutral-300 text-neutral-700",
//     mark: "text-neutral-200",
//     stat: "bg-white text-brand-700",
//   },
// };

// export default function CategoriesSection() {
//   return (
//     <section className="bg-neutral-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <SectionHeading
//             eyebrow="Property types"
//             title="Whatever you are looking for"
//             subtitle="Pick a type and see only what is actually listed, with live counts."
//           />
//         </Reveal>

//         <div className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(230px,auto)] lg:grid-cols-4">
//           {tiles.map((t, i) => {
//             const th = THEME[t.theme];
//             return (
//               <Reveal key={t.title} delay={i * 80} className={t.span}>
//                 <SpotlightCard
//                   href={t.href}
//                   spot={th.spot}
//                   className={`h-full rounded-3xl hover:shadow-2xl hover:shadow-black/10 ${th.card}`}
//                 >
//                   <FontAwesomeIcon
//                     icon={t.icon}
//                     aria-hidden="true"
//                     className={`pointer-events-none absolute -bottom-6 -right-4 !h-40 !w-40 -rotate-12 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${th.mark} ${t.big ? "sm:!h-72 sm:!w-72" : ""}`}
//                   />

//                   <div className={`flex h-full min-h-[220px] flex-col p-7 ${t.big ? "sm:min-h-[300px] sm:p-9" : ""}`}>
//                     <div className="flex items-start justify-between">
//                       <span
//                         className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
//                           t.theme === "dark" || t.theme === "orange" ? "bg-white/15 text-white" : "bg-brand-500 text-white"
//                         }`}
//                       >
//                         <FontAwesomeIcon icon={t.icon} className="h-5 w-5" />
//                       </span>
//                       <span
//                         className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 ${
//                           t.theme === "dark" || t.theme === "orange"
//                             ? "border-white/30 text-white group-hover:bg-white group-hover:text-ink"
//                             : "border-neutral-300 text-ink group-hover:bg-ink group-hover:text-white"
//                         }`}
//                       >
//                         <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
//                       </span>
//                     </div>

//                     <div className="mt-auto pt-10">
//                       <span className={`mb-3 inline-block whitespace-pre rounded-full px-3 py-1 text-xs font-bold ${th.stat}`}>
//                         {t.stats}
//                       </span>
//                       <h3 className={`font-bold leading-none ${th.text} ${t.big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
//                         {t.title}
//                       </h3>
//                       <p className={`mt-3 max-w-sm text-sm sm:text-base ${th.sub}`}>{t.text}</p>
//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {t.chips.map((c) => (
//                           <span key={c} className={`rounded-full border px-3 py-1 text-xs font-semibold ${th.chip}`}>
//                             {c}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </SpotlightCard>
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
import {
  faArrowRight,
  faBuilding,
  faHouse,
  faMapLocationDot,
  faMountainSun,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { allProperties } from "@/lib/constants/data";

const count = (category: string, intent: "buy" | "rent") =>
  allProperties.filter((p) => p.category === category && p.intent === intent).length;

interface Tile {
  title: string;
  text: string;
  chips: string[];
  sale?: number;
  rent?: number;
  statText?: string;
  href: string;
  icon: IconDefinition;
  image?: string;
  focus?: string;
  span: string;
  big?: boolean;
}

const tiles: Tile[] = [
  {
    title: "Homes",
    text: "Houses, flats, portions, penthouses and farm houses for sale or rent.",
    chips: ["House", "Flat", "Portion", "Penthouse", "Farm House"],
    sale: count("homes", "buy"),
    rent: count("homes", "rent"),
    href: "/properties?intent=buy&category=homes",
    icon: faHouse,
    image: "/images/property-1.jpg",
    focus: "center 45%",
    span: "sm:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    title: "Plots",
    text: "Residential and commercial plots.",
    chips: [],
    sale: count("plots", "buy"),
    rent: count("plots", "rent"),
    href: "/properties?intent=buy&category=plots",
    icon: faMountainSun,
    image: "/images/plot-2.jpg",
    focus: "center 50%",
    span: "",
  },
  {
    title: "Commercial",
    text: "Shops and offices in business districts.",
    chips: [],
    sale: count("commercial", "buy"),
    rent: count("commercial", "rent"),
    href: "/properties?intent=buy&category=commercial",
    icon: faBuilding,
    image: "/images/shop-2.jpg",
    focus: "center 55%",
    span: "",
  },
  {
    title: "Search on Map",
    text: "Zoom from city to locality and open any listing straight from its pin.",
    chips: ["5 cities", "Price pins", "Live filters"],
    statText: `${allProperties.length} listings mapped`,
    href: "/map-search",
    icon: faMapLocationDot,
    span: "sm:col-span-2",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Property types"
            title="Whatever you are looking for"
            subtitle="Pick a type and see only what is actually listed, with live counts."
          />
        </Reveal>

        <div className="grid auto-rows-[minmax(230px,auto)] gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(240px,auto)] lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 70} className={t.span}>
              <Link
                href={t.href}
                className="group relative isolate flex h-full min-h-[230px] flex-col overflow-hidden rounded-3xl bg-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
              >
                {t.image ? (
                  <>
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes={t.big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                      style={{ objectPosition: t.focus }}
                      className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  </>
                ) : (
                  <>
                    <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-70" />
                    <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
                    <FontAwesomeIcon
                      icon={t.icon}
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-8 -right-6 -z-10 !h-44 !w-44 -rotate-12 text-white/[0.05]"
                    />
                  </>
                )}

                <div className={`flex h-full flex-col p-5 sm:p-6 ${t.big ? "lg:p-8" : ""}`}>
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                      <FontAwesomeIcon icon={t.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:border-brand-500 group-hover:bg-brand-500">
                      <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold">
                      {t.statText ? (
                        <span className="rounded-full bg-white/15 px-3 py-1 text-white backdrop-blur-sm">{t.statText}</span>
                      ) : (
                        <>
                          <span className="rounded-full bg-white/15 px-3 py-1 text-white backdrop-blur-sm">{t.sale} for sale</span>
                          <span className="rounded-full bg-white/15 px-3 py-1 text-white backdrop-blur-sm">{t.rent} for rent</span>
                        </>
                      )}
                    </div>
                    <h3 className={`font-bold leading-none text-white ${t.big ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl"}`}>
                      {t.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-[15px]">{t.text}</p>
                    {t.chips.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.chips.map((c) => (
                          <span key={c} className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white/90">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}