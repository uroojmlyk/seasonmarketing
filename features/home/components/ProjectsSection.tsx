

// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";
// import { areas } from "@/lib/constants/home";

// // Is section ka naam purana hai (ProjectsSection), par ab yeh real data se
// // "Popular localities" dikhata hai. Har city se 2 area, total 10.
// const popular = (() => {
//   const perCity = new Map<string, number>();
//   return areas.filter((a) => {
//     const n = perCity.get(a.city) ?? 0;
//     if (n >= 2) return false;
//     perCity.set(a.city, n + 1);
//     return true;
//   });
// })();

// export default function ProjectsSection() {
//   return (
//     <section className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <SectionHeading
//             eyebrow="Popular localities"
//             title="Most searched areas"
//             subtitle="Jump straight into a locality. Each card shows how many listings are live and the lowest asking price."
//             href="/map-search"
//             hrefLabel="Explore on map"
//           />
//         </Reveal>

//         <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
//           {popular.map((a, i) => (
//             <Reveal key={a.location} delay={(i % 5) * 60}>
//               <Link
//                 href={`/properties?city=${a.city}&locality=${encodeURIComponent(a.name)}&intent=buy`}
//                 className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200"
//               >
//                 <div className="absolute inset-0" style={{ transform: a.imageTransform }}>
//                   <Image
//                     src={a.image}
//                     alt={`${a.name}, ${a.cityName}`}
//                     fill
//                     sizes="(min-width: 1024px) 20vw, 50vw"
//                     style={{ objectPosition: a.imageFocus }}
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

//                 <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink backdrop-blur">
//                   {a.cityName}
//                 </span>

//                 <div className="absolute inset-x-0 bottom-0 p-4">
//                   <h3 className="font-display text-lg font-extrabold leading-tight text-white sm:text-xl">{a.name}</h3>
//                   <p className="mt-1 text-xs text-neutral-300">{a.count} listings</p>
//                   <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
//                     <div>
//                       <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">From</p>
//                       <p className="text-sm font-bold text-white">{a.startingPrice}</p>
//                     </div>
//                     <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink transition-all group-hover:bg-brand-500 group-hover:text-white">
//                       <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }






import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { areas } from "@/lib/constants/home";

// Popular localities: har city ke top 2 areas
const popular = (() => {
  const perCity = new Map<string, number>();
  return areas.filter((a) => {
    const n = perCity.get(a.city) ?? 0;
    if (n >= 2) return false;
    perCity.set(a.city, n + 1);
    return true;
  });
})();

export default function ProjectsSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Popular localities"
            title="Most searched areas"
            subtitle="Jump straight into a locality. Each card shows how many listings are live and the lowest asking price."
            href="/map-search"
            hrefLabel="Explore on map"
          />
        </Reveal>

        {/* Mobile/tablet: swipe row, Desktop: 5 column grid */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:gap-4 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {popular.map((a, i) => (
            <Reveal key={a.location} delay={(i % 5) * 50} className="w-[60%] shrink-0 snap-start sm:w-[36%] md:w-[28%] lg:w-auto">
              <Link
                href={`/properties?city=${a.city}&locality=${encodeURIComponent(a.name)}&intent=buy`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
              >
                <div className="absolute inset-0" style={{ transform: a.imageTransform }}>
                  <Image
                    src={a.image}
                    alt={`${a.name}, ${a.cityName}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 36vw, 60vw"
                    style={{ objectPosition: a.imageFocus ?? "center 50%" }}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-ink">
                  {a.cityName}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg font-extrabold leading-tight text-white sm:text-xl">{a.name}</h3>
                  <p className="mt-1 text-xs text-neutral-300">{a.count} listings</p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">From</p>
                      <p className="text-sm font-bold text-white">{a.startingPrice}</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </span>
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