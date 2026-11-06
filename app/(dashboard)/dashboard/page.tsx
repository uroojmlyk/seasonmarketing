"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROLE_HOME, type UserRole } from "@/lib/constants/auth";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    const role = savedRole && ROLE_HOME[savedRole] ? savedRole : "buyer_tenant";
    router.replace(ROLE_HOME[role]);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-50">
      <p className="text-sm font-medium text-neutral-500">Redirecting to your dashboard...</p>
    </div>
  );
}