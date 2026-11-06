// Roles come from the specification (section 3).
// Public roles can self-register. Staff roles are created internally by a Super Administrator (ADM-01).

export type PublicRole = "buyer_tenant" | "owner" | "agent" | "agency_admin" | "developer";

export type StaffRole =
  | "content_editor"
  | "moderator"
  | "support_officer"
  | "finance_operator"
  | "super_admin";

export type UserRole = PublicRole | StaffRole;

export interface RegisterValues {
  role: PublicRole;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  organisation: string;
  city: string;
  experience: string;
  website: string;
  acceptTerms: boolean;
  marketingConsent: boolean;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;