"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/lib/constants/data";

// Map ko server side par load hone se rokein
const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-180px)] w-full items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
      <p className="text-sm font-medium text-neutral-500">Loading map...</p>
    </div>
  ),
});

interface Props {
  properties: Property[];
  center: [number, number];
}

export default function PropertyMapWrapper({ properties, center }: Props) {
  return <PropertyMap properties={properties} center={center} />;
}