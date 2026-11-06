import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { parseRoleParam } from "@/lib/constants/auth";

export const metadata: Metadata = { title: "Create account | Season Marketing" };

type Props = { searchParams: Promise<{ role?: string | string[] }> };

// searchParams is read inside <Suspense> because Cache Components is enabled in this project.
async function RegisterContent({ searchParams }: Props) {
  const { role } = await searchParams;
  const value = Array.isArray(role) ? role[0] : role;
  return <RegisterForm initialRole={parseRoleParam(value)} />;
}

export default function RegisterPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div className="h-[640px] animate-pulse rounded-2xl bg-white" />}>
      <RegisterContent searchParams={searchParams} />
    </Suspense>
  );
}