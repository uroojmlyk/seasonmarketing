// // "use client";

// // import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// // import { useSearchParams } from "next/navigation";
// // import Link from "next/link";
// // import "leaflet/dist/leaflet.css";
// // import { allProperties, NAV_CITIES } from "@/lib/constants/data";
// // import type { Property } from "@/lib/constants/data";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faLocationDot, faXmark, faBed, faBath, faRulerCombined,
// //   faMagnifyingGlass, faList, faMap, faRotateLeft, faChevronDown,
// // } from "@fortawesome/free-solid-svg-icons";

// // const PAKISTAN_CENTER: [number, number] = [30.3753, 69.3451];
// // const LIST_LIMIT = 40;

// // const TYPE_OPTIONS = [
// //   { value: "", label: "All Types" },
// //   { value: "house", label: "House" },
// //   { value: "flat", label: "Flat" },
// //   { value: "upper-portion", label: "Upper Portion" },
// //   { value: "lower-portion", label: "Lower Portion" },
// //   { value: "farm-house", label: "Farm House" },
// //   { value: "penthouse", label: "Penthouse" },
// //   { value: "room", label: "Room" },
// //   { value: "residential-plot", label: "Residential Plot" },
// //   { value: "commercial-plot", label: "Commercial Plot" },
// //   { value: "shop", label: "Shop" },
// //   { value: "office", label: "Office" },
// // ];

// // const PRICE_OPTIONS = {
// //   buy: [
// //     { value: 0, label: "Any Price" },
// //     { value: 5000000, label: "Up to 50 Lac" },
// //     { value: 10000000, label: "Up to 1 Crore" },
// //     { value: 20000000, label: "Up to 2 Crore" },
// //     { value: 50000000, label: "Up to 5 Crore" },
// //     { value: 100000000, label: "Up to 10 Crore" },
// //   ],
// //   rent: [
// //     { value: 0, label: "Any Price" },
// //     { value: 50000, label: "Up to 50K / month" },
// //     { value: 100000, label: "Up to 100K / month" },
// //     { value: 200000, label: "Up to 200K / month" },
// //     { value: 400000, label: "Up to 400K / month" },
// //   ],
// // };

// // const PAK_BOUNDS: [[number, number], [number, number]] = [[24.2, 61.0], [37.0, 76.5]];

// // const areaName = (loc: string) => loc.split(",")[0].trim();

// // // Har area (location) ki list + uska center, taake Area filter aur map dono use karein
// // const AREAS = Array.from(
// //   new Map(allProperties.map((p) => [p.location, { location: p.location, city: p.city }])).values()
// // ).sort((a, b) => a.location.localeCompare(b.location));

// // const AREA_CENTER = new Map<string, [number, number]>();
// // {
// //   const acc = new Map<string, { lat: number; lng: number; n: number }>();
// //   allProperties.forEach((p) => {
// //     if (!p.lat || !p.lng) return;
// //     const c = acc.get(p.location) || { lat: 0, lng: 0, n: 0 };
// //     c.lat += p.lat; c.lng += p.lng; c.n += 1;
// //     acc.set(p.location, c);
// //   });
// //   acc.forEach((c, k) => AREA_CENTER.set(k, [c.lat / c.n, c.lng / c.n]));
// // }

// // // "2.5 Cr", "85 Lac", "75K" jaisa chota label pin ke liye
// // function shortPrice(p: Property) {
// //   const v = p.priceValue;
// //   if (p.intent === "rent") return `${Math.round(v / 1000)}K`;
// //   if (v >= 10000000) return `${Number((v / 10000000).toFixed(2))} Cr`;
// //   return `${Math.round(v / 100000)} Lac`;
// // }

// // const selectCls =
// //   "h-10 appearance-none rounded-lg border border-neutral-200 bg-white pl-3 pr-8 text-sm font-semibold text-ink outline-none transition hover:border-neutral-300 focus:border-brand-500";

// // export default function MapSearch() {
// //   const searchParams = useSearchParams();

// //   const [isReady, setIsReady] = useState(false);
// //   const [intent, setIntent] = useState<"buy" | "rent">(
// //     searchParams.get("intent") === "rent" ? "rent" : "buy"
// //   );
// //   const [city, setCity] = useState<string>(searchParams.get("city") || "");
// //   const [area, setArea] = useState<string>("");
// //   const [type, setType] = useState<string>("");
// //   const [maxPrice, setMaxPrice] = useState<number>(0);
// //   const [query, setQuery] = useState<string>(searchParams.get("q") || "");
// //   const [bounds, setBounds] = useState<any>(null);
// //   const [activeProperty, setActiveProperty] = useState<Property | null>(null);
// //   const [hoverSlug, setHoverSlug] = useState<string | null>(null);
// //   const [mobileView, setMobileView] = useState<"map" | "list">("map");

// //   const mapContainerRef = useRef<HTMLDivElement>(null);
// //   const mapInstance = useRef<any>(null);
// //   const leafletRef = useRef<any>(null);
// //   const layerRef = useRef<any>(null);
// //   const listRef = useRef<HTMLDivElement>(null);
// //   const markerEls = useRef<Map<string, HTMLElement>>(new Map());

// //   // --- Filtered data ---
// //   const filtered = useMemo(() => {
// //     const q = query.trim().toLowerCase();
// //     return allProperties.filter((p) => {
// //       if (p.intent !== intent) return false;
// //       if (city && p.city !== city) return false;
// //       if (area && p.location !== area) return false;
// //       if (type && p.type !== type) return false;
// //       if (maxPrice && p.priceValue > maxPrice) return false;
// //       if (q) {
// //         const hay = `${p.title} ${p.location} ${p.city} ${p.type.replace(/-/g, " ")} ${p.category}`.toLowerCase();
// //         if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
// //       }
// //       return true;
// //     });
// //   }, [intent, city, area, type, maxPrice, query]);

// //   const visibleProperties = useMemo(() => {
// //     if (!bounds) return filtered;
// //     return filtered.filter((p) => p.lat && p.lng && bounds.contains([p.lat, p.lng]));
// //   }, [filtered, bounds]);

// //   const hasFilters = !!(city || area || type || maxPrice || query);

// //   const filteredRef = useRef(filtered);
// //   const activeSlugRef = useRef<string | null>(null);
// //   const hoverRef = useRef<string | null>(null);
// //   filteredRef.current = filtered;
// //   activeSlugRef.current = activeProperty?.slug ?? null;
// //   hoverRef.current = hoverSlug;

// //   // Property select: card khule aur marker card ke upar dikhe (card ke neeche na chhupe)
// //   const selectProperty = useCallback((p: Property, fly = true) => {
// //     setActiveProperty(p);
// //     setMobileView("map");
// //     const map = mapInstance.current;
// //     const L = leafletRef.current;
// //     if (!map || !L || !p.lat || !p.lng) return;
// //     const z = fly ? Math.max(map.getZoom(), 15) : map.getZoom();
// //     const size = map.getSize();
// //     const target = map.unproject(map.project([p.lat, p.lng], z).add([0, size.y * 0.16]), z);
// //     if (fly) map.flyTo(target, z, { duration: 0.9 });
// //     else map.panTo(target, { animate: true, duration: 0.4 });
// //   }, []);

// //   const drawMarkers = useCallback(() => {
// //     const L = leafletRef.current;
// //     const map = mapInstance.current;
// //     const layer = layerRef.current;
// //     if (!L || !map || !layer) return;

// //     layer.clearLayers();
// //     markerEls.current.clear();
// //     const zoom = map.getZoom();
// //     const mapBounds = map.getBounds().pad(0.25);
// //     const all = filteredRef.current;

// //     const groupBy = (items: Property[], keyFn: (p: Property) => string) => {
// //       const m = new Map<string, Property[]>();
// //       items.forEach((p) => {
// //         const k = keyFn(p);
// //         const arr = m.get(k);
// //         if (arr) arr.push(p);
// //         else m.set(k, [p]);
// //       });
// //       return m;
// //     };
// //     const center = (g: Property[]): [number, number] => [
// //       g.reduce((s, p) => s + p.lat!, 0) / g.length,
// //       g.reduce((s, p) => s + p.lng!, 0) / g.length,
// //     ];
// //     const addBubble = (html: string, pos: [number, number], onClick: () => void) => {
// //       const icon = L.divIcon({ className: "re-pin-wrap", html, iconSize: [0, 0] });
// //       const marker = L.marker(pos, { icon });
// //       marker.on("click", onClick);
// //       marker.addTo(layer);
// //     };

// //     // LEVEL 1: zoom out = shehar ke bubbles (naam + count)
// //     if (zoom < 10) {
// //       groupBy(all, (p) => p.city).forEach((g, slug) => {
// //         const c = NAV_CITIES.find((x) => x.slug === slug);
// //         if (!c) return;
// //         addBubble(
// //           `<div class="re-city"><div class="re-city-c">${g.length}</div><div class="re-city-t">${c.name}</div></div>`,
// //           c.center,
// //           () => map.flyTo(c.center, 11, { duration: 1 })
// //         );
// //       });
// //       return;
// //     }

// //     const inView = all.filter((p) => p.lat && p.lng && mapBounds.contains([p.lat, p.lng]));

// //     // LEVEL 2: area ke bubbles (area ka naam + count)
// //     if (zoom < 14) {
// //       groupBy(inView, (p) => p.location).forEach((g, loc) => {
// //         const pos = AREA_CENTER.get(loc) || center(g);
// //         addBubble(
// //           `<div class="re-area"><span class="re-area-n">${g.length}</span><span class="re-area-t">${areaName(loc)}</span></div>`,
// //           pos,
// //           () => map.flyTo(pos, 14, { duration: 0.9 })
// //         );
// //       });
// //       return;
// //     }

// //     // LEVEL 3: price pins (paas wale pins cluster ho jate hain)
// //     const CELL = zoom >= 16 ? 0 : 70;
// //     const groups = groupBy(inView, (p) => {
// //       if (!CELL) return p.slug;
// //       const pt = map.latLngToContainerPoint([p.lat!, p.lng!]);
// //       return `${Math.floor(pt.x / CELL)}:${Math.floor(pt.y / CELL)}`;
// //     });

// //     groups.forEach((group) => {
// //       if (group.length === 1) {
// //         const p = group[0];
// //         const isActive = activeSlugRef.current === p.slug;
// //         const isHover = hoverRef.current === p.slug;
// //         const icon = L.divIcon({
// //           className: "re-pin-wrap",
// //           html: `<div class="re-pin${isActive ? " re-pin-active" : ""}${isHover ? " re-pin-hover" : ""}${p.promoted ? " re-pin-promo" : ""}">${shortPrice(p)}</div>`,
// //           iconSize: [0, 0],
// //         });
// //         const marker = L.marker([p.lat, p.lng], { icon, zIndexOffset: isActive ? 1000 : 0 });
// //         marker.on("click", () => selectProperty(p, false));
// //         marker.addTo(layer);
// //         const el = marker.getElement()?.firstElementChild as HTMLElement | null;
// //         if (el) markerEls.current.set(p.slug, el);
// //       } else {
// //         const [lat, lng] = center(group);
// //         const size = group.length > 29 ? 46 : 40;
// //         addBubble(
// //           `<div class="re-cluster" style="width:${size}px;height:${size}px">${group.length}</div>`,
// //           [lat, lng],
// //           () => {
// //             const b = L.latLngBounds(group.map((p) => [p.lat!, p.lng!]));
// //             if (b.getSouthWest().distanceTo(b.getNorthEast()) < 30) {
// //               map.flyTo([lat, lng], Math.min(map.getZoom() + 3, 17), { duration: 0.8 });
// //             } else {
// //               map.flyToBounds(b, { padding: [70, 70], maxZoom: 17, duration: 0.8 });
// //             }
// //           }
// //         );
// //       }
// //     });
// //   }, [selectProperty]);

// //   // --- 1. Map init ---
// //   useEffect(() => {
// //     let isMounted = true;

// //     const initMap = async () => {
// //       const L = (await import("leaflet")).default;
// //       if (!isMounted || !mapContainerRef.current) return;
// //       if (mapInstance.current) mapInstance.current.remove();

// //       const map = L.map(mapContainerRef.current, {
// //         center: PAKISTAN_CENTER,
// //         zoom: 5,
// //         zoomSnap: 0.5,
// //         minZoom: 4.5,
// //         maxBounds: [[22, 60], [38, 78]],
// //         maxBoundsViscosity: 0.8,
// //         scrollWheelZoom: true,
// //         zoomControl: false,
// //       });
// //       L.control.zoom({ position: "topright" }).addTo(map);

// //       // Tiles: CARTO ab API key mangta hai, isliye default Esri (key nahi chahiye,
// //       // labels English). Agar tiles fail hon to khud OpenStreetMap par switch.
// //       // Chaho to .env.local mein NEXT_PUBLIC_CARTO_KEY daal do, phir CARTO use hoga.
// //       const cartoKey = process.env.NEXT_PUBLIC_CARTO_KEY;
// //       const primary = cartoKey
// //         ? L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoKey}`, {
// //             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
// //             subdomains: "abcd",
// //             maxZoom: 19,
// //           })
// //         : L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
// //             attribution: "Tiles &copy; Esri, HERE, Garmin, OpenStreetMap contributors",
// //             maxZoom: 19,
// //           });
// //       primary.addTo(map);

// //       let errors = 0;
// //       let switched = false;
// //       primary.on("tileerror", () => {
// //         errors += 1;
// //         if (errors >= 4 && !switched) {
// //           switched = true;
// //           map.removeLayer(primary);
// //           L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// //             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// //             maxZoom: 19,
// //           }).addTo(map);
// //         }
// //       });

// //       layerRef.current = L.layerGroup().addTo(map);
// //       leafletRef.current = L;
// //       mapInstance.current = map;
// //       map.fitBounds(PAK_BOUNDS, { padding: [10, 10] });

// //       const sync = () => {
// //         setBounds(map.getBounds());
// //         drawMarkers();
// //       };
// //       map.on("moveend", sync);
// //       map.on("zoomend", sync);
// //       map.on("click", () => setActiveProperty(null));

// //       setBounds(map.getBounds());
// //       setIsReady(true);
// //     };

// //     initMap();

// //     return () => {
// //       isMounted = false;
// //       if (mapInstance.current) {
// //         mapInstance.current.remove();
// //         mapInstance.current = null;
// //       }
// //     };
// //   }, [drawMarkers]);

// //   // --- 2. Filter / active badle to markers dobara draw ---
// //   useEffect(() => {
// //     if (isReady) drawMarkers();
// //   }, [isReady, filtered, activeProperty, drawMarkers]);

// //   // --- 3. List item par hover karo to map ka pin highlight ---
// //   useEffect(() => {
// //     markerEls.current.forEach((el, slug) => el.classList.toggle("re-pin-hover", slug === hoverSlug));
// //   }, [hoverSlug]);

// //   // --- 4. URL params ---
// //   useEffect(() => {
// //     if (!isReady || !mapInstance.current) return;

// //     const slug = searchParams.get("property");
// //     if (slug) {
// //       const prop = allProperties.find((p) => p.slug === slug);
// //       if (prop) {
// //         setIntent(prop.intent);
// //         setCity("");
// //         setQuery("");
// //         setTimeout(() => selectProperty(prop, true), 300);
// //         return;
// //       }
// //     }

// //     const c = searchParams.get("city");
// //     const found = NAV_CITIES.find((x) => x.slug === c);
// //     if (found) mapInstance.current.setView(found.center, 12);
// //   }, [isReady, searchParams, selectProperty]);

// //   // --- 5. Search likhne par map matching results par chala jaye ---
// //   useEffect(() => {
// //     if (!isReady || !query.trim()) return;
// //     const t = setTimeout(() => {
// //       const L = leafletRef.current;
// //       const map = mapInstance.current;
// //       const pts = filtered.filter((p) => p.lat && p.lng).map((p) => [p.lat!, p.lng!]);
// //       if (!L || !map || pts.length === 0) return;
// //       map.flyToBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 14, duration: 1 });
// //     }, 450);
// //     return () => clearTimeout(t);
// //   }, [query, filtered, isReady]);

// //   // Active item list mein nazar aaye
// //   useEffect(() => {
// //     if (!activeProperty || !listRef.current) return;
// //     listRef.current
// //       .querySelector(`[data-slug="${activeProperty.slug}"]`)
// //       ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
// //   }, [activeProperty]);

// //   const flyToCity = (slug: string) => {
// //     const map = mapInstance.current;
// //     if (!map) return;
// //     const c = NAV_CITIES.find((x) => x.slug === slug);
// //     if (c) map.flyTo(c.center, 12, { duration: 1.2 });
// //     else map.flyToBounds(PAK_BOUNDS, { padding: [10, 10], duration: 1.2 });
// //   };

// //   const handleCity = (slug: string) => {
// //     setCity(slug);
// //     setArea("");
// //     setActiveProperty(null);
// //     flyToCity(slug);
// //   };

// //   const handleArea = (loc: string) => {
// //     setArea(loc);
// //     setActiveProperty(null);
// //     const map = mapInstance.current;
// //     const c = AREA_CENTER.get(loc);
// //     if (loc && map && c) map.flyTo(c, 13.5, { duration: 1 });
// //     else flyToCity(city);
// //   };

// //   const handleIntent = (v: "buy" | "rent") => {
// //     setIntent(v);
// //     setMaxPrice(0);
// //     setActiveProperty(null);
// //   };

// //   const resetAll = () => {
// //     setCity("");
// //     setArea("");
// //     setType("");
// //     setMaxPrice(0);
// //     setQuery("");
// //     setActiveProperty(null);
// //     flyToCity("");
// //   };

// //   return (
// //     <div className="flex h-[100dvh] flex-col overflow-hidden bg-ink pt-[90px]">
// //       <style>{`
// //         .re-pin-wrap { background: transparent !important; border: none !important; }
// //         .re-pin {
// //           position: absolute; transform: translate(-50%, -100%);
// //           margin-top: -6px; white-space: nowrap; cursor: pointer;
// //           background: #fff; color: #0a0a0a; font-weight: 800; font-size: 12px;
// //           padding: 5px 10px; border-radius: 999px; border: 1.5px solid #0a0a0a;
// //           box-shadow: 0 2px 6px rgba(0,0,0,.25); transition: transform .15s, background .15s, color .15s;
// //         }
// //         .re-pin::after {
// //           content: ""; position: absolute; left: 50%; bottom: -6px; width: 8px; height: 8px;
// //           background: inherit; border-right: 1.5px solid #0a0a0a; border-bottom: 1.5px solid #0a0a0a;
// //           transform: translateX(-50%) rotate(45deg);
// //         }
// //         .re-pin:hover, .re-pin-hover { transform: translate(-50%, -100%) scale(1.1); background: #fff4ec; border-color: #ff6a00; }
// //         .re-pin-hover::after, .re-pin:hover::after { border-color: #ff6a00; }
// //         .re-pin-promo { border-color: #ff6a00; }
// //         .re-pin-promo::after { border-color: #ff6a00; }
// //         .re-pin-active { background: #ff6a00 !important; color: #fff; border-color: #fff !important; transform: translate(-50%, -100%) scale(1.15); }
// //         .re-pin-active::after { border-color: #fff !important; }
// //         .re-cluster {
// //           position: absolute; transform: translate(-50%, -50%);
// //           display: flex; align-items: center; justify-content: center; cursor: pointer;
// //           border-radius: 50%; background: #0a0a0a; color: #fff; font-weight: 800; font-size: 13px;
// //           border: 3px solid rgba(255,106,0,.9); box-shadow: 0 0 0 5px rgba(10,10,10,.15), 0 4px 10px rgba(0,0,0,.3);
// //           transition: transform .15s;
// //         }
// //         .re-cluster:hover { transform: translate(-50%, -50%) scale(1.1); background: #ff6a00; }
// //         .re-city { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer; }
// //         .re-city-c {
// //           display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%;
// //           background: #ff6a00; color: #fff; font-weight: 800; font-size: 14px; border: 3px solid #fff;
// //           box-shadow: 0 0 0 6px rgba(255,106,0,.25), 0 4px 12px rgba(0,0,0,.3); transition: transform .15s;
// //         }
// //         .re-city:hover .re-city-c { transform: scale(1.12); }
// //         .re-city-t {
// //           margin-top: 6px; font-size: 12px; font-weight: 800; color: #0a0a0a; white-space: nowrap;
// //           text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff, 0 0 5px #fff;
// //         }
// //         .re-area {
// //           position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 6px; cursor: pointer;
// //           white-space: nowrap; background: #0a0a0a; color: #fff; border-radius: 999px; padding: 4px 10px 4px 4px;
// //           box-shadow: 0 3px 10px rgba(0,0,0,.3); border: 1.5px solid #fff; transition: transform .15s, background .15s;
// //         }
// //         .re-area:hover { transform: translate(-50%, -50%) scale(1.07); background: #ff6a00; }
// //         .re-area-n {
// //           display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 6px;
// //           border-radius: 999px; background: #ff6a00; font-size: 12px; font-weight: 800;
// //         }
// //         .re-area:hover .re-area-n { background: #fff; color: #ff6a00; }
// //         .re-area-t { font-size: 12px; font-weight: 700; }
// //         .re-scroll::-webkit-scrollbar { height: 0; width: 6px; }
// //         .re-scroll::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 99px; }
// //       `}</style>

// //       {/* ============ TOP FILTER BAR ============ */}
// //       <div className="z-30 border-b border-neutral-200 bg-white px-3 py-3 shadow-sm sm:px-4">
// //         <div className="re-scroll flex items-center gap-2 overflow-x-auto">
// //           {/* Search */}
// //           <div className="relative min-w-[220px] flex-1 lg:max-w-sm">
// //             <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
// //             <input
// //               value={query}
// //               onChange={(e) => setQuery(e.target.value)}
// //               placeholder="Search area, city or type"
// //               className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-9 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
// //             />
// //             {query && (
// //               <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink" aria-label="Clear search">
// //                 <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
// //               </button>
// //             )}
// //           </div>

// //           {/* Buy / Rent */}
// //           <div className="flex h-10 shrink-0 rounded-lg bg-neutral-100 p-1">
// //             {(["buy", "rent"] as const).map((v) => (
// //               <button
// //                 key={v}
// //                 onClick={() => handleIntent(v)}
// //                 className={`rounded-md px-4 text-sm font-bold capitalize transition ${intent === v ? "bg-ink text-white shadow" : "text-neutral-600 hover:text-ink"}`}
// //               >
// //                 {v}
// //               </button>
// //             ))}
// //           </div>

// //           {/* City */}
// //           <div className="relative shrink-0">
// //             <select value={city} onChange={(e) => handleCity(e.target.value)} className={selectCls}>
// //               <option value="">All Cities</option>
// //               {NAV_CITIES.map((c) => (
// //                 <option key={c.slug} value={c.slug}>{c.name}</option>
// //               ))}
// //             </select>
// //             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
// //           </div>

// //           {/* Area */}
// //           <div className="relative shrink-0">
// //             <select value={area} onChange={(e) => handleArea(e.target.value)} className={selectCls}>
// //               <option value="">All Areas</option>
// //               {AREAS.filter((a) => !city || a.city === city).map((a) => (
// //                 <option key={a.location} value={a.location}>{city ? areaName(a.location) : a.location}</option>
// //               ))}
// //             </select>
// //             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
// //           </div>

// //           {/* Type */}
// //           <div className="relative shrink-0">
// //             <select value={type} onChange={(e) => { setType(e.target.value); setActiveProperty(null); }} className={selectCls}>
// //               {TYPE_OPTIONS.map((o) => (
// //                 <option key={o.value} value={o.value}>{o.label}</option>
// //               ))}
// //             </select>
// //             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
// //           </div>

// //           {/* Price */}
// //           <div className="relative shrink-0">
// //             <select value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value)); setActiveProperty(null); }} className={selectCls}>
// //               {PRICE_OPTIONS[intent].map((o) => (
// //                 <option key={o.value} value={o.value}>{o.label}</option>
// //               ))}
// //             </select>
// //             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
// //           </div>

// //           {hasFilters && (
// //             <button onClick={resetAll} className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-brand-600 transition hover:bg-brand-50">
// //               <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" /> Reset
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* ============ LIST + MAP ============ */}
// //       <div className="relative flex min-h-0 flex-1">
// //         {/* LIST (mobile par full overlay, desktop par left panel) */}
// //         <aside
// //           className={`${mobileView === "list" ? "flex" : "hidden"} absolute inset-0 z-30 flex-col bg-neutral-50 lg:static lg:z-auto lg:flex lg:w-[400px] lg:shrink-0 lg:border-r lg:border-neutral-200`}
// //         >
// //           <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2.5">
// //             <p className="text-sm font-bold text-ink">
// //               {visibleProperties.length} {visibleProperties.length === 1 ? "property" : "properties"} in this area
// //             </p>
// //             <p className="text-xs text-neutral-500">{filtered.length} total</p>
// //           </div>

// //           <div ref={listRef} className="re-scroll flex-1 overflow-y-auto p-3 pb-24 lg:pb-3">
// //             <div className="flex flex-col gap-2.5">
// //               {visibleProperties.slice(0, LIST_LIMIT).map((p) => (
// //                 <div
// //                   key={p.slug}
// //                   data-slug={p.slug}
// //                   onClick={() => selectProperty(p, true)}
// //                   onMouseEnter={() => setHoverSlug(p.slug)}
// //                   onMouseLeave={() => setHoverSlug(null)}
// //                   className={`group flex cursor-pointer gap-3 overflow-hidden rounded-xl border bg-white p-2 transition-all duration-200 ${
// //                     activeProperty?.slug === p.slug
// //                       ? "border-brand-500 shadow-md ring-1 ring-brand-500/30"
// //                       : "border-neutral-200 hover:border-brand-300 hover:shadow-sm"
// //                   }`}
// //                 >
// //                   <div className="relative h-[84px] w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
// //                     <img
// //                       src={p.image}
// //                       alt={p.title}
// //                       loading="lazy"
// //                       className="h-full w-full object-cover"
// //                       style={{ objectPosition: p.imageFocus, transform: p.imageTransform }}
// //                     />
// //                     {p.promoted && (
// //                       <span className="absolute left-1 top-1 rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">Promoted</span>
// //                     )}
// //                   </div>
// //                   <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
// //                     <div>
// //                       <p className="font-display text-sm font-extrabold text-brand-600">{p.price}</p>
// //                       <h3 className="mt-0.5 line-clamp-1 text-[13px] font-bold text-ink group-hover:text-brand-600">{p.title}</h3>
// //                     </div>
// //                     <div>
// //                       <p className="flex items-center gap-1 text-xs text-neutral-500">
// //                         <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-500" />
// //                         <span className="line-clamp-1">{p.location}</span>
// //                       </p>
// //                       <p className="mt-0.5 text-[11px] font-medium text-neutral-500">
// //                         {p.beds ? `${p.beds} Beds · ` : ""}{p.baths ? `${p.baths} Baths · ` : ""}{p.area}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}

// //               {visibleProperties.length > LIST_LIMIT && (
// //                 <p className="py-2 text-center text-xs text-neutral-500">
// //                   Showing first {LIST_LIMIT}. Zoom in on the map to narrow down.
// //                 </p>
// //               )}

// //               {visibleProperties.length === 0 && (
// //                 <div className="flex flex-col items-center rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center">
// //                   <p className="text-sm font-bold text-ink">No properties here</p>
// //                   <p className="mt-1 text-xs text-neutral-500">Map ko zoom out karo ya filters change karo.</p>
// //                   {hasFilters && (
// //                     <button onClick={resetAll} className="mt-4 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-500">
// //                       Reset filters
// //                     </button>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </aside>

// //         {/* MAP */}
// //         <div className="relative z-0 min-h-0 min-w-0 flex-1">
// //           <div ref={mapContainerRef} className="h-full w-full" />

// //           {!isReady && (
// //             <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-neutral-50 text-sm font-medium text-neutral-500">
// //               Loading map...
// //             </div>
// //           )}

// //           {/* Count chip */}
// //           {isReady && (
// //             <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink shadow-md backdrop-blur">
// //               {filtered.length} {intent === "buy" ? "for sale" : "for rent"}
// //             </div>
// //           )}

// //           {/* PROPERTY CARD */}
// //           {activeProperty && (
// //             <div className="pointer-events-none absolute inset-x-0 bottom-20 z-[1000] flex justify-center px-3 lg:bottom-5 lg:justify-start lg:px-5">
// //               <div className="pointer-events-auto relative flex w-full max-w-[400px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
// //                 <button
// //                   onClick={() => setActiveProperty(null)}
// //                   className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-ink transition hover:bg-neutral-200"
// //                   aria-label="Close"
// //                 >
// //                   <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
// //                 </button>

// //                 <div className="relative w-[130px] shrink-0 overflow-hidden bg-neutral-200 sm:w-[150px]">
// //                   <img
// //                     src={activeProperty.image}
// //                     alt={activeProperty.title}
// //                     className="absolute inset-0 h-full w-full object-cover"
// //                     style={{ objectPosition: activeProperty.imageFocus, transform: activeProperty.imageTransform }}
// //                   />
// //                   <span className="absolute left-2 top-2 rounded bg-ink/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
// //                     {activeProperty.purpose}
// //                   </span>
// //                 </div>

// //                 <div className="min-w-0 flex-1 p-3.5">
// //                   <p className="pr-7 font-display text-lg font-extrabold leading-tight text-brand-600">{activeProperty.price}</p>
// //                   <h4 className="mt-1 line-clamp-1 text-sm font-bold text-ink">{activeProperty.title}</h4>
// //                   <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
// //                     <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 shrink-0 text-brand-500" />
// //                     <span className="line-clamp-1">{activeProperty.location}</span>
// //                   </p>

// //                   <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-neutral-100 pt-2.5 text-xs font-medium text-neutral-600">
// //                     {activeProperty.beds ? (
// //                       <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-neutral-400" /> {activeProperty.beds}</span>
// //                     ) : null}
// //                     {activeProperty.baths ? (
// //                       <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-neutral-400" /> {activeProperty.baths}</span>
// //                     ) : null}
// //                     <span className="flex items-center gap-1"><FontAwesomeIcon icon={faRulerCombined} className="text-neutral-400" /> {activeProperty.area}</span>
// //                   </div>

// //                   <div className="mt-3 flex items-center justify-between gap-2">
// //                     <span className="text-[11px] text-neutral-400">{activeProperty.updated}</span>
// //                     <Link
// //                       href={`/properties/${activeProperty.slug}`}
// //                       className="rounded-lg bg-ink px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-brand-500"
// //                     >
// //                       View Details
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Mobile: Map / List toggle */}
// //         <button
// //           onClick={() => setMobileView((v) => (v === "map" ? "list" : "map"))}
// //           className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-xl shadow-black/30 lg:hidden"
// //         >
// //           <FontAwesomeIcon icon={mobileView === "map" ? faList : faMap} className="h-4 w-4" />
// //           {mobileView === "map" ? `List (${visibleProperties.length})` : "Map"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }









// "use client";

// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import "leaflet/dist/leaflet.css";
// import { allProperties, NAV_CITIES } from "@/lib/constants/data";
// import type { Property } from "@/lib/constants/data";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLocationDot, faXmark, faBed, faBath, faRulerCombined,
//   faMagnifyingGlass, faList, faMap, faRotateLeft, faChevronDown,
// } from "@fortawesome/free-solid-svg-icons";

// const PAKISTAN_CENTER: [number, number] = [30.3753, 69.3451];
// const LIST_LIMIT = 40;

// const TYPE_OPTIONS = [
//   { value: "", label: "All Types" },
//   { value: "house", label: "House" },
//   { value: "flat", label: "Flat" },
//   { value: "upper-portion", label: "Upper Portion" },
//   { value: "lower-portion", label: "Lower Portion" },
//   { value: "farm-house", label: "Farm House" },
//   { value: "penthouse", label: "Penthouse" },
//   { value: "room", label: "Room" },
//   { value: "residential-plot", label: "Residential Plot" },
//   { value: "commercial-plot", label: "Commercial Plot" },
//   { value: "shop", label: "Shop" },
//   { value: "office", label: "Office" },
// ];

// const PRICE_OPTIONS = {
//   buy: [
//     { value: 0, label: "Any Price" },
//     { value: 5000000, label: "Up to 50 Lac" },
//     { value: 10000000, label: "Up to 1 Crore" },
//     { value: 20000000, label: "Up to 2 Crore" },
//     { value: 50000000, label: "Up to 5 Crore" },
//     { value: 100000000, label: "Up to 10 Crore" },
//   ],
//   rent: [
//     { value: 0, label: "Any Price" },
//     { value: 50000, label: "Up to 50K / month" },
//     { value: 100000, label: "Up to 100K / month" },
//     { value: 200000, label: "Up to 200K / month" },
//     { value: 400000, label: "Up to 400K / month" },
//   ],
// };

// const PAK_BOUNDS: [[number, number], [number, number]] = [[24.2, 61.0], [37.0, 76.5]];

// const areaName = (loc: string) => loc.split(",")[0].trim();

// // Har area (location) ki list + uska center, taake Area filter aur map dono use karein
// const AREAS = Array.from(
//   new Map(allProperties.map((p) => [p.location, { location: p.location, city: p.city }])).values()
// ).sort((a, b) => a.location.localeCompare(b.location));

// const AREA_CENTER = new Map<string, [number, number]>();
// {
//   const acc = new Map<string, { lat: number; lng: number; n: number }>();
//   allProperties.forEach((p) => {
//     if (!p.lat || !p.lng) return;
//     const c = acc.get(p.location) || { lat: 0, lng: 0, n: 0 };
//     c.lat += p.lat; c.lng += p.lng; c.n += 1;
//     acc.set(p.location, c);
//   });
//   acc.forEach((c, k) => AREA_CENTER.set(k, [c.lat / c.n, c.lng / c.n]));
// }

// // "2.5 Cr", "85 Lac", "75K" jaisa chota label pin ke liye
// function shortPrice(p: Property) {
//   const v = p.priceValue;
//   if (p.intent === "rent") return `${Math.round(v / 1000)}K`;
//   if (v >= 10000000) return `${Number((v / 10000000).toFixed(2))} Cr`;
//   return `${Math.round(v / 100000)} Lac`;
// }

// const selectCls =
//   "h-10 appearance-none rounded-lg border border-neutral-200 bg-white pl-3 pr-8 text-sm font-semibold text-ink outline-none transition hover:border-neutral-300 focus:border-brand-500";

// export default function MapSearch() {
//   const searchParams = useSearchParams();

//   const [isReady, setIsReady] = useState(false);
//   const [intent, setIntent] = useState<"buy" | "rent">(
//     searchParams.get("intent") === "rent" ? "rent" : "buy"
//   );
//   const [city, setCity] = useState<string>(searchParams.get("city") || "");
//   const [area, setArea] = useState<string>("");
//   const [type, setType] = useState<string>("");
//   const [maxPrice, setMaxPrice] = useState<number>(0);
//   const [query, setQuery] = useState<string>(searchParams.get("q") || "");
//   const [bounds, setBounds] = useState<any>(null);
//   const [activeProperty, setActiveProperty] = useState<Property | null>(null);
//   const [hoverSlug, setHoverSlug] = useState<string | null>(null);
//   const [mobileView, setMobileView] = useState<"map" | "list">("map");

//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<any>(null);
//   const leafletRef = useRef<any>(null);
//   const layerRef = useRef<any>(null);
//   const listRef = useRef<HTMLDivElement>(null);
//   const markerEls = useRef<Map<string, HTMLElement>>(new Map());

//   // --- Filtered data ---
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return allProperties.filter((p) => {
//       if (p.intent !== intent) return false;
//       if (city && p.city !== city) return false;
//       if (area && p.location !== area) return false;
//       if (type && p.type !== type) return false;
//       if (maxPrice && p.priceValue > maxPrice) return false;
//       if (q) {
//         const hay = `${p.title} ${p.location} ${p.city} ${p.type.replace(/-/g, " ")} ${p.category}`.toLowerCase();
//         if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
//       }
//       return true;
//     });
//   }, [intent, city, area, type, maxPrice, query]);

//   const visibleProperties = useMemo(() => {
//     if (!bounds) return filtered;
//     return filtered.filter((p) => p.lat && p.lng && bounds.contains([p.lat, p.lng]));
//   }, [filtered, bounds]);

//   const hasFilters = !!(city || area || type || maxPrice || query);

//   const filteredRef = useRef(filtered);
//   const activeSlugRef = useRef<string | null>(null);
//   const hoverRef = useRef<string | null>(null);
//   filteredRef.current = filtered;
//   activeSlugRef.current = activeProperty?.slug ?? null;
//   hoverRef.current = hoverSlug;

//   // Property select: card khule aur marker card ke upar dikhe (card ke neeche na chhupe)
//   const selectProperty = useCallback((p: Property, fly = true) => {
//     setActiveProperty(p);
//     setMobileView("map");
//     const map = mapInstance.current;
//     const L = leafletRef.current;
//     if (!map || !L || !p.lat || !p.lng) return;
//     const z = fly ? Math.max(map.getZoom(), 15) : map.getZoom();
//     const size = map.getSize();
//     const target = map.unproject(map.project([p.lat, p.lng], z).add([0, size.y * 0.16]), z);
//     if (fly) map.flyTo(target, z, { duration: 0.9 });
//     else map.panTo(target, { animate: true, duration: 0.4 });
//   }, []);

//   const drawMarkers = useCallback(() => {
//     const L = leafletRef.current;
//     const map = mapInstance.current;
//     const layer = layerRef.current;
//     if (!L || !map || !layer) return;

//     layer.clearLayers();
//     markerEls.current.clear();
//     const zoom = map.getZoom();
//     const mapBounds = map.getBounds().pad(0.25);
//     const all = filteredRef.current;

//     const groupBy = (items: Property[], keyFn: (p: Property) => string) => {
//       const m = new Map<string, Property[]>();
//       items.forEach((p) => {
//         const k = keyFn(p);
//         const arr = m.get(k);
//         if (arr) arr.push(p);
//         else m.set(k, [p]);
//       });
//       return m;
//     };
//     const center = (g: Property[]): [number, number] => [
//       g.reduce((s, p) => s + p.lat!, 0) / g.length,
//       g.reduce((s, p) => s + p.lng!, 0) / g.length,
//     ];
//     const addBubble = (html: string, pos: [number, number], onClick: () => void) => {
//       const icon = L.divIcon({ className: "re-pin-wrap", html, iconSize: [0, 0] });
//       const marker = L.marker(pos, { icon });
//       marker.on("click", onClick);
//       marker.addTo(layer);
//     };

//     // LEVEL 1: zoom out = shehar ke bubbles (naam + count)
//     if (zoom < 10) {
//       groupBy(all, (p) => p.city).forEach((g, slug) => {
//         const c = NAV_CITIES.find((x) => x.slug === slug);
//         if (!c) return;
//         addBubble(
//           `<div class="re-city"><div class="re-city-c">${g.length}</div><div class="re-city-t">${c.name}</div></div>`,
//           c.center,
//           () => map.flyTo(c.center, 11, { duration: 1 })
//         );
//       });
//       return;
//     }

//     const inView = all.filter((p) => p.lat && p.lng && mapBounds.contains([p.lat, p.lng]));

//     // LEVEL 2: area ke bubbles (area ka naam + count)
//     if (zoom < 14) {
//       groupBy(inView, (p) => p.location).forEach((g, loc) => {
//         const pos = AREA_CENTER.get(loc) || center(g);
//         addBubble(
//           `<div class="re-area"><span class="re-area-n">${g.length}</span><span class="re-area-t">${areaName(loc)}</span></div>`,
//           pos,
//           () => map.flyTo(pos, 14, { duration: 0.9 })
//         );
//       });
//       return;
//     }

//     // LEVEL 3: price pins (paas wale pins cluster ho jate hain)
//     const CELL = zoom >= 16 ? 0 : 70;
//     const groups = groupBy(inView, (p) => {
//       if (!CELL) return p.slug;
//       const pt = map.latLngToContainerPoint([p.lat!, p.lng!]);
//       return `${Math.floor(pt.x / CELL)}:${Math.floor(pt.y / CELL)}`;
//     });

//     groups.forEach((group) => {
//       if (group.length === 1) {
//         const p = group[0];
//         const isActive = activeSlugRef.current === p.slug;
//         const isHover = hoverRef.current === p.slug;
//         const icon = L.divIcon({
//           className: "re-pin-wrap",
//           html: `<div class="re-pin${isActive ? " re-pin-active" : ""}${isHover ? " re-pin-hover" : ""}${p.promoted ? " re-pin-promo" : ""}">${shortPrice(p)}</div>`,
//           iconSize: [0, 0],
//         });
//         const marker = L.marker([p.lat, p.lng], { icon, zIndexOffset: isActive ? 1000 : 0 });
//         marker.on("click", () => selectProperty(p, false));
//         marker.addTo(layer);
//         const el = marker.getElement()?.firstElementChild as HTMLElement | null;
//         if (el) markerEls.current.set(p.slug, el);
//       } else {
//         const [lat, lng] = center(group);
//         const size = group.length > 29 ? 46 : 40;
//         addBubble(
//           `<div class="re-cluster" style="width:${size}px;height:${size}px">${group.length}</div>`,
//           [lat, lng],
//           () => {
//             const b = L.latLngBounds(group.map((p) => [p.lat!, p.lng!]));
//             if (b.getSouthWest().distanceTo(b.getNorthEast()) < 30) {
//               map.flyTo([lat, lng], Math.min(map.getZoom() + 3, 17), { duration: 0.8 });
//             } else {
//               map.flyToBounds(b, { padding: [70, 70], maxZoom: 17, duration: 0.8 });
//             }
//           }
//         );
//       }
//     });
//   }, [selectProperty]);

//   // --- 1. Map init ---
//   useEffect(() => {
//     let isMounted = true;

//     const initMap = async () => {
//       const L = (await import("leaflet")).default;
//       if (!isMounted || !mapContainerRef.current) return;
//       if (mapInstance.current) mapInstance.current.remove();

//       const map = L.map(mapContainerRef.current, {
//         center: PAKISTAN_CENTER,
//         zoom: 5,
//         zoomSnap: 0.5,
//         minZoom: 4.5,
//         maxBounds: [[22, 60], [38, 78]],
//         maxBoundsViscosity: 0.8,
//         scrollWheelZoom: true,
//         zoomControl: false,
//       });
//       L.control.zoom({ position: "topright" }).addTo(map);

//       // Tiles: CARTO ab API key mangta hai, isliye default Esri (key nahi chahiye,
//       // labels English). Agar tiles fail hon to khud OpenStreetMap par switch.
//       // Chaho to .env.local mein NEXT_PUBLIC_CARTO_KEY daal do, phir CARTO use hoga.
//       const cartoKey = process.env.NEXT_PUBLIC_CARTO_KEY;
//       const primary = cartoKey
//         ? L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoKey}`, {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
//             subdomains: "abcd",
//             maxZoom: 19,
//           })
//         : L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
//             attribution: "Tiles &copy; Esri, HERE, Garmin, OpenStreetMap contributors",
//             maxZoom: 19,
//           });
//       primary.addTo(map);

//       let errors = 0;
//       let switched = false;
//       primary.on("tileerror", () => {
//         errors += 1;
//         if (errors >= 4 && !switched) {
//           switched = true;
//           map.removeLayer(primary);
//           L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             maxZoom: 19,
//           }).addTo(map);
//         }
//       });

//       layerRef.current = L.layerGroup().addTo(map);
//       leafletRef.current = L;
//       mapInstance.current = map;
//       map.fitBounds(PAK_BOUNDS, { padding: [10, 10] });

//       const sync = () => {
//         setBounds(map.getBounds());
//         drawMarkers();
//       };
//       map.on("moveend", sync);
//       map.on("zoomend", sync);
//       map.on("click", () => setActiveProperty(null));

//       setBounds(map.getBounds());
//       setIsReady(true);
//     };

//     initMap();

//     return () => {
//       isMounted = false;
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, [drawMarkers]);

//   // --- 2. Filter / active badle to markers dobara draw ---
//   useEffect(() => {
//     if (isReady) drawMarkers();
//   }, [isReady, filtered, activeProperty, drawMarkers]);

//   // --- 3. List item par hover karo to map ka pin highlight ---
//   useEffect(() => {
//     markerEls.current.forEach((el, slug) => el.classList.toggle("re-pin-hover", slug === hoverSlug));
//   }, [hoverSlug]);

//   // --- 4. URL params ---
//   useEffect(() => {
//     if (!isReady || !mapInstance.current) return;

//     const slug = searchParams.get("property");
//     if (slug) {
//       const prop = allProperties.find((p) => p.slug === slug);
//       if (prop) {
//         setIntent(prop.intent);
//         setCity("");
//         setQuery("");
//         setTimeout(() => selectProperty(prop, true), 300);
//         return;
//       }
//     }

//     const c = searchParams.get("city");
//     const found = NAV_CITIES.find((x) => x.slug === c);
//     if (found) mapInstance.current.setView(found.center, 12);
//   }, [isReady, searchParams, selectProperty]);

//   // --- 5. Search likhne par map matching results par chala jaye ---
//   useEffect(() => {
//     if (!isReady || !query.trim()) return;
//     const t = setTimeout(() => {
//       const L = leafletRef.current;
//       const map = mapInstance.current;
//       const pts = filtered.filter((p) => p.lat && p.lng).map((p) => [p.lat!, p.lng!]);
//       if (!L || !map || pts.length === 0) return;
//       map.flyToBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 14, duration: 1 });
//     }, 450);
//     return () => clearTimeout(t);
//   }, [query, filtered, isReady]);

//   // Active item list mein nazar aaye
//   useEffect(() => {
//     if (!activeProperty || !listRef.current) return;
//     listRef.current
//       .querySelector(`[data-slug="${activeProperty.slug}"]`)
//       ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
//   }, [activeProperty]);

//   const flyToCity = (slug: string) => {
//     const map = mapInstance.current;
//     if (!map) return;
//     const c = NAV_CITIES.find((x) => x.slug === slug);
//     if (c) map.flyTo(c.center, 12, { duration: 1.2 });
//     else map.flyToBounds(PAK_BOUNDS, { padding: [10, 10], duration: 1.2 });
//   };

//   const handleCity = (slug: string) => {
//     setCity(slug);
//     setArea("");
//     setActiveProperty(null);
//     flyToCity(slug);
//   };

//   const handleArea = (loc: string) => {
//     setArea(loc);
//     setActiveProperty(null);
//     const map = mapInstance.current;
//     const c = AREA_CENTER.get(loc);
//     if (loc && map && c) map.flyTo(c, 13.5, { duration: 1 });
//     else flyToCity(city);
//   };

//   const handleIntent = (v: "buy" | "rent") => {
//     setIntent(v);
//     setMaxPrice(0);
//     setActiveProperty(null);
//   };

//   const resetAll = () => {
//     setCity("");
//     setArea("");
//     setType("");
//     setMaxPrice(0);
//     setQuery("");
//     setActiveProperty(null);
//     flyToCity("");
//   };

//   return (
//     <div className="flex h-[calc(100dvh-6rem)] flex-col overflow-hidden bg-white">
//       <style>{`
//         .re-pin-wrap { background: transparent !important; border: none !important; }
//         .re-pin {
//           position: absolute; transform: translate(-50%, -100%);
//           margin-top: -6px; white-space: nowrap; cursor: pointer;
//           background: #fff; color: #0a0a0a; font-weight: 800; font-size: 12px;
//           padding: 5px 10px; border-radius: 999px; border: 1.5px solid #0a0a0a;
//           box-shadow: 0 2px 6px rgba(0,0,0,.25); transition: transform .15s, background .15s, color .15s;
//         }
//         .re-pin::after {
//           content: ""; position: absolute; left: 50%; bottom: -6px; width: 8px; height: 8px;
//           background: inherit; border-right: 1.5px solid #0a0a0a; border-bottom: 1.5px solid #0a0a0a;
//           transform: translateX(-50%) rotate(45deg);
//         }
//         .re-pin:hover, .re-pin-hover { transform: translate(-50%, -100%) scale(1.1); background: #fff4ec; border-color: #ff6a00; }
//         .re-pin-hover::after, .re-pin:hover::after { border-color: #ff6a00; }
//         .re-pin-promo { border-color: #ff6a00; }
//         .re-pin-promo::after { border-color: #ff6a00; }
//         .re-pin-active { background: #ff6a00 !important; color: #fff; border-color: #fff !important; transform: translate(-50%, -100%) scale(1.15); }
//         .re-pin-active::after { border-color: #fff !important; }
//         .re-cluster {
//           position: absolute; transform: translate(-50%, -50%);
//           display: flex; align-items: center; justify-content: center; cursor: pointer;
//           border-radius: 50%; background: #0a0a0a; color: #fff; font-weight: 800; font-size: 13px;
//           border: 3px solid rgba(255,106,0,.9); box-shadow: 0 0 0 5px rgba(10,10,10,.15), 0 4px 10px rgba(0,0,0,.3);
//           transition: transform .15s;
//         }
//         .re-cluster:hover { transform: translate(-50%, -50%) scale(1.1); background: #ff6a00; }
//         .re-city { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer; }
//         .re-city-c {
//           display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%;
//           background: #ff6a00; color: #fff; font-weight: 800; font-size: 14px; border: 3px solid #fff;
//           box-shadow: 0 0 0 6px rgba(255,106,0,.25), 0 4px 12px rgba(0,0,0,.3); transition: transform .15s;
//         }
//         .re-city:hover .re-city-c { transform: scale(1.12); }
//         .re-city-t {
//           margin-top: 6px; font-size: 12px; font-weight: 800; color: #0a0a0a; white-space: nowrap;
//           text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff, 0 0 5px #fff;
//         }
//         .re-area {
//           position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 6px; cursor: pointer;
//           white-space: nowrap; background: #0a0a0a; color: #fff; border-radius: 999px; padding: 4px 10px 4px 4px;
//           box-shadow: 0 3px 10px rgba(0,0,0,.3); border: 1.5px solid #fff; transition: transform .15s, background .15s;
//         }
//         .re-area:hover { transform: translate(-50%, -50%) scale(1.07); background: #ff6a00; }
//         .re-area-n {
//           display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 6px;
//           border-radius: 999px; background: #ff6a00; font-size: 12px; font-weight: 800;
//         }
//         .re-area:hover .re-area-n { background: #fff; color: #ff6a00; }
//         .re-area-t { font-size: 12px; font-weight: 700; }
//         .re-scroll::-webkit-scrollbar { height: 0; width: 6px; }
//         .re-scroll::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 99px; }
//       `}</style>

//       {/* ============ TOP FILTER BAR ============ */}
//       <div className="z-30 border-b border-neutral-200 bg-white px-3 py-3 shadow-sm sm:px-4">
//         <div className="re-scroll flex items-center gap-2 overflow-x-auto">
//           {/* Search */}
//           <div className="relative min-w-[220px] flex-1 lg:max-w-sm">
//             <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search area, city or type"
//               className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-9 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
//             />
//             {query && (
//               <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink" aria-label="Clear search">
//                 <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//               </button>
//             )}
//           </div>

//           {/* Buy / Rent */}
//           <div className="flex h-10 shrink-0 rounded-lg bg-neutral-100 p-1">
//             {(["buy", "rent"] as const).map((v) => (
//               <button
//                 key={v}
//                 onClick={() => handleIntent(v)}
//                 className={`rounded-md px-4 text-sm font-bold capitalize transition ${intent === v ? "bg-ink text-white shadow" : "text-neutral-600 hover:text-ink"}`}
//               >
//                 {v}
//               </button>
//             ))}
//           </div>

//           {/* City */}
//           <div className="relative shrink-0">
//             <select value={city} onChange={(e) => handleCity(e.target.value)} className={selectCls}>
//               <option value="">All Cities</option>
//               {NAV_CITIES.map((c) => (
//                 <option key={c.slug} value={c.slug}>{c.name}</option>
//               ))}
//             </select>
//             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
//           </div>

//           {/* Area */}
//           <div className="relative shrink-0">
//             <select value={area} onChange={(e) => handleArea(e.target.value)} className={selectCls}>
//               <option value="">All Areas</option>
//               {AREAS.filter((a) => !city || a.city === city).map((a) => (
//                 <option key={a.location} value={a.location}>{city ? areaName(a.location) : a.location}</option>
//               ))}
//             </select>
//             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
//           </div>

//           {/* Type */}
//           <div className="relative shrink-0">
//             <select value={type} onChange={(e) => { setType(e.target.value); setActiveProperty(null); }} className={selectCls}>
//               {TYPE_OPTIONS.map((o) => (
//                 <option key={o.value} value={o.value}>{o.label}</option>
//               ))}
//             </select>
//             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
//           </div>

//           {/* Price */}
//           <div className="relative shrink-0">
//             <select value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value)); setActiveProperty(null); }} className={selectCls}>
//               {PRICE_OPTIONS[intent].map((o) => (
//                 <option key={o.value} value={o.value}>{o.label}</option>
//               ))}
//             </select>
//             <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
//           </div>

//           {hasFilters && (
//             <button onClick={resetAll} className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-brand-600 transition hover:bg-brand-50">
//               <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" /> Reset
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ============ LIST + MAP ============ */}
//       <div className="relative flex min-h-0 flex-1">
//         {/* LIST (mobile par full overlay, desktop par left panel) */}
//         <aside
//           className={`${mobileView === "list" ? "flex" : "hidden"} absolute inset-0 z-30 flex-col bg-neutral-50 lg:static lg:z-auto lg:flex lg:w-[400px] lg:shrink-0 lg:border-r lg:border-neutral-200`}
//         >
//           <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2.5">
//             <p className="text-sm font-bold text-ink">
//               {visibleProperties.length} {visibleProperties.length === 1 ? "property" : "properties"} in this area
//             </p>
//             <p className="text-xs text-neutral-500">{filtered.length} total</p>
//           </div>

//           <div ref={listRef} className="re-scroll flex-1 overflow-y-auto p-3 pb-24 lg:pb-3">
//             <div className="flex flex-col gap-2.5">
//               {visibleProperties.slice(0, LIST_LIMIT).map((p) => (
//                 <div
//                   key={p.slug}
//                   data-slug={p.slug}
//                   onClick={() => selectProperty(p, true)}
//                   onMouseEnter={() => setHoverSlug(p.slug)}
//                   onMouseLeave={() => setHoverSlug(null)}
//                   className={`group flex cursor-pointer gap-3 overflow-hidden rounded-xl border bg-white p-2 transition-all duration-200 ${
//                     activeProperty?.slug === p.slug
//                       ? "border-brand-500 shadow-md ring-1 ring-brand-500/30"
//                       : "border-neutral-200 hover:border-brand-300 hover:shadow-sm"
//                   }`}
//                 >
//                   <div className="relative h-[84px] w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
//                     <img
//                       src={p.image}
//                       alt={p.title}
//                       loading="lazy"
//                       className="h-full w-full object-cover"
//                       style={{ objectPosition: p.imageFocus, transform: p.imageTransform }}
//                     />
//                     {p.promoted && (
//                       <span className="absolute left-1 top-1 rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">Promoted</span>
//                     )}
//                   </div>
//                   <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
//                     <div>
//                       <p className="font-display text-sm font-extrabold text-brand-600">{p.price}</p>
//                       <h3 className="mt-0.5 line-clamp-1 text-[13px] font-bold text-ink group-hover:text-brand-600">{p.title}</h3>
//                     </div>
//                     <div>
//                       <p className="flex items-center gap-1 text-xs text-neutral-500">
//                         <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-500" />
//                         <span className="line-clamp-1">{p.location}</span>
//                       </p>
//                       <p className="mt-0.5 text-[11px] font-medium text-neutral-500">
//                         {p.beds ? `${p.beds} Beds · ` : ""}{p.baths ? `${p.baths} Baths · ` : ""}{p.area}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {visibleProperties.length > LIST_LIMIT && (
//                 <p className="py-2 text-center text-xs text-neutral-500">
//                   Showing first {LIST_LIMIT}. Zoom in on the map to narrow down.
//                 </p>
//               )}

//               {visibleProperties.length === 0 && (
//                 <div className="flex flex-col items-center rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center">
//                   <p className="text-sm font-bold text-ink">No properties here</p>
//                   <p className="mt-1 text-xs text-neutral-500">Map ko zoom out karo ya filters change karo.</p>
//                   {hasFilters && (
//                     <button onClick={resetAll} className="mt-4 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-500">
//                       Reset filters
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </aside>

//         {/* MAP */}
//         <div className="relative z-0 min-h-0 min-w-0 flex-1">
//           <div ref={mapContainerRef} className="h-full w-full" />

//           {!isReady && (
//             <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-neutral-50 text-sm font-medium text-neutral-500">
//               Loading map...
//             </div>
//           )}

//           {/* Count chip */}
//           {isReady && (
//             <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink shadow-md backdrop-blur">
//               {filtered.length} {intent === "buy" ? "for sale" : "for rent"}
//             </div>
//           )}

//           {/* PROPERTY CARD */}
//           {activeProperty && (
//             <div className="pointer-events-none absolute inset-x-0 bottom-20 z-[1000] flex justify-center px-3 lg:bottom-5 lg:justify-start lg:px-5">
//               <div className="pointer-events-auto relative flex w-full max-w-[400px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
//                 <button
//                   onClick={() => setActiveProperty(null)}
//                   className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-ink transition hover:bg-neutral-200"
//                   aria-label="Close"
//                 >
//                   <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//                 </button>

//                 <div className="relative w-[130px] shrink-0 overflow-hidden bg-neutral-200 sm:w-[150px]">
//                   <img
//                     src={activeProperty.image}
//                     alt={activeProperty.title}
//                     className="absolute inset-0 h-full w-full object-cover"
//                     style={{ objectPosition: activeProperty.imageFocus, transform: activeProperty.imageTransform }}
//                   />
//                   <span className="absolute left-2 top-2 rounded bg-ink/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
//                     {activeProperty.purpose}
//                   </span>
//                 </div>

//                 <div className="min-w-0 flex-1 p-3.5">
//                   <p className="pr-7 font-display text-lg font-extrabold leading-tight text-brand-600">{activeProperty.price}</p>
//                   <h4 className="mt-1 line-clamp-1 text-sm font-bold text-ink">{activeProperty.title}</h4>
//                   <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
//                     <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 shrink-0 text-brand-500" />
//                     <span className="line-clamp-1">{activeProperty.location}</span>
//                   </p>

//                   <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-neutral-100 pt-2.5 text-xs font-medium text-neutral-600">
//                     {activeProperty.beds ? (
//                       <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-neutral-400" /> {activeProperty.beds}</span>
//                     ) : null}
//                     {activeProperty.baths ? (
//                       <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-neutral-400" /> {activeProperty.baths}</span>
//                     ) : null}
//                     <span className="flex items-center gap-1"><FontAwesomeIcon icon={faRulerCombined} className="text-neutral-400" /> {activeProperty.area}</span>
//                   </div>

//                   <div className="mt-3 flex items-center justify-between gap-2">
//                     <span className="text-[11px] text-neutral-400">{activeProperty.updated}</span>
//                     <Link
//                       href={`/properties/${activeProperty.slug}`}
//                       className="rounded-lg bg-ink px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-brand-500"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile: Map / List toggle */}
//         <button
//           onClick={() => setMobileView((v) => (v === "map" ? "list" : "map"))}
//           className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-xl shadow-black/30 lg:hidden"
//         >
//           <FontAwesomeIcon icon={mobileView === "map" ? faList : faMap} className="h-4 w-4" />
//           {mobileView === "map" ? `List (${visibleProperties.length})` : "Map"}
//         </button>
//       </div>
//     </div>
//   );
// }










"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { allProperties, cities } from "@/lib/constants/data";
import type { Property } from "@/lib/constants/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot, faXmark, faBed, faBath, faRulerCombined,
  faMagnifyingGlass, faList, faMap, faRotateLeft, faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

// Pakistan Center
const PAKISTAN_CENTER: [number, number] = [30.3753, 69.3451];
const LIST_LIMIT = 40;

// Map cities ke coordinates (Aap data.ts mein cities ke sath lat/lng add kar sakti hain)
const CITY_COORDS: Record<string, [number, number]> = {
  lahore: [31.5204, 74.3587],
  karachi: [24.8607, 67.0011],
  islamabad: [33.6844, 73.0479],
  peshawar: [34.0151, 71.5249],
  quetta: [30.1798, 66.9750],
};

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "house", label: "House" },
  { value: "flat", label: "Flat" },
  { value: "upper-portion", label: "Upper Portion" },
  { value: "lower-portion", label: "Lower Portion" },
  { value: "farm-house", label: "Farm House" },
  { value: "penthouse", label: "Penthouse" },
  { value: "room", label: "Room" },
  { value: "residential-plot", label: "Residential Plot" },
  { value: "commercial-plot", label: "Commercial Plot" },
  { value: "shop", label: "Shop" },
  { value: "office", label: "Office" },
];

const PRICE_OPTIONS = {
  buy: [
    { value: 0, label: "Any Price" },
    { value: 5000000, label: "Up to 50 Lac" },
    { value: 10000000, label: "Up to 1 Crore" },
    { value: 20000000, label: "Up to 2 Crore" },
    { value: 50000000, label: "Up to 5 Crore" },
    { value: 100000000, label: "Up to 10 Crore" },
  ],
  rent: [
    { value: 0, label: "Any Price" },
    { value: 50000, label: "Up to 50K / month" },
    { value: 100000, label: "Up to 100K / month" },
    { value: 200000, label: "Up to 200K / month" },
    { value: 400000, label: "Up to 400K / month" },
  ],
};

const PAK_BOUNDS: [[number, number], [number, number]] = [[24.2, 61.0], [37.0, 76.5]];

const areaName = (loc: string) => loc.split(",")[0].trim();

// Safe Filter: Sirf un properties ko rakhein jinke lat/lng mojood hain
const validProperties = allProperties.filter(
  (p): p is Property & { lat: number; lng: number } => 
    typeof p.lat === "number" && typeof p.lng === "number"
);

// Areas
const AREAS = Array.from(
  new Map(validProperties.map((p) => [p.location, { location: p.location, city: p.city }])).values()
).sort((a, b) => a.location.localeCompare(b.location));

const AREA_CENTER = new Map<string, [number, number]>();
{
  const acc = new Map<string, { lat: number; lng: number; n: number }>();
  validProperties.forEach((p) => {
    const c = acc.get(p.location) || { lat: 0, lng: 0, n: 0 };
    c.lat += p.lat; c.lng += p.lng; c.n += 1;
    acc.set(p.location, c);
  });
  acc.forEach((c, k) => AREA_CENTER.set(k, [c.lat / c.n, c.lng / c.n]));
}

// Short price label
function shortPrice(p: Property) {
  const v = p.priceValue;
  if (p.intent === "rent") return `${Math.round(v / 1000)}K`;
  if (v >= 10000000) return `${Number((v / 10000000).toFixed(2))} Cr`;
  return `${Math.round(v / 100000)} Lac`;
}

const selectCls =
  "h-10 appearance-none rounded-lg border border-neutral-200 bg-white pl-3 pr-8 text-sm font-semibold text-ink outline-none transition hover:border-neutral-300 focus:border-brand-500";

export default function MapSearch() {
  const searchParams = useSearchParams();

  const [isReady, setIsReady] = useState(false);
  const [intent, setIntent] = useState<"buy" | "rent">(
    searchParams.get("intent") === "rent" ? "rent" : "buy"
  );
  const [city, setCity] = useState<string>(searchParams.get("city") || "");
  const [area, setArea] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [query, setQuery] = useState<string>(searchParams.get("q") || "");
  const [bounds, setBounds] = useState<any>(null);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const markerEls = useRef<Map<string, HTMLElement>>(new Map());

  // Filter Data (Safe)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return validProperties.filter((p) => {
      if (p.intent !== intent) return false;
      if (city && p.city !== city) return false;
      if (area && p.location !== area) return false;
      if (type && p.type !== type) return false;
      if (maxPrice && p.priceValue > maxPrice) return false;
      if (q) {
        const hay = `${p.title} ${p.location} ${p.city} ${p.type.replace(/-/g, " ")}`.toLowerCase();
        if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    });
  }, [intent, city, area, type, maxPrice, query]);

  const visibleProperties = useMemo(() => {
    if (!bounds) return filtered;
    return filtered.filter((p) => p.lat && p.lng && bounds.contains([p.lat, p.lng]));
  }, [filtered, bounds]);

  const hasFilters = !!(city || area || type || maxPrice || query);

  const filteredRef = useRef(filtered);
  const activeSlugRef = useRef<string | null>(null);
  const hoverRef = useRef<string | null>(null);
  filteredRef.current = filtered;
  activeSlugRef.current = activeProperty?.slug ?? null;
  hoverRef.current = hoverSlug;

  const selectProperty = useCallback((p: Property, fly = true) => {
    setActiveProperty(p);
    setMobileView("map");
    const map = mapInstance.current;
    const L = leafletRef.current;
    if (!map || !L || !p.lat || !p.lng) return;
    const z = fly ? Math.max(map.getZoom(), 15) : map.getZoom();
    const size = map.getSize();
    const target = map.unproject(map.project([p.lat, p.lng], z).add([0, size.y * 0.16]), z);
    if (fly) map.flyTo(target, z, { duration: 0.9 });
    else map.panTo(target, { animate: true, duration: 0.4 });
  }, []);

  const drawMarkers = useCallback(() => {
    const L = leafletRef.current;
    const map = mapInstance.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;

    layer.clearLayers();
    markerEls.current.clear();
    const zoom = map.getZoom();
    const mapBounds = map.getBounds().pad(0.25);
    const all = filteredRef.current;

    const groupBy = (items: Property[], keyFn: (p: Property) => string) => {
      const m = new Map<string, Property[]>();
      items.forEach((p) => {
        const k = keyFn(p);
        const arr = m.get(k);
        if (arr) arr.push(p);
        else m.set(k, [p]);
      });
      return m;
    };
    
    const center = (g: Property[]): [number, number] => [
      g.reduce((s, p) => s + (p.lat || 0), 0) / g.length,
      g.reduce((s, p) => s + (p.lng || 0), 0) / g.length,
    ];
    
    const addBubble = (html: string, pos: [number, number], onClick: () => void) => {
      const icon = L.divIcon({ className: "re-pin-wrap", html, iconSize: [0, 0] });
      const marker = L.marker(pos, { icon });
      marker.on("click", onClick);
      marker.addTo(layer);
    };

    // LEVEL 1: City Bubbles
    if (zoom < 10) {
      groupBy(all, (p) => p.city).forEach((g, slug) => {
        const c = CITY_COORDS[slug];
        if (!c) return;
        addBubble(
          `<div class="re-city"><div class="re-city-c">${g.length}</div><div class="re-city-t">${slug.charAt(0).toUpperCase() + slug.slice(1)}</div></div>`,
          c,
          () => map.flyTo(c, 11, { duration: 1 })
        );
      });
      return;
    }

    const inView = all.filter((p) => p.lat && p.lng && mapBounds.contains([p.lat, p.lng]));

    // LEVEL 2: Area Bubbles
    if (zoom < 14) {
      groupBy(inView, (p) => p.location).forEach((g, loc) => {
        const pos = AREA_CENTER.get(loc) || center(g);
        addBubble(
          `<div class="re-area"><span class="re-area-n">${g.length}</span><span class="re-area-t">${areaName(loc)}</span></div>`,
          pos,
          () => map.flyTo(pos, 14, { duration: 0.9 })
        );
      });
      return;
    }

    // LEVEL 3: Price Pins
    const CELL = zoom >= 16 ? 0 : 70;
    const groups = groupBy(inView, (p) => {
      if (!CELL) return p.slug;
      const pt = map.latLngToContainerPoint([p.lat!, p.lng!]);
      return `${Math.floor(pt.x / CELL)}:${Math.floor(pt.y / CELL)}`;
    });

    groups.forEach((group) => {
      if (group.length === 1) {
        const p = group[0];
        const isActive = activeSlugRef.current === p.slug;
        const isHover = hoverRef.current === p.slug;
        const icon = L.divIcon({
          className: "re-pin-wrap",
          html: `<div class="re-pin${isActive ? " re-pin-active" : ""}${isHover ? " re-pin-hover" : ""}${p.promoted ? " re-pin-promo" : ""}">${shortPrice(p)}</div>`,
          iconSize: [0, 0],
        });
        const marker = L.marker([p.lat, p.lng], { icon, zIndexOffset: isActive ? 1000 : 0 });
        marker.on("click", () => selectProperty(p, false));
        marker.addTo(layer);
        const el = marker.getElement()?.firstElementChild as HTMLElement | null;
        if (el) markerEls.current.set(p.slug, el);
      } else {
        const [lat, lng] = center(group);
        const size = group.length > 29 ? 46 : 40;
        addBubble(
          `<div class="re-cluster" style="width:${size}px;height:${size}px">${group.length}</div>`,
          [lat, lng],
          () => {
            const b = L.latLngBounds(group.map((p) => [p.lat!, p.lng!]));
            if (b.getSouthWest().distanceTo(b.getNorthEast()) < 30) {
              map.flyTo([lat, lng], Math.min(map.getZoom() + 3, 17), { duration: 0.8 });
            } else {
              map.flyToBounds(b, { padding: [70, 70], maxZoom: 17, duration: 0.8 });
            }
          }
        );
      }
    });
  }, [selectProperty]);

  // Map Init
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (!isMounted || !mapContainerRef.current) return;
      if (mapInstance.current) mapInstance.current.remove();

      const map = L.map(mapContainerRef.current, {
        center: PAKISTAN_CENTER,
        zoom: 5,
        zoomSnap: 0.5,
        minZoom: 4.5,
        maxBounds: [[22, 60], [38, 78]],
        maxBoundsViscosity: 0.8,
        scrollWheelZoom: true,
        zoomControl: false,
      });
      L.control.zoom({ position: "topright" }).addTo(map);

      // English Tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      layerRef.current = L.layerGroup().addTo(map);
      leafletRef.current = L;
      mapInstance.current = map;
      map.fitBounds(PAK_BOUNDS, { padding: [10, 10] });

      const sync = () => {
        setBounds(map.getBounds());
        drawMarkers();
      };
      map.on("moveend", sync);
      map.on("zoomend", sync);
      map.on("click", () => setActiveProperty(null));

      setBounds(map.getBounds());
      setIsReady(true);
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [drawMarkers]);

  // Draw markers on filter change
  useEffect(() => {
    if (isReady) drawMarkers();
  }, [isReady, filtered, activeProperty, drawMarkers]);

  // Hover effect
  useEffect(() => {
    markerEls.current.forEach((el, slug) => el.classList.toggle("re-pin-hover", slug === hoverSlug));
  }, [hoverSlug]);

  // URL Params
  useEffect(() => {
    if (!isReady || !mapInstance.current) return;

    const slug = searchParams.get("property");
    if (slug) {
      const prop = allProperties.find((p) => p.slug === slug);
      if (prop) {
        setIntent(prop.intent);
        setCity("");
        setQuery("");
        setTimeout(() => selectProperty(prop, true), 300);
        return;
      }
    }

    const c = searchParams.get("city");
    if (c && CITY_COORDS[c]) {
      mapInstance.current.setView(CITY_COORDS[c], 12);
    }
  }, [isReady, searchParams, selectProperty]);

  // Search fly-to
  useEffect(() => {
    if (!isReady || !query.trim()) return;
    const t = setTimeout(() => {
      const L = leafletRef.current;
      const map = mapInstance.current;
      const pts = filtered.filter((p) => p.lat && p.lng).map((p) => [p.lat, p.lng] as [number, number]);
      if (!L || !map || pts.length === 0) return;
      map.flyToBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 14, duration: 1 });
    }, 450);
    return () => clearTimeout(t);
  }, [query, filtered, isReady]);

  // Scroll to active card
  useEffect(() => {
    if (!activeProperty || !listRef.current) return;
    listRef.current
      .querySelector(`[data-slug="${activeProperty.slug}"]`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeProperty]);

  const flyToCity = (slug: string) => {
    const map = mapInstance.current;
    if (!map) return;
    if (CITY_COORDS[slug]) map.flyTo(CITY_COORDS[slug], 12, { duration: 1.2 });
    else map.flyToBounds(PAK_BOUNDS, { padding: [10, 10], duration: 1.2 });
  };

  const handleCity = (slug: string) => {
    setCity(slug);
    setArea("");
    setActiveProperty(null);
    flyToCity(slug);
  };

  const handleArea = (loc: string) => {
    setArea(loc);
    setActiveProperty(null);
    const map = mapInstance.current;
    const c = AREA_CENTER.get(loc);
    if (loc && map && c) map.flyTo(c, 13.5, { duration: 1 });
    else flyToCity(city);
  };

  const handleIntent = (v: "buy" | "rent") => {
    setIntent(v);
    setMaxPrice(0);
    setActiveProperty(null);
  };

  const resetAll = () => {
    setCity("");
    setArea("");
    setType("");
    setMaxPrice(0);
    setQuery("");
    setActiveProperty(null);
    flyToCity("");
  };

  return (
    <div className="flex h-[calc(100dvh-6rem)] flex-col overflow-hidden bg-white">
      <style>{`
        .re-pin-wrap { background: transparent !important; border: none !important; }
        .re-pin {
          position: absolute; transform: translate(-50%, -100%);
          margin-top: -6px; white-space: nowrap; cursor: pointer;
          background: #fff; color: #0a0a0a; font-weight: 800; font-size: 12px;
          padding: 5px 10px; border-radius: 999px; border: 1.5px solid #0a0a0a;
          box-shadow: 0 2px 6px rgba(0,0,0,.25); transition: transform .15s, background .15s, color .15s;
        }
        .re-pin::after {
          content: ""; position: absolute; left: 50%; bottom: -6px; width: 8px; height: 8px;
          background: inherit; border-right: 1.5px solid #0a0a0a; border-bottom: 1.5px solid #0a0a0a;
          transform: translateX(-50%) rotate(45deg);
        }
        .re-pin:hover, .re-pin-hover { transform: translate(-50%, -100%) scale(1.1); background: #fff4ec; border-color: #ff6a00; }
        .re-pin-hover::after, .re-pin:hover::after { border-color: #ff6a00; }
        .re-pin-promo { border-color: #ff6a00; }
        .re-pin-promo::after { border-color: #ff6a00; }
        .re-pin-active { background: #ff6a00 !important; color: #fff; border-color: #fff !important; transform: translate(-50%, -100%) scale(1.15); }
        .re-pin-active::after { border-color: #fff !important; }
        .re-cluster {
          position: absolute; transform: translate(-50%, -50%);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          border-radius: 50%; background: #0a0a0a; color: #fff; font-weight: 800; font-size: 13px;
          border: 3px solid rgba(255,106,0,.9); box-shadow: 0 0 0 5px rgba(10,10,10,.15), 0 4px 10px rgba(0,0,0,.3);
          transition: transform .15s;
        }
        .re-cluster:hover { transform: translate(-50%, -50%) scale(1.1); background: #ff6a00; }
        .re-city { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer; }
        .re-city-c {
          display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%;
          background: #ff6a00; color: #fff; font-weight: 800; font-size: 14px; border: 3px solid #fff;
          box-shadow: 0 0 0 6px rgba(255,106,0,.25), 0 4px 12px rgba(0,0,0,.3); transition: transform .15s;
        }
        .re-city:hover .re-city-c { transform: scale(1.12); }
        .re-city-t {
          margin-top: 6px; font-size: 12px; font-weight: 800; color: #0a0a0a; white-space: nowrap;
          text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff, 0 0 5px #fff;
        }
        .re-area {
          position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 6px; cursor: pointer;
          white-space: nowrap; background: #0a0a0a; color: #fff; border-radius: 999px; padding: 4px 10px 4px 4px;
          box-shadow: 0 3px 10px rgba(0,0,0,.3); border: 1.5px solid #fff; transition: transform .15s, background .15s;
        }
        .re-area:hover { transform: translate(-50%, -50%) scale(1.07); background: #ff6a00; }
        .re-area-n {
          display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 6px;
          border-radius: 999px; background: #ff6a00; font-size: 12px; font-weight: 800;
        }
        .re-area:hover .re-area-n { background: #fff; color: #ff6a00; }
        .re-area-t { font-size: 12px; font-weight: 700; }
        .re-scroll::-webkit-scrollbar { height: 0; width: 6px; }
        .re-scroll::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 99px; }
      `}</style>

      {/* Filter Bar */}
      <div className="z-30 border-b border-neutral-200 bg-white px-3 py-3 shadow-sm sm:px-4">
        <div className="re-scroll flex items-center gap-2 overflow-x-auto">
          <div className="relative min-w-[220px] flex-1 lg:max-w-sm">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search area, city or type"
              className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-9 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink" aria-label="Clear search">
                <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex h-10 shrink-0 rounded-lg bg-neutral-100 p-1">
            {(["buy", "rent"] as const).map((v) => (
              <button
                key={v}
                onClick={() => handleIntent(v)}
                className={`rounded-md px-4 text-sm font-bold capitalize transition ${intent === v ? "bg-ink text-white shadow" : "text-neutral-600 hover:text-ink"}`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="relative shrink-0">
            <select value={city} onChange={(e) => handleCity(e.target.value)} className={selectCls}>
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="relative shrink-0">
            <select value={area} onChange={(e) => handleArea(e.target.value)} className={selectCls}>
              <option value="">All Areas</option>
              {AREAS.filter((a) => !city || a.city === city).map((a) => (
                <option key={a.location} value={a.location}>{city ? areaName(a.location) : a.location}</option>
              ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="relative shrink-0">
            <select value={type} onChange={(e) => { setType(e.target.value); setActiveProperty(null); }} className={selectCls}>
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="relative shrink-0">
            <select value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value)); setActiveProperty(null); }} className={selectCls}>
              {PRICE_OPTIONS[intent].map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
          </div>

          {hasFilters && (
            <button onClick={resetAll} className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-brand-600 transition hover:bg-brand-50">
              <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* List + Map */}
      <div className="relative flex min-h-0 flex-1">
        <aside
          className={`${mobileView === "list" ? "flex" : "hidden"} absolute inset-0 z-30 flex-col bg-neutral-50 lg:static lg:z-auto lg:flex lg:w-[400px] lg:shrink-0 lg:border-r lg:border-neutral-200`}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2.5">
            <p className="text-sm font-bold text-ink">
              {visibleProperties.length} {visibleProperties.length === 1 ? "property" : "properties"} in this area
            </p>
            <p className="text-xs text-neutral-500">{filtered.length} total</p>
          </div>

          <div ref={listRef} className="re-scroll flex-1 overflow-y-auto p-3 pb-24 lg:pb-3">
            <div className="flex flex-col gap-2.5">
              {visibleProperties.slice(0, LIST_LIMIT).map((p) => (
                <div
                  key={p.slug}
                  data-slug={p.slug}
                  onClick={() => selectProperty(p, true)}
                  onMouseEnter={() => setHoverSlug(p.slug)}
                  onMouseLeave={() => setHoverSlug(null)}
                  className={`group flex cursor-pointer gap-3 overflow-hidden rounded-xl border bg-white p-2 transition-all duration-200 ${
                    activeProperty?.slug === p.slug
                      ? "border-brand-500 shadow-md ring-1 ring-brand-500/30"
                      : "border-neutral-200 hover:border-brand-300 hover:shadow-sm"
                  }`}
                >
                  <div className="relative h-[84px] w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                    {p.promoted && (
                      <span className="absolute left-1 top-1 rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">Promoted</span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div>
                      <p className="font-display text-sm font-extrabold text-brand-600">{p.price}</p>
                      <h3 className="mt-0.5 line-clamp-1 text-[13px] font-bold text-ink group-hover:text-brand-600">{p.title}</h3>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-neutral-500">
                        <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-500" />
                        <span className="line-clamp-1">{p.location}</span>
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-neutral-500">
                        {p.beds ? `${p.beds} Beds · ` : ""}{p.baths ? `${p.baths} Baths · ` : ""}{p.area}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {visibleProperties.length > LIST_LIMIT && (
                <p className="py-2 text-center text-xs text-neutral-500">
                  Showing first {LIST_LIMIT}. Zoom in on the map to narrow down.
                </p>
              )}

              {visibleProperties.length === 0 && (
                <div className="flex flex-col items-center rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center">
                  <p className="text-sm font-bold text-ink">No properties here</p>
                  <p className="mt-1 text-xs text-neutral-500">Map ko zoom out karo ya filters change karo.</p>
                  {hasFilters && (
                    <button onClick={resetAll} className="mt-4 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-500">
                      Reset filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="relative z-0 min-h-0 min-w-0 flex-1">
          <div ref={mapContainerRef} className="h-full w-full" />

          {!isReady && (
            <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-neutral-50 text-sm font-medium text-neutral-500">
              Loading map...
            </div>
          )}

          {isReady && (
            <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink shadow-md backdrop-blur">
              {filtered.length} {intent === "buy" ? "for sale" : "for rent"}
            </div>
          )}

          {activeProperty && (
            <div className="pointer-events-none absolute inset-x-0 bottom-20 z-[1000] flex justify-center px-3 lg:bottom-5 lg:justify-start lg:px-5">
              <div className="pointer-events-auto relative flex w-full max-w-[400px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
                <button
                  onClick={() => setActiveProperty(null)}
                  className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-ink transition hover:bg-neutral-200"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                </button>

                <div className="relative w-[130px] shrink-0 overflow-hidden bg-neutral-200 sm:w-[150px]">
                  <img src={activeProperty.image} alt={activeProperty.title} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded bg-ink/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    {activeProperty.purpose}
                  </span>
                </div>

                <div className="min-w-0 flex-1 p-3.5">
                  <p className="pr-7 font-display text-lg font-extrabold leading-tight text-brand-600">{activeProperty.price}</p>
                  <h4 className="mt-1 line-clamp-1 text-sm font-bold text-ink">{activeProperty.title}</h4>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
                    <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 shrink-0 text-brand-500" />
                    <span className="line-clamp-1">{activeProperty.location}</span>
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-neutral-100 pt-2.5 text-xs font-medium text-neutral-600">
                    {activeProperty.beds && (
                      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-neutral-400" /> {activeProperty.beds}</span>
                    )}
                    {activeProperty.baths && (
                      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-neutral-400" /> {activeProperty.baths}</span>
                    )}
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faRulerCombined} className="text-neutral-400" /> {activeProperty.area}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-400">{activeProperty.updated}</span>
                    <Link href={`/properties/${activeProperty.slug}`} className="rounded-lg bg-ink px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-brand-500">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileView((v) => (v === "map" ? "list" : "map"))}
          className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-xl shadow-black/30 lg:hidden"
        >
          <FontAwesomeIcon icon={mobileView === "map" ? faList : faMap} className="h-4 w-4" />
          {mobileView === "map" ? `List (${visibleProperties.length})` : "Map"}
        </button>
      </div>
    </div>
  );
}