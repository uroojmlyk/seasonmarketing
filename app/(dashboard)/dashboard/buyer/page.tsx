"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faMagnifyingGlass,
  faBell,
  faBellSlash,
  faPen,
  faTrashCan,
  faXmark,
  faSave,
  faTriangleExclamation,
  faCircleInfo,
  faLocationDot,
  faHouse,
  faTag,
  faClock,
  faCircleCheck,
  faArrowRight,
  faCirclePause,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type Frequency = "Instant" | "Daily" | "Weekly";
type SearchStatus = "Active" | "Paused";

interface SavedSearch {
  id: string;
  name: string;
  city: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  frequency: Frequency;
  status: SearchStatus;
  matches: number;
  lastSent: string;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_SEARCHES: SavedSearch[] = [
  {
    id: "s1",
    name: "Houses in Lahore",
    city: "Lahore",
    propertyType: "House",
    minPrice: "",
    maxPrice: "PKR 10 Crore",
    frequency: "Daily",
    status: "Active",
    matches: 12,
    lastSent: "2 hours ago",
  },
  {
    id: "s2",
    name: "Plots in Islamabad",
    city: "Islamabad",
    propertyType: "Plot",
    minPrice: "",
    maxPrice: "",
    frequency: "Weekly",
    status: "Active",
    matches: 5,
    lastSent: "Yesterday",
  },
  {
    id: "s3",
    name: "Apartments in Karachi",
    city: "Karachi",
    propertyType: "Flat",
    minPrice: "PKR 3 Crore",
    maxPrice: "PKR 6 Crore",
    frequency: "Instant",
    status: "Paused",
    matches: 0,
    lastSent: "3 days ago",
  },
];

const CITIES = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta"];
const TYPES = ["House", "Flat", "Plot", "Commercial", "Upper Portion"];
const FREQUENCIES: Frequency[] = ["Instant", "Daily", "Weekly"];

const statusTone: Record<SearchStatus, string> = {
  Active: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  Paused: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
};

const statusDot: Record<SearchStatus, string> = {
  Active: "bg-emerald-500",
  Paused: "bg-neutral-400",
};

const freqTone: Record<Frequency, string> = {
  Instant: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
  Daily: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Weekly: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
};

/* ============================================
   PAGE
   ============================================ */

export default function BuyerSavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>(INITIAL_SEARCHES);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SavedSearch | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SavedSearch | null>(null);

  const [form, setForm] = useState({
    name: "",
    city: "Lahore",
    propertyType: "House",
    minPrice: "",
    maxPrice: "",
    frequency: "Daily" as Frequency,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stats = useMemo(
    () => ({
      active: searches.filter((s) => s.status === "Active").length,
      total: searches.length,
      totalMatches: searches.reduce((acc, s) => acc + s.matches, 0),
    }),
    [searches]
  );

  const resetForm = () => {
    setForm({
      name: "",
      city: "Lahore",
      propertyType: "House",
      minPrice: "",
      maxPrice: "",
      frequency: "Daily",
    });
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Give this search a name.";
    return e;
  };

  const createSearch = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSearches((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        name: form.name.trim(),
        city: form.city,
        propertyType: form.propertyType,
        minPrice: form.minPrice,
        maxPrice: form.maxPrice,
        frequency: form.frequency,
        status: "Active",
        matches: 0,
        lastSent: "Never",
      },
    ]);
    setCreateOpen(false);
    resetForm();
  };

  const openEdit = (search: SavedSearch) => {
    setForm({
      name: search.name,
      city: search.city,
      propertyType: search.propertyType,
      minPrice: search.minPrice,
      maxPrice: search.maxPrice,
      frequency: search.frequency,
    });
    setErrors({});
    setEditTarget(search);
  };

  const saveEdit = () => {
    if (!editTarget) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSearches((prev) =>
      prev.map((s) =>
        s.id === editTarget.id
          ? {
              ...s,
              name: form.name.trim(),
              city: form.city,
              propertyType: form.propertyType,
              minPrice: form.minPrice,
              maxPrice: form.maxPrice,
              frequency: form.frequency,
            }
          : s
      )
    );
    setEditTarget(null);
    resetForm();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setSearches((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const toggleStatus = (search: SavedSearch) => {
    setSearches((prev) =>
      prev.map((s) =>
        s.id === search.id
          ? {
              ...s,
              status: s.status === "Active" ? "Paused" : "Active",
            }
          : s
      )
    );
  };

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
                Buyer · Saved Searches
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Saved Searches
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Get notified when new properties match your filters. Manage
                alerts, pause them, or delete anytime.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/buyer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setCreateOpen(true);
                }}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Create Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            STATS
            ========================================= */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              title: "Active Searches",
              value: stats.active,
              icon: faBell,
              hint: `${stats.total} total saved`,
            },
            {
              title: "New Matches",
              value: stats.totalMatches,
              icon: faCircleCheck,
              hint: "Across all searches",
            },
            {
              title: "Notifications",
              value: "On",
              icon: faClock,
              hint: "Instant · Daily · Weekly",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                <FontAwesomeIcon icon={stat.icon} className="h-4 w-4" />
              </span>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                {stat.title}
              </p>
              <p className="mt-2 border-t border-neutral-100 pt-2 text-[11px] font-medium text-neutral-500">
                {stat.hint}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            SEARCHES LIST
            ========================================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs font-black text-neutral-400">
                01
              </span>
              <h2 className="text-lg font-black tracking-tight text-ink">
                Your Searches
              </h2>
            </div>
            <p className="mt-1 text-sm text-neutral-600">
              {searches.length} saved search
              {searches.length !== 1 ? "es" : ""}
            </p>
          </header>

          {searches.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="h-6 w-6"
                />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">
                No saved searches yet
              </h3>
              <p className="mt-1 max-w-sm text-sm text-neutral-500">
                Save your filters to get notified when new properties match.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setCreateOpen(true);
                }}
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
                Create search
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {searches.map((search) => (
                <li key={search.id} className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    {/* Left: info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">
                          {search.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${statusTone[search.status]}`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              statusDot[search.status]
                            }`}
                          />
                          {search.status}
                        </span>
                        <span
                          className={`rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${freqTone[search.frequency]}`}
                        >
                          {search.frequency}
                        </span>
                      </div>

                      {/* Filters summary */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="h-2.5 w-2.5 text-neutral-400"
                          />
                          {search.city}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
                          <FontAwesomeIcon
                            icon={faHouse}
                            className="h-2.5 w-2.5 text-neutral-400"
                          />
                          {search.propertyType}
                        </span>
                        {(search.minPrice || search.maxPrice) && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
                            <FontAwesomeIcon
                              icon={faTag}
                              className="h-2.5 w-2.5 text-neutral-400"
                            />
                            {search.minPrice
                              ? `${search.minPrice} – ${
                                  search.maxPrice || "any"
                                }`
                              : `Up to ${search.maxPrice}`}
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-neutral-500">
                        <span className="inline-flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="h-2.5 w-2.5"
                          />
                          <span className="font-bold text-ink">
                            {search.matches}
                          </span>{" "}
                          matches
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="h-2.5 w-2.5"
                          />
                          Last sent: {search.lastSent}
                        </span>
                      </p>
                    </div>

                    {/* Right: actions */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleStatus(search)}
                        aria-label={
                          search.status === "Active"
                            ? "Pause search"
                            : "Resume search"
                        }
                        className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition ${
                          search.status === "Active"
                            ? "border border-neutral-300 bg-white text-ink hover:bg-neutral-50"
                            : "bg-brand-500 text-white hover:bg-brand-600"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={
                            search.status === "Active"
                              ? faCirclePause
                              : faCirclePlay
                          }
                          className="h-3 w-3"
                        />
                        {search.status === "Active" ? "Pause" : "Resume"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(search)}
                        aria-label={`Edit ${search.name}`}
                        title="Edit"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className="h-3.5 w-3.5"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(search)}
                        aria-label={`Delete ${search.name}`}
                        title="Delete"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="h-3.5 w-3.5"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Info bar */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
            <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">About alerts</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Instant alerts arrive within minutes of a new matching listing.
              Daily and weekly digests are sent at 9 AM PKT. You can pause any
              search anytime without deleting it.
            </p>
          </div>
        </div>
      </main>

      {/* =========================================
          CREATE SEARCH MODAL
          ========================================= */}
      {createOpen && (
        <Modal
          onClose={() => setCreateOpen(false)}
          title="Create saved search"
          subtitle="Get notified when matching properties are listed"
        >
          <SearchForm
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={createSearch}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              Save search
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EDIT SEARCH MODAL
          ========================================= */}
      {editTarget && (
        <Modal
          onClose={() => setEditTarget(null)}
          title="Edit saved search"
          subtitle={editTarget.name}
        >
          <SearchForm
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditTarget(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEdit}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
              Save changes
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          DELETE MODAL
          ========================================= */}
      {deleteTarget && (
        <Modal
          onClose={() => setDeleteTarget(null)}
          title="Delete this saved search?"
          subtitle={deleteTarget.name}
        >
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            />
            <div>
              <p className="text-sm font-bold text-red-900">
                You&apos;ll stop receiving alerts
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-800">
                This action cannot be undone. If you want to temporarily stop
                alerts, consider pausing the search instead.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
              Delete search
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================
   SEARCH FORM
   ============================================ */

function SearchForm({
  form,
  setForm,
  errors,
  setErrors,
}: {
  form: {
    name: string;
    city: string;
    propertyType: string;
    minPrice: string;
    maxPrice: string;
    frequency: Frequency;
  };
  setForm: (f: typeof form) => void;
  errors: Record<string, string>;
  setErrors: (e: Record<string, string>) => void;
}) {
  const update = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="search-name"
          className="text-xs font-black uppercase tracking-wider text-neutral-600"
        >
          Search name <span className="text-brand-600">*</span>
        </label>
        <input
          id="search-name"
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Houses in Lahore under 10 Crore"
          aria-invalid={!!errors.name}
          className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
            errors.name
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="search-city"
            className="text-xs font-black uppercase tracking-wider text-neutral-600"
          >
            City
          </label>
          <select
            id="search-city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="search-type"
            className="text-xs font-black uppercase tracking-wider text-neutral-600"
          >
            Property type
          </label>
          <select
            id="search-type"
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="search-min"
            className="text-xs font-black uppercase tracking-wider text-neutral-600"
          >
            Min price{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="search-min"
            type="text"
            value={form.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            placeholder="e.g. PKR 2 Crore"
            className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
          />
        </div>
        <div>
          <label
            htmlFor="search-max"
            className="text-xs font-black uppercase tracking-wider text-neutral-600"
          >
            Max price{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="search-max"
            type="text"
            value={form.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            placeholder="e.g. PKR 10 Crore"
            className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="search-frequency"
          className="text-xs font-black uppercase tracking-wider text-neutral-600"
        >
          Alert frequency
        </label>
        <select
          id="search-frequency"
          value={form.frequency}
          onChange={(e) => update("frequency", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
        >
          {FREQUENCIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-[11px] text-neutral-500">
          Instant sends immediately, Daily at 9 AM, Weekly on Monday 9 AM.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   MODAL SHELL
   ============================================ */

function Modal({
  onClose,
  title,
  subtitle,
  children,
}: {
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-6 py-4">
          <div className="min-w-0">
            <h3 className="text-lg font-black tracking-tight text-ink">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 line-clamp-1 text-xs font-medium text-neutral-500">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}