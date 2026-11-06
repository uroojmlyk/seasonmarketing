"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faShieldHalved,
  faBell,
  faCodeBranch,
  faSave,
  faTriangleExclamation,
  faArrowLeft,
  faCircleCheck,
  faCircleInfo,
  faLock,
  faKey,
  faClock,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type TabId = "general" | "security" | "notifications" | "features";

interface Tab {
  id: TabId;
  label: string;
  desc: string;
  icon: any;
}

const TABS: Tab[] = [
  {
    id: "general",
    label: "General",
    desc: "Platform name, contact info",
    icon: faGear,
  },
  {
    id: "security",
    label: "Security",
    desc: "MFA, sessions, password policy",
    icon: faShieldHalved,
  },
  {
    id: "notifications",
    label: "Notifications",
    desc: "Admin alert preferences",
    icon: faBell,
  },
  {
    id: "features",
    label: "Feature Flags",
    desc: "Enable or disable features",
    icon: faCodeBranch,
  },
];

/* ============================================
   SMALL COMPONENTS
   ============================================ */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition ${
        checked ? "bg-brand-500" : "bg-neutral-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-1 ring-black/5 transition ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SavedBanner({ show }: { show: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 transition-all duration-300 ${
        show
          ? "mb-4 max-h-20 px-4 py-3 opacity-100"
          : "mb-0 max-h-0 border-0 py-0 opacity-0"
      }`}
    >
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="h-4 w-4 shrink-0 text-emerald-600"
      />
      <p className="text-sm font-semibold text-emerald-800">
        Settings saved successfully.
      </p>
    </div>
  );
}

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xs font-black text-neutral-400">
          {number}
        </span>
        <h3 className="text-lg font-black tracking-tight text-ink">
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}

/* ============================================
   PAGE
   ============================================ */

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [savedAt, setSavedAt] = useState<Record<TabId, boolean>>({
    general: false,
    security: false,
    notifications: false,
    features: false,
  });

  // General tab state
  const [general, setGeneral] = useState({
    platformName: "Season Marketing",
    supportEmail: "support@seasonmarketing.pk",
    contactPhone: "+92 300 1234567",
    officeAddress: "Blue Area, Islamabad",
    manualReview: true,
    flagDuplicates: true,
  });

  // Security tab state
  const [security, setSecurity] = useState({
    mfaRequired: true,
    sessionTimeout: "30 minutes",
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: "new-listing",
      title: "New listing submitted",
      desc: "Get an alert when a new property is posted.",
      checked: true,
    },
    {
      id: "fraud",
      title: "Fraud report flagged",
      desc: "High priority alert when a user reports a scam.",
      checked: true,
    },
    {
      id: "new-user",
      title: "New user registration",
      desc: "Alert when a new agent or agency signs up.",
      checked: false,
    },
    {
      id: "payment",
      title: "Subscription payment",
      desc: "Alert when a user pays for a plan.",
      checked: false,
    },
  ]);

  // Feature flags state
  const [features, setFeatures] = useState([
    {
      id: "map",
      title: "Map Search",
      desc: "Allow users to search properties on the map.",
      active: true,
    },
    {
      id: "compare",
      title: "Compare Properties",
      desc: "Let users compare up to 4 listings side-by-side.",
      active: false,
    },
    {
      id: "saved",
      title: "Saved Searches",
      desc: "Allow users to save their search filters.",
      active: true,
    },
    {
      id: "agency",
      title: "Agency Profiles",
      desc: "Showcase verified agencies with their inventory.",
      active: true,
    },
  ]);

  const markSaved = (tab: TabId) => {
    setSavedAt((prev) => ({ ...prev, [tab]: true }));
    setTimeout(() => {
      setSavedAt((prev) => ({ ...prev, [tab]: false }));
    }, 2500);
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
                Admin · System Settings
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Settings
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Configure platform behavior, security policies, and admin
                notifications. Changes take effect immediately.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/admin"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* =========================================
              SIDEBAR NAV
              ========================================= */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    Sections
                  </p>
                </div>
                <nav className="p-2" aria-label="Settings sections">
                  {TABS.map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        aria-current={active ? "page" : undefined}
                        className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                          active
                            ? "bg-brand-50"
                            : "hover:bg-neutral-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition ${
                            active
                              ? "bg-brand-500 text-white"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={tab.icon}
                            className="h-3.5 w-3.5"
                          />
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-bold ${
                              active ? "text-brand-700" : "text-ink"
                            }`}
                          >
                            {tab.label}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
                            {tab.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Info box */}
              <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Audit logging
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                      All settings changes are logged with admin identity,
                      timestamp, and previous value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =========================================
              CONTENT
              ========================================= */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {/* =========================================
                  GENERAL TAB
                  ========================================= */}
              {activeTab === "general" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner show={savedAt.general} />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      General Settings
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Basic information and public contact details.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Platform identity"
                      subtitle="Shown across the website, emails, and legal pages."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="platform-name"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Platform name
                        </label>
                        <input
                          id="platform-name"
                          type="text"
                          value={general.platformName}
                          onChange={(e) =>
                            setGeneral({
                              ...general,
                              platformName: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="support-email"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Support email
                        </label>
                        <input
                          id="support-email"
                          type="email"
                          value={general.supportEmail}
                          onChange={(e) =>
                            setGeneral({
                              ...general,
                              supportEmail: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Contact phone
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={general.contactPhone}
                          onChange={(e) =>
                            setGeneral({
                              ...general,
                              contactPhone: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="office-address"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Office address
                        </label>
                        <input
                          id="office-address"
                          type="text"
                          value={general.officeAddress}
                          onChange={(e) =>
                            setGeneral({
                              ...general,
                              officeAddress: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <SectionHeader
                      number="02"
                      title="Listing moderation"
                      subtitle="Default policy for all new listings."
                    />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                        <div>
                          <p className="text-sm font-bold text-ink">
                            Require manual review
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-600">
                            All new listings wait for admin approval before
                            going live.
                          </p>
                        </div>
                        <Toggle
                          checked={general.manualReview}
                          onChange={(v) =>
                            setGeneral({ ...general, manualReview: v })
                          }
                          label="Require manual review"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                        <div>
                          <p className="text-sm font-bold text-ink">
                            Auto-flag duplicates
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-600">
                            Automatically detect and flag listings that match
                            existing properties.
                          </p>
                        </div>
                        <Toggle
                          checked={general.flagDuplicates}
                          onChange={(v) =>
                            setGeneral({ ...general, flagDuplicates: v })
                          }
                          label="Auto-flag duplicates"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={() => markSaved("general")}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================
                  SECURITY TAB
                  ========================================= */}
              {activeTab === "security" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner show={savedAt.security} />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Security & Access
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Control login policies and admin account protection.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Authentication"
                      subtitle="Applies to all admin and staff accounts."
                    />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                            <FontAwesomeIcon
                              icon={faLock}
                              className="h-3.5 w-3.5"
                            />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-ink">
                              Require MFA for admins
                            </p>
                            <p className="mt-0.5 text-xs text-neutral-600">
                              All staff accounts must use a second factor.
                            </p>
                          </div>
                        </div>
                        <Toggle
                          checked={security.mfaRequired}
                          onChange={(v) =>
                            setSecurity({ ...security, mfaRequired: v })
                          }
                          label="Require MFA"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-3.5 w-3.5"
                            />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-ink">
                              Session timeout
                            </p>
                            <p className="mt-0.5 text-xs text-neutral-600">
                              Auto-logout inactive admins.
                            </p>
                          </div>
                        </div>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) =>
                            setSecurity({
                              ...security,
                              sessionTimeout: e.target.value,
                            })
                          }
                          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        >
                          <option value="15 minutes">15 minutes</option>
                          <option value="30 minutes">30 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="4 hours">4 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <SectionHeader
                      number="02"
                      title="Password policy"
                      subtitle="Minimum strength required for all admin passwords."
                    />
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-start gap-3">
                        <FontAwesomeIcon
                          icon={faTriangleExclamation}
                          className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                        />
                        <div>
                          <p className="text-sm font-bold text-amber-900">
                            Active policy
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-amber-800">
                            Admin passwords must be at least{" "}
                            <strong>12 characters</strong>, include a number,
                            an uppercase letter, and a symbol. Passwords expire
                            every 90 days.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                          <FontAwesomeIcon
                            icon={faKey}
                            className="h-3.5 w-3.5"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-ink">
                            Force password reset on next login
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-600">
                            For all admin accounts after a security incident.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
                      >
                        Trigger reset
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={() => markSaved("security")}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================
                  NOTIFICATIONS TAB
                  ========================================= */}
              {activeTab === "notifications" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner show={savedAt.notifications} />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Notification Preferences
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Choose which alerts admins receive by email and in-app.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Alert types"
                      subtitle="Applies to all admins unless overridden per user."
                    />
                    <ul className="divide-y divide-neutral-100">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className="flex items-center justify-between gap-3 py-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-ink">
                              {n.title}
                            </p>
                            <p className="mt-0.5 text-xs text-neutral-600">
                              {n.desc}
                            </p>
                          </div>
                          <Toggle
                            checked={n.checked}
                            onChange={(v) =>
                              setNotifications((prev) =>
                                prev.map((x) =>
                                  x.id === n.id
                                    ? { ...x, checked: v }
                                    : x
                                )
                              )
                            }
                            label={n.title}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={() => markSaved("notifications")}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================
                  FEATURE FLAGS TAB
                  ========================================= */}
              {activeTab === "features" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner show={savedAt.features} />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Feature Flags
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Enable or disable features across the platform. Changes
                      apply immediately.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Public features"
                      subtitle="Visible to all users on the website."
                    />
                    <ul className="space-y-3">
                      {features.map((f) => (
                        <li
                          key={f.id}
                          className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4"
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                                f.active
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-neutral-100 text-neutral-500"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={
                                  f.active ? faCircleCheck : faCircleExclamation
                                }
                                className="h-3.5 w-3.5"
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-ink">
                                {f.title}
                              </p>
                              <p className="mt-0.5 text-xs text-neutral-600">
                                {f.desc}
                              </p>
                            </div>
                          </div>
                          <Toggle
                            checked={f.active}
                            onChange={(v) =>
                              setFeatures((prev) =>
                                prev.map((x) =>
                                  x.id === f.id ? { ...x, active: v } : x
                                )
                              )
                            }
                            label={f.title}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={() => markSaved("features")}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}