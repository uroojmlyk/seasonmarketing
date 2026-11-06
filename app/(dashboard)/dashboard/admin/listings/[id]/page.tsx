"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBuilding,
  faLocationDot,
  faTag,
  faRulerCombined,
  faBed,
  faBath,
  faCar,
  faCalendar,
  faClock,
  faCheck,
  faXmark,
  faPenToSquare,
  faTriangleExclamation,
  faCircleExclamation,
  faCircleCheck,
  faFileLines,
  faShieldHalved,
  faUser,
  faEnvelope,
  faPhone,
  faChevronLeft,
  faChevronRight,
  faImage,
  faArrowUpRightFromSquare,
  faRotateLeft,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/* ============================================
   TYPES
   ============================================ */

type Status = "Pending" | "Active" | "Rejected";

interface TimelineEvent {
  id: number;
  icon: IconDefinition;
  actor: string;
  action: string;
  time: string;
  tone: "brand" | "neutral" | "warning" | "danger";
}

/* ============================================
   MOCK DATA
   ============================================ */

const LISTING = {
  id: "4",
  slug: "commercial-shop-gulberg-lahore",
  status: "Pending" as Status,
  title: "Commercial Shop in Gulberg",
  price: "PKR 2.5 Crore",
  pricePerUnit: "PKR 1,00,000 / sq ft",
  transaction: "For Sale",
  category: "Commercial",
  subCategory: "Shop",
  area: "250 sq ft",
  bathrooms: 1,
  parking: 1,
  age: "2 years",
  city: "Lahore",
  province: "Punjab",
  locality: "Gulberg III",
  address: "Main Boulevard, Gulberg III, Lahore",
  createdAt: "2026-11-05 14:30",
  lastUpdated: "2026-11-05 15:45",
  description:
    "Prime location commercial shop on Main Boulevard Gulberg III. High footfall area, suitable for retail or F&B. Ground floor with street-facing glass frontage, backup power, and dedicated parking. Clean title, ready for immediate possession. Ownership documents available for review.",
  amenities: [
    "Street Frontage",
    "Glass Facade",
    "Backup Power",
    "24/7 Security",
    "Customer Parking",
    "Washroom",
    "Rolling Shutter",
    "Corner Plot",
  ],
  images: [
    "/images/shop-1.jpg",
    "/images/property-1.jpg",
    "/images/property-2.jpg",
    "/images/property-3.jpg",
  ],
  owner: {
    name: "Ali Khan",
    role: "Owner",
    verified: true,
    email: "ali.khan@example.pk",
    phone: "+92 300 1234567",
    listingsCount: 3,
  },
  flags: [
    {
      type: "warning" as const,
      label: "Price 8% below market average",
      detail: "Locality benchmark: PKR 2.7 Crore",
    },
    {
      type: "info" as const,
      label: "Duplicate detected",
      detail: "Matches property #4821 (Karachi) — same owner",
    },
  ],
  documents: [
    { name: "Ownership Certificate (Fard)", status: "uploaded" },
    { name: "CNIC Copy", status: "uploaded" },
    { name: "Utility Bill (Proves address)", status: "uploaded" },
    { name: "NOC (if applicable)", status: "missing" },
  ],
  timeline: [
    {
      id: 1,
      icon: faBuilding,
      actor: "Ali Khan (Owner)",
      action: "Listing submitted for review",
      time: "2 hours ago",
      tone: "brand" as const,
    },
    {
      id: 2,
      icon: faClock,
      actor: "System",
      action: "Automated checks passed (photos, price sanity)",
      time: "2 hours ago",
      tone: "neutral" as const,
    },
    {
      id: 3,
      icon: faTriangleExclamation,
      actor: "System",
      action: "Flagged: price 8% below locality average",
      time: "1 hour ago",
      tone: "warning" as const,
    },
    {
      id: 4,
      icon: faUser,
      actor: "You (Admin)",
      action: "Opened listing for review",
      time: "Just now",
      tone: "neutral" as const,
    },
  ] as TimelineEvent[],
};

const toneMap: Record<TimelineEvent["tone"], string> = {
  brand: "bg-brand-50 text-brand-600",
  neutral: "bg-neutral-100 text-neutral-600",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
};

/* ============================================
   PAGE
   ============================================ */

export default function AdminListingDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [submitted, setSubmitted] = useState<null | "approved" | "rejected">(
    null
  );

  const listing = LISTING;
  const pending = listing.status === "Pending";

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* =========================================
          HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-neutral-500"
          >
            <Link
              href="/dashboard/admin"
              className="transition hover:text-ink"
            >
              Dashboard
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-2 w-2 text-neutral-300"
            />
            <Link
              href="/dashboard/admin/listings"
              className="transition hover:text-ink"
            >
              Listings
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-2 w-2 text-neutral-300"
            />
            <span className="text-ink">#{listing.id}</span>
          </nav>

          {/* Title row */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/dashboard/admin/listings"
                  className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="h-2.5 w-2.5"
                  />
                  Back
                </Link>
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Pending Review
                </span>
                <span className="text-xs font-medium text-neutral-400">
                  #{listing.id}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {listing.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="h-3.5 w-3.5 text-neutral-400"
                  />
                  {listing.locality}, {listing.city}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="h-3.5 w-3.5 text-neutral-400"
                  />
                  Updated {listing.lastUpdated}
                </span>
              </div>
            </div>

            {/* Status action buttons */}
            {pending && !submitted && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setApproveOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setRejectOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                  Reject
                </button>
              </div>
            )}

            {submitted && (
              <div
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${
                  submitted === "approved"
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                    : "bg-red-50 text-red-800 ring-1 ring-red-200"
                }`}
              >
                <FontAwesomeIcon
                  icon={submitted === "approved" ? faCircleCheck : faXmark}
                  className="h-4 w-4"
                />
                {submitted === "approved"
                  ? "Listing approved — now live"
                  : "Listing rejected — reason recorded"}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* =========================================
              LEFT (2/3) — Content
              ========================================= */}
          <div className="space-y-6 lg:col-span-2">
            {/* Image gallery */}
            <section
              aria-label="Property images"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <div className="relative aspect-[16/9] bg-neutral-100">
                <Image
                  src={listing.images[activeImage]}
                  alt={`${listing.title} — image ${activeImage + 1}`}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                  <FontAwesomeIcon icon={faImage} className="h-2.5 w-2.5" />
                  {activeImage + 1} / {listing.images.length}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      (activeImage - 1 + listing.images.length) %
                        listing.images.length
                    )
                  }
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="h-4 w-4"
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage((activeImage + 1) % listing.images.length)
                  }
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="h-4 w-4"
                  />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto p-3">
                {listing.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === activeImage}
                    className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                      i === activeImage
                        ? "ring-brand-500"
                        : "ring-transparent hover:ring-neutral-300"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Key facts */}
            <section
              aria-label="Property facts"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    01
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Key Facts
                  </h2>
                </div>
              </header>

              <div className="grid grid-cols-2 divide-x divide-y divide-neutral-100 sm:grid-cols-4">
                {[
                  { label: "Price", value: listing.price, icon: faTag },
                  { label: "Area", value: listing.area, icon: faRulerCombined },
                  {
                    label: "Category",
                    value: listing.subCategory,
                    icon: faBuilding,
                  },
                  {
                    label: "Transaction",
                    value: listing.transaction,
                    icon: faTag,
                  },
                  { label: "Bedrooms", value: "—", icon: faBed },
                  { label: "Bathrooms", value: listing.bathrooms, icon: faBath },
                  { label: "Parking", value: listing.parking, icon: faCar },
                  { label: "Age", value: listing.age, icon: faClockRotateLeft },
                ].map((f) => (
                  <div key={f.label} className="p-4 sm:p-5">
                    <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      <FontAwesomeIcon
                        icon={f.icon}
                        className="h-2.5 w-2.5 text-neutral-400"
                      />
                      {f.label}
                    </p>
                    <p className="mt-1.5 text-base font-bold text-ink">
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section
              aria-label="Description"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    02
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Description
                  </h2>
                </div>
              </header>
              <div className="px-6 py-5">
                <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {listing.description}
                </p>

                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    Amenities & Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-700"
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="h-2.5 w-2.5 text-emerald-600"
                        />
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section
              aria-label="Location"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    03
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Location
                  </h2>
                </div>
              </header>
              <div className="px-6 py-5">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Province", value: listing.province },
                    { label: "City", value: listing.city },
                    { label: "Locality", value: listing.locality },
                    { label: "Full address", value: listing.address },
                  ].map((row) => (
                    <div key={row.label}>
                      <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex h-40 items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="h-5 w-5 text-neutral-400"
                    />
                    <p className="mt-1 text-xs font-semibold text-neutral-500">
                      Map preview (integration pending)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Documents */}
            <section
              aria-label="Documents"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    04
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Authority & Documents
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  Uploaded by the owner. Review only — this is not legal title
                  verification.
                </p>
              </header>
              <ul className="divide-y divide-neutral-100">
                {listing.documents.map((doc) => {
                  const uploaded = doc.status === "uploaded";
                  return (
                    <li
                      key={doc.name}
                      className="flex items-center justify-between gap-3 px-6 py-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                            uploaded
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={uploaded ? faFileLines : faCircleExclamation}
                            className="h-3.5 w-3.5"
                          />
                        </span>
                        <p className="truncate text-sm font-semibold text-ink">
                          {doc.name}
                        </p>
                      </div>
                      {uploaded ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                        >
                          View
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="h-2.5 w-2.5"
                          />
                        </button>
                      ) : (
                        <span className="rounded-sm bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-800">
                          Missing
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-neutral-100 bg-neutral-50/60 px-6 py-3">
                <p className="text-[11px] leading-relaxed text-neutral-500">
                  Listing presence is not government approval or proof of
                  ownership. Users must independently verify the title.
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section
              aria-label="Status history"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    05
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Activity Timeline
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  All moderation and system events, in order
                </p>
              </header>
              <ol className="p-6">
                {listing.timeline.map((event, idx) => {
                  const Icon = event.icon;
                  const tone = toneMap[event.tone];
                  const last = idx === listing.timeline.length - 1;
                  return (
                    <li
                      key={event.id}
                      className={`relative flex gap-4 ${last ? "" : "pb-6"}`}
                    >
                      {!last && (
                        <span
                          aria-hidden="true"
                          className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-neutral-200"
                        />
                      )}
                      <span
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tone}`}
                      >
                        <FontAwesomeIcon icon={Icon} className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm font-bold text-ink">
                          {event.actor}
                        </p>
                        <p className="mt-0.5 text-sm text-neutral-600">
                          {event.action}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-400">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="h-2.5 w-2.5"
                          />
                          {event.time}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          {/* =========================================
              RIGHT (1/3) — Sidebar
              ========================================= */}
          <aside className="space-y-6">
            {/* Owner card */}
            <section
              aria-label="Owner details"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <h2 className="text-lg font-black tracking-tight text-ink">
                  Advertiser
                </h2>
              </header>
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-base font-black text-white">
                    {listing.owner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-bold text-ink">
                        {listing.owner.name}
                      </p>
                      {listing.owner.verified && (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-brand-50 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
                          <FontAwesomeIcon
                            icon={faShieldHalved}
                            className="h-2 w-2"
                          />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-neutral-500">
                      {listing.owner.role} · {listing.owner.listingsCount}{" "}
                      listings
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                  <a
                    href={`mailto:${listing.owner.email}`}
                    className="flex items-center gap-2 text-sm text-neutral-700 hover:text-brand-600"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-3.5 w-3.5 text-neutral-400"
                    />
                    <span className="truncate">{listing.owner.email}</span>
                  </a>
                  <a
                    href={`tel:${listing.owner.phone}`}
                    className="flex items-center gap-2 text-sm text-neutral-700 hover:text-brand-600"
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="h-3.5 w-3.5 text-neutral-400"
                    />
                    {listing.owner.phone}
                  </a>
                  <Link
                    href={`/dashboard/admin/users?filter=${listing.owner.name}`}
                    className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    View advertiser profile
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="h-2.5 w-2.5"
                    />
                  </Link>
                </div>
              </div>
            </section>

            {/* Flags */}
            {listing.flags.length > 0 && (
              <section
                aria-label="Flags"
                className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50"
              >
                <header className="border-b border-amber-200 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="h-4 w-4 text-amber-700"
                    />
                    <h2 className="text-base font-black tracking-tight text-amber-900">
                      Flags to review
                    </h2>
                  </div>
                </header>
                <ul className="divide-y divide-amber-200/60">
                  {listing.flags.map((flag, i) => (
                    <li key={i} className="px-5 py-3">
                      <p className="text-sm font-bold text-amber-900">
                        {flag.label}
                      </p>
                      <p className="mt-0.5 text-xs text-amber-900/70">
                        {flag.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Moderation panel */}
            <section
              aria-label="Moderation actions"
              className="overflow-hidden rounded-xl bg-ink"
            >
              <div className="px-5 py-4">
                <h2 className="text-lg font-black tracking-tight text-white">
                  Moderation
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  Approve if the listing is accurate and the owner is verified.
                  Reject with a clear reason — all actions are auditable.
                </p>
              </div>

              {submitted ? (
                <div className="border-t border-white/10 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Decision recorded
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {submitted === "approved"
                      ? "Listing approved"
                      : "Listing rejected"}
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300"
                  >
                    <FontAwesomeIcon
                      icon={faRotateLeft}
                      className="h-2.5 w-2.5"
                    />
                    Undo decision
                  </button>
                </div>
              ) : (
                <div className="space-y-2 border-t border-white/10 p-3">
                  <button
                    type="button"
                    onClick={() => setApproveOpen(true)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg bg-brand-500 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
                      Approve & Publish
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRejectOpen(true)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                      Reject with reason
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="h-3.5 w-3.5"
                      />
                      Request changes
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </button>
                </div>
              )}

              <div className="border-t border-white/10 bg-white/[0.03] px-5 py-3">
                <p className="text-[10px] leading-relaxed text-neutral-500">
                  Restricted action. Logged per policy.
                </p>
              </div>
            </section>

            {/* Metadata */}
            <section
              aria-label="Metadata"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <h2 className="text-base font-black tracking-tight text-ink">
                  Metadata
                </h2>
              </header>
              <dl className="divide-y divide-neutral-100">
                {[
                  { label: "Listing ID", value: `#${listing.id}` },
                  { label: "Slug", value: listing.slug },
                  { label: "Created", value: listing.createdAt },
                  { label: "Last updated", value: listing.lastUpdated },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 px-5 py-3"
                  >
                    <dt className="text-xs font-semibold text-neutral-500">
                      {row.label}
                    </dt>
                    <dd className="truncate text-right text-xs font-bold text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
      </main>

      {/* =========================================
          APPROVE MODAL
          ========================================= */}
      {approveOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setApproveOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Confirm approval"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-ink">
                    Approve this listing?
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    The listing will become publicly visible and searchable.
                    Confirm that it meets accuracy and safety rules per the
                    moderation policy.
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
                <li className="flex items-start gap-2 text-neutral-700">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
                  />
                  Owner identity is verified
                </li>
                <li className="flex items-start gap-2 text-neutral-700">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
                  />
                  Photos match the description
                </li>
                <li className="flex items-start gap-2 text-neutral-700">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
                  />
                  Price and area are realistic
                </li>
              </ul>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 bg-neutral-50 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setApproveOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted("approved");
                  setApproveOpen(false);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
                Approve listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          REJECT MODAL
          ========================================= */}
      {rejectOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setRejectOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Reject listing"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-ink">
                    Reject this listing?
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    The advertiser will see your reason. Rejection is logged and
                    can be appealed.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="reject-reason"
                  className="text-xs font-black uppercase tracking-wider text-neutral-600"
                >
                  Reason for rejection{" "}
                  <span className="text-brand-600">*</span>
                </label>
                <textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  placeholder="e.g. Photos do not match the description. Please re-upload accurate images."
                  className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 bg-neutral-50 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setRejectOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!rejectReason.trim()}
                onClick={() => {
                  setSubmitted("rejected");
                  setRejectOpen(false);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                Reject listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}