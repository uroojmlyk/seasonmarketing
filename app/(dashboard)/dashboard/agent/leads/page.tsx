// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faEnvelope,
//   faPhone,
//   faPaperPlane,
//   faClock,
//   faCircleCheck,
//   faMagnifyingGlass,
//   faLocationDot,
//   faXmark,
//   faArrowRight,
//   faCircleInfo,
//   faChevronDown,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type LeadStatus = "New" | "Contacted" | "Visit Scheduled" | "Closed";

// interface Message {
//   id: string;
//   from: "lead" | "agent";
//   text: string;
//   time: string;
// }

// interface Lead {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   property: string;
//   location: string;
//   image: string;
//   date: string;
//   status: LeadStatus;
//   messages: Message[];
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_LEADS: Lead[] = [
//   {
//     id: "LD-501",
//     name: "Ahmed Raza",
//     phone: "+92 300 1234567",
//     email: "ahmed@example.com",
//     property: "Modern 1 Kanal House in DHA",
//     location: "Lahore",
//     image: "/images/house-1.jpg",
//     date: "10 mins ago",
//     status: "New",
//     messages: [
//       {
//         id: "m1",
//         from: "lead",
//         text: "I'm interested in this property. What's the current price and is it negotiable?",
//         time: "10 mins ago",
//       },
//     ],
//   },
//   {
//     id: "LD-502",
//     name: "Sara Malik",
//     phone: "+92 321 9876543",
//     email: "sara@example.com",
//     property: "Luxury Sea View Apartment",
//     location: "Karachi",
//     image: "/images/flat-3.jpg",
//     date: "2 hours ago",
//     status: "Contacted",
//     messages: [
//       {
//         id: "m1",
//         from: "lead",
//         text: "Please share the floor plan. I'd like to visit this Saturday.",
//         time: "2 hours ago",
//       },
//       {
//         id: "m2",
//         from: "agent",
//         text: "Hi Sara, thanks for your interest. I'll share the floor plan shortly and confirm a Saturday visit.",
//         time: "1 hour ago",
//       },
//     ],
//   },
//   {
//     id: "LD-503",
//     name: "Bilal Khan",
//     phone: "+92 333 5555555",
//     email: "bilal@example.com",
//     property: "Commercial Shop in Gulberg",
//     location: "Lahore",
//     image: "/images/shop-1.jpg",
//     date: "1 day ago",
//     status: "Visit Scheduled",
//     messages: [
//       {
//         id: "m1",
//         from: "lead",
//         text: "Is the shop still available? Can I visit this week?",
//         time: "1 day ago",
//       },
//       {
//         id: "m2",
//         from: "agent",
//         text: "Yes, available. How about tomorrow at 3 PM?",
//         time: "20 hours ago",
//       },
//       {
//         id: "m3",
//         from: "lead",
//         text: "Confirmed for tomorrow at 3 PM. See you there.",
//         time: "18 hours ago",
//       },
//     ],
//   },
//   {
//     id: "LD-504",
//     name: "Zainab Hussain",
//     phone: "+92 345 6789012",
//     email: "zainab@example.com",
//     property: "10 Marla Residential Plot",
//     location: "Islamabad",
//     image: "/images/plot-1.jpg",
//     date: "3 days ago",
//     status: "Closed",
//     messages: [
//       {
//         id: "m1",
//         from: "lead",
//         text: "Is the price negotiable?",
//         time: "3 days ago",
//       },
//       {
//         id: "m2",
//         from: "agent",
//         text: "Slight margin available. Let's discuss when you visit.",
//         time: "2 days ago",
//       },
//       {
//         id: "m3",
//         from: "lead",
//         text: "Deal closed. Thanks for your help.",
//         time: "1 day ago",
//       },
//     ],
//   },
// ];

// const STATUSES: LeadStatus[] = [
//   "New",
//   "Contacted",
//   "Visit Scheduled",
//   "Closed",
// ];

// const TABS: { key: "all" | LeadStatus; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "New", label: "New" },
//   { key: "Contacted", label: "Contacted" },
//   { key: "Visit Scheduled", label: "Visit" },
//   { key: "Closed", label: "Closed" },
// ];

// const statusTone: Record<LeadStatus, string> = {
//   New: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
//   Contacted: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
//   "Visit Scheduled": "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
//   Closed: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
// };

// const statusDot: Record<LeadStatus, string> = {
//   New: "bg-brand-500",
//   Contacted: "bg-amber-500",
//   "Visit Scheduled": "bg-emerald-500",
//   Closed: "bg-neutral-400",
// };

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AgentLeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
//   const [selectedId, setSelectedId] = useState<string>(INITIAL_LEADS[0].id);
//   const [replyText, setReplyText] = useState("");
//   const [tab, setTab] = useState<"all" | LeadStatus>("all");
//   const [search, setSearch] = useState("");
//   const [mobileChatOpen, setMobileChatOpen] = useState(false);
//   const [statusMenuOpen, setStatusMenuOpen] = useState(false);
//   const [propertyOpen, setPropertyOpen] = useState<Lead | null>(null);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const selectedLead = useMemo(
//     () => leads.find((l) => l.id === selectedId) ?? leads[0],
//     [leads, selectedId]
//   );

//   const filteredLeads = useMemo(() => {
//     return leads.filter((l) => {
//       if (tab !== "all" && l.status !== tab) return false;
//       if (search) {
//         const q = search.toLowerCase();
//         if (
//           !l.name.toLowerCase().includes(q) &&
//           !l.property.toLowerCase().includes(q) &&
//           !l.phone.includes(q) &&
//           !l.id.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [leads, tab, search]);

//   const counts = useMemo(
//     () => ({
//       all: leads.length,
//       New: leads.filter((l) => l.status === "New").length,
//       Contacted: leads.filter((l) => l.status === "Contacted").length,
//       "Visit Scheduled": leads.filter((l) => l.status === "Visit Scheduled")
//         .length,
//       Closed: leads.filter((l) => l.status === "Closed").length,
//     }),
//     [leads]
//   );

//   // Auto-scroll chat to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [selectedId, selectedLead.messages.length]);

//   const sendReply = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;
//     setLeads((prev) =>
//       prev.map((l) =>
//         l.id === selectedLead.id
//           ? {
//               ...l,
//               messages: [
//                 ...l.messages,
//                 {
//                   id: `m${Date.now()}`,
//                   from: "agent",
//                   text: replyText.trim(),
//                   time: "Just now",
//                 },
//               ],
//               status:
//                 l.status === "New" ? ("Contacted" as LeadStatus) : l.status,
//             }
//           : l
//       )
//     );
//     setReplyText("");
//   };

//   const changeStatus = (status: LeadStatus) => {
//     setLeads((prev) =>
//       prev.map((l) => (l.id === selectedLead.id ? { ...l, status } : l))
//     );
//     setStatusMenuOpen(false);
//   };

//   return (
//     <div className="flex h-[calc(100vh-4rem)] flex-col bg-neutral-50 lg:flex-row">
//       {/* =========================================
//           LEFT — LEADS LIST
//           ========================================= */}
//       <div
//         className={`flex w-full flex-col border-neutral-200 bg-white lg:w-[420px] lg:shrink-0 lg:border-r ${
//           mobileChatOpen ? "hidden lg:flex" : "flex"
//         }`}
//       >
//         {/* Header */}
//         <div className="border-b border-neutral-100 px-5 py-5">
//           <Link
//             href="/dashboard/agent"
//             className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
//           >
//             <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
//             Back to Dashboard
//           </Link>
//           <h1 className="mt-3 text-2xl font-black tracking-tight text-ink">
//             Lead Inbox
//           </h1>
//           <p className="mt-1 text-sm text-neutral-600">
//             Manage enquiries for your listed properties.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
//           {[
//             { label: "New", value: counts.New },
//             { label: "Contacted", value: counts.Contacted },
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
//               aria-label="Filter leads"
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
//                 placeholder="Search by name, property, or ID..."
//                 className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-8 pr-3 text-xs text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Leads list */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredLeads.length === 0 ? (
//             <div className="flex flex-col items-center px-6 py-12 text-center">
//               <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                 <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
//               </span>
//               <p className="mt-3 text-sm font-bold text-ink">No leads found</p>
//               <p className="mt-1 text-xs text-neutral-500">
//                 Try changing filters or search keyword.
//               </p>
//             </div>
//           ) : (
//             <ul className="divide-y divide-neutral-100">
//               {filteredLeads.map((lead) => {
//                 const isSelected = lead.id === selectedLead.id;
//                 return (
//                   <li key={lead.id}>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSelectedId(lead.id);
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
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
//                           {lead.name.charAt(0)}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <div className="flex items-start justify-between gap-2">
//                             <h3 className="truncate text-sm font-bold text-ink">
//                               {lead.name}
//                             </h3>
//                             <span className="shrink-0 text-[10px] font-medium text-neutral-400">
//                               {lead.date}
//                             </span>
//                           </div>
//                           <p className="mt-0.5 line-clamp-1 text-xs font-medium text-neutral-600">
//                             Re: {lead.property}
//                           </p>
//                           <div className="mt-2 flex items-center justify-between gap-2">
//                             <span
//                               className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
//                                 statusTone[lead.status]
//                               }`}
//                             >
//                               <span
//                                 className={`h-1 w-1 rounded-full ${
//                                   statusDot[lead.status]
//                                 }`}
//                               />
//                               {lead.status}
//                             </span>
//                             <span className="truncate text-[10px] font-semibold text-neutral-400">
//                               {lead.id}
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
//                 aria-label="Back to leads"
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
//               </button>

//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
//                 {selectedLead.name.charAt(0)}
//               </div>

//               <div className="min-w-0">
//                 <h2 className="truncate text-base font-black tracking-tight text-ink">
//                   {selectedLead.name}
//                 </h2>
//                 <p className="mt-0.5 truncate text-xs font-medium text-neutral-600">
//                   {selectedLead.phone} · {selectedLead.email}
//                 </p>
//                 <div className="mt-1.5 flex flex-wrap items-center gap-2">
//                   <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-black text-neutral-600">
//                     {selectedLead.id}
//                   </span>
//                   <span
//                     className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
//                       statusTone[selectedLead.status]
//                     }`}
//                   >
//                     <span
//                       className={`h-1 w-1 rounded-full ${
//                         statusDot[selectedLead.status]
//                       }`}
//                     />
//                     {selectedLead.status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex shrink-0 items-center gap-1.5">
//               <a
//                 href={`tel:${selectedLead.phone}`}
//                 aria-label="Call lead"
//                 title="Call"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
//               >
//                 <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
//               </a>
//               <a
//                 href={`mailto:${selectedLead.email}`}
//                 aria-label="Email lead"
//                 title="Email"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//               >
//                 <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
//               </a>

//               {/* Status dropdown */}
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setStatusMenuOpen((v) => !v)}
//                   aria-expanded={statusMenuOpen}
//                   className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-2.5 text-xs font-bold text-ink transition hover:bg-neutral-50"
//                 >
//                   Status
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`h-2.5 w-2.5 transition ${
//                       statusMenuOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 {statusMenuOpen && (
//                   <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
//                     {STATUSES.map((s) => {
//                       const active = s === selectedLead.status;
//                       return (
//                         <button
//                           key={s}
//                           onClick={() => changeStatus(s)}
//                           className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
//                             active
//                               ? "bg-brand-50 font-bold text-brand-700"
//                               : "text-neutral-700 hover:bg-neutral-50"
//                           }`}
//                         >
//                           <span className="flex items-center gap-1.5">
//                             <span
//                               className={`h-1.5 w-1.5 rounded-full ${
//                                 statusDot[s]
//                               }`}
//                             />
//                             {s}
//                           </span>
//                           {active && (
//                             <FontAwesomeIcon
//                               icon={faCircleCheck}
//                               className="h-3 w-3"
//                             />
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
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
//                     src={selectedLead.image}
//                     alt={selectedLead.property}
//                     className="h-full w-full object-cover"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="line-clamp-1 text-sm font-bold text-ink">
//                     {selectedLead.property}
//                   </p>
//                   <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
//                     <FontAwesomeIcon
//                       icon={faLocationDot}
//                       className="h-2.5 w-2.5"
//                     />
//                     {selectedLead.location}
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => setPropertyOpen(selectedLead)}
//                     className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
//                   >
//                     Preview property
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
//               {selectedLead.messages.map((msg) => {
//                 const isAgent = msg.from === "agent";
//                 return (
//                   <li
//                     key={msg.id}
//                     className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`max-w-[85%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
//                         isAgent
//                           ? "rounded-tr-sm bg-ink text-white"
//                           : "rounded-tl-sm border border-neutral-200 bg-white text-ink"
//                       }`}
//                     >
//                       <p className="text-sm leading-relaxed">{msg.text}</p>
//                       <p
//                         className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium ${
//                           isAgent ? "text-neutral-400" : "text-neutral-500"
//                         }`}
//                       >
//                         <FontAwesomeIcon
//                           icon={faClock}
//                           className="h-2 w-2"
//                         />
//                         {isAgent ? "You" : selectedLead.name} · {msg.time}
//                       </p>
//                     </div>
//                   </li>
//                 );
//               })}
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
//               placeholder="Type your reply..."
//               className="flex-1 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//             <button
//               type="submit"
//               disabled={!replyText.trim()}
//               aria-label="Send reply"
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
//             </button>
//           </form>
//           <div className="mx-auto mt-2 flex max-w-3xl items-center gap-1.5 text-[11px] text-neutral-500">
//             <FontAwesomeIcon icon={faCircleInfo} className="h-3 w-3" />
//             Responding within 15 minutes boosts your chance of closing a deal.
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           PROPERTY PREVIEW MODAL
//           ========================================= */}
//       {propertyOpen && (
//         <Modal
//           onClose={() => setPropertyOpen(null)}
//           title={propertyOpen.property}
//           subtitle={`${propertyOpen.location} · ${propertyOpen.id}`}
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
//                 { label: "Client", value: propertyOpen.name },
//                 { label: "Phone", value: propertyOpen.phone },
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
  faPhone,
  faPaperPlane,
  faClock,
  faCircleCheck,
  faMagnifyingGlass,
  faLocationDot,
  faXmark,
  faArrowRight,
  faCircleInfo,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type LeadStatus = "New" | "Contacted" | "Visit Scheduled" | "Closed";

interface Message {
  id: string;
  from: "lead" | "agent";
  text: string;
  time: string;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  location: string;
  image: string;
  date: string;
  status: LeadStatus;
  messages: Message[];
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_LEADS: Lead[] = [
  {
    id: "LD-501",
    name: "Ahmed Raza",
    phone: "+92 300 1234567",
    email: "ahmed@example.com",
    property: "Modern 1 Kanal House in DHA",
    location: "Lahore",
    image: "/images/house-1.jpg",
    date: "10 mins ago",
    status: "New",
    messages: [
      {
        id: "m1",
        from: "lead",
        text: "I'm interested in this property. What's the current price and is it negotiable?",
        time: "10 mins ago",
      },
    ],
  },
  {
    id: "LD-502",
    name: "Sara Malik",
    phone: "+92 321 9876543",
    email: "sara@example.com",
    property: "Luxury Sea View Apartment",
    location: "Karachi",
    image: "/images/flat-3.jpg",
    date: "2 hours ago",
    status: "Contacted",
    messages: [
      {
        id: "m1",
        from: "lead",
        text: "Please share the floor plan. I'd like to visit this Saturday.",
        time: "2 hours ago",
      },
      {
        id: "m2",
        from: "agent",
        text: "Hi Sara, thanks for your interest. I'll share the floor plan shortly and confirm a Saturday visit.",
        time: "1 hour ago",
      },
    ],
  },
  {
    id: "LD-503",
    name: "Bilal Khan",
    phone: "+92 333 5555555",
    email: "bilal@example.com",
    property: "Commercial Shop in Gulberg",
    location: "Lahore",
    image: "/images/shop-1.jpg",
    date: "1 day ago",
    status: "Visit Scheduled",
    messages: [
      {
        id: "m1",
        from: "lead",
        text: "Is the shop still available? Can I visit this week?",
        time: "1 day ago",
      },
      {
        id: "m2",
        from: "agent",
        text: "Yes, available. How about tomorrow at 3 PM?",
        time: "20 hours ago",
      },
      {
        id: "m3",
        from: "lead",
        text: "Confirmed for tomorrow at 3 PM. See you there.",
        time: "18 hours ago",
      },
    ],
  },
  {
    id: "LD-504",
    name: "Zainab Hussain",
    phone: "+92 345 6789012",
    email: "zainab@example.com",
    property: "10 Marla Residential Plot",
    location: "Islamabad",
    image: "/images/plot-1.jpg",
    date: "3 days ago",
    status: "Closed",
    messages: [
      {
        id: "m1",
        from: "lead",
        text: "Is the price negotiable?",
        time: "3 days ago",
      },
      {
        id: "m2",
        from: "agent",
        text: "Slight margin available. Let's discuss when you visit.",
        time: "2 days ago",
      },
      {
        id: "m3",
        from: "lead",
        text: "Deal closed. Thanks for your help.",
        time: "1 day ago",
      },
    ],
  },
];

const STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Visit Scheduled",
  "Closed",
];

const TABS: { key: "all" | LeadStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "New", label: "New" },
  { key: "Contacted", label: "Contacted" },
  { key: "Visit Scheduled", label: "Visit" },
  { key: "Closed", label: "Closed" },
];

const statusTone: Record<LeadStatus, string> = {
  New: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
  Contacted: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  "Visit Scheduled": "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  Closed: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
};

const statusDot: Record<LeadStatus, string> = {
  New: "bg-brand-500",
  Contacted: "bg-amber-500",
  "Visit Scheduled": "bg-emerald-500",
  Closed: "bg-neutral-400",
};

/* ============================================
   PAGE
   ============================================ */

export default function AgentLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_LEADS[0].id);
  const [replyText, setReplyText] = useState("");
  const [tab, setTab] = useState<"all" | LeadStatus>("all");
  const [search, setSearch] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState<Lead | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedLead = useMemo(
    () => leads.find((l) => l.id === selectedId) ?? leads[0],
    [leads, selectedId]
  );

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (tab !== "all" && l.status !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !l.name.toLowerCase().includes(q) &&
          !l.property.toLowerCase().includes(q) &&
          !l.phone.includes(q) &&
          !l.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [leads, tab, search]);

  const counts = useMemo(
    () => ({
      all: leads.length,
      New: leads.filter((l) => l.status === "New").length,
      Contacted: leads.filter((l) => l.status === "Contacted").length,
      "Visit Scheduled": leads.filter((l) => l.status === "Visit Scheduled")
        .length,
      Closed: leads.filter((l) => l.status === "Closed").length,
    }),
    [leads]
  );

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, selectedLead.messages.length]);

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLead.id
          ? {
              ...l,
              messages: [
                ...l.messages,
                {
                  id: `m${Date.now()}`,
                  from: "agent",
                  text: replyText.trim(),
                  time: "Just now",
                },
              ],
              status:
                l.status === "New" ? ("Contacted" as LeadStatus) : l.status,
            }
          : l
      )
    );
    setReplyText("");
  };

  const changeStatus = (status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, status } : l))
    );
    setStatusMenuOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-neutral-50 lg:flex-row">
      {/* =========================================
          LEFT — LEADS LIST
          ========================================= */}
      <div
        className={`flex w-full flex-col border-neutral-200 bg-white lg:w-[420px] lg:shrink-0 lg:border-r ${
          mobileChatOpen ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="border-b border-neutral-100 px-5 py-5">
          <Link
            href="/dashboard/agent"
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
            Back to Dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-ink">
            Lead Inbox
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage enquiries for your listed properties.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
          {[
            { label: "New", value: counts.New },
            { label: "Contacted", value: counts.Contacted },
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
              aria-label="Filter leads"
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
                placeholder="Search by name, property, or ID..."
                className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-8 pr-3 text-xs text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>
        </div>

        {/* Leads list */}
        <div className="flex-1 overflow-y-auto">
          {filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">No leads found</p>
              <p className="mt-1 text-xs text-neutral-500">
                Try changing filters or search keyword.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {filteredLeads.map((lead) => {
                const isSelected = lead.id === selectedLead.id;
                return (
                  <li key={lead.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(lead.id);
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
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-bold text-ink">
                              {lead.name}
                            </h3>
                            <span className="shrink-0 text-[10px] font-medium text-neutral-400">
                              {lead.date}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs font-medium text-neutral-600">
                            Re: {lead.property}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                                statusTone[lead.status]
                              }`}
                            >
                              <span
                                className={`h-1 w-1 rounded-full ${
                                  statusDot[lead.status]
                                }`}
                              />
                              {lead.status}
                            </span>
                            <span className="truncate text-[10px] font-semibold text-neutral-400">
                              {lead.id}
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
                aria-label="Back to leads"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
              </button>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                {selectedLead.name.charAt(0)}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-black tracking-tight text-ink">
                  {selectedLead.name}
                </h2>
                <p className="mt-0.5 truncate text-xs font-medium text-neutral-600">
                  {selectedLead.phone} · {selectedLead.email}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-black text-neutral-600">
                    {selectedLead.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                      statusTone[selectedLead.status]
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        statusDot[selectedLead.status]
                      }`}
                    />
                    {selectedLead.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1.5">
              <a
                href={`tel:${selectedLead.phone}`}
                aria-label="Call lead"
                title="Call"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
              >
                <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${selectedLead.email}`}
                aria-label="Email lead"
                title="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
              </a>

              {/* Status dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStatusMenuOpen((v) => !v)}
                  aria-expanded={statusMenuOpen}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-2.5 text-xs font-bold text-ink transition hover:bg-neutral-50"
                >
                  Status
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`h-2.5 w-2.5 transition ${
                      statusMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {statusMenuOpen && (
                  <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                    {STATUSES.map((s) => {
                      const active = s === selectedLead.status;
                      return (
                        <button
                          key={s}
                          onClick={() => changeStatus(s)}
                          className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                            active
                              ? "bg-brand-50 font-bold text-brand-700"
                              : "text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                statusDot[s]
                              }`}
                            />
                            {s}
                          </span>
                          {active && (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className="h-3 w-3"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
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
                    src={selectedLead.image}
                    alt={selectedLead.property}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-bold text-ink">
                    {selectedLead.property}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="h-2.5 w-2.5"
                    />
                    {selectedLead.location}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPropertyOpen(selectedLead)}
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    Preview property
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
              {selectedLead.messages.map((msg) => {
                const isAgent = msg.from === "agent";
                return (
                  <li
                    key={msg.id}
                    className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
                        isAgent
                          ? "rounded-tr-sm bg-ink text-white"
                          : "rounded-tl-sm border border-neutral-200 bg-white text-ink"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium ${
                          isAgent ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faClock}
                          className="h-2 w-2"
                        />
                        {isAgent ? "You" : selectedLead.name} · {msg.time}
                      </p>
                    </div>
                  </li>
                );
              })}
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
              placeholder="Type your reply..."
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              aria-label="Send reply"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
            </button>
          </form>
          <div className="mx-auto mt-2 flex max-w-3xl items-center gap-1.5 text-[11px] text-neutral-500">
            <FontAwesomeIcon icon={faCircleInfo} className="h-3 w-3" />
            Responding within 15 minutes boosts your chance of closing a deal.
          </div>
        </div>
      </div>

      {/* =========================================
          PROPERTY PREVIEW MODAL
          ========================================= */}
      {propertyOpen && (
        <Modal
          onClose={() => setPropertyOpen(null)}
          title={propertyOpen.property}
          subtitle={`${propertyOpen.location} · ${propertyOpen.id}`}
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
                { label: "Client", value: propertyOpen.name },
                { label: "Phone", value: propertyOpen.phone },
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