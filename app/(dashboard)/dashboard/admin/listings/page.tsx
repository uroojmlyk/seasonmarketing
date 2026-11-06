"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faEllipsisVertical,
  faCheck,
  faXmark,
  faEye,
  faBuilding,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faClock,
  faCheckCircle,
  faBan,
  faDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   DATA
   ============================================ */

type ListingStatus = "Pending" | "Active" | "Rejected";

interface Listing {
  id: string;
  title: string;
  city: string;
  price: string;
  agent: string;
  date: string;
  status: ListingStatus;
  image: string;
  verified: boolean;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern 1 Kanal House",
    city: "Lahore",
    price: "PKR 8.5 Crore",
    agent: "Ali Khan",
    date: "2 mins ago",
    status: "Pending",
    image: "/images/house-1.jpg",
    verified: false,
  },
  {
    id: "2",
    title: "Luxury Sea View Apartment",
    city: "Karachi",
    price: "PKR 4.2 Crore",
    agent: "Zainab Real Estate",
    date: "15 mins ago",
    status: "Pending",
    image: "/images/flat-3.jpg",
    verified: true,
  },
  {
    id: "3",
    title: "10 Marla Residential Plot",
    city: "Islamabad",
    price: "PKR 1.9 Crore",
    agent: "Usman Properties",
    date: "1 hour ago",
    status: "Active",
    image: "/images/plot-1.jpg",
    verified: true,
  },
  {
    id: "4",
    title: "Commercial Shop in Gulberg",
    city: "Lahore",
    price: "PKR 2.5 Crore",
    agent: "Ali Khan",
    date: "2 hours ago",
    status: "Rejected",
    image: "/images/shop-1.jpg",
    verified: false,
  },
  {
    id: "5",
    title: "3 Bed Family House",
    city: "Peshawar",
    price: "PKR 1.2 Crore",
    agent: "Khyber Estates",
    date: "3 hours ago",
    status: "Active",
    image: "/images/house-7.jpg",
    verified: true,
  },
];

const TABS: {
  key: "All" | ListingStatus;
  label: string;
  icon: any;
}[] = [
  { key: "All", label: "All", icon: faBuilding },
  { key: "Pending", label: "Pending", icon: faClock },
  { key: "Active", label: "Active", icon: faCheckCircle },
  { key: "Rejected", label: "Rejected", icon: faBan },
];

/* ============================================
   HELPERS
   ============================================ */

const statusTone: Record<ListingStatus, string> = {
  Pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Active: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  Rejected: "bg-red-50 text-red-800 ring-1 ring-red-200",
};

const statusDot: Record<ListingStatus, string> = {
  Pending: "bg-amber-500",
  Active: "bg-emerald-500",
  Rejected: "bg-red-500",
};

/* ============================================
   PAGE
   ============================================ */

export default function AdminListingsPage() {
  const [activeTab, setActiveTab] = useState<"All" | ListingStatus>("All");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const c = { All: MOCK_LISTINGS.length, Pending: 0, Active: 0, Rejected: 0 };
    MOCK_LISTINGS.forEach((l) => {
      if (l.status === "Pending") c.Pending++;
      else if (l.status === "Active") c.Active++;
      else if (l.status === "Rejected") c.Rejected++;
    });
    return c;
  }, []);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      if (activeTab !== "All" && item.status !== activeTab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.city.toLowerCase().includes(q) &&
          !item.agent.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [activeTab, search]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* =========================================
          HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Admin · Listing Management
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Listings
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-600">
                Review, approve, or reject property listings. Every action is
                logged.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                Export
              </button>
              <Link
                href="/dashboard/listings/new"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                New Listing
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            STATS STRIP
            ========================================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              className="rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {tab.label}
                </span>
                <FontAwesomeIcon
                  icon={tab.icon}
                  className="h-3.5 w-3.5 text-neutral-400"
                />
              </div>
              <p className="mt-2 text-3xl font-black tracking-tight text-ink">
                {counts[tab.key]}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            FILTERS + SEARCH
            ========================================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            {/* Tabs */}
            <div
              className="flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter listings by status"
            >
              {TABS.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {counts[tab.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search + filter */}
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative w-full sm:w-72">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, city, or agent..."
                  className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
              <button
                type="button"
                aria-label="More filters"
                className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faFilter} className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* =========================================
              TABLE
              ========================================= */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th scope="col" className="w-12 px-4 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select all listings"
                      className="h-4 w-4 rounded border-neutral-300 accent-brand-500 focus:ring-brand-500"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Agent
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredListings.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition hover:bg-neutral-50/70"
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        aria-label={`Select ${item.title}`}
                        className="h-4 w-4 rounded border-neutral-300 accent-brand-500 focus:ring-brand-500"
                      />
                    </td>

                    {/* Property */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-ink group-hover:text-brand-600">
                            {item.title}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="h-2.5 w-2.5"
                              />
                              {item.date}
                            </span>
                            {item.verified && (
                              <span className="inline-flex items-center gap-1 rounded-sm bg-brand-50 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-brand-700">
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* City */}
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-neutral-700">
                        {item.city}
                      </p>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      <p className="whitespace-nowrap text-sm font-black text-ink">
                        {item.price}
                      </p>
                    </td>

                    {/* Agent */}
                    <td className="px-4 py-4">
                      <p className="max-w-[180px] truncate text-sm font-medium text-neutral-700">
                        {item.agent}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wide ${statusTone[item.status]}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusDot[item.status]}`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/admin/listings/${item.id}`}
                          aria-label={`View ${item.title}`}
                          title="View listing"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="h-3.5 w-3.5"
                          />
                        </Link>

                        {item.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              aria-label="Approve listing"
                              title="Approve"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                            <button
                              type="button"
                              aria-label="Reject listing"
                              title="Reject"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          aria-label="More actions"
                          title="More actions"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="h-3.5 w-3.5"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredListings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                          <FontAwesomeIcon
                            icon={faBuilding}
                            className="h-6 w-6"
                          />
                        </span>
                        <h3 className="mt-4 text-base font-bold text-ink">
                          No listings found
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          Try adjusting your filters, or search with a different
                          keyword.
                        </p>
                        <button
                          onClick={() => {
                            setActiveTab("All");
                            setSearch("");
                          }}
                          className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =========================================
              PAGINATION FOOTER
              ========================================= */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
            <p className="text-xs font-medium text-neutral-600">
              Showing{" "}
              <span className="font-black text-ink">
                {filteredListings.length}
              </span>{" "}
              of{" "}
              <span className="font-black text-ink">
                {MOCK_LISTINGS.length}
              </span>{" "}
              listings
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
              </button>
              <button
                type="button"
                className="flex h-8 min-w-8 items-center justify-center rounded-md bg-ink px-2 text-xs font-black text-white"
              >
                1
              </button>
              <button
                type="button"
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            INFO BAR
            ========================================= */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="h-3.5 w-3.5"
            />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">
              Moderation policy reminder
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Approve only if the listing has accurate photos, a valid price, and
              the owner/agent identity is verified. Reject with a recorded reason.
              All decisions are auditable per platform policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}