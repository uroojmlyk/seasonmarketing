import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleInfo, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/constants/data";

const FOCUS: Record<string, string> = {
  "sample-project-one": "center 40%",
  "sample-project-two": "center 60%",
  "sample-project-three": "center 35%",
};

const DOT: Record<string, string> = {
  "Under construction": "bg-brand-500",
  "Launching soon": "bg-sky-400",
  "Ready for possession": "bg-emerald-500",
};

export default function NewProjectsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="New projects"
            title="Developments worth a look"
            subtitle="Apartments, villas and towers from developers, with status and starting prices as submitted by them."
            href="/properties?intent=project"
            hrefLabel="All projects"
          />
        </Reveal>

        {/* Mobile: swipe, Desktop: 3 column grid */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className="w-[82%] shrink-0 snap-center sm:w-[56%] md:w-auto">
              <Link
                href={`/properties?intent=project&city=${p.location.toLowerCase()}`}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
              >
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.location}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 82vw"
                  style={{ objectPosition: FOCUS[p.slug] ?? "center" }}
                  className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink">
                  <span className={`h-2 w-2 rounded-full ${DOT[p.status] ?? "bg-brand-500"}`} />
                  {p.status}
                </span>

                <div className="p-5 sm:p-6">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
                    <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-400" />
                    {p.location} &middot; by {p.developer}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-white">{p.name}</h3>
                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Starting from</p>
                      <p className="text-base font-bold text-white">{p.startingFrom}</p>
                    </div>
                    <span className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-ink transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      View
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
          <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
          Project details are supplied by developers. Showing a project here is not government approval or title certification.
        </p>
      </div>
    </section>
  );
}