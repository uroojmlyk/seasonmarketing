// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars, faXmark, faPlus, faChevronDown, faArrowRight,
//   faMapLocationDot, faKey, faUserTie, faHouse
// } from "@fortawesome/free-solid-svg-icons";

// interface MenuLink { label: string; href: string }
// interface MenuColumn { title: string; links: MenuLink[] }
// interface Menu {
//   label: string;
//   match: string[];
//   columns: MenuColumn[];
//   cta: { text: string; label: string; href: string };
// }

// const MENU_DATA: Record<string, Menu> = {
//   buy: {
//     label: "Buy",
//     match: ["/buy"],
//     columns: [
//       { title: "Category", links: [ { label: "Homes", href: "/properties?intent=buy&category=homes" }, { label: "Plots", href: "/properties?intent=buy&category=plots" }, { label: "Commercial", href: "/properties?intent=buy&category=commercial" } ] },
//       { title: "All Homes", links: [ { label: "House", href: "/properties?intent=buy&type=house" }, { label: "Flat", href: "/properties?intent=buy&type=flat" }, { label: "Upper Portion", href: "/properties?intent=buy&type=upper-portion" }, { label: "Lower Portion", href: "/properties?intent=buy&type=lower-portion" }, { label: "Farm House", href: "/properties?intent=buy&type=farm-house" }, { label: "Penthouse", href: "/properties?intent=buy&type=penthouse" }, { label: "Room", href: "/properties?intent=buy&type=room" } ] },
//       { title: "Popular Cities", links: [ { label: "Lahore", href: "/properties?city=lahore" }, { label: "Karachi", href: "/properties?city=karachi" }, { label: "Islamabad", href: "/properties?city=islamabad" }, { label: "Peshawar", href: "/properties?city=peshawar" }, { label: "Quetta", href: "/properties?city=quetta" } ] },
//       { title: "Ways to Search", links: [ { label: "Map Search", href: "/map-search" }, { label: "Plot Finder", href: "/properties?type=plot" }, { label: "Saved Properties", href: "/dashboard/saved-properties" }, { label: "Find an Agent", href: "/agents" } ] },
//     ],
//     cta: { text: "Prefer to explore visually?", label: "Search on map", href: "/map-search" },
//   },
//   rent: {
//     label: "Rent",
//     match: ["/rent"],
//     columns: [
//       { title: "Category", links: [ { label: "Homes", href: "/properties?intent=rent&category=homes" }, { label: "Plots", href: "/properties?intent=rent&category=plots" }, { label: "Commercial", href: "/properties?intent=rent&category=commercial" } ] },
//       { title: "All Homes", links: [ { label: "House", href: "/properties?intent=rent&type=house" }, { label: "Flat", href: "/properties?intent=rent&type=flat" }, { label: "Upper Portion", href: "/properties?intent=rent&type=upper-portion" }, { label: "Lower Portion", href: "/properties?intent=rent&type=lower-portion" }, { label: "Farm House", href: "/properties?intent=rent&type=farm-house" } ] },
//       { title: "Popular Cities", links: [ { label: "Lahore", href: "/properties?city=lahore&intent=rent" }, { label: "Karachi", href: "/properties?city=karachi&intent=rent" }, { label: "Islamabad", href: "/properties?city=islamabad&intent=rent" }, { label: "Peshawar", href: "/properties?city=peshawar&intent=rent" }, { label: "Quetta", href: "/properties?city=quetta&intent=rent" } ] },
//       { title: "Ways to Search", links: [ { label: "Map Search", href: "/map-search?intent=rent" }, { label: "Find an Agent", href: "/agents" } ] },
//     ],
//     cta: { text: "See rentals on the map", label: "Rent on map", href: "/map-search?intent=rent" },
//   },
//   projects: {
//     label: "New Projects",
//     match: [],
//     columns: [
//       { title: "Browse", links: [ { label: "All Projects", href: "/properties?intent=project" }, { label: "Developments", href: "/properties?intent=project&type=dev" }, { label: "Marketed Projects", href: "/properties?intent=project&type=marketed" } ] },
//       { title: "By City", links: [ { label: "Lahore", href: "/properties?city=lahore&intent=project" }, { label: "Karachi", href: "/properties?city=karachi&intent=project" }, { label: "Islamabad", href: "/properties?city=islamabad&intent=project" }, { label: "Peshawar", href: "/properties?city=peshawar&intent=project" }, { label: "Quetta", href: "/properties?city=quetta&intent=project" } ] },
//       { title: "By Property Type", links: [ { label: "Apartments", href: "/properties?intent=project&type=apartment" }, { label: "Shops", href: "/properties?intent=project&type=shop" }, { label: "Offices", href: "/properties?intent=project&type=office" }, { label: "Commercial", href: "/properties?intent=project&type=commercial" } ] },
//       { title: "By Budget", links: [ { label: "Under 1 Crore", href: "/properties?intent=project&maxPrice=10000000" }, { label: "Under 5 Crore", href: "/properties?intent=project&maxPrice=50000000" }, { label: "Under 10 Crore", href: "/properties?intent=project&maxPrice=100000000" }, { label: "Under 20 Crore", href: "/properties?intent=project&maxPrice=200000000" } ] },
//     ],
//     cta: { text: "Not sure where to start?", label: "Browse all listings", href: "/properties" },
//   },
//   agents: {
//     label: "Agents",
//     match: ["/agents", "/agencies", "/advertise"],
//     columns: [
//       { title: "Find an Agent", links: [ { label: "Agents in Lahore", href: "/agents?city=lahore" }, { label: "Agents in Karachi", href: "/agents?city=karachi" }, { label: "Agents in Islamabad", href: "/agents?city=islamabad" }, { label: "Agents in Peshawar", href: "/agents?city=peshawar" }, { label: "Agents in Quetta", href: "/agents?city=quetta" }, { label: "All Agents", href: "/agents" } ] },
//       { title: "Agencies", links: [ { label: "Agencies for Houses", href: "/agencies?type=houses" }, { label: "Agencies for Residential Plots", href: "/agencies?type=plots" }, { label: "Agencies for Commercial", href: "/agencies?type=commercial" }, { label: "All Agencies", href: "/agencies" } ] },
//       { title: "For Sellers", links: [ { label: "Go to Dashboard", href: "/dashboard" }, { label: "Advertise on Season Marketing", href: "/advertise" }, { label: "Post a Property", href: "/dashboard/listings/new" } ] },
//     ],
//     cta: { text: "Are you an agent or agency?", label: "Create your profile", href: "/register?role=agent" },
//   },
//   more: {
//     label: "More",
//     match: ["/about", "/help", "/contact", "/legal"],
//     columns: [
//       { title: "Help & Support", links: [ { label: "Contact Us", href: "/contact" }, { label: "About Us", href: "/about" }, { label: "Help Center", href: "/help" } ] },
//       { title: "Legal", links: [ { label: "Privacy Policy", href: "/legal/privacy" }, { label: "Terms of Service", href: "/legal/terms" }, { label: "Cookie Policy", href: "/legal/cookies" }, { label: "Listing Rules", href: "/legal/listing-rules" } ] },
//     ],
//     cta: { text: "Need help right away?", label: "Contact support", href: "/contact" },
//   },
// };

// const MENU_KEYS = Object.keys(MENU_DATA);

// const QUICK_LINKS = [
//   { label: "Buy", href: "/properties?intent=buy", icon: faHouse },
//   { label: "Rent", href: "/properties?intent=rent", icon: faKey },
//   { label: "Map", href: "/map-search", icon: faMapLocationDot },
//   { label: "Agents", href: "/agents", icon: faUserTie },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [mobileSection, setMobileSection] = useState<string | null>(null);
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [shownMenu, setShownMenu] = useState("buy");
//   const [scrolled, setScrolled] = useState(false);
//   const navRef = useRef<HTMLDivElement>(null);
//   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const openMenu = useCallback((key: string) => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     setShownMenu(key);
//     setActiveMenu(key);
//   }, []);

//   const scheduleClose = useCallback(() => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
//   }, []);

//   useEffect(() => {
//     setActiveMenu(null);
//     setIsMobileOpen(false);
//     setMobileSection(null);
//   }, [pathname]);

//   useEffect(() => {
//     const onDown = (e: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(e.target as Node)) {
//         setActiveMenu(null);
//       }
//     };
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setActiveMenu(null);
//         setIsMobileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onDown);
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("mousedown", onDown);
//       document.removeEventListener("keydown", onKey);
//     };
//   }, []);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = isMobileOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isMobileOpen]);

//   // Desktop par resize hone par mobile drawer khud band ho jaye
//   useEffect(() => {
//     const mq = window.matchMedia("(min-width: 1280px)");
//     const onChange = () => { if (mq.matches) setIsMobileOpen(false); };
//     mq.addEventListener("change", onChange);
//     return () => mq.removeEventListener("change", onChange);
//   }, []);

//   const canHover = () =>
//     typeof window !== "undefined" &&
//     window.matchMedia("(hover: hover)").matches;

//   const isActivePath = (m: Menu) =>
//     m.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));

//   const menuOpen = activeMenu !== null;
//   const menu = MENU_DATA[shownMenu];

//   return (
//     <>
//       <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-6 lg:px-8">
//         <div
//           ref={navRef}
//           onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
//           onMouseLeave={() => canHover() && scheduleClose()}
//           className={`relative w-full max-w-7xl rounded-2xl border bg-black px-3 py-2 transition-[box-shadow,border-color] duration-300 sm:px-6 sm:py-2.5 lg:py-2 ${
//             scrolled
//               ? "border-white/15 shadow-2xl shadow-black/60"
//               : "border-white/10 shadow-xl shadow-black/30"
//           }`}
//         >
//           <div className="flex items-center justify-between gap-2 sm:gap-4">

//             {/* LOGO: bada home icon (FontAwesome ke CSS ko override karne ke liye ! lagaya hai) */}
//             <Link
//               href="/"
//               aria-label="Season Marketing home"
//               className="group flex shrink-0 items-center gap-2 text-white sm:gap-3"
//             >
//               <FontAwesomeIcon
//                 icon={faHouse}
//                 className="!h-11 shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-105 min-[400px]:!h-12 sm:!h-14 lg:!h-16"
//               />
//               <span className="whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight min-[400px]:text-xl sm:text-2xl lg:text-3xl lg:leading-none">
//                 <span className="text-white">Season</span>
//                 <span className="text-brand-500">Marketing</span>
//               </span>
//             </Link>

//             {/* DESKTOP NAVIGATION */}
//             <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
//               {MENU_KEYS.map((key) => {
//                 const m = MENU_DATA[key];
//                 const open = activeMenu === key;
//                 const current = isActivePath(m);

//                 return (
//                   <button
//                     key={key}
//                     type="button"
//                     aria-expanded={open}
//                     aria-haspopup="true"
//                     onClick={() => (open ? setActiveMenu(null) : openMenu(key))}
//                     onMouseEnter={() => canHover() && openMenu(key)}
//                     className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
//                       open ? "bg-white/20 text-white" : current ? "text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
//                     }`}
//                   >
//                     {m.label}
//                     <FontAwesomeIcon
//                       icon={faChevronDown}
//                       className={`!h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
//                     />
//                     {current && !open && (
//                       <span aria-hidden="true" className="absolute inset-x-5 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
//                     )}
//                   </button>
//                 );
//               })}
//             </nav>

//             {/* ACTIONS */}
//             <div className="hidden items-center gap-4 xl:flex">
//               <Link href="/sign-in" className="text-sm font-bold text-white transition-colors hover:text-brand-400">
//                 Sign In
//               </Link>
//               <Link
//                 href="/dashboard/listings/new"
//                 className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faPlus} className="!h-3.5" />
//                 Post Property
//               </Link>
//             </div>

//             {/* MOBILE TOGGLE */}
//             <button
//               type="button"
//               onClick={() => setIsMobileOpen((v) => !v)}
//               aria-label={isMobileOpen ? "Close menu" : "Open menu"}
//               aria-expanded={isMobileOpen}
//               className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-12 sm:w-12 xl:hidden"
//             >
//               <FontAwesomeIcon icon={isMobileOpen ? faXmark : faBars} className="!h-5 sm:!h-6" />
//             </button>
//           </div>

//           {/* DESKTOP MEGA MENU */}
//           <div
//             aria-hidden={!menuOpen}
//             className={`absolute left-0 top-full mt-2 hidden w-full transition-[opacity,transform,visibility] duration-200 ease-out xl:block ${
//               menuOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"
//             }`}
//           >
//             <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/80">

//               <button
//                 type="button"
//                 onClick={() => setActiveMenu(null)}
//                 aria-label="Close menu"
//                 className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
//               >
//                 <FontAwesomeIcon icon={faXmark} className="!h-4" />
//               </button>

//               <div className="p-8 pb-7">
//                 <div className={`grid gap-x-8 gap-y-10 ${menu.columns.length >= 4 ? "grid-cols-4" : menu.columns.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
//                   {menu.columns.map((col) => (
//                     <div key={col.title}>
//                       <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-500">{col.title}</h4>
//                       <ul className="space-y-2.5">
//                         {col.links.map((link) => (
//                           <li key={link.label}>
//                             <Link
//                               href={link.href}
//                               tabIndex={menuOpen ? 0 : -1}
//                               onClick={() => setActiveMenu(null)}
//                               className="inline-block text-sm font-medium text-neutral-300 transition-[transform,color] duration-150 hover:translate-x-1 hover:text-white"
//                             >
//                               {link.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/[0.04] px-8 py-4">
//                 <p className="text-sm text-neutral-400">{menu.cta.text}</p>
//                 <Link
//                   href={menu.cta.href}
//                   tabIndex={menuOpen ? 0 : -1}
//                   onClick={() => setActiveMenu(null)}
//                   className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-600"
//                 >
//                   {menu.cta.label}
//                   <FontAwesomeIcon icon={faArrowRight} className="!h-3 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU: hamesha mounted, smooth slide + fade */}
//       <div
//         aria-hidden={!isMobileOpen}
//         onClick={() => setIsMobileOpen(false)}
//         className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-[opacity,visibility] duration-300 xl:hidden ${
//           isMobileOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
//         }`}
//       >
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className={`absolute right-0 top-0 flex h-dvh w-[88%] max-w-sm flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out ${
//             isMobileOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
//             <Link
//               href="/"
//               onClick={() => setIsMobileOpen(false)}
//               tabIndex={isMobileOpen ? 0 : -1}
//               aria-label="Season Marketing home"
//               className="flex items-center gap-2.5"
//             >
//               <FontAwesomeIcon icon={faHouse} className="!h-10 text-brand-500" />
//               <span className="font-display text-xl font-extrabold tracking-tight text-white">
//                 Season<span className="text-brand-500">Marketing</span>
//               </span>
//             </Link>
//             <button
//               type="button"
//               onClick={() => setIsMobileOpen(false)}
//               tabIndex={isMobileOpen ? 0 : -1}
//               aria-label="Close menu"
//               className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
//             >
//               <FontAwesomeIcon icon={faXmark} className="!h-5" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4">
//             <div className="mb-6 grid grid-cols-4 gap-2">
//               {QUICK_LINKS.map((q) => (
//                 <Link
//                   key={q.label}
//                   href={q.href}
//                   tabIndex={isMobileOpen ? 0 : -1}
//                   onClick={() => setIsMobileOpen(false)}
//                   className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold text-white transition-colors hover:border-brand-500 hover:bg-brand-500/10"
//                 >
//                   <FontAwesomeIcon icon={q.icon} className="!h-5 text-brand-400" />
//                   {q.label}
//                 </Link>
//               ))}
//             </div>

//             <div>
//               {MENU_KEYS.map((key) => {
//                 const m = MENU_DATA[key];
//                 const open = mobileSection === key;

//                 return (
//                   <div key={key} className="border-b border-white/10">
//                     <button
//                       type="button"
//                       aria-expanded={open}
//                       onClick={() => setMobileSection(open ? null : key)}
//                       className="flex min-h-[52px] w-full items-center justify-between text-base font-bold text-white"
//                     >
//                       {m.label}
//                       <FontAwesomeIcon icon={faChevronDown} className={`!h-4 text-white/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
//                     </button>
//                     <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
//                       <div className="overflow-hidden">
//                         <div className="grid grid-cols-2 gap-x-4 gap-y-1 pb-4">
//                           {m.columns.map((col) => (
//                             <div key={col.title}>
//                               <p className="mb-1 mt-2 text-[11px] font-bold uppercase tracking-wider text-brand-500">{col.title}</p>
//                               {col.links.map((link) => (
//                                 <Link
//                                   key={link.label}
//                                   href={link.href}
//                                   tabIndex={open && isMobileOpen ? 0 : -1}
//                                   onClick={() => setIsMobileOpen(false)}
//                                   className="block py-2 text-sm text-neutral-300 transition-colors hover:text-white"
//                                 >
//                                   {link.label}
//                                 </Link>
//                               ))}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-t border-white/10 bg-black p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
//             <Link
//               href="/sign-in"
//               tabIndex={isMobileOpen ? 0 : -1}
//               onClick={() => setIsMobileOpen(false)}
//               className="rounded-xl border border-white/20 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-white/10"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/dashboard/listings/new"
//               tabIndex={isMobileOpen ? 0 : -1}
//               onClick={() => setIsMobileOpen(false)}
//               className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faPlus} className="!h-3.5" />
//               Post Property
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoMark from "@/components/ui/LogoMark";
import {
  faBars, faXmark, faPlus, faChevronDown, faArrowRight,
  faMapLocationDot, faKey, faUserTie, faHouse
} from "@fortawesome/free-solid-svg-icons";

interface MenuLink { label: string; href: string }
interface MenuColumn { title: string; links: MenuLink[] }
interface Menu {
  label: string;
  match: string[];
  columns: MenuColumn[];
  cta: { text: string; label: string; href: string };
}

const MENU_DATA: Record<string, Menu> = {
  buy: {
    label: "Buy",
    match: ["/buy"],
    columns: [
      { title: "Category", links: [ { label: "Homes", href: "/properties?intent=buy&category=homes" }, { label: "Plots", href: "/properties?intent=buy&category=plots" }, { label: "Commercial", href: "/properties?intent=buy&category=commercial" } ] },
      { title: "All Homes", links: [ { label: "House", href: "/properties?intent=buy&type=house" }, { label: "Flat", href: "/properties?intent=buy&type=flat" }, { label: "Upper Portion", href: "/properties?intent=buy&type=upper-portion" }, { label: "Lower Portion", href: "/properties?intent=buy&type=lower-portion" }, { label: "Farm House", href: "/properties?intent=buy&type=farm-house" }, { label: "Penthouse", href: "/properties?intent=buy&type=penthouse" }, { label: "Room", href: "/properties?intent=buy&type=room" } ] },
      { title: "Popular Cities", links: [ { label: "Lahore", href: "/properties?city=lahore" }, { label: "Karachi", href: "/properties?city=karachi" }, { label: "Islamabad", href: "/properties?city=islamabad" }, { label: "Peshawar", href: "/properties?city=peshawar" }, { label: "Quetta", href: "/properties?city=quetta" } ] },
      { title: "Ways to Search", links: [ { label: "Map Search", href: "/map-search" }, { label: "Plot Finder", href: "/properties?type=plot" }, { label: "Saved Properties", href: "/dashboard/saved-properties" }, { label: "Find an Agent", href: "/agents" } ] },
    ],
    cta: { text: "Prefer to explore visually?", label: "Search on map", href: "/map-search" },
  },
  rent: {
    label: "Rent",
    match: ["/rent"],
    columns: [
      { title: "Category", links: [ { label: "Homes", href: "/properties?intent=rent&category=homes" }, { label: "Plots", href: "/properties?intent=rent&category=plots" }, { label: "Commercial", href: "/properties?intent=rent&category=commercial" } ] },
      { title: "All Homes", links: [ { label: "House", href: "/properties?intent=rent&type=house" }, { label: "Flat", href: "/properties?intent=rent&type=flat" }, { label: "Upper Portion", href: "/properties?intent=rent&type=upper-portion" }, { label: "Lower Portion", href: "/properties?intent=rent&type=lower-portion" }, { label: "Farm House", href: "/properties?intent=rent&type=farm-house" } ] },
      { title: "Popular Cities", links: [ { label: "Lahore", href: "/properties?city=lahore&intent=rent" }, { label: "Karachi", href: "/properties?city=karachi&intent=rent" }, { label: "Islamabad", href: "/properties?city=islamabad&intent=rent" }, { label: "Peshawar", href: "/properties?city=peshawar&intent=rent" }, { label: "Quetta", href: "/properties?city=quetta&intent=rent" } ] },
      { title: "Ways to Search", links: [ { label: "Map Search", href: "/map-search?intent=rent" }, { label: "Find an Agent", href: "/agents" } ] },
    ],
    cta: { text: "See rentals on the map", label: "Rent on map", href: "/map-search?intent=rent" },
  },
  projects: {
    label: "New Projects",
    match: [],
    columns: [
      { title: "Browse", links: [ { label: "All Projects", href: "/properties?intent=project" }, { label: "Developments", href: "/properties?intent=project&type=dev" }, { label: "Marketed Projects", href: "/properties?intent=project&type=marketed" } ] },
      { title: "By City", links: [ { label: "Lahore", href: "/properties?city=lahore&intent=project" }, { label: "Karachi", href: "/properties?city=karachi&intent=project" }, { label: "Islamabad", href: "/properties?city=islamabad&intent=project" }, { label: "Peshawar", href: "/properties?city=peshawar&intent=project" }, { label: "Quetta", href: "/properties?city=quetta&intent=project" } ] },
      { title: "By Property Type", links: [ { label: "Apartments", href: "/properties?intent=project&type=apartment" }, { label: "Shops", href: "/properties?intent=project&type=shop" }, { label: "Offices", href: "/properties?intent=project&type=office" }, { label: "Commercial", href: "/properties?intent=project&type=commercial" } ] },
      { title: "By Budget", links: [ { label: "Under 1 Crore", href: "/properties?intent=project&maxPrice=10000000" }, { label: "Under 5 Crore", href: "/properties?intent=project&maxPrice=50000000" }, { label: "Under 10 Crore", href: "/properties?intent=project&maxPrice=100000000" }, { label: "Under 20 Crore", href: "/properties?intent=project&maxPrice=200000000" } ] },
    ],
    cta: { text: "Not sure where to start?", label: "Browse all listings", href: "/properties" },
  },
  agents: {
    label: "Agents",
    match: ["/agents", "/agencies", "/advertise"],
    columns: [
      { title: "Find an Agent", links: [ { label: "Agents in Lahore", href: "/agents?city=lahore" }, { label: "Agents in Karachi", href: "/agents?city=karachi" }, { label: "Agents in Islamabad", href: "/agents?city=islamabad" }, { label: "Agents in Peshawar", href: "/agents?city=peshawar" }, { label: "Agents in Quetta", href: "/agents?city=quetta" }, { label: "All Agents", href: "/agents" } ] },
      { title: "Agencies", links: [ { label: "Agencies for Houses", href: "/agencies?type=houses" }, { label: "Agencies for Residential Plots", href: "/agencies?type=plots" }, { label: "Agencies for Commercial", href: "/agencies?type=commercial" }, { label: "All Agencies", href: "/agencies" } ] },
      { title: "For Sellers", links: [ { label: "Go to Dashboard", href: "/dashboard" }, { label: "Advertise on Season Marketing", href: "/advertise" }, { label: "Post a Property", href: "/dashboard/listings/new" } ] },
    ],
    cta: { text: "Are you an agent or agency?", label: "Create your profile", href: "/register?role=agent" },
  },
  more: {
    label: "More",
    match: ["/about", "/help", "/contact", "/legal"],
    columns: [
      { title: "Help & Support", links: [ { label: "Contact Us", href: "/contact" }, { label: "About Us", href: "/about" }, { label: "Help Center", href: "/help" } ] },
      { title: "Legal", links: [ { label: "Privacy Policy", href: "/legal/privacy" }, { label: "Terms of Service", href: "/legal/terms" }, { label: "Cookie Policy", href: "/legal/cookies" }, { label: "Listing Rules", href: "/legal/listing-rules" } ] },
    ],
    cta: { text: "Need help right away?", label: "Contact support", href: "/contact" },
  },
};

const MENU_KEYS = Object.keys(MENU_DATA);

const QUICK_LINKS = [
  { label: "Buy", href: "/properties?intent=buy", icon: faHouse },
  { label: "Rent", href: "/properties?intent=rent", icon: faKey },
  { label: "Map", href: "/map-search", icon: faMapLocationDot },
  { label: "Agents", href: "/agents", icon: faUserTie },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [shownMenu, setShownMenu] = useState("buy");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShownMenu(key);
    setActiveMenu(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setIsMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  // Desktop par resize hone par mobile drawer khud band ho jaye
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => { if (mq.matches) setIsMobileOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  const isActivePath = (m: Menu) =>
    m.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const menuOpen = activeMenu !== null;
  const menu = MENU_DATA[shownMenu];

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-6 lg:px-8">
        <div
          ref={navRef}
          onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
          onMouseLeave={() => canHover() && scheduleClose()}
          className={`relative w-full max-w-7xl rounded-2xl border bg-black px-3 py-2 transition-[box-shadow,border-color] duration-300 sm:px-6 sm:py-2.5 lg:py-2 ${
            scrolled
              ? "border-white/15 shadow-2xl shadow-black/60"
              : "border-white/10 shadow-xl shadow-black/30"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">

            {/* LOGO: bada home mark (plain SVG, koi box/border nahi) */}
            <Link
              href="/"
              aria-label="Season Marketing home"
              className="group flex shrink-0 items-center gap-2 text-white sm:gap-3"
            >
              <LogoMark className="h-11 w-11 shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-105 min-[400px]:h-12 min-[400px]:w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
              <span className="whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight min-[400px]:text-xl sm:text-2xl lg:text-3xl lg:leading-none">
                <span className="text-white">Season</span>
                <span className="text-brand-500">Marketing</span>
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
              {MENU_KEYS.map((key) => {
                const m = MENU_DATA[key];
                const open = activeMenu === key;
                const current = isActivePath(m);

                return (
                  <button
                    key={key}
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => (open ? setActiveMenu(null) : openMenu(key))}
                    onMouseEnter={() => canHover() && openMenu(key)}
                    className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      open ? "bg-white/20 text-white" : current ? "text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {m.label}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`!h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                    {current && !open && (
                      <span aria-hidden="true" className="absolute inset-x-5 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ACTIONS */}
            <div className="hidden items-center gap-4 xl:flex">
              <Link href="/sign-in" className="text-sm font-bold text-white transition-colors hover:text-brand-400">
                Sign In
              </Link>
              <Link
                href="/dashboard/listings/new"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="!h-3.5" />
                Post Property
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-12 sm:w-12 xl:hidden"
            >
              <FontAwesomeIcon icon={isMobileOpen ? faXmark : faBars} className="!h-5 sm:!h-6" />
            </button>
          </div>

          {/* DESKTOP MEGA MENU */}
          <div
            aria-hidden={!menuOpen}
            className={`absolute left-0 top-full mt-2 hidden w-full transition-[opacity,transform,visibility] duration-200 ease-out xl:block ${
              menuOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/80">

              <button
                type="button"
                onClick={() => setActiveMenu(null)}
                aria-label="Close menu"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <FontAwesomeIcon icon={faXmark} className="!h-4" />
              </button>

              <div className="p-8 pb-7">
                <div className={`grid gap-x-8 gap-y-10 ${menu.columns.length >= 4 ? "grid-cols-4" : menu.columns.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {menu.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-500">{col.title}</h4>
                      <ul className="space-y-2.5">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              tabIndex={menuOpen ? 0 : -1}
                              onClick={() => setActiveMenu(null)}
                              className="inline-block text-sm font-medium text-neutral-300 transition-[transform,color] duration-150 hover:translate-x-1 hover:text-white"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/[0.04] px-8 py-4">
                <p className="text-sm text-neutral-400">{menu.cta.text}</p>
                <Link
                  href={menu.cta.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setActiveMenu(null)}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-600"
                >
                  {menu.cta.label}
                  <FontAwesomeIcon icon={faArrowRight} className="!h-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU: hamesha mounted, smooth slide + fade */}
      <div
        aria-hidden={!isMobileOpen}
        onClick={() => setIsMobileOpen(false)}
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-[opacity,visibility] duration-300 xl:hidden ${
          isMobileOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 flex h-dvh w-[88%] max-w-sm flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              tabIndex={isMobileOpen ? 0 : -1}
              aria-label="Season Marketing home"
              className="flex items-center gap-2.5"
            >
              <LogoMark className="h-10 w-10 shrink-0 text-brand-500" />
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Season<span className="text-brand-500">Marketing</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              tabIndex={isMobileOpen ? 0 : -1}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <FontAwesomeIcon icon={faXmark} className="!h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4">
            <div className="mb-6 grid grid-cols-4 gap-2">
              {QUICK_LINKS.map((q) => (
                <Link
                  key={q.label}
                  href={q.href}
                  tabIndex={isMobileOpen ? 0 : -1}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold text-white transition-colors hover:border-brand-500 hover:bg-brand-500/10"
                >
                  <FontAwesomeIcon icon={q.icon} className="!h-5 text-brand-400" />
                  {q.label}
                </Link>
              ))}
            </div>

            <div>
              {MENU_KEYS.map((key) => {
                const m = MENU_DATA[key];
                const open = mobileSection === key;

                return (
                  <div key={key} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setMobileSection(open ? null : key)}
                      className="flex min-h-[52px] w-full items-center justify-between text-base font-bold text-white"
                    >
                      {m.label}
                      <FontAwesomeIcon icon={faChevronDown} className={`!h-4 text-white/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pb-4">
                          {m.columns.map((col) => (
                            <div key={col.title}>
                              <p className="mb-1 mt-2 text-[11px] font-bold uppercase tracking-wider text-brand-500">{col.title}</p>
                              {col.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  tabIndex={open && isMobileOpen ? 0 : -1}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="block py-2 text-sm text-neutral-300 transition-colors hover:text-white"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/10 bg-black p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link
              href="/sign-in"
              tabIndex={isMobileOpen ? 0 : -1}
              onClick={() => setIsMobileOpen(false)}
              className="rounded-xl border border-white/20 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard/listings/new"
              tabIndex={isMobileOpen ? 0 : -1}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="!h-3.5" />
              Post Property
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}