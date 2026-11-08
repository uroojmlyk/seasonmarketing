// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFlag,
//   faTriangleExclamation,
//   faCopy,
//   faCheck,
//   faXmark,
//   faEye,
//   faMagnifyingGlass,
//   faClock,
//   faCircleInfo,
//   faCircleCheck,
//   faArrowLeft,
//   faFileLines,
//   faUser,
//   faArrowRight,
//   faShieldHalved,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type Severity = "High" | "Medium";
// type Status = "open" | "taken_down" | "dismissed";

// interface Report {
//   id: string;
//   type: string;
//   severity: Severity;
//   reportedItem: string;
//   reportedItemHref?: string;
//   reportedBy: string;
//   reason: string;
//   date: string;
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_REPORTS: Report[] = [
//   {
//     id: "R-501",
//     type: "Scam / Fraud",
//     severity: "High",
//     reportedItem: "Property Listing: Modern House in DHA",
//     reportedBy: "Ahmed R.",
//     reason:
//       "The agent is asking for advance payment before showing the property.",
//     date: "10 mins ago",
//   },
//   {
//     id: "R-502",
//     type: "Duplicate Listing",
//     severity: "Medium",
//     reportedItem: "Property Listing: Sea View Apartment",
//     reportedBy: "System Auto-Detect",
//     reason:
//       "This listing matches another active listing with identical images and price.",
//     date: "1 hour ago",
//   },
//   {
//     id: "R-503",
//     type: "Fake Price",
//     severity: "High",
//     reportedItem: "Property Listing: Commercial Plot",
//     reportedBy: "Sara M.",
//     reason:
//       "The price listed is much lower than market value. Likely a bait listing.",
//     date: "3 hours ago",
//   },
//   {
//     id: "R-504",
//     type: "Impersonation",
//     severity: "Medium",
//     reportedItem: "Agent Profile: Usman Properties",
//     reportedBy: "Bilal K.",
//     reason: "This agent is using another agency's license number.",
//     date: "1 day ago",
//   },
// ];

// const TABS: { key: "all" | Severity; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "High", label: "High Priority" },
//   { key: "Medium", label: "Medium" },
// ];

// /* ============================================
//    HELPERS
//    ============================================ */

// const reportIcon = (type: string) => {
//   if (type.toLowerCase().includes("duplicate")) return faCopy;
//   if (type.toLowerCase().includes("impersonation")) return faUser;
//   if (type.toLowerCase().includes("price")) return faTriangleExclamation;
//   return faFlag;
// };

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AdminReportsPage() {
//   const [reports, setReports] = useState(INITIAL_REPORTS);
//   const [status, setStatus] = useState<Record<string, Status>>({});
//   const [tab, setTab] = useState<"all" | Severity>("all");
//   const [search, setSearch] = useState("");
//   const [viewOpen, setViewOpen] = useState<Report | null>(null);
//   const [takeDownOpen, setTakeDownOpen] = useState<Report | null>(null);
//   const [dismissOpen, setDismissOpen] = useState<Report | null>(null);
//   const [actionReason, setActionReason] = useState("");

//   const filtered = useMemo(() => {
//     return reports.filter((r) => {
//       if (status[r.id]) return false; // hide resolved
//       if (tab !== "all" && r.severity !== tab) return false;
//       if (search) {
//         const q = search.toLowerCase();
//         if (
//           !r.type.toLowerCase().includes(q) &&
//           !r.reportedItem.toLowerCase().includes(q) &&
//           !r.reportedBy.toLowerCase().includes(q) &&
//           !r.id.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [reports, status, tab, search]);

//   const counts = useMemo(() => {
//     const open = reports.filter((r) => !status[r.id]);
//     return {
//       high: open.filter((r) => r.severity === "High").length,
//       medium: open.filter((r) => r.severity === "Medium").length,
//       resolved: Object.values(status).filter(
//         (s) => s === "taken_down" || s === "dismissed"
//       ).length,
//     };
//   }, [reports, status]);

//   const takeDown = (report: Report, reason: string) => {
//     if (!reason.trim()) return;
//     setStatus((s) => ({ ...s, [report.id]: "taken_down" }));
//     setTakeDownOpen(null);
//     setActionReason("");
//   };

//   const dismiss = (report: Report, reason: string) => {
//     if (!reason.trim()) return;
//     setStatus((s) => ({ ...s, [report.id]: "dismissed" }));
//     setDismissOpen(null);
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
//                 Admin · Reports & Fraud
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Reports & Fraud
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Review user reports, suspicious activity, and duplicate
//                 listings. Every action is logged per the moderation policy.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <Link
//                 href="/dashboard/admin"
//                 className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
//                 Back to Dashboard
//               </Link>
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
//               label: "High Priority",
//               value: counts.high,
//               tone: "red" as const,
//               icon: faTriangleExclamation,
//             },
//             {
//               label: "Medium Priority",
//               value: counts.medium,
//               tone: "amber" as const,
//               icon: faFlag,
//             },
//             {
//               label: "Resolved Today",
//               value: 14 + counts.resolved,
//               tone: "emerald" as const,
//               icon: faCircleCheck,
//             },
//             {
//               label: "Avg. Response",
//               value: "2h 18m",
//               tone: "neutral" as const,
//               icon: faClock,
//             },
//           ].map((s) => (
//             <div
//               key={s.label}
//               className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
//             >
//               <div className="flex items-center justify-between">
//                 <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
//                   {s.label}
//                 </span>
//                 <FontAwesomeIcon
//                   icon={s.icon}
//                   className={`h-3.5 w-3.5 ${
//                     s.tone === "red"
//                       ? "text-red-500"
//                       : s.tone === "amber"
//                       ? "text-amber-500"
//                       : s.tone === "emerald"
//                       ? "text-emerald-500"
//                       : "text-neutral-400"
//                   }`}
//                 />
//               </div>
//               <p className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
//                 {s.value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* =========================================
//             MAIN GRID
//             ========================================= */}
//         <div className="mt-6 grid gap-6 lg:grid-cols-3">
//           {/* LEFT — queue */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               {/* Filter bar */}
//               <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
//                 <div
//                   className="flex gap-1 overflow-x-auto"
//                   role="tablist"
//                   aria-label="Filter reports"
//                 >
//                   {TABS.map((t) => {
//                     const active = tab === t.key;
//                     return (
//                       <button
//                         key={t.key}
//                         role="tab"
//                         aria-selected={active}
//                         onClick={() => setTab(t.key)}
//                         className={`shrink-0 rounded-md px-3.5 py-2 text-sm font-bold transition ${
//                           active
//                             ? "bg-ink text-white"
//                             : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
//                         }`}
//                       >
//                         {t.label}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="relative w-full sm:w-72">
//                   <FontAwesomeIcon
//                     icon={faMagnifyingGlass}
//                     className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
//                   />
//                   <input
//                     type="search"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search by type, item, or ID..."
//                     className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                   />
//                 </div>
//               </div>

//               {/* List */}
//               {filtered.length === 0 ? (
//                 <div className="flex flex-col items-center px-6 py-16 text-center">
//                   <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                     <FontAwesomeIcon icon={faFlag} className="h-6 w-6" />
//                   </span>
//                   <h3 className="mt-4 text-base font-bold text-ink">
//                     All caught up
//                   </h3>
//                   <p className="mt-1 max-w-sm text-sm text-neutral-500">
//                     No open reports matching your filters. Well done.
//                   </p>
//                   {(tab !== "all" || search) && (
//                     <button
//                       onClick={() => {
//                         setTab("all");
//                         setSearch("");
//                       }}
//                       className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                     >
//                       Clear filters
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <ul className="divide-y divide-neutral-100">
//                   {filtered.map((r) => {
//                     const isHigh = r.severity === "High";
//                     const Icon = reportIcon(r.type);
//                     return (
//                       <li key={r.id} className="p-5 sm:p-6">
//                         <div className="flex flex-col gap-5">
//                           {/* Top row */}
//                           <div className="flex flex-wrap items-start justify-between gap-3">
//                             <div className="flex min-w-0 items-start gap-3">
//                               <span
//                                 className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
//                                   isHigh
//                                     ? "bg-red-500 text-white"
//                                     : "bg-amber-500 text-white"
//                                 }`}
//                               >
//                                 <FontAwesomeIcon
//                                   icon={Icon}
//                                   className="h-4 w-4"
//                                 />
//                               </span>
//                               <div className="min-w-0">
//                                 <div className="flex flex-wrap items-center gap-2">
//                                   <h3 className="text-base font-black tracking-tight text-ink">
//                                     {r.type}
//                                   </h3>
//                                   <span className="rounded-sm bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-neutral-600">
//                                     {r.id}
//                                   </span>
//                                 </div>
//                                 <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
//                                   <FontAwesomeIcon
//                                     icon={faClock}
//                                     className="h-2.5 w-2.5"
//                                   />
//                                   {r.date}
//                                 </p>
//                               </div>
//                             </div>

//                             <span
//                               className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
//                                 isHigh
//                                   ? "bg-red-50 text-red-700 ring-1 ring-red-200"
//                                   : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
//                               }`}
//                             >
//                               {r.severity} Priority
//                             </span>
//                           </div>

//                           {/* Details grid */}
//                           <div className="grid gap-3 sm:grid-cols-2">
//                             <div>
//                               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                                 Reported Item
//                               </p>
//                               <p className="mt-1 text-sm font-semibold text-ink">
//                                 {r.reportedItem}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                                 Reported By
//                               </p>
//                               <p className="mt-1 text-sm font-semibold text-ink">
//                                 {r.reportedBy}
//                               </p>
//                             </div>
//                           </div>

//                           {/* Reason */}
//                           <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
//                             <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                               Reason
//                             </p>
//                             <p className="mt-1 text-sm italic leading-relaxed text-neutral-700">
//                               &ldquo;{r.reason}&rdquo;
//                             </p>
//                           </div>

//                           {/* Actions */}
//                           <div className="flex flex-wrap items-center justify-end gap-2 border-t border-neutral-100 pt-4">
//                             <button
//                               type="button"
//                               onClick={() => setViewOpen(r)}
//                               className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faEye}
//                                 className="h-3.5 w-3.5"
//                               />
//                               View
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => setTakeDownOpen(r)}
//                               className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faXmark}
//                                 className="h-3.5 w-3.5"
//                               />
//                               Take Down
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => setDismissOpen(r)}
//                               className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faCheck}
//                                 className="h-3.5 w-3.5"
//                               />
//                               Dismiss
//                             </button>
//                           </div>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}

//               {/* Footer */}
//               {filtered.length > 0 && (
//                 <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:px-5">
//                   <p className="text-xs font-medium text-neutral-600">
//                     Showing{" "}
//                     <span className="font-black text-ink">
//                       {filtered.length}
//                     </span>{" "}
//                     open report{filtered.length !== 1 ? "s" : ""}
//                     {search && (
//                       <>
//                         {" "}
//                         matching{" "}
//                         <span className="font-bold text-ink">"{search}"</span>
//                       </>
//                     )}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT — sidebar */}
//           <aside className="space-y-4">
//             {/* Resolved summary */}
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
//                 <h2 className="text-base font-black tracking-tight text-ink">
//                   Recent resolutions
//                 </h2>
//                 <p className="mt-1 text-xs text-neutral-500">
//                   Actions taken in this session
//                 </p>
//               </header>
//               <ul className="divide-y divide-neutral-100">
//                 {reports
//                   .filter((r) => status[r.id])
//                   .slice(0, 5)
//                   .map((r) => {
//                     const takenDown = status[r.id] === "taken_down";
//                     return (
//                       <li
//                         key={r.id}
//                         className="flex items-center gap-3 px-5 py-3"
//                       >
//                         <span
//                           className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
//                             takenDown
//                               ? "bg-red-50 text-red-600"
//                               : "bg-emerald-50 text-emerald-600"
//                           }`}
//                         >
//                           <FontAwesomeIcon
//                             icon={takenDown ? faXmark : faCheck}
//                             className="h-3 w-3"
//                           />
//                         </span>
//                         <div className="min-w-0 flex-1">
//                           <p className="truncate text-xs font-bold text-ink">
//                             {r.type}
//                           </p>
//                           <p className="text-[10px] font-medium text-neutral-500">
//                             {takenDown ? "Taken down" : "Dismissed"}
//                           </p>
//                         </div>
//                         <span className="shrink-0 font-mono text-[10px] font-black text-neutral-400">
//                           {r.id}
//                         </span>
//                       </li>
//                     );
//                   })}
//                 {Object.keys(status).length === 0 && (
//                   <li className="px-5 py-6 text-center">
//                     <p className="text-xs text-neutral-500">
//                       No reports resolved yet in this session.
//                     </p>
//                   </li>
//                 )}
//               </ul>
//             </div>

//             {/* Fraud alert — amber, no external link */}
//             <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
//               <div className="flex items-start gap-3">
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-700">
//                   <FontAwesomeIcon
//                     icon={faTriangleExclamation}
//                     className="h-4 w-4"
//                   />
//                 </span>
//                 <div>
//                   <h3 className="text-sm font-black uppercase tracking-wider text-amber-900">
//                     Fraud Alert
//                   </h3>
//                   <p className="mt-2 text-sm leading-relaxed text-amber-900/80">
//                     There has been an increase in fake listing reports from the
//                     Karachi region. Manually review all new listings from
//                     unverified agents before approving.
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
//                       Scam reports must be acknowledged same day.
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                       Take-down actions require a documented reason.
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                       Every decision is logged and appealable.
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* =========================================
//           VIEW MODAL
//           ========================================= */}
//       {viewOpen && (
//         <Modal
//           onClose={() => setViewOpen(null)}
//           title={`Report ${viewOpen.id}`}
//           subtitle={`${viewOpen.type} · ${viewOpen.severity} priority`}
//         >
//           <div className="space-y-4">
//             <div>
//               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                 Reported Item
//               </p>
//               <p className="mt-1 text-sm font-bold text-ink">
//                 {viewOpen.reportedItem}
//               </p>
//             </div>
//             <div>
//               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                 Reported By
//               </p>
//               <p className="mt-1 text-sm font-semibold text-ink">
//                 {viewOpen.reportedBy}
//               </p>
//             </div>
//             <div>
//               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                 Submitted
//               </p>
//               <p className="mt-1 text-sm text-neutral-700">{viewOpen.date}</p>
//             </div>
//             <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
//               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                 Reason
//               </p>
//               <p className="mt-1 text-sm italic leading-relaxed text-neutral-700">
//                 &ldquo;{viewOpen.reason}&rdquo;
//               </p>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setViewOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setTakeDownOpen(viewOpen);
//                 setViewOpen(null);
//               }}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
//             >
//               <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//               Take Down
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setDismissOpen(viewOpen);
//                 setViewOpen(null);
//               }}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
//               Dismiss
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           TAKE DOWN MODAL
//           ========================================= */}
//       {takeDownOpen && (
//         <Modal
//           onClose={() => setTakeDownOpen(null)}
//           title="Take down this item?"
//           subtitle={`${takeDownOpen.type} · ${takeDownOpen.id}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             The item will be immediately hidden from public view. The
//             advertiser will be notified. This action is logged and can be
//             appealed.
//           </p>

//           <div className="mt-4">
//             <label
//               htmlFor="take-down-reason"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Reason for take-down <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="take-down-reason"
//               value={actionReason}
//               onChange={(e) => setActionReason(e.target.value)}
//               rows={4}
//               placeholder="e.g. Confirmed scam — agent requested advance payment before viewing."
//               className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setTakeDownOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!actionReason.trim()}
//               onClick={() => takeDown(takeDownOpen, actionReason)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//               Confirm take-down
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           DISMISS MODAL
//           ========================================= */}
//       {dismissOpen && (
//         <Modal
//           onClose={() => setDismissOpen(null)}
//           title="Dismiss this report?"
//           subtitle={`${dismissOpen.type} · ${dismissOpen.id}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             The reported item will remain live. The reporter will be notified
//             that no action was taken. All dismissals are logged.
//           </p>

//           <div className="mt-4">
//             <label
//               htmlFor="dismiss-reason"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Reason for dismissal <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="dismiss-reason"
//               value={actionReason}
//               onChange={(e) => setActionReason(e.target.value)}
//               rows={4}
//               placeholder="e.g. Report was a misunderstanding — advertiser contacted and confirmed the price."
//               className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setDismissOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!actionReason.trim()}
//               onClick={() => dismiss(dismissOpen, actionReason)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
//               Confirm dismissal
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
  faFlag,
  faTriangleExclamation,
  faCopy,
  faCheck,
  faXmark,
  faEye,
  faMagnifyingGlass,
  faClock,
  faCircleInfo,
  faCircleCheck,
  faArrowLeft,
  faFileLines,
  faUser,
  faArrowRight,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type Severity = "High" | "Medium";
type Status = "open" | "taken_down" | "dismissed";

interface Report {
  id: string;
  type: string;
  severity: Severity;
  reportedItem: string;
  reportedItemHref?: string;
  reportedBy: string;
  reason: string;
  date: string;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_REPORTS: Report[] = [
  {
    id: "R-501",
    type: "Scam / Fraud",
    severity: "High",
    reportedItem: "Property Listing: Modern House in DHA",
    reportedBy: "Ahmed R.",
    reason:
      "The agent is asking for advance payment before showing the property.",
    date: "10 mins ago",
  },
  {
    id: "R-502",
    type: "Duplicate Listing",
    severity: "Medium",
    reportedItem: "Property Listing: Sea View Apartment",
    reportedBy: "System Auto-Detect",
    reason:
      "This listing matches another active listing with identical images and price.",
    date: "1 hour ago",
  },
  {
    id: "R-503",
    type: "Fake Price",
    severity: "High",
    reportedItem: "Property Listing: Commercial Plot",
    reportedBy: "Sara M.",
    reason:
      "The price listed is much lower than market value. Likely a bait listing.",
    date: "3 hours ago",
  },
  {
    id: "R-504",
    type: "Impersonation",
    severity: "Medium",
    reportedItem: "Agent Profile: Usman Properties",
    reportedBy: "Bilal K.",
    reason: "This agent is using another agency's license number.",
    date: "1 day ago",
  },
];

const TABS: { key: "all" | Severity; label: string }[] = [
  { key: "all", label: "All" },
  { key: "High", label: "High Priority" },
  { key: "Medium", label: "Medium" },
];

/* ============================================
   HELPERS
   ============================================ */

const reportIcon = (type: string) => {
  if (type.toLowerCase().includes("duplicate")) return faCopy;
  if (type.toLowerCase().includes("impersonation")) return faUser;
  if (type.toLowerCase().includes("price")) return faTriangleExclamation;
  return faFlag;
};

/* ============================================
   PAGE
   ============================================ */

export default function AdminReportsPage() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [tab, setTab] = useState<"all" | Severity>("all");
  const [search, setSearch] = useState("");
  const [viewOpen, setViewOpen] = useState<Report | null>(null);
  const [takeDownOpen, setTakeDownOpen] = useState<Report | null>(null);
  const [dismissOpen, setDismissOpen] = useState<Report | null>(null);
  const [actionReason, setActionReason] = useState("");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (status[r.id]) return false; // hide resolved
      if (tab !== "all" && r.severity !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.type.toLowerCase().includes(q) &&
          !r.reportedItem.toLowerCase().includes(q) &&
          !r.reportedBy.toLowerCase().includes(q) &&
          !r.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [reports, status, tab, search]);

  const counts = useMemo(() => {
    const open = reports.filter((r) => !status[r.id]);
    return {
      high: open.filter((r) => r.severity === "High").length,
      medium: open.filter((r) => r.severity === "Medium").length,
      resolved: Object.values(status).filter(
        (s) => s === "taken_down" || s === "dismissed"
      ).length,
    };
  }, [reports, status]);

  const takeDown = (report: Report, reason: string) => {
    if (!reason.trim()) return;
    setStatus((s) => ({ ...s, [report.id]: "taken_down" }));
    setTakeDownOpen(null);
    setActionReason("");
  };

  const dismiss = (report: Report, reason: string) => {
    if (!reason.trim()) return;
    setStatus((s) => ({ ...s, [report.id]: "dismissed" }));
    setDismissOpen(null);
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
                Admin · Reports & Fraud
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Reports & Fraud
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Review user reports, suspicious activity, and duplicate
                listings. Every action is logged per the moderation policy.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/admin"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back to Dashboard
              </Link>
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
              label: "High Priority",
              value: counts.high,
              tone: "red" as const,
              icon: faTriangleExclamation,
            },
            {
              label: "Medium Priority",
              value: counts.medium,
              tone: "amber" as const,
              icon: faFlag,
            },
            {
              label: "Resolved Today",
              value: 14 + counts.resolved,
              tone: "emerald" as const,
              icon: faCircleCheck,
            },
            {
              label: "Avg. Response",
              value: "2h 18m",
              tone: "neutral" as const,
              icon: faClock,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {s.label}
                </span>
                <FontAwesomeIcon
                  icon={s.icon}
                  className={`h-3.5 w-3.5 ${
                    s.tone === "red"
                      ? "text-red-500"
                      : s.tone === "amber"
                      ? "text-amber-500"
                      : s.tone === "emerald"
                      ? "text-emerald-500"
                      : "text-neutral-400"
                  }`}
                />
              </div>
              <p className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            MAIN GRID
            ========================================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT — queue */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {/* Filter bar */}
              <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div
                  className="flex gap-1 overflow-x-auto"
                  role="tablist"
                  aria-label="Filter reports"
                >
                  {TABS.map((t) => {
                    const active = tab === t.key;
                    return (
                      <button
                        key={t.key}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setTab(t.key)}
                        className={`shrink-0 rounded-md px-3.5 py-2 text-sm font-bold transition ${
                          active
                            ? "bg-ink text-white"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full sm:w-72">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by type, item, or ID..."
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                  />
                </div>
              </div>

              {/* List */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <FontAwesomeIcon icon={faFlag} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    All caught up
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-neutral-500">
                    No open reports matching your filters. Well done.
                  </p>
                  {(tab !== "all" || search) && (
                    <button
                      onClick={() => {
                        setTab("all");
                        setSearch("");
                      }}
                      className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {filtered.map((r) => {
                    const isHigh = r.severity === "High";
                    const Icon = reportIcon(r.type);
                    return (
                      <li key={r.id} className="p-5 sm:p-6">
                        <div className="flex flex-col gap-5">
                          {/* Top row */}
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                              <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                                  isHigh
                                    ? "bg-red-500 text-white"
                                    : "bg-amber-500 text-white"
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={Icon}
                                  className="h-4 w-4"
                                />
                              </span>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-base font-black tracking-tight text-ink">
                                    {r.type}
                                  </h3>
                                  <span className="rounded-sm bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-neutral-600">
                                    {r.id}
                                  </span>
                                </div>
                                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className="h-2.5 w-2.5"
                                  />
                                  {r.date}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
                                isHigh
                                  ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                                  : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                              }`}
                            >
                              {r.severity} Priority
                            </span>
                          </div>

                          {/* Details grid */}
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                                Reported Item
                              </p>
                              <p className="mt-1 text-sm font-semibold text-ink">
                                {r.reportedItem}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                                Reported By
                              </p>
                              <p className="mt-1 text-sm font-semibold text-ink">
                                {r.reportedBy}
                              </p>
                            </div>
                          </div>

                          {/* Reason */}
                          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                            <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                              Reason
                            </p>
                            <p className="mt-1 text-sm italic leading-relaxed text-neutral-700">
                              &ldquo;{r.reason}&rdquo;
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-neutral-100 pt-4">
                            <button
                              type="button"
                              onClick={() => setViewOpen(r)}
                              className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="h-3.5 w-3.5"
                              />
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => setTakeDownOpen(r)}
                              className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="h-3.5 w-3.5"
                              />
                              Take Down
                            </button>
                            <button
                              type="button"
                              onClick={() => setDismissOpen(r)}
                              className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="h-3.5 w-3.5"
                              />
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Footer */}
              {filtered.length > 0 && (
                <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:px-5">
                  <p className="text-xs font-medium text-neutral-600">
                    Showing{" "}
                    <span className="font-black text-ink">
                      {filtered.length}
                    </span>{" "}
                    open report{filtered.length !== 1 ? "s" : ""}
                    {search && (
                      <>
                        {" "}
                        matching{" "}
                        <span className="font-bold text-ink">"{search}"</span>
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <aside className="space-y-4">
            {/* Resolved summary */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <h2 className="text-base font-black tracking-tight text-ink">
                  Recent resolutions
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Actions taken in this session
                </p>
              </header>
              <ul className="divide-y divide-neutral-100">
                {reports
                  .filter((r) => status[r.id])
                  .slice(0, 5)
                  .map((r) => {
                    const takenDown = status[r.id] === "taken_down";
                    return (
                      <li
                        key={r.id}
                        className="flex items-center gap-3 px-5 py-3"
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                            takenDown
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={takenDown ? faXmark : faCheck}
                            className="h-3 w-3"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-ink">
                            {r.type}
                          </p>
                          <p className="text-[10px] font-medium text-neutral-500">
                            {takenDown ? "Taken down" : "Dismissed"}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] font-black text-neutral-400">
                          {r.id}
                        </span>
                      </li>
                    );
                  })}
                {Object.keys(status).length === 0 && (
                  <li className="px-5 py-6 text-center">
                    <p className="text-xs text-neutral-500">
                      No reports resolved yet in this session.
                    </p>
                  </li>
                )}
              </ul>
            </div>

            {/* Fraud alert — amber, no external link */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-700">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="h-4 w-4"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-amber-900">
                    Fraud Alert
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900/80">
                    There has been an increase in fake listing reports from the
                    Karachi region. Manually review all new listings from
                    unverified agents before approving.
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
                      Scam reports must be acknowledged same day.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      Take-down actions require a documented reason.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      Every decision is logged and appealable.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          VIEW MODAL
          ========================================= */}
      {viewOpen && (
        <Modal
          onClose={() => setViewOpen(null)}
          title={`Report ${viewOpen.id}`}
          subtitle={`${viewOpen.type} · ${viewOpen.severity} priority`}
        >
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                Reported Item
              </p>
              <p className="mt-1 text-sm font-bold text-ink">
                {viewOpen.reportedItem}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                Reported By
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                {viewOpen.reportedBy}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                Submitted
              </p>
              <p className="mt-1 text-sm text-neutral-700">{viewOpen.date}</p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                Reason
              </p>
              <p className="mt-1 text-sm italic leading-relaxed text-neutral-700">
                &ldquo;{viewOpen.reason}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setViewOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setTakeDownOpen(viewOpen);
                setViewOpen(null);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              Take Down
            </button>
            <button
              type="button"
              onClick={() => {
                setDismissOpen(viewOpen);
                setViewOpen(null);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              Dismiss
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          TAKE DOWN MODAL
          ========================================= */}
      {takeDownOpen && (
        <Modal
          onClose={() => setTakeDownOpen(null)}
          title="Take down this item?"
          subtitle={`${takeDownOpen.type} · ${takeDownOpen.id}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            The item will be immediately hidden from public view. The
            advertiser will be notified. This action is logged and can be
            appealed.
          </p>

          <div className="mt-4">
            <label
              htmlFor="take-down-reason"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Reason for take-down <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="take-down-reason"
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={4}
              placeholder="e.g. Confirmed scam — agent requested advance payment before viewing."
              className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setTakeDownOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!actionReason.trim()}
              onClick={() => takeDown(takeDownOpen, actionReason)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              Confirm take-down
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          DISMISS MODAL
          ========================================= */}
      {dismissOpen && (
        <Modal
          onClose={() => setDismissOpen(null)}
          title="Dismiss this report?"
          subtitle={`${dismissOpen.type} · ${dismissOpen.id}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            The reported item will remain live. The reporter will be notified
            that no action was taken. All dismissals are logged.
          </p>

          <div className="mt-4">
            <label
              htmlFor="dismiss-reason"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Reason for dismissal <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="dismiss-reason"
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={4}
              placeholder="e.g. Report was a misunderstanding — advertiser contacted and confirmed the price."
              className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setDismissOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!actionReason.trim()}
              onClick={() => dismiss(dismissOpen, actionReason)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              Confirm dismissal
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