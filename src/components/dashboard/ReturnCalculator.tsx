import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  formatCurrency,
  convertCurrency,
  calculateReturns,
  calculateMetrics,
} from "@/lib/calculators";
import { MIN_INVESTMENT_USD, MIN_INVESTMENT_COP } from "@/lib/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const ReturnCalculator = () => {
  // Investment parameters
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [currency, setCurrency] = useState<"USD" | "COP">("USD");
  const [years, setYears] = useState<number>(10);
  const [reinvestPercentage, setReinvestPercentage] = useState<number>(0);
  const [scenario, setScenario] = useState<
    "baseline" | "optimistic" | "conservative"
  >("baseline");

  // Calculation results
  const [returns, setReturns] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [yearlyProduction, setYearlyProduction] = useState<any[]>([]);

  // Min investment based on currency
  const minInvestment =
    currency === "USD" ? MIN_INVESTMENT_USD : MIN_INVESTMENT_COP;

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Scenario multipliers
  const scenarioMultipliers = {
    conservative: 0.8,
    baseline: 1.0,
    optimistic: 1.2,
  };

  // Calculate returns and metrics when inputs change
  useEffect(() => {
    // Validate input
    if (investmentAmount < minInvestment) {
      setError(
        `La inversión mínima es ${formatCurrency(minInvestment, currency)}`
      );
      return;
    } else {
      setError(null);
    }

    // Convert to USD for calculations if needed
    const amountInUSD =
      currency === "USD"
        ? investmentAmount
        : convertCurrency(investmentAmount, "COP", "USD");

    // Get multiplier based on scenario
    const multiplier = scenarioMultipliers[scenario];

    // Calculate basic returns
    const baseReturns = calculateReturns(amountInUSD, years);

    // Apply scenario multiplier and reinvestment percentage
    let calculatedReturns = [];
    let runningInvestment = amountInUSD;

    for (let i = 0; i < baseReturns.length; i++) {
      const year = baseReturns[i].year;
      const baseReturnRate = baseReturns[i].returnRate * multiplier;
      const yearlyReturn = runningInvestment * (baseReturnRate / 100);
      const reinvestedAmount = yearlyReturn * (reinvestPercentage / 100);

      // Add reinvested amount to running investment for next year
      runningInvestment += reinvestedAmount;

      const value =
        i > 0 ? calculatedReturns[i - 1].value + yearlyReturn : amountInUSD;

      calculatedReturns.push({
        year,
        value: Math.round(value),
        returnRate: baseReturnRate,
        yearlyReturn: Math.round(yearlyReturn),
        reinvestedAmount: Math.round(reinvestedAmount),
      });
    }

    // Calculate metrics
    const calculatedMetrics = calculateMetrics(amountInUSD);

    // Create production data
    const productionData = [];
    for (let year = 1; year <= Math.min(10, years); year++) {
      let kgPerTree = 0;

      if (year <= 2) {
        kgPerTree = 0;
      } else if (year <= 4) {
        kgPerTree = 2.5 * multiplier;
      } else if (year <= 7) {
        kgPerTree = 8 * multiplier;
      } else {
        kgPerTree = 15 * multiplier;
      }

      productionData.push({
        year,
        production: Math.round(calculatedMetrics.treesCount * kgPerTree),
        revenue: Math.round(calculatedMetrics.treesCount * kgPerTree * 3.5),
      });
    }

    // Update state
    setReturns(calculatedReturns);
    setMetrics(calculatedMetrics);
    setYearlyProduction(productionData);
  }, [
    investmentAmount,
    currency,
    years,
    reinvestPercentage,
    scenario,
    minInvestment,
  ]);

  // Handle investment amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setInvestmentAmount(isNaN(value) ? 0 : value);
  };

  // Handle currency toggle
  const handleCurrencyChange = (value: string) => {
    const newCurrency = value as "USD" | "COP";

    if (newCurrency !== currency) {
      const convertedAmount = convertCurrency(
        investmentAmount,
        currency,
        newCurrency
      );

      setInvestmentAmount(Math.round(convertedAmount));
      setCurrency(newCurrency);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Calculadora de Retorno
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Parámetros de Inversión</CardTitle>
          <CardDescription>
            Ajusta los parámetros para calcular el retorno de tu inversión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Tabs
                  value={currency}
                  onValueChange={handleCurrencyChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="USD">USD</TabsTrigger>
                    <TabsTrigger value="COP">COP</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto de Inversión</Label>
                <Input
                  id="amount"
                  type="text"
                  value={investmentAmount.toLocaleString()}
                  onChange={handleAmountChange}
                  className={error ? "border-red-500" : ""}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="text-xs text-gray-500">
                  Inversión mínima: {formatCurrency(minInvestment, currency)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="years">Horizonte de Inversión</Label>
                  <span className="text-sm text-green-700 font-medium">
                    {years} años
                  </span>
                </div>
                <Slider
                  id="years"
                  min={3}
                  max={20}
                  step={1}
                  value={[years]}
                  onValueChange={(value) => setYears(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3 años</span>
                  <span>20 años</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="reinvest">Reinversión de Ganancias</Label>
                  <span className="text-sm text-green-700 font-medium">
                    {reinvestPercentage}%
                  </span>
                </div>
                <Slider
                  id="reinvest"
                  min={0}
                  max={100}
                  step={10}
                  value={[reinvestPercentage]}
                  onValueChange={(value) => setReinvestPercentage(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0% (Solo retornos)</span>
                  <span>100% (Reinvertir todo)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scenario">Escenario de Proyección</Label>
                <Select
                  value={scenario}
                  onValueChange={(value: any) => setScenario(value)}
                >
                  <SelectTrigger id="scenario">
                    <SelectValue placeholder="Selecciona un escenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">
                      Conservador (-20%)
                    </SelectItem>
                    <SelectItem value="baseline">
                      Base (Proyección estándar)
                    </SelectItem>
                    <SelectItem value="optimistic">Optimista (+20%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  El escenario afecta tanto el rendimiento como la producción de
                  los árboles.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Tabs defaultValue="returns">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="returns">Retorno Financiero</TabsTrigger>
                  <TabsTrigger value="production">Producción</TabsTrigger>
                </TabsList>

                <TabsContent value="returns" className="space-y-6 pt-4">
                  <div className="h-64">
                    {returns.length > 0 && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={returns}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="year"
                            label={{
                              value: "Años",
                              position: "insideBottomRight",
                              offset: -5,
                            }}
                          />
                          <YAxis
                            tickFormatter={(value) =>
                              currency === "USD"
                                ? `$${(value / 1000).toFixed(0)}k`
                                : `${(value / 1000000).toFixed(0)}M`
                            }
                          />
                          <Tooltip
                            formatter={(value: any) => [
                              formatCurrency(value, currency),
                              "Valor",
                            ]}
                            labelFormatter={(label) => `Año ${label}`}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            name="Valor de la inversión"
                            stroke="#16a34a"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {returns.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Valor en 3 años
                        </p>
                        <p className="text-lg font-semibold text-green-800">
                          {returns.length >= 3 &&
                            formatCurrency(returns[2].value, currency)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Valor en 5 años
                        </p>
                        <p className="text-lg font-semibold text-green-800">
                          {returns.length >= 5 &&
                            formatCurrency(returns[4].value, currency)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Valor en {years} años
                        </p>
                        <p className="text-lg font-semibold text-green-800">
                          {returns.length > 0 &&
                            formatCurrency(
                              returns[returns.length - 1].value,
                              currency
                            )}
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="production" className="space-y-6 pt-4">
                  <div className="h-64">
                    {yearlyProduction.length > 0 && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={yearlyProduction}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="year"
                            label={{
                              value: "Años",
                              position: "insideBottomRight",
                              offset: -5,
                            }}
                          />
                          <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="#16a34a"
                            label={{
                              value: "kg",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#ef4444"
                            label={{
                              value: "USD",
                              angle: -90,
                              position: "insideRight",
                            }}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar
                            yAxisId="left"
                            dataKey="production"
                            name="Producción (kg)"
                            fill="#16a34a"
                          />
                          <Bar
                            yAxisId="right"
                            dataKey="revenue"
                            name="Ingresos (USD)"
                            fill="#ef4444"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {metrics && yearlyProduction.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        La producción estimada se basa en{" "}
                        {metrics.treesCount.toLocaleString()} árboles (
                        {metrics.hectares} hectáreas).
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <p className="text-sm text-gray-600 mb-1">
                            Producción Año 3
                          </p>
                          <p className="text-lg font-semibold text-green-800">
                            {yearlyProduction.length >= 3 && (
                              <>
                                {yearlyProduction[2].production.toLocaleString()}{" "}
                                kg
                              </>
                            )}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <p className="text-sm text-gray-600 mb-1">
                            Producción Año 5
                          </p>
                          <p className="text-lg font-semibold text-green-800">
                            {yearlyProduction.length >= 5 && (
                              <>
                                {yearlyProduction[4].production.toLocaleString()}{" "}
                                kg
                              </>
                            )}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <p className="text-sm text-gray-600 mb-1">
                            Producción Año 10
                          </p>
                          <p className="text-lg font-semibold text-green-800">
                            {yearlyProduction.length >= 10 && (
                              <>
                                {yearlyProduction[9].production.toLocaleString()}{" "}
                                kg
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="pt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="font-medium text-gray-900 mb-2">
                  Resumen de inversión
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">
                      Inversión inicial
                    </div>
                    <div className="font-medium">
                      {formatCurrency(investmentAmount, currency)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Valor en {years} años
                    </div>
                    <div className="font-medium text-green-700">
                      {returns.length > 0 &&
                        formatCurrency(
                          returns[returns.length - 1].value,
                          currency
                        )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Rentabilidad total
                    </div>
                    <div className="font-medium text-green-700">
                      {returns.length > 0 &&
                        `${Math.round(
                          (returns[returns.length - 1].value /
                            investmentAmount -
                            1) *
                            100
                        )}%`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Rentabilidad anualizada
                    </div>
                    <div className="font-medium text-green-700">
                      {returns.length > 0 &&
                        `${Math.round(
                          Math.pow(
                            returns[returns.length - 1].value /
                              investmentAmount,
                            1 / years
                          ) *
                            100 -
                            100
                        )}%`}
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Comenzar inversión ahora
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnCalculator;
