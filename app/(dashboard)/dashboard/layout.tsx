"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBars,
  faXmark,
  faGauge,
  faUsers,
  faBuilding,
  faFileLines,
  faFlag,
  faWallet,
  faGear,
  faRightFromBracket,
  faHeart,
  faEnvelope,
  faUserTie,
  faCrown,
  faBook,
  faChartLine,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { UserRole } from "@/lib/constants/auth";

/* ============================================
   TYPES & DATA
   ============================================ */

interface MenuItem {
  name: string;
  href: string;
  icon: IconDefinition;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const ROLE_LABELS: Record<UserRole, string> = {
  buyer_tenant: "Buyer / Tenant",
  owner: "Owner / Landlord",
  agent: "Agent",
  agency_admin: "Agency Admin",
  developer: "Developer",
  content_editor: "Content Editor",
  moderator: "Moderator",
  support_officer: "Support Officer",
  finance_operator: "Finance Operator",
  super_admin: "Super Admin",
};

// Har role ke liye grouped menus
const ROLE_MENUS: Record<UserRole, MenuGroup[]> = {
  buyer_tenant: [
    {
      label: "Your activity",
      items: [
        { name: "Saved Properties", href: "/dashboard/buyer", icon: faHeart },
        {
          name: "My Enquiries",
          href: "/dashboard/buyer/enquiries",
          icon: faEnvelope,
        },
        {
          name: "Saved Searches",
          href: "/dashboard/buyer/searches",
          icon: faBook,
        },
      ],
    },
  ],
  owner: [
    {
      label: "Listings",
      items: [
        { name: "My Properties", href: "/dashboard/owner", icon: faBuilding },
        {
          name: "Post Property",
          href: "/dashboard/listings/new",
          icon: faHouse,
        },
      ],
    },
    {
      label: "Leads",
      items: [
        {
          name: "Enquiries",
          href: "/dashboard/owner/leads",
          icon: faEnvelope,
        },
      ],
    },
  ],
  agent: [
    {
      label: "Overview",
      items: [{ name: "Dashboard", href: "/dashboard/agent", icon: faGauge }],
    },
    {
      label: "Listings & leads",
      items: [
        {
          name: "Leads",
          href: "/dashboard/agent/leads",
          icon: faEnvelope,
        },
        {
          name: "My Listings",
          href: "/dashboard/agent/listings",
          icon: faBuilding,
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          name: "Subscription",
          href: "/dashboard/agent/subscription",
          icon: faCrown,
        },
      ],
    },
  ],
  agency_admin: [
    {
      label: "Overview",
      items: [{ name: "Dashboard", href: "/dashboard/agency", icon: faGauge }],
    },
    {
      label: "Team & leads",
      items: [
        {
          name: "Leads",
          href: "/dashboard/agent/leads",
          icon: faEnvelope,
        },
        {
          name: "Team Management",
          href: "/dashboard/agency/team",
          icon: faUsers,
        },
      ],
    },
  ],
  developer: [
    {
      label: "Projects",
      items: [
        { name: "My Projects", href: "/dashboard/developer", icon: faBuilding },
        {
          name: "Post Project",
          href: "/dashboard/developer/new",
          icon: faHouse,
        },
      ],
    },
  ],
  content_editor: [
    {
      label: "Content",
      items: [
        {
          name: "Content & Guides",
          href: "/dashboard/admin/content",
          icon: faBook,
        },
        {
          name: "SEO Management",
          href: "/dashboard/admin/seo",
          icon: faChartLine,
        },
      ],
    },
  ],
  moderator: [
    {
      label: "Moderation",
      items: [
        {
          name: "Verification Queue",
          href: "/dashboard/admin/verification",
          icon: faFileLines,
        },
        {
          name: "Reports & Fraud",
          href: "/dashboard/admin/reports",
          icon: faFlag,
        },
      ],
    },
  ],
  support_officer: [
    {
      label: "Support",
      items: [
        {
          name: "Support Tickets",
          href: "/dashboard/admin/support",
          icon: faEnvelope,
        },
      ],
    },
  ],
  finance_operator: [
    {
      label: "Finance",
      items: [
        {
          name: "Billing & Payments",
          href: "/dashboard/admin/billing",
          icon: faWallet,
        },
      ],
    },
  ],
  super_admin: [
    {
      label: "Overview",
      items: [
        { name: "Dashboard", href: "/dashboard/admin", icon: faGauge },
      ],
    },
    {
      label: "Operations",
      items: [
        {
          name: "Listings",
          href: "/dashboard/admin/listings",
          icon: faBuilding,
        },
        {
          name: "Verification",
          href: "/dashboard/admin/verification",
          icon: faFileLines,
        },
        {
          name: "Reports & Fraud",
          href: "/dashboard/admin/reports",
          icon: faFlag,
        },
      ],
    },
    {
      label: "People & access",
      items: [
        {
          name: "Users & Roles",
          href: "/dashboard/admin/users",
          icon: faUsers,
        },
      ],
    },
    {
      label: "Content & finance",
      items: [
        { name: "Billing", href: "/dashboard/admin/billing", icon: faWallet },
      ],
    },
    {
      label: "System",
      items: [
        { name: "Settings", href: "/dashboard/admin/settings", icon: faGear },
      ],
    },
  ],
};

const ALL_ROLES: UserRole[] = [
  "buyer_tenant",
  "owner",
  "agent",
  "agency_admin",
  "developer",
  "content_editor",
  "moderator",
  "support_officer",
  "finance_operator",
  "super_admin",
];

/* ============================================
   HELPERS
   ============================================ */

function isItemActive(pathname: string, href: string) {
  if (
    href === "/dashboard/admin" ||
    href === "/dashboard/buyer" ||
    href === "/dashboard/agent" ||
    href === "/dashboard/owner" ||
    href === "/dashboard/agency" ||
    href === "/dashboard/developer"
  ) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(href + "/");
}

/* ============================================
   SIDEBAR
   ============================================ */

function SidebarContent({
  role,
  menuGroups,
  pathname,
  onItemClick,
  onChangeRole,
}: {
  role: UserRole;
  menuGroups: MenuGroup[];
  pathname: string;
  onItemClick?: () => void;
  onChangeRole: (r: UserRole) => void;
}) {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-ink text-neutral-400">
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <FontAwesomeIcon
          icon={faHouse}
          className="h-9 w-9 shrink-0 text-brand-500"
        />
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          Season<span className="text-brand-500">Panel</span>
        </span>
      </div>

      {/* Role chip + switcher */}
      <div className="border-b border-white/10 px-3 py-3">
        <button
          type="button"
          onClick={() => setRoleMenuOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2.5 text-left transition hover:bg-white/10"
          aria-expanded={roleMenuOpen}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-500/15 text-brand-400">
            <FontAwesomeIcon icon={faUserTie} className="h-3 w-3" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Signed in as
            </p>
            <p className="truncate text-xs font-bold text-white">
              {ROLE_LABELS[role]}
            </p>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`h-3 w-3 shrink-0 text-neutral-500 transition ${
              roleMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {roleMenuOpen && (
          <div className="mt-1.5 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-[#0a0a0a] py-1">
            {ALL_ROLES.map((r) => {
              const active = r === role;
              return (
                <button
                  key={r}
                  onClick={() => {
                    onChangeRole(r);
                    setRoleMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                    active
                      ? "bg-brand-500/10 font-bold text-brand-400"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="truncate">{ROLE_LABELS[r]}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Menu groups */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4"
        aria-label="Dashboard navigation"
      >
        <div className="space-y-5">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isItemActive(pathname, item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={onItemClick}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                          active
                            ? "bg-brand-500 text-white"
                            : "text-neutral-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={`h-4 w-4 shrink-0 ${
                            active
                              ? "text-white"
                              : "text-neutral-500 group-hover:text-neutral-300"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          <FontAwesomeIcon
            icon={faHouse}
            className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-neutral-300"
          />
          Back to site
        </Link>
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-neutral-300"
          />
          Sign out
        </button>
        <p className="mt-2 px-3 text-[10px] leading-relaxed text-neutral-600">
          All actions are logged per policy.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   SHELL — uses usePathname (Suspense-wrapped)
   ============================================ */

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("buyer_tenant");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    if (savedRole && ROLE_MENUS[savedRole]) {
      setRole(savedRole);
    }
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menuGroups = useMemo(
    () => ROLE_MENUS[role] ?? ROLE_MENUS.buyer_tenant,
    [role]
  );

  const handleChangeRole = (r: UserRole) => {
    setRole(r);
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", r);
    }
  };

  const pageTitle = useMemo(() => {
    for (const group of menuGroups) {
      for (const item of group.items) {
        if (isItemActive(pathname, item.href)) return item.name;
      }
    }
    return "Dashboard";
  }, [menuGroups, pathname]);

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden w-64 shrink-0 border-r border-neutral-800 lg:flex lg:flex-col"
        aria-label="Sidebar"
      >
        <SidebarContent
          role={role}
          menuGroups={menuGroups}
          pathname={pathname}
          onChangeRole={handleChangeRole}
        />
      </aside>

      {/* MOBILE DRAWER */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform border-r border-neutral-800 transition-transform duration-300 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
        aria-hidden={!isSidebarOpen}
      >
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu"
          className="absolute right-3 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
        >
          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
        </button>
        <SidebarContent
          role={role}
          menuGroups={menuGroups}
          pathname={pathname}
          onItemClick={() => setIsSidebarOpen(false)}
          onChangeRole={handleChangeRole}
        />
      </aside>

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white/95 px-3 backdrop-blur-sm sm:h-16 sm:px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition hover:bg-neutral-100"
          >
            <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              {ROLE_LABELS[role]}
            </p>
            <p className="truncate text-sm font-bold text-ink">{pageTitle}</p>
          </div>

          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition hover:bg-neutral-100"
            aria-label="Back to site"
          >
            <FontAwesomeIcon icon={faHouse} className="h-4 w-4" />
          </Link>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

/* ============================================
   DEFAULT EXPORT — Suspense wrapper
   ============================================ */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
            <p className="text-sm font-medium text-neutral-500">Loading…</p>
          </div>
        </div>
      }
    >
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}




