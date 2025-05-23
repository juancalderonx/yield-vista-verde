
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/calculators";
import { ArrowRight, Filter, MapPin, Trees } from "lucide-react";
import Map from "@/components/Map";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { FARM_LOCATIONS } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock user investments data
const userInvestments = [
  {
    id: 1,
    farmId: 1,
    farmName: "Finca El Paraíso",
    location: "Vichada, Colombia",
    trees: 200,
    hectares: 2,
    investmentDate: "2024-11-15",
    investmentAmount: 10000,
    expectedReturn: 13.5,
  },
  {
    id: 2,
    farmId: 2,
    farmName: "Finca Los Llanos",
    location: "Puerto Carreño, Colombia",
    trees: 150,
    hectares: 1.5,
    investmentDate: "2024-10-01",
    investmentAmount: 7500,
    expectedReturn: 14.2,
  },
  {
    id: 3,
    farmId: 3,
    farmName: "Finca El Dorado",
    location: "Santa Rosalía, Colombia",
    trees: 300,
    hectares: 3,
    investmentDate: "2024-09-20",
    investmentAmount: 15000,
    expectedReturn: 12.8,
  },
];

// Chart data for return by farm
const returnByFarmData = userInvestments.map((investment) => ({
  name: investment.farmName,
  expected: Math.round(investment.investmentAmount * (1 + investment.expectedReturn / 100)),
  original: investment.investmentAmount,
}));

const Portfolio = () => {
  const { user } = useAuth();
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  if (!user) return null;

  const hasInvestments = userInvestments.length > 0;

  const handleViewFarmOnMap = (farmId: number) => {
    setSelectedFarmId(farmId);
    setViewMode("map");
    // Scroll to map view
    setTimeout(() => {
      document.getElementById("map-view")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mi Portafolio</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Detalle de tus inversiones en árboles de marañón
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Vista Lista
          </Button>
          <Button
            size="sm"
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            className={viewMode === "map" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Vista Mapa
          </Button>
        </div>
      </div>

      {/* Empty state */}
      {!hasInvestments ? (
        <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-200 p-4 mb-4">
              <Trees className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aún no tienes inversiones
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Tu viaje como inversionista de marañón comienza con tu primer árbol.
              ¡Comienza hoy mismo!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/dashboard/purchase">
                Compra tu primera planta <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "list" ? (
        <>
          {/* Investment Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resumen de Inversiones</CardTitle>
              <CardDescription className="text-xs">
                Visualiza el rendimiento esperado de tus inversiones por finca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    original: {
                      label: "Inversión Original",
                      color: "#94a3b8",
                    },
                    expected: {
                      label: "Retorno Esperado",
                      color: "#16a34a",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={returnByFarmData}>
                      <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          formatCurrency(value).split(".")[0]
                        }
                        fontSize={11}
                        width={60}
                      />
                      <Bar
                        dataKey="original"
                        fill="#94a3b8"
                        radius={[4, 4, 0, 0]}
                        name="original"
                      />
                      <Bar
                        dataKey="expected"
                        fill="#16a34a"
                        radius={[4, 4, 0, 0]}
                        name="expected"
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload || payload.length === 0) {
                            return null;
                          }
                          const data = payload[0].payload;
                          return (
                            <ChartTooltipContent
                              indicator="dot"
                              label={data.name}
                              payload={[
                                {
                                  name: "Inversión Original",
                                  value: formatCurrency(data.original),
                                  color: "#94a3b8",
                                },
                                {
                                  name: "Retorno Esperado",
                                  value: formatCurrency(data.expected),
                                  color: "#16a34a",
                                },
                                {
                                  name: "Rendimiento",
                                  value: `+${Math.round(
                                    (data.expected / data.original - 1) * 100
                                  )}%`,
                                  color: "#16a34a",
                                },
                              ]}
                            />
                          );
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Investments Table */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">Mis Inversiones</CardTitle>
                  <CardDescription className="text-xs">
                    Listado completo de tus inversiones por finca
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1 self-start text-xs">
                  <Filter className="h-3 w-3" /> Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Finca</TableHead>
                      <TableHead className="text-xs">Árboles</TableHead>
                      <TableHead className="text-xs">Hectáreas</TableHead>
                      <TableHead className="text-xs">Fecha de Inversión</TableHead>
                      <TableHead className="text-xs">Monto</TableHead>
                      <TableHead className="text-xs">Retorno Esperado</TableHead>
                      <TableHead className="text-xs text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userInvestments.map((investment) => (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium text-sm">
                          {investment.farmName}
                        </TableCell>
                        <TableCell className="text-sm">{investment.trees.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{investment.hectares}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(investment.investmentDate).toLocaleDateString(
                            "es-CO"
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatCurrency(investment.investmentAmount)}
                        </TableCell>
                        <TableCell className="text-green-600 text-sm">
                          +{investment.expectedReturn}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleViewFarmOnMap(investment.farmId)
                                    }
                                    className="h-8 w-8"
                                  >
                                    <MapPin className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Ver ubicación en el mapa</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Detalles
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        // Map view
        <Card id="map-view">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Ubicación de mis Inversiones
              {selectedFarmId
                ? `: ${
                    FARM_LOCATIONS.find((f) => f.id === selectedFarmId)?.name ||
                    ""
                  }`
                : ""}
            </CardTitle>
            <CardDescription className="text-xs">
              Visualiza la ubicación geográfica de las fincas donde has invertido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-2">
                {selectedFarmId
                  ? "Finca seleccionada: " +
                    FARM_LOCATIONS.find((f) => f.id === selectedFarmId)?.name
                  : "Todas las fincas donde has invertido"}
              </p>
              {selectedFarmId && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFarmId(null)}
                >
                  Ver todas las fincas
                </Button>
              )}
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <Map
                highlightedFarmId={selectedFarmId || undefined}
                height="450px"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to action */}
      {hasInvestments && (
        <Card className="bg-green-50 border-green-100">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
            <div>
              <h3 className="text-base font-semibold text-green-800 mb-1">
                Amplía tu portafolio
              </h3>
              <p className="text-green-700 text-sm">
                Aumenta tu inversión y diversifica tu portafolio de marañón
              </p>
            </div>
            <Button asChild size="sm" className="bg-green-700 hover:bg-green-800 whitespace-nowrap">
              <Link to="/dashboard/purchase">
                Comprar más árboles <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Portfolio;
