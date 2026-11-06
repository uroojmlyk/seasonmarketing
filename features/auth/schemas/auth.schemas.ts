import type { FieldErrors, PublicRole, RegisterValues } from "@/features/auth/types/auth.types";
import { OTP_LENGTH } from "@/lib/constants/auth";

// Plain validators (no extra package needed). Can be replaced with zod later.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts 0300 1234567, 03001234567, +92 300 1234567, 92300... and returns +923001234567 */
export function normalizePkMobile(input: string): string | null {
  const cleaned = input.replace(/[\s()-]/g, "");
  const m = cleaned.match(/^(?:\+92|0092|92|0)?(3\d{9})$/);
  return m ? `+92${m[1]}` : null;
}

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Please enter your email address.";
  if (!EMAIL_RE.test(value.trim())) return "Enter a valid email address, for example name@example.com.";
}

export function validateIdentifier(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your email address or mobile number.";
  if (v.includes("@")) return validateEmail(v);
  if (!normalizePkMobile(v)) return "Enter a valid email or a Pakistani mobile number like 0300 1234567.";
}

export function validatePassword(value: string): string | undefined {
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return "Use at least one letter and one number.";
}

export function passwordStrength(value: string): { score: number; label: string } {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

export function validateOtp(value: string): string | undefined {
  if (!new RegExp(`^\\d{${OTP_LENGTH}}$`).test(value.trim())) return `Enter the ${OTP_LENGTH} digit code.`;
}

// Which extra fields each role needs at sign up (verification documents are submitted later from the dashboard).
export interface RoleFieldRules {
  organisation: "none" | "optional" | "required";
  organisationLabel: string;
  city: boolean;
  cityLabel: string;
  experience: boolean;
  website: boolean;
}

export const ROLE_FIELDS: Record<PublicRole, RoleFieldRules> = {
  buyer_tenant: { organisation: "none", organisationLabel: "", city: false, cityLabel: "", experience: false, website: false },
  owner: { organisation: "none", organisationLabel: "", city: false, cityLabel: "", experience: false, website: false },
  agent: { organisation: "optional", organisationLabel: "Agency or company name", city: true, cityLabel: "Main city you work in", experience: true, website: false },
  agency_admin: { organisation: "required", organisationLabel: "Agency name", city: true, cityLabel: "Agency city", experience: false, website: true },
  developer: { organisation: "required", organisationLabel: "Company or developer name", city: true, cityLabel: "Main project city", experience: false, website: true },
};

export function validateRegister(v: RegisterValues): FieldErrors<RegisterValues> {
  const e: FieldErrors<RegisterValues> = {};
  const rules = ROLE_FIELDS[v.role];

  if (v.fullName.trim().length < 3) e.fullName = "Please enter your full name.";

  const emailError = validateEmail(v.email);
  if (emailError) e.email = emailError;

  if (!normalizePkMobile(v.phone)) e.phone = "Enter a valid Pakistani mobile number, for example 0300 1234567.";

  const pwError = validatePassword(v.password);
  if (pwError) e.password = pwError;

  if (v.confirmPassword !== v.password) e.confirmPassword = "Passwords do not match.";

  if (rules.organisation === "required" && v.organisation.trim().length < 2) {
    e.organisation = `Please enter your ${rules.organisationLabel.toLowerCase()}.`;
  }
  if (rules.city && !v.city) e.city = "Please choose a city.";
  if (rules.website && v.website.trim() && !/^https?:\/\/\S+\.\S+/.test(v.website.trim())) {
    e.website = "Enter the full website address, starting with https://";
  }
  if (!v.acceptTerms) e.acceptTerms = "Please accept the Terms of Use and Privacy Notice to continue.";

  return e;
}