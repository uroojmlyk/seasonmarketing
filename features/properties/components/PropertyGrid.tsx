"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyCard from "@/features/properties/components/PropertyCard";
import { allProperties } from "@/lib/constants/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronDown, faFilter, faXmark, faHouse, faLocationDot 
} from "@fortawesome/free-solid-svg-icons";

const BEDS = ["Any", "1", "2", "3", "4", "5+"];
const BATHS = ["Any", "1", "2", "3", "4+"];

export default function PropertyGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [beds, setBeds] = useState<string>(searchParams.get("beds") || "Any");
  const [baths, setBaths] = useState<string>(searchParams.get("baths") || "Any");
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("maxPrice") || "");
  const [areaMin, setAreaMin] = useState<string>("");
  const [areaMax, setAreaMax] = useState<string>("");
  const [unit, setUnit] = useState<string>("Marla");
  const [sort, setSort] = useState<string>("newest");

  // URL Parameters
  const intent = searchParams.get("intent") || "buy";
  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const locality = (searchParams.get("locality") || "").trim().toLowerCase();

  // Filter Logic
  const filteredProperties = useMemo(() => {
    const effIntent = intent === "project" ? "buy" : intent;
    const TYPE_ALIAS: Record<string, { type?: string; category?: string }> = {
      plot: { category: "plots" },
      apartment: { type: "flat" },
      commercial: { category: "commercial" },
    };
    const alias = TYPE_ALIAS[type];
    const urlType = alias ? alias.type || "" : type;
    const urlCategory = alias?.category || category;

    const list = allProperties.filter((p) => {
      if (effIntent && p.intent !== effIntent) return false;
      if (city && p.city !== city) return false;
      
      const finalCategory = selectedCategory || urlCategory;
      if (finalCategory && p.category !== finalCategory) return false;
      
      const finalType = selectedType || urlType;
      if (finalType && p.type !== finalType) return false;

      if (maxPrice && p.priceValue > Number(maxPrice)) return false;
      if (minPrice && p.priceValue < Number(minPrice)) return false;
      
      if (locality && !p.location.toLowerCase().includes(locality)) return false;
      
      if (beds !== "Any" && p.beds && p.beds < parseInt(beds)) return false;
      if (baths !== "Any" && p.baths && p.baths < parseInt(baths)) return false;

      return true;
    });

    if (sort === "price-asc") list.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") list.sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [intent, city, category, type, locality, selectedCategory, selectedType, beds, baths, minPrice, maxPrice, sort]);

  const FilterContent = () => (
    <div className="space-y-6">
      
      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Price Range</h4>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min PKR" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <span className="text-neutral-400">-</span>
          <input type="number" placeholder="Max PKR" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500" />
        </div>
      </div>

      {/* Area */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Area Size</h4>
        <div className="flex items-center gap-2 mb-2">
          <input type="number" placeholder="Min" value={areaMin} onChange={(e) => setAreaMin(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <span className="text-neutral-400">-</span>
          <input type="number" placeholder="Max" value={areaMax} onChange={(e) => setAreaMax(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500" />
        </div>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">
          <option>Marla</option>
          <option>Kanal</option>
          <option>Sq Ft</option>
          <option>Sq Yd</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Category</h4>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-brand-500">
          <option value="">All Categories</option>
          <option value="homes">Homes</option>
          <option value="plots">Plots</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Property Type</h4>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-brand-500">
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="flat">Flat</option>
          <option value="upper-portion">Upper Portion</option>
          <option value="lower-portion">Lower Portion</option>
          <option value="farm-house">Farm House</option>
          <option value="penthouse">Penthouse</option>
          <option value="room">Room</option>
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {BEDS.map((b) => (
            <button key={b} onClick={() => setBeds(b)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${beds === b ? "border-brand-500 bg-brand-50 text-brand-600" : "border-neutral-200 bg-white text-neutral-600 hover:border-brand-500"}`}>
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Bathrooms</h4>
        <div className="flex flex-wrap gap-2">
          {BATHS.map((b) => (
            <button key={b} onClick={() => setBaths(b)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${baths === b ? "border-brand-500 bg-brand-50 text-brand-600" : "border-neutral-200 bg-white text-neutral-600 hover:border-brand-500"}`}>
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Bar - Fully Responsive */}
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Side */}
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-start">
          <button 
            onClick={() => setIsFilterOpen(true)} 
            className="flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-bold text-ink transition hover:bg-neutral-50 lg:hidden"
          >
            <FontAwesomeIcon icon={faFilter} className="h-4 w-4" /> Filters
          </button>
          
          <p className="text-sm font-medium text-neutral-600">
            Showing <span className="font-bold text-ink">{filteredProperties.length}</span> results
          </p>
        </div>

        {/* Right Side - Map Button & Sort */}
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
          
          {/* Map Button with Location Icon */}
          <button 
            onClick={() => router.push("/map-search")}
            className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
            <span className="hidden sm:inline">Map View</span>
            <span className="sm:hidden">Map</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-neutral-500 sm:inline">Sort:</span>
            <div className="relative">
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)} 
                className="appearance-none rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-3 pr-8 text-sm font-bold text-ink outline-none focus:border-brand-500"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar (Desktop) */}
        <div className="hidden w-72 shrink-0 lg:block">
           <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="font-bold text-ink">Filters</h3>
              <button 
                onClick={() => { setSelectedCategory(""); setSelectedType(""); setBeds("Any"); setBaths("Any"); setMinPrice(""); setMaxPrice(""); }} 
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Reset
              </button>
            </div>
            <FilterContent />
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((p) => (
                <PropertyCard key={p.slug} item={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">No properties found</h3>
              <p className="mt-2 max-w-sm text-sm text-neutral-500">Try adjusting your filters or location to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
         <div className="fixed inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="mt-auto flex h-[85vh] flex-col rounded-t-3xl border-t border-white/40 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="rounded-full bg-neutral-100 p-2 text-ink">
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-6">
              <FilterContent />
            </div>
            <div className="border-t border-neutral-200 pt-4">
              <button onClick={() => setIsFilterOpen(false)} className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600">
                Show {filteredProperties.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}