// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileLines,
//   faCheck,
//   faXmark,
//   faEye,
//   faUserTie,
//   faBuilding,
//   faArrowRight,
//   faMagnifyingGlass,
//   faClock,
//   faCircleExclamation,
//   faCircleCheck,
//   faArrowLeft,
//   faCircleInfo,
//   faShieldHalved,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type RequestType = "Individual Agent" | "Agency";
// type RequestStatus = "pending" | "approved" | "rejected";

// interface VerificationRequest {
//   id: string;
//   name: string;
//   type: RequestType;
//   location: string;
//   time: string;
//   documents: string[];
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_REQUESTS: VerificationRequest[] = [
//   {
//     id: "V-1024",
//     name: "Ali Khan",
//     type: "Individual Agent",
//     location: "Lahore",
//     time: "2 hours ago",
//     documents: ["CNIC Front", "CNIC Back", "Agent License"],
//   },
//   {
//     id: "V-1025",
//     name: "Zainab Real Estate",
//     type: "Agency",
//     location: "Karachi",
//     time: "5 hours ago",
//     documents: ["NTN Certificate", "Agency Registration", "Owner CNIC"],
//   },
//   {
//     id: "V-1026",
//     name: "Usman Properties",
//     type: "Individual Agent",
//     location: "Islamabad",
//     time: "1 day ago",
//     documents: ["CNIC Front", "CNIC Back"],
//   },
// ];

// const TABS: { key: "all" | "individual" | "agency"; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "individual", label: "Individual Agents" },
//   { key: "agency", label: "Agencies" },
// ];

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AdminVerificationPage() {
//   const [requests, setRequests] = useState(INITIAL_REQUESTS);
//   const [status, setStatus] = useState<Record<string, RequestStatus>>({});
//   const [tab, setTab] = useState<"all" | "individual" | "agency">("all");
//   const [search, setSearch] = useState("");
//   const [reviewOpen, setReviewOpen] = useState<VerificationRequest | null>(
//     null
//   );
//   const [approveOpen, setApproveOpen] = useState<VerificationRequest | null>(
//     null
//   );
//   const [rejectOpen, setRejectOpen] = useState<VerificationRequest | null>(
//     null
//   );
//   const [rejectReason, setRejectReason] = useState("");

//   const filtered = useMemo(() => {
//     return requests.filter((r) => {
//       if (status[r.id] && status[r.id] !== "pending") return false;
//       if (tab === "individual" && r.type !== "Individual Agent") return false;
//       if (tab === "agency" && r.type !== "Agency") return false;
//       if (search) {
//         const q = search.toLowerCase();
//         if (
//           !r.name.toLowerCase().includes(q) &&
//           !r.location.toLowerCase().includes(q) &&
//           !r.id.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [requests, status, tab, search]);

//   const pendingCount = requests.filter(
//     (r) => !status[r.id] || status[r.id] === "pending"
//   ).length;

//   const approve = (req: VerificationRequest) => {
//     setStatus((s) => ({ ...s, [req.id]: "approved" }));
//     setApproveOpen(null);
//   };

//   const reject = (req: VerificationRequest, reason: string) => {
//     if (!reason.trim()) return;
//     setStatus((s) => ({ ...s, [req.id]: "rejected" }));
//     setRejectOpen(null);
//     setRejectReason("");
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
//                 Admin · Verification Desk
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Verification Desk
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Review identity and authority evidence submitted by agents and
//                 agencies. Approve only when documents are clear, valid, and
//                 match the applicant.
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
//             STATS STRIP
//             ========================================= */}
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//           {[
//             {
//               label: "Pending Review",
//               value: pendingCount,
//               tone: "amber" as const,
//               icon: faClock,
//             },
//             {
//               label: "Approved Today",
//               value: 45,
//               tone: "emerald" as const,
//               icon: faCircleCheck,
//             },
//             {
//               label: "Rejected Today",
//               value: 3,
//               tone: "red" as const,
//               icon: faXmark,
//             },
//             {
//               label: "Avg. Review Time",
//               value: "4h 12m",
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
//                     s.tone === "amber"
//                       ? "text-amber-500"
//                       : s.tone === "emerald"
//                       ? "text-emerald-500"
//                       : s.tone === "red"
//                       ? "text-red-500"
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
//             FILTERS
//             ========================================= */}
//         <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
//           <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
//             <div
//               className="flex gap-1 overflow-x-auto"
//               role="tablist"
//               aria-label="Filter requests by type"
//             >
//               {TABS.map((t) => {
//                 const active = tab === t.key;
//                 return (
//                   <button
//                     key={t.key}
//                     role="tab"
//                     aria-selected={active}
//                     onClick={() => setTab(t.key)}
//                     className={`shrink-0 rounded-md px-3.5 py-2 text-sm font-bold transition ${
//                       active
//                         ? "bg-ink text-white"
//                         : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
//                     }`}
//                   >
//                     {t.label}
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="relative w-full sm:w-72">
//               <FontAwesomeIcon
//                 icon={faMagnifyingGlass}
//                 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
//               />
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name, city, or ID..."
//                 className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>

//           {/* =========================================
//               LIST
//               ========================================= */}
//           {filtered.length === 0 ? (
//             <div className="flex flex-col items-center px-6 py-16 text-center">
//               <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                 <FontAwesomeIcon icon={faFileLines} className="h-6 w-6" />
//               </span>
//               <h3 className="mt-4 text-base font-bold text-ink">
//                 {requests.length === 0
//                   ? "No verification requests yet"
//                   : "All caught up"}
//               </h3>
//               <p className="mt-1 max-w-sm text-sm text-neutral-500">
//                 {requests.length === 0
//                   ? "New requests will appear here as agents submit their documents."
//                   : "You've reviewed every pending request. Well done."}
//               </p>
//               {(tab !== "all" || search) && (
//                 <button
//                   onClick={() => {
//                     setTab("all");
//                     setSearch("");
//                   }}
//                   className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                 >
//                   Clear filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <ul className="divide-y divide-neutral-100">
//               {filtered.map((req) => {
//                 const isAgency = req.type === "Agency";
//                 return (
//                   <li key={req.id} className="p-5 sm:p-6">
//                     <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
//                       {/* Left: info */}
//                       <div className="flex min-w-0 flex-1 items-start gap-4">
//                         <span
//                           className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
//                             isAgency
//                               ? "bg-ink text-white"
//                               : "bg-brand-500 text-white"
//                           }`}
//                         >
//                           <FontAwesomeIcon
//                             icon={isAgency ? faBuilding : faUserTie}
//                             className="h-5 w-5"
//                           />
//                         </span>
//                         <div className="min-w-0 flex-1">
//                           <div className="flex flex-wrap items-center gap-2">
//                             <h3 className="text-lg font-black tracking-tight text-ink">
//                               {req.name}
//                             </h3>
//                             <span className="rounded-sm bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-neutral-600">
//                               {req.id}
//                             </span>
//                           </div>

//                           <p className="mt-1 text-sm font-semibold text-neutral-600">
//                             {req.type} · {req.location}
//                           </p>
//                           <p className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-500">
//                             <FontAwesomeIcon
//                               icon={faClock}
//                               className="h-2.5 w-2.5"
//                             />
//                             Submitted {req.time}
//                           </p>

//                           {/* Documents inline */}
//                           <div className="mt-3">
//                             <p className="mb-1.5 text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                               Documents ({req.documents.length})
//                             </p>
//                             <div className="flex flex-wrap gap-1.5">
//                               {req.documents.map((doc) => (
//                                 <span
//                                   key={doc}
//                                   className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-700"
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faFileLines}
//                                     className="h-2.5 w-2.5 text-neutral-400"
//                                   />
//                                   {doc}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right: actions */}
//                       <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch">
//                         <button
//                           type="button"
//                           onClick={() => setReviewOpen(req)}
//                           className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                         >
//                           <FontAwesomeIcon
//                             icon={faEye}
//                             className="h-3.5 w-3.5"
//                           />
//                           Review Docs
//                         </button>
//                         <div className="flex gap-2">
//                           <button
//                             type="button"
//                             onClick={() => setApproveOpen(req)}
//                             className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//                           >
//                             <FontAwesomeIcon
//                               icon={faCheck}
//                               className="h-3.5 w-3.5"
//                             />
//                             Approve
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => setRejectOpen(req)}
//                             className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50"
//                           >
//                             <FontAwesomeIcon
//                               icon={faXmark}
//                               className="h-3.5 w-3.5"
//                             />
//                             Reject
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}

//           {/* Footer summary */}
//           {filtered.length > 0 && (
//             <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:px-5">
//               <p className="text-xs font-medium text-neutral-600">
//                 Showing{" "}
//                 <span className="font-black text-ink">{filtered.length}</span>{" "}
//                 request{filtered.length !== 1 ? "s" : ""}
//                 {search && (
//                   <>
//                     {" "}
//                     matching <span className="font-bold text-ink">"{search}"</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* =========================================
//             GUIDELINES (moved below, not ghost link)
//             ========================================= */}
//         <div className="mt-6 grid gap-4 lg:grid-cols-2">
//           <div className="rounded-xl border border-neutral-200 bg-white p-5">
//             <div className="flex items-start gap-3">
//               <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
//                 <FontAwesomeIcon
//                   icon={faShieldHalved}
//                   className="h-4 w-4"
//                 />
//               </span>
//               <div>
//                 <h3 className="text-sm font-black uppercase tracking-wider text-ink">
//                   Verification Guidelines
//                 </h3>
//                 <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-neutral-600">
//                   <li className="flex items-start gap-2">
//                     <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                     Documents must be clear, uncropped, and readable.
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                     Names on CNIC and NTN must match the applicant.
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                     For agencies, cross-check registration against owner CNIC.
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
//                     Rejections must include a clear, factual reason.
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-xl border border-neutral-200 bg-white p-5">
//             <div className="flex items-start gap-3">
//               <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700">
//                 <FontAwesomeIcon
//                   icon={faCircleExclamation}
//                   className="h-4 w-4"
//                 />
//               </span>
//               <div>
//                 <h3 className="text-sm font-black uppercase tracking-wider text-ink">
//                   Important — No title verification
//                 </h3>
//                 <p className="mt-2 text-sm leading-relaxed text-neutral-600">
//                   Verifying identity and authority is{" "}
//                   <strong className="font-bold text-ink">
//                     not the same as verifying legal title
//                   </strong>
//                   . Never claim a listing is "title verified" based on this
//                   check. Users must independently confirm ownership documents
//                   with a qualified lawyer.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* =========================================
//           REVIEW DOCS MODAL
//           ========================================= */}
//       {reviewOpen && (
//         <Modal
//           onClose={() => setReviewOpen(null)}
//           title={`Review documents — ${reviewOpen.name}`}
//           subtitle={`${reviewOpen.id} · ${reviewOpen.type} · ${reviewOpen.location}`}
//         >
//           <ul className="space-y-2">
//             {reviewOpen.documents.map((doc) => (
//               <li
//                 key={doc}
//                 className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-3"
//               >
//                 <div className="flex items-center gap-2.5">
//                   <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
//                     <FontAwesomeIcon
//                       icon={faFileLines}
//                       className="h-3.5 w-3.5"
//                     />
//                   </span>
//                   <span className="text-sm font-semibold text-ink">{doc}</span>
//                 </div>
//                 <span className="rounded-sm bg-neutral-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-neutral-500">
//                   Preview pending
//                 </span>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-4 flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
//             <FontAwesomeIcon
//               icon={faCircleInfo}
//               className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400"
//             />
//             Document previews will connect here once the file storage system is
//             wired. For now, verify via the applicant's submitted files.
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setReviewOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setApproveOpen(reviewOpen);
//                 setReviewOpen(null);
//               }}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
//               Approve request
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           APPROVE MODAL
//           ========================================= */}
//       {approveOpen && (
//         <Modal
//           onClose={() => setApproveOpen(null)}
//           title="Approve verification request?"
//           subtitle={`${approveOpen.name} · ${approveOpen.id}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             Approving will grant this {approveOpen.type.toLowerCase()} a verified
//             badge on their profile and listings. Confirm that you have reviewed
//             all submitted documents and that the identity matches.
//           </p>

//           <ul className="mt-4 space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
//             {[
//               "All submitted documents are valid and readable",
//               "Name on documents matches the applicant",
//               "For agencies: registration and NTN are genuine",
//               "Nothing appears fraudulent or impersonated",
//             ].map((item) => (
//               <li
//                 key={item}
//                 className="flex items-start gap-2 text-neutral-700"
//               >
//                 <FontAwesomeIcon
//                   icon={faCheck}
//                   className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
//                 />
//                 {item}
//               </li>
//             ))}
//           </ul>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setApproveOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => approve(approveOpen)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
//               Confirm approval
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           REJECT MODAL
//           ========================================= */}
//       {rejectOpen && (
//         <Modal
//           onClose={() => setRejectOpen(null)}
//           title="Reject verification request?"
//           subtitle={`${rejectOpen.name} · ${rejectOpen.id}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             The applicant will see your reason. Rejection is logged and can be
//             appealed per the verification policy.
//           </p>

//           <div className="mt-4">
//             <label
//               htmlFor="reject-reason"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Reason for rejection <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="reject-reason"
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               rows={4}
//               placeholder="e.g. CNIC image is blurry and unreadable. Please re-upload a clear photo of both sides."
//               className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setRejectOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!rejectReason.trim()}
//               onClick={() => reject(rejectOpen, rejectReason)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//               Reject request
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
  faFileLines,
  faCheck,
  faXmark,
  faEye,
  faUserTie,
  faBuilding,
  faArrowRight,
  faMagnifyingGlass,
  faClock,
  faCircleExclamation,
  faCircleCheck,
  faArrowLeft,
  faCircleInfo,
  faShieldHalved,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type RequestType = "Individual Agent" | "Agency";
type RequestStatus = "pending" | "approved" | "rejected";

interface VerificationRequest {
  id: string;
  name: string;
  type: RequestType;
  location: string;
  time: string;
  documents: string[];
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_REQUESTS: VerificationRequest[] = [
  {
    id: "V-1024",
    name: "Ali Khan",
    type: "Individual Agent",
    location: "Lahore",
    time: "2 hours ago",
    documents: ["CNIC Front", "CNIC Back", "Agent License"],
  },
  {
    id: "V-1025",
    name: "Zainab Real Estate",
    type: "Agency",
    location: "Karachi",
    time: "5 hours ago",
    documents: ["NTN Certificate", "Agency Registration", "Owner CNIC"],
  },
  {
    id: "V-1026",
    name: "Usman Properties",
    type: "Individual Agent",
    location: "Islamabad",
    time: "1 day ago",
    documents: ["CNIC Front", "CNIC Back"],
  },
];

const TABS: { key: "all" | "individual" | "agency"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "individual", label: "Individual Agents" },
  { key: "agency", label: "Agencies" },
];

/* ============================================
   PAGE
   ============================================ */

export default function AdminVerificationPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [status, setStatus] = useState<Record<string, RequestStatus>>({});
  const [tab, setTab] = useState<"all" | "individual" | "agency">("all");
  const [search, setSearch] = useState("");
  const [reviewOpen, setReviewOpen] = useState<VerificationRequest | null>(
    null
  );
  const [approveOpen, setApproveOpen] = useState<VerificationRequest | null>(
    null
  );
  const [rejectOpen, setRejectOpen] = useState<VerificationRequest | null>(
    null
  );
  const [rejectReason, setRejectReason] = useState("");

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (status[r.id] && status[r.id] !== "pending") return false;
      if (tab === "individual" && r.type !== "Individual Agent") return false;
      if (tab === "agency" && r.type !== "Agency") return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.name.toLowerCase().includes(q) &&
          !r.location.toLowerCase().includes(q) &&
          !r.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [requests, status, tab, search]);

  const pendingCount = requests.filter(
    (r) => !status[r.id] || status[r.id] === "pending"
  ).length;

  const approve = (req: VerificationRequest) => {
    setStatus((s) => ({ ...s, [req.id]: "approved" }));
    setApproveOpen(null);
  };

  const reject = (req: VerificationRequest, reason: string) => {
    if (!reason.trim()) return;
    setStatus((s) => ({ ...s, [req.id]: "rejected" }));
    setRejectOpen(null);
    setRejectReason("");
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
                Admin · Verification Desk
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Verification Desk
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Review identity and authority evidence submitted by agents and
                agencies. Approve only when documents are clear, valid, and
                match the applicant.
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
            STATS STRIP
            ========================================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Pending Review",
              value: pendingCount,
              tone: "amber" as const,
              icon: faClock,
            },
            {
              label: "Approved Today",
              value: 45,
              tone: "emerald" as const,
              icon: faCircleCheck,
            },
            {
              label: "Rejected Today",
              value: 3,
              tone: "red" as const,
              icon: faXmark,
            },
            {
              label: "Avg. Review Time",
              value: "4h 12m",
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
                    s.tone === "amber"
                      ? "text-amber-500"
                      : s.tone === "emerald"
                      ? "text-emerald-500"
                      : s.tone === "red"
                      ? "text-red-500"
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
            FILTERS
            ========================================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div
              className="flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter requests by type"
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
                placeholder="Search by name, city, or ID..."
                className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          {/* =========================================
              LIST
              ========================================= */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon icon={faFileLines} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">
                {requests.length === 0
                  ? "No verification requests yet"
                  : "All caught up"}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-neutral-500">
                {requests.length === 0
                  ? "New requests will appear here as agents submit their documents."
                  : "You've reviewed every pending request. Well done."}
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
              {filtered.map((req) => {
                const isAgency = req.type === "Agency";
                return (
                  <li key={req.id} className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      {/* Left: info */}
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                            isAgency
                              ? "bg-ink text-white"
                              : "bg-brand-500 text-white"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={isAgency ? faBuilding : faUserTie}
                            className="h-5 w-5"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-black tracking-tight text-ink">
                              {req.name}
                            </h3>
                            <span className="rounded-sm bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-neutral-600">
                              {req.id}
                            </span>
                          </div>

                          <p className="mt-1 text-sm font-semibold text-neutral-600">
                            {req.type} · {req.location}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-500">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-2.5 w-2.5"
                            />
                            Submitted {req.time}
                          </p>

                          {/* Documents inline */}
                          <div className="mt-3">
                            <p className="mb-1.5 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                              Documents ({req.documents.length})
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {req.documents.map((doc) => (
                                <span
                                  key={doc}
                                  className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-700"
                                >
                                  <FontAwesomeIcon
                                    icon={faFileLines}
                                    className="h-2.5 w-2.5 text-neutral-400"
                                  />
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: actions */}
                      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch">
                        <button
                          type="button"
                          onClick={() => setReviewOpen(req)}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="h-3.5 w-3.5"
                          />
                          Review Docs
                        </button>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setApproveOpen(req)}
                            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="h-3.5 w-3.5"
                            />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => setRejectOpen(req)}
                            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="h-3.5 w-3.5"
                            />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Footer summary */}
          {filtered.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:px-5">
              <p className="text-xs font-medium text-neutral-600">
                Showing{" "}
                <span className="font-black text-ink">{filtered.length}</span>{" "}
                request{filtered.length !== 1 ? "s" : ""}
                {search && (
                  <>
                    {" "}
                    matching <span className="font-bold text-ink">"{search}"</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* =========================================
            GUIDELINES (moved below, not ghost link)
            ========================================= */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="h-4 w-4"
                />
              </span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-ink">
                  Verification Guidelines
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    Documents must be clear, uncropped, and readable.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    Names on CNIC and NTN must match the applicant.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    For agencies, cross-check registration against owner CNIC.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    Rejections must include a clear, factual reason.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="h-4 w-4"
                />
              </span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-ink">
                  Important — No title verification
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Verifying identity and authority is{" "}
                  <strong className="font-bold text-ink">
                    not the same as verifying legal title
                  </strong>
                  . Never claim a listing is "title verified" based on this
                  check. Users must independently confirm ownership documents
                  with a qualified lawyer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================
          REVIEW DOCS MODAL
          ========================================= */}
      {reviewOpen && (
        <Modal
          onClose={() => setReviewOpen(null)}
          title={`Review documents — ${reviewOpen.name}`}
          subtitle={`${reviewOpen.id} · ${reviewOpen.type} · ${reviewOpen.location}`}
        >
          <ul className="space-y-2">
            {reviewOpen.documents.map((doc) => (
              <li
                key={doc}
                className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                    <FontAwesomeIcon
                      icon={faFileLines}
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  <span className="text-sm font-semibold text-ink">{doc}</span>
                </div>
                <span className="rounded-sm bg-neutral-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-neutral-500">
                  Preview pending
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400"
            />
            Document previews will connect here once the file storage system is
            wired. For now, verify via the applicant's submitted files.
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setReviewOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setApproveOpen(reviewOpen);
                setReviewOpen(null);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              Approve request
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          APPROVE MODAL
          ========================================= */}
      {approveOpen && (
        <Modal
          onClose={() => setApproveOpen(null)}
          title="Approve verification request?"
          subtitle={`${approveOpen.name} · ${approveOpen.id}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            Approving will grant this {approveOpen.type.toLowerCase()} a verified
            badge on their profile and listings. Confirm that you have reviewed
            all submitted documents and that the identity matches.
          </p>

          <ul className="mt-4 space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
            {[
              "All submitted documents are valid and readable",
              "Name on documents matches the applicant",
              "For agencies: registration and NTN are genuine",
              "Nothing appears fraudulent or impersonated",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-neutral-700"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setApproveOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => approve(approveOpen)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
              Confirm approval
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REJECT MODAL
          ========================================= */}
      {rejectOpen && (
        <Modal
          onClose={() => setRejectOpen(null)}
          title="Reject verification request?"
          subtitle={`${rejectOpen.name} · ${rejectOpen.id}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            The applicant will see your reason. Rejection is logged and can be
            appealed per the verification policy.
          </p>

          <div className="mt-4">
            <label
              htmlFor="reject-reason"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Reason for rejection <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="reject-reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              placeholder="e.g. CNIC image is blurry and unreadable. Please re-upload a clear photo of both sides."
              className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setRejectOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!rejectReason.trim()}
              onClick={() => reject(rejectOpen, rejectReason)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              Reject request
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