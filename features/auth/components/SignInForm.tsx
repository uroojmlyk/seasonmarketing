"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faShieldHalved,
  faEnvelope,
  faLock,
  faHouse,
  faChevronDown,
  faUserShield,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { validateIdentifier, validateOtp } from "@/features/auth/schemas/auth.schemas";
import type { UserRole } from "@/features/auth/types/auth.types";
import {
  DEMO_ACCOUNTS,
  DEMO_PASSWORD,
  MAX_LOGIN_ATTEMPTS,
  OTP_LENGTH,
  ROLE_HOME,
  ROLE_LABELS,
  isStaffRole,
} from "@/lib/constants/auth";

type Step = "credentials" | "mfa" | "done";

export default function SignInForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [role, setRole] = useState<UserRole>("buyer_tenant");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [showDemo, setShowDemo] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      setFormError("Too many failed attempts. Please wait a few minutes.");
      return;
    }

    const errs = {
      identifier: validateIdentifier(identifier),
      password: password ? undefined : "Enter your password.",
    };
    setErrors(errs);
    if (errs.identifier || errs.password) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      );
      return;
    }

    if (password === "wrongpass1") {
      const n = attempts + 1;
      setAttempts(n);
      setFormError(
        n >= MAX_LOGIN_ATTEMPTS
          ? "Too many failed attempts."
          : "The email, mobile number or password is not correct."
      );
      return;
    }

    const account = DEMO_ACCOUNTS.find((a) => a.email === identifier.trim().toLowerCase());
    const r = account?.role ?? "buyer_tenant";
    setRole(r);

    if (isStaffRole(r)) {
      setStep("mfa");
    } else {
      handleSuccess(r);
    }
  };

  const verifyMfa = (e: FormEvent) => {
    e.preventDefault();
    const err = validateOtp(code);
    setCodeError(err);
    if (!err) handleSuccess(role);
  };

  const handleSuccess = (userRole: UserRole) => {
    setStep("done");
    localStorage.setItem("userRole", userRole);
    setTimeout(() => {
      router.push(ROLE_HOME[userRole]);
    }, 2500);
  };

  // Common Styles - Responsive
  const inputBase = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium text-white outline-none backdrop-blur-sm transition-all duration-150 placeholder:text-white/40 focus:border-brand-500 focus:bg-white/10 sm:py-2.5 sm:text-sm";
  const labelBase = "mb-1 block text-[9px] font-bold uppercase tracking-wider text-white/60 sm:mb-1.5 sm:text-[10px]";

  // --- SUCCESS MODAL ---
  if (step === "done") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
        <div className="w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/20 bg-black/60 p-5 text-center shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-300 sm:max-w-sm sm:p-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 sm:h-16 sm:w-16">
            <FontAwesomeIcon icon={faCircleCheck} className="h-7 w-7 text-green-500 sm:h-8 sm:w-8" />
          </div>
          <h1 className="mt-3 text-lg font-extrabold text-white sm:mt-4 sm:text-xl">Welcome Back!</h1>
          <p className="mt-1 text-xs text-neutral-300 sm:mt-1.5 sm:text-sm">
            Signed in as <strong className="text-white">{ROLE_LABELS[role]}</strong>.
          </p>
          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10 sm:mt-6">
            <div className="h-full w-1/3 animate-progress rounded-full bg-brand-500"></div>
          </div>
          <p className="mt-2 text-[10px] font-medium text-neutral-400 sm:text-xs">Redirecting...</p>
        </div>
      </div>
    );
  }

  // --- MFA STATE ---
  if (step === "mfa") {
    return (
      <div className="w-full max-w-[320px] rounded-xl border border-white/20 bg-black/40 p-5 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-6">
        <button onClick={() => setStep("credentials")} className="mb-3 flex items-center gap-1 text-[10px] font-semibold text-white/50 hover:text-white sm:mb-4 sm:text-xs">
          <FontAwesomeIcon icon={faXmark} className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Cancel
        </button>
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 sm:h-12 sm:w-12">
          <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <h1 className="mt-2 text-center text-base font-bold text-white sm:mt-3 sm:text-lg">Security Check</h1>
        <p className="mt-1 mb-3 text-center text-[10px] text-neutral-300 sm:mb-4 sm:text-xs">
          Enter {OTP_LENGTH}-digit code.
        </p>
        <div>
          <label htmlFor="mfa" className={labelBase}>Code</label>
          <input
            id="mfa"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            aria-invalid={!!codeError}
            placeholder="000000"
            className={`${inputBase} text-center text-base tracking-[0.5em] ${codeError ? "border-red-500" : ""}`}
          />
          {codeError && <p className="mt-1 text-[9px] font-semibold text-red-400 sm:text-[10px]">{codeError}</p>}
        </div>
        <button type="submit" onClick={verifyMfa} className="mt-3 w-full rounded-lg bg-brand-500 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-600 sm:mt-4 sm:py-2.5 sm:text-sm">
          Verify & Sign In
        </button>
      </div>
    );
  }

  // --- CREDENTIALS STATE ---
  return (
    <div className="w-full max-w-[320px] rounded-xl border border-white/20 bg-black/40 p-5 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-6">
      {/* Logo */}
      <div className="mb-4 flex flex-col items-center sm:mb-6">
        <Link href="/" className="flex items-center gap-2 text-white transition hover:opacity-80">
          <FontAwesomeIcon icon={faHouse} className="h-6 w-6 text-brand-500 sm:h-8 sm:w-8" />
          <span className="font-display text-base font-extrabold tracking-tight sm:text-xl">
            Season<span className="text-brand-500">Marketing</span>
          </span>
        </Link>
        <h1 className="mt-2 text-base font-bold text-white sm:mt-4 sm:text-lg">Sign in</h1>
        <p className="mt-1 text-[10px] text-neutral-300 sm:text-xs">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-brand-500 hover:underline">
            Create one
          </Link>
        </p>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white py-2 text-[11px] font-bold text-neutral-700 transition-colors hover:bg-neutral-50 sm:mb-4 sm:py-2.5 sm:text-xs"
      >
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div className="relative mb-3 flex items-center justify-center sm:mb-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
        <span className="relative bg-transparent px-2 text-[9px] font-bold uppercase tracking-wider text-neutral-400 sm:text-[10px]">Or with email</span>
      </div>

      {formError && (
        <p role="alert" className="mb-3 rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-center text-[10px] font-medium text-red-400 sm:mb-4 sm:p-2 sm:text-xs">
          {formError}
        </p>
      )}

      <form ref={formRef} onSubmit={submit} noValidate className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="identifier" className={labelBase}>Email Address</label>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 sm:h-3.5 sm:w-3.5" />
            <input
              id="identifier"
              name="identifier"
              autoComplete="username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors((p) => ({ ...p, identifier: undefined }));
              }}
              placeholder="you@example.com"
              className={`${inputBase} pl-8 sm:pl-9 ${errors.identifier ? "border-red-500" : ""}`}
            />
          </div>
          {errors.identifier && <p className="mt-1 text-[9px] font-semibold text-red-400 sm:text-[10px]">{errors.identifier}</p>}
        </div>

        <div>
          <label htmlFor="password" className={labelBase}>Password</label>
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 sm:h-3.5 sm:w-3.5" />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
              }}
              placeholder="••••••••"
              className={`${inputBase} pl-8 sm:pl-9 ${errors.password ? "border-red-500" : ""}`}
            />
          </div>
          {errors.password && <p className="mt-1 text-[9px] font-semibold text-red-400 sm:text-[10px]">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-1.5 text-[10px] text-neutral-400 hover:text-white sm:gap-2 sm:text-xs">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-3 w-3 rounded border-white/20 bg-white/5 accent-brand-500 sm:h-3.5 sm:w-3.5" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-[10px] font-bold text-brand-500 hover:underline sm:text-xs">
            Forgot?
          </Link>
        </div>

        <button type="submit" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-500 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-600 sm:gap-2 sm:py-2.5 sm:text-sm">
          Sign In
          <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </button>
      </form>

      {/* Demo Accounts Toggle — visible in ALL environments */}
      <div className="mt-4 border-t border-white/10 pt-3 sm:mt-5 sm:pt-4">
        <button
          type="button"
          onClick={() => setShowDemo(!showDemo)}
          className="flex w-full items-center justify-between text-[9px] font-bold uppercase tracking-wider text-neutral-400 transition hover:text-white sm:text-[10px]"
        >
          <span>Demo Accounts</span>
          <FontAwesomeIcon icon={faChevronDown} className={`h-2.5 w-2.5 transition-transform sm:h-3 sm:w-3 ${showDemo ? "rotate-180" : ""}`} />
        </button>

        {showDemo && (
          <div className="mt-2 grid grid-cols-2 gap-1 sm:mt-3 sm:gap-1.5">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.email}
                type="button"
                onClick={() => {
                  setIdentifier(a.email);
                  setPassword(DEMO_PASSWORD);
                  setErrors({});
                  setFormError("");
                }}
                className="flex w-full items-center gap-1 overflow-hidden rounded border border-white/5 bg-white/5 px-1.5 py-1 text-left text-[9px] font-medium text-neutral-400 transition hover:bg-white/10 hover:text-white sm:gap-1.5 sm:px-2 sm:py-1.5 sm:text-[10px]"
              >
                <FontAwesomeIcon icon={faUserShield} className="h-2.5 w-2.5 shrink-0 text-brand-500 sm:h-3 sm:w-3" />
                <span className="truncate">{ROLE_LABELS[a.role]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}