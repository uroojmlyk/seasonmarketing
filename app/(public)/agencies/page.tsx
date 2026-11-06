import { Suspense } from "react";
import type { Metadata } from "next";
import AgentDirectory from "@/features/agents/components/AgentDirectory";

export const metadata: Metadata = {
  title: "Property Agencies | Season Marketing",
  description: "Find property agencies for houses, plots and commercial space across Pakistan.",
};

export default function AgenciesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50" />}>
      <AgentDirectory mode="agency" />
    </Suspense>
  );
}