"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";

interface Props {
  price: string;
  phone: string;
  title: string;
  propertyRef: string;
}

// Sirf phone/tablet par: neechay chipka hua contact bar (desktop par sidebar hai)
export default function MobileContactBar({ price, phone, title, propertyRef }: Props) {
  const wa = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi, I am interested in "${title}" (Ref ${propertyRef}).`
  )}`;

  return (
    <>
      {/* Chatbot button ko bar ke upar uthao taake dono ek doosre ko na dhakein */}
      <style>{`@media (max-width: 1023px){ body:has([data-pd-bar]) div.fixed.bottom-6.right-6{ bottom: 6rem; } }`}</style>

      <div
        data-pd-bar
        className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 pt-3 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-extrabold leading-tight text-brand-600">{price}</p>
            <p className="truncate text-[11px] text-neutral-500">Ref {propertyRef}</p>
          </div>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            aria-label="Call advertiser"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white"
          >
            <FontAwesomeIcon icon={faPhone} className="!h-4 !w-4" />
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp advertiser"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          >
            <FontAwesomeIcon icon={faMessage} className="!h-4 !w-4" />
          </a>
          <a
            href="#contact"
            className="flex h-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-bold text-white"
          >
            Enquire
          </a>
        </div>
      </div>
    </>
  );
}