// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faBuilding, faCity, faKey, faUserTie } from "@fortawesome/free-solid-svg-icons";
// import Reveal from "@/components/ui/Reveal";
// import SpotlightCard from "@/components/ui/SpotlightCard";

// // Each card sends the visitor to sign up with the right role already selected.
// const roles = [
//   { icon: faKey, title: "Owner or Landlord", text: "Sell or rent out your own property.", href: "/register?role=owner" },
//   { icon: faUserTie, title: "Property Agent", text: "Manage listings and leads in one place.", href: "/register?role=agent" },
//   { icon: faBuilding, title: "Agency", text: "Add your staff and share your inventory.", href: "/register?role=agency" },
//   { icon: faCity, title: "Developer or Builder", text: "Present your projects and unit types.", href: "/register?role=developer" },
// ];

// export default function SellCtaSection() {
//   return (
//     <section className="bg-neutral-50 pb-20 sm:pb-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <div className="grain relative overflow-hidden rounded-3xl bg-ink px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
//             {/* One soft orange light in the corner */}
//             <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />

//             <div className="relative grid items-center gap-12 lg:grid-cols-2">
//               <div>
//                 <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
//                   <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
//                   Sell or rent out
//                 </p>
//                 <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
//                   List your property and reach serious buyers
//                 </h2>
//                 <p className="mt-5 max-w-lg text-base text-neutral-300">
//                   Choose how you want to join. Create a listing in a few steps, see your enquiries in your
//                   dashboard and keep your availability up to date. Every listing is checked before it goes live.
//                 </p>
//                 <div className="mt-8 flex flex-wrap gap-3">
//                   <Link
//                     href="/sell"
//                     className="inline-flex h-12 items-center rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600"
//                   >
//                     How listing works
//                   </Link>
//                   <Link
//                     href="/sign-in"
//                     className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:bg-white/10"
//                   >
//                     I already have an account
//                   </Link>
//                 </div>
//               </div>

//               <div className="grid gap-4 sm:grid-cols-2">
//                 {roles.map((r) => (
//                   <SpotlightCard
//                     key={r.title}
//                     href={r.href}
//                     tilt
//                     spot="rgba(255,106,0,0.22)"
//                     className="rounded-2xl border border-white/10 bg-white/5 hover:border-brand-500/60"
//                   >
//                     <div className="p-5">
//                       <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
//                         <FontAwesomeIcon icon={r.icon} className="h-4 w-4" />
//                       </span>
//                       <h3 className="mt-4 text-lg font-bold text-white">{r.title}</h3>
//                       <p className="mt-1 text-sm text-neutral-400">{r.text}</p>
//                       <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-400">
//                         Register
//                         <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-1" />
//                       </span>
//                     </div>
//                   </SpotlightCard>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }





import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBuilding, faCheck, faCity, faKey, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";

const roles = [
  { icon: faKey, title: "Owner or Landlord", text: "Sell or rent out your own property.", href: "/register?role=owner" },
  { icon: faUserTie, title: "Property Agent", text: "Manage listings and leads in one place.", href: "/register?role=agent" },
  { icon: faBuilding, title: "Agency", text: "Add your staff and share your inventory.", href: "/register?role=agency" },
  { icon: faCity, title: "Developer or Builder", text: "Present your projects and unit types.", href: "/register?role=developer" },
];

const points = [
  "Create a listing in a few simple steps",
  "See every enquiry in your dashboard",
  "Every listing is checked before it goes live",
];

export default function SellCtaSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                  <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-500" />
                  Sell or rent out
                </p>
                <h2 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  List your property and reach serious buyers
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-neutral-300 sm:text-base">
                  Choose how you want to join, then publish in minutes and keep your availability up to date.
                </p>

                <ul className="mt-6 space-y-3">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm font-medium text-neutral-200">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                        <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/sell"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition-colors hover:bg-brand-600"
                  >
                    How listing works
                  </Link>
                  <Link
                    href="/sign-in"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    I already have an account
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {roles.map((r) => (
                  <Link
                    key={r.title}
                    href={r.href}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-brand-500/70 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <FontAwesomeIcon icon={r.icon} className="h-4 w-4" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-white">{r.title}</h3>
                    <p className="mt-1 text-sm text-neutral-400">{r.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-400">
                      Register
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}