// Property detail page ke pure helpers (server par chalte hain, koi React nahi).
// Data.ts ko touch kiye bina: gallery, description, features, agent, similar sab yahan se banta hai.

import type { Property } from "@/lib/constants/data";
import { allProperties } from "@/lib/constants/data";
import { agents, type DirectoryItem } from "@/lib/constants/agents";
import { formatPkr } from "@/lib/formatters/currency";

/* ---------- small utils ---------- */

export function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const titleCase = (s: string) =>
  s.split(/[-\s]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export const cityName = (slug: string) => titleCase(slug);
export const typeLabel = (t: string) => titleCase(t);
export const localityOf = (p: Property) => p.location.split(",")[0].trim();
export const refId = (p: Property) => `SM-${100000 + (hash(p.slug) % 900000)}`;

/* ---------- gallery ---------- */

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

const LABELS: Record<string, string> = {
  "flat-1": "Bedroom",
  "flat-2": "Living room",
  "flat-3": "Kitchen and dining",
  "flat-4": "Lounge",
  "property-2": "Lounge with view",
  "penthouse-1": "Living area",
  "upper-portion-1": "Living room",
  "property-5": "Office desk",
  "office-1": "Open office",
  "office-2": "Office floor",
  "shop-1": "Shopfront",
  "shop-2": "Shopping street",
  "shop-3": "Retail frontage",
  "plot-1": "Plot land",
  "plot-2": "Plot with road access",
  "plot-3": "Plot surroundings",
};

const INTERIORS = ["flat-3", "flat-2", "flat-1", "property-2", "flat-4", "penthouse-1", "upper-portion-1"];
const EXTERIORS = [
  "house-1", "house-2", "house-3", "house-4", "house-6", "house-7", "house-8",
  "property-1", "property-3", "property-6", "flat-6", "upper-portion-2", "upper-portion-3",
  "lower-portion-1", "farm-house-1",
];
const PLOTS = ["plot-1", "plot-2", "plot-3"];
const SHOPS = ["shop-1", "shop-2", "shop-3"];
const OFFICES = ["office-1", "office-2", "property-5"];

const nameOf = (src: string) => src.replace(/^.*\//, "").replace(/\.\w+$/, "");

function rotate<T>(arr: T[], by: number): T[] {
  if (!arr.length) return arr;
  const k = by % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

export function getGallery(p: Property): GalleryImage[] {
  const mainName = nameOf(p.image);
  const seed = hash(p.slug);
  let rest: string[] = [];

  if (p.category === "plots") rest = rotate(PLOTS, seed);
  else if (p.category === "commercial") rest = rotate(p.type === "shop" ? SHOPS : OFFICES, seed);
  else {
    const interiors = rotate(INTERIORS, seed);
    const exteriors = rotate(EXTERIORS, seed >> 3);
    rest = [...interiors.slice(0, 4), exteriors[0]];
  }

  const seen = new Set<string>([mainName]);
  const names = [mainName];
  for (const n of rest) {
    if (!seen.has(n)) {
      seen.add(n);
      names.push(n);
    }
  }

  return names.slice(0, 6).map((n, i) => {
    const label = i === 0 ? "Main photo" : LABELS[n] ?? "Exterior view";
    return {
      src: i === 0 ? p.image : `/images/${n}.jpg`,
      alt: `${p.title}, ${label.toLowerCase()}`,
      label,
    };
  });
}

/* ---------- description (sirf listing ke data se, koi banawati claim nahi) ---------- */

export function buildDescription(p: Property): string[] {
  const type = typeLabel(p.type).toLowerCase();
  const purpose = p.purpose.toLowerCase();
  const rooms =
    p.beds && p.baths
      ? ` It has ${p.beds} bedroom${p.beds > 1 ? "s" : ""} and ${p.baths} bathroom${p.baths > 1 ? "s" : ""}.`
      : p.beds
      ? ` It has ${p.beds} bedroom${p.beds > 1 ? "s" : ""}.`
      : "";

  const availability =
    p.availability === "confirmed"
      ? "The advertiser has recently confirmed that this property is still available."
      : p.availability === "stale"
      ? "Availability was confirmed some time ago. Please check with the advertiser before you plan a visit."
      : "Availability has not been confirmed yet. Please check with the advertiser before you plan a visit.";

  return [
    `This ${type} is listed ${purpose} in ${p.location}. The listed size is ${p.area}.${rooms}`,
    `${availability} ${p.updated}.`,
    p.intent === "buy"
      ? `The asking price is ${p.price}. Arrange a viewing, see the property in person and check the ownership documents yourself before you pay any money.`
      : `The rent is ${p.price}. Arrange a viewing and agree the deposit, rent increase and agreement terms in writing before you pay any money.`,
  ];
}

/* ---------- price per unit (sirf sale par, area se calculate) ---------- */

export function pricePerUnit(p: Property): string | null {
  if (p.intent !== "buy" || !p.priceValue) return null;
  const m = p.area.match(/([\d.,]+)\s*(marla|kanal|sq\s*ft)/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ""));
  if (!n) return null;
  const unit = m[2].toLowerCase().replace(/\s+/g, " ");
  if (unit === "sq ft") return `PKR ${Math.round(p.priceValue / n).toLocaleString("en-PK")} / sq ft`;
  const marlas = unit === "kanal" ? n * 20 : n;
  return `PKR ${formatPkr(p.priceValue / marlas)} / Marla`;
}

/* ---------- features (har listing ke liye alag, deterministic) ---------- */

export type IconKey =
  | "car" | "shield" | "tree" | "bolt" | "water" | "wifi" | "fire" | "lift" | "ac" | "gym" | "pool"
  | "mosque" | "kids" | "cctv" | "kitchen" | "couch" | "dining" | "study" | "check" | "school"
  | "hospital" | "mall" | "bus" | "road" | "store" | "building" | "lock";

export interface FeatureGroup {
  title: string;
  items: { icon: IconKey; text: string }[];
}

type Cand = { icon: IconKey; text: string };

function choose(slug: string, group: string, cands: Cand[], min = 4): Cand[] {
  const picked = cands.filter((c) => hash(`${slug}|${group}|${c.text}`) % 100 < 68);
  if (picked.length >= min) return picked;
  const extra = cands.filter((c) => !picked.includes(c)).slice(0, min - picked.length);
  return [...picked, ...extra];
}

export function getFeatures(p: Property): FeatureGroup[] {
  const s = p.slug;
  const groups: FeatureGroup[] = [];

  if (p.category === "homes") {
    const isFlat = p.type === "flat" || p.type === "penthouse";
    const rooms: Cand[] = [];
    if (p.beds) rooms.push({ icon: "check", text: `${p.beds} bedroom${p.beds > 1 ? "s" : ""}` });
    if (p.baths) rooms.push({ icon: "check", text: `${p.baths} bathroom${p.baths > 1 ? "s" : ""}` });
    rooms.push(
      ...choose(s, "rooms", [
        { icon: "kitchen", text: "Fitted kitchen" },
        { icon: "couch", text: "Drawing room" },
        { icon: "dining", text: "Dining area" },
        { icon: "couch", text: "TV lounge" },
        { icon: "study", text: "Study room" },
        { icon: "check", text: "Store room" },
      ], 2)
    );
    groups.push({
      title: "Main features",
      items: choose(s, "main", [
        { icon: "car", text: "Covered parking" },
        { icon: "bolt", text: "Electricity backup" },
        { icon: "water", text: "Water supply" },
        { icon: "fire", text: "Gas connection" },
        { icon: "wifi", text: "Broadband ready" },
        { icon: "ac", text: "Air conditioning" },
        ...(isFlat ? [{ icon: "lift" as IconKey, text: "Lift" }] : [{ icon: "tree" as IconKey, text: "Garden or lawn" }]),
      ]),
    });
    groups.push({ title: "Rooms and layout", items: rooms });
    groups.push({
      title: "Society and security",
      items: choose(s, "soc", [
        { icon: "shield", text: "Gated community" },
        { icon: "cctv", text: "CCTV cameras" },
        { icon: "mosque", text: "Mosque nearby" },
        { icon: "kids", text: "Kids play area" },
        { icon: "gym", text: "Gym" },
        { icon: "tree", text: "Park" },
      ]),
    });
    groups.push({
      title: "Nearby",
      items: choose(s, "near", [
        { icon: "school", text: "Schools" },
        { icon: "hospital", text: "Hospitals" },
        { icon: "mall", text: "Shopping centres" },
        { icon: "bus", text: "Public transport" },
      ], 3),
    });
  } else if (p.category === "plots") {
    groups.push({
      title: "Plot features",
      items: choose(s, "plot", [
        { icon: "road", text: "Paved road access" },
        { icon: "bolt", text: "Electricity available" },
        { icon: "water", text: "Water connection" },
        { icon: "fire", text: "Gas available" },
        { icon: "check", text: "Corner or park facing options" },
        { icon: "shield", text: "Gated scheme" },
      ]),
    });
    groups.push({
      title: "Nearby",
      items: choose(s, "near", [
        { icon: "school", text: "Schools" },
        { icon: "hospital", text: "Hospitals" },
        { icon: "mall", text: "Shopping centres" },
        { icon: "mosque", text: "Mosque" },
      ], 3),
    });
  } else {
    groups.push({
      title: "Building features",
      items: choose(s, "bld", [
        { icon: "lift", text: "Lift" },
        { icon: "car", text: "Parking" },
        { icon: "bolt", text: "Generator backup" },
        { icon: "ac", text: "Central air conditioning" },
        { icon: "cctv", text: "CCTV and security" },
        { icon: "wifi", text: "Broadband ready" },
      ]),
    });
    groups.push({
      title: "Business use",
      items: choose(s, "biz", [
        { icon: "store", text: "Main road location" },
        { icon: "building", text: "Suitable for offices or retail" },
        { icon: "lock", text: "24 hour access" },
        { icon: "bus", text: "Public transport nearby" },
      ], 3),
    });
  }
  return groups;
}

/* ---------- agent (agents.ts se, city + speciality + area ke hisab se) ---------- */

const SPEC_BY_CAT: Record<string, string> = { homes: "houses", plots: "plots", commercial: "commercial" };

export function pickAgent(p: Property): DirectoryItem | null {
  const inCity = agents.filter((a) => a.city === p.city);
  if (!inCity.length) return agents[0] ?? null;
  const spec = SPEC_BY_CAT[p.category];
  const locality = localityOf(p);
  const best =
    inCity.filter((a) => a.areas.includes(locality) && a.specialities.includes(spec as never)) ||
    [];
  const pool = best.length
    ? best
    : inCity.filter((a) => a.specialities.includes(spec as never)).length
    ? inCity.filter((a) => a.specialities.includes(spec as never))
    : inCity;
  return pool[hash(p.slug) % pool.length];
}

/* ---------- similar listings ---------- */

export function getSimilar(p: Property, limit = 6): Property[] {
  return allProperties
    .filter((x) => x.slug !== p.slug && x.intent === p.intent)
    .map((x) => {
      const closeness = 1 - Math.min(1, Math.abs(x.priceValue - p.priceValue) / Math.max(p.priceValue, 1));
      const score =
        (x.city === p.city ? 4 : 0) +
        (x.type === p.type ? 3 : 0) +
        (x.category === p.category ? 2 : 0) +
        (localityOf(x) === localityOf(p) ? 2 : 0) +
        closeness * 2;
      return { x, score };
    })
    .sort((a, b) => b.score - a.score || a.x.slug.localeCompare(b.x.slug))
    .slice(0, limit)
    .map((r) => r.x);
}