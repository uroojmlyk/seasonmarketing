// import { Suspense } from "react";
// import { notFound } from "next/navigation";
// import PropertyDetailClient from "@/features/properties/components/PropertyDetailClient";
// import { allProperties } from "@/lib/constants/data";

// async function PropertyContent({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const property = allProperties.find((p) => p.slug === slug);

//   if (!property) notFound();

//   const similarProperties = allProperties
//     .filter(p => p.slug !== property.slug && p.city === property.city)
//     .slice(0, 3);

//   return <PropertyDetailClient property={property} similarProperties={similarProperties} />;
// }

// export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
//   return (
//     <Suspense fallback={
//       <div className="flex min-h-screen items-center justify-center bg-neutral-50">
//         <p className="text-sm font-medium text-neutral-500">Loading property details...</p>
//       </div>
//     }>
//       <PropertyContent params={params} />
//     </Suspense>
//   );
// }





import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetail from "@/features/properties/components/detail/PropertyDetail";
import { allProperties } from "@/lib/constants/data";
import { getSimilar } from "@/features/properties/lib/propertyDetail";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = allProperties.find((x) => x.slug === slug);
  if (!p) return { title: "Property not found | Season Marketing" };
  return {
    title: `${p.title} | ${p.price} | Season Marketing`,
    description: `${p.title} ${p.purpose.toLowerCase()} in ${p.location}. ${p.area}${p.beds ? `, ${p.beds} bedrooms` : ""}. ${p.price}.`,
    openGraph: { title: p.title, description: `${p.price} · ${p.location}`, images: [p.image] },
  };
}

async function PropertyContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = allProperties.find((p) => p.slug === slug);

  if (!property) notFound();

  return <PropertyDetail property={property} similar={getSimilar(property, 6)} />;
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50 px-4 pt-28 sm:px-6 lg:px-8" aria-busy="true">
      <div className="mx-auto max-w-7xl animate-pulse space-y-5">
        <div className="h-4 w-64 rounded bg-neutral-200" />
        <div className="h-9 w-3/4 rounded bg-neutral-200" />
        <div className="h-[260px] rounded-2xl bg-neutral-200 sm:h-[360px] lg:h-[480px]" />
        <div className="h-40 rounded-2xl bg-neutral-200" />
      </div>
    </div>
  );
}

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <PropertyContent params={params} />
    </Suspense>
  );
}