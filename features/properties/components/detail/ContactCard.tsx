"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, faEye, faLanguage, faMessage, faPaperPlane, faPhone, faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export interface AgentInfo {
  name: string;
  agency?: string;
  since: number;
  languages?: string[];
  idChecked: boolean;
  listingsHref: string;
  cityName: string;
}

interface Props {
  agent: AgentInfo | null;
  phone: string; // e.g. "+92 300 1234567"
  propertyTitle: string;
  propertyRef: string;
  slug: string;
}

const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const maskPhone = (p: string) => p.slice(0, -5) + "•••••";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

export default function ContactCard({ agent, phone, propertyTitle, propertyRef, slug }: Props) {
  const [reveal, setReveal] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hi, I am interested in "${propertyTitle}" (Ref ${propertyRef}). Please share more details.`,
    consent: false,
  });

  const waText = encodeURIComponent(`Hi, I am interested in "${propertyTitle}" (Ref ${propertyRef}).`);
  const waHref = `https://wa.me/${phone.replace(/\D/g, "")}?text=${waText}`;

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    const digits = form.phone.replace(/[\s-]/g, "");
    if (!/^(\+92|0092|0)?3\d{9}$/.test(digits)) next.phone = "Enter a valid mobile number, e.g. 0300 1234567.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.consent) next.consent = "Please agree so the advertiser can contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: yahan backend API call lagegi (POST /api/enquiries) payload: { slug, ...form }
    setSent(true);
  };

  const field =
    "w-full rounded-xl bg-neutral-50 px-4 py-3 text-sm text-ink outline-none ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-brand-500";

  return (
    <div id="contact" className="scroll-mt-32 overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/5 ring-1 ring-neutral-200">
      {/* Agent header */}
      <div className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-extrabold text-white">
          {agent ? initials(agent.name) : "SM"}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-extrabold text-ink">{agent?.name ?? "Season Marketing"}</p>
          <p className="truncate text-xs text-neutral-500">
            {agent?.agency ?? "Independent advertiser"}
            {agent && ` · since ${agent.since}`}
          </p>
          {agent && (
            <p
              className={`mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold ${
                agent.idChecked ? "text-emerald-600" : "text-neutral-500"
              }`}
            >
              <FontAwesomeIcon
                icon={agent.idChecked ? faCircleCheck : faTriangleExclamation}
                className="!h-3 !w-3"
              />
              {agent.idChecked ? "Identity checked" : "Identity not checked yet"}
            </p>
          )}
        </div>
      </div>

      {agent?.languages && agent.languages.length > 0 && (
        <p className="flex items-center gap-2 border-t border-neutral-100 px-5 py-3 text-xs text-neutral-500">
          <FontAwesomeIcon icon={faLanguage} className="!h-3.5 !w-3.5 text-brand-500" />
          Speaks {agent.languages.join(", ")}
        </p>
      )}

      {/* Quick contact */}
      <div className="space-y-3 border-t border-neutral-100 p-5">
        <button
          type="button"
          onClick={() => setReveal(true)}
          className="flex w-full items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-sm ring-1 ring-neutral-200 transition-colors hover:bg-neutral-100"
        >
          <span className="font-semibold tracking-wide text-ink">{reveal ? phone : maskPhone(phone)}</span>
          {!reveal && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-brand-600">
              <FontAwesomeIcon icon={faEye} className="!h-3 !w-3" /> Show number
            </span>
          )}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-bold text-white transition-colors hover:bg-neutral-800"
          >
            <FontAwesomeIcon icon={faPhone} className="!h-4 !w-4" /> Call
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
          >
            <FontAwesomeIcon icon={faMessage} className="!h-4 !w-4" /> WhatsApp
          </a>
        </div>
      </div>

      {/* Enquiry form */}
      <div className="border-t border-neutral-100 p-5">
        {sent ? (
          <div role="status" className="rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200">
            <FontAwesomeIcon icon={faCircleCheck} className="!h-8 !w-8 text-emerald-600" />
            <p className="mt-3 font-display text-lg font-extrabold text-ink">Enquiry sent</p>
            <p className="mt-1 text-sm text-neutral-600">
              Thanks {form.name.split(" ")[0]}. The advertiser will contact you on {form.phone}.
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-4 text-xs font-bold text-brand-600 hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-ink">Send an enquiry</h3>

            <div>
              <label htmlFor={`name-${slug}`} className="sr-only">Full name</label>
              <input
                id={`name-${slug}`}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
                placeholder="Full name"
                aria-invalid={!!errors.name}
                className={field}
              />
              {errors.name && <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor={`phone-${slug}`} className="sr-only">Mobile number</label>
              <input
                id={`phone-${slug}`}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Mobile number, e.g. 0300 1234567"
                aria-invalid={!!errors.phone}
                className={field}
              />
              {errors.phone && <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor={`email-${slug}`} className="sr-only">Email (optional)</label>
              <input
                id={`email-${slug}`}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                type="email"
                autoComplete="email"
                placeholder="Email (optional)"
                aria-invalid={!!errors.email}
                className={field}
              />
              {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor={`msg-${slug}`} className="sr-only">Message</label>
              <textarea
                id={`msg-${slug}`}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={4}
                className={`${field} resize-none`}
              />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-neutral-600">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
                />
                <span>
                  I agree to be contacted about this property. My details go only to the advertiser. See our{" "}
                  <Link href="/legal/privacy" className="font-bold text-brand-600 hover:underline">Privacy Notice</Link>.
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-xs font-medium text-red-600">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="!h-3.5 !w-3.5" /> Send enquiry
            </button>
          </form>
        )}
      </div>

      {agent && (
        <Link
          href={agent.listingsHref}
          className="block border-t border-neutral-100 bg-neutral-50 px-5 py-3.5 text-center text-xs font-bold text-ink transition-colors hover:bg-neutral-100"
        >
          More listings by this advertiser in {agent.cityName}
        </Link>
      )}
    </div>
  );
}