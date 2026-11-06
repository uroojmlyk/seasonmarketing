"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, faCircleCheck, faEnvelope, faLock, faKey 
} from "@fortawesome/free-solid-svg-icons";
import { validateIdentifier, validateOtp, validatePassword } from "@/features/auth/schemas/auth.schemas";
import { OTP_LENGTH } from "@/lib/constants/auth";

type Step = "request" | "reset" | "done";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("request");
  const [identifier, setIdentifier] = useState("");
  const [idError, setIdError] = useState<string | undefined>();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ code?: string; password?: string; confirm?: string }>({});
  const [seconds, setSeconds] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const request = (e: FormEvent) => {
    e.preventDefault();
    const err = validateIdentifier(identifier);
    setIdError(err);
    if (err) return;
    setStep("reset");
    setSeconds(30);
  };

  const reset = (e: FormEvent) => {
    e.preventDefault();
    const errs = {
      code: validateOtp(code),
      password: validatePassword(password),
      confirm: confirm !== password ? "Passwords do not match." : undefined,
    };
    setErrors(errs);
    if (errs.code || errs.password || errs.confirm) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      );
      return;
    }
    setStep("done");
  };

  const inputBase = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium text-white outline-none backdrop-blur-sm transition-all duration-150 placeholder:text-white/40 focus:border-brand-500 focus:bg-white/10";
  const labelBase = "mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/60";

  // --- SUCCESS STATE ---
  if (step === "done") {
    return (
      <div className="w-full max-w-xs overflow-hidden rounded-xl border border-white/20 bg-black/40 p-6 text-center shadow-2xl backdrop-blur-xl">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-green-400">
          <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-xl font-extrabold text-white">Password changed</h1>
        <p className="mt-1.5 text-xs text-neutral-300">
          You can now sign in with your new password.
        </p>
        <Link href="/sign-in" className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-600">
          Go to sign in
        </Link>
      </div>
    );
  }

  // --- RESET STATE ---
  if (step === "reset") {
    return (
      <form ref={formRef} onSubmit={reset} noValidate className="w-full max-w-xs overflow-hidden rounded-xl border border-white/20 bg-black/40 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
        <div className="mb-5 text-center">
          <h1 className="text-lg font-extrabold text-white">Set a new password</h1>
          <p className="mt-1 text-[10px] text-neutral-300">
            If an account exists for <strong className="text-white">{identifier.trim()}</strong>, we sent a {OTP_LENGTH}-digit code.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="code" className={labelBase}>Verification Code</label>
            <div className="relative">
              <FontAwesomeIcon icon={faKey} className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
              <input
                id="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={OTP_LENGTH}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                aria-invalid={!!errors.code}
                placeholder="000000"
                className={`${inputBase} pl-9 text-center text-base tracking-[0.5em] ${errors.code ? "border-red-500" : ""}`}
              />
            </div>
            {errors.code && <p className="mt-1 text-[9px] font-semibold text-red-400">{errors.code}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className={labelBase}>New Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputBase} pl-9 ${errors.password ? "border-red-500" : ""}`}
              />
            </div>
            {errors.password ? (
              <p className="mt-1 text-[9px] font-semibold text-red-400">{errors.password}</p>
            ) : (
              <p className="mt-1 text-[9px] text-white/50">Min 8 chars with letter & number.</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className={labelBase}>Confirm Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
              <input
                id="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={`${inputBase} pl-9 ${errors.confirm ? "border-red-500" : ""}`}
              />
            </div>
            {errors.confirm && <p className="mt-1 text-[9px] font-semibold text-red-400">{errors.confirm}</p>}
          </div>

          <button type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-600">
            Change Password
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] text-neutral-400">
          {seconds > 0 ? (
            <span>Resend in {seconds}s</span>
          ) : (
            <button type="button" onClick={() => setSeconds(30)} className="font-bold text-brand-500 hover:underline">
              Resend Code
            </button>
          )}
        </p>
      </form>
    );
  }

  // --- REQUEST STATE ---
  return (
    <form onSubmit={request} noValidate className="w-full max-w-xs overflow-hidden rounded-xl border border-white/20 bg-black/40 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <div className="mb-5 text-center">
        <h1 className="text-lg font-extrabold text-white">Forgot password?</h1>
        <p className="mt-1 text-[10px] text-neutral-300">
          Enter your email and we'll send a code.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="identifier" className={labelBase}>Email</label>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            <input
              id="identifier"
              autoComplete="username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (idError) setIdError(undefined);
              }}
              aria-invalid={!!idError}
              placeholder="you@example.com"
              className={`${inputBase} pl-9 ${idError ? "border-red-500" : ""}`}
            />
          </div>
          {idError && <p className="mt-1 text-[9px] font-semibold text-red-400">{idError}</p>}
        </div>

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-600">
          Send Code
        </button>
        
        <Link href="/sign-in" className="flex w-full items-center justify-center gap-1.5 rounded-md border border-white/10 py-2 text-xs font-bold text-white/70 transition-colors hover:bg-white/5 hover:text-white">
          <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}