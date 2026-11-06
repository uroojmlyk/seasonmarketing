export type Intent = "buy" | "rent" | "project";

export const CITY_GROUPS = [
  {
    province: "Punjab",
    cities: [
      { value: "lahore", label: "Lahore" },
      { value: "rawalpindi", label: "Rawalpindi" },
      { value: "faisalabad", label: "Faisalabad" },
      { value: "multan", label: "Multan" },
    ],
  },
  {
    province: "Sindh",
    cities: [
      { value: "karachi", label: "Karachi" },
      { value: "hyderabad", label: "Hyderabad" },
    ],
  },
  {
    province: "Federal",
    cities: [{ value: "islamabad", label: "Islamabad" }],
  },
  {
    province: "KPK",
    cities: [
      { value: "peshawar", label: "Peshawar" },
      { value: "abbottabad", label: "Abbottabad" },
    ],
  },
  {
    province: "Balochistan",
    cities: [{ value: "quetta", label: "Quetta" }],
  },
];

export const CATEGORY_GROUPS = [
  {
    label: "Residential",
    options: [
      { value: "residential:house", label: "House" },
      { value: "residential:apartment", label: "Apartment" },
      { value: "residential:portion", label: "Portion" },
    ],
  },
  {
    label: "Plots",
    options: [
      { value: "plot:residential", label: "Residential Plot" },
      { value: "plot:commercial", label: "Commercial Plot" },
      { value: "plot:agricultural", label: "Agricultural Land" },
    ],
  },
  {
    label: "Commercial",
    options: [
      { value: "commercial:office", label: "Office" },
      { value: "commercial:shop", label: "Shop" },
      { value: "commercial:warehouse", label: "Warehouse" },
    ],
  },
];

export const BEDROOM_OPTIONS = ["1", "2", "3", "4", "5", "6"];
export const BATHROOM_OPTIONS = ["1", "2", "3", "4", "5"];
export const AREA_UNITS = [
  { value: "marla", label: "Marla" },
  { value: "kanal", label: "Kanal" },
  { value: "sqft", label: "Sq. Ft." },
  { value: "sqyd", label: "Sq. Yd." },
];
export const LISTED_WITHIN = [
  { value: "1", label: "Last 24 hours" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
];