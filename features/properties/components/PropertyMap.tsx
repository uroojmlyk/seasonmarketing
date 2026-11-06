// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import Link from "next/link";
// import L from "leaflet";
// import { allProperties } from "@/lib/constants/data";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// // Helper component to control map from outside
// function MapController({ center }: { center: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     map.flyTo(center, 14, { duration: 1.5 });
//   }, [center, map]);
//   return null;
// }

// export default function MapSearch() {
//   const [isReady, setIsReady] = useState(false);
//   const [activeCenter, setActiveCenter] = useState<[number, number]>([30.3753, 69.3451]); // Pakistan Center
//   const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
//   const mapRef = useRef<L.Map | null>(null);

//   useEffect(() => {
//     setIsReady(true);
//   }, []);

//   // Filter properties based on map bounds
//   const visibleProperties = useMemo(() => {
//     if (!bounds) return allProperties;
//     return allProperties.filter((p) => {
//       if (!p.lat || !p.lng) return false;
//       return bounds.contains([p.lat, p.lng]);
//     });
//   }, [bounds]);

//   if (!isReady) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-neutral-50">
//         <p className="text-sm font-medium text-neutral-500">Loading map...</p>
//       </div>
//     );
//   }

//   const customPin = L.divIcon({
//     className: "bg-transparent border-none",
//     html: `
//       <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background-color: #ff6a00; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 18px; height: 18px;">
//           <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
//           <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
//         </svg>
//         <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background-color: #ff6a00; border-right: 2px solid white; border-bottom: 2px solid white;"></div>
//       </div>
//     `,
//     iconSize: [36, 36],
//     iconAnchor: [18, 44],
//     popupAnchor: [0, -40],
//   });

//   return (
//     <div className="flex h-screen flex-col lg:flex-row">
      
//       {/* LEFT: Properties List */}
//       <div className="w-full overflow-y-auto bg-neutral-50 p-4 lg:w-[450px] lg:p-6">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-ink">Map Search</h2>
//           <p className="mt-1 text-sm text-neutral-500">Drag the map to see properties in that area.</p>
//         </div>

//         <div className="flex flex-col gap-3">
//           {visibleProperties.map((p) => (
//             <div 
//               key={p.slug} 
//               onClick={() => p.lat && p.lng && setActiveCenter([p.lat, p.lng])}
//               className="flex cursor-pointer gap-3 overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 transition hover:border-brand-500 hover:shadow-md"
//             >
//               <img src={p.image} alt={p.title} className="h-24 w-24 shrink-0 rounded-lg object-cover" />
//               <div className="flex flex-1 flex-col justify-between py-1">
//                 <div>
//                   <h3 className="line-clamp-1 text-sm font-bold text-ink">{p.title}</h3>
//                   <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
//                     <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-500" />
//                     {p.location}
//                   </p>
//                 </div>
//                 <p className="font-display text-base font-extrabold text-brand-600">{p.price}</p>
//               </div>
//             </div>
//           ))}

//           {visibleProperties.length === 0 && (
//             <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
//               No properties in this area. Try zooming out.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* RIGHT: Map */}
//       <div className="h-[60vh] w-full lg:h-screen lg:flex-1">
//         <MapContainer
//           center={[30.3753, 69.3451]}
//           zoom={5}
//           scrollWheelZoom={true}
//           style={{ height: "100%", width: "100%" }}
//           className="z-0"
//           ref={mapRef}
//           whenReady={() => {
//             // Update bounds when map is ready
//             if (mapRef.current) {
//               setBounds(mapRef.current.getBounds());
//               mapRef.current.on("moveend", () => {
//                 setBounds(mapRef.current?.getBounds() || null);
//               });
//             }
//           }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
//           />
//           <MapController center={activeCenter} />
          
//           {visibleProperties.map((p) => {
//             if (!p.lat || !p.lng) return null;
//             return (
//               <Marker key={p.slug} position={[p.lat, p.lng]} icon={customPin}>
//                 <Popup closeButton={false}>
//                   <div className="w-48">
//                     <img src={p.image} alt={p.title} className="h-24 w-full rounded object-cover" />
//                     <h4 className="mt-2 text-sm font-bold">{p.title}</h4>
//                     <p className="text-xs font-bold text-brand-600">{p.price}</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             );
//           })}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Property } from "@/lib/constants/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

interface PropertyMapProps {
  properties: Property[];
  center: [number, number];
}

/* ============================================
   MAP CONTROLLER — flies to new center when prop changes
   ============================================ */

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { duration: 1.5 });
  }, [center, map]);
  return null;
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

export default function PropertyMap({ properties, center }: PropertyMapProps) {
  const [isReady, setIsReady] = useState(false);
  const [activeCenter, setActiveCenter] = useState<[number, number]>(center);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // Sync active center when parent prop changes
  useEffect(() => {
    setActiveCenter(center);
  }, [center]);

  // Filter properties based on map bounds
  const visibleProperties = useMemo(() => {
    if (!bounds) return properties;
    return properties.filter((p) => {
      if (!p.lat || !p.lng) return false;
      return bounds.contains([p.lat, p.lng]);
    });
  }, [bounds, properties]);

  if (!isReady) {
    return (
      <div className="flex h-[calc(100vh-180px)] w-full items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
        <p className="text-sm font-medium text-neutral-500">Loading map...</p>
      </div>
    );
  }

  const customPin = L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background-color: #ff6a00; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 18px; height: 18px;">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
        <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background-color: #ff6a00; border-right: 2px solid white; border-bottom: 2px solid white;"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 44],
    popupAnchor: [0, -40],
  });

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col lg:flex-row">
      {/* LEFT: Properties List */}
      <div className="w-full overflow-y-auto border-b border-neutral-200 bg-neutral-50 p-4 lg:w-[380px] lg:border-b-0 lg:border-r lg:p-5">
        <div className="mb-4">
          <h2 className="text-lg font-black tracking-tight text-ink">
            Map Search
          </h2>
          <p className="mt-1 text-xs text-neutral-600">
            Drag the map to see properties in that area.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {visibleProperties.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => {
                if (p.lat && p.lng) setActiveCenter([p.lat, p.lng]);
              }}
              className="flex cursor-pointer gap-3 overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-brand-500 hover:shadow-md"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col justify-between py-0.5">
                <div>
                  <h3 className="line-clamp-1 text-sm font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="h-3 w-3 text-brand-500"
                    />
                    {p.location}
                  </p>
                </div>
                <p className="text-base font-black text-brand-600">
                  {p.price}
                </p>
              </div>
            </button>
          ))}

          {visibleProperties.length === 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
              No properties in this area. Try zooming out.
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Map */}
      <div className="h-[60vh] w-full lg:h-full lg:flex-1">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
          ref={mapRef}
          whenReady={() => {
            if (mapRef.current) {
              setBounds(mapRef.current.getBounds());
              mapRef.current.on("moveend", () => {
                setBounds(mapRef.current?.getBounds() || null);
              });
            }
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
          />
          <MapController center={activeCenter} />

          {visibleProperties.map((p) => {
            if (!p.lat || !p.lng) return null;
            return (
              <Marker key={p.slug} position={[p.lat, p.lng]} icon={customPin}>
                <Popup closeButton={false}>
                  <div className="w-48">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-24 w-full rounded object-cover"
                    />
                    <h4 className="mt-2 text-sm font-bold">{p.title}</h4>
                    <p className="text-xs font-bold text-brand-600">
                      {p.price}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}