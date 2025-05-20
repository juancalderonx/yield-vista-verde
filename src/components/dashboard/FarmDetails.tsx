import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Droplets, Leaf, TrendingUp, Database, BarChart, Thermometer, TreePine, MapPin } from "lucide-react";
import Map from "@/components/Map";
import { FARM_LOCATIONS } from "@/lib/constants";
import FarmPlant3DView from "./FarmPlant3DView";

interface FarmDetailsProps {
  farmId: number | null;
  onClose: () => void;
  open: boolean;
}

const FarmDetails = ({ farmId, onClose, open }: FarmDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [show3DView, setShow3DView] = useState(false);

  if (!farmId) return null;

  const farm = FARM_LOCATIONS.find((f) => f.id === farmId);
  if (!farm) return null;

  // Mock data - in a real app these would come from API calls
  const plantData = [
    { id: 1, type: "Marañón", age: "3 años", health: 85, waterLevel: 70, yield: "8kg/árbol", planted: "2021-05-10" },
    { id: 2, type: "Marañón", age: "2 años", health: 92, waterLevel: 65, yield: "4kg/árbol", planted: "2022-03-15" },
    { id: 3, type: "Marañón", age: "5 años", health: 78, waterLevel: 60, yield: "12kg/árbol", planted: "2019-06-21" },
    { id: 4, type: "Marañón", age: "1 año", health: 95, waterLevel: 75, yield: "N/A", planted: "2023-04-08" },
  ];

  const transactions = [
    { id: 1, date: "2023-12-15", type: "Inversión", amount: "$5,000" },
    { id: 2, date: "2024-03-28", type: "Rendimiento", amount: "$320" },
    { id: 3, date: "2024-04-30", type: "Reinversión", amount: "$150" },
  ];

  const soilData = [
    { parameter: "pH", value: "6.8", status: "Óptimo" },
    { parameter: "Nitrógeno", value: "120 ppm", status: "Bueno" },
    { parameter: "Fósforo", value: "45 ppm", status: "Óptimo" },
    { parameter: "Potasio", value: "200 ppm", status: "Óptimo" },
    { parameter: "Materia orgánica", value: "3.2%", status: "Bueno" },
  ];

  const weatherData = {
    current: { temp: "32°C", humidity: "65%", rainfall: "0mm" },
    forecast: [
      { day: "Hoy", temp: "30-34°C", rain: "10%" },
      { day: "Mañana", temp: "29-33°C", rain: "20%" },
      { day: "Pasado", temp: "28-31°C", rain: "60%" },
    ],
  };

  const getStatusColor = (value: number) => {
    if (value >= 80) return "text-green-500";
    if (value >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Info className="h-5 w-5 text-green-600" />
            {farm.name}
          </DialogTitle>
          <DialogDescription>
            Información detallada de la finca ubicada en Vichada, Colombia
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">General</TabsTrigger>
            <TabsTrigger value="plants">Plantas</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="environmental">Ambiental</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-4 w-4 text-green-600" />
                    Detalles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hectáreas totales:</span>
                      <span className="font-medium">{farm.hectares}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hectáreas disponibles:</span>
                      <span className="font-medium text-green-600">{farm.available}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rendimiento promedio:</span>
                      <span className="font-medium">12% anual</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Árboles cultivados:</span>
                      <span className="font-medium">{(farm.hectares - farm.available) * 100}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Producción
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Producción actual:</span>
                      <span className="font-medium">8,500 kg/año</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Proyección próximo año:</span>
                      <span className="font-medium text-green-600">10,200 kg/año</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Eficiencia:</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Calidad promedio:</span>
                      <span className="font-medium">Premium (A+)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <Map highlightedFarmId={farm.id} height="100%" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-600" /> 
                    Recursos Hídricos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Nivel de reservas</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Eficiencia de riego</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Crecimiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Nuevas plantaciones</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Maduración</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-600" />
                    Inversión
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Capital invertido</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>ROI actual</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plants Tab */}
          <TabsContent value="plants" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalle de Plantaciones</h3>
              <Button onClick={() => setShow3DView(true)} variant="outline" className="flex items-center gap-2">
                <TreePine className="h-4 w-4" />
                Ver Visualización 3D
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {plantData.map((plant) => (
                <Card key={plant.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: `rgb(${Math.floor(255 * (1 - plant.health/100))}, ${Math.floor(255 * plant.health/100)}, 0)` }}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      {plant.type} #{plant.id}
                    </CardTitle>
                    <CardDescription>Plantado: {plant.planted}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Salud de la planta</div>
                        <div className="flex items-center gap-2">
                          <Progress value={plant.health} className="h-2" />
                          <span className={`${getStatusColor(plant.health)} text-sm font-medium`}>{plant.health}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Nivel de agua</div>
                        <div className="flex items-center gap-2">
                          <Progress value={plant.waterLevel} className="h-2" />
                          <span className={`${getStatusColor(plant.waterLevel)} text-sm font-medium`}>{plant.waterLevel}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Edad:</span>
                        <span className="font-medium">{plant.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rendimiento:</span>
                        <span className="font-medium">{plant.yield}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Accordion type="single" collapsible className="bg-muted/40 rounded-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4">Información de Cultivo</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-2 text-sm">
                    <p><strong>Especie: </strong> Anacardium occidentale (Marañón)</p>
                    <p><strong>Variedad: </strong> CCP-76 (Alto rendimiento)</p>
                    <p><strong>Ciclo de vida: </strong> 30-35 años</p>
                    <p><strong>Tiempo hasta producción completa: </strong> 5-7 años</p>
                    <p><strong>Rendimiento máximo esperado: </strong> 15-20 kg/árbol/año</p>
                    <p><strong>Resistencia a sequías: </strong> Alta</p>
                    <p><strong>Resistencia a plagas: </strong> Media-alta</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-green-600" />
                  Transacciones Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button variant="outline" size="sm">Ver todas las transacciones</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Environmental Tab */}
          <TabsContent value="environmental" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-amber-500" />
                    Clima Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-sm text-muted-foreground">Temperatura:</div>
                      <div className="text-sm font-medium">{weatherData.current.temp}</div>
                      
                      <div className="text-sm text-muted-foreground">Humedad:</div>
                      <div className="text-sm font-medium">{weatherData.current.humidity}</div>
                      
                      <div className="text-sm text-muted-foreground">Precipitación:</div>
                      <div className="text-sm font-medium">{weatherData.current.rainfall}</div>
                    </div>
                    
                    <div className="pt-4 border-t mt-2">
                      <div className="text-sm font-medium mb-2">Pronóstico:</div>
                      <div className="space-y-1">
                        {weatherData.forecast.map((day, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{day.day}</span>
                            <span>{day.temp} ({day.rain} lluvia)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Análisis de Suelo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parámetro</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {soilData.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item.parameter}</TableCell>
                          <TableCell>{item.value}</TableCell>
                          <TableCell className="font-medium text-green-600">{item.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TreePine className="h-4 w-4 text-green-700" />
                  Impacto Ambiental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Captura de CO₂</div>
                    <div className="text-2xl font-semibold text-green-600">126 Ton</div>
                    <div className="text-xs text-muted-foreground">Anual</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Biodiversidad</div>
                    <div className="text-2xl font-semibold text-green-600">+48%</div>
                    <div className="text-xs text-muted-foreground">Incremento desde 2020</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Ahorro de agua</div>
                    <div className="text-2xl font-semibold text-green-600">35%</div>
                    <div className="text-xs text-muted-foreground">vs. agricultura convencional</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 3D View Dialog */}
        <Dialog open={show3DView} onOpenChange={setShow3DView}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Visualización 3D de Plantaciones</DialogTitle>
              <DialogDescription>
                Modelo tridimensional de las plantaciones de marañón en {farm.name}
              </DialogDescription>
            </DialogHeader>
            <div className="h-[500px] w-full bg-muted rounded-md overflow-hidden">
              <FarmPlant3DView farmId={farm.id} />
            </div>
            <div className="text-center text-xs text-muted-foreground mt-2">
              Utiliza el ratón para rotar la vista. Rueda del ratón para hacer zoom.
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default FarmDetails;
