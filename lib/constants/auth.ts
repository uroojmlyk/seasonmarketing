import type { PublicRole, StaffRole, UserRole } from "@/features/auth/types/auth.types";

// ✅ Re-export types so consumers can import from @/lib/constants/auth
export type { PublicRole, StaffRole, UserRole };

export const OTP_LENGTH = 6;
export const MAX_LOGIN_ATTEMPTS = 5;

export interface RoleOption {
  value: PublicRole;
  label: string;
  description: string;
  needsReview: boolean;
}

export const PUBLIC_ROLES: RoleOption[] = [
  {
    value: "buyer_tenant",
    label: "Buyer or Tenant",
    description: "I want to buy or rent a property.",
    needsReview: false,
  },
  {
    value: "owner",
    label: "Owner or Landlord",
    description: "I want to sell or rent out my own property.",
    needsReview: false,
  },
  {
    value: "agent",
    label: "Property Agent",
    description: "I help people buy, sell or rent properties.",
    needsReview: true,
  },
  {
    value: "agency_admin",
    label: "Agency",
    description: "I manage a real estate agency and its staff.",
    needsReview: true,
  },
  {
    value: "developer",
    label: "Developer or Builder",
    description: "I build and sell housing or commercial projects.",
    needsReview: true,
  },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  buyer_tenant: "Buyer / Tenant",
  owner: "Owner / Landlord",
  agent: "Agent",
  agency_admin: "Agency Administrator",
  developer: "Developer / Builder",
  content_editor: "Content Editor",
  moderator: "Moderator / Verifier",
  support_officer: "Support Officer",
  finance_operator: "Finance / Billing Operator",
  super_admin: "Super Administrator",
};

export const ROLE_HOME: Record<UserRole, string> = {
  buyer_tenant: "/dashboard/buyer",
  owner: "/dashboard/owner",
  agent: "/dashboard/agent",
  agency_admin: "/dashboard/agency", // ✅ fixed
  developer: "/dashboard/developer",
  content_editor: "/dashboard/admin/content",
  moderator: "/dashboard/admin/verification",
  support_officer: "/dashboard/admin/support",
  finance_operator: "/dashboard/admin/billing",
  super_admin: "/dashboard/admin",
};

export const STAFF_ROLES: StaffRole[] = [
  "content_editor",
  "moderator",
  "support_officer",
  "finance_operator",
  "super_admin",
];

export function isStaffRole(role: UserRole): role is StaffRole {
  return (STAFF_ROLES as UserRole[]).includes(role);
}

const ROLE_QUERY: Record<string, PublicRole> = {
  buyer: "buyer_tenant",
  tenant: "buyer_tenant",
  owner: "owner",
  agent: "agent",
  agency: "agency_admin",
  developer: "developer",
};

export function parseRoleParam(value?: string): PublicRole {
  return (value && ROLE_QUERY[value.toLowerCase()]) || "buyer_tenant";
}

export const DEMO_PASSWORD = "Demo@1234";
export const DEMO_ACCOUNTS: { email: string; role: UserRole }[] = [
  { email: "buyer@demo.pk", role: "buyer_tenant" },
  { email: "owner@demo.pk", role: "owner" },
  { email: "agent@demo.pk", role: "agent" },
  { email: "agency@demo.pk", role: "agency_admin" },
  { email: "developer@demo.pk", role: "developer" },
  { email: "editor@demo.pk", role: "content_editor" },
  { email: "moderator@demo.pk", role: "moderator" },
  { email: "support@demo.pk", role: "support_officer" },
  { email: "finance@demo.pk", role: "finance_operator" },
  { email: "admin@demo.pk", role: "super_admin" },
];