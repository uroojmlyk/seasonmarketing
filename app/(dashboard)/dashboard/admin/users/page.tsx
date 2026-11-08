// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faEllipsisVertical,
//   faUserTie,
//   faUser,
//   faBuilding,
//   faShieldHalved,
//   faBan,
//   faArrowLeft,
//   faPlus,
//   faClock,
//   faCircleCheck,
//   faEye,
//   faChevronLeft,
//   faChevronRight,
//   faXmark,
//   faCheck,
//   faCircleInfo,
//   faArrowUpRightFromSquare,
//   faEnvelope,
//   faCalendar,
//   faCircleExclamation,
// } from "@fortawesome/free-solid-svg-icons";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// /* ============================================
//    TYPES
//    ============================================ */

// type Role = "Agent" | "Agency" | "Owner" | "Buyer";
// type Status = "Active" | "Suspended";

// interface AdminUser {
//   id: string;
//   name: string;
//   email: string;
//   role: Role;
//   status: Status;
//   joined: string;
//   joinedISO: string;
//   phone?: string;
//   listingsCount?: number;
// }

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_USERS: AdminUser[] = [
//   {
//     id: "U-101",
//     name: "Ali Khan",
//     email: "ali@example.com",
//     role: "Agent",
//     status: "Active",
//     joined: "Oct 24, 2026",
//     joinedISO: "2026-10-24",
//     phone: "+92 300 1234567",
//     listingsCount: 3,
//   },
//   {
//     id: "U-102",
//     name: "Zainab Real Estate",
//     email: "zainab@agency.pk",
//     role: "Agency",
//     status: "Active",
//     joined: "Oct 20, 2026",
//     joinedISO: "2026-10-20",
//     phone: "+92 300 2345678",
//     listingsCount: 12,
//   },
//   {
//     id: "U-103",
//     name: "Usman Ahmed",
//     email: "usman@example.com",
//     role: "Buyer",
//     status: "Active",
//     joined: "Oct 18, 2026",
//     joinedISO: "2026-10-18",
//   },
//   {
//     id: "U-104",
//     name: "Sara Malik",
//     email: "sara@example.com",
//     role: "Owner",
//     status: "Suspended",
//     joined: "Oct 15, 2026",
//     joinedISO: "2026-10-15",
//     phone: "+92 300 3456789",
//     listingsCount: 2,
//   },
//   {
//     id: "U-105",
//     name: "Bilal Properties",
//     email: "bilal@agency.pk",
//     role: "Agency",
//     status: "Active",
//     joined: "Oct 12, 2026",
//     joinedISO: "2026-10-12",
//     phone: "+92 300 4567890",
//     listingsCount: 8,
//   },
// ];

// const TABS: { key: "all" | Role; label: string }[] = [
//   { key: "all", label: "All Users" },
//   { key: "Agent", label: "Agents" },
//   { key: "Agency", label: "Agencies" },
//   { key: "Owner", label: "Owners" },
//   { key: "Buyer", label: "Buyers" },
// ];

// const ROLE_OPTIONS: Role[] = ["Agent", "Agency", "Owner", "Buyer"];

// /* ============================================
//    HELPERS
//    ============================================ */

// const roleIcon = (role: Role): IconDefinition => {
//   switch (role) {
//     case "Agent":
//       return faUserTie;
//     case "Agency":
//       return faBuilding;
//     case "Owner":
//       return faShieldHalved;
//     default:
//       return faUser;
//   }
// };

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState(INITIAL_USERS);
//   const [tab, setTab] = useState<"all" | Role>("all");
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState<Set<string>>(new Set());
//   const [addOpen, setAddOpen] = useState(false);
//   const [viewOpen, setViewOpen] = useState<AdminUser | null>(null);
//   const [suspendOpen, setSuspendOpen] = useState<AdminUser | null>(null);
//   const [reactivateOpen, setReactivateOpen] = useState<AdminUser | null>(null);
//   const [actionReason, setActionReason] = useState("");

//   const counts = useMemo(
//     () => ({
//       all: users.length,
//       Agent: users.filter((u) => u.role === "Agent").length,
//       Agency: users.filter((u) => u.role === "Agency").length,
//       Owner: users.filter((u) => u.role === "Owner").length,
//       Buyer: users.filter((u) => u.role === "Buyer").length,
//     }),
//     [users]
//   );

//   const activeCount = users.filter((u) => u.status === "Active").length;
//   const suspendedCount = users.filter((u) => u.status === "Suspended").length;

//   const filtered = useMemo(() => {
//     return users.filter((u) => {
//       if (tab !== "all" && u.role !== tab) return false;
//       if (search) {
//         const q = search.toLowerCase();
//         if (
//           !u.name.toLowerCase().includes(q) &&
//           !u.email.toLowerCase().includes(q) &&
//           !u.id.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [users, tab, search]);

//   const toggleSelected = (id: string) => {
//     setSelected((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   const toggleAll = () => {
//     if (selected.size === filtered.length) setSelected(new Set());
//     else setSelected(new Set(filtered.map((u) => u.id)));
//   };

//   const suspend = (user: AdminUser, reason: string) => {
//     if (!reason.trim()) return;
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === user.id ? { ...u, status: "Suspended" as Status } : u
//       )
//     );
//     setSuspendOpen(null);
//     setActionReason("");
//   };

//   const reactivate = (user: AdminUser) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === user.id ? { ...u, status: "Active" as Status } : u
//       )
//     );
//     setReactivateOpen(null);
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
//                 Admin · Users & Roles
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Users & Roles
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Manage accounts, roles, and suspensions. Every action is logged.
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
//                 onClick={() => setAddOpen(true)}
//                 className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
//                 Add New User
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
//               label: "Total Users",
//               value: users.length,
//               tone: "neutral" as const,
//               icon: faUser,
//             },
//             {
//               label: "Active",
//               value: activeCount,
//               tone: "emerald" as const,
//               icon: faCircleCheck,
//             },
//             {
//               label: "Suspended",
//               value: suspendedCount,
//               tone: "red" as const,
//               icon: faBan,
//             },
//             {
//               label: "New This Month",
//               value: 32,
//               tone: "brand" as const,
//               icon: faPlus,
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
//                       : s.tone === "emerald"
//                       ? "text-emerald-500"
//                       : s.tone === "brand"
//                       ? "text-brand-500"
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
//             FILTER + TABLE
//             ========================================= */}
//         <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
//           {/* Filter bar */}
//           <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
//             <div
//               className="flex gap-1 overflow-x-auto"
//               role="tablist"
//               aria-label="Filter users by role"
//             >
//               {TABS.map((t) => {
//                 const active = tab === t.key;
//                 return (
//                   <button
//                     key={t.key}
//                     role="tab"
//                     aria-selected={active}
//                     onClick={() => setTab(t.key)}
//                     className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
//                       active
//                         ? "bg-ink text-white"
//                         : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
//                     }`}
//                   >
//                     {t.label}
//                     <span
//                       className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
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

//             <div className="relative w-full sm:w-72">
//               <FontAwesomeIcon
//                 icon={faMagnifyingGlass}
//                 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
//               />
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name, email, or ID..."
//                 className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[800px] text-left">
//               <thead className="border-b border-neutral-200 bg-neutral-50">
//                 <tr>
//                   <th scope="col" className="w-12 px-4 py-4">
//                     <input
//                       type="checkbox"
//                       checked={
//                         filtered.length > 0 &&
//                         selected.size === filtered.length
//                       }
//                       onChange={toggleAll}
//                       aria-label="Select all"
//                       className="h-4 w-4 rounded border-neutral-300 accent-brand-500 focus:ring-brand-500"
//                     />
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
//                   >
//                     User
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
//                   >
//                     Role
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
//                   >
//                     Joined
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
//                   >
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-neutral-100">
//                 {filtered.map((user) => {
//                   const Icon = roleIcon(user.role);
//                   const active = user.status === "Active";
//                   return (
//                     <tr
//                       key={user.id}
//                       className="group transition hover:bg-neutral-50/70"
//                     >
//                       <td className="px-4 py-4">
//                         <input
//                           type="checkbox"
//                           checked={selected.has(user.id)}
//                           onChange={() => toggleSelected(user.id)}
//                           aria-label={`Select ${user.name}`}
//                           className="h-4 w-4 rounded border-neutral-300 accent-brand-500 focus:ring-brand-500"
//                         />
//                       </td>

//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
//                             <FontAwesomeIcon
//                               icon={Icon}
//                               className="h-4 w-4"
//                             />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="truncate text-base font-bold text-ink group-hover:text-brand-600">
//                               {user.name}
//                             </p>
//                             <p className="truncate text-xs text-neutral-500">
//                               {user.email}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
//                           <FontAwesomeIcon
//                             icon={Icon}
//                             className="h-2.5 w-2.5 text-neutral-400"
//                           />
//                           {user.role}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <p className="text-sm font-medium text-neutral-700">
//                           {user.joined}
//                         </p>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span
//                           className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
//                             active
//                               ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
//                               : "bg-red-50 text-red-800 ring-1 ring-red-200"
//                           }`}
//                         >
//                           <span
//                             className={`h-1.5 w-1.5 rounded-full ${
//                               active ? "bg-emerald-500" : "bg-red-500"
//                             }`}
//                           />
//                           {user.status}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <div className="flex items-center justify-end gap-1">
//                           <button
//                             type="button"
//                             onClick={() => setViewOpen(user)}
//                             aria-label={`View ${user.name}`}
//                             title="View user"
//                             className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//                           >
//                             <FontAwesomeIcon
//                               icon={faEye}
//                               className="h-3.5 w-3.5"
//                             />
//                           </button>

//                           {active ? (
//                             <button
//                               type="button"
//                               onClick={() => setSuspendOpen(user)}
//                               aria-label={`Suspend ${user.name}`}
//                               title="Suspend user"
//                               className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faBan}
//                                 className="h-3.5 w-3.5"
//                               />
//                             </button>
//                           ) : (
//                             <button
//                               type="button"
//                               onClick={() => setReactivateOpen(user)}
//                               aria-label={`Reactivate ${user.name}`}
//                               title="Reactivate user"
//                               className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-emerald-50 hover:text-emerald-600"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faCircleCheck}
//                                 className="h-3.5 w-3.5"
//                               />
//                             </button>
//                           )}

//                           <button
//                             type="button"
//                             onClick={() => setViewOpen(user)}
//                             aria-label="More actions"
//                             title="More actions"
//                             className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
//                           >
//                             <FontAwesomeIcon
//                               icon={faEllipsisVertical}
//                               className="h-3.5 w-3.5"
//                             />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//                 {filtered.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-16 text-center">
//                       <div className="mx-auto flex max-w-sm flex-col items-center">
//                         <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                           <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
//                         </span>
//                         <h3 className="mt-4 text-base font-bold text-ink">
//                           No users found
//                         </h3>
//                         <p className="mt-1 text-sm text-neutral-500">
//                           Try adjusting your filters or search keyword.
//                         </p>
//                         <button
//                           onClick={() => {
//                             setTab("all");
//                             setSearch("");
//                           }}
//                           className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                         >
//                           Clear filters
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer */}
//           <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
//             <p className="text-xs font-medium text-neutral-600">
//               Showing{" "}
//               <span className="font-black text-ink">{filtered.length}</span> of{" "}
//               <span className="font-black text-ink">{users.length}</span> users
//               {selected.size > 0 && (
//                 <>
//                   {" · "}
//                   <span className="font-bold text-brand-600">
//                     {selected.size} selected
//                   </span>
//                 </>
//               )}
//             </p>

//             <div className="flex items-center gap-1">
//               <button
//                 type="button"
//                 disabled
//                 aria-label="Previous page"
//                 className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
//               </button>
//               <button
//                 type="button"
//                 className="flex h-8 min-w-8 items-center justify-center rounded-md bg-ink px-2 text-xs font-black text-white"
//               >
//                 1
//               </button>
//               <button
//                 type="button"
//                 aria-label="Next page"
//                 className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* =========================================
//             INFO BAR
//             ========================================= */}
//         <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
//           <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
//             <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
//           </span>
//           <div>
//             <p className="text-sm font-bold text-ink">Account policy</p>
//             <p className="mt-1 text-sm leading-relaxed text-neutral-600">
//               Suspending an account hides all active listings and disables new
//               enquiries. Suspensions must include a reason. All actions are
//               logged per policy and can be appealed by the user.
//             </p>
//           </div>
//         </div>
//       </main>

//       {/* =========================================
//           ADD USER MODAL
//           ========================================= */}
//       {addOpen && (
//         <Modal
//           onClose={() => setAddOpen(false)}
//           title="Add new user"
//           subtitle="Create an account on behalf of a user"
//         >
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="add-name"
//                 className="text-xs font-black uppercase tracking-wider text-neutral-600"
//               >
//                 Full name <span className="text-brand-600">*</span>
//               </label>
//               <input
//                 id="add-name"
//                 type="text"
//                 placeholder="e.g. Ahmed Raza"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="add-email"
//                 className="text-xs font-black uppercase tracking-wider text-neutral-600"
//               >
//                 Email <span className="text-brand-600">*</span>
//               </label>
//               <input
//                 id="add-email"
//                 type="email"
//                 placeholder="you@example.com"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="add-role"
//                 className="text-xs font-black uppercase tracking-wider text-neutral-600"
//               >
//                 Role <span className="text-brand-600">*</span>
//               </label>
//               <select
//                 id="add-role"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               >
//                 {ROLE_OPTIONS.map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setAddOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setAddOpen(false)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
//               Create account
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           VIEW USER MODAL
//           ========================================= */}
//       {viewOpen && (
//         <Modal
//           onClose={() => setViewOpen(null)}
//           title={viewOpen.name}
//           subtitle={`${viewOpen.role} · ${viewOpen.id}`}
//         >
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-black text-white">
//                 {viewOpen.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .slice(0, 2)}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-base font-bold text-ink">{viewOpen.name}</p>
//                 <p className="text-xs text-neutral-500">
//                   Joined {viewOpen.joined}
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2">
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                   Email
//                 </p>
//                 <p className="mt-1 truncate text-sm font-semibold text-ink">
//                   {viewOpen.email}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                   Role
//                 </p>
//                 <p className="mt-1 text-sm font-semibold text-ink">
//                   {viewOpen.role}
//                 </p>
//               </div>
//               {viewOpen.phone && (
//                 <div>
//                   <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                     Phone
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-ink">
//                     {viewOpen.phone}
//                   </p>
//                 </div>
//               )}
//               {viewOpen.listingsCount !== undefined && (
//                 <div>
//                   <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                     Active Listings
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-ink">
//                     {viewOpen.listingsCount}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div>
//               <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
//                 Status
//               </p>
//               <span
//                 className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
//                   viewOpen.status === "Active"
//                     ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
//                     : "bg-red-50 text-red-800 ring-1 ring-red-200"
//                 }`}
//               >
//                 <span
//                   className={`h-1.5 w-1.5 rounded-full ${
//                     viewOpen.status === "Active"
//                       ? "bg-emerald-500"
//                       : "bg-red-500"
//                   }`}
//                 />
//                 {viewOpen.status}
//               </span>
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
//             {viewOpen.status === "Active" ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSuspendOpen(viewOpen);
//                   setViewOpen(null);
//                 }}
//                 className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
//               >
//                 <FontAwesomeIcon icon={faBan} className="h-3.5 w-3.5" />
//                 Suspend user
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setReactivateOpen(viewOpen);
//                   setViewOpen(null);
//                 }}
//                 className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
//                 Reactivate user
//               </button>
//             )}
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           SUSPEND MODAL
//           ========================================= */}
//       {suspendOpen && (
//         <Modal
//           onClose={() => setSuspendOpen(null)}
//           title="Suspend this account?"
//           subtitle={`${suspendOpen.name} · ${suspendOpen.id}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             The account will be hidden from listings and cannot post new
//             properties. All active listings will be paused. This action is
//             logged and can be appealed.
//           </p>

//           <div className="mt-4">
//             <label
//               htmlFor="suspend-reason"
//               className="text-xs font-black uppercase tracking-wider text-neutral-600"
//             >
//               Reason for suspension <span className="text-brand-600">*</span>
//             </label>
//             <textarea
//               id="suspend-reason"
//               value={actionReason}
//               onChange={(e) => setActionReason(e.target.value)}
//               rows={4}
//               placeholder="e.g. Repeated policy violations — posting duplicate listings."
//               className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//             />
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setSuspendOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!actionReason.trim()}
//               onClick={() => suspend(suspendOpen, actionReason)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <FontAwesomeIcon icon={faBan} className="h-3.5 w-3.5" />
//               Confirm suspension
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           REACTIVATE MODAL
//           ========================================= */}
//       {reactivateOpen && (
//         <Modal
//           onClose={() => setReactivateOpen(null)}
//           title="Reactivate this account?"
//           subtitle={`${reactivateOpen.name} · ${reactivateOpen.id}`}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             The account will regain access to post listings and respond to
//             enquiries. Ensure the reason for suspension has been resolved
//             before reactivating.
//           </p>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setReactivateOpen(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => reactivate(reactivateOpen)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
//               Reactivate account
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
  faMagnifyingGlass,
  faEllipsisVertical,
  faUserTie,
  faUser,
  faBuilding,
  faShieldHalved,
  faBan,
  faArrowLeft,
  faPlus,
  faClock,
  faCircleCheck,
  faEye,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faCheck,
  faCircleInfo,
  faArrowUpRightFromSquare,
  faEnvelope,
  faCalendar,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/* ============================================
   TYPES
   ============================================ */

type Role = "Agent" | "Agency" | "Owner" | "Buyer";
type Status = "Active" | "Suspended";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
  joinedISO: string;
  phone?: string;
  listingsCount?: number;
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_USERS: AdminUser[] = [
  {
    id: "U-101",
    name: "Ali Khan",
    email: "ali@example.com",
    role: "Agent",
    status: "Active",
    joined: "Oct 24, 2026",
    joinedISO: "2026-10-24",
    phone: "+92 300 1234567",
    listingsCount: 3,
  },
  {
    id: "U-102",
    name: "Zainab Real Estate",
    email: "zainab@agency.pk",
    role: "Agency",
    status: "Active",
    joined: "Oct 20, 2026",
    joinedISO: "2026-10-20",
    phone: "+92 300 2345678",
    listingsCount: 12,
  },
  {
    id: "U-103",
    name: "Usman Ahmed",
    email: "usman@example.com",
    role: "Buyer",
    status: "Active",
    joined: "Oct 18, 2026",
    joinedISO: "2026-10-18",
  },
  {
    id: "U-104",
    name: "Sara Malik",
    email: "sara@example.com",
    role: "Owner",
    status: "Suspended",
    joined: "Oct 15, 2026",
    joinedISO: "2026-10-15",
    phone: "+92 300 3456789",
    listingsCount: 2,
  },
  {
    id: "U-105",
    name: "Bilal Properties",
    email: "bilal@agency.pk",
    role: "Agency",
    status: "Active",
    joined: "Oct 12, 2026",
    joinedISO: "2026-10-12",
    phone: "+92 300 4567890",
    listingsCount: 8,
  },
];

const TABS: { key: "all" | Role; label: string }[] = [
  { key: "all", label: "All Users" },
  { key: "Agent", label: "Agents" },
  { key: "Agency", label: "Agencies" },
  { key: "Owner", label: "Owners" },
  { key: "Buyer", label: "Buyers" },
];

const ROLE_OPTIONS: Role[] = ["Agent", "Agency", "Owner", "Buyer"];

/* ============================================
   HELPERS
   ============================================ */

const roleIcon = (role: Role): IconDefinition => {
  switch (role) {
    case "Agent":
      return faUserTie;
    case "Agency":
      return faBuilding;
    case "Owner":
      return faShieldHalved;
    default:
      return faUser;
  }
};

/* ============================================
   PAGE
   ============================================ */

export default function AdminUsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [tab, setTab] = useState<"all" | Role>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState<AdminUser | null>(null);
  const [suspendOpen, setSuspendOpen] = useState<AdminUser | null>(null);
  const [reactivateOpen, setReactivateOpen] = useState<AdminUser | null>(null);
  const [actionReason, setActionReason] = useState("");

  const counts = useMemo(
    () => ({
      all: users.length,
      Agent: users.filter((u) => u.role === "Agent").length,
      Agency: users.filter((u) => u.role === "Agency").length,
      Owner: users.filter((u) => u.role === "Owner").length,
      Buyer: users.filter((u) => u.role === "Buyer").length,
    }),
    [users]
  );

  const activeCount = users.filter((u) => u.status === "Active").length;
  const suspendedCount = users.filter((u) => u.status === "Suspended").length;

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (tab !== "all" && u.role !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !u.name.toLowerCase().includes(q) &&
          !u.email.toLowerCase().includes(q) &&
          !u.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [users, tab, search]);

  const toggleSelected = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((u) => u.id)));
  };

  const suspend = (user: AdminUser, reason: string) => {
    if (!reason.trim()) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: "Suspended" as Status } : u
      )
    );
    setSuspendOpen(null);
    setActionReason("");
  };

  const reactivate = (user: AdminUser) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: "Active" as Status } : u
      )
    );
    setReactivateOpen(null);
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
                Admin · Users & Roles
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Users & Roles
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage accounts, roles, and suspensions. Every action is logged.
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
                onClick={() => setAddOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Add New User
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
              label: "Total Users",
              value: users.length,
              tone: "neutral" as const,
              icon: faUser,
            },
            {
              label: "Active",
              value: activeCount,
              tone: "emerald" as const,
              icon: faCircleCheck,
            },
            {
              label: "Suspended",
              value: suspendedCount,
              tone: "red" as const,
              icon: faBan,
            },
            {
              label: "New This Month",
              value: 32,
              tone: "brand" as const,
              icon: faPlus,
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
                      : s.tone === "emerald"
                      ? "text-emerald-500"
                      : s.tone === "brand"
                      ? "text-brand-500"
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
            FILTER + TABLE
            ========================================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {/* Filter bar */}
          <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div
              className="flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter users by role"
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

            <div className="relative w-full sm:w-72">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or ID..."
                className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full md:min-w-[800px] text-left max-md:block max-md:[&_thead]:hidden max-md:[&_tbody]:block max-md:[&_tr]:block max-md:[&_tr]:p-4 max-md:[&_td]:flex max-md:[&_td]:items-center max-md:[&_td]:justify-between max-md:[&_td]:gap-4 max-md:[&_td]:px-0 max-md:[&_td]:py-1.5 max-md:[&_td]:text-right max-md:[&_td:first-child]:justify-start max-md:[&_td:first-child]:text-left max-md:[&_td]:before:content-[attr(data-label)] max-md:[&_td]:before:shrink-0 max-md:[&_td]:before:text-[11px] max-md:[&_td[colspan]]:justify-center max-md:[&_td[colspan]]:text-center max-md:[&_td[colspan]]:before:hidden max-md:[&_td]:before:font-bold max-md:[&_td]:before:uppercase max-md:[&_td]:before:tracking-wider max-md:[&_td]:before:text-neutral-400 max-md:[&_td:nth-child(2)]:justify-start max-md:[&_td:nth-child(2)]:text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th scope="col" className="w-12 px-4 py-4">
                    <input
                      type="checkbox"
                      checked={
                        filtered.length > 0 &&
                        selected.size === filtered.length
                      }
                      onChange={toggleAll}
                      aria-label="Select all"
                      className="h-4 w-4 rounded border-neutral-300 accent-brand-500 focus:ring-brand-500"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Joined
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((user) => {
                  const Icon = roleIcon(user.role);
                  const active = user.status === "Active";
                  return (
                    <tr
                      key={user.id}
                      className="group transition hover:bg-neutral-50/70"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selected.has(user.id)}
                          onChange={() => toggleSelected(user.id)}
                          aria-label={`Select ${user.name}`}
                          className="h-4 w-4 rounded border-neutral-300 accent-brand-500 focus:ring-brand-500"
                        />
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                            <FontAwesomeIcon
                              icon={Icon}
                              className="h-4 w-4"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-base font-bold text-ink group-hover:text-brand-600">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-neutral-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td data-label="Role" className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
                          <FontAwesomeIcon
                            icon={Icon}
                            className="h-2.5 w-2.5 text-neutral-400"
                          />
                          {user.role}
                        </span>
                      </td>

                      <td data-label="Joined" className="px-4 py-4">
                        <p className="text-sm font-medium text-neutral-700">
                          {user.joined}
                        </p>
                      </td>

                      <td data-label="Status" className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
                            active
                              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                              : "bg-red-50 text-red-800 ring-1 ring-red-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              active ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>

                      <td data-label="Actions" className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setViewOpen(user)}
                            aria-label={`View ${user.name}`}
                            title="View user"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="h-3.5 w-3.5"
                            />
                          </button>

                          {active ? (
                            <button
                              type="button"
                              onClick={() => setSuspendOpen(user)}
                              aria-label={`Suspend ${user.name}`}
                              title="Suspend user"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <FontAwesomeIcon
                                icon={faBan}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setReactivateOpen(user)}
                              aria-label={`Reactivate ${user.name}`}
                              title="Reactivate user"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                            >
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="h-3.5 w-3.5"
                              />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setViewOpen(user)}
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
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                          <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                        </span>
                        <h3 className="mt-4 text-base font-bold text-ink">
                          No users found
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
              <span className="font-black text-ink">{filtered.length}</span> of{" "}
              <span className="font-black text-ink">{users.length}</span> users
              {selected.size > 0 && (
                <>
                  {" · "}
                  <span className="font-bold text-brand-600">
                    {selected.size} selected
                  </span>
                </>
              )}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
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
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            INFO BAR
            ========================================= */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
            <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">Account policy</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Suspending an account hides all active listings and disables new
              enquiries. Suspensions must include a reason. All actions are
              logged per policy and can be appealed by the user.
            </p>
          </div>
        </div>
      </main>

      {/* =========================================
          ADD USER MODAL
          ========================================= */}
      {addOpen && (
        <Modal
          onClose={() => setAddOpen(false)}
          title="Add new user"
          subtitle="Create an account on behalf of a user"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="add-name"
                className="text-xs font-black uppercase tracking-wider text-neutral-600"
              >
                Full name <span className="text-brand-600">*</span>
              </label>
              <input
                id="add-name"
                type="text"
                placeholder="e.g. Ahmed Raza"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label
                htmlFor="add-email"
                className="text-xs font-black uppercase tracking-wider text-neutral-600"
              >
                Email <span className="text-brand-600">*</span>
              </label>
              <input
                id="add-email"
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label
                htmlFor="add-role"
                className="text-xs font-black uppercase tracking-wider text-neutral-600"
              >
                Role <span className="text-brand-600">*</span>
              </label>
              <select
                id="add-role"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              Create account
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          VIEW USER MODAL
          ========================================= */}
      {viewOpen && (
        <Modal
          onClose={() => setViewOpen(null)}
          title={viewOpen.name}
          subtitle={`${viewOpen.role} · ${viewOpen.id}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-black text-white">
                {viewOpen.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-ink">{viewOpen.name}</p>
                <p className="text-xs text-neutral-500">
                  Joined {viewOpen.joined}
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Email
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-ink">
                  {viewOpen.email}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Role
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {viewOpen.role}
                </p>
              </div>
              {viewOpen.phone && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {viewOpen.phone}
                  </p>
                </div>
              )}
              {viewOpen.listingsCount !== undefined && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    Active Listings
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {viewOpen.listingsCount}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                Status
              </p>
              <span
                className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
                  viewOpen.status === "Active"
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                    : "bg-red-50 text-red-800 ring-1 ring-red-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    viewOpen.status === "Active"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                />
                {viewOpen.status}
              </span>
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
            {viewOpen.status === "Active" ? (
              <button
                type="button"
                onClick={() => {
                  setSuspendOpen(viewOpen);
                  setViewOpen(null);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faBan} className="h-3.5 w-3.5" />
                Suspend user
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setReactivateOpen(viewOpen);
                  setViewOpen(null);
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
                Reactivate user
              </button>
            )}
          </div>
        </Modal>
      )}

      {/* =========================================
          SUSPEND MODAL
          ========================================= */}
      {suspendOpen && (
        <Modal
          onClose={() => setSuspendOpen(null)}
          title="Suspend this account?"
          subtitle={`${suspendOpen.name} · ${suspendOpen.id}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            The account will be hidden from listings and cannot post new
            properties. All active listings will be paused. This action is
            logged and can be appealed.
          </p>

          <div className="mt-4">
            <label
              htmlFor="suspend-reason"
              className="text-xs font-black uppercase tracking-wider text-neutral-600"
            >
              Reason for suspension <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="suspend-reason"
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={4}
              placeholder="e.g. Repeated policy violations — posting duplicate listings."
              className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setSuspendOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!actionReason.trim()}
              onClick={() => suspend(suspendOpen, actionReason)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faBan} className="h-3.5 w-3.5" />
              Confirm suspension
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REACTIVATE MODAL
          ========================================= */}
      {reactivateOpen && (
        <Modal
          onClose={() => setReactivateOpen(null)}
          title="Reactivate this account?"
          subtitle={`${reactivateOpen.name} · ${reactivateOpen.id}`}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            The account will regain access to post listings and respond to
            enquiries. Ensure the reason for suspension has been resolved
            before reactivating.
          </p>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setReactivateOpen(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => reactivate(reactivateOpen)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
              Reactivate account
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