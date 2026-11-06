import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import HeroSearch from "@/features/search/components/HeroSearch";
import PropertyCard from "@/features/properties/components/PropertyCard";
import { properties } from "@/lib/constants/home";

export const metadata: Metadata = {
  title: "Buy Property in Pakistan | Season Marketing",
  description: "Find the best properties for sale across Pakistan. Browse houses, plots, and commercial spaces.",
};

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Simple Hero for Buy Page */}
      <section className="relative bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Find your next home to <span className="text-brand-400">buy</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Search from thousands of verified residential and commercial properties across Pakistan.
          </p>
          
          <div className="mt-10 mx-auto max-w-4xl">
            {/* Default intent is 'buy' */}
            <HeroSearch /> 
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-neutral-400">
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-500" /> Verified Listings</span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-500" /> Safe Enquiries</span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-500" /> Direct Owner Contact</span>
          </div>
        </div>
      </section>

      {/* 2. Quick Categories */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Houses", href: "/properties?intent=buy&category=residential&type=house" },
              { label: "Apartments", href: "/properties?intent=buy&category=residential&type=apartment" },
              { label: "Plots", href: "/properties?intent=buy&category=plot" },
              { label: "Commercial", href: "/properties?intent=buy&category=commercial" },
            ].map((cat) => (
              <Link key={cat.label} href={cat.href} className="flex items-center justify-center rounded-xl border border-neutral-200 bg-white py-4 font-bold text-ink transition hover:border-brand-500 hover:shadow-md">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest Properties for Sale */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Latest Properties for Sale</h2>
              <p className="mt-2 text-neutral-500">Fresh listings updated daily by owners and agents.</p>
            </div>
            <Link href="/properties?intent=buy" className="hidden shrink-0 items-center gap-2 text-sm font-bold text-brand-600 hover:underline sm:flex">
              View all properties &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.slug} item={p} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/properties?intent=buy" className="inline-block rounded-xl border border-neutral-300 px-6 py-3 text-sm font-bold text-ink">
              View all properties
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Buying Guide CTA */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-8 shadow-sm sm:flex-row lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">New to buying property?</h2>
              <p className="mt-3 text-neutral-600">
                Read our comprehensive buyer safety checklist and guides before you make any payment. We help you make informed decisions.
              </p>
            </div>
            <Link href="/help" className="mt-6 shrink-0 rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 sm:mt-0">
              Read Buying Guides
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}