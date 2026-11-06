// export type Availability = "confirmed" | "stale" | "unknown";

// export interface Property {
//   slug: string;
//   title: string;
//   price: string;
//   priceValue: number;
//   location: string;
//   image: string;
//   beds?: number;
//   baths?: number;
//   area: string;
//   purpose: "For Sale" | "For Rent";
//   intent: "buy" | "rent";
//   city: string;
//   category: string;
//   type: string;
//   promoted?: boolean;
//   availability: Availability;
//   updated: string;
//   lat?: number;
//   lng?: number;
//   // ✅ NAYA: image positioning (used by PropertyCard, home.ts)
//   imageTransform?: string;
//   imageFocus?: string;
// }

// // NAYA: Advertise page ke liye zaroori hai
// export const NAV_CITIES = [
//   { slug: "lahore", name: "Lahore" },
//   { slug: "karachi", name: "Karachi" },
//   { slug: "islamabad", name: "Islamabad" },
//   { slug: "rawalpindi", name: "Rawalpindi" },
//   { slug: "faisalabad", name: "Faisalabad" },
//   { slug: "multan", name: "Multan" },
//   { slug: "peshawar", name: "Peshawar" },
//   { slug: "quetta", name: "Quetta" },
// ];

// const generateData = (): Property[] => {
//   const properties: Property[] = [];

//   const IMAGE_POOL = {
//     houses: ["/images/house-1.jpg", "/images/house-2.jpg", "/images/house-3.jpg", "/images/house-4.jpg", "/images/house-5.jpg", "/images/house-6.jpg", "/images/house-7.jpg", "/images/house-8.jpg"],
//     flats: ["/images/flat-1.jpg", "/images/flat-2.jpg", "/images/flat-3.jpg", "/images/flat-4.jpg", "/images/flat-5.jpg", "/images/flat-6.jpg"],
//     upper: ["/images/upper-portion-1.jpg", "/images/upper-portion-2.jpg", "/images/upper-portion-3.jpg"],
//     lower: ["/images/lower-portion-1.jpg"],
//     plots: ["/images/plot-1.jpg", "/images/plot-2.jpg", "/images/plot-3.jpg"],
//     shops: ["/images/shop-1.jpg", "/images/shop-2.jpg", "/images/shop-3.jpg"],
//     offices: ["/images/office-1.jpg", "/images/office-2.jpg"],
//     penthouse: ["/images/penthouse-1.jpg"],
//     farm: ["/images/farm-house-1.jpg"],
//     rooms: ["/images/house-2.jpg", "/images/flat-2.jpg"]
//   };

//   const templates = [
//     { type: "house", cat: "homes", beds: 5, baths: 5, area: "1 Kanal", basePrice: 4.5, imgList: IMAGE_POOL.houses },
//     { type: "house", cat: "homes", beds: 3, baths: 3, area: "10 Marla", basePrice: 2.5, imgList: IMAGE_POOL.houses },
//     { type: "flat", cat: "homes", beds: 3, baths: 3, area: "2000 sq ft", basePrice: 1.8, imgList: IMAGE_POOL.flats },
//     { type: "flat", cat: "homes", beds: 2, baths: 2, area: "1200 sq ft", basePrice: 1.2, imgList: IMAGE_POOL.flats },
//     { type: "upper-portion", cat: "homes", beds: 2, baths: 2, area: "5 Marla", basePrice: 1.0, imgList: IMAGE_POOL.upper },
//     { type: "lower-portion", cat: "homes", beds: 2, baths: 2, area: "5 Marla", basePrice: 1.1, imgList: IMAGE_POOL.lower },
//     { type: "farm-house", cat: "homes", beds: 4, baths: 4, area: "2 Kanal", basePrice: 6.5, imgList: IMAGE_POOL.farm },
//     { type: "penthouse", cat: "homes", beds: 4, baths: 4, area: "4000 sq ft", basePrice: 7.0, imgList: IMAGE_POOL.penthouse },
//     { type: "room", cat: "homes", beds: 1, baths: 1, area: "250 sq ft", basePrice: 0.5, imgList: IMAGE_POOL.rooms },
//     { type: "residential-plot", cat: "plots", area: "10 Marla", basePrice: 1.8, imgList: IMAGE_POOL.plots },
//     { type: "commercial-plot", cat: "plots", area: "4 Marla", basePrice: 3.5, imgList: IMAGE_POOL.plots },
//     { type: "shop", cat: "commercial", area: "500 sq ft", basePrice: 2.5, imgList: IMAGE_POOL.shops },
//     { type: "office", cat: "commercial", baths: 2, area: "1500 sq ft", basePrice: 3.0, imgList: IMAGE_POOL.offices },
//   ];

//   const cities = [
//     { 
//       slug: "lahore", name: "Lahore", 
//       areas: [
//         { name: "DHA Phase 6", lat: 31.4697, lng: 74.4118 }, 
//         { name: "Gulberg", lat: 31.5204, lng: 74.3587 }, 
//         { name: "Bahria Town", lat: 31.3667, lng: 74.1833 }, 
//         { name: "Johar Town", lat: 31.4697, lng: 74.2728 }
//       ] 
//     },
//     { 
//       slug: "karachi", name: "Karachi", 
//       areas: [
//         { name: "Clifton", lat: 24.8138, lng: 67.0300 }, 
//         { name: "DHA Phase 8", lat: 24.8000, lng: 67.0667 }, 
//         { name: "Gulshan-e-Iqbal", lat: 24.9200, lng: 67.0900 }, 
//         { name: "PECHS", lat: 24.8700, lng: 67.0600 }
//       ] 
//     },
//     { 
//       slug: "islamabad", name: "Islamabad", 
//       areas: [
//         { name: "F-10", lat: 33.6938, lng: 73.0133 }, 
//         { name: "E-11", lat: 33.6844, lng: 72.9833 }, 
//         { name: "DHA Phase 2", lat: 33.5333, lng: 73.1500 }, 
//         { name: "G-11", lat: 33.6700, lng: 72.9900 }
//       ] 
//     },
//     { 
//       slug: "peshawar", name: "Peshawar", 
//       areas: [
//         { name: "Hayatabad", lat: 33.9900, lng: 71.4300 }, 
//         { name: "University Town", lat: 34.0000, lng: 71.5400 }, 
//         { name: "Saddar", lat: 34.0151, lng: 71.5249 }, 
//         { name: "Regi Model Town", lat: 33.9500, lng: 71.5000 }
//       ] 
//     },
//     { 
//       slug: "quetta", name: "Quetta", 
//       areas: [
//         { name: "Jinnah Town", lat: 30.1900, lng: 67.0200 }, 
//         { name: "Samungli Road", lat: 30.2200, lng: 66.9500 }, 
//         { name: "Saddar", lat: 30.1798, lng: 66.9750 }, 
//         { name: "Airport Road", lat: 30.2500, lng: 66.9300 }
//       ] 
//     },
//   ];

//   let idCounter = 1;

//   cities.forEach((city) => {
//     ["buy", "rent"].forEach((intent) => {
//       templates.forEach((tpl) => {
//         for (let i = 0; i < 6; i++) {
          
//           const areaObj = city.areas[(idCounter * 3 + i) % city.areas.length];
//           const img = tpl.imgList[(idCounter * 2 + i) % tpl.imgList.length];

//           let priceStr = "";
//           let priceValue = 0;

//           if (intent === "rent") {
//             const baseRent = tpl.basePrice * 25000;
//             const variation = i * 10000;
//             priceValue = baseRent + variation;
//             priceStr = `PKR ${priceValue.toLocaleString()} / month`;
//           } else {
//             const baseBuy = tpl.basePrice;
//             const variation = i * 0.3;
//             priceValue = (baseBuy + variation) * 10000000;
//             priceStr = `PKR ${(baseBuy + variation).toFixed(2)} Crore`;
//           }

//           const beds = tpl.beds ? (tpl.beds - (i % 2)) : undefined;
//           const baths = tpl.baths ? (tpl.baths - (i % 2)) : undefined;
//           const titleType = tpl.type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
//           const title = `${beds ? beds + " Bed " : ""}${titleType} in ${areaObj.name}`;

//           const randomLatShift = (Math.random() - 0.5) * 0.015; 
//           const randomLngShift = (Math.random() - 0.5) * 0.015;

//           properties.push({
//             slug: `${city.slug}-${intent}-${tpl.type}-${idCounter}`,
//             title: title,
//             price: priceStr,
//             priceValue: priceValue,
//             location: `${areaObj.name}, ${city.name}`,
//             image: img,
//             beds: beds || undefined,
//             baths: baths || undefined,
//             area: tpl.area,
//             purpose: intent === "buy" ? "For Sale" : "For Rent",
//             intent: intent as "buy" | "rent",
//             city: city.slug,
//             category: tpl.cat,
//             type: tpl.type,
//             promoted: i === 0 && idCounter % 3 === 0,
//             availability: idCounter % 4 === 0 ? "stale" : idCounter % 7 === 0 ? "unknown" : "confirmed",
//             updated: `Updated ${(idCounter % 6) + 1} days ago`,
//             lat: areaObj.lat + randomLatShift,
//             lng: areaObj.lng + randomLngShift,
//           });
          
//           idCounter++;
//         }
//       });
//     });
//   });

//   return properties;
// };

// export const allProperties: Property[] = generateData();

// // Cities export (pehle wala)
// export const cities = [
//   { name: "Lahore", slug: "lahore", image: "/images/cities/lahore.jpg", localities: ["DHA Defence", "Gulberg", "Bahria Town", "Model Town", "Johar Town"] },
//   { name: "Karachi", slug: "karachi", image: "/images/cities/karachi.jpg", localities: ["Clifton", "DHA", "Gulshan-e-Iqbal", "PECHS", "Bahria Town"] },
//   { name: "Islamabad", slug: "islamabad", image: "/images/cities/islamabad.jpg", localities: ["F-10", "DHA", "Bahria Town", "E-11", "G-11"] },
//   { name: "Rawalpindi", slug: "rawalpindi", image: "/images/cities/rawalpindi.jpg", localities: ["Bahria Town", "DHA", "Chaklala", "Saddar"] },
//   { name: "Faisalabad", slug: "faisalabad", image: "/images/cities/faisalabad.jpg", localities: ["Citi Housing", "D Ground", "Madina Town"] },
//   { name: "Multan", slug: "multan", image: "/images/cities/multan.jpg", localities: ["Gulgasht", "DHA", "Wapda Town"] },
//   { name: "Peshawar", slug: "peshawar", image: "/images/cities/peshawar.jpg", localities: ["Hayatabad", "University Town", "Saddar"] },
//   { name: "Quetta", slug: "quetta", image: "/images/cities/quetta.jpg", localities: ["Jinnah Town", "Samungli Road"] },
// ];

// // Hero cities
// export const heroCities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

// // Popular searches (jo aapne pehle add kiye the)
// export const popularSearches = [
//   { label: "Houses in Lahore", href: "/properties?city=lahore&category=homes" },
//   { label: "Apartments in Karachi", href: "/properties?city=karachi&category=homes" },
//   { label: "Plots in Islamabad", href: "/properties?city=islamabad&category=plots" },
//   { label: "Commercial in Rawalpindi", href: "/properties?city=rawalpindi&category=commercial" },
//   { label: "Homes for Rent in Faisalabad", href: "/properties?city=faisalabad&intent=rent" }
// ];

// // Projects
// export const projects = [
//   { slug: "sample-project-one", name: "Skyline Residences", developer: "Sample Developer", location: "Islamabad", image: "/images/project-1.jpg", status: "Under construction", startingFrom: "PKR 1.2 Crore" },
//   { slug: "sample-project-two", name: "Greenfield Villas", developer: "Sample Developer", location: "Lahore", image: "/images/project-2.jpg", status: "Launching soon", startingFrom: "PKR 3.4 Crore" },
//   { slug: "sample-project-three", name: "Harbour Point Towers", developer: "Sample Developer", location: "Karachi", image: "/images/project-3.jpg", status: "Ready for possession", startingFrom: "PKR 85 Lakh" },
// ];

// // Guides
// export const guides = [
//   { slug: "buyer-safety-checklist", title: "Property buyer safety checklist before you pay anything", category: "Safety", image: "/images/guide-1.jpg", readTime: "6 min read" },
//   { slug: "rent-agreement-basics", title: "Rent agreement basics every tenant should understand", category: "Renting", image: "/images/guide-2.jpg", readTime: "5 min read" },
//   { slug: "how-to-write-a-great-listing", title: "How to write a great listing that gets real enquiries", category: "Selling", image: "/images/guide-3.jpg", readTime: "4 min read" },
// ];









export type Availability = "confirmed" | "stale" | "unknown";

export interface Property {
  slug: string;
  title: string;
  price: string;
  priceValue: number; // NAYA: Directory pages ke liye zaroori hai
  location: string;
  image: string;
  beds?: number;
  baths?: number;
  area: string;
  purpose: "For Sale" | "For Rent";
  intent: "buy" | "rent";
  city: string;
  category: string;
  type: string;
  promoted?: boolean;
  availability: Availability;
  updated: string;
  lat?: number;
  lng?: number;
  imageFocus: string; // object-position for cards (PropertyCard, home sections)
  imageTransform: string; // optional CSS transform for the image wrapper
}

// NAYA: Advertise page ke liye zaroori hai
export const NAV_CITIES = [
  { slug: "lahore", name: "Lahore" },
  { slug: "karachi", name: "Karachi" },
  { slug: "islamabad", name: "Islamabad" },
  { slug: "rawalpindi", name: "Rawalpindi" },
  { slug: "faisalabad", name: "Faisalabad" },
  { slug: "multan", name: "Multan" },
  { slug: "peshawar", name: "Peshawar" },
  { slug: "quetta", name: "Quetta" },
];

const generateData = (): Property[] => {
  const properties: Property[] = [];

  const IMAGE_POOL = {
    houses: ["/images/house-1.jpg", "/images/house-2.jpg", "/images/house-3.jpg", "/images/house-4.jpg", "/images/house-5.jpg", "/images/house-6.jpg", "/images/house-7.jpg", "/images/house-8.jpg"],
    flats: ["/images/flat-1.jpg", "/images/flat-2.jpg", "/images/flat-3.jpg", "/images/flat-4.jpg", "/images/flat-5.jpg", "/images/flat-6.jpg"],
    upper: ["/images/upper-portion-1.jpg", "/images/upper-portion-2.jpg", "/images/upper-portion-3.jpg"],
    lower: ["/images/lower-portion-1.jpg"],
    plots: ["/images/plot-1.jpg", "/images/plot-2.jpg", "/images/plot-3.jpg"],
    shops: ["/images/shop-1.jpg", "/images/shop-2.jpg", "/images/shop-3.jpg"],
    offices: ["/images/office-1.jpg", "/images/office-2.jpg"],
    penthouse: ["/images/penthouse-1.jpg"],
    farm: ["/images/farm-house-1.jpg"],
    rooms: ["/images/house-2.jpg", "/images/flat-2.jpg"] 
  };

  const templates = [
    { type: "house", cat: "homes", beds: 5, baths: 5, area: "1 Kanal", basePrice: 4.5, imgList: IMAGE_POOL.houses },
    { type: "house", cat: "homes", beds: 3, baths: 3, area: "10 Marla", basePrice: 2.5, imgList: IMAGE_POOL.houses },
    { type: "flat", cat: "homes", beds: 3, baths: 3, area: "2000 sq ft", basePrice: 1.8, imgList: IMAGE_POOL.flats },
    { type: "flat", cat: "homes", beds: 2, baths: 2, area: "1200 sq ft", basePrice: 1.2, imgList: IMAGE_POOL.flats },
    { type: "upper-portion", cat: "homes", beds: 2, baths: 2, area: "5 Marla", basePrice: 1.0, imgList: IMAGE_POOL.upper },
    { type: "lower-portion", cat: "homes", beds: 2, baths: 2, area: "5 Marla", basePrice: 1.1, imgList: IMAGE_POOL.lower },
    { type: "farm-house", cat: "homes", beds: 4, baths: 4, area: "2 Kanal", basePrice: 6.5, imgList: IMAGE_POOL.farm },
    { type: "penthouse", cat: "homes", beds: 4, baths: 4, area: "4000 sq ft", basePrice: 7.0, imgList: IMAGE_POOL.penthouse },
    { type: "room", cat: "homes", beds: 1, baths: 1, area: "250 sq ft", basePrice: 0.5, imgList: IMAGE_POOL.rooms },
    { type: "residential-plot", cat: "plots", area: "10 Marla", basePrice: 1.8, imgList: IMAGE_POOL.plots },
    { type: "commercial-plot", cat: "plots", area: "4 Marla", basePrice: 3.5, imgList: IMAGE_POOL.plots },
    { type: "shop", cat: "commercial", area: "500 sq ft", basePrice: 2.5, imgList: IMAGE_POOL.shops },
    { type: "office", cat: "commercial", baths: 2, area: "1500 sq ft", basePrice: 3.0, imgList: IMAGE_POOL.offices },
  ];

  const cities = [
    { 
      slug: "lahore", name: "Lahore", 
      areas: [
        { name: "DHA Phase 6", lat: 31.4697, lng: 74.4118 }, 
        { name: "Gulberg", lat: 31.5204, lng: 74.3587 }, 
        { name: "Bahria Town", lat: 31.3667, lng: 74.1833 }, 
        { name: "Johar Town", lat: 31.4697, lng: 74.2728 }
      ] 
    },
    { 
      slug: "karachi", name: "Karachi", 
      areas: [
        { name: "Clifton", lat: 24.8138, lng: 67.0300 }, 
        { name: "DHA Phase 8", lat: 24.8000, lng: 67.0667 }, 
        { name: "Gulshan-e-Iqbal", lat: 24.9200, lng: 67.0900 }, 
        { name: "PECHS", lat: 24.8700, lng: 67.0600 }
      ] 
    },
    { 
      slug: "islamabad", name: "Islamabad", 
      areas: [
        { name: "F-10", lat: 33.6938, lng: 73.0133 }, 
        { name: "E-11", lat: 33.6844, lng: 72.9833 }, 
        { name: "DHA Phase 2", lat: 33.5333, lng: 73.1500 }, 
        { name: "G-11", lat: 33.6700, lng: 72.9900 }
      ] 
    },
    { 
      slug: "peshawar", name: "Peshawar", 
      areas: [
        { name: "Hayatabad", lat: 33.9900, lng: 71.4300 }, 
        { name: "University Town", lat: 34.0000, lng: 71.5400 }, 
        { name: "Saddar", lat: 34.0151, lng: 71.5249 }, 
        { name: "Regi Model Town", lat: 33.9500, lng: 71.5000 }
      ] 
    },
    { 
      slug: "quetta", name: "Quetta", 
      areas: [
        { name: "Jinnah Town", lat: 30.1900, lng: 67.0200 }, 
        { name: "Samungli Road", lat: 30.2200, lng: 66.9500 }, 
        { name: "Saddar", lat: 30.1798, lng: 66.9750 }, 
        { name: "Airport Road", lat: 30.2500, lng: 66.9300 }
      ] 
    },
  ];

  let idCounter = 1;

  cities.forEach((city) => {
    ["buy", "rent"].forEach((intent) => {
      templates.forEach((tpl) => {
        for (let i = 0; i < 6; i++) {
          
          const areaObj = city.areas[(idCounter * 3 + i) % city.areas.length];
          const img = tpl.imgList[(idCounter * 2 + i) % tpl.imgList.length];

          let priceStr = "";
          let priceValue = 0; // NAYA

          if (intent === "rent") {
            const baseRent = tpl.basePrice * 25000;
            const variation = i * 10000;
            priceValue = baseRent + variation;
            priceStr = `PKR ${priceValue.toLocaleString()} / month`;
          } else {
            const baseBuy = tpl.basePrice;
            const variation = i * 0.3;
            priceValue = (baseBuy + variation) * 10000000; // Crore to PKR
            priceStr = `PKR ${(baseBuy + variation).toFixed(2)} Crore`;
          }

          const beds = tpl.beds ? (tpl.beds - (i % 2)) : undefined;
          const baths = tpl.baths ? (tpl.baths - (i % 2)) : undefined;
          const titleType = tpl.type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
          const title = `${beds ? beds + " Bed " : ""}${titleType} in ${areaObj.name}`;

          const randomLatShift = (Math.random() - 0.5) * 0.015; 
          const randomLngShift = (Math.random() - 0.5) * 0.015;

          properties.push({
            slug: `${city.slug}-${intent}-${tpl.type}-${idCounter}`,
            title: title,
            price: priceStr,
            priceValue: priceValue, // NAYA
            location: `${areaObj.name}, ${city.name}`,
            image: img,
            beds: beds || undefined,
            baths: baths || undefined,
            area: tpl.area,
            purpose: intent === "buy" ? "For Sale" : "For Rent",
            intent: intent as "buy" | "rent",
            city: city.slug,
            category: tpl.cat,
            type: tpl.type,
            promoted: i === 0 && idCounter % 3 === 0,
            availability: idCounter % 4 === 0 ? "stale" : idCounter % 7 === 0 ? "unknown" : "confirmed",
            updated: `Updated ${(idCounter % 6) + 1} days ago`,
            lat: areaObj.lat + randomLatShift,
            lng: areaObj.lng + randomLngShift,
            imageFocus: "center 45%",
            imageTransform: "none",
          });
          
          idCounter++;
        }
      });
    });
  });

  return properties;
};

export const allProperties: Property[] = generateData();

// Cities export (pehle wala)
export const cities = [
  { name: "Lahore", slug: "lahore", image: "/images/lahore.jpg", localities: ["DHA Defence", "Gulberg", "Bahria Town", "Model Town", "Johar Town"] },
  { name: "Karachi", slug: "karachi", image: "/images/karachi.jpg", localities: ["Clifton", "DHA", "Gulshan-e-Iqbal", "PECHS", "Bahria Town"] },
  { name: "Islamabad", slug: "islamabad", image: "/images/islamabad.jpg", localities: ["F-10", "DHA", "Bahria Town", "E-11", "G-11"] },
  { name: "Rawalpindi", slug: "rawalpindi", image: "/images/rawalpindi.jpg", localities: ["Bahria Town", "DHA", "Chaklala", "Saddar"] },
  { name: "Faisalabad", slug: "faisalabad", image: "/images/faisalabad.jpg", localities: ["Citi Housing", "D Ground", "Madina Town"] },
  { name: "Multan", slug: "multan", image: "/images/multan.jpg", localities: ["Gulgasht", "DHA", "Wapda Town"] },
  { name: "Peshawar", slug: "peshawar", image: "/images/peshawar.jpg", localities: ["Hayatabad", "University Town", "Saddar"] },
  { name: "Quetta", slug: "quetta", image: "/images/quetta.jpg", localities: ["Jinnah Town", "Samungli Road"] },
];

// Hero cities
export const heroCities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

// Popular searches (jo aapne pehle add kiye the)
export const popularSearches = [
  { label: "Houses in Lahore", href: "/properties?city=lahore&category=homes" },
  { label: "Apartments in Karachi", href: "/properties?city=karachi&category=homes" },
  { label: "Plots in Islamabad", href: "/properties?city=islamabad&category=plots" },
  { label: "Commercial in Rawalpindi", href: "/properties?city=rawalpindi&category=commercial" },
  { label: "Homes for Rent in Faisalabad", href: "/properties?city=faisalabad&intent=rent" }
];

// Projects
export const projects = [
  { slug: "sample-project-one", name: "Skyline Residences", developer: "Sample Developer", location: "Islamabad", image: "/images/project-1.jpg", status: "Under construction", startingFrom: "PKR 1.2 Crore" },
  { slug: "sample-project-two", name: "Greenfield Villas", developer: "Sample Developer", location: "Lahore", image: "/images/project-2.jpg", status: "Launching soon", startingFrom: "PKR 3.4 Crore" },
  { slug: "sample-project-three", name: "Harbour Point Towers", developer: "Sample Developer", location: "Karachi", image: "/images/project-3.jpg", status: "Ready for possession", startingFrom: "PKR 85 Lakh" },
];

// Guides
export const guides = [
  { slug: "buyer-safety-checklist", title: "Property buyer safety checklist before you pay anything", category: "Safety", image: "/images/guide-1.jpg", readTime: "6 min read" },
  { slug: "rent-agreement-basics", title: "Rent agreement basics every tenant should understand", category: "Renting", image: "/images/guide-2.jpg", readTime: "5 min read" },
  { slug: "how-to-write-a-great-listing", title: "How to write a great listing that gets real enquiries", category: "Selling", image: "/images/guide-3.jpg", readTime: "4 min read" },
];