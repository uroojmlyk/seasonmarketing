// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faChartLine,
//   faStar,
//   faCrown,
//   faArrowRight,
//   faCircleCheck,
//   faUserTie,
//   faArrowLeft,
//   faEye,
//   faClock,
//   faPen,
//   faXmark,
//   faSave,
//   faCircleInfo,
//   faTriangleExclamation,
//   faPaperPlane,
//   faBuilding,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type LeadStatus = "New" | "Contacted" | "Visit Scheduled";

// interface Lead {
//   id: number;
//   name: string;
//   property: string;
//   budget: string;
//   time: string;
//   status: LeadStatus;
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_LEADS: Lead[] = [
//   {
//     id: 1,
//     name: "Ahmed R.",
//     property: "Modern 1 Kanal House",
//     budget: "PKR 8-9 Crore",
//     time: "10 mins ago",
//     status: "New",
//   },
//   {
//     id: 2,
//     name: "Sara M.",
//     property: "Luxury Sea View Apartment",
//     budget: "PKR 4-5 Crore",
//     time: "1 hour ago",
//     status: "Contacted",
//   },
//   {
//     id: 3,
//     name: "Bilal K.",
//     property: "Commercial Shop in Gulberg",
//     budget: "PKR 2-3 Crore",
//     time: "3 hours ago",
//     status: "Visit Scheduled",
//   },
// ];

// const statusTone: Record<LeadStatus, string> = {
//   New: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
//   Contacted: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
//   "Visit Scheduled": "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
// };

// const statusDot: Record<LeadStatus, string> = {
//   New: "bg-brand-500",
//   Contacted: "bg-amber-500",
//   "Visit Scheduled": "bg-emerald-500",
// };

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AgentDashboardPage() {
//   const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
//   const [editProfileOpen, setEditProfileOpen] = useState(false);
//   const [billingOpen, setBillingOpen] = useState(false);
//   const [replyTarget, setReplyTarget] = useState<Lead | null>(null);
//   const [replyText, setReplyText] = useState("");

//   const sendReply = () => {
//     if (!replyTarget || !replyText.trim()) return;
//     setLeads((prev) =>
//       prev.map((l) =>
//         l.id === replyTarget.id
//           ? {
//               ...l,
//               status: l.status === "New" ? "Contacted" : l.status,
//             }
//           : l
//       )
//     );
//     setReplyTarget(null);
//     setReplyText("");
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
//                 Agent · Dashboard
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Welcome back, Ali
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Here&apos;s your performance summary and latest enquiries.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => setEditProfileOpen(true)}
//                 className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faUserTie} className="h-4 w-4" />
//                 Edit Profile
//               </button>
//               <Link
//                 href="/dashboard/agent/leads"
//                 className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
//                 Open Lead Inbox
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
//               title: "Total Leads",
//               value: "156",
//               icon: faEnvelope,
//               hint: "All time",
//             },
//             {
//               title: "Active Listings",
//               value: "24",
//               icon: faBuilding,
//               hint: "Live on site",
//             },
//             {
//               title: "Response Rate",
//               value: "98%",
//               icon: faCircleCheck,
//               hint: "Last 30 days",
//             },
//             {
//               title: "Views (30d)",
//               value: "5,420",
//               icon: faEye,
//               hint: "Across all listings",
//             },
//           ].map((stat) => (
//             <div
//               key={stat.title}
//               className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
//             >
//               <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
//                 <FontAwesomeIcon icon={stat.icon} className="h-4 w-4" />
//               </span>
//               <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
//                 {stat.value}
//               </p>
//               <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
//                 {stat.title}
//               </p>
//               <p className="mt-2 border-t border-neutral-100 pt-2 text-[11px] font-medium text-neutral-500">
//                 {stat.hint}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* =========================================
//             MAIN GRID
//             ========================================= */}
//         <div className="mt-6 grid gap-6 lg:grid-cols-3">
//           {/* LEFT — Latest Leads */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               <header className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
//                 <div>
//                   <div className="flex items-baseline gap-2">
//                     <span className="font-mono text-xs font-black text-neutral-400">
//                       01
//                     </span>
//                     <h2 className="text-lg font-black tracking-tight text-ink">
//                       Latest Leads
//                     </h2>
//                   </div>
//                   <p className="mt-1 text-sm text-neutral-600">
//                     Recent enquiries from prospective buyers
//                   </p>
//                 </div>
//                 <Link
//                   href="/dashboard/agent/leads"
//                   className="shrink-0 text-sm font-bold text-brand-600 hover:text-brand-700"
//                 >
//                   View inbox
//                 </Link>
//               </header>

//               {leads.length === 0 ? (
//                 <div className="flex flex-col items-center px-6 py-16 text-center">
//                   <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                     <FontAwesomeIcon
//                       icon={faEnvelope}
//                       className="h-6 w-6"
//                     />
//                   </span>
//                   <h3 className="mt-4 text-base font-bold text-ink">
//                     No leads yet
//                   </h3>
//                   <p className="mt-1 max-w-sm text-sm text-neutral-500">
//                     Leads from your listings will appear here as buyers reach
//                     out.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[600px] text-left">
//                     <thead className="border-b border-neutral-200">
//                       <tr>
//                         <th
//                           scope="col"
//                           className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                         >
//                           Client
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                         >
//                           Property
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
//                         >
//                           Status
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-4 py-3 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
//                         >
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-neutral-100">
//                       {leads.map((lead) => (
//                         <tr
//                           key={lead.id}
//                           className="group transition hover:bg-neutral-50/70"
//                         >
//                           <td className="px-4 py-4">
//                             <p className="text-base font-bold text-ink group-hover:text-brand-600">
//                               {lead.name}
//                             </p>
//                             <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
//                               <FontAwesomeIcon
//                                 icon={faClock}
//                                 className="h-2.5 w-2.5"
//                               />
//                               {lead.time}
//                             </p>
//                           </td>
//                           <td className="px-4 py-4">
//                             <p className="text-sm font-semibold text-ink">
//                               {lead.property}
//                             </p>
//                             <p className="mt-0.5 text-xs text-neutral-500">
//                               Budget: {lead.budget}
//                             </p>
//                           </td>
//                           <td className="px-4 py-4">
//                             <span
//                               className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
//                                 statusTone[lead.status]
//                               }`}
//                             >
//                               <span
//                                 className={`h-1.5 w-1.5 rounded-full ${
//                                   statusDot[lead.status]
//                                 }`}
//                               />
//                               {lead.status}
//                             </span>
//                           </td>
//                           <td className="px-4 py-4 text-right">
//                             <button
//                               type="button"
//                               onClick={() => setReplyTarget(lead)}
//                               className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
//                             >
//                               Reply
//                               <FontAwesomeIcon
//                                 icon={faArrowRight}
//                                 className="h-2.5 w-2.5"
//                               />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT — Subscription + Tips */}
//           <aside className="space-y-4">
//             {/* Subscription — BLACK anchor */}
//             <div className="overflow-hidden rounded-xl bg-ink">
//               <div className="p-5">
//                 <div className="flex items-start justify-between">
//                   <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-400">
//                     <FontAwesomeIcon icon={faCrown} className="h-4 w-4" />
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-400">
//                     <span className="h-1 w-1 rounded-full bg-emerald-400" />
//                     Active
//                   </span>
//                 </div>
//                 <h3 className="mt-3 text-lg font-black tracking-tight text-white">
//                   Pro Agency Plan
//                 </h3>
//                 <p className="mt-1 text-sm text-neutral-400">
//                   Renews on Nov 15, 2026
//                 </p>

//                 <div className="mt-4 border-t border-white/10 pt-4">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="font-medium text-neutral-400">
//                       Listing limit
//                     </span>
//                     <span className="font-black text-white">24 / 50</span>
//                   </div>
//                   <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
//                     <div className="h-full w-[48%] rounded-full bg-brand-500" />
//                   </div>
//                   <p className="mt-2 text-[11px] text-neutral-500">
//                     26 listings remaining
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => setBillingOpen(true)}
//                   className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
//                 >
//                   Manage Subscription
//                 </button>
//               </div>
//             </div>

//             {/* Pro tip — quiet info card */}
//             <div className="rounded-xl border border-neutral-200 bg-white p-5">
//               <div className="flex items-start gap-3">
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
//                   <FontAwesomeIcon
//                     icon={faCircleInfo}
//                     className="h-4 w-4"
//                   />
//                 </span>
//                 <div>
//                   <h3 className="text-sm font-black uppercase tracking-wider text-ink">
//                     Pro Tip
//                   </h3>
//                   <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
//                     Agents who reply to leads within 15 minutes are 3× more
//                     likely to close a deal. Keep your response rate high.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Account health */}
//             <div className="rounded-xl border border-neutral-200 bg-white p-5">
//               <div className="flex items-start gap-3">
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
//                   <FontAwesomeIcon
//                     icon={faCircleCheck}
//                     className="h-4 w-4"
//                   />
//                 </span>
//                 <div>
//                   <h3 className="text-sm font-black uppercase tracking-wider text-ink">
//                     Account Health
//                   </h3>
//                   <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
//                     Your profile is verified and in good standing. Response
//                     rate is above the platform average.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* =========================================
//           EDIT PROFILE MODAL
//           ========================================= */}
//       {editProfileOpen && (
//         <Modal
//           onClose={() => setEditProfileOpen(false)}
//           title="Edit profile"
//           subtitle="Update your public agent profile"
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Full name
//               </label>
//               <input
//                 type="text"
//                 defaultValue="Ali Khan"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 defaultValue="+92 300 1234567"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Service areas
//               </label>
//               <input
//                 type="text"
//                 defaultValue="DHA Lahore, Gulberg, Bahria Town"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Short bio
//               </label>
//               <textarea
//                 rows={3}
//                 defaultValue="Senior agent with 8+ years in DHA Lahore. Specialist in residential sales."
//                 className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setEditProfileOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditProfileOpen(false)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
//               Save changes
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           BILLING MODAL
//           ========================================= */}
//       {billingOpen && (
//         <Modal
//           onClose={() => setBillingOpen(false)}
//           title="Subscription details"
//           subtitle="Pro Agency Plan · Active"
//         >
//           <div className="space-y-4">
//             <dl className="grid gap-3 sm:grid-cols-2">
//               {[
//                 { label: "Plan", value: "Pro Agency" },
//                 { label: "Price", value: "PKR 45,000/mo" },
//                 { label: "Status", value: "Active" },
//                 { label: "Renews on", value: "Nov 15, 2026" },
//                 { label: "Listing limit", value: "24 / 50" },
//                 { label: "Team seats", value: "3 / 5" },
//               ].map((row) => (
//                 <div key={row.label}>
//                   <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                     {row.label}
//                   </dt>
//                   <dd className="mt-1 text-sm font-bold text-ink">
//                     {row.value}
//                   </dd>
//                 </div>
//               ))}
//             </dl>

//             <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
//               <p className="text-xs leading-relaxed text-neutral-600">
//                 Subscription features include priority support, advanced
//                 analytics, and up to 50 active listings. Upgrades take effect
//                 immediately; downgrades apply at next renewal.
//               </p>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setBillingOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               onClick={() => setBillingOpen(false)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faCrown} className="h-3.5 w-3.5" />
//               Upgrade plan
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           REPLY MODAL
//           ========================================= */}
//       {replyTarget && (
//         <Modal
//           onClose={() => {
//             setReplyTarget(null);
//             setReplyText("");
//           }}
//           title={`Reply to ${replyTarget.name}`}
//           subtitle={replyTarget.property}
//         >
//           <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
//             <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//               Client enquiry
//             </p>
//             <p className="mt-1 text-sm leading-relaxed text-neutral-700">
//               Budget: {replyTarget.budget} · Received {replyTarget.time}
//             </p>
//           </div>

//           <div className="mt-4">
//             <label
//               htmlFor="reply-text"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Your reply <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="reply-text"
//               rows={4}
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//               placeholder="Type your response to the client..."
//               className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => {
//                 setReplyTarget(null);
//                 setReplyText("");
//               }}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!replyText.trim()}
//               onClick={sendReply}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
//               Send reply
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




"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faChartLine,
  faStar,
  faCrown,
  faArrowRight,
  faCircleCheck,
  faUserTie,
  faArrowLeft,
  faEye,
  faClock,
  faPen,
  faXmark,
  faSave,
  faCircleInfo,
  faTriangleExclamation,
  faPaperPlane,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type LeadStatus = "New" | "Contacted" | "Visit Scheduled";

interface Lead {
  id: number;
  name: string;
  property: string;
  budget: string;
  time: string;
  status: LeadStatus;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    name: "Ahmed R.",
    property: "Modern 1 Kanal House",
    budget: "PKR 8-9 Crore",
    time: "10 mins ago",
    status: "New",
  },
  {
    id: 2,
    name: "Sara M.",
    property: "Luxury Sea View Apartment",
    budget: "PKR 4-5 Crore",
    time: "1 hour ago",
    status: "Contacted",
  },
  {
    id: 3,
    name: "Bilal K.",
    property: "Commercial Shop in Gulberg",
    budget: "PKR 2-3 Crore",
    time: "3 hours ago",
    status: "Visit Scheduled",
  },
];

const statusTone: Record<LeadStatus, string> = {
  New: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
  Contacted: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  "Visit Scheduled": "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
};

const statusDot: Record<LeadStatus, string> = {
  New: "bg-brand-500",
  Contacted: "bg-amber-500",
  "Visit Scheduled": "bg-emerald-500",
};

/* ============================================
   PAGE
   ============================================ */

export default function AgentDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [replyTarget, setReplyTarget] = useState<Lead | null>(null);
  const [replyText, setReplyText] = useState("");

  const sendReply = () => {
    if (!replyTarget || !replyText.trim()) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === replyTarget.id
          ? {
              ...l,
              status: l.status === "New" ? "Contacted" : l.status,
            }
          : l
      )
    );
    setReplyTarget(null);
    setReplyText("");
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
                Agent · Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Welcome back, Ali
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Here&apos;s your performance summary and latest enquiries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setEditProfileOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faUserTie} className="h-4 w-4" />
                Edit Profile
              </button>
              <Link
                href="/dashboard/agent/leads"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                Open Lead Inbox
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
              title: "Total Leads",
              value: "156",
              icon: faEnvelope,
              hint: "All time",
            },
            {
              title: "Active Listings",
              value: "24",
              icon: faBuilding,
              hint: "Live on site",
            },
            {
              title: "Response Rate",
              value: "98%",
              icon: faCircleCheck,
              hint: "Last 30 days",
            },
            {
              title: "Views (30d)",
              value: "5,420",
              icon: faEye,
              hint: "Across all listings",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                <FontAwesomeIcon icon={stat.icon} className="h-4 w-4" />
              </span>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                {stat.title}
              </p>
              <p className="mt-2 border-t border-neutral-100 pt-2 text-[11px] font-medium text-neutral-500">
                {stat.hint}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            MAIN GRID
            ========================================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT — Latest Leads */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <header className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-black text-neutral-400">
                      01
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      Latest Leads
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Recent enquiries from prospective buyers
                  </p>
                </div>
                <Link
                  href="/dashboard/agent/leads"
                  className="shrink-0 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  View inbox
                </Link>
              </header>

              {leads.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-6 w-6"
                    />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    No leads yet
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-neutral-500">
                    Leads from your listings will appear here as buyers reach
                    out.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full md:min-w-[600px] text-left max-md:block max-md:[&_thead]:hidden max-md:[&_tbody]:block max-md:[&_tr]:block max-md:[&_tr]:p-4 max-md:[&_td]:flex max-md:[&_td]:items-center max-md:[&_td]:justify-between max-md:[&_td]:gap-4 max-md:[&_td]:px-0 max-md:[&_td]:py-1.5 max-md:[&_td]:text-right max-md:[&_td:first-child]:justify-start max-md:[&_td:first-child]:text-left max-md:[&_td]:before:content-[attr(data-label)] max-md:[&_td]:before:shrink-0 max-md:[&_td]:before:text-[11px] max-md:[&_td[colspan]]:justify-center max-md:[&_td[colspan]]:text-center max-md:[&_td[colspan]]:before:hidden max-md:[&_td]:before:font-bold max-md:[&_td]:before:uppercase max-md:[&_td]:before:tracking-wider max-md:[&_td]:before:text-neutral-400">
                    <thead className="border-b border-neutral-200">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                        >
                          Client
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-500"
                        >
                          Property
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
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="group transition hover:bg-neutral-50/70"
                        >
                          <td className="px-4 py-4">
                            <p className="text-base font-bold text-ink group-hover:text-brand-600">
                              {lead.name}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="h-2.5 w-2.5"
                              />
                              {lead.time}
                            </p>
                          </td>
                          <td data-label="Property" className="px-4 py-4">
                            <p className="text-sm font-semibold text-ink">
                              {lead.property}
                            </p>
                            <p className="mt-0.5 text-xs text-neutral-500">
                              Budget: {lead.budget}
                            </p>
                          </td>
                          <td data-label="Status" className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                                statusTone[lead.status]
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  statusDot[lead.status]
                                }`}
                              />
                              {lead.status}
                            </span>
                          </td>
                          <td data-label="Action" className="px-4 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => setReplyTarget(lead)}
                              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
                            >
                              Reply
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="h-2.5 w-2.5"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Subscription + Tips */}
          <aside className="space-y-4">
            {/* Subscription — BLACK anchor */}
            <div className="overflow-hidden rounded-xl bg-ink">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-400">
                    <FontAwesomeIcon icon={faCrown} className="h-4 w-4" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-400">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black tracking-tight text-white">
                  Pro Agency Plan
                </h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Renews on Nov 15, 2026
                </p>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-400">
                      Listing limit
                    </span>
                    <span className="font-black text-white">24 / 50</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[48%] rounded-full bg-brand-500" />
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-500">
                    26 listings remaining
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setBillingOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Pro tip — quiet info card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="h-4 w-4"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-ink">
                    Pro Tip
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    Agents who reply to leads within 15 minutes are 3× more
                    likely to close a deal. Keep your response rate high.
                  </p>
                </div>
              </div>
            </div>

            {/* Account health */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="h-4 w-4"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-ink">
                    Account Health
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    Your profile is verified and in good standing. Response
                    rate is above the platform average.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================
          EDIT PROFILE MODAL
          ========================================= */}
      {editProfileOpen && (
        <Modal
          onClose={() => setEditProfileOpen(false)}
          title="Edit profile"
          subtitle="Update your public agent profile"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Full name
              </label>
              <input
                type="text"
                defaultValue="Ali Khan"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+92 300 1234567"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Service areas
              </label>
              <input
                type="text"
                defaultValue="DHA Lahore, Gulberg, Bahria Town"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Short bio
              </label>
              <textarea
                rows={3}
                defaultValue="Senior agent with 8+ years in DHA Lahore. Specialist in residential sales."
                className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
              Save changes
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          BILLING MODAL
          ========================================= */}
      {billingOpen && (
        <Modal
          onClose={() => setBillingOpen(false)}
          title="Subscription details"
          subtitle="Pro Agency Plan · Active"
        >
          <div className="space-y-4">
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Plan", value: "Pro Agency" },
                { label: "Price", value: "PKR 45,000/mo" },
                { label: "Status", value: "Active" },
                { label: "Renews on", value: "Nov 15, 2026" },
                { label: "Listing limit", value: "24 / 50" },
                { label: "Team seats", value: "3 / 5" },
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

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-xs leading-relaxed text-neutral-600">
                Subscription features include priority support, advanced
                analytics, and up to 50 active listings. Upgrades take effect
                immediately; downgrades apply at next renewal.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setBillingOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setBillingOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCrown} className="h-3.5 w-3.5" />
              Upgrade plan
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REPLY MODAL
          ========================================= */}
      {replyTarget && (
        <Modal
          onClose={() => {
            setReplyTarget(null);
            setReplyText("");
          }}
          title={`Reply to ${replyTarget.name}`}
          subtitle={replyTarget.property}
        >
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
              Client enquiry
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-700">
              Budget: {replyTarget.budget} · Received {replyTarget.time}
            </p>
          </div>

          <div className="mt-4">
            <label
              htmlFor="reply-text"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Your reply <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="reply-text"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to the client..."
              className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setReplyTarget(null);
                setReplyText("");
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!replyText.trim()}
              onClick={sendReply}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
              Send reply
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