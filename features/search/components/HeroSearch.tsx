// "use client";

// import { useMemo, useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faLocationDot,
//   faChevronDown,
//   faBuilding,
//   faHouse,
//   faKey,
//   faPlus,
//   faSliders,
//   faMapLocationDot,
//   faCheck,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   AREA_UNITS,
//   BATHROOM_OPTIONS,
//   BEDROOM_OPTIONS,
//   LISTED_WITHIN,
//   type Intent,
// } from "@/lib/constants/search";
// import { formatPkr } from "@/lib/formatters/currency";
// import { allProperties, NAV_CITIES } from "@/lib/constants/data";

// // --- DATA ---
// const CATEGORY_GROUPS = [
//   { value: "homes:", label: "All Homes" }, { value: "homes:house", label: "House" }, { value: "homes:flat", label: "Flat" }, { value: "homes:upper-portion", label: "Upper Portion" }, { value: "homes:lower-portion", label: "Lower Portion" }, { value: "homes:farm-house", label: "Farm House" }, { value: "homes:penthouse", label: "Penthouse" }, { value: "homes:room", label: "Room" },
//   { value: "plots:", label: "All Plots" }, { value: "plots:residential-plot", label: "Residential Plot" }, { value: "plots:commercial-plot", label: "Commercial Plot" },
//   { value: "commercial:", label: "All Commercial" }, { value: "commercial:shop", label: "Shop" }, { value: "commercial:office", label: "Office" },
// ];

// const BUY_PRICES = [2500000, 5000000, 10000000, 20000000, 30000000, 50000000, 75000000];
// const RENT_PRICES = [15000, 25000, 50000, 75000, 100000, 150000, 200000];

// const LOCALITIES = Array.from(
//   new Map(allProperties.map((p) => [p.location, { name: p.location.split(",")[0].trim(), city: p.city }])).values()
// );

// interface Tab {
//   key: Intent | "sell";
//   label: string;
//   icon: IconDefinition;
//   href?: string;
// }

// const TABS: Tab[] = [
//   { key: "buy", label: "Buy", icon: faHouse },
//   { key: "rent", label: "Rent", icon: faKey },
//   { key: "sell", label: "Sell", icon: faPlus, href: "/dashboard/listings/new" },
// ];

// // --- REUSABLE CUSTOM DROPDOWN ---
// const CustomDropdown = ({ 
//   options, value, onChange, placeholder, icon
// }: { 
//   options: { value: string; label: string }[]; 
//   value: string; 
//   onChange: (val: string) => void; 
//   placeholder: string;
//   icon?: IconDefinition;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

//   return (
//     <div className="relative w-full" ref={ref}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-white/10 ${isOpen ? "border-brand-500/50 bg-white/10" : ""}`}
//       >
//         <div className="flex items-center gap-2 truncate">
//           {icon && <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5 shrink-0 text-brand-400" />}
//           <span className="truncate">{selectedLabel}</span>
//         </div>
//         <FontAwesomeIcon icon={faChevronDown} className={`h-2.5 w-2.5 shrink-0 text-white/50 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-full min-w-[200px] overflow-y-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-xl animate-in fade-in zoom-in-95 duration-100">
//           <button
//             onClick={() => { onChange(""); setIsOpen(false); }}
//             className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] font-medium transition hover:bg-neutral-100 ${!value ? "text-brand-600 bg-brand-50" : "text-neutral-700"}`}
//           >
//             {placeholder}
//             {!value && <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />}
//           </button>
//           {options.map((opt) => (
//             <button
//               key={opt.value}
//               onClick={() => { onChange(opt.value); setIsOpen(false); }}
//               className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] font-medium transition hover:bg-neutral-100 ${value === opt.value ? "text-brand-600 bg-brand-50" : "text-neutral-700"}`}
//             >
//               {opt.label}
//               {value === opt.value && <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default function HeroSearch({ defaultTab = "buy" }: { defaultTab?: Intent }) {
//   const router = useRouter();
//   const [tab, setTab] = useState<Intent>(defaultTab);
  
//   // Main Filters
//   const [city, setCity] = useState("");
//   const [category, setCategory] = useState("");
//   const [locality, setLocality] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
  
//   // More Filters
//   const [more, setMore] = useState(false);
//   const [beds, setBeds] = useState("");
//   const [baths, setBaths] = useState("");
//   const [areaMin, setAreaMin] = useState("");
//   const [areaMax, setAreaMax] = useState("");
//   const [unit, setUnit] = useState("marla");
//   const [furnishing, setFurnishing] = useState("");
//   const [parking, setParking] = useState("");
//   const [added, setAdded] = useState("");
//   const [idChecked, setIdChecked] = useState(false);
//   const [available, setAvailable] = useState(false);
//   const [error, setError] = useState("");

//   const localityOptions = useMemo(
//     () => Array.from(new Set(LOCALITIES.filter((l) => !city || l.city === city).map((l) => l.name))),
//     [city]
//   );
//   const priceOptions = (tab === "rent" ? RENT_PRICES : BUY_PRICES).map(v => ({ value: String(v), label: `PKR ${formatPkr(v)}` }));

//   const extraCount = [beds, baths, areaMin, areaMax, furnishing, parking, added]
//     .filter(Boolean).length + (idChecked ? 1 : 0) + (available ? 1 : 0);

//   const handleTabClick = (t: Tab) => {
//     if (t.href) router.push(t.href);
//     else {
//       setTab(t.key as Intent);
//       setMinPrice("");
//       setMaxPrice("");
//       if (t.key !== "rent") setFurnishing("");
//     }
//   };

//   const buildParams = () => {
//     const p = new URLSearchParams();
//     const add = (k: string, v: string) => v.trim() && p.set(k, v.trim());
//     p.set("intent", tab);
//     add("city", city);
//     if (tab !== "project") {
//       const [cat, type] = category.split(":");
//       add("category", cat ?? "");
//       add("type", type ?? "");
//     }
//     add("locality", locality);
//     add("minPrice", minPrice);
//     add("maxPrice", maxPrice);
//     add("beds", beds);
//     add("baths", baths);
//     if (areaMin || areaMax) {
//       add("areaMin", areaMin);
//       add("areaMax", areaMax);
//       p.set("unit", unit);
//     }
//     add("furnishing", furnishing);
//     add("parking", parking);
//     add("added", added);
//     if (idChecked) p.set("idChecked", "1");
//     if (available) p.set("available", "confirmed");
//     return p;
//   };

//   const validate = () => {
//     if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
//       setError("Min price cannot be greater than Max price.");
//       return false;
//     }
//     if (areaMin && areaMax && Number(areaMin) > Number(areaMax)) {
//       setError("Min area cannot be greater than Max area.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     router.push(`/properties?${buildParams().toString()}`);
//   };

//   const handleMap = () => {
//     if (!validate()) return;
//     const p = new URLSearchParams();
//     p.set("intent", tab === "rent" ? "rent" : "buy");
//     if (city) p.set("city", city);
//     if (locality.trim()) p.set("q", locality.trim());
//     router.push(`/map-search?${p.toString()}`);
//   };

//   return (
//     <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl sm:p-3">
      
//       {/* Tabs */}
//       <div role="tablist" className="mb-2 flex gap-1 border-b border-white/10 pb-2 sm:mb-3 sm:pb-3">
//         {TABS.map((t) => {
//           const active = tab === t.key && !t.href;
//           return (
//             <button
//               key={t.key}
//               type="button"
//               onClick={() => handleTabClick(t)}
//               className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-colors duration-150 sm:text-sm ${
//                 active ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <FontAwesomeIcon icon={t.icon} className="h-3.5 w-3.5" />
//               {t.label}
//             </button>
//           );
//         })}
//       </div>

//       <form onSubmit={handleSearch} noValidate>
        
//         {/* Main Row - 2 cols on mobile, 5 cols on desktop */}
//         <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
          
//           <CustomDropdown options={NAV_CITIES.map(c => ({ value: c.slug, label: c.name }))} value={city} onChange={setCity} placeholder="City" icon={faLocationDot} />
//           <CustomDropdown options={CATEGORY_GROUPS} value={category} onChange={setCategory} placeholder="Type" icon={faBuilding} />

//           <div className="relative col-span-2 flex h-11 w-full items-center rounded-lg border border-white/10 bg-white/5 px-3 transition-colors duration-150 focus-within:bg-white/10 lg:col-span-1">
//             <input
//               type="text"
//               value={locality}
//               onChange={(e) => setLocality(e.target.value)}
//               placeholder="Locality"
//               list="hero-localities"
//               autoComplete="off"
//               className="w-full border-none bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/50"
//             />
//             <datalist id="hero-localities">
//               {localityOptions.map((n) => <option key={n} value={n} />)}
//             </datalist>
//           </div>

//           <CustomDropdown options={priceOptions} value={minPrice} onChange={setMinPrice} placeholder="Min Price" />
//           <CustomDropdown options={priceOptions} value={maxPrice} onChange={setMaxPrice} placeholder="Max Price" />
//         </div>

//         {/* Search Button - Small Size */}
//         <button
//           type="submit"
//           className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
//         >
//           <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
//           Search
//         </button>

//         {error && <p role="alert" className="mt-2 rounded-lg bg-red-500/90 px-3 py-2 text-left text-xs font-semibold text-white">{error}</p>}

//         {/* More filters - ALL FILTERS INCLUDED */}
//         {more && (
//           <div className="mt-3 border-t border-white/10 pt-3">
//             <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
//               <CustomDropdown options={BEDROOM_OPTIONS.map(o => ({ value: o, label: `${o} Beds` }))} value={beds} onChange={setBeds} placeholder="Beds" />
//               <CustomDropdown options={BATHROOM_OPTIONS.map(o => ({ value: o, label: `${o} Baths` }))} value={baths} onChange={setBaths} placeholder="Baths" />
//               <CustomDropdown options={[{ value: "yes", label: "With parking" }]} value={parking} onChange={setParking} placeholder="Parking" />
//               {tab === "rent" && (
//                 <CustomDropdown options={[{ value: "furnished", label: "Furnished" }, { value: "unfurnished", label: "Unfurnished" }]} value={furnishing} onChange={setFurnishing} placeholder="Furnishing" />
//               )}
//               <CustomDropdown options={LISTED_WITHIN.map(o => ({ value: o.value, label: o.label }))} value={added} onChange={setAdded} placeholder="Listed" />
              
//               {/* Area Min/Max inputs */}
//               <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2">
//                 <input type="number" min="0" placeholder="Area Min" value={areaMin} onChange={(e) => setAreaMin(e.target.value)} className="w-full bg-transparent py-2 text-[13px] font-medium text-white outline-none placeholder:text-white/50" />
//               </div>
//               <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2">
//                 <input type="number" min="0" placeholder="Area Max" value={areaMax} onChange={(e) => setAreaMax(e.target.value)} className="w-full bg-transparent py-2 text-[13px] font-medium text-white outline-none placeholder:text-white/50" />
//               </div>
              
//               <CustomDropdown options={AREA_UNITS.map(o => ({ value: o.value, label: o.label }))} value={unit} onChange={setUnit} placeholder="Unit" />
//             </div>

//             <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-white/80">
//               <label className="flex cursor-pointer items-center gap-1.5">
//                 <input type="checkbox" checked={idChecked} onChange={(e) => setIdChecked(e.target.checked)} className="h-3.5 w-3.5 rounded border-white/30 bg-white/10 accent-brand-500" />
//                 Identity checked
//               </label>
//               <label className="flex cursor-pointer items-center gap-1.5">
//                 <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="h-3.5 w-3.5 rounded border-white/30 bg-white/10 accent-brand-500" />
//                 Availability confirmed
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Bottom bar */}
//         <div className="mt-3 flex items-center justify-between">
//           <button
//             type="button"
//             onClick={() => setMore((v) => !v)}
//             className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 transition-colors duration-150 hover:text-white"
//           >
//             <FontAwesomeIcon icon={faSliders} className="h-3 w-3" />
//             {more ? "Fewer filters" : "More filters"}
//             {extraCount > 0 && (
//               <span className="rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{extraCount}</span>
//             )}
//           </button>
//           <button
//             type="button"
//             onClick={handleMap}
//             className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 transition-colors duration-150 hover:text-white"
//           >
//             <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3" />
//             Map view
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
  faChevronDown,
  faBuilding,
  faHouse,
  faKey,
  faPlus,
  faSliders,
  faMapLocationDot,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  AREA_UNITS,
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  LISTED_WITHIN,
  type Intent,
} from "@/lib/constants/search";
import { formatPkr } from "@/lib/formatters/currency";
import { allProperties, NAV_CITIES } from "@/lib/constants/data";

const CATEGORY_GROUPS = [
  { value: "homes:", label: "All Homes" }, { value: "homes:house", label: "House" }, { value: "homes:flat", label: "Flat" }, { value: "homes:upper-portion", label: "Upper Portion" }, { value: "homes:lower-portion", label: "Lower Portion" }, { value: "homes:farm-house", label: "Farm House" }, { value: "homes:penthouse", label: "Penthouse" }, { value: "homes:room", label: "Room" },
  { value: "plots:", label: "All Plots" }, { value: "plots:residential-plot", label: "Residential Plot" }, { value: "plots:commercial-plot", label: "Commercial Plot" },
  { value: "commercial:", label: "All Commercial" }, { value: "commercial:shop", label: "Shop" }, { value: "commercial:office", label: "Office" },
];

const BUY_PRICES = [2500000, 5000000, 10000000, 20000000, 30000000, 50000000, 75000000];
const RENT_PRICES = [15000, 25000, 50000, 75000, 100000, 150000, 200000];

const LOCALITIES = Array.from(
  new Map(allProperties.map((p) => [p.location, { name: p.location.split(",")[0].trim(), city: p.city }])).values()
);

interface Tab {
  key: Intent | "sell";
  label: string;
  icon: IconDefinition;
  href?: string;
}

const TABS: Tab[] = [
  { key: "buy", label: "Buy", icon: faHouse },
  { key: "rent", label: "Rent", icon: faKey },
  { key: "sell", label: "Sell", icon: faPlus, href: "/dashboard/listings/new" },
];

const CustomDropdown = ({ options, value, onChange, placeholder, icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedLabel = options.find((o: any) => o.value === value)?.label || placeholder;

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-white/10 ${isOpen ? "border-brand-500/50 bg-white/10" : ""}`}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5 shrink-0 text-brand-400" />}
          <span className="truncate">{selectedLabel}</span>
        </div>
        <FontAwesomeIcon icon={faChevronDown} className={`h-2.5 w-2.5 shrink-0 text-white/50 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-full min-w-[200px] overflow-y-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-xl">
          <button onClick={() => { onChange(""); setIsOpen(false); }} className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] font-medium ${!value ? "text-brand-600 bg-brand-50" : "text-neutral-700 hover:bg-neutral-100"}`}>
            {placeholder} {!value && <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />}
          </button>
          {options.map((opt: any) => (
            <button key={opt.value} onClick={() => { onChange(opt.value); setIsOpen(false); }} className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] font-medium ${value === opt.value ? "text-brand-600 bg-brand-50" : "text-neutral-700 hover:bg-neutral-100"}`}>
              {opt.label} {value === opt.value && <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HeroSearch({ defaultTab = "buy" }: { defaultTab?: Intent }) {
  const router = useRouter();
  const [tab, setTab] = useState<Intent>(defaultTab);
  
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [locality, setLocality] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const [more, setMore] = useState(false);
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [unit, setUnit] = useState("marla");
  const [furnishing, setFurnishing] = useState("");
  const [parking, setParking] = useState("");
  const [added, setAdded] = useState("");
  const [idChecked, setIdChecked] = useState(false);
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState("");

  const localityOptions = useMemo(
    () => Array.from(new Set(LOCALITIES.filter((l) => !city || l.city === city).map((l) => l.name))),
    [city]
  );
  const priceOptions = (tab === "rent" ? RENT_PRICES : BUY_PRICES).map(v => ({ value: String(v), label: `PKR ${formatPkr(v)}` }));

  const extraCount = [beds, baths, areaMin, areaMax, furnishing, parking, added]
    .filter(Boolean).length + (idChecked ? 1 : 0) + (available ? 1 : 0);

  const handleTabClick = (t: Tab) => {
    if (t.href) router.push(t.href);
    else {
      setTab(t.key as Intent);
      setMinPrice("");
      setMaxPrice("");
      if (t.key !== "rent") setFurnishing("");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError("Min price cannot be greater than Max price."); return;
    }
    setError("");
    
    const p = new URLSearchParams();
    const add = (k: string, v: string) => v.trim() && p.set(k, v.trim());
    p.set("intent", tab);
    add("city", city);
    if (tab !== "project") {
      const [cat, type] = category.split(":");
      add("category", cat ?? ""); add("type", type ?? "");
    }
    add("locality", locality);
    add("minPrice", minPrice); add("maxPrice", maxPrice);
    add("beds", beds); add("baths", baths);
    if (areaMin || areaMax) { add("areaMin", areaMin); add("areaMax", areaMax); p.set("unit", unit); }
    add("furnishing", furnishing); add("parking", parking); add("added", added);
    if (idChecked) p.set("idChecked", "1");
    if (available) p.set("available", "confirmed");
    
    router.push(`/properties?${p.toString()}`);
  };

  const handleMap = () => {
    const p = new URLSearchParams();
    p.set("intent", tab === "rent" ? "rent" : "buy");
    if (city) p.set("city", city);
    if (locality.trim()) p.set("q", locality.trim());
    router.push(`/map-search?${p.toString()}`);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl sm:p-3">
      
      {/* Tabs */}
      <div role="tablist" className="mb-2 flex gap-1 border-b border-white/10 pb-2 sm:mb-3 sm:pb-3">
        {TABS.map((t) => {
          const active = tab === t.key && !t.href;
          return (
            <button key={t.key} type="button" onClick={() => handleTabClick(t)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-colors duration-150 sm:text-sm ${active ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
              <FontAwesomeIcon icon={t.icon} className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSearch} noValidate>
        
        {/* Main Row */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
          <CustomDropdown options={NAV_CITIES.map(c => ({ value: c.slug, label: c.name }))} value={city} onChange={setCity} placeholder="City" icon={faLocationDot} />
          <CustomDropdown options={CATEGORY_GROUPS} value={category} onChange={setCategory} placeholder="Type" icon={faBuilding} />

          <div className="relative col-span-2 flex h-11 w-full items-center rounded-lg border border-white/10 bg-white/5 px-3 transition-colors duration-150 focus-within:bg-white/10 lg:col-span-1">
            <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Locality" list="hero-localities" autoComplete="off" className="w-full border-none bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/50" />
            <datalist id="hero-localities">{localityOptions.map((n) => <option key={n} value={n} />)}</datalist>
          </div>

          <CustomDropdown options={priceOptions} value={minPrice} onChange={setMinPrice} placeholder="Min Price" />
          <CustomDropdown options={priceOptions} value={maxPrice} onChange={setMaxPrice} placeholder="Max Price" />
        </div>

        {/* Search Button - Compact */}
        <button type="submit" className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
          Search
        </button>

        {error && <p role="alert" className="mt-2 rounded-lg bg-red-500/90 px-3 py-2 text-left text-xs font-semibold text-white">{error}</p>}

        {/* More filters */}
        {more && (
          <div className="mt-3 border-t border-white/10 pt-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              <CustomDropdown options={BEDROOM_OPTIONS.map(o => ({ value: o, label: `${o} Beds` }))} value={beds} onChange={setBeds} placeholder="Beds" />
              <CustomDropdown options={BATHROOM_OPTIONS.map(o => ({ value: o, label: `${o} Baths` }))} value={baths} onChange={setBaths} placeholder="Baths" />
              <CustomDropdown options={[{ value: "yes", label: "With parking" }]} value={parking} onChange={setParking} placeholder="Parking" />
              {tab === "rent" && <CustomDropdown options={[{ value: "furnished", label: "Furnished" }, { value: "unfurnished", label: "Unfurnished" }]} value={furnishing} onChange={setFurnishing} placeholder="Furnishing" />}
              <CustomDropdown options={LISTED_WITHIN.map(o => ({ value: o.value, label: o.label }))} value={added} onChange={setAdded} placeholder="Listed" />
              
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2">
                <input type="number" min="0" placeholder="Area Min" value={areaMin} onChange={(e) => setAreaMin(e.target.value)} className="w-full bg-transparent py-2 text-[13px] font-medium text-white outline-none placeholder:text-white/50" />
              </div>
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2">
                <input type="number" min="0" placeholder="Area Max" value={areaMax} onChange={(e) => setAreaMax(e.target.value)} className="w-full bg-transparent py-2 text-[13px] font-medium text-white outline-none placeholder:text-white/50" />
              </div>
              
              <CustomDropdown options={AREA_UNITS.map(o => ({ value: o.value, label: o.label }))} value={unit} onChange={setUnit} placeholder="Unit" />
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-white/80">
              <label className="flex cursor-pointer items-center gap-1.5">
                <input type="checkbox" checked={idChecked} onChange={(e) => setIdChecked(e.target.checked)} className="h-3.5 w-3.5 rounded border-white/30 bg-white/10 accent-brand-500" />
                Identity checked
              </label>
              <label className="flex cursor-pointer items-center gap-1.5">
                <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="h-3.5 w-3.5 rounded border-white/30 bg-white/10 accent-brand-500" />
                Availability confirmed
              </label>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-3 flex items-center justify-between">
          <button type="button" onClick={() => setMore((v) => !v)} className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 transition-colors duration-150 hover:text-white">
            <FontAwesomeIcon icon={faSliders} className="h-3 w-3" />
            {more ? "Fewer filters" : "More filters"}
            {extraCount > 0 && <span className="rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{extraCount}</span>}
          </button>
          <button type="button" onClick={handleMap} className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 transition-colors duration-150 hover:text-white">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3" />
            Map view
          </button>
        </div>
      </form>
    </div>
  );
}