// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faBed, faBath, faRulerCombined, faLocationDot, 
//   faCheck, faPhone, faEnvelope, faShareNodes, faHeart,
//   faCalendar, faStar, faMessage, faArrowRight, 
//   faCheckCircle
// } from "@fortawesome/free-solid-svg-icons";
// import type { Property } from "@/lib/constants/data";

// const AGENT = {
//   name: "Ali Khan",
//   agency: "Gulberg Realty",
//   phone: "+92 300 1234567",
//   rating: 4.8,
//   reviews: 120,
// };

// const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

// const IMAGE_VIEWS = [
//   { pos: "center", scale: 1, label: "Front View" },
//   { pos: "top left", scale: 1.5, label: "Top Left" },
//   { pos: "bottom right", scale: 1.2, label: "Bottom Right" },
//   { pos: "center left", scale: 1.8, label: "Close Up" },
// ];

// const AMENITY_GROUPS = [
//   { title: "Main Features", items: ["Built in year: 2026", "Parking Spaces: 1", "Double Glazed Windows", "Central Air Conditioning", "Electricity Backup", "Waste Disposal"] },
//   { title: "Rooms", items: ["Bedrooms: 3", "Bathrooms: 3", "Drawing Room", "Dining Room", "Kitchens: 1", "Study Room", "Prayer Room", "Gym"] },
//   { title: "Business & Communication", items: ["Broadband Internet Access", "Satellite or Cable TV Ready", "Conference Room", "Intercom", "ATM Machines"] },
//   { title: "Community Features", items: ["Community Lawn", "Swimming Pool", "Community Gym", "Kids Play Area", "Barbeque Area", "Mosque"] },
//   { title: "Nearby Facilities", items: ["Nearby Schools", "Nearby Hospitals", "Nearby Shopping Malls", "Nearby Restaurants", "Public Transport", "Distance From Airport"] },
// ];

// export default function PropertyDetailClient({ 
//   property, 
//   similarProperties 
// }: { 
//   property: Property; 
//   similarProperties: Property[] 
// }) {
//   const [activeImage, setActiveImage] = useState(0);
//   const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

//   return (
//     <div className="min-h-screen bg-neutral-50 pb-20">
      
//       {/* Top Bar */}
//       <div className="border-b border-neutral-200 bg-white">
//         <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-8">
//           <nav className="flex flex-wrap items-center text-xs font-medium text-neutral-500">
//             <Link href="/" className="hover:text-brand-500">Home</Link>
//             <span className="mx-2">/</span>
//             <Link href={`/properties?city=${property.city}`} className="capitalize hover:text-brand-500">{property.city}</Link>
//             <span className="mx-2">/</span>
//             <span className="text-ink truncate max-w-[200px] sm:max-w-none">{property.title}</span>
//           </nav>
//           <div className="flex items-center gap-2">
//             <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-neutral-50">
//               <FontAwesomeIcon icon={faShareNodes} className="h-3.5 w-3.5" /> Share
//             </button>
//             <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-neutral-50">
//               <FontAwesomeIcon icon={faHeart} className="h-3.5 w-3.5" /> Save
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
//         <div className="grid gap-8 lg:grid-cols-3">
          
//           {/* LEFT COLUMN */}
//           <div className="lg:col-span-2 space-y-6">
            
//             {/* Image Gallery */}
//             <div className="flex flex-col gap-2">
//               <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200 sm:aspect-[16/9]">
//                 <Image 
//                   src={property.image} 
//                   alt={property.title} 
//                   fill 
//                   priority 
//                   className="object-cover transition-transform duration-500" 
//                   style={{ 
//                     objectPosition: IMAGE_VIEWS[activeImage].pos, 
//                     transform: `scale(${IMAGE_VIEWS[activeImage].scale})` 
//                   }} 
//                 />
//                 <div className="absolute left-3 top-3 flex flex-wrap gap-2">
//                   <span className="rounded-md bg-ink/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
//                     {property.purpose}
//                   </span>
//                   {property.promoted && (
//                     <span className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
//                       Promoted
//                     </span>
//                   )}
//                 </div>
//                 <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
//                   {activeImage + 1} / {IMAGE_VIEWS.length}
//                 </div>
//               </div>
              
//               {/* Thumbnails */}
//               <div className="grid grid-cols-4 gap-2">
//                 {IMAGE_VIEWS.map((view, i) => (
//                   <button 
//                     key={i} 
//                     onClick={() => setActiveImage(i)} 
//                     className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200 border-2 transition ${activeImage === i ? 'border-brand-500' : 'border-transparent hover:border-neutral-300'}`}
//                   >
//                     <Image 
//                       src={property.image} 
//                       alt={view.label} 
//                       fill 
//                       className="object-cover opacity-80 hover:opacity-100 transition-opacity" 
//                       style={{ objectPosition: view.pos, transform: `scale(${view.scale})` }} 
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Title & Price */}
//             <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
//               <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
//                 <div className="flex-1">
//                   <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{property.title}</h1>
//                   <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
//                     <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-brand-500" />
//                     {property.location}
//                   </p>
//                 </div>
//                 <div className="sm:text-right">
//                   <p className="font-display text-3xl font-extrabold text-brand-600">{property.price}</p>
//                   <p className="mt-1 text-xs font-semibold text-neutral-400">Last updated: {property.updated}</p>
//                 </div>
//               </div>

//               {/* Key Facts */}
//               <div className="mt-6 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-6 sm:grid-cols-4">
//                 {property.beds && (
//                   <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
//                     <FontAwesomeIcon icon={faBed} className="h-5 w-5 text-brand-500 mb-1.5" />
//                     <p className="text-base font-bold text-ink">{property.beds}</p>
//                     <p className="text-[11px] font-medium text-neutral-500">Bedrooms</p>
//                   </div>
//                 )}
//                 {property.baths && (
//                   <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
//                     <FontAwesomeIcon icon={faBath} className="h-5 w-5 text-brand-500 mb-1.5" />
//                     <p className="text-base font-bold text-ink">{property.baths}</p>
//                     <p className="text-[11px] font-medium text-neutral-500">Bathrooms</p>
//                   </div>
//                 )}
//                 <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
//                   <FontAwesomeIcon icon={faRulerCombined} className="h-5 w-5 text-brand-500 mb-1.5" />
//                   <p className="text-base font-bold text-ink">{property.area}</p>
//                   <p className="text-[11px] font-medium text-neutral-500">Area Size</p>
//                 </div>
//                 <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
//                   <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-brand-500 mb-1.5" />
//                   <p className="text-base font-bold text-ink capitalize">{property.availability}</p>
//                   <p className="text-[11px] font-medium text-neutral-500">Availability</p>
//                 </div>
//               </div>
//             </div>

//             {/* Details Table */}
//             <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
//               <h2 className="text-xl font-bold text-ink mb-4">Details</h2>
//               <div className="grid grid-cols-2 gap-y-4 text-sm">
//                 <div><span className="text-neutral-500">Type:</span> <span className="font-semibold text-ink capitalize">{property.type.replace(/-/g, " ")}</span></div>
//                 <div><span className="text-neutral-500">Price:</span> <span className="font-semibold text-ink">{property.price}</span></div>
//                 <div><span className="text-neutral-500">Bath(s):</span> <span className="font-semibold text-ink">{property.baths || "-"}</span></div>
//                 <div><span className="text-neutral-500">Area:</span> <span className="font-semibold text-ink">{property.area}</span></div>
//                 <div><span className="text-neutral-500">Purpose:</span> <span className="font-semibold text-ink">{property.purpose}</span></div>
//                 <div><span className="text-neutral-500">Bedroom(s):</span> <span className="font-semibold text-ink">{property.beds || "-"}</span></div>
//                 <div><span className="text-neutral-500">Added:</span> <span className="font-semibold text-ink">{property.updated}</span></div>
//                 <div><span className="text-neutral-500">Location:</span> <span className="font-semibold text-ink">{property.location}</span></div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
//               <h2 className="text-xl font-bold text-ink mb-4">Description</h2>
//               <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
//                 <p><strong className="font-bold text-ink">Overview:</strong> A beautiful {property.beds ? `${property.beds} bed` : ""} {property.type.replace(/-/g, " ")} is available for {property.purpose.toLowerCase()} in {property.location}. This property is located in a prime, well-developed area with easy access to main roads, markets, and public transport.</p>
//                 <p><strong className="font-bold text-ink">Property Status:</strong> The property is {property.availability === "confirmed" ? "ready for possession and available immediately" : "currently available for viewing"}. The building features modern architecture, spacious rooms, and high-quality finishes throughout.</p>
//                 <p><strong className="font-bold text-ink">Location & Nearby:</strong> The property is situated in {property.location}, which is known for its peaceful environment and family-friendly community. It is just a 5-minute drive from the main highway, 10 minutes from top schools and hospitals, and close to shopping malls and restaurants.</p>
//                 <p><strong className="font-bold text-ink">Owner & Price:</strong> The asking price is {property.price}, which is negotiable for serious buyers/tenants. Direct owner contact is available for site visits and further discussion.</p>
//               </div>
//             </div>

//             {/* Amenities */}
//             <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
//               <h2 className="text-xl font-bold text-ink mb-4">Features & Amenities</h2>
//               <div className="space-y-6">
//                 {AMENITY_GROUPS.map((group) => (
//                   <div key={group.title}>
//                     <h3 className="mb-3 text-sm font-bold text-ink">{group.title}</h3>
//                     <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-3">
//                       {group.items.map((item) => (
//                         <div key={item} className="flex items-center gap-2 text-sm text-neutral-600">
//                           <FontAwesomeIcon icon={faCheck} className="h-3 w-3 shrink-0 text-green-500" />
//                           {item}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Map */}
//             <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
//               <h2 className="text-xl font-bold text-ink mb-4">Location & Nearby</h2>
//               <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
//                 <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0" />
//               </div>
//             </div>

//           </div>

//           {/* RIGHT COLUMN: Agent Card */}
//           <div className="space-y-6">
//             <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white shadow-lg shadow-black/5">
//               <div className="border-b border-neutral-100 p-5">
//                 <div className="flex items-center gap-4">
//                   <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xl font-bold text-brand-600">
//                     {getInitials(AGENT.name)}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-ink">{AGENT.name}</h3>
//                     <p className="text-xs text-neutral-500">{AGENT.agency}</p>
//                     <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-500">
//                       <FontAwesomeIcon icon={faStar} />
//                       {AGENT.rating} <span className="text-neutral-400">({AGENT.reviews} reviews)</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-5">
//                 <div className="grid grid-cols-2 gap-3 mb-6">
//                   <a href={`tel:${AGENT.phone}`} className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-bold text-ink transition hover:bg-neutral-50">
//                     <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-brand-500" /> Call
//                   </a>
//                   <a href={`https://wa.me/${AGENT.phone.replace(/\D/g, '')}`} className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-100">
//                     <FontAwesomeIcon icon={faMessage} className="h-4 w-4" /> WhatsApp
//                   </a>
//                 </div>

//                 <div className="border-t border-neutral-100 pt-5">
//                   <h4 className="text-sm font-bold text-ink mb-4">Contact Agent</h4>
//                   <form className="space-y-3">
//                     <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
//                     <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
//                     <input type="email" placeholder="Email Address (Optional)" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
//                     <textarea rows={3} placeholder="I am interested in this property..." className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"></textarea>
//                     <button type="button" className="w-full rounded-lg bg-ink py-3 text-sm font-bold text-white transition hover:bg-neutral-800">
//                       Send Message
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Similar Properties */}
//         {similarProperties.length > 0 && (
//           <div className="mt-16">
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-2xl font-extrabold text-ink">Similar Properties</h2>
//               <Link href={`/properties?city=${property.city}`} className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:underline">
//                 View all <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
//               </Link>
//             </div>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {similarProperties.map((p) => (
//                 <Link key={p.slug} href={`/properties/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg">
//                   <div className="relative aspect-[4/3] bg-neutral-200">
//                     <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="line-clamp-1 text-sm font-bold text-ink group-hover:text-brand-600">{p.title}</h3>
//                     <p className="mt-1 font-display text-base font-extrabold text-brand-600">{p.price}</p>
//                     <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
//                       <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-500" />
//                       <span className="line-clamp-1">{p.location}</span>
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, faBath, faRulerCombined, faLocationDot, 
  faCheck, faPhone, faEnvelope, faShareNodes, faHeart,
  faCalendar, faStar, faMessage, faArrowRight, 
  faCheckCircle, faCar, faShieldHalved, faTree, 
  faBolt, faDroplet, faWifi, faCouch
} from "@fortawesome/free-solid-svg-icons";
import type { Property } from "@/lib/constants/data";

const AGENT = {
  name: "Ali Khan",
  agency: "Gulberg Realty",
  phone: "+92 300 1234567",
  rating: 4.8,
  reviews: 120,
};

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

const IMAGE_VIEWS = [
  { pos: "center", scale: 1, label: "Front View" },
  { pos: "top left", scale: 1.5, label: "Top Left" },
  { pos: "bottom right", scale: 1.2, label: "Bottom Right" },
  { pos: "center left", scale: 1.8, label: "Close Up" },
];

const AMENITY_GROUPS = [
  {
    title: "Main Features",
    items: [
      { icon: faCar, text: "Covered Parking" },
      { icon: faShieldHalved, text: "24/7 Security" },
      { icon: faTree, text: "Landscaped Lawn" },
      { icon: faBolt, text: "Electricity Backup" },
      { icon: faDroplet, text: "24/7 Water Supply" },
      { icon: faWifi, text: "High-Speed Internet" },
    ],
  },
  {
    title: "Rooms",
    items: [
      { icon: faBed, text: "Bedrooms: 3" },
      { icon: faBath, text: "Bathrooms: 3" },
      { icon: faCouch, text: "Drawing Room" },
      { icon: faCheckCircle, text: "Dining Room" },
      { icon: faCheckCircle, text: "Study Room" },
      { icon: faCheckCircle, text: "Prayer Room" },
    ],
  },
  {
    title: "Nearby Facilities",
    items: [
      { icon: faCheckCircle, text: "Nearby Schools" },
      { icon: faCheckCircle, text: "Nearby Hospitals" },
      { icon: faCheckCircle, text: "Nearby Shopping Malls" },
      { icon: faCheckCircle, text: "Public Transport" },
      { icon: faCheckCircle, text: "Restaurants & Cafes" },
      { icon: faCheckCircle, text: "Parks & Recreation" },
    ],
  },
];

export default function PropertyDetailClient({ 
  property, 
  similarProperties 
}: { 
  property: Property; 
  similarProperties: Property[] 
}) {
  const [activeImage, setActiveImage] = useState(0);
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      
      {/* Top Bar - Breadcrumbs */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center text-xs font-medium text-neutral-500">
            <Link href="/" className="hover:text-brand-500">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/properties?city=${property.city}`} className="capitalize hover:text-brand-500">{property.city}</Link>
            <span className="mx-2">/</span>
            <span className="text-ink truncate max-w-[200px] sm:max-w-none">{property.title}</span>
          </nav>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-neutral-50">
              <FontAwesomeIcon icon={faShareNodes} className="h-3.5 w-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-neutral-50">
              <FontAwesomeIcon icon={faHeart} className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200 sm:aspect-[16/9]">
                <Image 
                  src={property.image} 
                  alt={property.title} 
                  fill 
                  priority 
                  className="object-cover transition-all duration-700 ease-in-out" 
                  style={{ 
                    objectPosition: IMAGE_VIEWS[activeImage].pos, 
                    transform: `scale(${IMAGE_VIEWS[activeImage].scale})` 
                  }} 
                />
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-ink/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                    {property.purpose}
                  </span>
                  {property.promoted && (
                    <span className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                      Promoted
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                  {activeImage + 1} / {IMAGE_VIEWS.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {IMAGE_VIEWS.map((view, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)} 
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200 border-2 transition-all duration-200 ${activeImage === i ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-transparent hover:border-neutral-300'}`}
                  >
                    <Image 
                      src={property.image} 
                      alt={view.label} 
                      fill 
                      className="object-cover opacity-70 hover:opacity-100 transition-opacity" 
                      style={{ objectPosition: view.pos, transform: `scale(${view.scale})` }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Price */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{property.title}</h1>
                  <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                    <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-brand-500" />
                    {property.location}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-display text-3xl font-extrabold text-brand-600">{property.price}</p>
                  <p className="mt-1 text-xs font-semibold text-neutral-400">Last updated: {property.updated}</p>
                </div>
              </div>

              {/* Key Facts */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-6 sm:grid-cols-4">
                {property.beds && (
                  <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
                    <FontAwesomeIcon icon={faBed} className="h-5 w-5 text-brand-500 mb-1.5" />
                    <p className="text-base font-bold text-ink">{property.beds}</p>
                    <p className="text-[11px] font-medium text-neutral-500">Bedrooms</p>
                  </div>
                )}
                {property.baths && (
                  <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
                    <FontAwesomeIcon icon={faBath} className="h-5 w-5 text-brand-500 mb-1.5" />
                    <p className="text-base font-bold text-ink">{property.baths}</p>
                    <p className="text-[11px] font-medium text-neutral-500">Bathrooms</p>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
                  <FontAwesomeIcon icon={faRulerCombined} className="h-5 w-5 text-brand-500 mb-1.5" />
                  <p className="text-base font-bold text-ink">{property.area}</p>
                  <p className="text-[11px] font-medium text-neutral-500">Area Size</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-50 p-3">
                  <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-brand-500 mb-1.5" />
                  <p className="text-base font-bold text-ink capitalize">{property.availability}</p>
                  <p className="text-[11px] font-medium text-neutral-500">Availability</p>
                </div>
              </div>
            </div>

            {/* Details Table */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Type</span> <span className="font-semibold text-ink capitalize">{property.type.replace(/-/g, " ")}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Price</span> <span className="font-semibold text-ink">{property.price}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Bath(s)</span> <span className="font-semibold text-ink">{property.baths || "-"}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Area</span> <span className="font-semibold text-ink">{property.area}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Purpose</span> <span className="font-semibold text-ink">{property.purpose}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Bedroom(s)</span> <span className="font-semibold text-ink">{property.beds || "-"}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Added</span> <span className="font-semibold text-ink">{property.updated}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-2"><span className="text-neutral-500">Location</span> <span className="font-semibold text-ink text-right truncate">{property.location}</span></div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Description</h2>
              <div className="space-y-4 text-sm leading-relaxed text-neutral-600">
                <p><strong className="font-bold text-ink">Overview:</strong> A beautiful {property.beds ? `${property.beds} bed` : ""} {property.type.replace(/-/g, " ")} is available for {property.purpose.toLowerCase()} in {property.location}. This property is located in a prime, well-developed area with easy access to main roads, markets, and public transport.</p>
                <p><strong className="font-bold text-ink">Property Status:</strong> The property is {property.availability === "confirmed" ? "ready for possession and available immediately" : "currently available for viewing"}. The building features modern architecture, spacious rooms, and high-quality finishes throughout.</p>
                <p><strong className="font-bold text-ink">Location & Nearby:</strong> The property is situated in {property.location}, which is known for its peaceful environment and family-friendly community. It is just a 5-minute drive from the main highway, 10 minutes from top schools and hospitals, and close to shopping malls and restaurants.</p>
                <p><strong className="font-bold text-ink">Owner & Price:</strong> The asking price is {property.price}, which is negotiable for serious buyers/tenants. Direct owner contact is available for site visits and further discussion.</p>
              </div>
            </div>

            {/* Amenities (Grouped) */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Features & Amenities</h2>
              <div className="space-y-6">
                {AMENITY_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-3 text-sm font-bold text-ink">{group.title}</h3>
                    <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-3">
                      {group.items.map((item) => (
                        <div key={item.text} className="flex items-center gap-2 text-sm text-neutral-600">
                          <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Location & Nearby</h2>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0" />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Agent Card */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white shadow-lg shadow-black/5">
              
              <div className="border-b border-neutral-100 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xl font-bold text-brand-600 border border-brand-100">
                    {getInitials(AGENT.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{AGENT.name}</h3>
                    <p className="text-xs text-neutral-500">{AGENT.agency}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-500">
                      <FontAwesomeIcon icon={faStar} />
                      {AGENT.rating} <span className="text-neutral-400">({AGENT.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <a href={`tel:${AGENT.phone}`} className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-bold text-ink transition hover:bg-neutral-50">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-brand-500" /> Call
                  </a>
                  <a href={`https://wa.me/${AGENT.phone.replace(/\D/g, '')}`} className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-100">
                    <FontAwesomeIcon icon={faMessage} className="h-4 w-4" /> WhatsApp
                  </a>
                </div>

                <div className="border-t border-neutral-100 pt-5">
                  <h4 className="text-sm font-bold text-ink mb-4">Contact Agent</h4>
                  <form className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
                    <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
                    <input type="email" placeholder="Email Address (Optional)" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
                    <textarea rows={3} placeholder="I am interested in this property..." className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"></textarea>
                    <button type="button" className="w-full rounded-lg bg-ink py-3 text-sm font-bold text-white transition hover:bg-neutral-800">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-ink">Similar Properties</h2>
              <Link href={`/properties?city=${property.city}`} className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:underline">
                View all <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((p) => (
                <Link key={p.slug} href={`/properties/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg">
                  <div className="relative aspect-[4/3] bg-neutral-200">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-sm font-bold text-ink group-hover:text-brand-600">{p.title}</h3>
                    <p className="mt-1 font-display text-base font-extrabold text-brand-600">{p.price}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                      <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-brand-500" />
                      <span className="line-clamp-1">{p.location}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}