"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
  faHeadset,
  faTriangleExclamation,
  faCircleCheck,
  faArrowRight,
  faPaperPlane,
  faUser,
  faSpinner,
  faShieldHalved,
  faHouse,
  faCreditCard,
  faCircleInfo,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

type Category =
  | "general"
  | "listing-issue"
  | "report-scam"
  | "billing"
  | "agent-verification"
  | "account";

interface CategoryOption {
  key: Category;
  label: string;
  desc: string;
  icon: any;
  sla: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    key: "general",
    label: "General Question",
    desc: "How the platform works, features, or anything else.",
    icon: faCircleInfo,
    sla: "Reply within 1 business day",
  },
  {
    key: "listing-issue",
    label: "Listing Issue",
    desc: "A listing is wrong, outdated, or duplicated.",
    icon: faHouse,
    sla: "Reviewed within 24 hours",
  },
  {
    key: "report-scam",
    label: "Report a Scam",
    desc: "Suspicious listing, fake agent, or fraud attempt.",
    icon: faTriangleExclamation,
    sla: "Priority — reviewed same day",
  },
  {
    key: "billing",
    label: "Billing & Subscription",
    desc: "Invoice, payment, promotion, or refund question.",
    icon: faCreditCard,
    sla: "Reply within 1 business day",
  },
  {
    key: "agent-verification",
    label: "Agent Verification",
    desc: "Question about verification badges or documents.",
    icon: faShieldHalved,
    sla: "Reviewed within 1 business day",
  },
  {
    key: "account",
    label: "Account & Privacy",
    desc: "Login issues, data requests, or account deletion.",
    icon: faUser,
    sla: "Reply within 1 business day",
  },
];

// ✅ Contact info — single source of truth
const CONTACT = {
  email: "info@zef.org.pk",
  phone: "+92 307 3015416",
  phoneTel: "+923073015416",
  office: "Blue Area, Islamabad",
  hours: "Mon–Fri, 9 AM – 6 PM PKT",
};

export default function ContactPage() {
  const [category, setCategory] = useState<Category>("general");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const selected = useMemo(
    () => CATEGORIES.find((c) => c.key === category)!,
    [category]
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Please describe your issue.";
    else if (form.message.trim().length < 20)
      e.message = "Please provide at least 20 characters so we can help.";
    if (!form.consent)
      e.consent = "Please accept the privacy notice to continue.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  };

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* =========================================
          PAGE HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Contact & Support
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Get in touch with our team
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Questions, listing issues, or scam reports pick a topic below and
            we&apos;ll route your message to the right team. Scam reports are
            reviewed the same business day.
          </p>

          {/* Quick contact pills — mobile friendly */}
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-brand-300 hover:bg-brand-50"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-3 w-3 text-brand-600"
              />
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-brand-300 hover:bg-brand-50"
            >
              <FontAwesomeIcon
                icon={faPhone}
                className="h-3 w-3 text-brand-600"
              />
              {CONTACT.phone}
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {CONTACT.hours}
            </span>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN — 2 column grid
          ========================================= */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* =========== LEFT: FORM (8 cols) =========== */}
          <div className="lg:col-span-8">
            {status === "success" ? (
              <div className="rounded-xl border border-neutral-200 bg-white p-8 sm:p-12">
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">
                    Message received
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
                    Thanks, {form.name.split(" ")[0] || "there"}. We&apos;ve
                    logged your enquiry as{" "}
                    <span className="font-semibold text-ink">
                      {selected.label}
                    </span>
                    . You&apos;ll hear from us at{" "}
                    <span className="font-semibold text-ink">
                      {form.email}
                    </span>{" "}
                    — {selected.sla.toLowerCase()}.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          message: "",
                          consent: false,
                        });
                      }}
                      className="inline-flex h-11 items-center rounded-lg border border-neutral-300 px-6 text-sm font-semibold text-ink transition hover:border-ink hover:bg-neutral-50"
                    >
                      Send another message
                    </button>
                    <Link
                      href="/properties"
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-semibold text-white transition hover:bg-brand-600"
                    >
                      Browse properties
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                {/* BLACK FORM HEADER */}
                <div className="bg-ink px-6 py-6 sm:px-8 sm:py-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        Send us a message
                      </h2>
                      <p className="mt-1 text-sm text-neutral-400">
                        Fill the form and we&apos;ll route it to the right team.
                      </p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 sm:inline-flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Online now
                    </span>
                  </div>
                </div>

                <form onSubmit={onSubmit} noValidate>
                  {/* === SECTION 1: Category === */}
                  <div className="border-b border-neutral-100 px-6 py-6 sm:px-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-neutral-400">
                          01
                        </span>
                        <h3 className="text-sm font-bold text-ink">
                          What is this about?
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                        {selected.sla}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {CATEGORIES.map((c) => {
                        const active = category === c.key;
                        const isScam = c.key === "report-scam";

                        return (
                          <button
                            key={c.key}
                            type="button"
                            onClick={() => setCategory(c.key)}
                            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${
                              active
                                ? "border-brand-500 bg-brand-50/50"
                                : "border-neutral-200 bg-white hover:border-neutral-300"
                            }`}
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition ${
                                active
                                  ? "bg-brand-500 text-white"
                                  : "bg-neutral-100 text-neutral-500"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={c.icon}
                                className="h-3.5 w-3.5"
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-bold text-ink">
                                  {c.label}
                                </p>
                                {isScam && (
                                  <span className="rounded-sm bg-brand-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-700">
                                    Urgent
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
                                {c.desc}
                              </p>
                            </div>
                            <span
                              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                                active
                                  ? "border-brand-500 bg-brand-500"
                                  : "border-neutral-300"
                              }`}
                            >
                              {active && (
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* === SECTION 2: Your details === */}
                  <div className="border-b border-neutral-100 px-6 py-6 sm:px-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-neutral-400">
                        02
                      </span>
                      <h3 className="text-sm font-bold text-ink">
                        Your details
                      </h3>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-xs font-semibold text-ink"
                        >
                          Full name{" "}
                          <span className="text-brand-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="e.g. Ahmed Raza"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                          className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                            errors.name
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                          }`}
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="mt-1.5 text-xs font-medium text-red-600"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-xs font-semibold text-ink"
                        >
                          Email <span className="text-brand-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                          className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                            errors.email
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                          }`}
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="mt-1.5 text-xs font-medium text-red-600"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phone"
                          className="text-xs font-semibold text-ink"
                        >
                          Phone{" "}
                          <span className="font-normal text-neutral-400">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+92 300 1234567"
                          className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                    </div>
                  </div>

                  {/* === SECTION 3: Message === */}
                  <div className="border-b border-neutral-100 px-6 py-6 sm:px-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-neutral-400">
                        03
                      </span>
                      <h3 className="text-sm font-bold text-ink">
                        Your message
                      </h3>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="message"
                        className="text-xs font-semibold text-ink"
                      >
                        Describe your issue{" "}
                        <span className="text-brand-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Include listing URLs, dates, or any details that help us investigate. Minimum 20 characters."
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        className={`mt-1.5 w-full resize-none rounded-lg border bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                          errors.message
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                        }`}
                      />
                      <div className="mt-1.5 flex items-center justify-between">
                        {errors.message ? (
                          <p
                            id="message-error"
                            className="text-xs font-medium text-red-600"
                          >
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs text-neutral-400">
                          {form.message.length} / 1000
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* === SECTION 4: Consent + Submit === */}
                  <div className="px-6 py-6 sm:px-8">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        aria-invalid={!!errors.consent}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-neutral-300 accent-brand-500 focus:ring-2 focus:ring-brand-500/30"
                      />
                      <span className="text-xs leading-relaxed text-neutral-600">
                        I agree that Season Marketing may store and process this
                        message to respond to my enquiry, in line with the{" "}
                        <Link
                          href="/legal/privacy"
                          className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700"
                        >
                          Privacy Notice
                        </Link>
                        . My details will not be sold to third parties.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.consent}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-4 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center">
                      <p className="text-xs text-neutral-500">
                        We&apos;ll reply to{" "}
                        <span className="font-semibold text-ink">
                          {form.email || "your email"}
                        </span>{" "}
                        within {selected.sla.toLowerCase()}.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "submitting" ? (
                          <>
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="h-3.5 w-3.5 animate-spin"
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faPaperPlane}
                              className="h-3.5 w-3.5"
                            />
                            Send message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* =========== RIGHT: SIDEBAR (4 cols) =========== */}
          <aside className="space-y-4 lg:col-span-4">
            {/* Direct contact — BLACK primary block */}
            <div className="overflow-hidden rounded-xl bg-ink">
              <div className="px-6 py-5">
                <h3 className="text-sm font-bold text-white">
                  Direct contact
                </h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Reach us directly if you prefer not to use the form.
                </p>
              </div>
              <div className="divide-y divide-white/10 border-t border-white/10">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 px-6 py-3.5 transition hover:bg-white/5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 text-brand-400">
                    <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Email
                    </p>
                    <p className="truncate text-sm font-medium text-white">
                      {CONTACT.email}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-3 w-3 text-neutral-500 transition group-hover:text-brand-400"
                  />
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="group flex items-center gap-3 px-6 py-3.5 transition hover:bg-white/5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 text-brand-400">
                    <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-white">
                      {CONTACT.phone}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-3 w-3 text-neutral-500 transition group-hover:text-brand-400"
                  />
                </a>
                <div className="flex items-center gap-3 px-6 py-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 text-brand-400">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Office
                    </p>
                    <p className="text-sm font-medium text-white">
                      {CONTACT.office}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] px-6 py-3">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {CONTACT.hours}
                </div>
              </div>
            </div>

            {/* Support hours — WHITE info block */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                  <FontAwesomeIcon icon={faClock} className="h-3.5 w-3.5" />
                </span>
                <h3 className="text-sm font-bold text-ink">Support hours</h3>
              </div>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-500">Mon – Fri</dt>
                  <dd className="font-semibold text-ink">9:00 AM – 6:00 PM</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-500">Saturday</dt>
                  <dd className="font-semibold text-ink">10:00 AM – 2:00 PM</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-500">Sunday</dt>
                  <dd className="font-semibold text-neutral-400">Closed</dd>
                </div>
              </dl>
            </div>

            {/* Scam report — WHITE card with orange accent */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-500 text-white">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">
                    Spotted a scam?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Don&apos;t use the general form. Email our moderation team
                    directly scam reports are reviewed the same business day.
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    {CONTACT.email}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-2.5 w-2.5"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Formal complaint — quiet white */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon icon={faHeadset} className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">
                    Formal complaint
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    If your issue wasn&apos;t resolved, escalate through our
                    formal grievance process. Acknowledged within 2 business
                    hours.
                  </p>
                  <Link
                    href="/legal/grievance"
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-brand-600"
                  >
                    Open grievance form
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-2.5 w-2.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================
          BOTTOM — BLACK band, orange CTA
          ========================================= */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Quick answers
              </p>
              <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                Looking for answers first?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-400">
                Our Help Centre covers common questions about listings, safety,
                payments, and accounts.
              </p>
            </div>
            <Link
              href="/help"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Visit Help Centre
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}