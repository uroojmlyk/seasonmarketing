"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faEye,
  faPen,
  faTrashCan,
  faEllipsisVertical,
  faBuilding,
  faLocationDot,
  faArrowLeft,
  faXmark,
  faSave,
  faTriangleExclamation,
  faCircleInfo,
  faCircleCheck,
  faClock,
  faBan,
  faTag,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type ListingStatus = "Active" | "Pending Review" | "Rejected";

interface Listing {
  id: string;
  title: string;
  city: string;
  area: string;
  price: string;
  status: ListingStatus;
  views: number;
  image: string;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern 1 Kanal House",
    city: "Lahore",
    area: "DHA Phase 6",
    price: "PKR 8.5 Crore",
    status: "Active",
    views: 450,
    image: "/images/house-1.jpg",
  },
  {
    id: "2",
    title: "Luxury Sea View Apartment",
    city: "Karachi",
    area: "Clifton",
    price: "PKR 4.2 Crore",
    status: "Active",
    views: 320,
    image: "/images/flat-3.jpg",
  },
  {
    id: "3",
    title: "Commercial Shop in Gulberg",
    city: "Lahore",
    area: "Gulberg III",
    price: "PKR 2.5 Crore",
    status: "Pending Review",
    views: 0,
    image: "/images/shop-1.jpg",
  },
  {
    id: "4",
    title: "10 Marla Residential Plot",
    city: "Islamabad",
    area: "DHA Phase 2",
    price: "PKR 1.9 Crore",
    status: "Rejected",
    views: 12,
    image: "/images/plot-1.jpg",
  },
];

const statusTone: Record<ListingStatus, string> = {
  Active: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  "Pending Review": "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Rejected: "bg-red-50 text-red-800 ring-1 ring-red-200",
};

const statusDot: Record<ListingStatus, string> = {
  Active: "bg-emerald-500",
  "Pending Review": "bg-amber-500",
  Rejected: "bg-red-500",
};

const statusIcon: Record<ListingStatus, any> = {
  Active: faCircleCheck,
  "Pending Review": faClock,
  Rejected: faBan,
};

/* ============================================
   PAGE
   ============================================ */

export default function AgentListingsPage() {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | ListingStatus>("All");

  // Modals
  const [postOpen, setPostOpen] = useState(false);
  const [viewTarget, setViewTarget] = useState<Listing | null>(null);
  const [editTarget, setEditTarget] = useState<Listing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);

  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    area: "",
  });

  const counts = useMemo(
    () => ({
      All: listings.length,
      Active: listings.filter((l) => l.status === "Active").length,
      "Pending Review": listings.filter((l) => l.status === "Pending Review")
        .length,
      Rejected: listings.filter((l) => l.status === "Rejected").length,
    }),
    [listings]
  );

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (filter !== "All" && l.status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !l.title.toLowerCase().includes(q) &&
          !l.city.toLowerCase().includes(q) &&
          !l.area.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [listings, filter, search]);

  const openEdit = (listing: Listing) => {
    setEditForm({
      title: listing.title,
      price: listing.price,
      area: listing.area,
    });
    setEditTarget(listing);
  };

  const saveEdit = () => {
    if (!editTarget) return;
    setListings((prev) =>
      prev.map((l) =>
        l.id === editTarget.id
          ? {
              ...l,
              title: editForm.title,
              price: editForm.price,
              area: editForm.area,
            }
          : l
      )
    );
    setEditTarget(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteTarget(null);
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
                Agent · My Listings
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                My Listings
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage all your active, pending, and rejected properties.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/agent"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
              <button
                type="button"
                onClick={() => setPostOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Post New Listing
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            STATS STRIP
            ========================================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Listings",
              value: counts.All,
              icon: faBuilding,
            },
            {
              label: "Active",
              value: counts.Active,
              icon: faCircleCheck,
            },
            {
              label: "Pending",
              value: counts["Pending Review"],
              icon: faClock,
            },
            {
              label: "Rejected",
              value: counts.Rejected,
              icon: faBan,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                <FontAwesomeIcon icon={s.icon} className="h-4 w-4" />
              </span>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            FILTER BAR
            ========================================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div
              className="flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter listings by status"
            >
              {(
                [
                  { key: "All" as const, label: "All" },
                  { key: "Active" as const, label: "Active" },
                  { key: "Pending Review" as const, label: "Pending" },
                  { key: "Rejected" as const, label: "Rejected" },
                ]
              ).map((t) => {
                const active = filter === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(t.key)}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {counts[t.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, city, or area..."
                className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          {/* =========================================
              LISTINGS GRID
              ========================================= */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon icon={faBuilding} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">
                {listings.length === 0
                  ? "No listings yet"
                  : "No listings match your filter"}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-neutral-500">
                {listings.length === 0
                  ? "Post your first property to start receiving enquiries."
                  : "Try adjusting your filters or search keyword."}
              </p>
              {filter !== "All" || search ? (
                <button
                  onClick={() => {
                    setFilter("All");
                    setSearch("");
                  }}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                >
                  Clear filters
                </button>
              ) : (
                <button
                  onClick={() => setPostOpen(true)}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
                  Post first listing
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <div
                  key={listing.id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-neutral-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ring-1 ${statusTone[listing.status]}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          statusDot[listing.status]
                        }`}
                      />
                      {listing.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-1 text-base font-bold text-ink group-hover:text-brand-600">
                      {listing.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-500">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="h-2.5 w-2.5 text-neutral-400"
                      />
                      {listing.area}, {listing.city}
                    </p>
                    <p className="mt-2 text-lg font-black tracking-tight text-ink">
                      {listing.price}
                    </p>

                    {/* Footer */}
                    <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="h-3 w-3 text-neutral-400"
                        />
                        {listing.views} views
                      </span>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => setViewTarget(listing)}
                          aria-label={`View ${listing.title}`}
                          title="View listing"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="h-3.5 w-3.5"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(listing)}
                          aria-label={`Edit ${listing.title}`}
                          title="Edit listing"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="h-3.5 w-3.5"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(listing)}
                          aria-label={`Delete ${listing.title}`}
                          title="Delete listing"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="h-3.5 w-3.5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer count */}
          {filtered.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:px-5">
              <p className="text-xs font-medium text-neutral-600">
                Showing{" "}
                <span className="font-black text-ink">{filtered.length}</span> of{" "}
                <span className="font-black text-ink">{listings.length}</span>{" "}
                listings
                {filter !== "All" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-bold text-ink">{filter}</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Info bar */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
            <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">Listing policy</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              All new listings go through moderation before going live. Rejected
              listings show the reason on the detail page. Update prices and
              availability regularly to keep listings accurate.
            </p>
          </div>
        </div>
      </main>

      {/* =========================================
          POST NEW LISTING MODAL
          ========================================= */}
      {postOpen && (
        <Modal
          onClose={() => setPostOpen(false)}
          title="Post a new listing"
          subtitle="Choose a category to get started"
        >
          <div className="space-y-2">
            {[
              {
                title: "Residential Property",
                desc: "House, flat, portion, penthouse",
                href: "/dashboard/agent/listings",
              },
              {
                title: "Plot or Land",
                desc: "Residential or commercial plot",
                href: "/dashboard/agent/listings",
              },
              {
                title: "Commercial Property",
                desc: "Shop, office, warehouse",
                href: "/dashboard/agent/listings",
              },
            ].map((opt) => (
              <button
                key={opt.title}
                type="button"
                onClick={() => setPostOpen(false)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-3 text-left transition hover:bg-neutral-50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{opt.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {opt.desc}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-3 w-3 shrink-0 text-neutral-400"
                />
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500"
            />
            <p className="text-xs leading-relaxed text-neutral-600">
              Listing creation flow is being finalized. Categories above will
              open the full form in a future update.
            </p>
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setPostOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          VIEW LISTING MODAL
          ========================================= */}
      {viewTarget && (
        <Modal
          onClose={() => setViewTarget(null)}
          title={viewTarget.title}
          subtitle={`${viewTarget.area}, ${viewTarget.city}`}
        >
          <div className="space-y-4">
            <div className="h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={viewTarget.image}
                alt={viewTarget.title}
                className="h-full w-full object-cover"
              />
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Price", value: viewTarget.price },
                { label: "Status", value: viewTarget.status },
                { label: "City", value: viewTarget.city },
                { label: "Area", value: viewTarget.area },
                { label: "Views", value: viewTarget.views.toString() },
                { label: "Listing ID", value: `#${viewTarget.id}` },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setViewTarget(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                openEdit(viewTarget);
                setViewTarget(null);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" />
              Edit listing
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EDIT MODAL
          ========================================= */}
      {editTarget && (
        <Modal
          onClose={() => setEditTarget(null)}
          title="Edit listing"
          subtitle={editTarget.title}
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Title
              </label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Price
              </label>
              <input
                type="text"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Area
              </label>
              <input
                type="text"
                value={editForm.area}
                onChange={(e) =>
                  setEditForm({ ...editForm, area: e.target.value })
                }
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

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
          title="Delete this listing?"
          subtitle={deleteTarget.title}
        >
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            />
            <div>
              <p className="text-sm font-bold text-red-900">
                This action cannot be undone
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-800">
                The listing will be permanently removed from the website. Any
                enquiries and views associated with it will remain in your
                analytics history.
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
              Delete listing
            </button>
          </div>
        </Modal>
      )}
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