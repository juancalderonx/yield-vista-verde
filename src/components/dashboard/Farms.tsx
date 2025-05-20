
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin, BarChart, Info } from "lucide-react";
import { FARM_LOCATIONS } from "@/lib/constants";
import Map from "@/components/Map";
import FarmDetails from "./FarmDetails";

type ViewMode = "grid" | "map" | "table";

export const Farms = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [showFarmDetails, setShowFarmDetails] = useState(false);

  const handleViewMap = (farmId: number) => {
    setSelectedFarmId(farmId);
    setViewMode("map");
  };

  const handleViewInvestments = (farmId: number) => {
    // Aquí se implementaría la lógica para ver inversiones
    console.log(`Ver inversiones de la finca ID: ${farmId}`);
  };

  const handleViewDetails = (farmId: number) => {
    setSelectedFarmId(farmId);
    setShowFarmDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Nuestras Fincas</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="text-sm"
          >
            Vista de Tarjetas
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
            className="text-sm"
          >
            Vista de Tabla
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            className="text-sm"
          >
            Vista de Mapa
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="bg-card p-6 rounded-xl shadow">
          <div className="h-[600px]">
            <Map height="100%" highlightedFarmId={selectedFarmId} />
            <div className="mt-4">
              <Button variant="outline" onClick={() => setViewMode("grid")}>
                Volver a la lista
              </Button>
            </div>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_LOCATIONS.map((farm) => (
            <Card key={farm.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-secondary/50 dark:bg-secondary/20 border-b pb-3">
                <CardTitle className="text-lg text-primary-foreground">{farm.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hectáreas totales:</span>
                    <span className="font-medium">{farm.hectares}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Disponibles:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{farm.available} ha</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/30 pt-3 pb-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewMap(farm.id)}
                        className="hover:bg-green-100 dark:hover:bg-green-900/30"
                      >
                        <MapPin className="h-5 w-5 text-green-700 dark:text-green-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver ubicación en mapa</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewInvestments(farm.id)}
                        className="hover:bg-green-100 dark:hover:bg-green-900/30"
                      >
                        <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver mis inversiones</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(farm.id)}
                        className="hover:bg-green-100 dark:hover:bg-green-900/30"
                      >
                        <Info className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver detalles de la finca</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Hectáreas Totales</TableHead>
                <TableHead className="text-right">Hectáreas Disponibles</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FARM_LOCATIONS.map((farm) => (
                <TableRow key={farm.id} className="hover:bg-muted/40">
                  <TableCell className="font-medium">{farm.name}</TableCell>
                  <TableCell className="text-right">{farm.hectares}</TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">{farm.available}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewMap(farm.id)}
                              className="hover:bg-green-100 dark:hover:bg-green-900/30"
                            >
                              <MapPin className="h-4 w-4 text-green-700 dark:text-green-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver ubicación en mapa</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewInvestments(farm.id)}
                              className="hover:bg-green-100 dark:hover:bg-green-900/30"
                            >
                              <BarChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver mis inversiones</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(farm.id)}
                              className="hover:bg-green-100 dark:hover:bg-green-900/30"
                            >
                              <Info className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalles de la finca</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Farm Details Dialog */}
      <FarmDetails 
        farmId={selectedFarmId}
        open={showFarmDetails}
        onClose={() => setShowFarmDetails(false)}
      />
    </div>
  );
};
