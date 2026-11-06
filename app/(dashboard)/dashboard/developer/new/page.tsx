"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBuilding,
  faLocationDot,
  faImage,
  faPlus,
  faFileContract,
  faCheckCircle,
  faCircleInfo,
  faXmark,
  faFileLines,
  faTriangleExclamation,
  faChevronDown,
  faChevronUp,
  faPaperPlane,
  faEye,
  faRulerCombined,
  faTag,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

type SectionKey = "basic" | "location" | "units" | "description" | "media";

const SECTION_META: {
  key: SectionKey;
  number: string;
  title: string;
  desc: string;
  icon: any;
}[] = [
  {
    key: "basic",
    number: "01",
    title: "Basic information",
    desc: "Project name, developer, and status.",
    icon: faBuilding,
  },
  {
    key: "location",
    number: "02",
    title: "Location",
    desc: "Where the project is being developed.",
    icon: faLocationDot,
  },
  {
    key: "units",
    number: "03",
    title: "Units & pricing",
    desc: "Inventory and starting price.",
    icon: faFileContract,
  },
  {
    key: "description",
    number: "04",
    title: "Description",
    desc: "Amenities, features, and highlights.",
    icon: faFileLines,
  },
  {
    key: "media",
    number: "05",
    title: "Media & brochures",
    desc: "Images and downloadable files.",
    icon: faImage,
  },
];

/* ============================================
   PAGE
   ============================================ */

export default function NewProjectPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSection, setOpenSection] = useState<SectionKey | null>("basic");
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    developer: "",
    status: "launching",
    city: "Lahore",
    area: "",
    units: "",
    price: "",
    paymentPlan: "Full Payment",
    description: "",
  });

  const statusLabel = {
    launching: "Launching Soon",
    "under-construction": "Under Construction",
    ready: "Ready for Possession",
  }[form.status] as string;

  /* ---------- Section completeness (for progress) ---------- */
  const completedSections = useMemo(() => {
    const done: Record<SectionKey, boolean> = {
      basic: !!form.name.trim() && !!form.developer.trim(),
      location: !!form.area.trim(),
      units: !!form.units && !!form.price.trim(),
      description: form.description.trim().length >= 20,
      media: files.length > 0,
    };
    return done;
  }, [form, files]);

  const progress = useMemo(() => {
    const done = Object.values(completedSections).filter(Boolean).length;
    return Math.round((done / 5) * 100);
  }, [completedSections]);

  /* ---------- Handlers ---------- */
  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const addFile = () => {
    setFiles((prev) => [
      ...prev,
      {
        id: `f${Date.now()}`,
        name: `brochure-${prev.length + 1}.pdf`,
        size: "2.4 MB",
      },
    ]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Project name is required.";
    if (!form.developer.trim()) e.developer = "Developer name is required.";
    if (!form.area.trim()) e.area = "Area or society is required.";
    if (!form.units.trim()) e.units = "Total units is required.";
    else if (Number(form.units) <= 0) e.units = "Units must be greater than 0.";
    if (!form.price.trim()) e.price = "Starting price is required.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      if (e.name || e.developer) setOpenSection("basic");
      else if (e.area) setOpenSection("location");
      else if (e.units || e.price) setOpenSection("units");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      developer: "",
      status: "launching",
      city: "Lahore",
      area: "",
      units: "",
      price: "",
      paymentPlan: "Full Payment",
      description: "",
    });
    setFiles([]);
    setErrors({});
    setIsSubmitted(false);
    setOpenSection("basic");
  };

  /* =========================================
     SUCCESS STATE
     ========================================= */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
              <div className="relative">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-7 w-7" />
                </span>
                {/* ✅ FIX: faSparkles → faWandSparkles */}
                <FontAwesomeIcon
                  icon={faWandSparkles}
                  className="absolute -right-1 -top-1 h-4 w-4 text-brand-500"
                />
              </div>
              <h1 className="mt-6 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Project submitted
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
                <span className="font-bold text-ink">
                  &ldquo;{form.name || "Untitled"}&rdquo;
                </span>{" "}
                is now in the moderation queue. Our team reviews new projects
                within 24 hours. You&apos;ll get an email once it&apos;s live.
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
                      A moderator checks details, media, and evidence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                      2
                    </span>
                    <span>
                      <strong className="font-bold text-ink">
                        Publish:
                      </strong>{" "}
                      Once approved, your project becomes publicly searchable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                      3
                    </span>
                    <span>
                      <strong className="font-bold text-ink">Enquiries:</strong>{" "}
                      Start receiving buyer enquiries right away.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="mt-8 flex w-full max-w-sm flex-col gap-2">
                <Link
                  href="/dashboard/developer"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={resetForm}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
                >
                  Add Another Project
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
    <div className="min-h-screen bg-neutral-50 pb-24 lg:pb-0">
      {/* HEADER */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Link
            href="/dashboard/developer"
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
            Back to Dashboard
          </Link>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Developer · New Project
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Add a new project
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-600">
                Fill in the details — you&apos;ll see a live preview on the
                right as you type.
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
                <p className="text-sm font-bold text-ink">
                  {Object.values(completedSections).filter(Boolean).length} / 5
                  sections
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <form onSubmit={onSubmit} noValidate>
          <div className="grid gap-6 lg:grid-cols-12">
            {/* LEFT — FORM */}
            <div className="space-y-3 lg:col-span-7">
              {SECTION_META.map((section) => {
                const isOpen = openSection === section.key;
                const isComplete = completedSections[section.key];
                const Icon = section.icon;

                return (
                  <section
                    key={section.key}
                    className={`overflow-hidden rounded-xl border bg-white transition ${
                      isOpen
                        ? "border-brand-300 ring-1 ring-brand-100"
                        : "border-neutral-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(isOpen ? null : section.key)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-neutral-50"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                          isComplete
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-ink text-white"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={isComplete ? faCheckCircle : Icon}
                          className="h-4 w-4"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[10px] font-black text-neutral-400">
                            {section.number}
                          </span>
                          <h2 className="text-base font-black tracking-tight text-ink">
                            {section.title}
                          </h2>
                          {isComplete && (
                            <span className="rounded-sm bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-700">
                              Done
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {section.desc}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className="h-3.5 w-3.5 shrink-0 text-neutral-400"
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-neutral-100 p-5 sm:p-6">
                        {/* === BASIC === */}
                        {section.key === "basic" && (
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <FieldLabel
                                htmlFor="name"
                                required
                                hint="Shown to buyers on your project listing."
                              >
                                Project name
                              </FieldLabel>
                              <input
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                placeholder="e.g. Skyline Residences"
                                aria-invalid={!!errors.name}
                                className={inputClass(!!errors.name)}
                              />
                              <ErrorText error={errors.name} />
                            </div>

                            <div>
                              <FieldLabel
                                htmlFor="developer"
                                required
                                hint="Registered business name preferred."
                              >
                                Developer
                              </FieldLabel>
                              <input
                                id="developer"
                                type="text"
                                value={form.developer}
                                onChange={(e) =>
                                  update("developer", e.target.value)
                                }
                                placeholder="e.g. ABC Builders"
                                aria-invalid={!!errors.developer}
                                className={inputClass(!!errors.developer)}
                              />
                              <ErrorText error={errors.developer} />
                            </div>

                            <div>
                              <FieldLabel htmlFor="status">
                                Project status
                              </FieldLabel>
                              <select
                                id="status"
                                value={form.status}
                                onChange={(e) =>
                                  update("status", e.target.value)
                                }
                                className={inputClass(false)}
                              >
                                <option value="launching">Launching Soon</option>
                                <option value="under-construction">
                                  Under Construction
                                </option>
                                <option value="ready">
                                  Ready for Possession
                                </option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* === LOCATION === */}
                        {section.key === "location" && (
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <FieldLabel htmlFor="city">City</FieldLabel>
                              <select
                                id="city"
                                value={form.city}
                                onChange={(e) =>
                                  update("city", e.target.value)
                                }
                                className={inputClass(false)}
                              >
                                <option>Lahore</option>
                                <option>Karachi</option>
                                <option>Islamabad</option>
                                <option>Peshawar</option>
                                <option>Quetta</option>
                              </select>
                            </div>

                            <div>
                              <FieldLabel
                                htmlFor="area"
                                required
                                hint="Society, phase, or locality."
                              >
                                Area or society
                              </FieldLabel>
                              <input
                                id="area"
                                type="text"
                                value={form.area}
                                onChange={(e) => update("area", e.target.value)}
                                placeholder="e.g. DHA Phase 6"
                                aria-invalid={!!errors.area}
                                className={inputClass(!!errors.area)}
                              />
                              <ErrorText error={errors.area} />
                            </div>
                          </div>
                        )}

                        {/* === UNITS === */}
                        {section.key === "units" && (
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                              <FieldLabel
                                htmlFor="units"
                                required
                                hint="Total unit count."
                              >
                                Total units
                              </FieldLabel>
                              <input
                                id="units"
                                type="number"
                                min={1}
                                value={form.units}
                                onChange={(e) =>
                                  update("units", e.target.value)
                                }
                                placeholder="e.g. 50"
                                aria-invalid={!!errors.units}
                                className={inputClass(!!errors.units)}
                              />
                              <ErrorText error={errors.units} />
                            </div>

                            <div>
                              <FieldLabel
                                htmlFor="price"
                                required
                                hint="Lowest available unit."
                              >
                                Starting price
                              </FieldLabel>
                              <input
                                id="price"
                                type="text"
                                value={form.price}
                                onChange={(e) =>
                                  update("price", e.target.value)
                                }
                                placeholder="e.g. PKR 1.2 Crore"
                                aria-invalid={!!errors.price}
                                className={inputClass(!!errors.price)}
                              />
                              <ErrorText error={errors.price} />
                            </div>

                            <div>
                              <FieldLabel htmlFor="payment-plan">
                                Payment plan
                              </FieldLabel>
                              <select
                                id="payment-plan"
                                value={form.paymentPlan}
                                onChange={(e) =>
                                  update("paymentPlan", e.target.value)
                                }
                                className={inputClass(false)}
                              >
                                <option>Full Payment</option>
                                <option>2 Year Installments</option>
                                <option>3 Year Installments</option>
                                <option>5 Year Installments</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* === DESCRIPTION === */}
                        {section.key === "description" && (
                          <div>
                            <FieldLabel
                              htmlFor="description"
                              hint="Minimum 20 characters. Describe amenities, location highlights, and unique selling points."
                            >
                              Description
                            </FieldLabel>
                            <textarea
                              id="description"
                              rows={5}
                              value={form.description}
                              onChange={(e) =>
                                update("description", e.target.value)
                              }
                              placeholder="e.g. Gated community with 24/7 security, underground electricity, parks, and a community mosque..."
                              className={`${inputClass(
                                false
                              )} resize-none leading-relaxed`}
                            />
                            <div className="mt-1.5 flex items-center justify-between">
                              <p className="text-xs text-neutral-500">
                                {form.description.trim().length >= 20 ? (
                                  <span className="font-semibold text-emerald-600">
                                    ✓ Good length
                                  </span>
                                ) : (
                                  "Keep it factual and helpful."
                                )}
                              </p>
                              <p
                                className={`text-xs font-bold ${
                                  form.description.length > 1800
                                    ? "text-red-600"
                                    : "text-neutral-500"
                                }`}
                              >
                                {form.description.length} / 2000
                              </p>
                            </div>
                          </div>
                        )}

                        {/* === MEDIA === */}
                        {section.key === "media" && (
                          <div className="space-y-3">
                            {files.length > 0 && (
                              <div className="space-y-2">
                                {files.map((file) => (
                                  <div
                                    key={file.id}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-2.5"
                                  >
                                    <div className="flex min-w-0 items-center gap-2.5">
                                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <FontAwesomeIcon
                                          icon={faFileLines}
                                          className="h-3.5 w-3.5"
                                        />
                                      </span>
                                      <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-ink">
                                          {file.name}
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
                              className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 py-8 text-center transition hover:border-brand-500 hover:bg-brand-50/50"
                            >
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-400">
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className="h-4 w-4"
                                />
                              </span>
                              <p className="mt-2 text-sm font-bold text-ink">
                                Upload brochures or images
                              </p>
                              <p className="mt-0.5 text-xs text-neutral-500">
                                JPG, PNG, or PDF · Max 10 MB per file
                              </p>
                            </button>

                            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                              <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600"
                              />
                              <p className="text-xs leading-relaxed text-amber-900">
                                Only upload accurate imagery. Do not include
                                private owner information.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* RIGHT — LIVE PREVIEW */}
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

                <ProjectPreviewCard
                  form={form}
                  statusLabel={statusLabel}
                  filesCount={files.length}
                />

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
                        Projects are reviewed within 24 hours. Keep prices
                        accurate — misleading listings are removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobilePreviewOpen(true)}
                className="fixed bottom-20 right-4 z-30 flex h-12 items-center gap-2 rounded-full bg-ink px-4 text-xs font-bold text-white shadow-lg transition hover:bg-neutral-800"
              >
                <FontAwesomeIcon icon={faEye} className="h-3.5 w-3.5" />
                Preview
              </button>
            </div>
          </div>

          {/* STICKY ACTION BAR */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-sm lg:static lg:mt-6 lg:rounded-xl lg:border">
            <div className="mx-auto flex max-w-7xl flex-col-reverse items-stretch justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-5">
              <p className="hidden text-xs text-neutral-500 sm:block">
                Submitting confirms your right to advertise and agreement to
                listing rules.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Link
                  href="/dashboard/developer"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="h-3.5 w-3.5"
                  />
                  Submit Project
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      {/* MOBILE PREVIEW MODAL */}
      {mobilePreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobilePreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Project preview"
        >
          <div
            className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faEye}
                  className="h-3.5 w-3.5 text-brand-600"
                />
                <p className="text-xs font-black uppercase tracking-wider text-brand-700">
                  Live preview
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobilePreviewOpen(false)}
                aria-label="Close preview"
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"
              >
                <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              </button>
            </div>
            <ProjectPreviewCard
              form={form}
              statusLabel={statusLabel}
              filesCount={files.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================
   SUB-COMPONENTS
   ============================================ */

function FieldLabel({
  htmlFor,
  required,
  hint,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-xs font-black uppercase tracking-wider text-neutral-600"
      >
        {children}
        {required && <span className="ml-0.5 text-brand-600">*</span>}
      </label>
      {hint && (
        <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
          {hint}
        </p>
      )}
    </div>
  );
}

function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
  );
}

function inputClass(hasError: boolean) {
  return `mt-2 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
  }`;
}

function ProjectPreviewCard({
  form,
  statusLabel,
  filesCount,
}: {
  form: {
    name: string;
    developer: string;
    status: string;
    city: string;
    area: string;
    units: string;
    price: string;
    paymentPlan: string;
    description: string;
  };
  statusLabel: string;
  filesCount: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faImage}
            className="h-8 w-8 text-neutral-400"
          />
          <p className="mt-1 text-[11px] font-semibold text-neutral-500">
            {filesCount > 0
              ? `${filesCount} file${filesCount !== 1 ? "s" : ""} uploaded`
              : "No media yet"}
          </p>
        </div>
        <span className="absolute left-2 top-2 rounded-sm bg-ink px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
          {statusLabel}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-black tracking-tight text-ink">
          {form.name || "Untitled project"}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-neutral-500">
          <FontAwesomeIcon icon={faLocationDot} className="h-2.5 w-2.5" />
          {form.area ? `${form.area}, ${form.city}` : "Location not set"}
        </p>

        <p className="mt-3 text-xl font-black tracking-tight text-brand-600">
          {form.price || "PKR —"}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          Starting price
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3">
          <div>
            <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-neutral-400">
              <FontAwesomeIcon icon={faBuilding} className="h-2.5 w-2.5" />
              Units
            </p>
            <p className="mt-0.5 text-sm font-bold text-ink">
              {form.units || "—"}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-neutral-400">
              <FontAwesomeIcon icon={faTag} className="h-2.5 w-2.5" />
              Plan
            </p>
            <p className="mt-0.5 line-clamp-1 text-xs font-bold text-ink">
              {form.paymentPlan.split(" ")[0]}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-neutral-400">
              <FontAwesomeIcon
                icon={faRulerCombined}
                className="h-2.5 w-2.5"
              />
              By
            </p>
            <p className="mt-0.5 line-clamp-1 text-xs font-bold text-ink">
              {form.developer || "—"}
            </p>
          </div>
        </div>

        {form.description && (
          <p className="mt-3 line-clamp-2 border-t border-neutral-100 pt-3 text-xs leading-relaxed text-neutral-600">
            {form.description}
          </p>
        )}
      </div>
    </div>
  );
}