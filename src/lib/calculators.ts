import {
  YEARLY_RETURNS,
  PRODUCTION_METRICS,
  PRICING,
  USD_TO_COP_RATE,
} from "./constants";

/**
 * Calculate estimated returns over years
 * @param investmentAmount - Amount in USD
 * @param years - Number of years for projection
 * @returns Object with yearly projections
 */
export const calculateReturns = (
  investmentAmount: number,
  years: number = 10
) => {
  const projections = [];
  let currentValue = investmentAmount;

  // Loop through each year to calculate compounded returns
  for (let year = 1; year <= years; year++) {
    let returnRate;

    if (year <= 2) {
      returnRate = YEARLY_RETURNS.years1to2;
    } else if (year <= 5) {
      returnRate = YEARLY_RETURNS.years3to5;
    } else if (year <= 10) {
      returnRate = YEARLY_RETURNS.years6to10;
    } else {
      returnRate = YEARLY_RETURNS.years11plus;
    }

    // Calculate returns for this year
    const yearlyReturn = currentValue * (returnRate / 100);
    currentValue += yearlyReturn;

    projections.push({
      year,
      value: Math.round(currentValue),
      returnRate,
      yearlyReturn: Math.round(yearlyReturn),
    });
  }

  return projections;
};

/**
 * Calculate production metrics based on investment
 * @param investmentAmount - Amount in USD
 * @returns Object with investment metrics
 */
export const calculateMetrics = (investmentAmount: number) => {
  const treesCount = Math.floor(investmentAmount / PRICING.pricePerTree);
  const hectares = Number(
    (treesCount / PRODUCTION_METRICS.treesPerHectare).toFixed(2)
  );

  // Calculate production at different stages
  const productionYear3 = treesCount * PRODUCTION_METRICS.kgPerTree.year3;
  const productionYear5 = treesCount * PRODUCTION_METRICS.kgPerTree.year5;
  const productionYear10 = treesCount * PRODUCTION_METRICS.kgPerTree.year10;

  // Calculate revenue at different stages
  const revenueYear3 = productionYear3 * PRODUCTION_METRICS.pricePerKg;
  const revenueYear5 = productionYear5 * PRODUCTION_METRICS.pricePerKg;
  const revenueYear10 = productionYear10 * PRODUCTION_METRICS.pricePerKg;

  return {
    treesCount,
    hectares,
    production: {
      year3: Math.round(productionYear3),
      year5: Math.round(productionYear5),
      year10: Math.round(productionYear10),
    },
    revenue: {
      year3: Math.round(revenueYear3),
      year5: Math.round(revenueYear5),
      year10: Math.round(revenueYear10),
    },
  };
};

/**
 * Format currency
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: "USD" | "COP" = "USD"
) => {
  if (currency === "COP") {
    // Format as Colombian Pesos
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Format as US Dollars
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Convert between currencies
 * @param amount - Amount to convert
 * @param from - Source currency
 * @param to - Target currency
 * @returns Converted amount
 */
export const convertCurrency = (
  amount: number,
  from: "USD" | "COP",
  to: "USD" | "COP"
) => {
  if (from === to) return amount;

  if (from === "USD" && to === "COP") {
    return amount * USD_TO_COP_RATE;
  }

  return amount / USD_TO_COP_RATE;
};
