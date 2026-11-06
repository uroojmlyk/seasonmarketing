// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";

// // WEB-16 Property Wanted: entry point on the home page.
// export default function WantedSection() {
//   return (
//     <section className="bg-white py-16">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <div className="flex flex-col items-start gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
//             <div className="flex gap-4">
//               <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white sm:flex">
//                 <FontAwesomeIcon icon={faBullhorn} className="h-5 w-5" />
//               </span>
//               <div>
//                 <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Cannot find what you need?</h2>
//                 <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
//                   Post what you are looking for: the location, property type and budget. You decide who can see it
//                   and how people contact you. Requests are checked before they are shown.
//                 </p>
//               </div>
//             </div>
//             <Link
//               href="/contact?topic=property-wanted"
//               className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-ink px-7 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               Post a Requirement
//             </Link>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }



import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";

export default function WantedSection() {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4 sm:gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white sm:h-14 sm:w-14">
                <FontAwesomeIcon icon={faBullhorn} className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Cannot find what you need?</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                  Post what you are looking for: the location, property type and budget. You decide who can see it
                  and how people contact you. Requests are checked before they are shown.
                </p>
              </div>
            </div>
            <Link
              href="/contact?topic=property-wanted"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              Post a Requirement
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}