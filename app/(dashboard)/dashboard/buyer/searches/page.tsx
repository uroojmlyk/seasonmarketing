"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, faMagnifyingGlass, faBell, 
  faBellSlash, faTrashCan, faArrowRight, 
  faHouse, faLocationDot, faFilter
} from "@fortawesome/free-solid-svg-icons";

const SAVED_SEARCHES = [
  {
    id: 1,
    title: "Houses in Lahore",
    filters: "For Sale • DHA, Gulberg • Min 5 Marla • Max PKR 10 Crore",
    alerts: true,
    newMatches: 3,
    lastChecked: "2 hours ago",
    href: "/properties?city=lahore&type=house&intent=buy",
  },
  {
    id: 2,
    title: "Apartments in Karachi",
    filters: "For Rent • Clifton, DHA • 2-3 Beds • Max PKR 1.5 Lac",
    alerts: true,
    newMatches: 1,
    lastChecked: "5 hours ago",
    href: "/properties?city=karachi&type=flat&intent=rent",
  },
  {
    id: 3,
    title: "Plots in Islamabad",
    filters: "For Sale • F-10, E-11 • 1 Kanal • Max PKR 5 Crore",
    alerts: false,
    newMatches: 0,
    lastChecked: "1 day ago",
    href: "/properties?city=islamabad&type=plot&intent=buy",
  },
];

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState(SAVED_SEARCHES);

  const toggleAlert = (id: number) => {
    setSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, alerts: !s.alerts } : s))
    );
  };

  const deleteSearch = (id: number) => {
    setSearches((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/buyer" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-neutral-500 transition hover:text-ink">
          <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" /> Back to Dashboard
        </Link>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Saved Searches & Alerts</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Get notified when a new property matches your saved criteria.
            </p>
          </div>
          <Link href="/properties" className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" /> New Search
          </Link>
        </div>
      </div>

      {searches.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white py-24 text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-bold text-ink">No saved searches yet</h3>
          <p className="mt-1 max-w-sm text-sm text-neutral-500">
            When you search for properties, you can save your filters to get notified when new listings match.
          </p>
          <Link href="/properties" className="mt-6 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-500">
            Start Searching
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {searches.map((search) => (
            <div key={search.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{search.title}</h3>
                    <p className="text-xs text-neutral-500">Last checked {search.lastChecked}</p>
                  </div>
                </div>
                {search.newMatches > 0 && (
                  <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold text-white">
                    {search.newMatches} New
                  </span>
                )}
              </div>

              {/* Filters */}
              <div className="mb-4 rounded-xl bg-neutral-50 p-3">
                <p className="flex items-start gap-2 text-xs font-medium text-neutral-600">
                  <FontAwesomeIcon icon={faFilter} className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" />
                  {search.filters}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                <button
                  onClick={() => toggleAlert(search.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    search.alerts
                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  <FontAwesomeIcon icon={search.alerts ? faBell : faBellSlash} className="h-3.5 w-3.5" />
                  {search.alerts ? "Alerts On" : "Alerts Off"}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => deleteSearch(search.id)}
                    className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                    title="Delete Search"
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
                  </button>
                  <Link
                    href={search.href}
                    className="flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-bold text-white transition hover:bg-brand-500"
                  >
                    View Results <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}