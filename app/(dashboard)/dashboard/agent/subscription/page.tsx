// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faCrown,
//   faCircleCheck,
//   faClock,
//   faDownload,
//   faArrowUp,
//   faXmark,
//   faTriangleExclamation,
//   faCircleInfo,
//   faWallet,
//   faBuilding,
//   faArrowRight,
//   faSave,
//   faCircleExclamation,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type InvoiceStatus = "Paid" | "Pending" | "Failed";

// interface Invoice {
//   id: string;
//   date: string;
//   amount: string;
//   status: InvoiceStatus;
// }

// interface Plan {
//   name: string;
//   price: string;
//   features: string[];
//   current: boolean;
// }

// /* ============================================
//    DATA
//    ============================================ */

// const CURRENT_PLAN = {
//   name: "Pro Agency Plan",
//   price: "PKR 45,000 / month",
//   status: "Active" as const,
//   renewsOn: "Nov 15, 2026",
//   listingLimit: 50,
//   listingsUsed: 24,
//   featuredLimit: 10,
//   featuredUsed: 4,
// };

// const PAST_INVOICES: Invoice[] = [
//   {
//     id: "INV-2026-089",
//     date: "Oct 15, 2026",
//     amount: "PKR 45,000",
//     status: "Paid",
//   },
//   {
//     id: "INV-2026-075",
//     date: "Sep 15, 2026",
//     amount: "PKR 45,000",
//     status: "Paid",
//   },
//   {
//     id: "INV-2026-061",
//     date: "Aug 15, 2026",
//     amount: "PKR 45,000",
//     status: "Paid",
//   },
// ];

// const UPGRADE_OPTIONS: Plan[] = [
//   {
//     name: "Basic Plan",
//     price: "PKR 8,000/mo",
//     features: ["10 Listings", "Standard Support", "Basic Analytics"],
//     current: false,
//   },
//   {
//     name: "Pro Agency Plan",
//     price: "PKR 45,000/mo",
//     features: [
//       "50 Listings",
//       "Priority Support",
//       "Advanced Analytics",
//       "10 Featured Listings",
//     ],
//     current: true,
//   },
//   {
//     name: "Enterprise Plan",
//     price: "Custom",
//     features: [
//       "Unlimited Listings",
//       "Dedicated Manager",
//       "Custom Analytics",
//       "Unlimited Featured",
//     ],
//     current: false,
//   },
// ];

// const statusTone: Record<InvoiceStatus, string> = {
//   Paid: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
//   Pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
//   Failed: "bg-red-50 text-red-800 ring-1 ring-red-200",
// };

// const statusDot: Record<InvoiceStatus, string> = {
//   Paid: "bg-emerald-500",
//   Pending: "bg-amber-500",
//   Failed: "bg-red-500",
// };

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AgentSubscriptionPage() {
//   const [changePlanOpen, setChangePlanOpen] = useState(false);
//   const [cancelOpen, setCancelOpen] = useState(false);
//   const [upgradeTarget, setUpgradeTarget] = useState<Plan | null>(null);
//   const [exportOpen, setExportOpen] = useState(false);
//   const [downloadFeedback, setDownloadFeedback] = useState<string | null>(
//     null
//   );
//   const [cancelReason, setCancelReason] = useState("");

//   const listingPercent = Math.round(
//     (CURRENT_PLAN.listingsUsed / CURRENT_PLAN.listingLimit) * 100
//   );
//   const featuredPercent = Math.round(
//     (CURRENT_PLAN.featuredUsed / CURRENT_PLAN.featuredLimit) * 100
//   );

//   const listingTone =
//     listingPercent >= 90
//       ? "bg-red-500"
//       : listingPercent >= 70
//       ? "bg-amber-500"
//       : "bg-brand-500";

//   const featuredTone =
//     featuredPercent >= 90
//       ? "bg-red-500"
//       : featuredPercent >= 70
//       ? "bg-amber-500"
//       : "bg-brand-500";

//   const handleDownload = (invoiceId: string) => {
//     setDownloadFeedback(`Downloaded ${invoiceId}`);
//     setTimeout(() => setDownloadFeedback(null), 2500);
//   };

//   const handleExport = () => {
//     setExportOpen(false);
//     setDownloadFeedback("Billing history exported");
//     setTimeout(() => setDownloadFeedback(null), 2500);
//   };

//   const handleUpgrade = () => {
//     setUpgradeTarget(null);
//     setDownloadFeedback("Upgrade request submitted");
//     setTimeout(() => setDownloadFeedback(null), 2500);
//   };

//   const handleCancel = () => {
//     if (!cancelReason.trim()) return;
//     setCancelOpen(false);
//     setCancelReason("");
//     setDownloadFeedback("Cancellation request recorded");
//     setTimeout(() => setDownloadFeedback(null), 2500);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       {/* =========================================
//           HEADER
//           ========================================= */}
//       <header className="border-b border-neutral-200 bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//             <div className="min-w-0">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
//                 <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
//                 Agent · Subscription
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Subscription & Billing
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Manage your plan, track usage, and view invoices.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <Link
//                 href="/dashboard/agent"
//                 className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
//                 Back
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//         {/* Download feedback banner */}
//         {downloadFeedback && (
//           <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
//             <FontAwesomeIcon
//               icon={faCircleCheck}
//               className="h-4 w-4 shrink-0 text-emerald-600"
//             />
//             <p className="text-sm font-semibold text-emerald-800">
//               {downloadFeedback}
//             </p>
//           </div>
//         )}

//         {/* =========================================
//             CURRENT PLAN CARD (BLACK ANCHOR)
//             ========================================= */}
//         <div className="overflow-hidden rounded-xl bg-ink">
//           <div className="p-5 sm:p-6 lg:p-8">
//             {/* Top row */}
//             <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
//               <div className="flex items-start gap-4">
//                 <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-400">
//                   <FontAwesomeIcon icon={faCrown} className="h-5 w-5" />
//                 </span>
//                 <div>
//                   <div className="flex flex-wrap items-center gap-2">
//                     <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
//                       {CURRENT_PLAN.name}
//                     </h2>
//                     <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-400">
//                       <span className="h-1 w-1 rounded-full bg-emerald-400" />
//                       {CURRENT_PLAN.status}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-lg font-black text-brand-400">
//                     {CURRENT_PLAN.price}
//                   </p>
//                   <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
//                     <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
//                     Renews on {CURRENT_PLAN.renewsOn}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setChangePlanOpen(true)}
//                   className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-bold text-white transition hover:bg-white/10"
//                 >
//                   Change Plan
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setCancelOpen(true)}
//                   className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>

//             {/* Usage meters */}
//             <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
//               {/* Listings */}
//               <div>
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-1.5 font-semibold text-neutral-300">
//                     <FontAwesomeIcon
//                       icon={faBuilding}
//                       className="h-3 w-3 text-neutral-500"
//                     />
//                     Listings Used
//                   </span>
//                   <span className="font-black text-white">
//                     {CURRENT_PLAN.listingsUsed} /{" "}
//                     {CURRENT_PLAN.listingLimit}{" "}
//                     <span className="text-neutral-500">
//                       ({listingPercent}%)
//                     </span>
//                   </span>
//                 </div>
//                 <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
//                   <div
//                     className={`h-full rounded-full ${listingTone}`}
//                     style={{ width: `${listingPercent}%` }}
//                   />
//                 </div>
//                 <p className="mt-1.5 text-[10px] font-medium text-neutral-500">
//                   {CURRENT_PLAN.listingLimit - CURRENT_PLAN.listingsUsed}{" "}
//                   listings remaining
//                 </p>
//               </div>

//               {/* Featured */}
//               <div>
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-1.5 font-semibold text-neutral-300">
//                     <FontAwesomeIcon
//                       icon={faStarIcon}
//                       className="h-3 w-3 text-neutral-500"
//                     />
//                     Featured Slots
//                   </span>
//                   <span className="font-black text-white">
//                     {CURRENT_PLAN.featuredUsed} /{" "}
//                     {CURRENT_PLAN.featuredLimit}{" "}
//                     <span className="text-neutral-500">
//                       ({featuredPercent}%)
//                     </span>
//                   </span>
//                 </div>
//                 <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
//                   <div
//                     className={`h-full rounded-full ${featuredTone}`}
//                     style={{ width: `${featuredPercent}%` }}
//                   />
//                 </div>
//                 <p className="mt-1.5 text-[10px] font-medium text-neutral-500">
//                   {CURRENT_PLAN.featuredLimit - CURRENT_PLAN.featuredUsed}{" "}
//                   featured slots remaining
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* =========================================
//             MAIN GRID
//             ========================================= */}
//         <div className="mt-6 grid gap-6 lg:grid-cols-3">
//           {/* LEFT — Billing History */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               <header className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-4">
//                 <div>
//                   <div className="flex items-baseline gap-2">
//                     <span className="font-mono text-xs font-black text-neutral-400">
//                       01
//                     </span>
//                     <h2 className="text-lg font-black tracking-tight text-ink">
//                       Billing History
//                     </h2>
//                   </div>
//                   <p className="mt-1 text-sm text-neutral-600">
//                     Download invoices for your records
//                   </p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setExportOpen(true)}
//                   className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
//                 >
//                   <FontAwesomeIcon
//                     icon={faDownload}
//                     className="h-3 w-3"
//                   />
//                   Export
//                 </button>
//               </header>

//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[500px] text-left">
//                   <thead className="border-b border-neutral-200">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                       >
//                         Invoice
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                       >
//                         Date
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                       >
//                         Amount
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
//                       >
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-neutral-100">
//                     {PAST_INVOICES.map((inv) => (
//                       <tr
//                         key={inv.id}
//                         className="group transition hover:bg-neutral-50/70"
//                       >
//                         <td className="px-4 py-4">
//                           <p className="font-mono text-sm font-bold text-ink group-hover:text-brand-600">
//                             {inv.id}
//                           </p>
//                         </td>
//                         <td className="px-4 py-4">
//                           <p className="text-sm font-medium text-neutral-700">
//                             {inv.date}
//                           </p>
//                         </td>
//                         <td className="px-4 py-4">
//                           <p className="whitespace-nowrap text-sm font-black text-ink">
//                             {inv.amount}
//                           </p>
//                         </td>
//                         <td className="px-4 py-4">
//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${statusTone[inv.status]}`}
//                           >
//                             <span
//                               className={`h-1.5 w-1.5 rounded-full ${
//                                 statusDot[inv.status]
//                               }`}
//                             />
//                             {inv.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4 text-right">
//                           <button
//                             type="button"
//                             onClick={() => handleDownload(inv.id)}
//                             aria-label={`Download ${inv.id}`}
//                             title="Download invoice"
//                             className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//                           >
//                             <FontAwesomeIcon
//                               icon={faDownload}
//                               className="h-3.5 w-3.5"
//                             />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3">
//                 <p className="text-xs font-medium text-neutral-600">
//                   Showing{" "}
//                   <span className="font-black text-ink">
//                     {PAST_INVOICES.length}
//                   </span>{" "}
//                   recent invoices
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT — Plans */}
//           <aside className="space-y-3">
//             <div className="flex items-baseline gap-2 px-1">
//               <span className="font-mono text-xs font-black text-neutral-400">
//                 02
//               </span>
//               <h2 className="text-lg font-black tracking-tight text-ink">
//                 Available Plans
//               </h2>
//             </div>

//             {UPGRADE_OPTIONS.map((plan) => (
//               <div
//                 key={plan.name}
//                 className={`relative rounded-xl border p-4 transition ${
//                   plan.current
//                     ? "border-brand-300 bg-brand-50/40"
//                     : "border-neutral-200 bg-white hover:border-neutral-300"
//                 }`}
//               >
//                 {plan.current && (
//                   <span className="absolute -top-2 left-3 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
//                     Current
//                   </span>
//                 )}
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="min-w-0">
//                     <h3 className="text-sm font-black text-ink">
//                       {plan.name}
//                     </h3>
//                     <p className="mt-0.5 text-sm font-bold text-brand-600">
//                       {plan.price}
//                     </p>
//                   </div>
//                 </div>
//                 <ul className="mt-3 space-y-1">
//                   {plan.features.map((f) => (
//                     <li
//                       key={f}
//                       className="flex items-center gap-1.5 text-xs text-neutral-600"
//                     >
//                       <FontAwesomeIcon
//                         icon={faCircleCheck}
//                         className="h-2.5 w-2.5 shrink-0 text-emerald-500"
//                       />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//                 {!plan.current && (
//                   <button
//                     type="button"
//                     onClick={() => setUpgradeTarget(plan)}
//                     className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-500 py-2 text-xs font-bold text-white transition hover:bg-brand-600"
//                   >
//                     <FontAwesomeIcon
//                       icon={faArrowUp}
//                       className="h-3 w-3"
//                     />
//                     {plan.name === "Basic Plan" ? "Downgrade" : "Upgrade"}
//                   </button>
//                 )}
//               </div>
//             ))}

//             {/* Billing health */}
//             <div className="rounded-xl border border-neutral-200 bg-white p-4">
//               <div className="flex items-start gap-2.5">
//                 <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
//                   <FontAwesomeIcon
//                     icon={faWallet}
//                     className="h-3.5 w-3.5"
//                   />
//                 </span>
//                 <p className="text-[11px] leading-relaxed text-neutral-600">
//                   <span className="font-bold text-ink">Payment status:</span>{" "}
//                   All invoices are up to date. Next payment automatically
//                   charges on renewal.
//                 </p>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* =========================================
//           CHANGE PLAN MODAL
//           ========================================= */}
//       {changePlanOpen && (
//         <Modal
//           onClose={() => setChangePlanOpen(false)}
//           title="Change your plan"
//           subtitle="Select a new plan"
//         >
//           <div className="space-y-2">
//             {UPGRADE_OPTIONS.map((plan) => {
//               const isCurrent = plan.current;
//               return (
//                 <button
//                   key={plan.name}
//                   type="button"
//                   disabled={isCurrent}
//                   onClick={() => {
//                     if (isCurrent) return;
//                     setChangePlanOpen(false);
//                     setUpgradeTarget(plan);
//                   }}
//                   className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition ${
//                     isCurrent
//                       ? "cursor-not-allowed border-brand-300 bg-brand-50/40"
//                       : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
//                   }`}
//                 >
//                   <div className="min-w-0">
//                     <p className="text-sm font-bold text-ink">{plan.name}</p>
//                     <p className="mt-0.5 text-xs text-neutral-500">
//                       {plan.price}
//                     </p>
//                   </div>
//                   {isCurrent ? (
//                     <span className="shrink-0 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
//                       Current
//                     </span>
//                   ) : (
//                     <FontAwesomeIcon
//                       icon={faArrowRight}
//                       className="h-3 w-3 shrink-0 text-neutral-400"
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
//             <button
//               type="button"
//               onClick={() => setChangePlanOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           UPGRADE / DOWNGRADE CONFIRM MODAL
//           ========================================= */}
//       {upgradeTarget && (
//         <Modal
//           onClose={() => setUpgradeTarget(null)}
//           title={`Switch to ${upgradeTarget.name}?`}
//           subtitle={upgradeTarget.price}
//         >
//           <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
//             <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//               What changes
//             </p>
//             <ul className="mt-2 space-y-1">
//               {upgradeTarget.features.map((f) => (
//                 <li
//                   key={f}
//                   className="flex items-start gap-2 text-xs text-neutral-700"
//                 >
//                   <FontAwesomeIcon
//                     icon={faCircleCheck}
//                     className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500"
//                   />
//                   {f}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
//             <FontAwesomeIcon
//               icon={faCircleInfo}
//               className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600"
//             />
//             <p className="text-xs leading-relaxed text-amber-900">
//               Upgrades take effect immediately. Downgrades take effect at the
//               next renewal. Payment will be prorated.
//             </p>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setUpgradeTarget(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleUpgrade}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon
//                 icon={faArrowUp}
//                 className="h-3.5 w-3.5"
//               />
//               Confirm change
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           CANCEL SUBSCRIPTION MODAL
//           ========================================= */}
//       {cancelOpen && (
//         <Modal
//           onClose={() => setCancelOpen(false)}
//           title="Cancel subscription?"
//           subtitle="This will end your Pro Agency Plan"
//         >
//           <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
//             <FontAwesomeIcon
//               icon={faTriangleExclamation}
//               className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
//             />
//             <div>
//               <p className="text-sm font-bold text-red-900">
//                 Your account will downgrade at renewal
//               </p>
//               <p className="mt-1 text-xs leading-relaxed text-red-800">
//                 You&apos;ll lose access to Pro features, extra listings, and
//                 featured slots on{" "}
//                 <span className="font-bold">{CURRENT_PLAN.renewsOn}</span>. Any
//                 existing listings above the Basic limit will be paused.
//               </p>
//             </div>
//           </div>

//           <div className="mt-4">
//             <label
//               htmlFor="cancel-reason"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Reason for cancellation{" "}
//               <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="cancel-reason"
//               value={cancelReason}
//               onChange={(e) => setCancelReason(e.target.value)}
//               rows={4}
//               placeholder="e.g. Moving to a different platform, budget cuts..."
//               className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setCancelOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Keep plan
//             </button>
//             <button
//               type="button"
//               disabled={!cancelReason.trim()}
//               onClick={handleCancel}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//               Confirm cancellation
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           EXPORT MODAL
//           ========================================= */}
//       {exportOpen && (
//         <Modal
//           onClose={() => setExportOpen(false)}
//           title="Export billing history"
//           subtitle="Choose the file format"
//         >
//           <div className="space-y-2">
//             {["CSV", "PDF", "Excel"].map((format) => (
//               <button
//                 key={format}
//                 type="button"
//                 onClick={handleExport}
//                 className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 text-left transition hover:bg-neutral-50"
//               >
//                 <div>
//                   <p className="text-sm font-bold text-ink">{format}</p>
//                   <p className="mt-0.5 text-xs text-neutral-500">
//                     {format === "CSV"
//                       ? "Spreadsheet-friendly"
//                       : format === "PDF"
//                       ? "Printable document"
//                       : "Formatted workbook"}
//                   </p>
//                 </div>
//                 <FontAwesomeIcon
//                   icon={faDownload}
//                   className="h-3.5 w-3.5 text-neutral-400"
//                 />
//               </button>
//             ))}
//           </div>

//           <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
//             <button
//               type="button"
//               onClick={() => setExportOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// /* ============================================
//    MODAL SHELL
//    ============================================ */

// function Modal({
//   onClose,
//   title,
//   subtitle,
//   children,
// }: {
//   onClose: () => void;
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-label={title}
//     >
//       <div
//         className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-6 py-4">
//           <div className="min-w-0">
//             <h3 className="text-lg font-black tracking-tight text-ink">
//               {title}
//             </h3>
//             {subtitle && (
//               <p className="mt-1 line-clamp-1 text-xs font-medium text-neutral-500">
//                 {subtitle}
//               </p>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close dialog"
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100"
//           >
//             <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }

// // Local icon alias (faStar used as featured icon)
// import { faStar as faStarIcon } from "@fortawesome/free-solid-svg-icons";



"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCrown,
  faCircleCheck,
  faClock,
  faDownload,
  faArrowUp,
  faXmark,
  faTriangleExclamation,
  faCircleInfo,
  faWallet,
  faBuilding,
  faArrowRight,
  faSave,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type InvoiceStatus = "Paid" | "Pending" | "Failed";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  current: boolean;
}

/* ============================================
   DATA
   ============================================ */

const CURRENT_PLAN = {
  name: "Pro Agency Plan",
  price: "PKR 45,000 / month",
  status: "Active" as const,
  renewsOn: "Nov 15, 2026",
  listingLimit: 50,
  listingsUsed: 24,
  featuredLimit: 10,
  featuredUsed: 4,
};

const PAST_INVOICES: Invoice[] = [
  {
    id: "INV-2026-089",
    date: "Oct 15, 2026",
    amount: "PKR 45,000",
    status: "Paid",
  },
  {
    id: "INV-2026-075",
    date: "Sep 15, 2026",
    amount: "PKR 45,000",
    status: "Paid",
  },
  {
    id: "INV-2026-061",
    date: "Aug 15, 2026",
    amount: "PKR 45,000",
    status: "Paid",
  },
];

const UPGRADE_OPTIONS: Plan[] = [
  {
    name: "Basic Plan",
    price: "PKR 8,000/mo",
    features: ["10 Listings", "Standard Support", "Basic Analytics"],
    current: false,
  },
  {
    name: "Pro Agency Plan",
    price: "PKR 45,000/mo",
    features: [
      "50 Listings",
      "Priority Support",
      "Advanced Analytics",
      "10 Featured Listings",
    ],
    current: true,
  },
  {
    name: "Enterprise Plan",
    price: "Custom",
    features: [
      "Unlimited Listings",
      "Dedicated Manager",
      "Custom Analytics",
      "Unlimited Featured",
    ],
    current: false,
  },
];

const statusTone: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Failed: "bg-red-50 text-red-800 ring-1 ring-red-200",
};

const statusDot: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-500",
  Pending: "bg-amber-500",
  Failed: "bg-red-500",
};

/* ============================================
   PAGE
   ============================================ */

export default function AgentSubscriptionPage() {
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [upgradeTarget, setUpgradeTarget] = useState<Plan | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(
    null
  );
  const [cancelReason, setCancelReason] = useState("");

  const listingPercent = Math.round(
    (CURRENT_PLAN.listingsUsed / CURRENT_PLAN.listingLimit) * 100
  );
  const featuredPercent = Math.round(
    (CURRENT_PLAN.featuredUsed / CURRENT_PLAN.featuredLimit) * 100
  );

  const listingTone =
    listingPercent >= 90
      ? "bg-red-500"
      : listingPercent >= 70
      ? "bg-amber-500"
      : "bg-brand-500";

  const featuredTone =
    featuredPercent >= 90
      ? "bg-red-500"
      : featuredPercent >= 70
      ? "bg-amber-500"
      : "bg-brand-500";

  const handleDownload = (invoiceId: string) => {
    setDownloadFeedback(`Downloaded ${invoiceId}`);
    setTimeout(() => setDownloadFeedback(null), 2500);
  };

  const handleExport = () => {
    setExportOpen(false);
    setDownloadFeedback("Billing history exported");
    setTimeout(() => setDownloadFeedback(null), 2500);
  };

  const handleUpgrade = () => {
    setUpgradeTarget(null);
    setDownloadFeedback("Upgrade request submitted");
    setTimeout(() => setDownloadFeedback(null), 2500);
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) return;
    setCancelOpen(false);
    setCancelReason("");
    setDownloadFeedback("Cancellation request recorded");
    setTimeout(() => setDownloadFeedback(null), 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* =========================================
          HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Agent · Subscription
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Subscription & Billing
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage your plan, track usage, and view invoices.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/agent"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Download feedback banner */}
        {downloadFeedback && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-4 w-4 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-semibold text-emerald-800">
              {downloadFeedback}
            </p>
          </div>
        )}

        {/* =========================================
            CURRENT PLAN CARD (BLACK ANCHOR)
            ========================================= */}
        <div className="overflow-hidden rounded-xl bg-ink">
          <div className="p-5 sm:p-6 lg:p-8">
            {/* Top row */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-400">
                  <FontAwesomeIcon icon={faCrown} className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      {CURRENT_PLAN.name}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      {CURRENT_PLAN.status}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-black text-brand-400">
                    {CURRENT_PLAN.price}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                    <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                    Renews on {CURRENT_PLAN.renewsOn}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setChangePlanOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Change Plan
                </button>
                <button
                  type="button"
                  onClick={() => setCancelOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Usage meters */}
            <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
              {/* Listings */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-300">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="h-3 w-3 text-neutral-500"
                    />
                    Listings Used
                  </span>
                  <span className="font-black text-white">
                    {CURRENT_PLAN.listingsUsed} /{" "}
                    {CURRENT_PLAN.listingLimit}{" "}
                    <span className="text-neutral-500">
                      ({listingPercent}%)
                    </span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${listingTone}`}
                    style={{ width: `${listingPercent}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-neutral-500">
                  {CURRENT_PLAN.listingLimit - CURRENT_PLAN.listingsUsed}{" "}
                  listings remaining
                </p>
              </div>

              {/* Featured */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-300">
                    <FontAwesomeIcon
                      icon={faStarIcon}
                      className="h-3 w-3 text-neutral-500"
                    />
                    Featured Slots
                  </span>
                  <span className="font-black text-white">
                    {CURRENT_PLAN.featuredUsed} /{" "}
                    {CURRENT_PLAN.featuredLimit}{" "}
                    <span className="text-neutral-500">
                      ({featuredPercent}%)
                    </span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${featuredTone}`}
                    style={{ width: `${featuredPercent}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-neutral-500">
                  {CURRENT_PLAN.featuredLimit - CURRENT_PLAN.featuredUsed}{" "}
                  featured slots remaining
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            MAIN GRID
            ========================================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT — Billing History */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      01
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Billing History
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Download invoices for your records
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExportOpen(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="h-3 w-3"
                  />
                  Export
                </button>
              </header>

              <div className="overflow-x-auto">
                <table className="w-full md:min-w-[500px] text-left max-md:block max-md:[&_thead]:hidden max-md:[&_tbody]:block max-md:[&_tr]:block max-md:[&_tr]:p-4 max-md:[&_td]:flex max-md:[&_td]:items-center max-md:[&_td]:justify-between max-md:[&_td]:gap-4 max-md:[&_td]:px-0 max-md:[&_td]:py-1.5 max-md:[&_td]:text-right max-md:[&_td:first-child]:justify-start max-md:[&_td:first-child]:text-left max-md:[&_td]:before:content-[attr(data-label)] max-md:[&_td]:before:shrink-0 max-md:[&_td]:before:text-[11px] max-md:[&_td[colspan]]:justify-center max-md:[&_td[colspan]]:text-center max-md:[&_td[colspan]]:before:hidden max-md:[&_td]:before:font-bold max-md:[&_td]:before:uppercase max-md:[&_td]:before:tracking-wider max-md:[&_td]:before:text-neutral-400">
                  <thead className="border-b border-neutral-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Invoice
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {PAST_INVOICES.map((inv) => (
                      <tr
                        key={inv.id}
                        className="group transition hover:bg-neutral-50/70"
                      >
                        <td className="px-4 py-4">
                          <p className="font-mono text-sm font-bold text-ink group-hover:text-brand-600">
                            {inv.id}
                          </p>
                        </td>
                        <td data-label="Date" className="px-4 py-4">
                          <p className="text-sm font-medium text-neutral-700">
                            {inv.date}
                          </p>
                        </td>
                        <td data-label="Amount" className="px-4 py-4">
                          <p className="whitespace-nowrap text-sm font-black text-ink">
                            {inv.amount}
                          </p>
                        </td>
                        <td data-label="Status" className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${statusTone[inv.status]}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                statusDot[inv.status]
                              }`}
                            />
                            {inv.status}
                          </span>
                        </td>
                        <td data-label="Action" className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDownload(inv.id)}
                            aria-label={`Download ${inv.id}`}
                            title="Download invoice"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="h-3.5 w-3.5"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3">
                <p className="text-xs font-medium text-neutral-600">
                  Showing{" "}
                  <span className="font-black text-ink">
                    {PAST_INVOICES.length}
                  </span>{" "}
                  recent invoices
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Plans */}
          <aside className="space-y-3">
            <div className="flex items-baseline gap-2 px-1">
              <span className="font-mono text-xs font-black text-neutral-400">
                02
              </span>
              <h2 className="text-lg font-black tracking-tight text-ink">
                Available Plans
              </h2>
            </div>

            {UPGRADE_OPTIONS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-4 transition ${
                  plan.current
                    ? "border-brand-300 bg-brand-50/40"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                {plan.current && (
                  <span className="absolute -top-2 left-3 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                    Current
                  </span>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-ink">
                      {plan.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-bold text-brand-600">
                      {plan.price}
                    </p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-neutral-600"
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="h-2.5 w-2.5 shrink-0 text-emerald-500"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button
                    type="button"
                    onClick={() => setUpgradeTarget(plan)}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-500 py-2 text-xs font-bold text-white transition hover:bg-brand-600"
                  >
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className="h-3 w-3"
                    />
                    {plan.name === "Basic Plan" ? "Downgrade" : "Upgrade"}
                  </button>
                )}
              </div>
            ))}

            {/* Billing health */}
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                  <FontAwesomeIcon
                    icon={faWallet}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <p className="text-[11px] leading-relaxed text-neutral-600">
                  <span className="font-bold text-ink">Payment status:</span>{" "}
                  All invoices are up to date. Next payment automatically
                  charges on renewal.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          CHANGE PLAN MODAL
          ========================================= */}
      {changePlanOpen && (
        <Modal
          onClose={() => setChangePlanOpen(false)}
          title="Change your plan"
          subtitle="Select a new plan"
        >
          <div className="space-y-2">
            {UPGRADE_OPTIONS.map((plan) => {
              const isCurrent = plan.current;
              return (
                <button
                  key={plan.name}
                  type="button"
                  disabled={isCurrent}
                  onClick={() => {
                    if (isCurrent) return;
                    setChangePlanOpen(false);
                    setUpgradeTarget(plan);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition ${
                    isCurrent
                      ? "cursor-not-allowed border-brand-300 bg-brand-50/40"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink">{plan.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {plan.price}
                    </p>
                  </div>
                  {isCurrent ? (
                    <span className="shrink-0 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                      Current
                    </span>
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-3 w-3 shrink-0 text-neutral-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setChangePlanOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          UPGRADE / DOWNGRADE CONFIRM MODAL
          ========================================= */}
      {upgradeTarget && (
        <Modal
          onClose={() => setUpgradeTarget(null)}
          title={`Switch to ${upgradeTarget.name}?`}
          subtitle={upgradeTarget.price}
        >
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
              What changes
            </p>
            <ul className="mt-2 space-y-1">
              {upgradeTarget.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-xs text-neutral-700"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600"
            />
            <p className="text-xs leading-relaxed text-amber-900">
              Upgrades take effect immediately. Downgrades take effect at the
              next renewal. Payment will be prorated.
            </p>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setUpgradeTarget(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpgrade}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className="h-3.5 w-3.5"
              />
              Confirm change
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          CANCEL SUBSCRIPTION MODAL
          ========================================= */}
      {cancelOpen && (
        <Modal
          onClose={() => setCancelOpen(false)}
          title="Cancel subscription?"
          subtitle="This will end your Pro Agency Plan"
        >
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            />
            <div>
              <p className="text-sm font-bold text-red-900">
                Your account will downgrade at renewal
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-800">
                You&apos;ll lose access to Pro features, extra listings, and
                featured slots on{" "}
                <span className="font-bold">{CURRENT_PLAN.renewsOn}</span>. Any
                existing listings above the Basic limit will be paused.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="cancel-reason"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Reason for cancellation{" "}
              <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="cancel-reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={4}
              placeholder="e.g. Moving to a different platform, budget cuts..."
              className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setCancelOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Keep plan
            </button>
            <button
              type="button"
              disabled={!cancelReason.trim()}
              onClick={handleCancel}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              Confirm cancellation
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EXPORT MODAL
          ========================================= */}
      {exportOpen && (
        <Modal
          onClose={() => setExportOpen(false)}
          title="Export billing history"
          subtitle="Choose the file format"
        >
          <div className="space-y-2">
            {["CSV", "PDF", "Excel"].map((format) => (
              <button
                key={format}
                type="button"
                onClick={handleExport}
                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 text-left transition hover:bg-neutral-50"
              >
                <div>
                  <p className="text-sm font-bold text-ink">{format}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {format === "CSV"
                      ? "Spreadsheet-friendly"
                      : format === "PDF"
                      ? "Printable document"
                      : "Formatted workbook"}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="h-3.5 w-3.5 text-neutral-400"
                />
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setExportOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================
   MODAL SHELL
   ============================================ */

function Modal({
  onClose,
  title,
  subtitle,
  children,
}: {
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-lg max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:max-h-[90dvh] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-6 py-4">
          <div className="min-w-0">
            <h3 className="text-lg font-black tracking-tight text-ink">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 line-clamp-1 text-xs font-medium text-neutral-500">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Local icon alias (faStar used as featured icon)
import { faStar as faStarIcon } from "@fortawesome/free-solid-svg-icons";