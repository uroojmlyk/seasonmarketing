// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBell,
//   faHeart,
//   faMobileScreenButton,
//   faMagnifyingGlass,
// } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";

// const perks = [
//   { icon: faMagnifyingGlass, text: "Search faster with saved filters" },
//   { icon: faBell, text: "Instant alerts for new matches" },
//   { icon: faHeart, text: "Save and compare properties" },
// ];

// export default function AppCtaSection() {
//   return (
//     <section className="bg-white py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <div className="grid items-center gap-10 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:px-16">
//             {/* Left content */}
//             <div>
//               <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
//                 <FontAwesomeIcon icon={faMobileScreenButton} className="h-3 w-3" />
//                 Coming soon
//               </div>

//               <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//                 Take Season Marketing with you
//               </h2>
//               <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
//                 Android and iOS apps are coming soon. Browse, save, and enquire from anywhere.
//               </p>

//               <ul className="mt-7 space-y-3">
//                 {perks.map((p) => (
//                   <li
//                     key={p.text}
//                     className="flex items-center gap-3 text-sm font-semibold text-white"
//                   >
//                     <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
//                       <FontAwesomeIcon icon={p.icon} className="h-3.5 w-3.5" />
//                     </span>
//                     {p.text}
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-8 flex flex-wrap gap-3">
//                 {["Google Play", "App Store"].map((s) => (
//                   <span
//                     key={s}
//                     className="inline-flex items-center gap-2.5 rounded-lg bg-ink/90 px-4 py-2.5 text-sm font-bold text-white"
//                   >
//                     <FontAwesomeIcon
//                       icon={faMobileScreenButton}
//                       className="h-4 w-4 text-brand-400"
//                     />
//                     <span className="leading-tight">
//                       <span className="block text-[10px] font-medium uppercase tracking-wide text-neutral-400">
//                         Coming soon
//                       </span>
//                       {s}
//                     </span>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Right side — clean visual, no fake phone */}
//             <div className="relative flex items-center justify-center">
//               <div className="relative w-full max-w-sm">
//                 {/* Decorative glow — single, subtle */}
//                 <div className="absolute inset-0 rounded-full bg-white/20 blur-3xl" />

//                 {/* Card stack — 3 clean feature cards */}
//                 <div className="relative space-y-3">
//                   {[
//                     { title: "Saved searches", desc: "Get notified on new matches" },
//                     { title: "Compare listings", desc: "Shortlist and decide faster" },
//                     { title: "Direct enquiries", desc: "Message owners safely" },
//                   ].map((card, i) => (
//                     <div
//                       key={card.title}
//                       className="rounded-xl bg-white p-4 shadow-xl"
//                       style={{ transform: `translateY(${i * 4}px)` }}
//                     >
//                       <p className="text-sm font-bold text-ink">{card.title}</p>
//                       <p className="mt-0.5 text-xs text-neutral-500">{card.desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }





import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHeart,
  faMobileScreenButton,
  faMagnifyingGlass,
  faEnvelope,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";

const perks = [
  { icon: faMagnifyingGlass, text: "Search faster with saved filters" },
  { icon: faBell, text: "Instant alerts for new matches" },
  { icon: faHeart, text: "Save and compare properties" },
];

const cards = [
  { icon: faBell, title: "Saved searches", desc: "Get notified on new matches" },
  { icon: faScaleBalanced, title: "Compare listings", desc: "Shortlist and decide faster" },
  { icon: faEnvelope, title: "Direct enquiries", desc: "Message owners safely" },
];

export default function AppCtaSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-3xl bg-brand-500 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-2 lg:px-14 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-black/10" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                <FontAwesomeIcon icon={faMobileScreenButton} className="h-3 w-3" />
                Coming soon
              </div>

              <h2 className="mt-5 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Take Season Marketing with you
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/90 sm:text-base">
                Android and iOS apps are coming soon. Browse, save, and enquire from anywhere.
              </p>

              <ul className="mt-7 space-y-3">
                {perks.map((p) => (
                  <li key={p.text} className="flex items-center gap-3 text-sm font-semibold text-white">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <FontAwesomeIcon icon={p.icon} className="h-3.5 w-3.5" />
                    </span>
                    {p.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Google Play", "App Store"].map((s) => (
                  <span
                    key={s}
                    aria-disabled="true"
                    className="inline-flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white"
                  >
                    <FontAwesomeIcon icon={faMobileScreenButton} className="h-4 w-4 text-brand-400" />
                    <span className="leading-tight">
                      <span className="block text-[10px] font-medium uppercase tracking-wide text-neutral-400">Coming soon</span>
                      {s}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm space-y-3 lg:mx-0 lg:ml-auto">
              {cards.map((c) => (
                <div key={c.title} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg shadow-black/10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FontAwesomeIcon icon={c.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{c.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}