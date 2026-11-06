import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faFlag,
  faFileLines,
  faUsers,
  faArrowUp,
  faArrowDown,
  faTriangleExclamation,
  faCircleCheck,
  faArrowRight,
  faShieldHalved,
  faHeadset,
  faWallet,
  faGear,
  faCircleExclamation,
  faCircleInfo,
  faUserShield,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   DATA
   ============================================ */

const KPIS = [
  {
    id: "pending-listings",
    title: "Pending Listings",
    value: 24,
    delta: "+12",
    trend: "up" as const,
    target: "< 24h",
    slaBreach: false,
    icon: faBuilding,
    href: "/dashboard/admin/listings?status=pending",
    hint: "Awaiting moderation",
  },
  {
    id: "open-reports",
    title: "Open Reports",
    value: 8,
    delta: "-5",
    trend: "down" as const,
    target: "Same day",
    slaBreach: true,
    icon: faFlag,
    href: "/dashboard/admin/reports",
    hint: "3 flagged as scams",
  },
  {
    id: "verification-queue",
    title: "Verification Queue",
    value: 12,
    delta: "+3",
    trend: "up" as const,
    target: "< 1 day",
    slaBreach: false,
    icon: faFileLines,
    href: "/dashboard/admin/verification",
    hint: "Agent & agency checks",
  },
  {
    id: "active-users",
    title: "Active Users",
    value: "1,248",
    delta: "+18%",
    trend: "up" as const,
    target: "—",
    slaBreach: false,
    icon: faUsers,
    href: "/dashboard/admin/users",
    hint: "Last 30 days",
  },
];

const SLA_WATCH = [
  {
    id: 1,
    label: "Scam reports",
    count: 3,
    due: "Due in 2h",
    breach: false,
    severity: "high" as const,
    href: "/dashboard/admin/reports?filter=scam",
  },
  {
    id: 2,
    label: "Complaint acknowledgements",
    count: 2,
    due: "Overdue by 1h",
    breach: true,
    severity: "high" as const,
    href: "/dashboard/admin/support?filter=overdue",
  },
  {
    id: 3,
    label: "Verification reviews",
    count: 5,
    due: "Due in 6h",
    breach: false,
    severity: "medium" as const,
    href: "/dashboard/admin/verification",
  },
  {
    id: 4,
    label: "Promoted listing reconfirmation",
    count: 14,
    due: "Due today",
    breach: false,
    severity: "low" as const,
    href: "/dashboard/admin/listings?filter=promoted",
  },
];

const ACTIVITY = [
  {
    id: 1,
    actor: "Ali Khan",
    role: "Owner",
    action: "submitted a new listing",
    target: "DHA Phase 6, Lahore",
    time: "2 min ago",
    type: "listing" as const,
    href: "/dashboard/admin/listings",
  },
  {
    id: 2,
    actor: "Zainab Real Estate",
    role: "Agency",
    action: "requested verification",
    target: "Agency documents",
    time: "15 min ago",
    type: "verification" as const,
    href: "/dashboard/admin/verification",
  },
  {
    id: 3,
    actor: "System",
    role: "Automated",
    action: "flagged a duplicate listing",
    target: "Property #4821, Karachi",
    time: "1 hr ago",
    type: "report" as const,
    href: "/dashboard/admin/reports",
  },
  {
    id: 4,
    actor: "Sara Malik",
    role: "Support",
    action: "resolved complaint",
    target: "Ticket #4892",
    time: "2 hr ago",
    type: "resolved" as const,
    href: "/dashboard/admin/support",
  },
  {
    id: 5,
    actor: "Bilal Khan",
    role: "Moderator",
    action: "rejected a listing",
    target: "Property #4807, Islamabad",
    time: "3 hr ago",
    type: "moderation" as const,
    href: "/dashboard/admin/listings",
  },
];

const MODULES = [
  {
    label: "Listing Management",
    desc: "Search, edit, moderate, expiry, duplicates",
    icon: faBuilding,
    href: "/dashboard/admin/listings",
    badge: "24 pending",
    badgeTone: "brand" as const,
  },
  {
    label: "Verification Desk",
    desc: "Identity, authority, review outcomes",
    icon: faFileLines,
    href: "/dashboard/admin/verification",
    badge: "12 pending",
    badgeTone: "brand" as const,
  },
  {
    label: "Reports & Fraud",
    desc: "Scams, duplicates, suspicious activity",
    icon: faFlag,
    href: "/dashboard/admin/reports",
    badge: "8 open",
    badgeTone: "red" as const,
  },
  {
    label: "Users & Roles",
    desc: "Accounts, permissions, suspension, MFA",
    icon: faUsers,
    href: "/dashboard/admin/users",
  },
  {
    label: "Billing",
    desc: "Plans, invoices, refunds, promotions",
    icon: faWallet,
    href: "/dashboard/admin/billing",
  },
  {
    label: "Settings",
    desc: "Feature flags, policy, maintenance mode",
    icon: faGear,
    href: "/dashboard/admin/settings",
  },
];

const SYSTEM_HEALTH = [
  { label: "API uptime", value: "99.97%", status: "good" as const },
  { label: "Search latency (p95)", value: "142 ms", status: "good" as const },
  { label: "Moderation queue", value: "24 items", status: "warn" as const },
  { label: "Failed notifications", value: "3 retries", status: "warn" as const },
];

/* ============================================
   HELPERS
   ============================================ */

const typeIcon = (type: string) => {
  switch (type) {
    case "listing":
      return faBuilding;
    case "verification":
      return faFileLines;
    case "report":
      return faFlag;
    case "resolved":
      return faCircleCheck;
    case "moderation":
      return faShieldHalved;
    default:
      return faCircleInfo;
  }
};

const typeTone = (type: string) => {
  switch (type) {
    case "report":
      return "bg-red-50 text-red-600";
    case "resolved":
      return "bg-emerald-50 text-emerald-600";
    case "verification":
      return "bg-brand-50 text-brand-600";
    default:
      return "bg-neutral-100 text-neutral-600";
  }
};

/* ============================================
   PAGE
   ============================================ */

export default function AdminOverviewPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* =========================================
          HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Admin · Operations Overview
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-600">
                Live operational picture — pending items, SLA watches, and
                system health in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/admin/listings?status=pending"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />
                Review Listings
              </Link>
              <Link
                href="/dashboard/admin/reports"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faFlag} className="h-4 w-4" />
                Reports
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            KPI STRIP
            ========================================= */}
        <section aria-label="Key metrics">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KPIS.map((kpi) => {
              const Icon = kpi.icon;
              const isDown = kpi.trend === "down";
              return (
                <Link
                  key={kpi.id}
                  href={kpi.href}
                  className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition hover:border-brand-300"
                >
                  {/* Icon + delta */}
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white transition group-hover:bg-brand-500">
                      <FontAwesomeIcon icon={Icon} className="h-5 w-5" />
                    </span>
                    {kpi.delta && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
                          isDown
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-brand-50 text-brand-700"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={isDown ? faArrowDown : faArrowUp}
                          className="h-2.5 w-2.5"
                        />
                        {kpi.delta}
                      </span>
                    )}
                  </div>

                  {/* Value + label */}
                  <p className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                    {kpi.value}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wider text-neutral-500">
                    {kpi.title}
                  </p>

                  {/* Hint + SLA */}
                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-neutral-100 pt-4">
                    <span className="truncate text-xs font-medium text-neutral-600">
                      {kpi.hint}
                    </span>
                    {kpi.slaBreach ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-red-50 px-2 py-1 text-[11px] font-black text-red-700">
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          className="h-2.5 w-2.5"
                        />
                        SLA
                      </span>
                    ) : kpi.target !== "—" ? (
                      <span className="shrink-0 text-[11px] font-bold text-neutral-400">
                        {kpi.target}
                      </span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* =========================================
            MAIN GRID
            ========================================= */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* LEFT (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* SLA Watchlist */}
            <section
              aria-label="SLA watchlist"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-6 py-5">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      01
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      SLA Watchlist
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Items approaching or past their service target
                  </p>
                </div>
                <Link
                  href="/dashboard/admin/sla"
                  className="shrink-0 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  View all
                </Link>
              </header>

              <ul className="divide-y divide-neutral-100">
                {SLA_WATCH.map((item) => {
                  const isHigh = item.severity === "high";
                  const isMedium = item.severity === "medium";
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 px-6 py-4 transition hover:bg-neutral-50"
                      >
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                            item.breach
                              ? "bg-red-500"
                              : isHigh
                              ? "bg-brand-500"
                              : isMedium
                              ? "bg-neutral-400"
                              : "bg-neutral-300"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-bold text-ink">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-sm text-neutral-500">
                            {item.count} item{item.count !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
                            item.breach
                              ? "bg-red-50 text-red-700"
                              : isHigh
                              ? "bg-brand-50 text-brand-700"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {item.due}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Recent Activity */}
            <section
              aria-label="Recent activity"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-6 py-5">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      02
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Recent Activity
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Latest platform events from moderation and support
                  </p>
                </div>
                <Link
                  href="/dashboard/admin/audit"
                  className="shrink-0 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  View audit log
                </Link>
              </header>

              <ul className="divide-y divide-neutral-100">
                {ACTIVITY.map((a) => {
                  const Icon = typeIcon(a.type);
                  const tone = typeTone(a.type);
                  return (
                    <li key={a.id}>
                      <Link
                        href={a.href}
                        className="group flex items-start gap-4 px-6 py-4 transition hover:bg-neutral-50"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}
                        >
                          <FontAwesomeIcon
                            icon={Icon}
                            className="h-4 w-4"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-relaxed text-ink sm:text-base">
                            <span className="font-bold">{a.actor}</span>{" "}
                            <span className="text-xs font-medium text-neutral-500">
                              {a.role}
                            </span>
                          </p>
                          <p className="mt-1 text-sm text-neutral-600">
                            {a.action}{" "}
                            <span className="font-semibold text-ink">
                              {a.target}
                            </span>
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-400">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-2.5 w-2.5"
                            />
                            {a.time}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="mt-3 h-3.5 w-3.5 shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Modules */}
            <section
              aria-label="Admin modules"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    03
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    Admin Modules
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  Jump into any module — everything is one click away
                </p>
              </header>

              <div className="p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {MODULES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-brand-300 hover:bg-brand-50/40"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-white transition group-hover:bg-brand-500">
                          <FontAwesomeIcon
                            icon={Icon}
                            className="h-4 w-4"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-bold text-ink">
                              {item.label}
                            </p>
                            {item.badge && (
                              <span
                                className={`shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                                  item.badgeTone === "red"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-brand-100 text-brand-800"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm leading-snug text-neutral-600">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT (1/3) */}
          <aside className="space-y-6">
            {/* System Health */}
            <section
              aria-label="System health"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    04
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-ink">
                    System Health
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  Live infrastructure and queue status
                </p>
              </header>
              <ul className="divide-y divide-neutral-100">
                {SYSTEM_HEALTH.map((h) => {
                  const isWarn = h.status === "warn";
                  return (
                    <li
                      key={h.label}
                      className="flex items-center justify-between gap-3 px-6 py-4"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            isWarn ? "bg-brand-500" : "bg-emerald-500"
                          }`}
                        />
                        <span className="truncate text-sm font-semibold text-neutral-700">
                          {h.label}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 text-base font-black ${
                          isWarn ? "text-brand-600" : "text-ink"
                        }`}
                      >
                        {h.value}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-neutral-100 px-6 py-4">
                <Link
                  href="/dashboard/admin/settings"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  Open operations console
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3 w-3"
                  />
                </Link>
              </div>
            </section>

            {/* Fraud & Compliance — BLACK anchor */}
            <section
              aria-label="Compliance"
              className="overflow-hidden rounded-xl bg-ink"
            >
              <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-400">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="h-4 w-4"
                    />
                  </span>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-white">
                      Fraud & Compliance
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      3 active scam reports — reviewed same day per policy
                    </p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-white/10 border-t border-white/10">
                <Link
                  href="/dashboard/admin/reports?filter=scam"
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-neutral-300 transition hover:bg-white/5 hover:text-white"
                >
                  <span>Scam reports</span>
                  <span className="rounded-sm bg-red-500/20 px-2 py-0.5 text-[11px] font-black text-red-300">
                    3 open
                  </span>
                </Link>
                <Link
                  href="/dashboard/admin/users?filter=suspended"
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-neutral-300 transition hover:bg-white/5 hover:text-white"
                >
                  <span>Suspended accounts</span>
                  <span className="rounded-sm bg-white/10 px-2 py-0.5 text-[11px] font-black text-neutral-300">
                    4
                  </span>
                </Link>
                <Link
                  href="/dashboard/admin/users?filter=privacy-requests"
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-neutral-300 transition hover:bg-white/5 hover:text-white"
                >
                  <span>Privacy requests</span>
                  <span className="rounded-sm bg-white/10 px-2 py-0.5 text-[11px] font-black text-neutral-300">
                    2 pending
                  </span>
                </Link>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] px-6 py-3">
                <p className="text-[11px] leading-relaxed text-neutral-500">
                  Restricted area. All access is logged per policy.
                </p>
              </div>
            </section>

            {/* Quick Actions */}
            <section
              aria-label="Quick actions"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-5">
                <h2 className="text-lg font-black tracking-tight text-ink">
                  Quick Actions
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Most frequent tasks
                </p>
              </header>
              <div className="p-3">
                {[
                  {
                    href: "/dashboard/admin/listings?status=pending",
                    icon: faBuilding,
                    label: "Review pending listings",
                    count: "24",
                    tone: "brand" as const,
                  },
                  {
                    href: "/dashboard/admin/verification",
                    icon: faFileLines,
                    label: "Verify agents",
                    count: "12",
                    tone: "brand" as const,
                  },
                  {
                    href: "/dashboard/admin/reports",
                    icon: faFlag,
                    label: "Review reports",
                    count: "8",
                    tone: "red" as const,
                  },
                  {
                    href: "/dashboard/admin/support",
                    icon: faHeadset,
                    label: "Support tickets",
                    count: "5",
                    tone: "neutral" as const,
                  },
                  {
                    href: "/dashboard/admin/users",
                    icon: faUserShield,
                    label: "Manage users",
                    count: null,
                    tone: "neutral" as const,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-md px-3 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <FontAwesomeIcon
                          icon={Icon}
                          className="h-3.5 w-3.5 shrink-0 text-neutral-400"
                        />
                        <span className="truncate">{item.label}</span>
                      </span>
                      {item.count ? (
                        <span
                          className={`shrink-0 rounded-sm px-2 py-0.5 text-[11px] font-black ${
                            item.tone === "red"
                              ? "bg-red-50 text-red-700"
                              : item.tone === "brand"
                              ? "bg-brand-50 text-brand-700"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {item.count}
                        </span>
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="h-2.5 w-2.5 shrink-0 text-neutral-300"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}