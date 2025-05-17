import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  calculateReturns,
  calculateMetrics,
  formatCurrency,
  convertCurrency,
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
} from "recharts";

const Calculator = () => {
  const [currency, setCurrency] = useState<"USD" | "COP">("USD");
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [years, setYears] = useState<number>(10);
  const [returns, setReturns] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Convert min investment based on selected currency
  const minInvestment =
    currency === "USD" ? MIN_INVESTMENT_USD : MIN_INVESTMENT_COP;

  // Calculate returns when inputs change
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

    // Convert input to USD for calculations if necessary
    const amountInUSD =
      currency === "USD"
        ? investmentAmount
        : convertCurrency(investmentAmount, "COP", "USD");

    // Calculate returns and metrics
    const calculatedReturns = calculateReturns(amountInUSD, years);
    const calculatedMetrics = calculateMetrics(amountInUSD);

    setReturns(calculatedReturns);
    setMetrics(calculatedMetrics);
  }, [investmentAmount, currency, years, minInvestment]);

  // Handle investment amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setInvestmentAmount(isNaN(value) ? 0 : value);
  };

  // Handle currency toggle
  const handleCurrencyChange = (value: string) => {
    const newCurrency = value as "USD" | "COP";

    // Convert current amount to the new currency
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
    <section
      id="calculator"
      className="section bg-gradient-to-b from-green-50 to-white"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Calcula tu Inversión
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simula el retorno de tu inversión en marañón colombiano y descubre
            el potencial de crecimiento de tu capital a largo plazo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Parámetros</CardTitle>
              <CardDescription>
                Configura tu inversión para ver proyecciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

              {metrics && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-green-800 mb-4">
                    Tu inversión equivale a:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Árboles:</span>
                      <span className="font-medium">
                        {metrics.treesCount.toLocaleString()} árboles
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hectáreas:</span>
                      <span className="font-medium">
                        {metrics.hectares} hectáreas
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Producción (Año 5):</span>
                      <span className="font-medium">
                        {metrics.production.year5.toLocaleString()} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingresos (Año 5):</span>
                      <span className="font-medium">
                        {formatCurrency(metrics.revenue.year5)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                ¡Invierte Ahora!
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Proyección de Retorno</CardTitle>
              <CardDescription>
                Rendimiento proyectado para{" "}
                {formatCurrency(investmentAmount, currency)} en {years} años
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {returns.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={returns}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                <div className="mt-6">
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

                  <div className="mt-6 bg-green-700 text-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-green-100">
                          Retorno total en {years} años
                        </p>
                        <p className="text-2xl font-bold">
                          {returns.length > 0 &&
                            formatCurrency(
                              returns[returns.length - 1].value -
                                investmentAmount,
                              currency
                            )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-100">Multiplicador</p>
                        <p className="text-2xl font-bold">
                          {returns.length > 0 &&
                            `${(
                              returns[returns.length - 1].value /
                              investmentAmount
                            ).toFixed(1)}x`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm max-w-3xl mx-auto">
            * Las proyecciones se basan en datos históricos y estimaciones de
            rendimiento del cultivo de marañón. Los retornos reales pueden
            variar debido a factores externos como condiciones climáticas,
            fluctuaciones del mercado y otros riesgos asociados con inversiones
            agrícolas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
