"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faHouse,
  faEnvelope,
  faEye,
  faPlus,
  faEllipsisVertical,
  faArrowRight,
  faChartLine,
  faFileLines,
  faArrowLeft,
  faCircleCheck,
  faClock,
  faCircleInfo,
  faXmark,
  faPaperPlane,
  faImage,
  faLocationDot,
  faChevronRight,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type ProjectStatus =
  | "Under Construction"
  | "Ready for Possession"
  | "Launching Soon";

interface Project {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  units: number;
  sold: number;
  image: string;
}

interface Enquiry {
  id: string;
  name: string;
  project: string;
  date: string;
  message: string;
  replied: boolean;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Skyline Residences",
    location: "DHA Phase 6, Lahore",
    status: "Under Construction",
    units: 24,
    sold: 10,
    image: "/images/project-1.jpg",
  },
  {
    id: "2",
    name: "Greenfield Villas",
    location: "Bahria Town, Islamabad",
    status: "Ready for Possession",
    units: 12,
    sold: 8,
    image: "/images/project-2.jpg",
  },
  {
    id: "3",
    name: "Harbour Point Towers",
    location: "Clifton, Karachi",
    status: "Launching Soon",
    units: 120,
    sold: 0,
    image: "/images/project-3.jpg",
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "e1",
    name: "Ahmed R.",
    project: "Skyline Residences",
    date: "2 mins ago",
    message: "What is the payment plan for a 2-bed unit?",
    replied: false,
  },
  {
    id: "e2",
    name: "Sara M.",
    project: "Greenfield Villas",
    date: "1 hour ago",
    message: "Can I schedule a site visit this weekend?",
    replied: false,
  },
  {
    id: "e3",
    name: "Bilal K.",
    project: "Harbour Point Towers",
    date: "3 hours ago",
    message: "Please share the brochure and floor plans.",
    replied: false,
  },
];

/* ============================================
   HELPERS
   ============================================ */

const statusTone: Record<ProjectStatus, string> = {
  "Ready for Possession":
    "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  "Under Construction": "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  "Launching Soon": "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
};

const statusDot: Record<ProjectStatus, string> = {
  "Ready for Possession": "bg-emerald-500",
  "Under Construction": "bg-amber-500",
  "Launching Soon": "bg-brand-500",
};

/* ============================================
   PAGE
   ============================================ */

export default function DeveloperDashboardPage() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);

  // Modals
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState<Project | null>(null);
  const [replyOpen, setReplyOpen] = useState<Enquiry | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const totalUnits = projects.reduce((acc, p) => acc + p.units, 0);
  const soldUnits = projects.reduce((acc, p) => acc + p.sold, 0);
  const availableUnits = totalUnits - soldUnits;
  const newEnquiries = enquiries.filter((e) => !e.replied).length;

  const sendReply = (enquiry: Enquiry) => {
    if (!replyText.trim()) return;
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === enquiry.id ? { ...e, replied: true } : e
      )
    );
    setReplyOpen(null);
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
                Developer · Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Developer Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage your projects, unit inventory, and enquiries in one place.
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
              <button
                type="button"
                onClick={() => setAddProjectOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Add New Project
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
              title: "Active Projects",
              value: projects.length,
              icon: faBuilding,
              tone: "brand" as const,
              hint: "Live on platform",
            },
            {
              title: "Units Available",
              value: availableUnits,
              icon: faHouse,
              tone: "emerald" as const,
              hint: `${soldUnits} of ${totalUnits} sold`,
            },
            {
              title: "Project Views",
              value: "2,840",
              icon: faEye,
              tone: "neutral" as const,
              hint: "Last 30 days",
            },
            {
              title: "New Enquiries",
              value: newEnquiries,
              icon: faEnvelope,
              tone: "amber" as const,
              hint: "Awaiting reply",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon icon={stat.icon} className="h-4 w-4" />
                </span>
                <span
                  className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                    stat.tone === "brand"
                      ? "bg-brand-50 text-brand-700"
                      : stat.tone === "emerald"
                      ? "bg-emerald-50 text-emerald-700"
                      : stat.tone === "amber"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {stat.tone === "amber" && newEnquiries > 0 ? "Action" : "Live"}
                </span>
              </div>
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
          {/* LEFT — Projects */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      01
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      My Projects
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    {projects.length} active project
                    {projects.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </header>

              {projects.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <FontAwesomeIcon icon={faBuilding} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    No projects yet
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-neutral-500">
                    Add your first project to start receiving enquiries.
                  </p>
                  <button
                    type="button"
                    onClick={() => setAddProjectOpen(true)}
                    className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
                    Add project
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {projects.map((p) => {
                    const percentSold =
                      p.units > 0 ? Math.round((p.sold / p.units) * 100) : 0;
                    return (
                      <li
                        key={p.id}
                        className="p-5 transition hover:bg-neutral-50/50"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          {/* Image */}
                          <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-20 sm:w-28">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="truncate text-base font-bold text-ink">
                                  {p.name}
                                </h3>
                                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="h-2.5 w-2.5"
                                  />
                                  {p.location}
                                </p>
                              </div>
                              <span
                                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
                                  statusTone[p.status]
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    statusDot[p.status]
                                  }`}
                                />
                                {p.status}
                              </span>
                            </div>

                            {/* Progress */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-ink">
                                  {p.sold} sold
                                </span>
                                <span className="text-neutral-500">
                                  {p.units} total units
                                </span>
                              </div>
                              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                <div
                                  className="h-full rounded-full bg-brand-500 transition-all"
                                  style={{ width: `${percentSold}%` }}
                                />
                              </div>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
                                {percentSold}% sold
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setProjectMenuOpen(p)}
                              aria-label={`View ${p.name}`}
                              title="View project"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                            >
                              <FontAwesomeIcon
                                icon={faFileLines}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => setProjectMenuOpen(p)}
                              aria-label={`More actions for ${p.name}`}
                              title="More actions"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
                            >
                              <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* RIGHT — Enquiries + Analytics */}
          <aside className="space-y-4">
            {/* Enquiries */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    02
                  </span>
                  <h2 className="text-base font-black tracking-tight text-ink">
                    Recent Enquiries
                  </h2>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  {newEnquiries} awaiting reply
                </p>
              </header>

              {enquiries.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-neutral-500">
                    No enquiries yet. Enquiries will appear here once buyers
                    reach out.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {enquiries.slice(0, 3).map((enq) => (
                    <li key={enq.id} className="px-5 py-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-ink">
                            {enq.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] font-semibold text-brand-600">
                            {enq.project}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] font-medium text-neutral-400">
                          {enq.date}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                        &ldquo;{enq.message}&rdquo;
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        {enq.replied ? (
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
                          onClick={() => setReplyOpen(enq)}
                          disabled={enq.replied}
                          className="inline-flex h-7 items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 text-[11px] font-bold text-ink transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {enq.replied ? "View" : "Reply"}
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

            {/* Analytics — BLACK anchor */}
            <div className="overflow-hidden rounded-xl bg-ink">
              <div className="p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-400">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="h-4 w-4"
                  />
                </span>
                <h3 className="mt-3 text-lg font-black tracking-tight text-white">
                  Project Analytics
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  Track views, leads, and conversion rates for all your
                  projects.
                </p>
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  View Report
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3 w-3"
                  />
                </button>
              </div>
            </div>

            {/* Info bar */}
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <p className="text-[11px] leading-relaxed text-neutral-600">
                  <span className="font-bold text-ink">Policy reminder:</span>{" "}
                  All project status and unit availability changes are logged
                  and auditable. Keep unit inventory current to avoid stale
                  listings.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          ADD PROJECT MODAL
          ========================================= */}
      {addProjectOpen && (
        <Modal
          onClose={() => setAddProjectOpen(false)}
          title="Add new project"
          subtitle="Create a new project profile"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Project name <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Skyline Residences Phase 2"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Location <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. DHA Phase 6, Lahore"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                  Status
                </label>
                <select className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
                  <option>Under Construction</option>
                  <option>Ready for Possession</option>
                  <option>Launching Soon</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                  Total units
                </label>
                <input
                  type="number"
                  placeholder="e.g. 24"
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setAddProjectOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setAddProjectOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              Create project
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          PROJECT DETAIL MODAL
          ========================================= */}
      {projectMenuOpen && (
        <Modal
          onClose={() => setProjectMenuOpen(null)}
          title={projectMenuOpen.name}
          subtitle={projectMenuOpen.location}
        >
          <div className="space-y-4">
            <div className="h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={projectMenuOpen.image}
                alt={projectMenuOpen.name}
                className="h-full w-full object-cover"
              />
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Status", value: projectMenuOpen.status },
                {
                  label: "Total units",
                  value: projectMenuOpen.units,
                },
                { label: "Sold units", value: projectMenuOpen.sold },
                {
                  label: "Available",
                  value: projectMenuOpen.units - projectMenuOpen.sold,
                },
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

          <div className="mt-5 space-y-2 border-t border-neutral-100 pt-4">
            {[
              "Edit project details",
              "Manage unit inventory",
              "View project enquiries",
              "Archive project",
            ].map((action) => (
              <button
                key={action}
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-neutral-50"
              >
                {action}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-2.5 w-2.5 text-neutral-400"
                />
              </button>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setProjectMenuOpen(null)}
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
      {replyOpen && (
        <Modal
          onClose={() => {
            setReplyOpen(null);
            setReplyText("");
          }}
          title={`Reply to ${replyOpen.name}`}
          subtitle={replyOpen.project}
        >
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
              Original message
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-700">
              &ldquo;{replyOpen.message}&rdquo;
            </p>
            <p className="mt-2 text-[10px] font-medium text-neutral-500">
              Received {replyOpen.date}
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
                setReplyOpen(null);
                setReplyText("");
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!replyText.trim()}
              onClick={() => sendReply(replyOpen)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
              Send reply
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REPORT MODAL
          ========================================= */}
      {reportOpen && (
        <Modal
          onClose={() => setReportOpen(false)}
          title="Project Analytics"
          subtitle="Insights across all your projects"
        >
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Total views", value: "2,840" },
                { label: "Enquiries", value: enquiries.length },
                { label: "Conversion rate", value: "3.2%" },
                { label: "Avg. response time", value: "4h" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg border border-neutral-200 bg-white p-3"
                >
                  <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    {row.label}
                  </p>
                  <p className="mt-1 text-xl font-black tracking-tight text-ink">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500"
              />
              <p className="text-xs leading-relaxed text-neutral-600">
                Detailed analytics with charts, funnel breakdowns, and lead
                quality metrics will be available once the reporting pipeline is
                wired.
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setReportOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
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