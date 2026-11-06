// // export interface CityItem {
// //   name: string;
// //   slug: string;
// //   image: string;
// //   localities?: string[];
// // }

// // export type Availability = "confirmed" | "stale" | "unknown";

// // export interface PropertyItem {
// //   slug: string;
// //   title: string;
// //   price: string;
// //   location: string;
// //   image: string;
// //   beds?: number;
// //   baths?: number;
// //   area: string;
// //   purpose: "For Sale" | "For Rent";
// //   promoted?: boolean;
// //   availability: Availability;
// //   updated: string;
// // }

// // export interface ProjectItem {
// //   slug: string;
// //   name: string;
// //   developer: string;
// //   location: string;
// //   image: string;
// //   status: string;
// //   startingFrom: string;
// // }

// // export interface GuideItem {
// //   slug: string;
// //   title: string;
// //   category: string;
// //   image: string;
// //   readTime: string;
// // }

// // export const cities: CityItem[] = [
// //   { name: "Lahore", slug: "lahore", image: "/images/lahore.jpg", localities: ["DHA Defence", "Gulberg", "Bahria Town", "Model Town", "Johar Town"] },
// //   { name: "Karachi", slug: "karachi", image: "/images/karachi.jpg", localities: ["Clifton", "DHA", "Gulshan-e-Iqbal", "PECHS", "Bahria Town"] },
// //   { name: "Islamabad", slug: "islamabad", image: "/images/islamabad.jpg", localities: ["F-10", "DHA", "Bahria Town", "E-11", "G-11"] },
// //   { name: "Rawalpindi", slug: "rawalpindi", image: "/images/rawalpindi.jpg", localities: ["Bahria Town", "DHA", "Chaklala", "Saddar"] },
// //   { name: "Faisalabad", slug: "faisalabad", image: "/images/faisalabad.jpg", localities: ["Citi Housing", "D Ground", "Madina Town"] },
// //   { name: "Multan", slug: "multan", image: "/images/multan.jpg", localities: ["Gulgasht", "DHA", "Wapda Town"] },
// //   { name: "Peshawar", slug: "peshawar", image: "/images/peshawar.jpg", localities: ["Hayatabad", "University Town", "Saddar"] },
// //   { name: "Quetta", slug: "quetta", image: "/images/quetta.jpg", localities: ["Jinnah Town", "Samungli Road"] },
// // ];

// // export const heroCities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

// // export const popularSearches = [
// //   { label: "Houses in Lahore", href: "/properties?city=lahore&category=residential:house" },
// //   { label: "Apartments in Karachi", href: "/properties?city=karachi&category=residential:apartment" },
// //   { label: "Plots in Islamabad", href: "/properties?city=islamabad&category=plot" },
// //   { label: "Commercial in Rawalpindi", href: "/properties?city=rawalpindi&category=commercial" },
// //   { label: "Homes for Rent in Faisalabad", href: "/properties?city=faisalabad&intent=rent" }
// // ];

// // export const properties: PropertyItem[] = [
// //   {
// //     slug: "modern-house-dha-phase-6-lahore",
// //     title: "Modern 1 Kanal House with Lawn",
// //     price: "PKR 8.5 Crore",
// //     location: "DHA Phase 6, Lahore",
// //     image: "/images/property-1.jpg", // Modern dark house exterior
// //     beds: 5, baths: 6, area: "1 Kanal",
// //     purpose: "For Sale", promoted: true,
// //     availability: "confirmed", updated: "Updated 2 days ago",
// //   },
// //   {
// //     slug: "luxury-apartment-clifton-karachi",
// //     title: "Luxury Sea View Apartment",
// //     price: "PKR 4.2 Crore",
// //     location: "Clifton, Karachi",
// //     image: "/images/property-2.jpg", // Sea view living room
// //     beds: 3, baths: 3, area: "2,100 sq ft",
// //     purpose: "For Sale", promoted: true,
// //     availability: "stale", updated: "Updated 2 weeks ago",
// //   },
// //   {
// //     slug: "family-house-f-10-islamabad",
// //     title: "Family House near Markaz",
// //     price: "PKR 3.8 Lakh / month",
// //     location: "F-10, Islamabad",
// //     image: "/images/property-3.jpg", // White beautiful house exterior
// //     beds: 4, baths: 4, area: "500 sq yd",
// //     purpose: "For Rent",
// //     availability: "confirmed", updated: "Updated yesterday",
// //   },
// //   {
// //     slug: "corner-plot-bahria-town-rawalpindi",
// //     title: "Corner Residential Plot",
// //     price: "PKR 1.9 Crore",
// //     location: "Bahria Town, Rawalpindi",
// //     image: "/images/property-4.jpg", // Apartment buildings rendering
// //     area: "10 Marla",
// //     purpose: "For Sale",
// //     availability: "unknown", updated: "Updated 1 month ago",
// //   },
// //   {
// //     slug: "office-space-gulberg-lahore",
// //     title: "Premium Office Floor",
// //     price: "PKR 6.5 Lakh / month",
// //     location: "Gulberg III, Lahore",
// //     image: "/images/property-5.jpg", // Office interior
// //     baths: 2, area: "3,500 sq ft",
// //     purpose: "For Rent",
// //     availability: "confirmed", updated: "Updated 3 days ago",
// //   },
// //   {
// //     slug: "townhouse-citi-housing-faisalabad",
// //     title: "Brand New Double Storey House",
// //     price: "PKR 2.6 Crore",
// //     location: "Citi Housing, Faisalabad",
// //     image: "/images/property-6.jpg", // Modern double story house
// //     beds: 4, baths: 4, area: "7 Marla",
// //     purpose: "For Sale",
// //     availability: "confirmed", updated: "Updated today",
// //   },
// // ];

// // export const projects: ProjectItem[] = [
// //   {
// //     slug: "sample-project-one",
// //     name: "Skyline Residences",
// //     developer: "Sample Developer",
// //     location: "Islamabad",
// //     image: "/images/project-1.jpg", // Upright apartment towers
// //     status: "Under construction",
// //     startingFrom: "PKR 1.2 Crore",
// //   },
// //   {
// //     slug: "sample-project-two",
// //     name: "Greenfield Villas",
// //     developer: "Sample Developer",
// //     location: "Lahore",
// //     image: "/images/project-2.jpg", // Luxury house with lights
// //     status: "Launching soon",
// //     startingFrom: "PKR 3.4 Crore",
// //   },
// //   {
// //     slug: "sample-project-three",
// //     name: "Harbour Point Towers",
// //     developer: "Sample Developer",
// //     location: "Karachi",
// //     image: "/images/project-3.jpg", // Tall glass building
// //     status: "Ready for possession",
// //     startingFrom: "PKR 85 Lakh",
// //   },
// // ];

// // export const guides: GuideItem[] = [
// //   {
// //     slug: "buyer-safety-checklist",
// //     title: "Property buyer safety checklist before you pay anything",
// //     category: "Safety",
// //     image: "/images/guide-1.jpg", // Clipboard checklist
// //     readTime: "6 min read",
// //   },
// //   {
// //     slug: "rent-agreement-basics",
// //     title: "Rent agreement basics every tenant should understand",
// //     category: "Renting",
// //     image: "/images/guide-2.jpg", // Signing contract with keys
// //     readTime: "5 min read",
// //   },
// //   {
// //     slug: "how-to-write-a-great-listing",
// //     title: "How to write a great listing that gets real enquiries",
// //     category: "Selling",
// //     image: "/images/guide-3.jpg", // Laptop with website
// //     readTime: "4 min read",
// //   },
// // ];





// import { allProperties, NAV_CITIES } from "@/lib/constants/data";
// import type { Property } from "@/lib/constants/data";
// import { formatPkr } from "@/lib/formatters/currency";

// /* ------------------------------------------------------------------ */
// /* Home page ka saara data ab allProperties (lib/constants/data.ts)     */
// /* se aata hai, taake counts, prices aur links hamesha real hon.        */
// /* ------------------------------------------------------------------ */

// export interface CityItem {
//   name: string;
//   slug: string;
//   image: string;
//   buyCount: number;
//   rentCount: number;
//   startingPrice: string; // buy listings ka sab se sasta
// }

// export interface AreaItem {
//   name: string;
//   location: string;
//   city: string;
//   cityName: string;
//   count: number;
//   startingPrice: string;
//   image: string;
//   imageFocus: string;
//   imageTransform: string;
// }

// export interface GuideItem {
//   slug: string;
//   title: string;
//   category: string;
//   image: string;
//   readTime: string;
//   author: string;
//   updated: string;
// }

// const CITY_IMAGES: Record<string, string> = {
//   lahore: "/images/lahore.jpg",
//   karachi: "/images/karachi.jpg",
//   islamabad: "/images/islamabad.jpg",
//   peshawar: "/images/peshawar.jpg",
//   quetta: "/images/quetta.jpg",
// };

// const minPrice = (list: Property[]) =>
//   list.length ? `PKR ${formatPkr(Math.min(...list.map((p) => p.priceValue)))}` : "";

// export const cities: CityItem[] = NAV_CITIES.map((c) => {
//   const inCity = allProperties.filter((p) => p.city === c.slug);
//   const buy = inCity.filter((p) => p.intent === "buy");
//   return {
//     name: c.name,
//     slug: c.slug,
//     image: CITY_IMAGES[c.slug],
//     buyCount: buy.length,
//     rentCount: inCity.length - buy.length,
//     startingPrice: minPrice(buy),
//   };
// });

// export const areas: AreaItem[] = (() => {
//   const groups = new Map<string, Property[]>();
//   allProperties.forEach((p) => {
//     const g = groups.get(p.location);
//     if (g) g.push(p);
//     else groups.set(p.location, [p]);
//   });
//   return Array.from(groups.entries()).map(([location, list]) => {
//     const buy = list.filter((p) => p.intent === "buy");
//     const cover = buy.find((p) => p.type === "house") || buy[0] || list[0];
//     const cityName = NAV_CITIES.find((c) => c.slug === list[0].city)?.name || "";
//     return {
//       name: location.split(",")[0].trim(),
//       location,
//       city: list[0].city,
//       cityName,
//       count: list.length,
//       startingPrice: minPrice(buy),
//       image: cover.image,
//       imageFocus: cover.imageFocus,
//       imageTransform: cover.imageTransform,
//     };
//   });
// })();

// export const heroStats = {
//   listings: allProperties.length,
//   cities: NAV_CITIES.length,
//   areas: areas.length,
//   forSale: allProperties.filter((p) => p.intent === "buy").length,
//   forRent: allProperties.filter((p) => p.intent === "rent").length,
// };

// export const heroCities = NAV_CITIES.map((c) => c.name);

// export const popularSearches = [
//   { label: "Houses in Lahore", href: "/properties?city=lahore&intent=buy&category=homes&type=house" },
//   { label: "Flats in Karachi", href: "/properties?city=karachi&intent=buy&category=homes&type=flat" },
//   { label: "Plots in Islamabad", href: "/properties?city=islamabad&intent=buy&category=plots" },
//   { label: "Commercial in Peshawar", href: "/properties?city=peshawar&intent=buy&category=commercial" },
//   { label: "Homes for Rent in Quetta", href: "/properties?city=quetta&intent=rent&category=homes" },
// ];

// // Har city se barabar listings (round robin), taake home par ek hi shehar na chhaye
// export function pickDiverse(list: Property[], n: number): Property[] {
//   const byCity = new Map<string, Property[]>();
//   list.forEach((p) => {
//     const g = byCity.get(p.city);
//     if (g) g.push(p);
//     else byCity.set(p.city, [p]);
//   });
//   const queues = Array.from(byCity.values());
//   const out: Property[] = [];
//   let i = 0;
//   while (out.length < n && queues.some((q) => q.length)) {
//     const q = queues[i % queues.length];
//     if (q.length) out.push(q.shift()!);
//     i++;
//   }
//   return out;
// }

// // buy / rent pages ab bhi `properties` import karte hain, isliye yeh export rakha hai
// export const properties: Property[] = [
//   ...pickDiverse(allProperties.filter((p) => p.intent === "buy" && p.promoted), 6),
//   ...pickDiverse(allProperties.filter((p) => p.intent === "rent" && p.promoted), 6),
// ];

// export const guides: GuideItem[] = [
//   {
//     slug: "buyer-safety-checklist",
//     title: "Property buyer safety checklist before you pay anything",
//     category: "Safety",
//     image: "/images/guide-1.jpg",
//     readTime: "6 min read",
//     author: "Season Marketing Team",
//     updated: "Updated Oct 2026",
//   },
//   {
//     slug: "rent-agreement-basics",
//     title: "Rent agreement basics every tenant should understand",
//     category: "Renting",
//     image: "/images/guide-2.jpg",
//     readTime: "5 min read",
//     author: "Season Marketing Team",
//     updated: "Updated Oct 2026",
//   },
//   {
//     slug: "how-to-write-a-great-listing",
//     title: "How to write a great listing that gets real enquiries",
//     category: "Selling",
//     image: "/images/guide-3.jpg",
//     readTime: "4 min read",
//     author: "Season Marketing Team",
//     updated: "Updated Oct 2026",
//   },
// ];




import { allProperties, NAV_CITIES } from "@/lib/constants/data";
import type { Property } from "@/lib/constants/data";
import { formatPkr } from "@/lib/formatters/currency";

/* ------------------------------------------------------------------ */
/* Home page ka saara data ab allProperties (lib/constants/data.ts)     */
/* se aata hai, taake counts, prices aur links hamesha real hon.        */
/* ------------------------------------------------------------------ */

export interface CityItem {
  name: string;
  slug: string;
  image: string;
  buyCount: number;
  rentCount: number;
  startingPrice: string; // buy listings ka sab se sasta
}

export interface AreaItem {
  name: string;
  location: string;
  city: string;
  cityName: string;
  count: number;
  startingPrice: string;
  image: string;
  imageFocus?: string;
  imageTransform?: string;
}

export interface GuideItem {
  slug: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  author: string;
  updated: string;
}

const CITY_IMAGES: Record<string, string> = {
  lahore: "/images/lahore.jpg",
  karachi: "/images/karachi.jpg",
  islamabad: "/images/islamabad.jpg",
  peshawar: "/images/peshawar.jpg",
  quetta: "/images/quetta.jpg",
};

const minPrice = (list: Property[]) =>
  list.length
    ? `PKR ${formatPkr(Math.min(...list.map((p) => p.priceValue)))}`
    : "";

export const cities: CityItem[] = NAV_CITIES.map((c) => {
  const inCity = allProperties.filter((p) => p.city === c.slug);
  const buy = inCity.filter((p) => p.intent === "buy");
  return {
    name: c.name,
    slug: c.slug,
    image: CITY_IMAGES[c.slug],
    buyCount: buy.length,
    rentCount: inCity.length - buy.length,
    startingPrice: minPrice(buy),
  };
});

export const areas: AreaItem[] = (() => {
  const groups = new Map<string, Property[]>();
  allProperties.forEach((p) => {
    const g = groups.get(p.location);
    if (g) g.push(p);
    else groups.set(p.location, [p]);
  });
  return Array.from(groups.entries()).map(([location, list]) => {
    const buy = list.filter((p) => p.intent === "buy");
    const cover = buy.find((p) => p.type === "house") || buy[0] || list[0];
    const cityName =
      NAV_CITIES.find((c) => c.slug === list[0].city)?.name || "";
    return {
      name: location.split(",")[0].trim(),
      location,
      city: list[0].city,
      cityName,
      count: list.length,
      startingPrice: minPrice(buy),
      image: cover.image,
      imageFocus: cover.imageFocus,
      imageTransform: cover.imageTransform,
    };
  });
})();

export const heroStats = {
  listings: allProperties.length,
  cities: NAV_CITIES.length,
  areas: areas.length,
  forSale: allProperties.filter((p) => p.intent === "buy").length,
  forRent: allProperties.filter((p) => p.intent === "rent").length,
};

export const heroCities = NAV_CITIES.map((c) => c.name);

export const popularSearches = [
  {
    label: "Houses in Lahore",
    href: "/properties?city=lahore&intent=buy&category=homes&type=house",
  },
  {
    label: "Flats in Karachi",
    href: "/properties?city=karachi&intent=buy&category=homes&type=flat",
  },
  {
    label: "Plots in Islamabad",
    href: "/properties?city=islamabad&intent=buy&category=plots",
  },
  {
    label: "Commercial in Peshawar",
    href: "/properties?city=peshawar&intent=buy&category=commercial",
  },
  {
    label: "Homes for Rent in Quetta",
    href: "/properties?city=quetta&intent=rent&category=homes",
  },
];

// Har city se barabar listings (round robin), taake home par ek hi shehar na chhaye
export function pickDiverse(list: Property[], n: number): Property[] {
  const byCity = new Map<string, Property[]>();
  list.forEach((p) => {
    const g = byCity.get(p.city);
    if (g) g.push(p);
    else byCity.set(p.city, [p]);
  });
  const queues = Array.from(byCity.values());
  const out: Property[] = [];
  let i = 0;
  while (out.length < n && queues.some((q) => q.length)) {
    const q = queues[i % queues.length];
    if (q.length) out.push(q.shift()!);
    i++;
  }
  return out;
}

// buy / rent pages ab bhi `properties` import karte hain, isliye yeh export rakha hai
export const properties: Property[] = [
  ...pickDiverse(
    allProperties.filter((p) => p.intent === "buy" && p.promoted),
    6
  ),
  ...pickDiverse(
    allProperties.filter((p) => p.intent === "rent" && p.promoted),
    6
  ),
];

export const guides: GuideItem[] = [
  {
    slug: "buyer-safety-checklist",
    title: "Property buyer safety checklist before you pay anything",
    category: "Safety",
    image: "/images/guide-1.jpg",
    readTime: "6 min read",
    author: "Season Marketing Team",
    updated: "Updated Oct 2026",
  },
  {
    slug: "rent-agreement-basics",
    title: "Rent agreement basics every tenant should understand",
    category: "Renting",
    image: "/images/guide-2.jpg",
    readTime: "5 min read",
    author: "Season Marketing Team",
    updated: "Updated Oct 2026",
  },
  {
    slug: "how-to-write-a-great-listing",
    title: "How to write a great listing that gets real enquiries",
    category: "Selling",
    image: "/images/guide-3.jpg",
    readTime: "4 min read",
    author: "Season Marketing Team",
    updated: "Updated Oct 2026",
  },
];