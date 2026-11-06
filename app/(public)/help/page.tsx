"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEnvelope,
  faPhone,
  faLocationDot,
  faChevronDown,
  faShieldHalved,
  faCreditCard,
  faHouse,
  faUser,
  faClock,
  faCircleCheck,
  faArrowRight,
  faHeadset,
  faTriangleExclamation,
  faFileShield,
} from "@fortawesome/free-solid-svg-icons";

type Category = "all" | "safety" | "payments" | "listings" | "account";

interface FAQ {
  q: string;
  a: string;
  category: Exclude<Category, "all">;
}

const CATEGORIES: { key: Category; label: string; icon: any }[] = [
  { key: "all", label: "All Topics", icon: faCircleCheck },
  { key: "safety", label: "Safety", icon: faShieldHalved },
  { key: "payments", label: "Payments", icon: faCreditCard },
  { key: "listings", label: "Listings", icon: faHouse },
  { key: "account", label: "Account", icon: faUser },
];

const FAQS: FAQ[] = [
  {
    q: "How do I know if a listing is real?",
    a: "Look for the 'Availability Confirmed' tag and check the 'Last Updated' date. We also recommend meeting the owner or agent at the property and verifying documents independently before making any payment. Never pay an advance without seeing the property and paperwork in person.",
    category: "listings",
  },
  {
    q: "Does Season Marketing verify property titles?",
    a: "No. A listing on our platform is not government approval or proof of ownership. We perform identity and authority checks on agents, and we label listings clearly, but legal title verification must be done by you and your lawyer.",
    category: "safety",
  },
  {
    q: "How do I report a suspicious listing?",
    a: "Click the 'Report Listing' button on any property detail page. Our moderation team reviews every report within 24 hours. You can also email us directly at support@seasonmarketing.pk with the listing URL.",
    category: "safety",
  },
  {
    q: "Is my contact information safe?",
    a: "Yes. Your contact details are only revealed to the advertiser when you explicitly choose to send an enquiry. We do not sell your data to third parties, and you can delete your account at any time.",
    category: "account",
  },
  {
    q: "What payment methods are accepted?",
    a: "Season Marketing does not process property payments. Any payment for a property should be made directly to the verified owner or agent through documented bank transfer. Never pay in cash without a receipt.",
    category: "payments",
  },
  {
    q: "How do I post a property for sale or rent?",
    a: "Create a free account, go to your dashboard, and click 'Post Property'. You'll need to add photos, a price, and a location. Verified agents get a 'Verified' badge after CNIC and authority checks.",
    category: "listings",
  },
  {
    q: "Can I edit or delete my listing later?",
    a: "Yes. From your dashboard, open the listing and choose 'Edit' or 'Delete'. Deleted listings are removed from search within a few minutes. Editing requires re-approval if you change the price significantly.",
    category: "account",
  },
];

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchesCat = category === "all" || f.category === category;
      const matchesQuery =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* =========================================
          HERO — deep slate, soft glow (not pure black)
          ========================================= */}
      <section className="relative overflow-hidden bg-[#0f172a] pt-28 pb-24 sm:pt-32 sm:pb-28">
        {/* Background image + overlays */}
        <div
          className="absolute inset-0 bg-[url('/images/property-1.jpg')] bg-cover bg-center opacity-[0.10]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]"
          aria-hidden="true"
        />
        {/* Soft brand glow */}
        <div
          className="absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Support Centre
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            How can we <span className="text-brand-400">help</span> you today?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Answers to common questions, safety guidelines, and direct access to
            our support team — all in one place.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="group relative flex items-center rounded-2xl border border-white/10 bg-white p-1.5 shadow-2xl shadow-black/30 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="ml-3 h-4 w-4 shrink-0 text-slate-400 sm:ml-4 sm:h-5 sm:w-5"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for answers (e.g. 'payment', 'safety')..."
                aria-label="Search help articles"
                className="w-full border-none bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:py-3 sm:text-base"
              />
              <button
                type="button"
                className="hidden shrink-0 items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 sm:inline-flex"
              >
                Search
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Try{" "}
              <button
                onClick={() => setQuery("payment")}
                className="font-semibold text-brand-400 underline-offset-2 hover:underline"
              >
                payment
              </button>
              ,{" "}
              <button
                onClick={() => setQuery("safety")}
                className="font-semibold text-brand-400 underline-offset-2 hover:underline"
              >
                safety
              </button>{" "}
              or{" "}
              <button
                onClick={() => setQuery("report")}
                className="font-semibold text-brand-400 underline-offset-2 hover:underline"
              >
                report
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          TRUST BAR — soft warm card
          ========================================= */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-300/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { icon: faClock, title: "< 24 hours", desc: "Average response time" },
            { icon: faHeadset, title: "Mon–Fri, 9–6", desc: "Live support hours (PKT)" },
            { icon: faCircleCheck, title: "98% satisfied", desc: "Helpful answer rating" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 px-6 py-5 sm:px-8 sm:py-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fdf4ec] text-brand-600">
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900 sm:text-base">
                  {item.title}
                </p>
                <p className="text-xs text-stone-500 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          MAIN CONTENT — warm off-white bg
          ========================================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* LEFT: FAQs */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
              {/* Card Header */}
              <div className="border-b border-stone-100 px-6 py-6 sm:px-8 sm:py-7">
                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                  {filtered.length} article{filtered.length === 1 ? "" : "s"}{" "}
                  {category !== "all" && (
                    <>
                      in{" "}
                      <span className="font-semibold text-brand-600">
                        {CATEGORIES.find((c) => c.key === category)?.label}
                      </span>
                    </>
                  )}
                </p>

                {/* Category Chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const active = category === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setCategory(c.key)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                          active
                            ? "border-brand-500 bg-brand-500 text-white shadow-sm shadow-brand-500/20"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50 hover:text-slate-900"
                        }`}
                      >
                        <FontAwesomeIcon icon={c.icon} className="h-3 w-3" />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div className="divide-y divide-stone-100">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center px-6 py-16 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="h-6 w-6"
                      />
                    </span>
                    <p className="mt-4 text-base font-bold text-slate-900">
                      No results found
                    </p>
                    <p className="mt-1 max-w-sm text-sm text-stone-500">
                      Try a different keyword or{" "}
                      <button
                        onClick={() => {
                          setQuery("");
                          setCategory("all");
                        }}
                        className="font-semibold text-brand-600 hover:underline"
                      >
                        reset filters
                      </button>
                      .
                    </p>
                  </div>
                ) : (
                  filtered.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div key={faq.q}>
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-stone-50/60 sm:px-8 sm:py-6"
                        >
                          <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                              {faq.category}
                            </span>
                            <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                              {faq.q}
                            </h3>
                          </div>
                          <span
                            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                              isOpen
                                ? "rotate-180 bg-brand-500 text-white"
                                : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="h-3.5 w-3.5"
                            />
                          </span>
                        </button>
                        <div
                          className={`grid overflow-hidden transition-all duration-300 ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-6 pb-6 text-sm leading-relaxed text-stone-600 sm:px-8 sm:pb-7 sm:text-base">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Safety Section — soft amber, not harsh red */}
            <div className="overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-orange-50/50 to-white shadow-sm">
              <div className="border-b border-amber-200/60 px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="h-5 w-5"
                    />
                  </span>
                  <div>
                    <h2 className="text-xl font-extrabold text-amber-950 sm:text-2xl">
                      Safety & Scam Prevention
                    </h2>
                    <p className="mt-1 text-sm text-amber-900/70 sm:text-base">
                      Follow these rules to protect yourself from fraud.
                    </p>
                  </div>
                </div>
              </div>
              <ul className="grid gap-3 p-6 sm:grid-cols-2 sm:gap-4 sm:p-8">
                {[
                  "Always visit the property in person before paying any token money.",
                  "Verify ownership documents (Fard, Registry) through a qualified lawyer.",
                  "Never transfer money to an unverified agent.",
                  "If a deal looks too good to be true, be cautious.",
                ].map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-amber-200/50 bg-white/80 p-4 backdrop-blur-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-extrabold text-amber-800">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-amber-950">
                      {rule}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <aside className="space-y-6">
            {/* Contact Card */}
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="border-b border-stone-100 px-6 py-6">
                <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Still need help?
                </h3>
                <p className="mt-1.5 text-sm text-stone-500">
                  Our support team is available during standard business hours.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Usually replies in &lt; 24 hours
                </div>
              </div>

              <div className="space-y-1 p-3">
                <a
                  href="mailto:support@seasonmarketing.pk"
                  className="group flex items-start gap-4 rounded-xl p-3 transition hover:bg-[#fdf4ec]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500 transition group-hover:bg-white group-hover:text-brand-600">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">Email Us</p>
                    <p className="mt-0.5 truncate text-sm text-stone-500">
                      support@seasonmarketing.pk
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="mt-2 h-3 w-3 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
                  />
                </a>

                <a
                  href="tel:+923001234567"
                  className="group flex items-start gap-4 rounded-xl p-3 transition hover:bg-[#fdf4ec]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500 transition group-hover:bg-white group-hover:text-brand-600">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">Call Us</p>
                    <p className="mt-0.5 text-sm text-stone-500">
                      +92 300 1234567
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="mt-2 h-3 w-3 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
                  />
                </a>

                <div className="flex items-start gap-4 rounded-xl p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="h-4 w-4"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      Visit Office
                    </p>
                    <p className="mt-0.5 text-sm text-stone-500">
                      Blue Area, Islamabad, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 p-3">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <FontAwesomeIcon icon={faHeadset} className="h-3.5 w-3.5" />
                  Contact Support Team
                </Link>
              </div>
            </div>

            {/* Report Card — deep slate, soft (not pure black) */}
            <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 text-white shadow-lg shadow-slate-900/20">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-400">
                <FontAwesomeIcon icon={faFileShield} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">
                Spotted a fake listing?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                Our moderation team reviews every report within 24 hours. Help us
                keep the platform clean.
              </p>
              <a
                href="mailto:report@seasonmarketing.pk"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-400 transition hover:text-brand-300"
              >
                Report a listing
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}