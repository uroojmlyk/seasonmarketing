// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faWallet,
//   faArrowTrendUp,
//   faArrowTrendDown,
//   faReceipt,
//   faCrown,
//   faDownload,
//   faMagnifyingGlass,
//   faEllipsisVertical,
//   faCircleCheck,
//   faClock,
//   faArrowLeft,
//   faArrowRight,
//   faXmark,
//   faCheck,
//   faCircleInfo,
//   faEye,
//   faRotateLeft,
//   faChevronLeft,
//   faChevronRight,
//   faCreditCard,
//   faFileInvoice,
//   faCircleExclamation,
//   faShieldHalved,
// } from "@fortawesome/free-solid-svg-icons";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// /* ============================================
//    TYPES
//    ============================================ */

// type InvoiceStatus = "Paid" | "Pending" | "Failed";

// interface Invoice {
//   id: string;
//   user: string;
//   plan: string;
//   amount: string;
//   date: string;
//   status: InvoiceStatus;
// }

// interface Plan {
//   name: string;
//   price: string;
//   features: string[];
//   users: number;
//   popular?: boolean;
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_INVOICES: Invoice[] = [
//   {
//     id: "INV-2026-089",
//     user: "Zainab Real Estate",
//     plan: "Pro Agency",
//     amount: "PKR 45,000",
//     date: "Oct 28, 2026",
//     status: "Paid",
//   },
//   {
//     id: "INV-2026-088",
//     user: "Ali Khan",
//     plan: "Individual Agent",
//     amount: "PKR 8,000",
//     date: "Oct 28, 2026",
//     status: "Paid",
//   },
//   {
//     id: "INV-2026-087",
//     user: "Usman Properties",
//     plan: "Basic Agency",
//     amount: "PKR 25,000",
//     date: "Oct 27, 2026",
//     status: "Pending",
//   },
//   {
//     id: "INV-2026-086",
//     user: "Bilal Properties",
//     plan: "Pro Agency",
//     amount: "PKR 45,000",
//     date: "Oct 26, 2026",
//     status: "Paid",
//   },
//   {
//     id: "INV-2026-085",
//     user: "Sara Malik",
//     plan: "Individual Agent",
//     amount: "PKR 8,000",
//     date: "Oct 25, 2026",
//     status: "Failed",
//   },
// ];

// const PLANS: Plan[] = [
//   {
//     name: "Basic Agency",
//     price: "PKR 25,000/mo",
//     features: ["10 Listings", "Basic Support", "Standard Analytics"],
//     users: 45,
//   },
//   {
//     name: "Pro Agency",
//     price: "PKR 45,000/mo",
//     features: ["50 Listings", "Priority Support", "Advanced Analytics"],
//     users: 32,
//     popular: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     features: [
//       "Unlimited Listings",
//       "Dedicated Manager",
//       "Custom Integrations",
//     ],
//     users: 8,
//   },
// ];

// const TABS: { key: "all" | InvoiceStatus; label: string }[] = [
//   { key: "all", label: "All Invoices" },
//   { key: "Paid", label: "Paid" },
//   { key: "Pending", label: "Pending" },
//   { key: "Failed", label: "Failed" },
// ];

// /* ============================================
//    HELPERS
//    ============================================ */

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

// export default function AdminBillingPage() {
//   const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
//   const [tab, setTab] = useState<"all" | InvoiceStatus>("all");
//   const [search, setSearch] = useState("");
//   const [viewOpen, setViewOpen] = useState<Invoice | null>(null);
//   const [resolveOpen, setResolveOpen] = useState<Invoice | null>(null);
//   const [refundOpen, setRefundOpen] = useState<Invoice | null>(null);
//   const [exportOpen, setExportOpen] = useState(false);
//   const [manageOpen, setManageOpen] = useState<Plan | null>(null);
//   const [actionReason, setActionReason] = useState("");

//   const counts = useMemo(
//     () => ({
//       all: invoices.length,
//       Paid: invoices.filter((i) => i.status === "Paid").length,
//       Pending: invoices.filter((i) => i.status === "Pending").length,
//       Failed: invoices.filter((i) => i.status === "Failed").length,
//     }),
//     [invoices]
//   );

//   const filtered = useMemo(() => {
//     return invoices.filter((inv) => {
//       if (tab !== "all" && inv.status !== tab) return false;
//       if (search) {
//         const q = search.toLowerCase();
//         if (
//           !inv.id.toLowerCase().includes(q) &&
//           !inv.user.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [invoices, tab, search]);

//   const resolve = (invoice: Invoice) => {
//     setInvoices((prev) =>
//       prev.map((i) =>
//         i.id === invoice.id ? { ...i, status: "Paid" as InvoiceStatus } : i
//       )
//     );
//     setResolveOpen(null);
//   };

//   const refund = (invoice: Invoice, reason: string) => {
//     if (!reason.trim()) return;
//     setInvoices((prev) =>
//       prev.map((i) =>
//         i.id === invoice.id ? { ...i, status: "Failed" as InvoiceStatus } : i
//       )
//     );
//     setRefundOpen(null);
//     setActionReason("");
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
//                 Admin · Billing & Subscriptions
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Billing & Subscriptions
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Manage invoices, plans, and payment statuses. Every action is
//                 logged.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <Link
//                 href="/dashboard/admin"
//                 className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
//                 Back
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setExportOpen(true)}
//                 className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
//                 Export Report
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//         {/* =========================================
//             STATS
//             ========================================= */}
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//           {[
//             {
//               title: "Total Revenue",
//               value: "PKR 4.2M",
//               delta: "+12.5%",
//               trend: "up" as const,
//               icon: faWallet,
//             },
//             {
//               title: "Active Subscriptions",
//               value: "124",
//               delta: "+8",
//               trend: "up" as const,
//               icon: faCrown,
//             },
//             {
//               title: "Pending Invoices",
//               value: "18",
//               delta: "-2",
//               trend: "down" as const,
//               icon: faClock,
//             },
//             {
//               title: "Total Transactions",
//               value: "892",
//               delta: "+24",
//               trend: "up" as const,
//               icon: faReceipt,
//             },
//           ].map((stat) => (
//             <div
//               key={stat.title}
//               className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
//             >
//               <div className="flex items-start justify-between">
//                 <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
//                   <FontAwesomeIcon
//                     icon={stat.icon}
//                     className="h-4 w-4"
//                   />
//                 </span>
//                 <span
//                   className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${
//                     stat.trend === "down"
//                       ? "bg-emerald-50 text-emerald-700"
//                       : "bg-brand-50 text-brand-700"
//                   }`}
//                 >
//                   <FontAwesomeIcon
//                     icon={
//                       stat.trend === "down"
//                         ? faArrowTrendDown
//                         : faArrowTrendUp
//                     }
//                     className="h-2 w-2"
//                   />
//                   {stat.delta}
//                 </span>
//               </div>
//               <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
//                 {stat.value}
//               </p>
//               <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
//                 {stat.title}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* =========================================
//             MAIN GRID
//             ========================================= */}
//         <div className="mt-6 grid gap-6 lg:grid-cols-3">
//           {/* LEFT — Invoices */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               {/* Filter bar */}
//               <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
//                 <div
//                   className="flex gap-1 overflow-x-auto"
//                   role="tablist"
//                   aria-label="Filter invoices"
//                 >
//                   {TABS.map((t) => {
//                     const active = tab === t.key;
//                     return (
//                       <button
//                         key={t.key}
//                         role="tab"
//                         aria-selected={active}
//                         onClick={() => setTab(t.key)}
//                         className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
//                           active
//                             ? "bg-ink text-white"
//                             : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
//                         }`}
//                       >
//                         {t.label}
//                         <span
//                           className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
//                             active
//                               ? "bg-white/20 text-white"
//                               : "bg-neutral-100 text-neutral-500"
//                           }`}
//                         >
//                           {counts[t.key]}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="relative w-full sm:w-64">
//                   <FontAwesomeIcon
//                     icon={faMagnifyingGlass}
//                     className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
//                   />
//                   <input
//                     type="search"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search invoice or user..."
//                     className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                   />
//                 </div>
//               </div>

//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[800px] text-left">
//                   <thead className="border-b border-neutral-200 bg-neutral-50">
//                     <tr>
//                       {[
//                         "Invoice ID",
//                         "User",
//                         "Plan",
//                         "Amount",
//                         "Date",
//                         "Status",
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           scope="col"
//                           className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
//                         >
//                           {h}
//                         </th>
//                       ))}
//                       <th
//                         scope="col"
//                         className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-neutral-100">
//                     {filtered.map((inv) => (
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
//                           <p className="truncate text-sm font-semibold text-ink">
//                             {inv.user}
//                           </p>
//                         </td>
//                         <td className="px-4 py-4">
//                           <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
//                             {inv.plan}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4">
//                           <p className="whitespace-nowrap text-sm font-black text-ink">
//                             {inv.amount}
//                           </p>
//                         </td>
//                         <td className="px-4 py-4">
//                           <p className="text-sm font-medium text-neutral-600">
//                             {inv.date}
//                           </p>
//                         </td>
//                         <td className="px-4 py-4">
//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
//                               statusTone[inv.status]
//                             }`}
//                           >
//                             <span
//                               className={`h-1.5 w-1.5 rounded-full ${
//                                 statusDot[inv.status]
//                               }`}
//                             />
//                             {inv.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               type="button"
//                               onClick={() => setViewOpen(inv)}
//                               aria-label={`View ${inv.id}`}
//                               title="View invoice"
//                               className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faEye}
//                                 className="h-3.5 w-3.5"
//                               />
//                             </button>
//                             {inv.status === "Pending" && (
//                               <button
//                                 type="button"
//                                 onClick={() => setResolveOpen(inv)}
//                                 aria-label="Mark as paid"
//                                 title="Mark as paid"
//                                 className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
//                               >
//                                 <FontAwesomeIcon
//                                   icon={faCheck}
//                                   className="h-3.5 w-3.5"
//                                 />
//                               </button>
//                             )}
//                             {inv.status === "Paid" && (
//                               <button
//                                 type="button"
//                                 onClick={() => setRefundOpen(inv)}
//                                 aria-label="Refund invoice"
//                                 title="Refund invoice"
//                                 className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
//                               >
//                                 <FontAwesomeIcon
//                                   icon={faRotateLeft}
//                                   className="h-3.5 w-3.5"
//                                 />
//                               </button>
//                             )}
//                             <button
//                               type="button"
//                               onClick={() => setViewOpen(inv)}
//                               aria-label="More actions"
//                               title="More actions"
//                               className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faEllipsisVertical}
//                                 className="h-3.5 w-3.5"
//                               />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}

//                     {filtered.length === 0 && (
//                       <tr>
//                         <td colSpan={7} className="px-6 py-16 text-center">
//                           <div className="mx-auto flex max-w-sm flex-col items-center">
//                             <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                               <FontAwesomeIcon
//                                 icon={faFileInvoice}
//                                 className="h-6 w-6"
//                               />
//                             </span>
//                             <h3 className="mt-4 text-base font-bold text-ink">
//                               No invoices found
//                             </h3>
//                             <p className="mt-1 text-sm text-neutral-500">
//                               Try adjusting your filters or search keyword.
//                             </p>
//                             <button
//                               onClick={() => {
//                                 setTab("all");
//                                 setSearch("");
//                               }}
//                               className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                             >
//                               Clear filters
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Footer */}
//               <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
//                 <p className="text-xs font-medium text-neutral-600">
//                   Showing{" "}
//                   <span className="font-black text-ink">
//                     {filtered.length}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-black text-ink">
//                     {invoices.length}
//                   </span>{" "}
//                   invoices
//                 </p>

//                 <div className="flex items-center gap-1">
//                   <button
//                     type="button"
//                     disabled
//                     aria-label="Previous page"
//                     className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <FontAwesomeIcon
//                       icon={faChevronLeft}
//                       className="h-3 w-3"
//                     />
//                   </button>
//                   <button
//                     type="button"
//                     className="flex h-8 min-w-8 items-center justify-center rounded-md bg-ink px-2 text-xs font-black text-white"
//                   >
//                     1
//                   </button>
//                   <button
//                     type="button"
//                     aria-label="Next page"
//                     className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
//                   >
//                     <FontAwesomeIcon
//                       icon={faChevronRight}
//                       className="h-3 w-3"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT — Plans + Sidebar */}
//           <aside className="space-y-4">
//             {/* Plans */}
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
//                 <h2 className="text-base font-black tracking-tight text-ink">
//                   Subscription Plans
//                 </h2>
//                 <p className="mt-1 text-xs text-neutral-500">
//                   Active plans and their current users
//                 </p>
//               </header>
//               <div className="space-y-3 p-4">
//                 {PLANS.map((plan) => (
//                   <div
//                     key={plan.name}
//                     className={`relative rounded-lg border p-4 ${
//                       plan.popular
//                         ? "border-brand-300 bg-brand-50/40"
//                         : "border-neutral-200 bg-white"
//                     }`}
//                   >
//                     {plan.popular && (
//                       <span className="absolute -top-2 left-3 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
//                         Most Popular
//                       </span>
//                     )}
//                     <div className="flex items-start justify-between gap-2">
//                       <div className="min-w-0">
//                         <h3 className="text-sm font-black text-ink">
//                           {plan.name}
//                         </h3>
//                         <p className="mt-0.5 text-sm font-bold text-brand-600">
//                           {plan.price}
//                         </p>
//                       </div>
//                       <span className="shrink-0 rounded-sm bg-neutral-100 px-2 py-0.5 text-[10px] font-black text-neutral-700">
//                         {plan.users} users
//                       </span>
//                     </div>
//                     <ul className="mt-3 space-y-1">
//                       {plan.features.map((f) => (
//                         <li
//                           key={f}
//                           className="flex items-center gap-1.5 text-xs text-neutral-600"
//                         >
//                           <FontAwesomeIcon
//                             icon={faCircleCheck}
//                             className="h-2.5 w-2.5 text-emerald-500"
//                           />
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       type="button"
//                       onClick={() => setManageOpen(plan)}
//                       className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white py-2 text-xs font-bold text-ink transition hover:bg-neutral-50"
//                     >
//                       Manage Plan
//                       <FontAwesomeIcon
//                         icon={faArrowRight}
//                         className="h-2.5 w-2.5"
//                       />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment health */}
//             <div className="rounded-xl border border-neutral-200 bg-white p-5">
//               <div className="flex items-start gap-3">
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
//                   <FontAwesomeIcon
//                     icon={faCreditCard}
//                     className="h-4 w-4"
//                   />
//                 </span>
//                 <div>
//                   <h3 className="text-sm font-black uppercase tracking-wider text-ink">
//                     Payment Health
//                   </h3>
//                   <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
//                     All payment gateways operating normally. Last sync{" "}
//                     <span className="font-bold text-ink">5 min ago</span>.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Policy reminder */}
//             <div className="rounded-xl border border-neutral-200 bg-white p-5">
//               <div className="flex items-start gap-3">
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
//                   <FontAwesomeIcon
//                     icon={faShieldHalved}
//                     className="h-4 w-4"
//                   />
//                 </span>
//                 <div>
//                   <h3 className="text-sm font-black uppercase tracking-wider text-ink">
//                     Policy reminder
//                   </h3>
//                   <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-neutral-600">
//                     <li className="flex items-start gap-1.5">
//                       <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                       Refunds require a documented reason.
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                       All billing actions are audited.
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                       Failed payments retry automatically up to 3 times.
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* =========================================
//           VIEW INVOICE MODAL
//           ========================================= */}
//       {viewOpen && (
//         <Modal
//           onClose={() => setViewOpen(null)}
//           title={`Invoice ${viewOpen.id}`}
//           subtitle={`${viewOpen.user} · ${viewOpen.date}`}
//         >
//           <dl className="grid gap-3 sm:grid-cols-2">
//             {[
//               { label: "Invoice ID", value: viewOpen.id },
//               { label: "Customer", value: viewOpen.user },
//               { label: "Plan", value: viewOpen.plan },
//               { label: "Amount", value: viewOpen.amount },
//               { label: "Date", value: viewOpen.date },
//               { label: "Status", value: viewOpen.status },
//             ].map((row) => (
//               <div key={row.label}>
//                 <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                   {row.label}
//                 </dt>
//                 <dd className="mt-1 text-sm font-bold text-ink">
//                   {row.value}
//                 </dd>
//               </div>
//             ))}
//           </dl>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setViewOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
//             </button>
//             {viewOpen.status === "Pending" && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setResolveOpen(viewOpen);
//                   setViewOpen(null);
//                 }}
//                 className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
//                 Mark as paid
//               </button>
//             )}
//             {viewOpen.status === "Paid" && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setRefundOpen(viewOpen);
//                   setViewOpen(null);
//                 }}
//                 className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
//               >
//                 <FontAwesomeIcon
//                   icon={faRotateLeft}
//                   className="h-3.5 w-3.5"
//                 />
//                 Issue refund
//               </button>
//             )}
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           RESOLVE MODAL
//           ========================================= */}
//       {resolveOpen && (
//         <Modal
//           onClose={() => setResolveOpen(null)}
//           title="Mark invoice as paid?"
//           subtitle={`${resolveOpen.id} · ${resolveOpen.amount}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             Confirm that payment has been received for this invoice. The status
//             will be updated to <span className="font-bold text-ink">Paid</span>{" "}
//             and the customer will be notified.
//           </p>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setResolveOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => resolve(resolveOpen)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
//               Confirm payment
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           REFUND MODAL
//           ========================================= */}
//       {refundOpen && (
//         <Modal
//           onClose={() => setRefundOpen(null)}
//           title="Issue a refund?"
//           subtitle={`${refundOpen.id} · ${refundOpen.amount}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             Refunds are processed via the original payment method and may take
//             5–7 business days. This action is logged and can be audited.
//           </p>

//           <div className="mt-4">
//             <label
//               htmlFor="refund-reason"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Reason for refund <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="refund-reason"
//               value={actionReason}
//               onChange={(e) => setActionReason(e.target.value)}
//               rows={4}
//               placeholder="e.g. Customer cancelled subscription within trial period."
//               className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setRefundOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!actionReason.trim()}
//               onClick={() => refund(refundOpen, actionReason)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" />
//               Confirm refund
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
//           title="Export billing report"
//           subtitle="Choose the format and range"
//         >
//           <div className="space-y-3">
//             <div>
//               <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Format
//               </p>
//               <div className="mt-2 grid grid-cols-3 gap-2">
//                 {["CSV", "Excel", "PDF"].map((f) => (
//                   <button
//                     key={f}
//                     type="button"
//                     className="rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-bold text-ink transition hover:border-brand-300 hover:bg-brand-50/40"
//                   >
//                     {f}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Date range
//               </p>
//               <select className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
//                 <option>This month</option>
//                 <option>Last 30 days</option>
//                 <option>Last 90 days</option>
//                 <option>Year to date</option>
//                 <option>Custom range</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setExportOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setExportOpen(false)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5" />
//               Download
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           MANAGE PLAN MODAL
//           ========================================= */}
//       {manageOpen && (
//         <Modal
//           onClose={() => setManageOpen(null)}
//           title={`Manage ${manageOpen.name}`}
//           subtitle={`${manageOpen.price} · ${manageOpen.users} users`}
//         >
//           <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
//             <p className="text-xs font-black uppercase tracking-wider text-neutral-500">
//               Features
//             </p>
//             <ul className="mt-2 space-y-1.5">
//               {manageOpen.features.map((f) => (
//                 <li
//                   key={f}
//                   className="flex items-center gap-2 text-sm text-neutral-700"
//                 >
//                   <FontAwesomeIcon
//                     icon={faCircleCheck}
//                     className="h-3 w-3 text-emerald-500"
//                   />
//                   {f}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-4 space-y-2">
//             <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
//               Plan actions
//             </p>
//             {[
//               "Edit plan details and pricing",
//               "View all subscribers",
//               "Send plan announcement",
//               "Archive this plan",
//             ].map((action) => (
//               <button
//                 key={action}
//                 type="button"
//                 className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-neutral-50"
//               >
//                 {action}
//                 <FontAwesomeIcon
//                   icon={faArrowRight}
//                   className="h-2.5 w-2.5 text-neutral-400"
//                 />
//               </button>
//             ))}
//           </div>

//           <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
//             <button
//               type="button"
//               onClick={() => setManageOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
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
//         <div className="border-b border-neutral-100 px-6 py-4">
//           <h3 className="text-lg font-black tracking-tight text-ink">
//             {title}
//           </h3>
//           {subtitle && (
//             <p className="mt-1 text-xs font-medium text-neutral-500">
//               {subtitle}
//             </p>
//           )}
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faArrowTrendUp,
  faArrowTrendDown,
  faReceipt,
  faCrown,
  faDownload,
  faMagnifyingGlass,
  faEllipsisVertical,
  faCircleCheck,
  faClock,
  faArrowLeft,
  faArrowRight,
  faXmark,
  faCheck,
  faCircleInfo,
  faEye,
  faRotateLeft,
  faChevronLeft,
  faChevronRight,
  faCreditCard,
  faFileInvoice,
  faCircleExclamation,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/* ============================================
   TYPES
   ============================================ */

type InvoiceStatus = "Paid" | "Pending" | "Failed";

interface Invoice {
  id: string;
  user: string;
  plan: string;
  amount: string;
  date: string;
  status: InvoiceStatus;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  users: number;
  popular?: boolean;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-2026-089",
    user: "Zainab Real Estate",
    plan: "Pro Agency",
    amount: "PKR 45,000",
    date: "Oct 28, 2026",
    status: "Paid",
  },
  {
    id: "INV-2026-088",
    user: "Ali Khan",
    plan: "Individual Agent",
    amount: "PKR 8,000",
    date: "Oct 28, 2026",
    status: "Paid",
  },
  {
    id: "INV-2026-087",
    user: "Usman Properties",
    plan: "Basic Agency",
    amount: "PKR 25,000",
    date: "Oct 27, 2026",
    status: "Pending",
  },
  {
    id: "INV-2026-086",
    user: "Bilal Properties",
    plan: "Pro Agency",
    amount: "PKR 45,000",
    date: "Oct 26, 2026",
    status: "Paid",
  },
  {
    id: "INV-2026-085",
    user: "Sara Malik",
    plan: "Individual Agent",
    amount: "PKR 8,000",
    date: "Oct 25, 2026",
    status: "Failed",
  },
];

const PLANS: Plan[] = [
  {
    name: "Basic Agency",
    price: "PKR 25,000/mo",
    features: ["10 Listings", "Basic Support", "Standard Analytics"],
    users: 45,
  },
  {
    name: "Pro Agency",
    price: "PKR 45,000/mo",
    features: ["50 Listings", "Priority Support", "Advanced Analytics"],
    users: 32,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited Listings",
      "Dedicated Manager",
      "Custom Integrations",
    ],
    users: 8,
  },
];

const TABS: { key: "all" | InvoiceStatus; label: string }[] = [
  { key: "all", label: "All Invoices" },
  { key: "Paid", label: "Paid" },
  { key: "Pending", label: "Pending" },
  { key: "Failed", label: "Failed" },
];

/* ============================================
   HELPERS
   ============================================ */

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

export default function AdminBillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [tab, setTab] = useState<"all" | InvoiceStatus>("all");
  const [search, setSearch] = useState("");
  const [viewOpen, setViewOpen] = useState<Invoice | null>(null);
  const [resolveOpen, setResolveOpen] = useState<Invoice | null>(null);
  const [refundOpen, setRefundOpen] = useState<Invoice | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState<Plan | null>(null);
  const [actionReason, setActionReason] = useState("");

  const counts = useMemo(
    () => ({
      all: invoices.length,
      Paid: invoices.filter((i) => i.status === "Paid").length,
      Pending: invoices.filter((i) => i.status === "Pending").length,
      Failed: invoices.filter((i) => i.status === "Failed").length,
    }),
    [invoices]
  );

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (tab !== "all" && inv.status !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !inv.id.toLowerCase().includes(q) &&
          !inv.user.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [invoices, tab, search]);

  const resolve = (invoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === invoice.id ? { ...i, status: "Paid" as InvoiceStatus } : i
      )
    );
    setResolveOpen(null);
  };

  const refund = (invoice: Invoice, reason: string) => {
    if (!reason.trim()) return;
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === invoice.id ? { ...i, status: "Failed" as InvoiceStatus } : i
      )
    );
    setRefundOpen(null);
    setActionReason("");
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
                Admin · Billing & Subscriptions
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Billing & Subscriptions
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage invoices, plans, and payment statuses. Every action is
                logged.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/admin"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
              <button
                type="button"
                onClick={() => setExportOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            STATS
            ========================================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              title: "Total Revenue",
              value: "PKR 4.2M",
              delta: "+12.5%",
              trend: "up" as const,
              icon: faWallet,
            },
            {
              title: "Active Subscriptions",
              value: "124",
              delta: "+8",
              trend: "up" as const,
              icon: faCrown,
            },
            {
              title: "Pending Invoices",
              value: "18",
              delta: "-2",
              trend: "down" as const,
              icon: faClock,
            },
            {
              title: "Total Transactions",
              value: "892",
              delta: "+24",
              trend: "up" as const,
              icon: faReceipt,
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="h-4 w-4"
                  />
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${
                    stat.trend === "down"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-brand-50 text-brand-700"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      stat.trend === "down"
                        ? faArrowTrendDown
                        : faArrowTrendUp
                    }
                    className="h-2 w-2"
                  />
                  {stat.delta}
                </span>
              </div>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            MAIN GRID
            ========================================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT — Invoices */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {/* Filter bar */}
              <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div
                  className="flex gap-1 overflow-x-auto"
                  role="tablist"
                  aria-label="Filter invoices"
                >
                  {TABS.map((t) => {
                    const active = tab === t.key;
                    return (
                      <button
                        key={t.key}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setTab(t.key)}
                        className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
                          active
                            ? "bg-ink text-white"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                        }`}
                      >
                        {t.label}
                        <span
                          className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {counts[t.key]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full sm:w-64">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search invoice or user..."
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full md:min-w-[800px] text-left max-md:block max-md:[&_thead]:hidden max-md:[&_tbody]:block max-md:[&_tr]:block max-md:[&_tr]:p-4 max-md:[&_td]:flex max-md:[&_td]:items-center max-md:[&_td]:justify-between max-md:[&_td]:gap-4 max-md:[&_td]:px-0 max-md:[&_td]:py-1.5 max-md:[&_td]:text-right max-md:[&_td:first-child]:justify-start max-md:[&_td:first-child]:text-left max-md:[&_td]:before:content-[attr(data-label)] max-md:[&_td]:before:shrink-0 max-md:[&_td]:before:text-[11px] max-md:[&_td[colspan]]:justify-center max-md:[&_td[colspan]]:text-center max-md:[&_td[colspan]]:before:hidden max-md:[&_td]:before:font-bold max-md:[&_td]:before:uppercase max-md:[&_td]:before:tracking-wider max-md:[&_td]:before:text-neutral-400">
                  <thead className="border-b border-neutral-200 bg-neutral-50">
                    <tr>
                      {[
                        "Invoice ID",
                        "User",
                        "Plan",
                        "Amount",
                        "Date",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                        >
                          {h}
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filtered.map((inv) => (
                      <tr
                        key={inv.id}
                        className="group transition hover:bg-neutral-50/70"
                      >
                        <td className="px-4 py-4">
                          <p className="font-mono text-sm font-bold text-ink group-hover:text-brand-600">
                            {inv.id}
                          </p>
                        </td>
                        <td data-label="User" className="px-4 py-4">
                          <p className="truncate text-sm font-semibold text-ink">
                            {inv.user}
                          </p>
                        </td>
                        <td data-label="Plan" className="px-4 py-4">
                          <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
                            {inv.plan}
                          </span>
                        </td>
                        <td data-label="Amount" className="px-4 py-4">
                          <p className="whitespace-nowrap text-sm font-black text-ink">
                            {inv.amount}
                          </p>
                        </td>
                        <td data-label="Date" className="px-4 py-4">
                          <p className="text-sm font-medium text-neutral-600">
                            {inv.date}
                          </p>
                        </td>
                        <td data-label="Status" className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                              statusTone[inv.status]
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                statusDot[inv.status]
                              }`}
                            />
                            {inv.status}
                          </span>
                        </td>
                        <td data-label="Actions" className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setViewOpen(inv)}
                              aria-label={`View ${inv.id}`}
                              title="View invoice"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                            {inv.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() => setResolveOpen(inv)}
                                aria-label="Mark as paid"
                                title="Mark as paid"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
                              >
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="h-3.5 w-3.5"
                                />
                              </button>
                            )}
                            {inv.status === "Paid" && (
                              <button
                                type="button"
                                onClick={() => setRefundOpen(inv)}
                                aria-label="Refund invoice"
                                title="Refund invoice"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
                              >
                                <FontAwesomeIcon
                                  icon={faRotateLeft}
                                  className="h-3.5 w-3.5"
                                />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setViewOpen(inv)}
                              aria-label="More actions"
                              title="More actions"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
                            >
                              <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-16 text-center">
                          <div className="mx-auto flex max-w-sm flex-col items-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                              <FontAwesomeIcon
                                icon={faFileInvoice}
                                className="h-6 w-6"
                              />
                            </span>
                            <h3 className="mt-4 text-base font-bold text-ink">
                              No invoices found
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">
                              Try adjusting your filters or search keyword.
                            </p>
                            <button
                              onClick={() => {
                                setTab("all");
                                setSearch("");
                              }}
                              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                            >
                              Clear filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
                <p className="text-xs font-medium text-neutral-600">
                  Showing{" "}
                  <span className="font-black text-ink">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-black text-ink">
                    {invoices.length}
                  </span>{" "}
                  invoices
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled
                    aria-label="Previous page"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="h-3 w-3"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex h-8 min-w-8 items-center justify-center rounded-md bg-ink px-2 text-xs font-black text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    aria-label="Next page"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-3 w-3"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Plans + Sidebar */}
          <aside className="space-y-4">
            {/* Plans */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <h2 className="text-base font-black tracking-tight text-ink">
                  Subscription Plans
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Active plans and their current users
                </p>
              </header>
              <div className="space-y-3 p-4">
                {PLANS.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-lg border p-4 ${
                      plan.popular
                        ? "border-brand-300 bg-brand-50/40"
                        : "border-neutral-200 bg-white"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2 left-3 rounded-sm bg-brand-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                        Most Popular
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
                      <span className="shrink-0 rounded-sm bg-neutral-100 px-2 py-0.5 text-[10px] font-black text-neutral-700">
                        {plan.users} users
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-1.5 text-xs text-neutral-600"
                        >
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="h-2.5 w-2.5 text-emerald-500"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setManageOpen(plan)}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white py-2 text-xs font-bold text-ink transition hover:bg-neutral-50"
                    >
                      Manage Plan
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="h-2.5 w-2.5"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment health */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="h-4 w-4"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-ink">
                    Payment Health
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    All payment gateways operating normally. Last sync{" "}
                    <span className="font-bold text-ink">5 min ago</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy reminder */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="h-4 w-4"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-ink">
                    Policy reminder
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-neutral-600">
                    <li className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      Refunds require a documented reason.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      All billing actions are audited.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      Failed payments retry automatically up to 3 times.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          VIEW INVOICE MODAL
          ========================================= */}
      {viewOpen && (
        <Modal
          onClose={() => setViewOpen(null)}
          title={`Invoice ${viewOpen.id}`}
          subtitle={`${viewOpen.user} · ${viewOpen.date}`}
        >
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Invoice ID", value: viewOpen.id },
              { label: "Customer", value: viewOpen.user },
              { label: "Plan", value: viewOpen.plan },
              { label: "Amount", value: viewOpen.amount },
              { label: "Date", value: viewOpen.date },
              { label: "Status", value: viewOpen.status },
            ].map((row) => (
              <div key={row.label}>
                <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm font-bold text-ink">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setViewOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            {viewOpen.status === "Pending" && (
              <button
                type="button"
                onClick={() => {
                  setResolveOpen(viewOpen);
                  setViewOpen(null);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
                Mark as paid
              </button>
            )}
            {viewOpen.status === "Paid" && (
              <button
                type="button"
                onClick={() => {
                  setRefundOpen(viewOpen);
                  setViewOpen(null);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  className="h-3.5 w-3.5"
                />
                Issue refund
              </button>
            )}
          </div>
        </Modal>
      )}

      {/* =========================================
          RESOLVE MODAL
          ========================================= */}
      {resolveOpen && (
        <Modal
          onClose={() => setResolveOpen(null)}
          title="Mark invoice as paid?"
          subtitle={`${resolveOpen.id} · ${resolveOpen.amount}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            Confirm that payment has been received for this invoice. The status
            will be updated to <span className="font-bold text-ink">Paid</span>{" "}
            and the customer will be notified.
          </p>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setResolveOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => resolve(resolveOpen)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              Confirm payment
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REFUND MODAL
          ========================================= */}
      {refundOpen && (
        <Modal
          onClose={() => setRefundOpen(null)}
          title="Issue a refund?"
          subtitle={`${refundOpen.id} · ${refundOpen.amount}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            Refunds are processed via the original payment method and may take
            5–7 business days. This action is logged and can be audited.
          </p>

          <div className="mt-4">
            <label
              htmlFor="refund-reason"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Reason for refund <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="refund-reason"
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={4}
              placeholder="e.g. Customer cancelled subscription within trial period."
              className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setRefundOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!actionReason.trim()}
              onClick={() => refund(refundOpen, actionReason)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" />
              Confirm refund
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
          title="Export billing report"
          subtitle="Choose the format and range"
        >
          <div className="space-y-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Format
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["CSV", "Excel", "PDF"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className="rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-bold text-ink transition hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Date range
              </p>
              <select className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
                <option>This month</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Year to date</option>
                <option>Custom range</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setExportOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setExportOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          MANAGE PLAN MODAL
          ========================================= */}
      {manageOpen && (
        <Modal
          onClose={() => setManageOpen(null)}
          title={`Manage ${manageOpen.name}`}
          subtitle={`${manageOpen.price} · ${manageOpen.users} users`}
        >
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-xs font-black uppercase tracking-wider text-neutral-500">
              Features
            </p>
            <ul className="mt-2 space-y-1.5">
              {manageOpen.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-neutral-700"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="h-3 w-3 text-emerald-500"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
              Plan actions
            </p>
            {[
              "Edit plan details and pricing",
              "View all subscribers",
              "Send plan announcement",
              "Archive this plan",
            ].map((action) => (
              <button
                key={action}
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-neutral-50"
              >
                {action}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-2.5 w-2.5 text-neutral-400"
                />
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setManageOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
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
        <div className="border-b border-neutral-100 px-6 py-4">
          <h3 className="text-lg font-black tracking-tight text-ink">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs font-medium text-neutral-500">
              {subtitle}
            </p>
          )}
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}