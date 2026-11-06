"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCity, faHouse, faKey, faUserTie } from "@fortawesome/free-solid-svg-icons";
import type { PublicRole } from "@/features/auth/types/auth.types";
import { PUBLIC_ROLES } from "@/lib/constants/auth";

const ICONS = {
  buyer_tenant: faHouse,
  owner: faKey,
  agent: faUserTie,
  agency_admin: faBuilding,
  developer: faCity,
};

export default function RoleSelector({
  value,
  onChange,
}: {
  value: PublicRole;
  onChange: (role: PublicRole) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">
        I am a <span className="text-red-600" aria-hidden="true">*</span>
      </legend>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {PUBLIC_ROLES.map((r) => {
          const active = r.value === value;
          return (
            <label
              key={r.value}
              className={`relative flex cursor-pointer gap-3 rounded-xl border p-3.5 transition focus-within:ring-4 focus-within:ring-brand-500/20 ${
                active ? "border-brand-500 bg-brand-50" : "border-neutral-200 bg-white hover:border-neutral-400"
              } ${r.value === "developer" ? "sm:col-span-2" : ""}`}
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={active}
                onChange={() => onChange(r.value)}
                className="sr-only"
              />
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  active ? "bg-brand-500 text-white" : "bg-neutral-100 text-neutral-600"
                }`}
              >
                <FontAwesomeIcon icon={ICONS[r.value]} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-ink">{r.label}</span>
                <span className="mt-0.5 block text-xs text-neutral-600">{r.description}</span>
                {r.needsReview && (
                  <span className="mt-1.5 inline-block rounded bg-ink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Extra checks needed
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}