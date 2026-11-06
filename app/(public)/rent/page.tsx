import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faKey } from "@fortawesome/free-solid-svg-icons";
import HeroSearch from "@/features/search/components/HeroSearch";
import PropertyCard from "@/features/properties/components/PropertyCard";
import { properties } from "@/lib/constants/home";

export const metadata: Metadata = {
  title: "Rent Property in Pakistan | Season Marketing",
  description: "Find the best properties for rent across Pakistan. Browse houses, apartments, and portions with verified owners.",
};

export default function RentPage() {
  // Filter only properties that are "For Rent"
  const rentProperties = properties.filter(p => p.purpose === "For Rent");

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Section for Rent */}
      <section className="relative bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Find your next <span className="text-brand-400">rental</span> home
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Search from thousands of verified houses, apartments, and portions available for rent across Pakistan.
          </p>
          
          <div className="mt-10 mx-auto max-w-4xl">
            {/* HeroSearch will automatically default to 'Rent' because of the prop */}
            <HeroSearch defaultTab="rent" /> 
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-neutral-400">
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-500" /> Verified Landlords</span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-500" /> Direct Contact</span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-500" /> No Hidden Fees</span>
          </div>
        </div>
      </section>

      {/* 2. Quick Categories for Rent */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Apartments", href: "/properties?intent=rent&category=residential:apartment" },
              { label: "Houses", href: "/properties?intent=rent&category=residential:house" },
              { label: "Portions", href: "/properties?intent=rent&category=residential:portion" },
              { label: "Commercial", href: "/properties?intent=rent&category=commercial" },
            ].map((cat) => (
              <Link key={cat.label} href={cat.href} className="flex items-center justify-center rounded-xl border border-neutral-200 bg-white py-4 font-bold text-ink transition hover:border-brand-500 hover:shadow-md">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest Properties for Rent */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Latest Properties for Rent</h2>
              <p className="mt-2 text-neutral-500">Fresh rental listings updated daily by owners and agents.</p>
            </div>
            <Link href="/properties?intent=rent" className="hidden shrink-0 items-center gap-2 text-sm font-bold text-brand-600 hover:underline sm:flex">
              View all rentals &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentProperties.length > 0 ? (
              rentProperties.map((p) => (
                <PropertyCard key={p.slug} item={p} />
              ))
            ) : (
              <div className="col-span-full rounded-xl border border-neutral-200 bg-neutral-50 py-12 text-center text-neutral-500">
                No rentals available at the moment. Please check back later.
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/properties?intent=rent" className="inline-block rounded-xl border border-neutral-300 px-6 py-3 text-sm font-bold text-ink">
              View all rentals
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Renting Guide CTA */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-8 shadow-sm sm:flex-row lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Renting for the first time?</h2>
              <p className="mt-3 text-neutral-600">
                Learn about tenancy agreements, security deposits, and your rights as a tenant. Read our guides to avoid common pitfalls.
              </p>
            </div>
            <Link href="/help" className="mt-6 shrink-0 rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 sm:mt-0">
              Read Renting Guides
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}