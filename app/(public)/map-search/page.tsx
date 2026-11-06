import { Suspense } from "react";
import type { Metadata } from "next";
import MapSearch from "@/features/properties/components/MapSearch";

export const metadata: Metadata = {
  title: "Map Search | Season Marketing",
};

export default function MapSearchPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-neutral-50 text-sm font-medium text-neutral-500">
        Loading map...
      </div>
    }>
      <MapSearch />
    </Suspense>
  );
}