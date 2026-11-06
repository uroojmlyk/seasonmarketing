"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLocationDot,
  faImage,
  faCheck,
  faArrowLeft,
  faPlus ,faTriangleExclamation,
    faEye, 
  faFileContract,
  faCircleCheck,
  faCircleInfo,
  faXmark,
  faChevronRight,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type Purpose = "For Sale" | "For Rent";

type PropertyType =
  | "House"
  | "Flat"
  | "Plot"
  | "Commercial"
  | "Upper Portion"
  | "Farm House";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

/* ============================================
   DATA
   ============================================ */

const PURPOSE_OPTIONS: {
  value: Purpose;
  label: string;
  desc: string;
}[] = [
  {
    value: "For Sale",
    label: "For Sale",
    desc: "Sell your property to a buyer",
  },
  {
    value: "For Rent",
    label: "For Rent",
    desc: "Rent out your property",
  },
];

const TYPE_OPTIONS: PropertyType[] = [
  "House",
  "Flat",
  "Plot",
  "Commercial",
  "Upper Portion",
  "Farm House",
];

const STEPS = [
  {
    num: 1,
    title: "Purpose & type",
    desc: "What are you listing?",
    icon: faHouse,
  },
  {
    num: 2,
    title: "Location",
    desc: "Where is the property?",
    icon: faLocationDot,
  },
  {
    num: 3,
    title: "Details",
    desc: "Price, size, description",
    icon: faFileContract,
  },
  {
    num: 4,
    title: "Media & submit",
    desc: "Photos and declaration",
    icon: faImage,
  },
];

const CITIES = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta"];

const AREA_UNITS = ["Marla", "Kanal", "Sq Ft", "Sq Yd"];

/* ============================================
   PAGE
   ============================================ */

export default function PostPropertyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    purpose: "For Sale" as Purpose,
    type: "House" as PropertyType,
    city: "Lahore",
    area: "",
    address: "",
    title: "",
    price: "",
    size: "",
    sizeUnit: "Marla",
    bedrooms: "",
    bathrooms: "",
    description: "",
    declaration: false,
  });

  const update = (field: keyof typeof form, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const addFile = () => {
    setFiles((prev) => [
      ...prev,
      {
        id: `f${Date.now()}`,
        name: `photo-${prev.length + 1}.jpg`,
        size: "1.8 MB",
      },
    ]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const validateStep = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 2) {
      if (!form.area.trim()) e.area = "Area or society is required.";
      if (!form.city) e.city = "City is required.";
    }
    if (s === 3) {
      if (!form.title.trim()) e.title = "Title is required.";
      if (!form.price.trim()) e.price = "Price is required.";
      else if (Number(form.price) <= 0) e.price = "Price must be greater than 0.";
      if (!form.size.trim()) e.size = "Area size is required.";
      else if (Number(form.size) <= 0)
        e.size = "Size must be greater than 0.";
      if (!form.description.trim())
        e.description = "Description is required.";
      else if (form.description.trim().length < 20)
        e.description = "Please provide at least 20 characters.";
    }
    if (s === 4) {
      if (!form.declaration)
        e.declaration = "You must accept the declaration to submit.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prev = () => {
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    const e = validateStep(4);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      purpose: "For Sale",
      type: "House",
      city: "Lahore",
      area: "",
      address: "",
      title: "",
      price: "",
      size: "",
      sizeUnit: "Marla",
      bedrooms: "",
      bathrooms: "",
      description: "",
      declaration: false,
    });
    setFiles([]);
    setErrors({});
    setStep(1);
    setSubmitted(false);
  };

  const stepComplete = useMemo(() => {
    return {
      1: !!form.purpose && !!form.type,
      2: !!form.area.trim() && !!form.city,
      3:
        !!form.title.trim() &&
        !!form.price.trim() &&
        !!form.size.trim() &&
        form.description.trim().length >= 20,
      4: form.declaration && files.length > 0,
    } as Record<number, boolean>;
  }, [form, files]);

  const progress = useMemo(() => {
    const completed = Object.values(stepComplete).filter(Boolean).length;
    return Math.round((completed / 4) * 100);
  }, [stepComplete]);

  /* =========================================
     SUCCESS STATE
     ========================================= */
  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
              <div className="relative">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="h-7 w-7"
                  />
                </span>
                <FontAwesomeIcon
                  icon={faWandSparkles}
                  className="absolute -right-1 -top-1 h-4 w-4 text-brand-500"
                />
              </div>
              <h1 className="mt-6 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Listing submitted
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
                Your listing{" "}
                <span className="font-bold text-ink">
                  &ldquo;{form.title || "Untitled"}&rdquo;
                </span>{" "}
                is now in the moderation queue. Our team reviews new listings
                within 24 hours.
              </p>

              <div className="mt-6 w-full max-w-sm rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left">
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  What happens next
                </p>
                <ol className="mt-2 space-y-2 text-xs leading-relaxed text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                      1
                    </span>
                    <span>
                      <strong className="font-bold text-ink">
                        Review (24h):
                      </strong>{" "}
                      A moderator checks details, media, and accuracy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                      2
                    </span>
                    <span>
                      <strong className="font-bold text-ink">Publish:</strong>{" "}
                      Once approved, it becomes publicly searchable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                      3
                    </span>
                    <span>
                      <strong className="font-bold text-ink">Enquiries:</strong>{" "}
                      Buyers and tenants can contact you directly.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="mt-8 flex w-full max-w-sm flex-col gap-2">
                <Link
                  href="/dashboard/owner"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={resetForm}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
                >
                  Post Another Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================
     FORM STATE
     ========================================= */
  return (
    <div className="min-h-screen bg-neutral-50 pb-24 lg:pb-8">
      {/* =========================================
          HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Link
            href="/dashboard/owner"
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
            Back to Dashboard
          </Link>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Owner · Post Property
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Post a new property
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-600">
                Fill in the details — you&apos;ll see a live preview as you go.
              </p>
            </div>

            {/* Progress ring */}
            <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <div className="relative h-10 w-10">
                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-ink">
                  {progress}%
                </span>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  Progress
                </p>
                <p className="text-sm font-bold text-ink">Step {step} of 4</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* =========================================
              LEFT — STEP NAV + FORM
              ========================================= */}
          <div className="lg:col-span-7">
            {/* Step tabs */}
            <div className="mb-4 flex gap-1 overflow-x-auto rounded-lg border border-neutral-200 bg-white p-1">
              {STEPS.map((s) => {
                const active = step === s.num;
                const complete = stepComplete[s.num];
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      if (s.num <= step || stepComplete[s.num - 1]) {
                        setStep(s.num);
                      }
                    }}
                    className={`flex min-w-fit flex-1 items-center gap-2 whitespace-nowrap rounded-md px-3 py-2.5 text-xs font-bold transition ${
                      active
                        ? "bg-ink text-white"
                        : complete
                        ? "text-emerald-700 hover:bg-emerald-50"
                        : "text-neutral-500 hover:bg-neutral-100"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                        active
                          ? "bg-white/20 text-white"
                          : complete
                          ? "bg-emerald-500 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {complete && !active ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="h-2.5 w-2.5"
                        />
                      ) : (
                        s.num
                      )}
                    </span>
                    {s.title}
                  </button>
                );
              })}
            </div>

            {/* Form card */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {/* Section header */}
              <div className="flex items-start gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                  {(() => {
                    const Icon = STEPS[step - 1].icon;
                    return (
                      <FontAwesomeIcon icon={Icon} className="h-4 w-4" />
                    );
                  })()}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      0{step}
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      {STEPS[step - 1].title}
                    </h2>
                  </div>
                  <p className="mt-0.5 text-sm text-neutral-600">
                    {STEPS[step - 1].desc}
                  </p>
                </div>
              </div>

              {/* Form content */}
              <div className="p-5 sm:p-6">
                {/* ===== STEP 1 ===== */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                        What do you want to do?{" "}
                        <span className="text-brand-600">*</span>
                      </label>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {PURPOSE_OPTIONS.map((opt) => {
                          const active = form.purpose === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => update("purpose", opt.value)}
                              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${
                                active
                                  ? "border-brand-500 bg-brand-50 ring-1 ring-brand-200"
                                  : "border-neutral-200 bg-white hover:border-neutral-300"
                              }`}
                            >
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                                  active
                                    ? "bg-brand-500 text-white"
                                    : "bg-neutral-100 text-neutral-600"
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={faHouse}
                                  className="h-3.5 w-3.5"
                                />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-ink">
                                  {opt.label}
                                </p>
                                <p className="mt-0.5 text-xs text-neutral-500">
                                  {opt.desc}
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

                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                        Property type{" "}
                        <span className="text-brand-600">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {TYPE_OPTIONS.map((type) => {
                          const active = form.type === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => update("type", type)}
                              className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                                active
                                  ? "border-brand-500 bg-brand-50 text-brand-700"
                                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-ink"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500"
                      />
                      <p className="text-xs leading-relaxed text-neutral-600">
                        Your choice determines which fields appear next. You can
                        change this later before submitting.
                      </p>
                    </div>
                  </div>
                )}

                {/* ===== STEP 2 ===== */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="city"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        City <span className="text-brand-600">*</span>
                      </label>
                      <select
                        id="city"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="area"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Area or society{" "}
                        <span className="text-brand-600">*</span>
                      </label>
                      <p className="mt-0.5 text-[11px] text-neutral-500">
                        Locality, phase, or society name.
                      </p>
                      <input
                        id="area"
                        type="text"
                        value={form.area}
                        onChange={(e) => update("area", e.target.value)}
                        placeholder="e.g. DHA Phase 6, Gulberg III"
                        className={`mt-2 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                          errors.area
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                        }`}
                      />
                      {errors.area && (
                        <p className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.area}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Address description{" "}
                        <span className="font-normal text-neutral-400">
                          (optional)
                        </span>
                      </label>
                      <p className="mt-0.5 text-[11px] text-neutral-500">
                        Street, house number, or nearby landmark.
                      </p>
                      <textarea
                        id="address"
                        rows={3}
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        placeholder="e.g. House #123, Street 5, opposite the mosque"
                        className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      />
                    </div>

                    <div className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500"
                      />
                      <p className="text-xs leading-relaxed text-neutral-600">
                        Exact address stays private. Buyers will only see the
                        locality and society on the listing.
                      </p>
                    </div>
                  </div>
                )}

                {/* ===== STEP 3 ===== */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="title"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Listing title{" "}
                        <span className="text-brand-600">*</span>
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                        placeholder="e.g. Modern 10 Marla House for Sale in DHA"
                        className={`mt-2 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                          errors.title
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                        }`}
                      />
                      {errors.title && (
                        <p className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="price"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Price (PKR){" "}
                          <span className="text-brand-600">*</span>
                        </label>
                        <input
                          id="price"
                          type="number"
                          min={1}
                          value={form.price}
                          onChange={(e) => update("price", e.target.value)}
                          placeholder="e.g. 25000000"
                          className={`mt-2 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                            errors.price
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                          }`}
                        />
                        {errors.price && (
                          <p className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.price}
                          </p>
                        )}
                        {form.price && Number(form.price) > 0 && (
                          <p className="mt-1.5 text-[11px] font-medium text-neutral-500">
                            ≈ PKR {(Number(form.price) / 10000000).toFixed(2)}{" "}
                            Crore
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="size"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Area size{" "}
                          <span className="text-brand-600">*</span>
                        </label>
                        <div className="mt-2 flex gap-2">
                          <input
                            id="size"
                            type="number"
                            min={1}
                            value={form.size}
                            onChange={(e) => update("size", e.target.value)}
                            placeholder="e.g. 10"
                            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                              errors.size
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                            }`}
                          />
                          <select
                            value={form.sizeUnit}
                            onChange={(e) =>
                              update("sizeUnit", e.target.value)
                            }
                            className="w-24 rounded-lg border border-neutral-200 bg-white px-2 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                          >
                            {AREA_UNITS.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.size && (
                          <p className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.size}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="bedrooms"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Bedrooms{" "}
                          <span className="font-normal text-neutral-400">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="bedrooms"
                          type="number"
                          min={0}
                          value={form.bedrooms}
                          onChange={(e) => update("bedrooms", e.target.value)}
                          placeholder="e.g. 4"
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="bathrooms"
                          className="text-xs font-black uppercase tracking-wider text-neutral-600"
                        >
                          Bathrooms{" "}
                          <span className="font-normal text-neutral-400">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="bathrooms"
                          type="number"
                          min={0}
                          value={form.bathrooms}
                          onChange={(e) => update("bathrooms", e.target.value)}
                          placeholder="e.g. 4"
                          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Description{" "}
                        <span className="text-brand-600">*</span>
                      </label>
                      <textarea
                        id="description"
                        rows={5}
                        value={form.description}
                        onChange={(e) =>
                          update("description", e.target.value)
                        }
                        placeholder="Describe the property: features, condition, nearby amenities, unique selling points..."
                        className={`mt-2 w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
                          errors.description
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
                        }`}
                      />
                      <div className="mt-1.5 flex items-center justify-between">
                        {errors.description ? (
                          <p className="text-xs font-medium text-red-600">
                            {errors.description}
                          </p>
                        ) : (
                          <p className="text-xs text-neutral-500">
                            Minimum 20 characters.
                          </p>
                        )}
                        <p className="text-xs font-bold text-neutral-500">
                          {form.description.length} / 2000
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== STEP 4 ===== */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                        Photos
                      </label>
                      <p className="mt-0.5 text-[11px] text-neutral-500">
                        Add up to 10 photos. First photo becomes the cover.
                      </p>

                      {files.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {files.map((file, i) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-2.5"
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                  <FontAwesomeIcon
                                    icon={faImage}
                                    className="h-3.5 w-3.5"
                                  />
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-ink">
                                    {file.name}
                                    {i === 0 && (
                                      <span className="ml-1.5 rounded-sm bg-brand-500 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                                        Cover
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-[10px] text-neutral-500">
                                    {file.size}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                aria-label={`Remove ${file.name}`}
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  className="h-3 w-3"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={addFile}
                        className="mt-2 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 py-8 text-center transition hover:border-brand-500 hover:bg-brand-50/50"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-400">
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="h-4 w-4"
                          />
                        </span>
                        <p className="mt-2 text-sm font-bold text-ink">
                          Upload photos
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          JPG, PNG, or WEBP · Max 5 MB each
                        </p>
                      </button>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      />
                      <div>
                        <p className="text-sm font-bold text-amber-900">
                          Listing declaration{" "}
                          <span className="text-brand-600">*</span>
                        </p>
                        <label className="mt-2 flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.declaration}
                            onChange={(e) =>
                              update("declaration", e.target.checked)
                            }
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-amber-300 accent-brand-500 focus:ring-2 focus:ring-brand-500/30"
                          />
                          <span className="text-xs leading-relaxed text-amber-900/90">
                            I confirm I am the owner of this property or have
                            explicit permission to advertise it. I agree to the{" "}
                            <strong className="font-bold">
                              Listing Rules
                            </strong>{" "}
                            and understand that false information will result in
                            account suspension.
                          </span>
                        </label>
                        {errors.declaration && (
                          <p className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.declaration}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation footer */}
              <div className="flex items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-5 py-4">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 1}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="h-3.5 w-3.5"
                  />
                  Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    Next step
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-3 w-3"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    Submit for review
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-3 w-3"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT — LIVE PREVIEW (sticky on lg+)
              ========================================= */}
          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-6 space-y-3">
              <div className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
                <FontAwesomeIcon
                  icon={faEye}
                  className="h-3.5 w-3.5 text-brand-600"
                />
                <p className="text-xs font-black uppercase tracking-wider text-brand-700">
                  Live preview
                </p>
              </div>

              <PreviewCard form={form} filesCount={files.length} />

              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-ink">
                      Moderation policy
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                      Listings are reviewed within 24 hours. Keep prices accurate
                      — misleading listings are removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ============================================
   PREVIEW CARD
   ============================================ */

function PreviewCard({
  form,
  filesCount,
}: {
  form: {
    purpose: string;
    type: string;
    city: string;
    area: string;
    title: string;
    price: string;
    size: string;
    sizeUnit: string;
    bedrooms: string;
    bathrooms: string;
    description: string;
  };
  filesCount: number;
}) {
  const priceFormatted = form.price
    ? `PKR ${(Number(form.price) / 10000000).toFixed(2)} Crore`
    : "PKR —";

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      {/* Image placeholder */}
      <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faImage}
            className="h-8 w-8 text-neutral-400"
          />
          <p className="mt-1 text-[11px] font-semibold text-neutral-500">
            {filesCount > 0
              ? `${filesCount} photo${filesCount !== 1 ? "s" : ""} added`
              : "No photos yet"}
          </p>
        </div>
        <span className="absolute left-2 top-2 rounded-sm bg-ink px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
          {form.purpose}
        </span>
        <span className="absolute right-2 top-2 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
          {form.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-black tracking-tight text-ink">
          {form.title || "Untitled property"}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-neutral-500">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="h-2.5 w-2.5"
          />
          {form.area ? `${form.area}, ${form.city}` : "Location not set"}
        </p>

        {/* Price */}
        <p className="mt-3 text-xl font-black tracking-tight text-brand-600">
          {priceFormatted}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          Asking price
        </p>

        {/* Facts grid */}
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
              Size
            </p>
            <p className="mt-0.5 text-sm font-bold text-ink">
              {form.size ? `${form.size} ${form.sizeUnit}` : "—"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
              Beds
            </p>
            <p className="mt-0.5 text-sm font-bold text-ink">
              {form.bedrooms || "—"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
              Baths
            </p>
            <p className="mt-0.5 text-sm font-bold text-ink">
              {form.bathrooms || "—"}
            </p>
          </div>
        </div>

        {/* Description */}
        {form.description && (
          <p className="mt-3 line-clamp-2 border-t border-neutral-100 pt-3 text-xs leading-relaxed text-neutral-600">
            {form.description}
          </p>
        )}
      </div>
    </div>
  );
}