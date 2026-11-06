import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PropertyGrid from "@/features/properties/components/PropertyGrid";

export const metadata: Metadata = {
  title: "Search Properties | Season Marketing",
};

async function SearchResults({ searchParams }: { searchParams: Promise<any> }) {
  const params = (await searchParams) || {};
  
  const city = params.city ? params.city.charAt(0).toUpperCase() + params.city.slice(1) : "Pakistan";
  const intent = params.intent ? params.intent.charAt(0).toUpperCase() + params.intent.slice(1) : "Buy";
  const category = params.category ? ` - ${params.category.charAt(0).toUpperCase() + params.category.slice(1)}` : "";

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      
      {/* Modern Header Section */}
      <div className="border-b border-neutral-200 bg-white pt-8 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="mb-4 flex items-center text-xs font-medium text-neutral-500 sm:text-sm">
            <Link href="/" className="transition hover:text-brand-500">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} className="mx-2 h-2 w-2 text-neutral-300" />
            <Link href="/properties" className="transition hover:text-brand-500">Properties</Link>
            <FontAwesomeIcon icon={faChevronRight} className="mx-2 h-2 w-2 text-neutral-300" />
            <span className="font-semibold text-ink capitalize">{city}</span>
          </nav>

          {/* Title & Badge */}
          <div className="flex flex-col gap-2">
            <h1 className="flex flex-wrap items-center gap-x-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              <span className="capitalize">{intent} Properties in {city}</span>
              {category && (
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-600">
                  {category.replace(' - ', '')}
                </span>
              )}
            </h1>
            <p className="flex items-center gap-2 text-sm text-neutral-500 sm:text-base">
              <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-brand-500" />
              Showing the best verified listings matching your criteria.
            </p>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <PropertyGrid />
      </div>
      
    </div>
  );
}

export default function PropertiesPage({ searchParams }: { searchParams: Promise<any> }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-sm font-medium text-neutral-500">
        Loading properties...
      </div>
    }>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}