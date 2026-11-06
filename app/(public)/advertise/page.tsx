import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faBullhorn, faCircleCheck, faLocationCrosshairs, faStar, faUserTie, faTag,
} from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { allProperties, NAV_CITIES } from "@/lib/constants/data";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Advertise on Season Marketing",
  description: "Promote your listings, agency or area to buyers and tenants across Pakistan.",
};

const STATS = [
  { value: allProperties.length.toLocaleString("en-US"), label: "Live listings" },
  { value: String(NAV_CITIES.length), label: "Major cities" },
  { value: String(new Set(allProperties.map((p) => p.location)).size), label: "Localities" },
];

const OPTIONS = [
  {
    icon: faStar,
    title: "Featured listings",
    text: "Your property appears in the Featured section on the home page and above regular results, labelled Promoted.",
    points: ["Home page Featured section", "Top of search results", "Orange pin on the map"],
  },
  {
    icon: faUserTie,
    title: "Agency spotlight",
    text: "Put your agency or agent profile at the top of the directory for the cities and specialities you cover.",
    points: ["Top of Agents and Agencies", "City and speciality targeting", "Direct enquiry button"],
  },
  {
    icon: faLocationCrosshairs,
    title: "Locality sponsorship",
    text: "Be the first name people see when they browse a locality such as DHA, Gulberg or F-10.",
    points: ["Locality cards on the home page", "Highlighted in map search", "One sponsor per locality"],
  },
];

const STEPS = [
  { n: "01", title: "Choose a placement", text: "Pick featured listings, an agency spotlight or a locality." },
  { n: "02", title: "Send us the details", text: "Tell us your cities, budget and dates. We reply with a quote." },
  { n: "03", title: "Go live, clearly labelled", text: "Paid placements are always marked Promoted, so buyers know what they are seeing." },
];

const FAQ = [
  { q: "Are promoted listings labelled?", a: "Yes. Every paid placement carries a Promoted label. We do not mix paid and organic results without saying so." },
  { q: "Do I need an account?", a: "You need an account to post listings. Create one as an owner, agent, agency or developer from the register page." },
  { q: "How do I get pricing?", a: "Send us your cities and goals. We share a quote for the placements you choose, with no hidden charges." },
];

export default function AdvertisePage() {
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent("Advertising enquiry")}`;

  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden bg-ink py-16 sm:py-24">
        <div aria-hidden="true" className="absolute -right-32 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-500/25 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
            <FontAwesomeIcon icon={faBullhorn} className="h-3 w-3" />
            Advertise
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Put your property in front of serious buyers
          </h1>
          <p className="mt-5 max-w-2xl text-base text-neutral-300 sm:text-lg">
            Promote listings, your agency or a whole locality across {NAV_CITIES.length} major cities. Every placement is clearly labelled, so the trust you build is real.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard/listings/new" className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600">
              Post a property
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
            <a href={mail} className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:bg-white/10">
              Talk to us
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15">
            {STATS.map((s) => (
              <div key={s.label} className="bg-black/40 px-4 py-5 text-center">
                <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">{s.value}</dd>
                <dt className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Options */}
      <section className="bg-neutral-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Ways to advertise" title="Pick the placement that fits" subtitle="Start small with one listing or cover a whole locality." />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {OPTIONS.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-7 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white">
                    <FontAwesomeIcon icon={o.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{o.text}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-neutral-100 pt-5">
                    {o.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
                        <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 text-brand-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href={mail} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand-600 hover:underline">
                    <FontAwesomeIcon icon={faTag} className="h-3 w-3" />
                    Request a quote
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Live in three steps" />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 font-display text-[8rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-neutral-200)]">
                    {s.n}
                  </span>
                  <h3 className="relative mt-10 text-xl font-bold text-ink">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-neutral-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="bg-neutral-50 pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-neutral-200 bg-white p-5 open:border-brand-300">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-ink">
                  {f.q}
                  <span className="ml-4 text-xl text-brand-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </details>
            ))}
            <p className="px-1 pt-2 text-xs text-neutral-500">
              Read the <Link href="/legal/paid-promotion" className="font-semibold text-brand-600 underline underline-offset-2">Paid Promotion Terms</Link> before you book.
            </p>
          </div>

          <div className="grain relative overflow-hidden rounded-3xl bg-ink p-8 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Ready to get started?</h2>
              <p className="mt-3 text-sm text-neutral-300 sm:text-base">
                Email {SITE.email} or call {SITE.phone}. {SITE.supportHours}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={mail} className="inline-flex h-12 items-center rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600">
                  Request a quote
                </a>
                <Link href="/register" className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:bg-white/10">
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}