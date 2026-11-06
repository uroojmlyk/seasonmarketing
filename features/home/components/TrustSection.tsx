// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelopeCircleCheck,
//   faIdCard,
//   faMagnifyingGlassChart,
//   faFlag,
//   faTriangleExclamation,
// } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";

// // Each check is explained on its own, so people know exactly what was checked.
// const items = [
//   {
//     icon: faEnvelopeCircleCheck,
//     title: "Phone and email checked",
//     text: "The mobile number and email belong to the person who created the account.",
//   },
//   {
//     icon: faIdCard,
//     title: "Identity and authority review",
//     text: "Agents, agencies and developers can send documents. Our team reviews them and records the result.",
//   },
//   {
//     icon: faMagnifyingGlassChart,
//     title: "Listing review",
//     text: "New listings go through automated checks. Our team looks at the ones that seem risky.",
//   },
//   {
//     icon: faFlag,
//     title: "Report and appeal",
//     text: "Report scams, wrong prices, copied ads or impersonation. Every decision has a reason and can be appealed.",
//   },
// ];

// export default function TrustSection() {
//   return (
//     <section id="trust" className="relative overflow-hidden bg-ink py-20">
//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <SectionHeading
//             light
//             eyebrow="Trust and safety"
//             title="Clear labels. No misleading badges."
//             subtitle="We keep each type of check separate, so you always know what has and has not been checked."
//             href="/help#verification"
//             hrefLabel="What each label means"
//           />
//         </Reveal>

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {items.map((it, i) => (
//             <Reveal key={it.title} delay={i * 80}>
//               <div className="h-full rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-500/50 hover:bg-white/[0.08]">
//                 <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500 text-white">
//                   <FontAwesomeIcon icon={it.icon} className="h-4 w-4" />
//                 </span>
//                 <h3 className="mt-4 text-base font-bold text-white">{it.title}</h3>
//                 <p className="mt-2 text-sm leading-relaxed text-neutral-400">{it.text}</p>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         {/* What we do NOT verify */}
//         <Reveal delay={120}>
//           <div className="mt-6 flex gap-4 rounded-xl border border-brand-500/40 bg-brand-500/10 p-5">
//             <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
//             <div className="text-sm leading-relaxed text-neutral-200">
//               <p>
//                 <span className="font-bold text-white">We do not verify ownership or legal title.</span> A listing on
//                 this website is not government approval and not a guarantee. Never pay money before you see the
//                 property, and always check the ownership papers yourself.
//               </p>
//               <p className="mt-2 text-neutral-400">
//                 Every listing shows when it was last updated and whether the advertiser confirmed it is still
//                 available.{" "}
//                 <Link href="/help" className="font-semibold text-brand-400 underline underline-offset-2">
//                   Read our safety tips
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }



import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeCircleCheck,
  faIdCard,
  faMagnifyingGlassChart,
  faFlag,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const items = [
  {
    icon: faEnvelopeCircleCheck,
    title: "Phone and email checked",
    text: "The mobile number and email belong to the person who created the account.",
  },
  {
    icon: faIdCard,
    title: "Identity and authority review",
    text: "Agents, agencies and developers can send documents. Our team reviews them and records the result.",
  },
  {
    icon: faMagnifyingGlassChart,
    title: "Listing review",
    text: "New listings go through automated checks. Our team looks at the ones that seem risky.",
  },
  {
    icon: faFlag,
    title: "Report and appeal",
    text: "Report scams, wrong prices, copied ads or impersonation. Every decision has a reason and can be appealed.",
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Trust and safety"
            title="Clear labels. No misleading badges."
            subtitle="We keep each type of check separate, so you always know what has and has not been checked."
            href="/help#verification"
            hrefLabel="What each label means"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-brand-500/50 hover:bg-white/[0.08]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <FontAwesomeIcon icon={it.icon} className="h-4 w-4" />
                </span>
                <h3 className="mt-5 text-base font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* What we do NOT verify */}
        <Reveal delay={100}>
          <div className="mt-5 flex gap-4 rounded-2xl border border-brand-500/40 bg-brand-500/10 p-5 sm:mt-6 sm:p-6">
            <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
            <div className="text-sm leading-relaxed text-neutral-200">
              <p>
                <span className="font-bold text-white">We do not verify ownership or legal title.</span> A listing on
                this website is not government approval and not a guarantee. Never pay money before you see the
                property, and always check the ownership papers yourself.
              </p>
              <p className="mt-2 text-neutral-400">
                Every listing shows when it was last updated and whether the advertiser confirmed it is still
                available.{" "}
                <Link href="/help" className="font-semibold text-brand-400 underline underline-offset-2 hover:text-brand-300">
                  Read our safety tips
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}