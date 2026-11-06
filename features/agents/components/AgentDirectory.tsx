"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faChevronRight, faCircleCheck, faEnvelope, 
  faLocationDot, faMagnifyingGlass, faRotateLeft, faXmark, 
  faLanguage, faUserTie, faStar, faBriefcase
} from "@fortawesome/free-solid-svg-icons";
import { agents, agencies, DIRECTORY_CITIES, SPECIALITIES } from "@/lib/constants/agents";
import type { DirectoryItem, Speciality } from "@/lib/constants/agents";
import { SITE } from "@/lib/constants/site";

const THIS_YEAR = new Date().getFullYear();

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
    active
      ? "border-ink bg-ink text-white shadow-sm"
      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-ink"
  }`;

function Card({ item }: { item: DirectoryItem }) {
  const isAgent = item.kind === "agent";
  const years = THIS_YEAR - item.since;
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry for ${item.name}`)}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-black/5">
      
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {item.idChecked && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3" /> Verified
          </span>
        )}
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{item.name}</h3>
          <p className="text-xs font-medium text-neutral-300">
            {isAgent ? item.agency || "Independent Agent" : "Real Estate Agency"}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600">
            <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-brand-500" />
            {item.cityName}
          </p>
          <div className="flex items-center gap-1 text-sm font-bold text-ink">
            <FontAwesomeIcon icon={faStar} className="h-3.5 w-3.5 text-amber-500" />
            4.8 <span className="text-xs font-medium text-neutral-400">(120)</span>
          </div>
        </div>

        {/* Specialities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.specialities.map((s: Speciality) => (
            <span key={s} className="rounded-md bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700">
              {SPECIALITIES[s].label}
            </span>
          ))}
        </div>

        {/* Areas */}
        <p className="mb-4 text-xs text-neutral-500 line-clamp-1">
          <span className="font-semibold text-neutral-700">Areas:</span> {item.areas.join(", ")}
        </p>

        {/* Stats Grid */}
        <div className="mt-auto grid grid-cols-3 gap-2 rounded-xl bg-neutral-50 p-3 text-center border border-neutral-100">
          <div>
            <p className="font-display text-lg font-extrabold text-ink">{item.listings}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Listings</p>
          </div>
          <div>
            <p className="font-display text-lg font-extrabold text-ink">{isAgent ? `${years}y` : item.teamSize}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              {isAgent ? "Experience" : "Agents"}
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-extrabold text-ink">{isAgent ? item.languages?.length : years}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              {isAgent ? "Languages" : "Years"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <Link
            href={item.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-bold text-white transition hover:bg-brand-500"
          >
            View Listings
            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </Link>
          {isAgent ? (
            <a
              href={mail}
              className="flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-2.5 text-ink transition hover:border-ink hover:bg-neutral-50"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              href={`/agents?city=${item.city}&q=${encodeURIComponent(item.name)}`}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-bold text-ink transition hover:border-ink hover:bg-neutral-50"
            >
              <FontAwesomeIcon icon={faUserTie} className="h-3 w-3" />
              Agents
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AgentDirectory({ mode }: { mode: "agent" | "agency" }) {
  const isAgent = mode === "agent";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "";
  const type = (searchParams.get("type") || "") as Speciality | "";
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState<"listings" | "name" | "experience">("listings");

  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const source = isAgent ? agents : agencies;

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const list = source.filter((x) => {
      if (city && x.city !== city) return false;
      if (type && !x.specialities.includes(type)) return false;
      return words.every((w) => x.searchText.includes(w));
    });
    list.sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : sort === "experience" ? a.since - b.since : b.listings - a.listings
    );
    return list;
  }, [source, city, type, query, sort]);

  const hasFilters = !!(city || type || query);
  const reset = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };
  const cityQs = city ? `?city=${city}` : "";

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white pb-8 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center text-xs font-medium text-neutral-500 sm:text-sm">
            <Link href="/" className="transition hover:text-brand-500">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} className="mx-2 h-2 w-2 text-neutral-300" />
            <span className="text-ink">{isAgent ? "Find an Agent" : "Agencies"}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {isAgent ? "Find a property agent" : "Property agencies across Pakistan"}
              </h1>
              <p className="mt-2 max-w-2xl text-base text-neutral-600">
                {isAgent
                  ? "Talk to agents who know the locality. Each profile shows the areas they cover and how many listings are live."
                  : "Browse agencies by city and speciality, then jump straight to their live listings."}
              </p>
            </div>

            <div role="tablist" className="inline-flex shrink-0 rounded-full bg-neutral-100 p-1">
              <Link
                href={`/agents${cityQs}`}
                role="tab"
                aria-selected={isAgent}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${isAgent ? "bg-ink text-white shadow" : "text-neutral-600 hover:text-ink"}`}
              >
                Agents
              </Link>
              <Link
                href={`/agencies${cityQs}`}
                role="tab"
                aria-selected={!isAgent}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${!isAgent ? "bg-ink text-white shadow" : "text-neutral-600 hover:text-ink"}`}
              >
                Agencies
              </Link>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mt-7 space-y-4">
            <div className="relative max-w-xl">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAgent ? "Search by name, agency or area" : "Search by agency name or area"}
                className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-10 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink">
                  <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  <button className={chip(!city)} onClick={() => setParam("city", "")}>All cities</button>
                  {DIRECTORY_CITIES.map((c) => (
                    <button key={c.slug} className={chip(city === c.slug)} onClick={() => setParam("city", city === c.slug ? "" : c.slug)}>
                      {c.name}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button className={chip(!type)} onClick={() => setParam("type", "")}>Any speciality</button>
                  {(Object.keys(SPECIALITIES) as Speciality[]).map((s) => (
                    <button key={s} className={chip(type === s)} onClick={() => setParam("type", type === s ? "" : s)}>
                      {SPECIALITIES[s].label}
                    </button>
                  ))}
                </div>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                aria-label="Sort"
                className="h-10 w-fit rounded-lg border border-neutral-200 bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-brand-500"
              >
                <option value="listings">Most listings</option>
                <option value="experience">Most experienced</option>
                <option value="name">Name (A to Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-neutral-600">
            {results.length} {isAgent ? (results.length === 1 ? "agent" : "agents") : results.length === 1 ? "agency" : "agencies"}
            {city ? ` in ${DIRECTORY_CITIES.find((c) => c.slug === city)?.name}` : ""}
          </p>
          {hasFilters && (
            <button onClick={reset} className="flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline">
              <FontAwesomeIcon icon={faRotateLeft} className="h-3 w-3" /> Reset filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <Card key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-lg font-bold text-ink">No {isAgent ? "agents" : "agencies"} match these filters</p>
            <p className="mt-1 text-sm text-neutral-500">Try another city or speciality.</p>
            <button onClick={reset} className="mt-5 rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500">
              Show everyone
            </button>
          </div>
        )}

        <p className="mt-6 text-xs text-neutral-500">
          Identity checked means our team reviewed the advertiser's documents. It is not a check of property ownership or title.
        </p>

        {/* CTA */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-ink px-6 py-10 sm:px-12 sm:py-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                {isAgent ? "Are you a property agent?" : "Does your agency deserve to be here?"}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-300 sm:text-base">
                Create a free profile, add your listings and get enquiries from buyers and tenants in your areas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/register?role=${isAgent ? "agent" : "agency"}`} className="inline-flex h-12 items-center rounded-full bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600">
                Create profile
              </Link>
              <Link href="/advertise" className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:bg-white/10">
                Advertise with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}