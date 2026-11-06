"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import FormField, { describedBy, inputClass } from "./FormField";
import { passwordStrength } from "@/features/auth/schemas/auth.schemas";

const BAR_COLORS = ["bg-red-500", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-green-600"];

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  autoComplete,
  showStrength = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  autoComplete: "current-password" | "new-password";
  showStrength?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const strength = passwordStrength(value);

  return (
    <FormField id={id} label={label} error={error} hint={hint} required>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, hint, error)}
          className={`${inputClass(!!error)} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-neutral-500 hover:text-ink"
        >
          <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="h-4 w-4" />
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-2 flex items-center gap-3" aria-live="polite">
          <div className="flex flex-1 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= strength.score ? BAR_COLORS[strength.score] : "bg-neutral-200"}`}
              />
            ))}
          </div>
          <span className="w-16 text-right text-xs font-semibold text-neutral-600">{strength.label}</span>
        </div>
      )}
    </FormField>
  );
}