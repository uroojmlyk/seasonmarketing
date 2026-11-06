// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faClipboardList, faHandshake, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";

// const steps = [
//   {
//     n: "01",
//     icon: faMagnifyingGlass,
//     title: "Search",
//     text: "Choose your city, property type and budget, then tap Search. Use More filters for size and bedrooms.",
//   },
//   {
//     n: "02",
//     icon: faClipboardList,
//     title: "Check the details",
//     text: "Each listing shows the price, size, when it was last updated and whether availability is confirmed.",
//   },
//   {
//     n: "03",
//     icon: faHandshake,
//     title: "Contact and visit",
//     text: "Send an enquiry or call. Meet in person, see the property and check the documents yourself before you pay.",
//   },
// ];

// export default function HowItWorksSection() {
//   return (
//     <section className="bg-neutral-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <SectionHeading
//             eyebrow="How it works"
//             title="Three simple steps"
//             subtitle="No account is needed to search. Sign in when you want to save, enquire or post."
//           />
//         </Reveal>

//         <div className="grid gap-4 md:grid-cols-3">
//           {steps.map((s, i) => (
//             <Reveal key={s.n} delay={i * 100}>
//               <div className="group relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10">
//                 <span
//                   aria-hidden="true"
//                   className="pointer-events-none absolute -right-2 -top-4 font-display text-[9rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-neutral-200)] transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--color-brand-300)]"
//                 >
//                   {s.n}
//                 </span>
//                 <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white transition-colors group-hover:bg-brand-500">
//                   <FontAwesomeIcon icon={s.icon} className="h-6 w-6" />
//                 </span>
//                 <h3 className="relative mt-16 text-2xl font-bold text-ink">{s.title}</h3>
//                 <p className="relative mt-3 text-base leading-relaxed text-neutral-600">{s.text}</p>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         <Reveal delay={150}>
//           <div className="mt-10 flex flex-wrap items-center gap-3">
//             <Link
//               href="/properties"
//               className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               Start searching
//               <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
//             </Link>
//             <Link
//               href="/help"
//               className="inline-flex h-12 items-center rounded-full border border-neutral-300 px-7 text-sm font-bold text-ink transition hover:border-ink"
//             >
//               Read safety tips
//             </Link>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }






import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClipboardList, faHandshake, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    icon: faMagnifyingGlass,
    title: "Search",
    text: "Choose your city, property type and budget, then tap Search. Use More filters for size and bedrooms.",
  },
  {
    n: "02",
    icon: faClipboardList,
    title: "Check the details",
    text: "Each listing shows the price, size, when it was last updated and whether availability is confirmed.",
  },
  {
    n: "03",
    icon: faHandshake,
    title: "Contact and visit",
    text: "Send an enquiry or call. Meet in person, see the property and check the documents yourself before you pay.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three simple steps"
            subtitle="No account is needed to search. Sign in when you want to save, enquire or post."
          />
        </Reveal>

        <div className="relative grid gap-4 md:grid-cols-3 md:gap-6">
          {/* connector line (desktop) */}
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-[54px] hidden border-t-2 border-dashed border-neutral-200 md:block" />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group relative h-full rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white transition-colors duration-300 group-hover:bg-brand-500">
                    <FontAwesomeIcon icon={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-neutral-200 transition-colors duration-300 group-hover:text-brand-200">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-bold text-ink sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              Start searching
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/help"
              className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 px-7 text-sm font-bold text-ink transition-colors hover:border-ink"
            >
              Read safety tips
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}