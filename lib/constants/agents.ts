// import { allProperties, cities } from "@/lib/constants/data";

// export type Speciality = "houses" | "plots" | "commercial";

// export const SPECIALITIES: Record<Speciality, { label: string; category: string }> = {
//   houses: { label: "Houses & Flats", category: "homes" },
//   plots: { label: "Plots", category: "plots" },
//   commercial: { label: "Commercial", category: "commercial" },
// };

// export interface DirectoryItem {
//   kind: "agent" | "agency";
//   slug: string;
//   name: string;
//   image: string;
//   city: string;
//   cityName: string;
//   specialities: Speciality[];
//   areas: string[];
//   since: number;
//   idChecked: boolean;
//   agency?: string;
//   languages?: string[];
//   teamSize?: number;
//   listings: number;
//   searchText: string;
//   href: string;
// }

// type AgencyRaw = [slug: string, name: string, city: string, specs: Speciality[], areas: string[], founded: number, idChecked: boolean];
// type AgentRaw = [name: string, city: string, agencySlug: string, specs: Speciality[], areas: string[], since: number, langs: string[], idChecked: boolean];

// // HIGH QUALITY IMAGES
// const AGENCY_IMAGES: Record<string, string> = {
//   "gulberg-realty": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=100",
//   "bahria-estate-advisors": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=100",
//   "clifton-properties": "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=100",
//   "seaview-estates": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=100",
//   "capital-homes": "https://images.unsplash.com/photo-1462826303086-329426d1aef5?auto=format&fit=crop&w=800&q=100",
//   "margalla-commercial": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=100",
//   "hayatabad-estate": "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=100",
//   "frontier-realtors": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=100",
//   "jinnah-town-properties": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=100",
//   "chiltan-estates": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=100",
// };

// const AGENT_IMAGES: Record<string, string> = {
//   "Ahsan Raza": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=100",
//   "Maryam Siddiqui": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=100",
//   "Hamza Butt": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=100",
//   "Sana Malik": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=100",
//   "Faisal Ahmed": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=100",
//   "Ayesha Khan": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=100",
//   "Imran Qureshi": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=100",
//   "Zainab Hussain": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=100",
//   "Usman Tariq": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=100",
//   "Hira Javed": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=100",
//   "Bilal Chaudhry": "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&q=100",
//   "Nadia Anwar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=100",
//   "Noman Khattak": "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=400&q=100",
//   "Farah Yousafzai": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=100",
//   "Adnan Gul": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=100",
//   "Sumaira Shah": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=100",
//   "Hamid Baloch": "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=100",
//   "Rukhsana Achakzai": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=100",
//   "Tariq Mengal": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=100",
//   "Sidra Kakar": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=100",
// };

// const AGENCIES_RAW: AgencyRaw[] = [
//   ["gulberg-realty", "Gulberg Realty", "lahore", ["houses", "commercial"], ["Gulberg", "DHA Phase 6"], 2011, true],
//   ["bahria-estate-advisors", "Bahria Estate Advisors", "lahore", ["houses", "plots"], ["Bahria Town", "Johar Town"], 2016, true],
//   ["clifton-properties", "Clifton Properties", "karachi", ["houses", "commercial"], ["Clifton", "DHA Phase 8"], 2008, true],
//   ["seaview-estates", "Seaview Estates", "karachi", ["plots", "houses"], ["Gulshan-e-Iqbal", "PECHS"], 2014, false],
//   ["capital-homes", "Capital Homes", "islamabad", ["houses", "plots"], ["F-10", "E-11"], 2012, true],
//   ["margalla-commercial", "Margalla Commercial", "islamabad", ["commercial", "plots"], ["G-11", "DHA Phase 2"], 2015, true],
//   ["hayatabad-estate", "Hayatabad Estate", "peshawar", ["houses", "plots"], ["Hayatabad", "Regi Model Town"], 2010, true],
//   ["frontier-realtors", "Frontier Realtors", "peshawar", ["commercial", "houses"], ["Saddar", "University Town"], 2013, false],
//   ["jinnah-town-properties", "Jinnah Town Properties", "quetta", ["houses", "plots"], ["Jinnah Town", "Airport Road"], 2009, true],
//   ["chiltan-estates", "Chiltan Estates", "quetta", ["plots", "commercial"], ["Samungli Road", "Saddar"], 2017, false],
// ];

// const AGENTS_RAW: AgentRaw[] = [
//   ["Ahsan Raza", "lahore", "gulberg-realty", ["houses", "commercial"], ["Gulberg"], 2014, ["Urdu", "English", "Punjabi"], true],
//   ["Maryam Siddiqui", "lahore", "gulberg-realty", ["houses"], ["DHA Phase 6"], 2017, ["Urdu", "English"], true],
//   ["Hamza Butt", "lahore", "bahria-estate-advisors", ["plots", "houses"], ["Bahria Town"], 2012, ["Urdu", "Punjabi"], true],
//   ["Sana Malik", "lahore", "", ["houses"], ["Johar Town", "Gulberg"], 2019, ["Urdu", "English"], false],
//   ["Faisal Ahmed", "karachi", "clifton-properties", ["houses", "commercial"], ["Clifton"], 2010, ["Urdu", "English", "Sindhi"], true],
//   ["Ayesha Khan", "karachi", "clifton-properties", ["houses"], ["DHA Phase 8", "Clifton"], 2016, ["Urdu", "English"], true],
//   ["Imran Qureshi", "karachi", "seaview-estates", ["plots"], ["Gulshan-e-Iqbal"], 2013, ["Urdu", "Sindhi"], false],
//   ["Zainab Hussain", "karachi", "", ["houses", "plots"], ["PECHS"], 2020, ["Urdu", "English"], true],
//   ["Usman Tariq", "islamabad", "capital-homes", ["houses", "plots"], ["F-10", "E-11"], 2011, ["Urdu", "English", "Pashto"], true],
//   ["Hira Javed", "islamabad", "capital-homes", ["houses"], ["E-11"], 2018, ["Urdu", "English"], true],
//   ["Bilal Chaudhry", "islamabad", "margalla-commercial", ["commercial", "plots"], ["G-11", "DHA Phase 2"], 2013, ["Urdu", "English", "Punjabi"], true],
//   ["Nadia Anwar", "islamabad", "", ["houses"], ["F-10"], 2021, ["Urdu", "English"], false],
//   ["Noman Khattak", "peshawar", "hayatabad-estate", ["houses", "plots"], ["Hayatabad"], 2012, ["Urdu", "Pashto"], true],
//   ["Farah Yousafzai", "peshawar", "hayatabad-estate", ["houses"], ["Regi Model Town", "Hayatabad"], 2017, ["Urdu", "Pashto", "English"], true],
//   ["Adnan Gul", "peshawar", "frontier-realtors", ["commercial"], ["Saddar"], 2015, ["Urdu", "Pashto"], false],
//   ["Sumaira Shah", "peshawar", "", ["houses", "commercial"], ["University Town"], 2019, ["Urdu", "English"], true],
//   ["Hamid Baloch", "quetta", "jinnah-town-properties", ["houses", "plots"], ["Jinnah Town"], 2011, ["Urdu", "Balochi", "Pashto"], true],
//   ["Rukhsana Achakzai", "quetta", "jinnah-town-properties", ["houses"], ["Airport Road"], 2018, ["Urdu", "Pashto"], false],
//   ["Tariq Mengal", "quetta", "chiltan-estates", ["plots", "commercial"], ["Samungli Road"], 2014, ["Urdu", "Balochi"], true],
//   ["Sidra Kakar", "quetta", "", ["houses", "plots"], ["Saddar", "Samungli Road"], 2020, ["Urdu", "English"], true],
// ];

// const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;
// const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// function countListings(city: string, areas: string[], specs: Speciality[]) {
//   const cats = specs.map((s) => SPECIALITIES[s].category);
//   return allProperties.filter(
//     (p) => p.city === city && areas.includes(p.location.split(",")[0].trim()) && cats.includes(p.category)
//   ).length;
// }

// // Yahan hum exact wahi filter link bana rahe hain jo count ke liye use hua
// const listingsHref = (city: string, areas: string[], specs: Speciality[]) => {
//   const cats = specs.map((s) => SPECIALITIES[s].category);
//   const params = new URLSearchParams();
//   params.set("city", city);
//   params.set("locality", areas[0]);
//   params.set("category", cats[0]);
//   params.set("intent", "buy");
//   return `/properties?${params.toString()}`;
// };

// export const agencies: DirectoryItem[] = AGENCIES_RAW.map(([slug, name, city, specialities, areas, since, idChecked]) => ({
//   kind: "agency",
//   slug,
//   name,
//   image: AGENCY_IMAGES[slug] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=100",
//   city,
//   cityName: cityName(city),
//   specialities,
//   areas,
//   since,
//   idChecked,
//   teamSize: AGENTS_RAW.filter((a) => a[2] === slug).length,
//   listings: countListings(city, areas, specialities),
//   searchText: `${name} ${cityName(city)} ${areas.join(" ")} ${specialities.map((s) => SPECIALITIES[s].label).join(" ")}`.toLowerCase(),
//   href: listingsHref(city, areas, specialities),
// }));

// export const agents: DirectoryItem[] = AGENTS_RAW.map(([name, city, agencySlug, specialities, areas, since, languages, idChecked]) => {
//   const agencyName = AGENCIES_RAW.find((a) => a[0] === agencySlug)?.[1];
//   return {
//     kind: "agent" as const,
//     slug: slugify(name),
//     name,
//     image: AGENT_IMAGES[name] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=100",
//     city,
//     cityName: cityName(city),
//     specialities,
//     areas,
//     since,
//     idChecked,
//     agency: agencyName,
//     languages,
//     listings: countListings(city, areas, specialities),
//     searchText: `${name} ${agencyName ?? ""} ${cityName(city)} ${areas.join(" ")}`.toLowerCase(),
//     href: listingsHref(city, areas, specialities),
//   };
// });

// export const DIRECTORY_CITIES = cities.map((c) => ({ slug: c.slug, name: c.name }));




import { allProperties, cities } from "@/lib/constants/data";

export type Speciality = "houses" | "plots" | "commercial";

export const SPECIALITIES: Record<Speciality, { label: string; category: string }> = {
  houses: { label: "Houses & Flats", category: "homes" },
  plots: { label: "Plots", category: "plots" },
  commercial: { label: "Commercial", category: "commercial" },
};

export interface DirectoryItem {
  kind: "agent" | "agency";
  slug: string;
  name: string;
  image: string;
  city: string;
  cityName: string;
  specialities: Speciality[];
  areas: string[];
  since: number;
  idChecked: boolean;
  agency?: string;
  languages?: string[];
  teamSize?: number;
  listings: number;
  searchText: string;
  href: string;
}

type AgencyRaw = [slug: string, name: string, city: string, specs: Speciality[], areas: string[], founded: number, idChecked: boolean];
type AgentRaw = [name: string, city: string, agencySlug: string, specs: Speciality[], areas: string[], since: number, langs: string[], idChecked: boolean];

// HIGH QUALITY IMAGES
const AGENCY_IMAGES: Record<string, string> = {
  "gulberg-realty": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=100",
  "bahria-estate-advisors": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=100",
  "clifton-properties": "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=100",
  "seaview-estates": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=100",
  "capital-homes": "https://images.unsplash.com/photo-1462826303086-329426d1aef5?auto=format&fit=crop&w=800&q=100",
  "margalla-commercial": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=100",
  "hayatabad-estate": "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=100",
  "frontier-realtors": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=100",
  "jinnah-town-properties": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=100",
  "chiltan-estates": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=100",
};

const AGENT_IMAGES: Record<string, string> = {
  "Ahsan Raza": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=100",
  "Maryam Siddiqui": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=100",
  "Hamza Butt": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=100",
  "Sana Malik": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=100",
  "Faisal Ahmed": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=100",
  "Ayesha Khan": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=100",
  "Imran Qureshi": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=100",
  "Zainab Hussain": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=100",
  "Usman Tariq": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=100",
  "Hira Javed": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=100",
  "Bilal Chaudhry": "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&q=100",
  "Nadia Anwar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=100",
  "Noman Khattak": "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=400&q=100",
  "Farah Yousafzai": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=100",
  "Adnan Gul": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=100",
  "Sumaira Shah": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=100",
  "Hamid Baloch": "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=100",
  "Rukhsana Achakzai": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=100",
  "Tariq Mengal": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=100",
  "Sidra Kakar": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=100",
};

const AGENCIES_RAW: AgencyRaw[] = [
  ["gulberg-realty", "Gulberg Realty", "lahore", ["houses", "commercial"], ["Gulberg", "DHA Phase 6"], 2011, true],
  ["bahria-estate-advisors", "Bahria Estate Advisors", "lahore", ["houses", "plots"], ["Bahria Town", "Johar Town"], 2016, true],
  ["clifton-properties", "Clifton Properties", "karachi", ["houses", "commercial"], ["Clifton", "DHA Phase 8"], 2008, true],
  ["seaview-estates", "Seaview Estates", "karachi", ["plots", "houses"], ["Gulshan-e-Iqbal", "PECHS"], 2014, false],
  ["capital-homes", "Capital Homes", "islamabad", ["houses", "plots"], ["F-10", "E-11"], 2012, true],
  ["margalla-commercial", "Margalla Commercial", "islamabad", ["commercial", "plots"], ["G-11", "DHA Phase 2"], 2015, true],
  ["hayatabad-estate", "Hayatabad Estate", "peshawar", ["houses", "plots"], ["Hayatabad", "Regi Model Town"], 2010, true],
  ["frontier-realtors", "Frontier Realtors", "peshawar", ["commercial", "houses"], ["Saddar", "University Town"], 2013, false],
  ["jinnah-town-properties", "Jinnah Town Properties", "quetta", ["houses", "plots"], ["Jinnah Town", "Airport Road"], 2009, true],
  ["chiltan-estates", "Chiltan Estates", "quetta", ["plots", "commercial"], ["Samungli Road", "Saddar"], 2017, false],
];

const AGENTS_RAW: AgentRaw[] = [
  ["Ahsan Raza", "lahore", "gulberg-realty", ["houses", "commercial"], ["Gulberg"], 2014, ["Urdu", "English", "Punjabi"], true],
  ["Maryam Siddiqui", "lahore", "gulberg-realty", ["houses"], ["DHA Phase 6"], 2017, ["Urdu", "English"], true],
  ["Hamza Butt", "lahore", "bahria-estate-advisors", ["plots", "houses"], ["Bahria Town"], 2012, ["Urdu", "Punjabi"], true],
  ["Sana Malik", "lahore", "", ["houses"], ["Johar Town", "Gulberg"], 2019, ["Urdu", "English"], false],
  ["Faisal Ahmed", "karachi", "clifton-properties", ["houses", "commercial"], ["Clifton"], 2010, ["Urdu", "English", "Sindhi"], true],
  ["Ayesha Khan", "karachi", "clifton-properties", ["houses"], ["DHA Phase 8", "Clifton"], 2016, ["Urdu", "English"], true],
  ["Imran Qureshi", "karachi", "seaview-estates", ["plots"], ["Gulshan-e-Iqbal"], 2013, ["Urdu", "Sindhi"], false],
  ["Zainab Hussain", "karachi", "", ["houses", "plots"], ["PECHS"], 2020, ["Urdu", "English"], true],
  ["Usman Tariq", "islamabad", "capital-homes", ["houses", "plots"], ["F-10", "E-11"], 2011, ["Urdu", "English", "Pashto"], true],
  ["Hira Javed", "islamabad", "capital-homes", ["houses"], ["E-11"], 2018, ["Urdu", "English"], true],
  ["Bilal Chaudhry", "islamabad", "margalla-commercial", ["commercial", "plots"], ["G-11", "DHA Phase 2"], 2013, ["Urdu", "English", "Punjabi"], true],
  ["Nadia Anwar", "islamabad", "", ["houses"], ["F-10"], 2021, ["Urdu", "English"], false],
  ["Noman Khattak", "peshawar", "hayatabad-estate", ["houses", "plots"], ["Hayatabad"], 2012, ["Urdu", "Pashto"], true],
  ["Farah Yousafzai", "peshawar", "hayatabad-estate", ["houses"], ["Regi Model Town", "Hayatabad"], 2017, ["Urdu", "Pashto", "English"], true],
  ["Adnan Gul", "peshawar", "frontier-realtors", ["commercial"], ["Saddar"], 2015, ["Urdu", "Pashto"], false],
  ["Sumaira Shah", "peshawar", "", ["houses", "commercial"], ["University Town"], 2019, ["Urdu", "English"], true],
  ["Hamid Baloch", "quetta", "jinnah-town-properties", ["houses", "plots"], ["Jinnah Town"], 2011, ["Urdu", "Balochi", "Pashto"], true],
  ["Rukhsana Achakzai", "quetta", "jinnah-town-properties", ["houses"], ["Airport Road"], 2018, ["Urdu", "Pashto"], false],
  ["Tariq Mengal", "quetta", "chiltan-estates", ["plots", "commercial"], ["Samungli Road"], 2014, ["Urdu", "Balochi"], true],
  ["Sidra Kakar", "quetta", "", ["houses", "plots"], ["Saddar", "Samungli Road"], 2020, ["Urdu", "English"], true],
];

const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// EXACT LOGIC: Count nikalte waqt city, AREA, aur CATEGORY ka filter
function countListings(city: string, areas: string[], specs: Speciality[]) {
  const cats = specs.map((s) => SPECIALITIES[s].category);
  return allProperties.filter(
    (p) => p.city === city && areas.includes(p.location.split(",")[0].trim()) && cats.includes(p.category)
  ).length;
}

// EXACT LOGIC: Link banate waqt wahi filter URL mein pass karein
const listingsHref = (city: string, areas: string[], specs: Speciality[]) => {
  const cats = specs.map((s) => SPECIALITIES[s].category);
  const params = new URLSearchParams();
  params.set("city", city);
  params.set("locality", areas[0]);
  params.set("category", cats[0]);
  params.set("intent", "buy");
  return `/properties?${params.toString()}`;
};

export const agencies: DirectoryItem[] = AGENCIES_RAW.map(([slug, name, city, specialities, areas, since, idChecked]) => ({
  kind: "agency",
  slug,
  name,
  image: AGENCY_IMAGES[slug] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=100",
  city,
  cityName: cityName(city),
  specialities,
  areas,
  since,
  idChecked,
  teamSize: AGENTS_RAW.filter((a) => a[2] === slug).length,
  listings: countListings(city, areas, specialities),
  searchText: `${name} ${cityName(city)} ${areas.join(" ")} ${specialities.map((s) => SPECIALITIES[s].label).join(" ")}`.toLowerCase(),
  href: listingsHref(city, areas, specialities),
}));

export const agents: DirectoryItem[] = AGENTS_RAW.map(([name, city, agencySlug, specialities, areas, since, languages, idChecked]) => {
  const agencyName = AGENCIES_RAW.find((a) => a[0] === agencySlug)?.[1];
  return {
    kind: "agent" as const,
    slug: slugify(name),
    name,
    image: AGENT_IMAGES[name] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=100",
    city,
    cityName: cityName(city),
    specialities,
    areas,
    since,
    idChecked,
    agency: agencyName,
    languages,
    listings: countListings(city, areas, specialities),
    searchText: `${name} ${agencyName ?? ""} ${cityName(city)} ${areas.join(" ")}`.toLowerCase(),
    href: listingsHref(city, areas, specialities),
  };
});

export const DIRECTORY_CITIES = cities.map((c) => ({ slug: c.slug, name: c.name }));