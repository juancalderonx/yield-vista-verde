// Farm locations
export const FARM_LOCATIONS = [
  {
    id: 1,
    name: "Finca El Paraíso",
    lat: 4.42,
    lng: -70.0529,
    hectares: 120,
    available: 45,
  },
  {
    id: 2,
    name: "Finca Nueva Esperanza",
    lat: 4.567,
    lng: -70.2129,
    hectares: 85,
    available: 30,
  },
  {
    id: 3,
    name: "Finca El Porvenir",
    lat: 4.31,
    lng: -69.9829,
    hectares: 150,
    available: 60,
  },
  {
    id: 4,
    name: "Finca Los Laureles",
    lat: 4.62,
    lng: -70.1529,
    hectares: 95,
    available: 40,
  },
];

// Risk matrix categories
export const RISK_CATEGORIES = [
  {
    name: "Clima",
    level: "Medio",
    description: "Posibles sequías o lluvias excesivas",
  },
  {
    name: "Plagas",
    level: "Bajo",
    description: "Controles preventivos establecidos",
  },
  {
    name: "Mercado",
    level: "Bajo",
    description: "Demanda creciente y estable",
  },
  {
    name: "Político",
    level: "Bajo",
    description: "Región con estabilidad política",
  },
  {
    name: "Operativo",
    level: "Bajo",
    description: "Equipo experimentado en la zona",
  },
];

// Investment distribution
export const INVESTMENT_DISTRIBUTION = [
  { category: "Agricultores", percentage: 40 },
  { category: "Operación", percentage: 25 },
  { category: "GreenYield", percentage: 20 },
  { category: "Fiducia", percentage: 10 },
  { category: "Reserva", percentage: 5 },
];

// Investment comparison
export const INVESTMENT_COMPARISON = [
  {
    type: "Marañón GreenYield",
    returnRate: 12,
    riskLevel: "Medio-Bajo",
    timeframe: "5-10 años",
  },
  {
    type: "Aguacate Hass",
    returnRate: 10,
    riskLevel: "Medio",
    timeframe: "4-7 años",
  },
  {
    type: "CDT Bancario",
    returnRate: 5,
    riskLevel: "Bajo",
    timeframe: "1-5 años",
  },
  {
    type: "Finca Raíz",
    returnRate: 8,
    riskLevel: "Medio",
    timeframe: "10-20 años",
  },
];

// Team members
export const TEAM_MEMBERS = [
  {
    name: "Ana María Rodríguez",
    position: "CEO & Fundadora",
    bio: "Experta en agrotecnología con más de 15 años de experiencia en proyectos sostenibles.",
  },
  {
    name: "Carlos Mendoza",
    position: "Director de Operaciones",
    bio: "Ingeniero agrónomo especializado en cultivos de marañón y más de 10 años trabajando en el Vichada.",
  },
  {
    name: "Juliana Torres",
    position: "Directora Financiera",
    bio: "Especialista en inversiones de impacto y estructuración de proyectos agroindustriales.",
  },
  {
    name: "Daniel Ospina",
    position: "Director Tecnológico",
    bio: "Experto en sistemas de monitoreo agrícola y desarrollo de plataformas de trazabilidad.",
  },
];

// Strategic partners
export const STRATEGIC_PARTNERS = [
  {
    name: "Fiduciaria Segura",
    type: "Financiero",
    description: "Administración fiduciaria de los recursos de inversión.",
  },
  {
    name: "AgriTech Colombia",
    type: "Tecnología",
    description: "Monitoreo satelital de los cultivos y análisis de datos.",
  },
  {
    name: "Asociación de Productores del Vichada",
    type: "Producción",
    description: "Red de agricultores locales certificados.",
  },
  {
    name: "ExportaNut",
    type: "Comercialización",
    description: "Canal de exportación internacional para la producción.",
  },
];

// Minimum investment amount
export const MIN_INVESTMENT_USD = 5000;
export const USD_TO_COP_RATE = 4000; // 1 USD = 4000 COP (approximate)
export const MIN_INVESTMENT_COP = MIN_INVESTMENT_USD * USD_TO_COP_RATE;

// Investment returns per year (percentage)
export const YEARLY_RETURNS = {
  years1to2: 0, // No returns in first two years (growth period)
  years3to5: 8, // 8% annual return from year 3 to 5
  years6to10: 15, // 15% annual return from year 6 to 10
  years11plus: 20, // 20% annual return after year 10
};

// Cashew production metrics
export const PRODUCTION_METRICS = {
  treesPerHectare: 100,
  kgPerTree: {
    year3: 2.5,
    year5: 8,
    year10: 15,
  },
  pricePerKg: 3.5, // USD
};

// Price per tree/hectare
export const PRICING = {
  pricePerTree: 50, // USD
  pricePerHectare: 5000, // USD
};
