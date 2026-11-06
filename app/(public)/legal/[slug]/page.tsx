// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faShieldHalved,
//   faScaleBalanced,
//   faCookieBite,
//   faFileContract,
//   faArrowRight,
//   faChevronRight,
//   faClock,
//   faFileLines,
//   faEnvelope,
//   faCircleInfo,
//   faArrowUpRightFromSquare,
//   faPrint,
// } from "@fortawesome/free-solid-svg-icons";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// interface LegalSection {
//   heading: string;
//   text: string;
// }

// interface LegalDoc {
//   title: string;
//   shortTitle: string;
//   icon: IconDefinition;
//   updated: string;
//   intro: string;
//   readMinutes: number;
//   sections: LegalSection[];
// }

// const LEGAL_DATA: Record<string, LegalDoc> = {
//   privacy: {
//     title: "Privacy Policy",
//     shortTitle: "Privacy",
//     icon: faShieldHalved,
//     updated: "October 2026",
//     readMinutes: 4,
//     intro:
//       "How Season Marketing collects, uses, and protects the personal information you share with us.",
//     sections: [
//       {
//         heading: "1. Information We Collect",
//         text: "We collect information you provide directly to us, such as when you create an account, post a property listing, or contact us. This includes your name, email address, phone number, and property details. We also automatically collect certain technical information when you use our platform, such as IP address and browser type.",
//       },
//       {
//         heading: "2. How We Use Your Information",
//         text: "We use the information we collect to operate, maintain, and improve our marketplace. This includes facilitating communication between buyers, sellers, and agents, moderating listings to prevent fraud, and sending you technical notices and support messages.",
//       },
//       {
//         heading: "3. Sharing of Information",
//         text: "We do not sell your personal information. We may share your information with other users when you explicitly choose to enquire about a property. We may also share information with third-party service providers who perform services on our behalf, such as hosting and analytics.",
//       },
//       {
//         heading: "4. Data Security",
//         text: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.",
//       },
//     ],
//   },
//   terms: {
//     title: "Terms of Service",
//     shortTitle: "Terms",
//     icon: faScaleBalanced,
//     updated: "October 2026",
//     readMinutes: 5,
//     intro:
//       "The agreement between you and Season Marketing governing the use of our website, listings, and services.",
//     sections: [
//       {
//         heading: "1. Acceptance of Terms",
//         text: "By accessing or using the Season Marketing website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
//       },
//       {
//         heading: "2. User Responsibilities",
//         text: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate, current, and complete information when creating a listing.",
//       },
//       {
//         heading: "3. Prohibited Conduct",
//         text: "You may not use our platform to post false, misleading, or fraudulent listings. You may not violate any laws, infringe on the rights of others, or attempt to interfere with the proper functioning of our website.",
//       },
//       {
//         heading: "4. Listing Accuracy Disclaimer",
//         text: "Season Marketing does not guarantee the accuracy of any listing. Users are solely responsible for verifying all information, including property ownership, pricing, and legal status, before making any financial commitments.",
//       },
//     ],
//   },
//   cookies: {
//     title: "Cookie Policy",
//     shortTitle: "Cookies",
//     icon: faCookieBite,
//     updated: "October 2026",
//     readMinutes: 3,
//     intro:
//       "What cookies we use, why we use them, and how you can control them in your browser.",
//     sections: [
//       {
//         heading: "1. What Are Cookies",
//         text: "Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences and understand how you use our platform.",
//       },
//       {
//         heading: "2. How We Use Cookies",
//         text: "We use essential cookies to keep you logged in and secure. We also use analytics cookies to improve our search functionality and user experience.",
//       },
//       {
//         heading: "3. Managing Cookies",
//         text: "You can control or delete cookies through your browser settings. However, disabling essential cookies may affect the functionality of our website.",
//       },
//     ],
//   },
//   "listing-rules": {
//     title: "Listing Rules & Guidelines",
//     shortTitle: "Listing Rules",
//     icon: faFileContract,
//     updated: "October 2026",
//     readMinutes: 4,
//     intro:
//       "The rules every advertiser must follow so the marketplace stays accurate, fair, and safe for everyone.",
//     sections: [
//       {
//         heading: "1. Accuracy is Mandatory",
//         text: "All listings must be accurate and up-to-date. The price, location, and features must reflect the actual property. Misleading photos or false prices will result in immediate removal.",
//       },
//       {
//         heading: "2. No Duplicate Listings",
//         text: "You may not post the same property multiple times. Duplicate listings will be removed to ensure a fair marketplace for all users.",
//       },
//       {
//         heading: "3. Right to Advertise",
//         text: "By posting a listing, you confirm that you are the owner of the property, an authorised agent, or have explicit permission to advertise the property.",
//       },
//       {
//         heading: "4. Prohibited Properties",
//         text: "We do not allow the listing of properties that are legally disputed, have unclear ownership, or are under government acquisition.",
//       },
//     ],
//   },
// };

// const LEGAL_KEYS = Object.keys(LEGAL_DATA);

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const data = LEGAL_DATA[slug];
//   return {
//     title: data ? `${data.title} | Season Marketing` : "Legal | Season Marketing",
//     description: data?.intro,
//   };
// }

// // Generate anchor id from heading — e.g. "1. Information We Collect" -> "information-we-collect"
// function anchorId(heading: string) {
//   return heading
//     .toLowerCase()
//     .replace(/^\d+\.\s*/, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }

// export default async function LegalPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const data = LEGAL_DATA[slug];
//   if (!data) notFound();

//   const related = LEGAL_KEYS.filter((k) => k !== slug).slice(0, 3);

//   return (
//     <div className="min-h-screen bg-neutral-50 pb-20">
//       {/* =========================================
//           HEADER — simple, serious, no shine
//           ========================================= */}
//       <header className="border-b border-neutral-200 bg-white">
//         <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//           {/* Breadcrumb */}
//           <nav
//             aria-label="Breadcrumb"
//             className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-neutral-500 sm:text-sm"
//           >
//             <Link href="/" className="transition hover:text-ink">
//               Home
//             </Link>
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="h-2.5 w-2.5 text-neutral-300"
//             />
//             <Link href="/legal/privacy" className="transition hover:text-ink">
//               Legal Centre
//             </Link>
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="h-2.5 w-2.5 text-neutral-300"
//             />
//             <span className="text-ink">{data.shortTitle}</span>
//           </nav>

//           {/* Title row */}
//           <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
//             <div className="min-w-0">
//               <div className="flex items-center gap-3">
//                 <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
//                   <FontAwesomeIcon icon={data.icon} className="h-4 w-4" />
//                 </span>
//                 <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
//                   Legal Document
//                 </span>
//               </div>
//               <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
//                 {data.title}
//               </h1>
//               <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
//                 {data.intro}
//               </p>

//               <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-neutral-500 sm:text-sm">
//                 <span className="inline-flex items-center gap-1.5">
//                   <FontAwesomeIcon
//                     icon={faClock}
//                     className="h-3 w-3 text-neutral-400"
//                   />
//                   {data.readMinutes} min read
//                 </span>
//                 <span className="inline-flex items-center gap-1.5">
//                   <FontAwesomeIcon
//                     icon={faCircleInfo}
//                     className="h-3 w-3 text-neutral-400"
//                   />
//                   Last updated: {data.updated}
//                 </span>
//               </div>
//             </div>

//             {/* Right-side doc switcher (desktop only) */}
//             <div className="hidden shrink-0 sm:block">
//               <Link
//                 href="/contact"
//                 className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-xs font-bold text-ink transition hover:border-ink hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
//                 Ask a question
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* =========================================
//           MAIN CONTENT
//           ========================================= */}
//       <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
//         <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
//           {/* LEFT: Sidebar — sticky doc nav + ToC */}
//           <aside className="lg:col-span-4 xl:col-span-3">
//             <div className="space-y-5 lg:sticky lg:top-24">
//               {/* Document switcher */}
//               <div className="rounded-xl border border-neutral-200 bg-white">
//                 <div className="border-b border-neutral-100 px-4 py-3">
//                   <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
//                     Legal documents
//                   </h2>
//                 </div>
//                 <nav className="p-2">
//                   {LEGAL_KEYS.map((key) => {
//                     const item = LEGAL_DATA[key];
//                     const active = key === slug;
//                     return (
//                       <Link
//                         key={key}
//                         href={`/legal/${key}`}
//                         aria-current={active ? "page" : undefined}
//                         className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
//                           active
//                             ? "bg-brand-50 text-brand-700"
//                             : "text-neutral-600 hover:bg-neutral-50 hover:text-ink"
//                         }`}
//                       >
//                         <FontAwesomeIcon
//                           icon={item.icon}
//                           className={`h-3.5 w-3.5 shrink-0 ${
//                             active ? "text-brand-500" : "text-neutral-400"
//                           }`}
//                         />
//                         <span className="truncate">{item.title}</span>
//                       </Link>
//                     );
//                   })}
//                 </nav>
//               </div>

//               {/* Table of contents */}
//               <div className="rounded-xl border border-neutral-200 bg-white">
//                 <div className="border-b border-neutral-100 px-4 py-3">
//                   <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
//                     On this page
//                   </h2>
//                 </div>
//                 <nav className="p-2">
//                   <ol className="space-y-0.5">
//                     {data.sections.map((s, i) => (
//                       <li key={i}>
//                         <a
//                           href={`#${anchorId(s.heading)}`}
//                           className="block rounded-md px-3 py-2 text-xs leading-snug text-neutral-600 transition hover:bg-neutral-50 hover:text-ink"
//                         >
//                           <span className="mr-1.5 font-semibold text-neutral-400">
//                             {String(i + 1).padStart(2, "0")}
//                           </span>
//                           {s.heading.replace(/^\d+\.\s*/, "")}
//                         </a>
//                       </li>
//                     ))}
//                   </ol>
//                 </nav>
//               </div>
//             </div>
//           </aside>

//           {/* RIGHT: Content */}
//           <article className="lg:col-span-8 xl:col-span-9">
//             <div className="rounded-xl border border-neutral-200 bg-white">
//               {/* Meta bar */}
//               <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 px-6 py-4 sm:px-8">
//                 <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
//                   <FontAwesomeIcon
//                     icon={faFileLines}
//                     className="h-3.5 w-3.5 text-neutral-400"
//                   />
//                   <span>
//                     {data.sections.length}{" "}
//                     {data.sections.length === 1 ? "section" : "sections"}
//                   </span>
//                   <span className="text-neutral-300">·</span>
//                   <span>Last updated {data.updated}</span>
//                 </div>
//                 <a
//                   href="mailto:legal@seasonmarketing.pk"
//                   className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition hover:text-brand-700"
//                 >
//                   <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
//                   legal@seasonmarketing.pk
//                 </a>
//               </div>

//               {/* Sections */}
//               <div className="px-6 sm:px-8">
//                 {data.sections.map((section, idx) => {
//                   const id = anchorId(section.heading);
//                   const num = String(idx + 1).padStart(2, "0");
//                   const cleanHeading = section.heading.replace(/^\d+\.\s*/, "");

//                   return (
//                     <section
//                       key={idx}
//                       id={id}
//                       className={`scroll-mt-28 py-7 ${
//                         idx !== data.sections.length - 1
//                           ? "border-b border-neutral-100"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <span className="mt-1 shrink-0 font-mono text-xs font-bold text-brand-500">
//                           {num}
//                         </span>
//                         <div className="min-w-0 flex-1">
//                           <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
//                             {cleanHeading}
//                           </h2>
//                           <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
//                             {section.text}
//                           </p>
//                         </div>
//                       </div>
//                     </section>
//                   );
//                 })}
//               </div>

//               {/* Footer action */}
//               <div className="border-t border-neutral-100 bg-neutral-50/60 px-6 py-5 sm:px-8">
//                 <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
//                   <div>
//                     <p className="text-sm font-bold text-ink">
//                       Have questions about this policy?
//                     </p>
//                     <p className="mt-0.5 text-xs text-neutral-500">
//                       Our legal team responds to written enquiries within 2
//                       business days.
//                     </p>
//                   </div>
//                   <Link
//                     href="/contact"
//                     className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-xs font-bold text-ink transition hover:border-ink hover:bg-white"
//                   >
//                     <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
//                     Contact Legal
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Disclaimer note — info bar, not glossy */}
//             <div className="mt-5 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
//               <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
//                 <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
//               </span>
//               <p className="text-xs leading-relaxed text-neutral-600">
//                 <span className="font-semibold text-ink">Note:</span> This
//                 document is a summary for clarity. If anything here conflicts
//                 with applicable Pakistani law, the law prevails. For legal
//                 advice about a specific property, consult a qualified lawyer.
//               </p>
//             </div>
//           </article>
//         </div>

//         {/* =========================================
//             RELATED DOCUMENTS
//             ========================================= */}
//         <section className="mt-14 sm:mt-20">
//           <div className="mb-6 flex items-end justify-between">
//             <div>
//               <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
//                 Other legal documents
//               </h2>
//               <p className="mt-2 text-lg font-bold text-ink sm:text-xl">
//                 Continue reading
//               </p>
//             </div>
//             <Link
//               href="/legal/privacy"
//               className="hidden items-center gap-1.5 text-xs font-semibold text-brand-600 transition hover:text-brand-700 sm:inline-flex"
//             >
//               View all
//               <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
//             </Link>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {related.map((key) => {
//               const item = LEGAL_DATA[key];
//               return (
//                 <Link
//                   key={key}
//                   href={`/legal/${key}`}
//                   className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300"
//                 >
//                   <div className="flex items-start justify-between">
//                     <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 transition group-hover:bg-brand-50 group-hover:text-brand-600">
//                       <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5" />
//                     </span>
//                     <FontAwesomeIcon
//                       icon={faArrowUpRightFromSquare}
//                       className="h-3 w-3 text-neutral-300 transition group-hover:text-brand-500"
//                     />
//                   </div>
//                   <h3 className="mt-4 text-sm font-bold text-ink">
//                     {item.title}
//                   </h3>
//                   <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
//                     {item.intro}
//                   </p>
//                   <p className="mt-3 text-[11px] font-medium text-neutral-400">
//                     {item.readMinutes} min read
//                   </p>
//                 </Link>
//               );
//             })}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }




import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faScaleBalanced,
  faCookieBite,
  faFileContract,
  faArrowRight,
  faChevronRight,
  faClock,
  faFileLines,
  faEnvelope,
  faCircleInfo,
  faArrowUpRightFromSquare,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface LegalSection {
  heading: string;
  text: string;
}

interface LegalDoc {
  title: string;
  shortTitle: string;
  icon: IconDefinition;
  updated: string;
  intro: string;
  readMinutes: number;
  sections: LegalSection[];
}

const LEGAL_DATA: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    shortTitle: "Privacy",
    icon: faShieldHalved,
    updated: "October 2026",
    readMinutes: 4,
    intro:
      "How Season Marketing collects, uses, and protects the personal information you share with us.",
    sections: [
      {
        heading: "1. Information We Collect",
        text: "We collect information you provide directly to us, such as when you create an account, post a property listing, or contact us. This includes your name, email address, phone number, and property details. We also automatically collect certain technical information when you use our platform, such as IP address and browser type.",
      },
      {
        heading: "2. How We Use Your Information",
        text: "We use the information we collect to operate, maintain, and improve our marketplace. This includes facilitating communication between buyers, sellers, and agents, moderating listings to prevent fraud, and sending you technical notices and support messages.",
      },
      {
        heading: "3. Sharing of Information",
        text: "We do not sell your personal information. We may share your information with other users when you explicitly choose to enquire about a property. We may also share information with third-party service providers who perform services on our behalf, such as hosting and analytics.",
      },
      {
        heading: "4. Data Security",
        text: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    shortTitle: "Terms",
    icon: faScaleBalanced,
    updated: "October 2026",
    readMinutes: 5,
    intro:
      "The agreement between you and Season Marketing governing the use of our website, listings, and services.",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        text: "By accessing or using the Season Marketing website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      },
      {
        heading: "2. User Responsibilities",
        text: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate, current, and complete information when creating a listing.",
      },
      {
        heading: "3. Prohibited Conduct",
        text: "You may not use our platform to post false, misleading, or fraudulent listings. You may not violate any laws, infringe on the rights of others, or attempt to interfere with the proper functioning of our website.",
      },
      {
        heading: "4. Listing Accuracy Disclaimer",
        text: "Season Marketing does not guarantee the accuracy of any listing. Users are solely responsible for verifying all information, including property ownership, pricing, and legal status, before making any financial commitments.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    shortTitle: "Cookies",
    icon: faCookieBite,
    updated: "October 2026",
    readMinutes: 3,
    intro:
      "What cookies we use, why we use them, and how you can control them in your browser.",
    sections: [
      {
        heading: "1. What Are Cookies",
        text: "Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences and understand how you use our platform.",
      },
      {
        heading: "2. How We Use Cookies",
        text: "We use essential cookies to keep you logged in and secure. We also use analytics cookies to improve our search functionality and user experience.",
      },
      {
        heading: "3. Managing Cookies",
        text: "You can control or delete cookies through your browser settings. However, disabling essential cookies may affect the functionality of our website.",
      },
    ],
  },
  "listing-rules": {
    title: "Listing Rules & Guidelines",
    shortTitle: "Listing Rules",
    icon: faFileContract,
    updated: "October 2026",
    readMinutes: 4,
    intro:
      "The rules every advertiser must follow so the marketplace stays accurate, fair, and safe for everyone.",
    sections: [
      {
        heading: "1. Accuracy is Mandatory",
        text: "All listings must be accurate and up-to-date. The price, location, and features must reflect the actual property. Misleading photos or false prices will result in immediate removal.",
      },
      {
        heading: "2. No Duplicate Listings",
        text: "You may not post the same property multiple times. Duplicate listings will be removed to ensure a fair marketplace for all users.",
      },
      {
        heading: "3. Right to Advertise",
        text: "By posting a listing, you confirm that you are the owner of the property, an authorised agent, or have explicit permission to advertise the property.",
      },
      {
        heading: "4. Prohibited Properties",
        text: "We do not allow the listing of properties that are legally disputed, have unclear ownership, or are under government acquisition.",
      },
    ],
  },
};

const LEGAL_KEYS = Object.keys(LEGAL_DATA);

// Build time par saare legal pages prerender hote hain (privacy, terms, cookies ...)
export function generateStaticParams() {
  return LEGAL_KEYS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = LEGAL_DATA[slug];
  return {
    title: data ? `${data.title} | Season Marketing` : "Legal | Season Marketing",
    description: data?.intro,
  };
}

// Generate anchor id from heading — e.g. "1. Information We Collect" -> "information-we-collect"
function anchorId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function LegalContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = LEGAL_DATA[slug];
  if (!data) notFound();

  const related = LEGAL_KEYS.filter((k) => k !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* =========================================
          HEADER — simple, serious, no shine
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-neutral-500 sm:text-sm"
          >
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-2.5 w-2.5 text-neutral-300"
            />
            <Link href="/legal/privacy" className="transition hover:text-ink">
              Legal Centre
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-2.5 w-2.5 text-neutral-300"
            />
            <span className="text-ink">{data.shortTitle}</span>
          </nav>

          {/* Title row */}
          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <FontAwesomeIcon icon={data.icon} className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                  Legal Document
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {data.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                {data.intro}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-neutral-500 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="h-3 w-3 text-neutral-400"
                  />
                  {data.readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="h-3 w-3 text-neutral-400"
                  />
                  Last updated: {data.updated}
                </span>
              </div>
            </div>

            {/* Right-side doc switcher (desktop only) */}
            <div className="hidden shrink-0 sm:block">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-xs font-bold text-ink transition hover:border-ink hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN CONTENT
          ========================================= */}
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Sidebar — sticky doc nav + ToC */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-5 lg:sticky lg:top-24">
              {/* Document switcher */}
              <div className="rounded-xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-4 py-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                    Legal documents
                  </h2>
                </div>
                <nav className="p-2">
                  {LEGAL_KEYS.map((key) => {
                    const item = LEGAL_DATA[key];
                    const active = key === slug;
                    return (
                      <Link
                        key={key}
                        href={`/legal/${key}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? "bg-brand-50 text-brand-700"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-ink"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={`h-3.5 w-3.5 shrink-0 ${
                            active ? "text-brand-500" : "text-neutral-400"
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Table of contents */}
              <div className="rounded-xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-4 py-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                    On this page
                  </h2>
                </div>
                <nav className="p-2">
                  <ol className="space-y-0.5">
                    {data.sections.map((s, i) => (
                      <li key={i}>
                        <a
                          href={`#${anchorId(s.heading)}`}
                          className="block rounded-md px-3 py-2 text-xs leading-snug text-neutral-600 transition hover:bg-neutral-50 hover:text-ink"
                        >
                          <span className="mr-1.5 font-semibold text-neutral-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {s.heading.replace(/^\d+\.\s*/, "")}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </aside>

          {/* RIGHT: Content */}
          <article className="lg:col-span-8 xl:col-span-9">
            <div className="rounded-xl border border-neutral-200 bg-white">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 px-6 py-4 sm:px-8">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="h-3.5 w-3.5 text-neutral-400"
                  />
                  <span>
                    {data.sections.length}{" "}
                    {data.sections.length === 1 ? "section" : "sections"}
                  </span>
                  <span className="text-neutral-300">·</span>
                  <span>Last updated {data.updated}</span>
                </div>
                <a
                  href="mailto:legal@seasonmarketing.pk"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition hover:text-brand-700"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
                  legal@seasonmarketing.pk
                </a>
              </div>

              {/* Sections */}
              <div className="px-6 sm:px-8">
                {data.sections.map((section, idx) => {
                  const id = anchorId(section.heading);
                  const num = String(idx + 1).padStart(2, "0");
                  const cleanHeading = section.heading.replace(/^\d+\.\s*/, "");

                  return (
                    <section
                      key={idx}
                      id={id}
                      className={`scroll-mt-28 py-7 ${
                        idx !== data.sections.length - 1
                          ? "border-b border-neutral-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 shrink-0 font-mono text-xs font-bold text-brand-500">
                          {num}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                            {cleanHeading}
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                            {section.text}
                          </p>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>

              {/* Footer action */}
              <div className="border-t border-neutral-100 bg-neutral-50/60 px-6 py-5 sm:px-8">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-bold text-ink">
                      Have questions about this policy?
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      Our legal team responds to written enquiries within 2
                      business days.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-xs font-bold text-ink transition hover:border-ink hover:bg-white"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
                    Contact Legal
                  </Link>
                </div>
              </div>
            </div>

            {/* Disclaimer note — info bar, not glossy */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
                <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs leading-relaxed text-neutral-600">
                <span className="font-semibold text-ink">Note:</span> This
                document is a summary for clarity. If anything here conflicts
                with applicable Pakistani law, the law prevails. For legal
                advice about a specific property, consult a qualified lawyer.
              </p>
            </div>
          </article>
        </div>

        {/* =========================================
            RELATED DOCUMENTS
            ========================================= */}
        <section className="mt-14 sm:mt-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                Other legal documents
              </h2>
              <p className="mt-2 text-lg font-bold text-ink sm:text-xl">
                Continue reading
              </p>
            </div>
            <Link
              href="/legal/privacy"
              className="hidden items-center gap-1.5 text-xs font-semibold text-brand-600 transition hover:text-brand-700 sm:inline-flex"
            >
              View all
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((key) => {
              const item = LEGAL_DATA[key];
              return (
                <Link
                  key={key}
                  href={`/legal/${key}`}
                  className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 transition group-hover:bg-brand-50 group-hover:text-brand-600">
                      <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5" />
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="h-3 w-3 text-neutral-300 transition group-hover:text-brand-500"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                    {item.intro}
                  </p>
                  <p className="mt-3 text-[11px] font-medium text-neutral-400">
                    {item.readMinutes} min read
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

// Next 16 (Cache Components): params await karna Suspense ke andar hona chahiye.
export default function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 pt-24">
          <p className="text-sm font-medium text-neutral-500">Loading...</p>
        </div>
      }
    >
      <LegalContent params={params} />
    </Suspense>
  );
}