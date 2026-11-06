"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faEnvelope,
  faPlus,
  faEllipsisVertical,
  faHouse,
  faArrowRight,
  faArrowLeft,
  faXmark,
  faPaperPlane,
  faClock,
  faCircleCheck,
  faCircleInfo,
  faPen,
  faTrashCan,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type PropertyStatus = "Active" | "Pending Review" | "Sold";

interface Property {
  id: string;
  title: string;
  city: string;
  price: string;
  status: PropertyStatus;
  views: number;
  image: string;
}

interface Lead {
  id: string;
  name: string;
  property: string;
  time: string;
  message: string;
  replied: boolean;
}

/* ============================================
   DATA
   ============================================ */

const MY_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Modern 1 Kanal House",
    city: "Lahore",
    price: "PKR 8.5 Crore",
    status: "Active",
    views: 450,
    image: "/images/house-1.jpg",
  },
  {
    id: "2",
    title: "10 Marla Residential Plot",
    city: "Islamabad",
    price: "PKR 1.9 Crore",
    status: "Active",
    views: 320,
    image: "/images/plot-1.jpg",
  },
  {
    id: "3",
    title: "Commercial Shop in Gulberg",
    city: "Lahore",
    price: "PKR 2.5 Crore",
    status: "Pending Review",
    views: 0,
    image: "/images/shop-1.jpg",
  },
  {
    id: "4",
    title: "Family House in DHA",
    city: "Lahore",
    price: "PKR 12 Crore",
    status: "Sold",
    views: 890,
    image: "/images/house-3.jpg",
  },
];

const INITIAL_LEADS: Lead[] = [
  {
    id: "l1",
    name: "Ahmed R.",
    property: "Modern 1 Kanal House",
    time: "10 mins ago",
    message: "Is this still available for a visit tomorrow?",
    replied: false,
  },
  {
    id: "l2",
    name: "Sara M.",
    property: "10 Marla Residential Plot",
    time: "2 hours ago",
    message: "What is the final price? Can we negotiate?",
    replied: false,
  },
  {
    id: "l3",
    name: "Bilal K.",
    property: "Modern 1 Kanal House",
    time: "5 hours ago",
    message: "Please share the location pin.",
    replied: false,
  },
];

const statusTone: Record<PropertyStatus, string> = {
  Active: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  "Pending Review": "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Sold: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
};

const statusDot: Record<PropertyStatus, string> = {
  Active: "bg-emerald-500",
  "Pending Review": "bg-amber-500",
  Sold: "bg-neutral-400",
};

/* ============================================
   PAGE
   ============================================ */

export default function OwnerDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [replyTarget, setReplyTarget] = useState<Lead | null>(null);
  const [replyText, setReplyText] = useState("");
  const [viewProperty, setViewProperty] = useState<Property | null>(null);

  const newLeadsCount = leads.filter((l) => !l.replied).length;

  const sendReply = () => {
    if (!replyTarget || !replyText.trim()) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === replyTarget.id ? { ...l, replied: true } : l
      )
    );
    setReplyTarget(null);
    setReplyText("");
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
                Owner · Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Owner Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage your listings and respond to enquiries from interested
                buyers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
              <Link
                href="/dashboard/listings/new"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Post New Property
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            STATS
            ========================================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              title: "Active Listings",
              value: "4",
              icon: faHouse,
              hint: "Live on site",
            },
            {
              title: "Total Views",
              value: "1,248",
              icon: faEye,
              hint: "All listings",
            },
            {
              title: "Total Saves",
              value: "86",
              icon: faHeart,
              hint: "Buyer favourites",
            },
            {
              title: "New Enquiries",
              value: newLeadsCount,
              icon: faEnvelope,
              hint: newLeadsCount > 0 ? "Awaiting reply" : "All caught up",
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
            MAIN GRID
            ========================================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT — My Properties */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      01
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      My Properties
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    {MY_PROPERTIES.length} propert
                    {MY_PROPERTIES.length !== 1 ? "ies" : "y"} total
                  </p>
                </div>
              </header>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead className="border-b border-neutral-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Property
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Views
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {MY_PROPERTIES.map((prop) => (
                      <tr
                        key={prop.id}
                        className="group transition hover:bg-neutral-50/70"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                              <img
                                src={prop.image}
                                alt={prop.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-base font-bold text-ink group-hover:text-brand-600">
                                {prop.title}
                              </p>
                              <p className="mt-0.5 truncate text-xs text-neutral-500">
                                {prop.city} · {prop.price}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${statusTone[prop.status]}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                statusDot[prop.status]
                              }`}
                            />
                            {prop.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <p className="text-sm font-black text-ink">
                            {prop.views}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setViewProperty(prop)}
                              aria-label={`View ${prop.title}`}
                              title="View property"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => setViewProperty(prop)}
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
                  </tbody>
                </table>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3">
                <p className="text-xs font-medium text-neutral-600">
                  Total{" "}
                  <span className="font-black text-ink">
                    {MY_PROPERTIES.length}
                  </span>{" "}
                  properties ·{" "}
                  <span className="font-bold text-emerald-700">
                    {MY_PROPERTIES.filter((p) => p.status === "Active").length}{" "}
                    active
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Enquiries */}
          <aside>
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    02
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Recent Enquiries
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  {newLeadsCount > 0
                    ? `${newLeadsCount} awaiting reply`
                    : "All caught up"}
                </p>
              </header>

              {leads.length === 0 ? (
                <div className="flex flex-col items-center px-5 py-12 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-5 w-5"
                    />
                  </span>
                  <p className="mt-3 text-sm font-bold text-ink">
                    No enquiries yet
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Enquiries from buyers will appear here.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {leads.map((lead) => (
                    <li key={lead.id} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-ink">
                            {lead.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] font-semibold text-brand-600">
                            {lead.property}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] font-medium text-neutral-400">
                          {lead.time}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                        &ldquo;{lead.message}&rdquo;
                      </p>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        {lead.replied ? (
                          <span className="inline-flex items-center gap-1 rounded-sm bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-700">
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className="h-2 w-2"
                            />
                            Replied
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-sm bg-amber-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-700">
                            <span className="h-1 w-1 rounded-full bg-amber-500" />
                            New
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => setReplyTarget(lead)}
                          disabled={lead.replied}
                          className="inline-flex h-7 items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 text-[11px] font-bold text-ink transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {lead.replied ? "View" : "Reply"}
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="h-2.5 w-2.5"
                          />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Info bar */}
            <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <p className="text-[11px] leading-relaxed text-neutral-600">
                  <span className="font-bold text-ink">Response tip:</span>{" "}
                  Replying within 15 minutes can increase your chance of closing
                  a deal by 3×.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          PROPERTY DETAIL MODAL
          ========================================= */}
      {viewProperty && (
        <Modal
          onClose={() => setViewProperty(null)}
          title={viewProperty.title}
          subtitle={`${viewProperty.city} · ${viewProperty.price}`}
        >
          <div className="space-y-4">
            <div className="h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={viewProperty.image}
                alt={viewProperty.title}
                className="h-full w-full object-cover"
              />
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Status", value: viewProperty.status },
                { label: "Price", value: viewProperty.price },
                { label: "City", value: viewProperty.city },
                { label: "Views", value: viewProperty.views.toString() },
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

            <div className="space-y-2 border-t border-neutral-100 pt-3">
              {[
                { icon: faPen, label: "Edit listing details" },
                { icon: faBan, label: "Pause / unpause listing" },
                { icon: faTrashCan, label: "Remove listing" },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-neutral-50"
                >
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={action.icon}
                      className="h-3.5 w-3.5 text-neutral-500"
                    />
                    {action.label}
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-2.5 w-2.5 text-neutral-400"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setViewProperty(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REPLY MODAL
          ========================================= */}
      {replyTarget && (
        <Modal
          onClose={() => {
            setReplyTarget(null);
            setReplyText("");
          }}
          title={`Reply to ${replyTarget.name}`}
          subtitle={replyTarget.property}
        >
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
              Original enquiry
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-700">
              &ldquo;{replyTarget.message}&rdquo;
            </p>
            <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-neutral-500">
              <FontAwesomeIcon icon={faClock} className="h-2.5 w-2.5" />
              Received {replyTarget.time}
            </p>
          </div>

          <div className="mt-4">
            <label
              htmlFor="reply-text"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Your reply <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="reply-text"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to the buyer..."
              className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setReplyTarget(null);
                setReplyText("");
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!replyText.trim()}
              onClick={sendReply}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="h-3.5 w-3.5"
              />
              Send reply
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