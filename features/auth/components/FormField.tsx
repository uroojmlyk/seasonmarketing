import type { ReactNode } from "react";

export const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink outline-none transition placeholder:text-neutral-400 focus:ring-4 ${
    invalid
      ? "border-red-500 focus:ring-red-500/15"
      : "border-neutral-300 focus:border-brand-500 focus:ring-brand-500/15"
  }`;

export const primaryBtn =
  "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 text-sm font-bold text-white transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryBtn =
  "flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white text-sm font-bold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-300";

export const describedBy = (id: string, hint?: string, error?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function DemoNotice() {
  return (
    <p className="mb-5 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
      Demo form: nothing is saved and no real code is sent. Any 6 digit code
      works.
    </p>
  );
}

export default function FormField({
  id,
  label,
  error,
  hint,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-ink"
      >
        <span>
          {label}
          {required && (
            <span className="text-red-600" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        {optional && (
          <span className="text-xs font-medium text-neutral-500">
            Optional
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}