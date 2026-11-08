// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faEnvelope,
//   faPaperPlane,
//   faClock,
//   faEllipsisVertical,
//   faCircleCheck,
//   faMagnifyingGlass,
//   faLocationDot,
//   faXmark,
//   faArrowRight,
//   faCircleInfo,
//   faUserTie,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type EnquiryStatus = "Responded" | "Pending";

// interface Message {
//   id: string;
//   from: "buyer" | "agent";
//   text: string;
//   time: string;
// }

// interface Enquiry {
//   id: string;
//   property: string;
//   location: string;
//   price: string;
//   image: string;
//   agent: string;
//   agency: string;
//   date: string;
//   status: EnquiryStatus;
//   messages: Message[];
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_ENQUIRIES: Enquiry[] = [
//   {
//     id: "ENQ-101",
//     property: "Modern 1 Kanal House in DHA Phase 6",
//     location: "Lahore",
//     price: "PKR 8.5 Crore",
//     image: "/images/house-1.jpg",
//     agent: "Ali Khan",
//     agency: "Gulberg Realty",
//     date: "Oct 28, 2026",
//     status: "Responded",
//     messages: [
//       {
//         id: "m1",
//         from: "buyer",
//         text: "Hi, I am interested in this property. Is it still available for a visit this weekend?",
//         time: "Oct 28, 10:15 AM",
//       },
//       {
//         id: "m2",
//         from: "agent",
//         text: "Yes, the property is still available. You can visit anytime this week.",
//         time: "Oct 28, 11:20 AM",
//       },
//     ],
//   },
//   {
//     id: "ENQ-102",
//     property: "Luxury Sea View Apartment",
//     location: "Karachi",
//     price: "PKR 4.2 Crore",
//     image: "/images/flat-3.jpg",
//     agent: "Zainab Real Estate",
//     agency: "Clifton Properties",
//     date: "Oct 26, 2026",
//     status: "Pending",
//     messages: [
//       {
//         id: "m1",
//         from: "buyer",
//         text: "What is the final price? Can we negotiate?",
//         time: "Oct 26, 2:00 PM",
//       },
//     ],
//   },
//   {
//     id: "ENQ-103",
//     property: "10 Marla Residential Plot",
//     location: "Islamabad",
//     price: "PKR 1.9 Crore",
//     image: "/images/plot-1.jpg",
//     agent: "Usman Properties",
//     agency: "Capital Homes",
//     date: "Oct 24, 2026",
//     status: "Responded",
//     messages: [
//       {
//         id: "m1",
//         from: "buyer",
//         text: "Can I schedule a visit this Saturday?",
//         time: "Oct 24, 9:30 AM",
//       },
//       {
//         id: "m2",
//         from: "agent",
//         text: "The plot is available. We can schedule a visit this Saturday at 3 PM.",
//         time: "Oct 24, 10:15 AM",
//       },
//     ],
//   },
// ];

// const TABS: { key: "all" | EnquiryStatus; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "Responded", label: "Responded" },
//   { key: "Pending", label: "Pending" },
// ];

// const statusTone: Record<EnquiryStatus, string> = {
//   Responded: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
//   Pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
// };

// const statusDot: Record<EnquiryStatus, string> = {
//   Responded: "bg-emerald-500",
//   Pending: "bg-amber-500",
// };

// /* ============================================
//    PAGE
//    ============================================ */

// export default function BuyerEnquiriesPage() {
//   const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
//   const [selectedId, setSelectedId] = useState<string>(INITIAL_ENQUIRIES[0].id);
//   const [replyText, setReplyText] = useState("");
//   const [tab, setTab] = useState<"all" | EnquiryStatus>("all");
//   const [search, setSearch] = useState("");
//   const [mobileChatOpen, setMobileChatOpen] = useState(false);
//   const [propertyOpen, setPropertyOpen] = useState<Enquiry | null>(null);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const selectedEnquiry = useMemo(
//     () => enquiries.find((e) => e.id === selectedId) ?? enquiries[0],
//     [enquiries, selectedId]
//   );

//   const filteredEnquiries = useMemo(() => {
//     return enquiries.filter((e) => {
//       if (tab !== "all" && e.status !== tab) return false;
//       if (search) {
//         const q = search.toLowerCase();
//         if (
//           !e.property.toLowerCase().includes(q) &&
//           !e.agent.toLowerCase().includes(q) &&
//           !e.agency.toLowerCase().includes(q) &&
//           !e.id.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [enquiries, tab, search]);

//   const counts = useMemo(
//     () => ({
//       all: enquiries.length,
//       Responded: enquiries.filter((e) => e.status === "Responded").length,
//       Pending: enquiries.filter((e) => e.status === "Pending").length,
//     }),
//     [enquiries]
//   );

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [selectedId, selectedEnquiry.messages.length]);

//   const sendReply = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;
//     setEnquiries((prev) =>
//       prev.map((enq) =>
//         enq.id === selectedEnquiry.id
//           ? {
//               ...enq,
//               messages: [
//                 ...enq.messages,
//                 {
//                   id: `m${Date.now()}`,
//                   from: "buyer",
//                   text: replyText.trim(),
//                   time: "Just now",
//                 },
//               ],
//             }
//           : enq
//       )
//     );
//     setReplyText("");
//   };

//   return (
//     <div className="flex h-[calc(100vh-4rem)] flex-col bg-neutral-50 lg:flex-row">
//       {/* =========================================
//           LEFT — ENQUIRIES LIST
//           ========================================= */}
//       <div
//         className={`flex w-full flex-col border-neutral-200 bg-white lg:w-[420px] lg:shrink-0 lg:border-r ${
//           mobileChatOpen ? "hidden lg:flex" : "flex"
//         }`}
//       >
//         {/* Header */}
//         <div className="border-b border-neutral-100 px-5 py-5">
//           <Link
//             href="/dashboard/buyer"
//             className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
//           >
//             <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
//             Back to Dashboard
//           </Link>
//           <h1 className="mt-3 text-2xl font-black tracking-tight text-ink">
//             My Enquiries
//           </h1>
//           <p className="mt-1 text-sm text-neutral-600">
//             Track your conversations with agents.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
//           {[
//             { label: "Responded", value: counts.Responded },
//             { label: "Pending", value: counts.Pending },
//             { label: "Total", value: counts.all },
//           ].map((s) => (
//             <div key={s.label} className="px-3 py-3 text-center">
//               <p className="text-xl font-black text-ink">{s.value}</p>
//               <p className="mt-0.5 text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                 {s.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Filters */}
//         <div className="border-b border-neutral-100 px-4 py-3">
//           <div className="flex flex-col gap-2">
//             <div
//               className="flex gap-1 overflow-x-auto"
//               role="tablist"
//               aria-label="Filter enquiries"
//             >
//               {TABS.map((t) => {
//                 const active = tab === t.key;
//                 return (
//                   <button
//                     key={t.key}
//                     role="tab"
//                     aria-selected={active}
//                     onClick={() => setTab(t.key)}
//                     className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-bold transition ${
//                       active
//                         ? "bg-ink text-white"
//                         : "text-neutral-600 hover:bg-neutral-100"
//                     }`}
//                   >
//                     {t.label}
//                     <span
//                       className={`rounded-sm px-1 py-0.5 text-[9px] font-black ${
//                         active
//                           ? "bg-white/20 text-white"
//                           : "bg-neutral-100 text-neutral-500"
//                       }`}
//                     >
//                       {counts[t.key]}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="relative">
//               <FontAwesomeIcon
//                 icon={faMagnifyingGlass}
//                 className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400"
//               />
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by property, agent, or ID..."
//                 className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-8 pr-3 text-xs text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Enquiries list */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredEnquiries.length === 0 ? (
//             <div className="flex flex-col items-center px-6 py-12 text-center">
//               <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                 <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
//               </span>
//               <p className="mt-3 text-sm font-bold text-ink">
//                 No enquiries found
//               </p>
//               <p className="mt-1 text-xs text-neutral-500">
//                 Try changing filters or search keyword.
//               </p>
//             </div>
//           ) : (
//             <ul className="divide-y divide-neutral-100">
//               {filteredEnquiries.map((enq) => {
//                 const isSelected = enq.id === selectedEnquiry.id;
//                 return (
//                   <li key={enq.id}>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSelectedId(enq.id);
//                         setMobileChatOpen(true);
//                       }}
//                       aria-current={isSelected ? "true" : undefined}
//                       className={`block w-full border-l-4 px-4 py-3.5 text-left transition ${
//                         isSelected
//                           ? "border-brand-500 bg-brand-50/60"
//                           : "border-transparent hover:bg-neutral-50"
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <div className="h-14 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
//                           <img
//                             src={enq.image}
//                             alt={enq.property}
//                             className="h-full w-full object-cover"
//                             loading="lazy"
//                           />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <div className="flex items-start justify-between gap-2">
//                             <h3 className="line-clamp-1 text-sm font-bold text-ink">
//                               {enq.property}
//                             </h3>
//                           </div>
//                           <p className="mt-0.5 flex items-center gap-1 truncate text-xs font-medium text-neutral-500">
//                             <FontAwesomeIcon
//                               icon={faLocationDot}
//                               className="h-2.5 w-2.5"
//                             />
//                             {enq.location}
//                           </p>
//                           <div className="mt-2 flex items-center justify-between gap-2">
//                             <span
//                               className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
//                                 statusTone[enq.status]
//                               }`}
//                             >
//                               <span
//                                 className={`h-1 w-1 rounded-full ${
//                                   statusDot[enq.status]
//                                 }`}
//                               />
//                               {enq.status}
//                             </span>
//                             <span className="truncate text-[10px] font-semibold text-neutral-400">
//                               {enq.date}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           RIGHT — CHAT
//           ========================================= */}
//       <div
//         className={`flex min-w-0 flex-1 flex-col bg-neutral-50 ${
//           mobileChatOpen ? "flex" : "hidden lg:flex"
//         }`}
//       >
//         {/* Chat header */}
//         <div className="border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex min-w-0 items-start gap-3">
//               {/* Mobile back */}
//               <button
//                 type="button"
//                 onClick={() => setMobileChatOpen(false)}
//                 aria-label="Back to enquiries"
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
//               </button>

//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
//                 <FontAwesomeIcon icon={faUserTie} className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <h2 className="truncate text-base font-black tracking-tight text-ink">
//                   {selectedEnquiry.agent}
//                 </h2>
//                 <p className="mt-0.5 truncate text-xs font-medium text-neutral-600">
//                   {selectedEnquiry.agency}
//                 </p>
//                 <div className="mt-1.5 flex flex-wrap items-center gap-2">
//                   <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-black text-neutral-600">
//                     {selectedEnquiry.id}
//                   </span>
//                   <span
//                     className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
//                       statusTone[selectedEnquiry.status]
//                     }`}
//                   >
//                     <span
//                       className={`h-1 w-1 rounded-full ${
//                         statusDot[selectedEnquiry.status]
//                       }`}
//                     />
//                     {selectedEnquiry.status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => setPropertyOpen(selectedEnquiry)}
//               aria-label="View property details"
//               title="Property details"
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//             >
//               <FontAwesomeIcon
//                 icon={faEllipsisVertical}
//                 className="h-4 w-4"
//               />
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//           <div className="mx-auto max-w-3xl space-y-4">
//             {/* Property card */}
//             <div className="rounded-xl border border-neutral-200 bg-white p-3">
//               <div className="flex items-center gap-3">
//                 <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
//                   <img
//                     src={selectedEnquiry.image}
//                     alt={selectedEnquiry.property}
//                     className="h-full w-full object-cover"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="line-clamp-1 text-sm font-bold text-ink">
//                     {selectedEnquiry.property}
//                   </p>
//                   <p className="mt-0.5 text-sm font-black text-brand-600">
//                     {selectedEnquiry.price}
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => setPropertyOpen(selectedEnquiry)}
//                     className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
//                   >
//                     View property details
//                     <FontAwesomeIcon
//                       icon={faArrowRight}
//                       className="h-2.5 w-2.5"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Messages list */}
//             <ul className="space-y-4">
//               {selectedEnquiry.messages.map((msg) => {
//                 const isBuyer = msg.from === "buyer";
//                 return (
//                   <li
//                     key={msg.id}
//                     className={`flex ${isBuyer ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`max-w-[85%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
//                         isBuyer
//                           ? "rounded-tr-sm bg-ink text-white"
//                           : "rounded-tl-sm border border-neutral-200 bg-white text-ink"
//                       }`}
//                     >
//                       <p className="text-sm leading-relaxed">{msg.text}</p>
//                       <p
//                         className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium ${
//                           isBuyer ? "text-neutral-400" : "text-neutral-500"
//                         }`}
//                       >
//                         <FontAwesomeIcon
//                           icon={faClock}
//                           className="h-2 w-2"
//                         />
//                         {isBuyer ? "You" : selectedEnquiry.agent} ·{" "}
//                         {msg.time}
//                       </p>
//                     </div>
//                   </li>
//                 );
//               })}

//               {/* Pending indicator */}
//               {selectedEnquiry.status === "Pending" && (
//                 <li className="flex justify-start">
//                   <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600">
//                     <FontAwesomeIcon
//                       icon={faClock}
//                       className="h-3 w-3 animate-pulse"
//                     />
//                     Waiting for agent to respond…
//                   </div>
//                 </li>
//               )}
//               <div ref={messagesEndRef} />
//             </ul>
//           </div>
//         </div>

//         {/* Reply */}
//         <div className="border-t border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
//           <form
//             onSubmit={sendReply}
//             className="mx-auto flex max-w-3xl items-center gap-2"
//           >
//             <input
//               type="text"
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//             <button
//               type="submit"
//               disabled={!replyText.trim()}
//               aria-label="Send message"
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
//             </button>
//           </form>
//           <div className="mx-auto mt-2 flex max-w-3xl items-center gap-1.5 text-[11px] text-neutral-500">
//             <FontAwesomeIcon icon={faCircleInfo} className="h-3 w-3" />
//             Responses from agents will appear here in real time.
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           PROPERTY DETAIL MODAL
//           ========================================= */}
//       {propertyOpen && (
//         <Modal
//           onClose={() => setPropertyOpen(null)}
//           title={propertyOpen.property}
//           subtitle={`${propertyOpen.location} · ${propertyOpen.price}`}
//         >
//           <div className="space-y-4">
//             <div className="h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
//               <img
//                 src={propertyOpen.image}
//                 alt={propertyOpen.property}
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <dl className="grid gap-3 sm:grid-cols-2">
//               {[
//                 { label: "Property", value: propertyOpen.property },
//                 { label: "Location", value: propertyOpen.location },
//                 { label: "Price", value: propertyOpen.price },
//                 { label: "Agent", value: propertyOpen.agent },
//                 { label: "Agency", value: propertyOpen.agency },
//                 { label: "Enquiry ID", value: propertyOpen.id },
//               ].map((row) => (
//                 <div key={row.label}>
//                   <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                     {row.label}
//                   </dt>
//                   <dd className="mt-1 truncate text-sm font-bold text-ink">
//                     {row.value}
//                   </dd>
//                 </div>
//               ))}
//             </dl>
//           </div>

//           <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
//             <button
//               type="button"
//               onClick={() => setPropertyOpen(null)}
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

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPaperPlane,
  faClock,
  faEllipsisVertical,
  faCircleCheck,
  faMagnifyingGlass,
  faLocationDot,
  faXmark,
  faArrowRight,
  faCircleInfo,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type EnquiryStatus = "Responded" | "Pending";

interface Message {
  id: string;
  from: "buyer" | "agent";
  text: string;
  time: string;
}

interface Enquiry {
  id: string;
  property: string;
  location: string;
  price: string;
  image: string;
  agent: string;
  agency: string;
  date: string;
  status: EnquiryStatus;
  messages: Message[];
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-101",
    property: "Modern 1 Kanal House in DHA Phase 6",
    location: "Lahore",
    price: "PKR 8.5 Crore",
    image: "/images/house-1.jpg",
    agent: "Ali Khan",
    agency: "Gulberg Realty",
    date: "Oct 28, 2026",
    status: "Responded",
    messages: [
      {
        id: "m1",
        from: "buyer",
        text: "Hi, I am interested in this property. Is it still available for a visit this weekend?",
        time: "Oct 28, 10:15 AM",
      },
      {
        id: "m2",
        from: "agent",
        text: "Yes, the property is still available. You can visit anytime this week.",
        time: "Oct 28, 11:20 AM",
      },
    ],
  },
  {
    id: "ENQ-102",
    property: "Luxury Sea View Apartment",
    location: "Karachi",
    price: "PKR 4.2 Crore",
    image: "/images/flat-3.jpg",
    agent: "Zainab Real Estate",
    agency: "Clifton Properties",
    date: "Oct 26, 2026",
    status: "Pending",
    messages: [
      {
        id: "m1",
        from: "buyer",
        text: "What is the final price? Can we negotiate?",
        time: "Oct 26, 2:00 PM",
      },
    ],
  },
  {
    id: "ENQ-103",
    property: "10 Marla Residential Plot",
    location: "Islamabad",
    price: "PKR 1.9 Crore",
    image: "/images/plot-1.jpg",
    agent: "Usman Properties",
    agency: "Capital Homes",
    date: "Oct 24, 2026",
    status: "Responded",
    messages: [
      {
        id: "m1",
        from: "buyer",
        text: "Can I schedule a visit this Saturday?",
        time: "Oct 24, 9:30 AM",
      },
      {
        id: "m2",
        from: "agent",
        text: "The plot is available. We can schedule a visit this Saturday at 3 PM.",
        time: "Oct 24, 10:15 AM",
      },
    ],
  },
];

const TABS: { key: "all" | EnquiryStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Responded", label: "Responded" },
  { key: "Pending", label: "Pending" },
];

const statusTone: Record<EnquiryStatus, string> = {
  Responded: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
};

const statusDot: Record<EnquiryStatus, string> = {
  Responded: "bg-emerald-500",
  Pending: "bg-amber-500",
};

/* ============================================
   PAGE
   ============================================ */

export default function BuyerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_ENQUIRIES[0].id);
  const [replyText, setReplyText] = useState("");
  const [tab, setTab] = useState<"all" | EnquiryStatus>("all");
  const [search, setSearch] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState<Enquiry | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedEnquiry = useMemo(
    () => enquiries.find((e) => e.id === selectedId) ?? enquiries[0],
    [enquiries, selectedId]
  );

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (tab !== "all" && e.status !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !e.property.toLowerCase().includes(q) &&
          !e.agent.toLowerCase().includes(q) &&
          !e.agency.toLowerCase().includes(q) &&
          !e.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [enquiries, tab, search]);

  const counts = useMemo(
    () => ({
      all: enquiries.length,
      Responded: enquiries.filter((e) => e.status === "Responded").length,
      Pending: enquiries.filter((e) => e.status === "Pending").length,
    }),
    [enquiries]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, selectedEnquiry.messages.length]);

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setEnquiries((prev) =>
      prev.map((enq) =>
        enq.id === selectedEnquiry.id
          ? {
              ...enq,
              messages: [
                ...enq.messages,
                {
                  id: `m${Date.now()}`,
                  from: "buyer",
                  text: replyText.trim(),
                  time: "Just now",
                },
              ],
            }
          : enq
      )
    );
    setReplyText("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-neutral-50 lg:flex-row">
      {/* =========================================
          LEFT — ENQUIRIES LIST
          ========================================= */}
      <div
        className={`flex w-full flex-col border-neutral-200 bg-white lg:w-[420px] lg:shrink-0 lg:border-r ${
          mobileChatOpen ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="border-b border-neutral-100 px-5 py-5">
          <Link
            href="/dashboard/buyer"
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
            Back to Dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-ink">
            My Enquiries
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Track your conversations with agents.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
          {[
            { label: "Responded", value: counts.Responded },
            { label: "Pending", value: counts.Pending },
            { label: "Total", value: counts.all },
          ].map((s) => (
            <div key={s.label} className="px-3 py-3 text-center">
              <p className="text-xl font-black text-ink">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="border-b border-neutral-100 px-4 py-3">
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter enquiries"
            >
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.key)}
                    className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-bold transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`rounded-sm px-1 py-0.5 text-[9px] font-black ${
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

            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by property, agent, or ID..."
                className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-8 pr-3 text-xs text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>
        </div>

        {/* Enquiries list */}
        <div className="flex-1 overflow-y-auto">
          {filteredEnquiries.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">
                No enquiries found
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Try changing filters or search keyword.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {filteredEnquiries.map((enq) => {
                const isSelected = enq.id === selectedEnquiry.id;
                return (
                  <li key={enq.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(enq.id);
                        setMobileChatOpen(true);
                      }}
                      aria-current={isSelected ? "true" : undefined}
                      className={`block w-full border-l-4 px-4 py-3.5 text-left transition ${
                        isSelected
                          ? "border-brand-500 bg-brand-50/60"
                          : "border-transparent hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                          <img
                            src={enq.image}
                            alt={enq.property}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-1 text-sm font-bold text-ink">
                              {enq.property}
                            </h3>
                          </div>
                          <p className="mt-0.5 flex items-center gap-1 truncate text-xs font-medium text-neutral-500">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="h-2.5 w-2.5"
                            />
                            {enq.location}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                                statusTone[enq.status]
                              }`}
                            >
                              <span
                                className={`h-1 w-1 rounded-full ${
                                  statusDot[enq.status]
                                }`}
                              />
                              {enq.status}
                            </span>
                            <span className="truncate text-[10px] font-semibold text-neutral-400">
                              {enq.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* =========================================
          RIGHT — CHAT
          ========================================= */}
      <div
        className={`flex min-w-0 flex-1 flex-col bg-neutral-50 ${
          mobileChatOpen ? "flex" : "hidden lg:flex"
        }`}
      >
        {/* Chat header */}
        <div className="border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              {/* Mobile back */}
              <button
                type="button"
                onClick={() => setMobileChatOpen(false)}
                aria-label="Back to enquiries"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
              </button>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                <FontAwesomeIcon icon={faUserTie} className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-black tracking-tight text-ink">
                  {selectedEnquiry.agent}
                </h2>
                <p className="mt-0.5 truncate text-xs font-medium text-neutral-600">
                  {selectedEnquiry.agency}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-black text-neutral-600">
                    {selectedEnquiry.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                      statusTone[selectedEnquiry.status]
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        statusDot[selectedEnquiry.status]
                      }`}
                    />
                    {selectedEnquiry.status}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPropertyOpen(selectedEnquiry)}
              aria-label="View property details"
              title="Property details"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {/* Property card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={selectedEnquiry.image}
                    alt={selectedEnquiry.property}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-bold text-ink">
                    {selectedEnquiry.property}
                  </p>
                  <p className="mt-0.5 text-sm font-black text-brand-600">
                    {selectedEnquiry.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPropertyOpen(selectedEnquiry)}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    View property details
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-2.5 w-2.5"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages list */}
            <ul className="space-y-4">
              {selectedEnquiry.messages.map((msg) => {
                const isBuyer = msg.from === "buyer";
                return (
                  <li
                    key={msg.id}
                    className={`flex ${isBuyer ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
                        isBuyer
                          ? "rounded-tr-sm bg-ink text-white"
                          : "rounded-tl-sm border border-neutral-200 bg-white text-ink"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium ${
                          isBuyer ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faClock}
                          className="h-2 w-2"
                        />
                        {isBuyer ? "You" : selectedEnquiry.agent} ·{" "}
                        {msg.time}
                      </p>
                    </div>
                  </li>
                );
              })}

              {/* Pending indicator */}
              {selectedEnquiry.status === "Pending" && (
                <li className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="h-3 w-3 animate-pulse"
                    />
                    Waiting for agent to respond…
                  </div>
                </li>
              )}
              <div ref={messagesEndRef} />
            </ul>
          </div>
        </div>

        {/* Reply */}
        <div className="border-t border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <form
            onSubmit={sendReply}
            className="mx-auto flex max-w-3xl items-center gap-2"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
            </button>
          </form>
          <div className="mx-auto mt-2 flex max-w-3xl items-center gap-1.5 text-[11px] text-neutral-500">
            <FontAwesomeIcon icon={faCircleInfo} className="h-3 w-3" />
            Responses from agents will appear here in real time.
          </div>
        </div>
      </div>

      {/* =========================================
          PROPERTY DETAIL MODAL
          ========================================= */}
      {propertyOpen && (
        <Modal
          onClose={() => setPropertyOpen(null)}
          title={propertyOpen.property}
          subtitle={`${propertyOpen.location} · ${propertyOpen.price}`}
        >
          <div className="space-y-4">
            <div className="h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={propertyOpen.image}
                alt={propertyOpen.property}
                className="h-full w-full object-cover"
              />
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Property", value: propertyOpen.property },
                { label: "Location", value: propertyOpen.location },
                { label: "Price", value: propertyOpen.price },
                { label: "Agent", value: propertyOpen.agent },
                { label: "Agency", value: propertyOpen.agency },
                { label: "Enquiry ID", value: propertyOpen.id },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    {row.label}
                  </dt>
                  <dd className="mt-1 truncate text-sm font-bold text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setPropertyOpen(null)}
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