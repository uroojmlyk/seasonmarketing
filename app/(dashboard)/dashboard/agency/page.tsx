"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faUsers,
  faEnvelope,
  faEye,
  faCrown,
  faArrowRight,
  faCircleCheck,
  faCheckCircle,   // ← ye add karo
  faUserTie,
  faArrowLeft,
  faClock,
  faXmark,
  faSave,
  faCircleInfo,
  faTriangleExclamation,
  faPaperPlane,
  faPlus,
  faChartLine,
  faShieldHalved,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
/* ============================================
   TYPES
   ============================================ */

type LeadStatus = "New" | "Contacted" | "Visit Scheduled";

interface Lead {
  id: number;
  name: string;
  property: string;
  assignedTo: string;
  time: string;
  status: LeadStatus;
}

interface Activity {
  id: number;
  actor: string;
  role: string;
  action: string;
  target: string;
  time: string;
  type: "listing" | "lead" | "team" | "resolved";
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    name: "Ahmed R.",
    property: "Modern 1 Kanal House",
    assignedTo: "Ali Khan",
    time: "10 mins ago",
    status: "New",
  },
  {
    id: 2,
    name: "Sara M.",
    property: "Luxury Sea View Apartment",
    assignedTo: "Maryam S.",
    time: "1 hour ago",
    status: "Contacted",
  },
  {
    id: 3,
    name: "Bilal K.",
    property: "Commercial Shop in Gulberg",
    assignedTo: "Ali Khan",
    time: "3 hours ago",
    status: "Visit Scheduled",
  },
];

const ACTIVITY: Activity[] = [
  {
    id: 1,
    actor: "Ali Khan",
    role: "Senior Agent",
    action: "submitted a new listing",
    target: "DHA Phase 6, Lahore",
    time: "12 min ago",
    type: "listing",
  },
  {
    id: 2,
    actor: "Maryam Siddiqui",
    role: "Agent",
    action: "replied to a lead",
    target: "Sara M. — Sea View Apartment",
    time: "45 min ago",
    type: "lead",
  },
  {
    id: 3,
    actor: "You",
    role: "Agency Admin",
    action: "added a team member",
    target: "Hamza Butt",
    time: "2 hours ago",
    type: "team",
  },
  {
    id: 4,
    actor: "Ali Khan",
    role: "Senior Agent",
    action: "marked a lead as closed",
    target: "Zainab H. — 10 Marla Plot",
    time: "5 hours ago",
    type: "resolved",
  },
];

const statusTone: Record<LeadStatus, string> = {
  New: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
  Contacted: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  "Visit Scheduled": "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
};

const statusDot: Record<LeadStatus, string> = {
  New: "bg-brand-500",
  Contacted: "bg-amber-500",
  "Visit Scheduled": "bg-emerald-500",
};

const activityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "listing":
      return faBuilding;
    case "lead":
      return faEnvelope;
    case "team":
      return faUsers;
    case "resolved":
      return faCircleCheck;
    default:
      return faCircleInfo;
  }
};

const activityTone = (type: Activity["type"]) => {
  switch (type) {
    case "listing":
      return "bg-neutral-100 text-neutral-600";
    case "lead":
      return "bg-amber-50 text-amber-700";
    case "team":
      return "bg-brand-50 text-brand-700";
    case "resolved":
      return "bg-emerald-50 text-emerald-700";
    default:
      return "bg-neutral-100 text-neutral-600";
  }
};

/* ============================================
   PAGE
   ============================================ */

export default function AgencyDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [billingOpen, setBillingOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState<Lead | null>(null);
  const [assignTo, setAssignTo] = useState("Ali Khan");

  const assignLead = () => {
    if (!assignOpen) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === assignOpen.id
          ? { ...l, assignedTo: assignTo, status: "Contacted" as LeadStatus }
          : l
      )
    );
    setAssignOpen(null);
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
                Agency · Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Gulberg Realty
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="h-3 w-3"
                  />
                  Verified Agency
                </span>
                <span className="text-sm text-neutral-500">
                  Since Oct 2024 · Lahore
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage your team, listings, and leads in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faPen} className="h-4 w-4" />
                Edit Profile
              </button>
              <Link
                href="/dashboard/agency/team"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                Manage Team
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
              title: "Team Members",
              value: "3",
              icon: faUsers,
              hint: "3 active",
            },
            {
              title: "Active Listings",
              value: "33",
              icon: faBuilding,
              hint: "Across all agents",
            },
            {
              title: "New Leads",
              value: leads.filter((l) => l.status === "New").length,
              icon: faEnvelope,
              hint: "Awaiting reply",
            },
            {
              title: "Views (30d)",
              value: "8,240",
              icon: faEye,
              hint: "All listings",
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
          {/* LEFT — Leads + Activity */}
          <div className="space-y-6 lg:col-span-2">
            {/* Latest Leads */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      01
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Latest Leads
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Recent enquiries across all agents
                  </p>
                </div>
                <Link
                  href="/dashboard/agent/leads"
                  className="shrink-0 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  View inbox
                </Link>
              </header>

              {leads.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-6 w-6"
                    />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    No leads yet
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-neutral-500">
                    Leads from your team&apos;s listings will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left">
                    <thead className="border-b border-neutral-200">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                        >
                          Client
                        </th>
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
                          Assigned
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="group transition hover:bg-neutral-50/70"
                        >
                          <td className="px-4 py-4">
                            <p className="text-base font-bold text-ink group-hover:text-brand-600">
                              {lead.name}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="h-2.5 w-2.5"
                              />
                              {lead.time}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-ink">
                              {lead.property}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-bold text-neutral-700">
                              <FontAwesomeIcon
                                icon={faUserTie}
                                className="h-2.5 w-2.5 text-neutral-400"
                              />
                              {lead.assignedTo}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                                statusTone[lead.status]
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  statusDot[lead.status]
                                }`}
                              />
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setAssignOpen(lead);
                                setAssignTo(lead.assignedTo);
                              }}
                              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
                            >
                              Assign
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="h-2.5 w-2.5"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    02
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Recent Activity
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  What your team has been up to
                </p>
              </header>

              <ul className="divide-y divide-neutral-100">
                {ACTIVITY.map((a) => {
                  const Icon = activityIcon(a.type);
                  const tone = activityTone(a.type);
                  return (
                    <li
                      key={a.id}
                      className="flex items-start gap-3 px-5 py-4"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${tone}`}
                      >
                        <FontAwesomeIcon
                          icon={Icon}
                          className="h-3.5 w-3.5"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-relaxed text-ink">
                          <span className="font-bold">{a.actor}</span>{" "}
                          <span className="text-xs font-medium text-neutral-500">
                            ({a.role})
                          </span>{" "}
                          {a.action}{" "}
                          <span className="font-medium">{a.target}</span>
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-neutral-500">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="h-2.5 w-2.5"
                          />
                          {a.time}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <aside className="space-y-4">
            {/* Subscription — BLACK anchor */}
            <div className="overflow-hidden rounded-xl bg-ink">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-400">
                    <FontAwesomeIcon icon={faCrown} className="h-4 w-4" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-400">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black tracking-tight text-white">
                  Pro Agency Plan
                </h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Renews on Nov 15, 2026
                </p>

                <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-400">
                        Listing limit
                      </span>
                      <span className="font-black text-white">33 / 50</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[66%] rounded-full bg-brand-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-400">
                        Team seats
                      </span>
                      <span className="font-black text-white">3 / 5</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[60%] rounded-full bg-brand-500" />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBillingOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Team snapshot */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-3">
                <h2 className="text-sm font-black uppercase tracking-wider text-ink">
                  Team Snapshot
                </h2>
              </header>
              <ul className="divide-y divide-neutral-100">
                {[
                  { name: "Ali Khan", role: "Senior Agent", listings: 18 },
                  { name: "Maryam Siddiqui", role: "Agent", listings: 12 },
                  { name: "Hamza Butt", role: "Junior Agent", listings: 3 },
                ].map((m) => (
                  <li
                    key={m.name}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-black text-neutral-700">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-ink">
                        {m.name}
                      </p>
                      <p className="text-[10px] font-medium text-neutral-500">
                        {m.role}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-sm bg-neutral-100 px-1.5 py-0.5 text-[10px] font-black text-neutral-700">
                      {m.listings}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-100 px-5 py-3">
                <Link
                  href="/dashboard/agency/team"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  Manage team
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-2.5 w-2.5"
                  />
                </Link>
              </div>
            </div>

            {/* Policy reminder */}
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <p className="text-[11px] leading-relaxed text-neutral-600">
                  <span className="font-bold text-ink">
                    Compliance reminder:
                  </span>{" "}
                  All team actions are logged. Ensure staff roles match their
                  responsibilities.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          BILLING MODAL
          ========================================= */}
      {billingOpen && (
        <Modal
          onClose={() => setBillingOpen(false)}
          title="Subscription details"
          subtitle="Pro Agency Plan · Active"
        >
          <div className="space-y-4">
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Plan", value: "Pro Agency" },
                { label: "Price", value: "PKR 45,000/mo" },
                { label: "Status", value: "Active" },
                { label: "Renews on", value: "Nov 15, 2026" },
                { label: "Listing limit", value: "33 / 50" },
                { label: "Team seats", value: "3 / 5" },
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

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-xs leading-relaxed text-neutral-600">
                Upgrade to Enterprise for unlimited listings, dedicated account
                management, and advanced team controls.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setBillingOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setBillingOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCrown} className="h-3.5 w-3.5" />
              Upgrade plan
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EDIT PROFILE MODAL
          ========================================= */}
      {profileOpen && (
        <Modal
          onClose={() => setProfileOpen(false)}
          title="Edit agency profile"
          subtitle="Gulberg Realty"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Agency name
              </label>
              <input
                type="text"
                defaultValue="Gulberg Realty"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Primary contact
              </label>
              <input
                type="text"
                defaultValue="+92 300 1234567"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Service areas
              </label>
              <input
                type="text"
                defaultValue="DHA Lahore, Gulberg, Bahria Town"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Short description
              </label>
              <textarea
                rows={3}
                defaultValue="Premier agency in Lahore specializing in residential and commercial property sales."
                className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setProfileOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setProfileOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
              Save changes
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          ASSIGN LEAD MODAL
          ========================================= */}
      {assignOpen && (
        <Modal
          onClose={() => setAssignOpen(null)}
          title="Assign lead"
          subtitle={`${assignOpen.name} · ${assignOpen.property}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            Assign this lead to a team member. They will be notified and
            responsible for responding.
          </p>

          <div className="mt-4">
            <label
              htmlFor="assign-to"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Assign to
            </label>
            <select
              id="assign-to"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            >
              <option value="Ali Khan">Ali Khan (Senior Agent)</option>
              <option value="Maryam Siddiqui">Maryam Siddiqui (Agent)</option>
              <option value="Hamza Butt">Hamza Butt (Junior Agent)</option>
            </select>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setAssignOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={assignLead}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCheckCircle} className="h-3.5 w-3.5" />
              Assign lead
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