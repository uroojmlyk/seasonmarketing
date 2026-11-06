import { Suspense } from "react";
import type { Metadata } from "next";
import AgentDirectory from "@/features/agents/components/AgentDirectory";

export const metadata: Metadata = {
  title: "Find a Property Agent | Season Marketing",
  description: "Browse property agents in Lahore, Karachi, Islamabad, Peshawar and Quetta.",
};

export default function AgentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50" />}>
      <AgentDirectory mode="agent" />
    </Suspense>
  );
}