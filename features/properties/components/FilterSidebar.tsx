"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function FilterSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filterContent = (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Price Range (PKR)</h4>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <span className="text-neutral-400">-</span>
          <input type="number" placeholder="Max" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500" />
        </div>
      </div>

      {/* Area */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Area</h4>
        <div className="flex gap-2">
          <input type="number" placeholder="Size" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <select className="w-24 rounded-lg border border-neutral-300 px-2 py-2 text-sm outline-none focus:border-brand-500">
            <option>Marla</option>
            <option>Kanal</option>
            <option>Sq Ft</option>
          </select>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {["Any", "1", "2", "3", "4", "5+"].map((bed) => (
            <button key={bed} className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600">
              {bed}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Bathrooms</h4>
        <div className="flex flex-wrap gap-2">
          {["Any", "1", "2", "3", "4+"].map((bath) => (
            <button key={bath} className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600">
              {bath}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities (Optional for P0) */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-ink">Amenities</h4>
        <div className="space-y-2">
          {["Furnished", "Parking", "Swimming Pool"].map((item) => (
            <label key={item} className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-500" />
              <span className="text-sm text-neutral-600">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-3 font-bold text-ink shadow-sm lg:hidden"
      >
        <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
        Filters
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:block">
        <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-4">
          <h3 className="font-bold text-ink">Filters</h3>
          <button className="text-xs font-semibold text-brand-600 hover:underline">Reset</button>
        </div>
        {filterContent}
        <button className="mt-8 w-full rounded-xl bg-ink py-3 text-sm font-bold text-white transition hover:bg-brand-500">
          Apply Filters
        </button>
      </div>

      {/* Mobile Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/50 lg:hidden">
          <div className="mt-auto flex h-[85vh] flex-col rounded-t-3xl bg-white p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Filters</h3>
              <button onClick={() => setIsMobileOpen(false)} className="rounded-full bg-neutral-100 p-2 text-neutral-500">
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-6">
              {filterContent}
            </div>

            <div className="border-t border-neutral-100 pt-4">
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}