// import Image from "next/image";
// import Link from "next/link";
// import Reveal from "@/components/ui/Reveal";
// import SectionHeading from "@/components/ui/SectionHeading";
// import { guides } from "@/lib/constants/home";

// export default function GuidesSection() {
//   return (
//     <section className="bg-neutral-50 py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <Reveal>
//           <SectionHeading
//             eyebrow="Guides and help"
//             title="Learn before you decide"
//             subtitle="Practical guides for buyers, tenants and sellers."
//             href="/help"
//             hrefLabel="Help and Safety Centre"
//           />
//         </Reveal>

//         <div className="grid gap-6 md:grid-cols-3">
//           {guides.map((g, i) => (
//             <Reveal key={g.slug} delay={i * 80}>
//               <Link
//                 href="/help"
//                 className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
//                   <Image
//                     src={g.image}
//                     alt={g.title}
//                     fill
//                     sizes="(min-width: 768px) 33vw, 100vw"
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>
//                 <div className="flex flex-1 flex-col p-5">
//                   <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
//                     <span className="rounded bg-brand-50 px-2 py-0.5 text-brand-600">{g.category}</span>
//                     <span className="text-neutral-400">{g.readTime}</span>
//                   </div>
//                   <h3 className="mt-3 text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-600">
//                     {g.title}
//                   </h3>
//                   <p className="mt-auto pt-4 text-xs text-neutral-500">
//                     By {g.author} &middot; {g.updated}
//                   </p>
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
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { guides } from "@/lib/constants/home";

const FOCUS: Record<string, string> = {
  "buyer-safety-checklist": "center 55%",
  "rent-agreement-basics": "center 40%",
  "how-to-write-a-great-listing": "center 50%",
};

export default function GuidesSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Guides and help"
            title="Learn before you decide"
            subtitle="Practical guides for buyers, tenants and sellers."
            href="/help"
            hrefLabel="Help and Safety Centre"
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={i * 80}>
              <Link
                href="/help"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:border-brand-300 hover:shadow-lg hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    style={{ objectPosition: FOCUS[g.slug] ?? "center" }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
                    <span className="rounded-md bg-brand-50 px-2 py-1 text-brand-700">{g.category}</span>
                    <span className="text-neutral-400">{g.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-600 sm:text-lg">
                    {g.title}
                  </h3>
                  <p className="mt-auto pt-4 text-xs text-neutral-500">
                    By {g.author} &middot; {g.updated}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}