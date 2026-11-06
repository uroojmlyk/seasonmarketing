import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight, faBath, faBed, faBolt, faBookOpen, faBuilding, faBus, faCalendarCheck, faCar,
  faCartShopping, faCheck, faChildren, faCouch, faDroplet, faDumbbell, faElevator, faFire,
  faHospital, faLocationDot, faLock, faMosque, faPersonSwimming, faRoad, faRulerCombined,
  faSchool, faShieldHalved, faSnowflake, faStore, faTag, faTree, faTriangleExclamation,
  faUtensils, faVideo, faWifi, faKitchenSet, faHouse, faFlag,
} from "@fortawesome/free-solid-svg-icons";
import type { Property } from "@/lib/constants/data";
import {
  buildDescription, cityName, getFeatures, getGallery, localityOf, pickAgent, pricePerUnit,
  refId, typeLabel, type IconKey,
} from "@/features/properties/lib/propertyDetail";
import PropertyGallery from "./PropertyGallery";
import PropertyActions from "./PropertyActions";
import SectionNav from "./SectionNav";
import ContactCard from "./ContactCard";
import MobileContactBar from "./MobileContactBar";
import LoanCalculator from "./LoanCalculator";
import LocationMap from "./LocationMap";
import { formatPkr } from "@/lib/formatters/currency";

// TODO: asli advertiser phone data se aayega. Abhi placeholder hai.
const ADVERTISER_PHONE = "+92 300 1234567";

const ICONS: Record<IconKey, IconDefinition> = {
  car: faCar, shield: faShieldHalved, tree: faTree, bolt: faBolt, water: faDroplet, wifi: faWifi,
  fire: faFire, lift: faElevator, ac: faSnowflake, gym: faDumbbell, pool: faPersonSwimming,
  mosque: faMosque, kids: faChildren, cctv: faVideo, kitchen: faKitchenSet, couch: faCouch,
  dining: faUtensils, study: faBookOpen, check: faCheck, school: faSchool, hospital: faHospital,
  mall: faCartShopping, bus: faBus, road: faRoad, store: faStore, building: faBuilding, lock: faLock,
};

const AVAIL = {
  confirmed: { label: "Availability confirmed", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  stale: { label: "Availability not recently confirmed", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  unknown: { label: "Availability unknown", dot: "bg-neutral-400", text: "text-neutral-600", bg: "bg-neutral-100" },
} as const;

const card = "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-7";
const h2 = "font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl";

export default function PropertyDetail({
  property: p,
  similar,
}: {
  property: Property;
  similar: Property[];
}) {
  const gallery = getGallery(p);
  const description = buildDescription(p);
  const features = getFeatures(p);
  const perUnit = pricePerUnit(p);
  const agent = pickAgent(p);
  const ref = refId(p);
  const locality = localityOf(p);
  const city = cityName(p.city);
  const av = AVAIL[p.availability];
  const isSale = p.intent === "buy";

  const facts: { icon: IconDefinition; value: string; label: string }[] = [];
  if (p.beds) facts.push({ icon: faBed, value: String(p.beds), label: p.beds > 1 ? "Bedrooms" : "Bedroom" });
  if (p.baths) facts.push({ icon: faBath, value: String(p.baths), label: p.baths > 1 ? "Bathrooms" : "Bathroom" });
  facts.push({ icon: faRulerCombined, value: p.area, label: "Area" });
  facts.push({ icon: faHouse, value: typeLabel(p.type), label: "Property type" });
  if (perUnit) facts.push({ icon: faTag, value: perUnit, label: "Price per unit" });
  facts.push({ icon: faCalendarCheck, value: p.updated.replace(/^Updated\s*/i, ""), label: "Last updated" });

  const details: [string, string][] = [
    ["Reference ID", ref],
    ["Purpose", p.purpose],
    ["Property type", typeLabel(p.type)],
    ["City", city],
    ["Location", p.location],
    ["Area", p.area],
    ...(p.beds ? ([["Bedrooms", String(p.beds)]] as [string, string][]) : []),
    ...(p.baths ? ([["Bathrooms", String(p.baths)]] as [string, string][]) : []),
    ["Price", p.price],
    ...(perUnit ? ([["Price per unit", perUnit]] as [string, string][]) : []),
    ["Availability", av.label],
    ["Last updated", p.updated.replace(/^Updated\s*/i, "")],
  ];

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "features", label: "Features" },
    { id: "location", label: "Location" },
    { id: "finance", label: isSale ? "Loan estimate" : "Rent cost" },
    { id: "safety", label: "Safety" },
  ];

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: description.join(" "),
    image: gallery.map((g) => g.src),
    offers: { "@type": "Offer", priceCurrency: "PKR", price: p.priceValue },
    address: { "@type": "PostalAddress", addressLocality: city, addressCountry: "PK", streetAddress: locality },
  };

  return (
    <div className="bg-neutral-50 pb-28 pt-24 sm:pt-28 lg:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb + actions */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-x-2 text-xs font-medium text-neutral-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/properties?intent=${p.intent}`} className="hover:text-brand-600">
              {isSale ? "For sale" : "For rent"}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/properties?city=${p.city}&intent=${p.intent}`} className="hover:text-brand-600">{city}</Link>
            <span aria-hidden="true">/</span>
            <span className="max-w-[220px] truncate text-ink sm:max-w-xs">{locality}</span>
          </nav>
          <PropertyActions slug={p.slug} title={p.title} />
        </div>

        {/* Title + price */}
        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${av.bg} ${av.text}`}>
                <span className={`h-2 w-2 rounded-full ${av.dot}`} />
                {av.label}
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-600 ring-1 ring-neutral-200">
                Ref {ref}
              </span>
            </div>
            <h1 className="text-[1.6rem] font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">{p.title}</h1>
            <p className="mt-2 flex items-start gap-2 text-sm text-neutral-600 sm:text-base">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 !h-4 !w-4 shrink-0 text-brand-500" />
              {p.location}
            </p>
          </div>
          <div className="lg:text-right">
            <p className="font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">{p.price}</p>
            {perUnit && <p className="mt-1 text-sm font-medium text-neutral-500">{perUnit}</p>}
          </div>
        </header>

        <PropertyGallery images={gallery} purpose={p.purpose} promoted={p.promoted} />

        {/* Body */}
        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-6">
            <SectionNav items={navItems} />

            {/* Overview */}
            <section id="overview" className={`${card} scroll-mt-40`}>
              <h2 className={h2}>Overview</h2>
              <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-xl bg-neutral-50 p-4">
                    <FontAwesomeIcon icon={f.icon} className="!h-5 !w-5 text-brand-500" />
                    <dd className="mt-3 break-words font-display text-base font-extrabold leading-tight text-ink sm:text-lg">{f.value}</dd>
                    <dt className="mt-0.5 text-xs font-medium text-neutral-500">{f.label}</dt>
                  </div>
                ))}
              </dl>

              <h3 className="mt-8 text-lg font-extrabold text-ink">About this property</h3>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-600">
                {description.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>
            </section>

            {/* Details */}
            <section id="details" className={`${card} scroll-mt-40`}>
              <h2 className={h2}>Property details</h2>
              <dl className="mt-5 grid gap-x-10 sm:grid-cols-2">
                {details.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-neutral-100 py-3 text-sm">
                    <dt className="shrink-0 text-neutral-500">{k}</dt>
                    <dd className="min-w-0 text-right font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Features */}
            <section id="features" className={`${card} scroll-mt-40`}>
              <h2 className={h2}>Features and amenities</h2>
              <p className="mt-1 text-sm text-neutral-500">As listed by the advertiser. Ask them to confirm anything important to you.</p>
              <div className="mt-6 space-y-7">
                {features.map((g) => (
                  <div key={g.title}>
                    <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-neutral-400">{g.title}</h3>
                    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {g.items.map((it) => (
                        <li key={it.text} className="flex items-center gap-3 text-sm font-medium text-ink">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <FontAwesomeIcon icon={ICONS[it.icon]} className="!h-4 !w-4" />
                          </span>
                          {it.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section id="location" className={`${card} scroll-mt-40`}>
              <h2 className={`${h2} mb-5`}>Location</h2>
              <LocationMap lat={p.lat} lng={p.lng} location={p.location} title={p.title} />
            </section>

            {/* Finance */}
            <section id="finance" className={`${card} scroll-mt-40`}>
              <h2 className={`${h2} mb-5`}>{isSale ? "Home loan estimate" : "What renting will cost"}</h2>
              {isSale ? (
                <LoanCalculator price={p.priceValue} />
              ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-neutral-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Monthly rent</p>
                    <p className="mt-2 font-display text-2xl font-extrabold text-ink">PKR {formatPkr(p.priceValue)}</p>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Over 6 months</p>
                    <p className="mt-2 font-display text-2xl font-extrabold text-ink">PKR {formatPkr(p.priceValue * 6)}</p>
                  </div>
                  <div className="rounded-xl bg-ink p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/60">Over 12 months</p>
                    <p className="mt-2 font-display text-2xl font-extrabold text-brand-400">PKR {formatPkr(p.priceValue * 12)}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-500 sm:col-span-3">
                    Based on the listed monthly rent only. Ask the advertiser about the security deposit, yearly rent increase and utility bills, and get everything in a written agreement.
                  </p>
                </div>
              )}
            </section>

            {/* Safety */}
            <section id="safety" className="scroll-mt-40 overflow-hidden rounded-2xl bg-ink p-5 text-white sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500">
                  <FontAwesomeIcon icon={faShieldHalved} className="!h-5 !w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold sm:text-2xl">Stay safe before you pay</h2>
                  <p className="mt-1 text-sm text-white/70">A few minutes of checking can save you from a costly mistake.</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  "Visit the property in person before you pay anything.",
                  "Check the ownership papers yourself, or with a lawyer.",
                  "Never send an advance or token to someone you have not met.",
                  "Pay by bank transfer and keep a written receipt.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 rounded-xl bg-white/5 p-4 text-white/90">
                    <FontAwesomeIcon icon={faCheck} className="mt-0.5 !h-3.5 !w-3.5 shrink-0 text-brand-400" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-3 rounded-xl border border-brand-500/40 bg-brand-500/10 p-4 text-xs leading-relaxed text-white/85 sm:text-sm">
                <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 !h-4 !w-4 shrink-0 text-brand-400" />
                <p>
                  Season Marketing does not verify ownership or legal title. A listing here is not government approval or a guarantee.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/help" className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-ink transition-colors hover:bg-brand-500 hover:text-white">
                  Read safety tips
                </Link>
                <Link
                  href={`/contact?topic=report-listing&ref=${p.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <FontAwesomeIcon icon={faFlag} className="!h-3.5 !w-3.5" /> Report this listing
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0">
            <div className="lg:sticky lg:top-[104px]">
              <ContactCard
                agent={
                  agent
                    ? {
                        name: agent.name,
                        agency: agent.agency,
                        since: agent.since,
                        languages: agent.languages,
                        idChecked: agent.idChecked,
                        listingsHref: agent.href,
                        cityName: agent.cityName,
                      }
                    : null
                }
                phone={ADVERTISER_PHONE}
                propertyTitle={p.title}
                propertyRef={ref}
                slug={p.slug}
              />
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section aria-labelledby="similar-h" className="mt-14 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                  <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-500" />
                  You may also like
                </p>
                <h2 id="similar-h" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Similar properties</h2>
              </div>
              <Link href={`/properties?city=${p.city}&intent=${p.intent}`} className="group hidden shrink-0 items-center gap-2 text-sm font-bold text-ink hover:text-brand-600 sm:inline-flex">
                View all in {city}
                <FontAwesomeIcon icon={faArrowRight} className="!h-3 !w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <Link
                  key={s.slug}
                  href={`/properties/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: "center 45%" }}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                      {s.purpose}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="font-display text-lg font-extrabold text-brand-600">{s.price}</p>
                    <h3 className="mt-1 line-clamp-1 text-[15px] font-bold text-ink transition-colors group-hover:text-brand-600">{s.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                      <FontAwesomeIcon icon={faLocationDot} className="!h-3 !w-3 shrink-0 text-brand-500" />
                      <span className="line-clamp-1">{s.location}</span>
                    </p>
                    <div className="mt-auto flex items-center gap-4 border-t border-neutral-100 pt-3 text-xs font-semibold text-neutral-600" style={{ marginTop: "1rem" }}>
                      {s.beds && (<span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faBed} className="!h-3.5 !w-3.5 text-neutral-400" />{s.beds}</span>)}
                      {s.baths && (<span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faBath} className="!h-3.5 !w-3.5 text-neutral-400" />{s.baths}</span>)}
                      <span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faRulerCombined} className="!h-3.5 !w-3.5 text-neutral-400" />{s.area}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Keep exploring */}
        <section aria-labelledby="explore-h" className="mt-12 sm:mt-16">
          <h2 id="explore-h" className="font-display text-xl font-extrabold text-ink sm:text-2xl">Keep exploring</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {[
              { label: `More in ${locality}`, href: `/properties?city=${p.city}&locality=${encodeURIComponent(locality)}&intent=${p.intent}` },
              { label: `${typeLabel(p.type)}s ${isSale ? "for sale" : "for rent"} in ${city}`, href: `/properties?city=${p.city}&type=${p.type}&intent=${p.intent}` },
              { label: `${isSale ? "Rentals" : "Properties for sale"} in ${city}`, href: `/properties?city=${p.city}&intent=${isSale ? "rent" : "buy"}` },
              { label: `Properties on the map`, href: `/map-search?city=${p.city}` },
              { label: `Agents in ${city}`, href: `/agents?city=${p.city}` },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-neutral-200 transition-colors hover:bg-ink hover:text-white hover:ring-ink"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <MobileContactBar price={p.price} phone={ADVERTISER_PHONE} title={p.title} propertyRef={ref} />
    </div>
  );
}