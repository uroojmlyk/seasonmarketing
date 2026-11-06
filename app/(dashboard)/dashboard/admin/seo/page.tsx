"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faRobot,
  faSitemap,
  faArrowsRotate,
  faCircleCheck,
  faTriangleExclamation,
  faSave,
  faCode,
  faCircleInfo,
  faPlus,
  faXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type TabId = "general" | "sitemap" | "redirects";

interface Tab {
  id: TabId;
  label: string;
  desc: string;
  icon: any;
}

interface Redirect {
  id: string;
  from: string;
  to: string;
  type: "301" | "302";
}

const TABS: Tab[] = [
  {
    id: "general",
    label: "General SEO",
    desc: "Global meta tags and preview",
    icon: faGlobe,
  },
  {
    id: "sitemap",
    label: "Sitemap & Robots",
    desc: "Crawl and indexing policy",
    icon: faSitemap,
  },
  {
    id: "redirects",
    label: "URL Redirects",
    desc: "301 and 302 redirect rules",
    icon: faArrowsRotate,
  },
];

/* ============================================
   SMALL COMPONENTS
   ============================================ */

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

function SavedBanner({ show, message }: { show: boolean; message: string }) {
  return (
    <div
      className={`mb-4 flex items-center gap-2 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 transition-all duration-300 ${
        show
          ? "max-h-20 px-4 py-3 opacity-100"
          : "max-h-0 border-0 px-4 py-0 opacity-0"
      }`}
    >
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="h-4 w-4 shrink-0 text-emerald-600"
      />
      <p className="text-sm font-semibold text-emerald-800">{message}</p>
    </div>
  );
}

/* ============================================
   PAGE
   ============================================ */

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [savedAt, setSavedAt] = useState<Record<TabId, boolean>>({
    general: false,
    sitemap: false,
    redirects: false,
  });

  // General SEO
  const [general, setGeneral] = useState({
    title:
      "Season Marketing | Buy, Rent and Sell Property in Pakistan",
    description:
      "Search houses, plots, commercial properties and new projects across Pakistan. Verified listings and direct owner contact.",
    searchConsole: "",
  });

  // Sitemap
  const [sitemapGeneratedAt, setSitemapGeneratedAt] = useState(
    "Today at 09:30 AM"
  );
  const [sitemapRegenerating, setSitemapRegenerating] = useState(false);
  const [robots, setRobots] = useState(
    `User-agent: *\nAllow: /\nDisallow: /dashboard/\nDisallow: /admin/\n\nSitemap: https://seasonmarketing.pk/sitemap.xml`
  );

  // Redirects
  const [redirects, setRedirects] = useState<Redirect[]>([
    {
      id: "r1",
      from: "/old-properties",
      to: "/properties",
      type: "301",
    },
    {
      id: "r2",
      from: "/lahore-rent",
      to: "/properties?city=lahore&intent=rent",
      type: "301",
    },
  ]);

  const titleLen = general.title.length;
  const descLen = general.description.length;

  const titleTone =
    titleLen >= 30 && titleLen <= 60
      ? "text-emerald-600"
      : titleLen > 60
      ? "text-amber-600"
      : "text-neutral-500";

  const descTone =
    descLen >= 120 && descLen <= 160
      ? "text-emerald-600"
      : descLen > 160
      ? "text-amber-600"
      : "text-neutral-500";

  const markSaved = (tab: TabId) => {
    setSavedAt((prev) => ({ ...prev, [tab]: true }));
    setTimeout(() => {
      setSavedAt((prev) => ({ ...prev, [tab]: false }));
    }, 2500);
  };

  const regenerateSitemap = () => {
    setSitemapRegenerating(true);
    setTimeout(() => {
      setSitemapGeneratedAt("Just now");
      setSitemapRegenerating(false);
      markSaved("sitemap");
    }, 900);
  };

  const addRedirect = () => {
    setRedirects((prev) => [
      ...prev,
      {
        id: `r${Date.now()}`,
        from: "",
        to: "",
        type: "301",
      },
    ]);
  };

  const removeRedirect = (id: string) => {
    setRedirects((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRedirect = (
    id: string,
    field: keyof Redirect,
    value: string
  ) => {
    setRedirects((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
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
                Admin · SEO Management
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                SEO Management
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Optimize your website for search engines. Changes take effect on
                next crawl.
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
                <nav className="p-2" aria-label="SEO sections">
                  {TABS.map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        aria-current={active ? "page" : undefined}
                        className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                          active ? "bg-brand-50" : "hover:bg-neutral-50"
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
                      Search engine policy
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                      Changes apply globally. Avoid blocking property pages from
                      being indexed — that removes listings from Google.
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
                  GENERAL SEO TAB
                  ========================================= */}
              {activeTab === "general" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner
                    show={savedAt.general}
                    message="SEO settings saved successfully."
                  />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      General SEO
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Default meta tags shown on pages without custom settings.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Global meta tags"
                      subtitle="These appear on pages that don't have custom meta tags."
                    />
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="seo-title"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Default meta title
                        </label>
                        <input
                          id="seo-title"
                          type="text"
                          value={general.title}
                          onChange={(e) =>
                            setGeneral({ ...general, title: e.target.value })
                          }
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <p className="text-xs text-neutral-500">
                            Recommended: 30–60 characters
                          </p>
                          <p className={`text-xs font-bold ${titleTone}`}>
                            {titleLen} / 60
                          </p>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="seo-desc"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Default meta description
                        </label>
                        <textarea
                          id="seo-desc"
                          rows={3}
                          value={general.description}
                          onChange={(e) =>
                            setGeneral({
                              ...general,
                              description: e.target.value,
                            })
                          }
                          className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <p className="text-xs text-neutral-500">
                            Recommended: 120–160 characters
                          </p>
                          <p className={`text-xs font-bold ${descTone}`}>
                            {descLen} / 160
                          </p>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="seo-console"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Google Search Console verification
                        </label>
                        <div className="relative mt-2">
                          <FontAwesomeIcon
                            icon={faCode}
                            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
                          />
                          <input
                            id="seo-console"
                            type="text"
                            value={general.searchConsole}
                            onChange={(e) =>
                              setGeneral({
                                ...general,
                                searchConsole: e.target.value,
                              })
                            }
                            placeholder="Paste your verification meta tag code..."
                            className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-mono text-ink outline-none transition placeholder:font-sans placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <SectionHeader
                      number="02"
                      title="Google search preview"
                      subtitle="Live preview of how your page may appear in search results."
                    />
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                      <p className="flex items-center gap-1.5 text-xs text-neutral-600">
                        <FontAwesomeIcon
                          icon={faGlobe}
                          className="h-3 w-3 text-neutral-400"
                        />
                        https://seasonmarketing.pk
                      </p>
                      <p className="mt-1 line-clamp-2 text-base font-medium text-[#1a0dab] sm:text-lg">
                        {general.title || "Your title will appear here"}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-700">
                        {general.description ||
                          "Your meta description will appear here."}
                      </p>
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
                  SITEMAP TAB
                  ========================================= */}
              {activeTab === "sitemap" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner
                    show={savedAt.sitemap}
                    message="Sitemap and robots settings saved."
                  />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Sitemap & Robots
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Control how search engines crawl and index your site.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Sitemap status"
                      subtitle="Sitemap is auto-generated from published listings and pages."
                    />
                    <div className="flex flex-col gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        />
                        <div>
                          <p className="text-sm font-bold text-emerald-900">
                            Sitemap is up to date
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-800">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-2.5 w-2.5"
                            />
                            Last generated: {sitemapGeneratedAt}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={regenerateSitemap}
                        disabled={sitemapRegenerating}
                        className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FontAwesomeIcon
                          icon={faArrowsRotate}
                          className={`h-3 w-3 ${
                            sitemapRegenerating ? "animate-spin" : ""
                          }`}
                        />
                        {sitemapRegenerating ? "Regenerating…" : "Regenerate"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <SectionHeader
                      number="02"
                      title="robots.txt"
                      subtitle="Directives applied to all search engines."
                    />
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faRobot}
                        className="pointer-events-none absolute left-3.5 top-3.5 h-3.5 w-3.5 text-neutral-400"
                      />
                      <textarea
                        rows={8}
                        value={robots}
                        onChange={(e) => setRobots(e.target.value)}
                        className="w-full resize-none rounded-lg border border-neutral-200 bg-white py-3 pl-10 pr-3.5 font-mono text-sm leading-relaxed text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      />
                      <div>
                        <p className="text-sm font-bold text-amber-900">
                          Important
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-amber-800">
                          Do not block search engines from the homepage or
                          property pages. Doing so will remove your listings from
                          Google.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={() => markSaved("sitemap")}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================
                  REDIRECTS TAB
                  ========================================= */}
              {activeTab === "redirects" && (
                <div className="p-6 sm:p-8">
                  <SavedBanner
                    show={savedAt.redirects}
                    message="Redirect rules saved."
                  />

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      URL Redirects
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Redirect old URLs to new pages. Use 301 for permanent
                      changes.
                    </p>
                  </div>

                  <div className="mt-6">
                    <SectionHeader
                      number="01"
                      title="Active redirects"
                      subtitle="Applied at the server edge on next deploy."
                    />

                    {redirects.length === 0 ? (
                      <div className="flex flex-col items-center rounded-lg border border-dashed border-neutral-300 px-6 py-10 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                          <FontAwesomeIcon
                            icon={faArrowsRotate}
                            className="h-5 w-5"
                          />
                        </span>
                        <p className="mt-3 text-sm font-bold text-ink">
                          No redirects yet
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Add your first rule to begin.
                        </p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {redirects.map((rule) => (
                          <li
                            key={rule.id}
                            className="grid gap-2 rounded-lg border border-neutral-200 bg-white p-3 sm:grid-cols-[1fr_auto_1fr_auto_auto] sm:items-center"
                          >
                            <div>
                              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 sm:hidden">
                                From
                              </label>
                              <input
                                type="text"
                                value={rule.from}
                                onChange={(e) =>
                                  updateRedirect(
                                    rule.id,
                                    "from",
                                    e.target.value
                                  )
                                }
                                placeholder="/old-path"
                                className="w-full rounded-md border border-neutral-200 bg-white px-2.5 py-2 font-mono text-xs text-ink outline-none transition placeholder:font-sans placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                              />
                            </div>

                            <span
                              aria-hidden="true"
                              className="hidden text-neutral-400 sm:block"
                            >
                              →
                            </span>

                            <div>
                              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 sm:hidden">
                                To
                              </label>
                              <input
                                type="text"
                                value={rule.to}
                                onChange={(e) =>
                                  updateRedirect(
                                    rule.id,
                                    "to",
                                    e.target.value
                                  )
                                }
                                placeholder="/new-path"
                                className="w-full rounded-md border border-neutral-200 bg-white px-2.5 py-2 font-mono text-xs text-ink outline-none transition placeholder:font-sans placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 sm:hidden">
                                Type
                              </label>
                              <select
                                value={rule.type}
                                onChange={(e) =>
                                  updateRedirect(
                                    rule.id,
                                    "type",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-md border border-neutral-200 bg-white px-2.5 py-2 text-xs font-bold text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                              >
                                <option value="301">301 Permanent</option>
                                <option value="302">302 Temporary</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeRedirect(rule.id)}
                              aria-label="Remove redirect"
                              className="inline-flex h-9 items-center justify-center gap-1 rounded-md border border-red-200 bg-white px-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="h-3 w-3"
                              />
                              <span className="sm:hidden">Remove</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      type="button"
                      onClick={addRedirect}
                      className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-white px-4 text-sm font-bold text-neutral-600 transition hover:border-brand-500 hover:text-brand-600"
                    >
                      <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
                      Add redirect rule
                    </button>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={() => markSaved("redirects")}
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