"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faLock,
  faUser,
  faHouse,
  faUserTie,
  faBuilding,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import type { PublicRole } from "@/lib/constants/auth";

/* ============================================
   TYPES
   ============================================ */

type Role = PublicRole;

interface RegisterFormProps {
  initialRole?: PublicRole;
}

/* ============================================
   COMPONENT
   ============================================ */

export default function RegisterForm({ initialRole }: RegisterFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole ?? "buyer_tenant");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/sign-in");
    }, 1500);
  };

  // Common Styles - Responsive
  const inputBase =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium text-white outline-none backdrop-blur-sm transition-all duration-150 placeholder:text-white/40 focus:border-brand-500 focus:bg-white/10 sm:py-2.5 sm:text-sm";
  const labelBase =
    "mb-1 block text-[9px] font-bold uppercase tracking-wider text-white/60 sm:mb-1.5 sm:text-[10px]";

  return (
    <div className="w-full max-w-[320px] rounded-xl border border-white/20 bg-black/40 p-5 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-6">
      {/* Logo & Header */}
      <div className="mb-4 flex flex-col items-center sm:mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white transition hover:opacity-80"
        >
          <FontAwesomeIcon
            icon={faHouse}
            className="h-6 w-6 text-brand-500 sm:h-8 sm:w-8"
          />
          <span className="font-display text-base font-extrabold tracking-tight sm:text-xl">
            Season<span className="text-brand-500">Marketing</span>
          </span>
        </Link>
        <h1 className="mt-2 text-base font-bold text-white sm:mt-4 sm:text-lg">
          Create an account
        </h1>
        <p className="mt-1 text-[10px] text-neutral-300 sm:text-xs">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-bold text-brand-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Role Selection */}
        <div>
          <label className={labelBase}>I am a...</label>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {[
              { id: "buyer_tenant", label: "Buyer", icon: faUser },
              { id: "owner", label: "Owner", icon: faHouse },
              { id: "agent", label: "Agent", icon: faUserTie },
              { id: "agency_admin", label: "Agency", icon: faBuilding },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id as Role)}
                className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-left transition-all duration-150 sm:gap-2 sm:px-3 sm:py-2 ${
                  role === r.id
                    ? "border-brand-500 bg-brand-500/20 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FontAwesomeIcon
                  icon={r.icon}
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                    role === r.id ? "text-brand-400" : "text-white/40"
                  }`}
                />
                <span className="text-[10px] font-bold sm:text-xs">
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className={labelBase}>
            Full Name
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 sm:h-3.5 sm:w-3.5"
            />
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ali Khan"
              className={`${inputBase} pl-8 sm:pl-9`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelBase}>
            Email Address
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 sm:h-3.5 sm:w-3.5"
            />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`${inputBase} pl-8 sm:pl-9`}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone Number
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faPhone}
              className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 sm:h-3.5 sm:w-3.5"
            />
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className={`${inputBase} pl-8 sm:pl-9`}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={labelBase}>
            Password
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 sm:h-3.5 sm:w-3.5"
            />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputBase} pl-8 sm:pl-9`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-500 py-2 text-xs font-bold text-white transition-colors duration-150 hover:bg-brand-600 disabled:opacity-70 sm:gap-2 sm:py-2.5 sm:text-sm"
        >
          {isLoading ? (
            "Creating..."
          ) : (
            <>
              Create Account
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
              />
            </>
          )}
        </button>
      </div>

      <p className="mt-3 text-center text-[9px] leading-relaxed text-white/50 sm:mt-4 sm:text-[10px]">
        By creating an account, you agree to our{" "}
        <Link
          href="/legal/terms"
          className="font-semibold text-white underline hover:text-brand-400"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/legal/privacy"
          className="font-semibold text-white underline hover:text-brand-400"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}