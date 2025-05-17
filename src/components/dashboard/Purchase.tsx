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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { formatCurrency, convertCurrency } from "@/lib/calculators";
import {
  MIN_INVESTMENT_USD,
  MIN_INVESTMENT_COP,
  PRICING,
  FARM_LOCATIONS,
} from "@/lib/constants";
import Map from "@/components/Map";

const Purchase = () => {
  // State for purchasing by trees
  const [treeCount, setTreeCount] = useState<number>(100);
  const [selectedFarmId, setSelectedFarmId] = useState<number>(1);

  // State for purchasing by amount
  const [amount, setAmount] = useState<number>(5000);
  const [currency, setCurrency] = useState<"USD" | "COP">("USD");

  // Derived state
  const pricePerTree = PRICING.pricePerTree;
  const minInvestment =
    currency === "USD" ? MIN_INVESTMENT_USD : MIN_INVESTMENT_COP;
  const treesTotalPrice = treeCount * pricePerTree;
  const amountInUSD =
    currency === "USD" ? amount : convertCurrency(amount, "COP", "USD");
  const amountTreesCount = Math.floor(amountInUSD / pricePerTree);

  // Validation state
  const [isTreesValid, setIsTreesValid] = useState<boolean>(true);
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);

  // Validation
  useEffect(() => {
    setIsTreesValid(treesTotalPrice >= MIN_INVESTMENT_USD);
    setIsAmountValid(amountInUSD >= MIN_INVESTMENT_USD);
  }, [treeCount, amount, currency, treesTotalPrice, amountInUSD]);

  // Handle tree count change
  const handleTreeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ""));
    if (!isNaN(value)) {
      setTreeCount(value);
    }
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setAmount(isNaN(value) ? 0 : value);
  };

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    const newCurrency = value as "USD" | "COP";

    // Convert current amount to the new currency
    if (newCurrency !== currency) {
      const convertedAmount = convertCurrency(amount, currency, newCurrency);
      setAmount(Math.round(convertedAmount));
      setCurrency(newCurrency);
    }
  };

  // Handle purchase by trees
  const handlePurchaseTrees = () => {
    if (!isTreesValid) {
      toast.error(
        `La inversión mínima es ${formatCurrency(MIN_INVESTMENT_USD)}`
      );
      return;
    }

    toast.success(
      `¡Compra exitosa! Has adquirido ${treeCount} árboles de marañón por ${formatCurrency(
        treesTotalPrice
      )}`
    );
  };

  // Handle purchase by amount
  const handlePurchaseAmount = () => {
    if (!isAmountValid) {
      toast.error(
        `La inversión mínima es ${formatCurrency(minInvestment, currency)}`
      );
      return;
    }

    toast.success(
      `¡Compra exitosa! Has invertido ${formatCurrency(
        amount,
        currency
      )} en ${amountTreesCount} árboles de marañón`
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Comprar Marañón</h2>

      <Tabs defaultValue="trees">
        <TabsList className="mb-6">
          <TabsTrigger value="trees">Comprar por Árboles</TabsTrigger>
          <TabsTrigger value="amount">Comprar por Monto</TabsTrigger>
        </TabsList>

        <TabsContent value="trees" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Árboles</CardTitle>
                <CardDescription>
                  Elige la cantidad de árboles que deseas adquirir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="treeCount">Cantidad de Árboles</Label>
                      <span
                        className={`font-medium ${
                          isTreesValid ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {treeCount.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="treeCount"
                      min={50}
                      max={1000}
                      step={10}
                      value={[treeCount]}
                      onValueChange={(value) => setTreeCount(value[0])}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>50 árboles</span>
                      <span>1,000 árboles</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Input
                      type="text"
                      value={treeCount.toLocaleString()}
                      onChange={handleTreeCountChange}
                      className="mr-2"
                    />
                    <span className="text-gray-600">árboles</span>
                  </div>

                  {!isTreesValid && (
                    <p className="text-red-500 text-sm">
                      La inversión mínima es{" "}
                      {formatCurrency(MIN_INVESTMENT_USD)}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label htmlFor="farmSelect">Selecciona la Finca</Label>
                  <Select
                    value={selectedFarmId.toString()}
                    onValueChange={(value) =>
                      setSelectedFarmId(parseInt(value))
                    }
                  >
                    <SelectTrigger id="farmSelect">
                      <SelectValue placeholder="Selecciona una finca" />
                    </SelectTrigger>
                    <SelectContent>
                      {FARM_LOCATIONS.map((farm) => (
                        <SelectItem key={farm.id} value={farm.id.toString()}>
                          {farm.name} ({farm.available} hectáreas disponibles)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Precio por árbol:</span>
                    <span>{formatCurrency(pricePerTree)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cantidad:</span>
                    <span>{treeCount.toLocaleString()} árboles</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span
                      className={
                        isTreesValid ? "text-green-600" : "text-red-500"
                      }
                    >
                      {formatCurrency(treesTotalPrice)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchaseTrees}
                  disabled={!isTreesValid}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Comprar Árboles
                </Button>
              </CardContent>
            </Card>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Ubicación de la Finca</CardTitle>
                  <CardDescription>
                    {
                      FARM_LOCATIONS.find((farm) => farm.id === selectedFarmId)
                        ?.name
                    }
                    , Vichada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Map
                      highlightedFarmId={selectedFarmId}
                      height="100%"
                      interactive={false}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de la Compra</CardTitle>
                  <CardDescription>Detalles de tu inversión</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Árboles de marañón:</span>
                    <span>{treeCount.toLocaleString()} árboles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Hectáreas aproximadas:
                    </span>
                    <span>{(treeCount / 100).toFixed(2)} hectáreas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Producción año 5 (est.):
                    </span>
                    <span>{(treeCount * 8).toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Rendimiento año 5 (est.):
                    </span>
                    <span>{formatCurrency(treesTotalPrice * 1.47)}</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Al comprar, aceptas los términos y condiciones de
                      inversión de GreenYield. Tu inversión será gestionada a
                      través de nuestro esquema fiduciario.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="amount" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Definir Monto</CardTitle>
                <CardDescription>
                  Especifica cuánto deseas invertir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label htmlFor="currency">Moneda</Label>
                  </div>
                  <Tabs value={currency} onValueChange={handleCurrencyChange}>
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="USD">USD</TabsTrigger>
                      <TabsTrigger value="COP">COP</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="amount">Monto de Inversión</Label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
                      {currency === "USD" ? "$" : "COP"}
                    </span>
                    <Input
                      id="amount"
                      type="text"
                      value={amount.toLocaleString()}
                      onChange={handleAmountChange}
                      className={`rounded-l-none ${
                        !isAmountValid ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  {!isAmountValid && (
                    <p className="text-red-500 text-sm">
                      La inversión mínima es{" "}
                      {formatCurrency(minInvestment, currency)}
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Inversión</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(amount, currency)}
                      </span>
                    </div>
                    <Slider
                      min={currency === "USD" ? 5000 : 20000000}
                      max={currency === "USD" ? 100000 : 400000000}
                      step={currency === "USD" ? 1000 : 1000000}
                      value={[amount]}
                      onValueChange={(value) => setAmount(value[0])}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="farmSelect">Selecciona la Finca</Label>
                  <Select
                    value={selectedFarmId.toString()}
                    onValueChange={(value) =>
                      setSelectedFarmId(parseInt(value))
                    }
                  >
                    <SelectTrigger id="farmSelect">
                      <SelectValue placeholder="Selecciona una finca" />
                    </SelectTrigger>
                    <SelectContent>
                      {FARM_LOCATIONS.map((farm) => (
                        <SelectItem key={farm.id} value={farm.id.toString()}>
                          {farm.name} ({farm.available} hectáreas disponibles)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Monto:</span>
                    <span>{formatCurrency(amount, currency)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Árboles:</span>
                    <span>{amountTreesCount.toLocaleString()} árboles</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Hectáreas:</span>
                    <span>{(amountTreesCount / 100).toFixed(2)} hectáreas</span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchaseAmount}
                  disabled={!isAmountValid}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Confirmar Inversión
                </Button>
              </CardContent>
            </Card>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Ubicación de la Finca</CardTitle>
                  <CardDescription>
                    {
                      FARM_LOCATIONS.find((farm) => farm.id === selectedFarmId)
                        ?.name
                    }
                    , Vichada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Map
                      highlightedFarmId={selectedFarmId}
                      height="100%"
                      interactive={false}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de la Inversión</CardTitle>
                  <CardDescription>
                    Lo que obtendrás con tu inversión
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inversión:</span>
                    <span>{formatCurrency(amount, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Árboles de marañón:</span>
                    <span>{amountTreesCount.toLocaleString()} árboles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Producción año 5 (est.):
                    </span>
                    <span>{(amountTreesCount * 8).toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Rendimiento año 5 (est.):
                    </span>
                    <span className="text-green-600 font-medium">
                      {currency === "USD"
                        ? formatCurrency(amountInUSD * 1.47, "USD")
                        : formatCurrency(amount * 1.47, "COP")}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Al confirmar, aceptas los términos y condiciones de
                      inversión de GreenYield. Tu inversión será gestionada a
                      través de nuestro esquema fiduciario.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Purchase;
