
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, Info, Tree } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/calculators";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const UserPanel = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Mock data
  const lastLoginDate = new Date().toLocaleDateString("es-CO");
  const totalTrees = Math.floor(user.investment / 50); // $50 per tree
  const totalHectares = (totalTrees / 100).toFixed(2); // 100 trees per hectare

  // Chart data for investment growth
  const chartData = [
    { year: 1, value: user.investment * 1.01 },
    { year: 2, value: user.investment * 1.04 },
    { year: 3, value: user.investment * 1.08 },
    { year: 4, value: user.investment * 1.25 },
    { year: 5, value: user.investment * 1.47 },
    { year: 6, value: user.investment * 1.87 },
    { year: 7, value: user.investment * 2.3 },
    { year: 8, value: user.investment * 2.75 },
    { year: 9, value: user.investment * 3.15 },
    { year: 10, value: user.investment * 3.55 },
  ];

  // Next steps cards
  const nextStepsCards = [
    {
      title: "Amplía tu inversión",
      description: "Aumenta tu portafolio de marañón y maximiza tus retornos",
      actionText: "Comprar árboles",
      link: "/dashboard/portfolio",
      color: "bg-green-50 border-green-200",
      icon: <Tree className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Explora tus fincas",
      description: "Conoce dónde están ubicados tus cultivos de marañón",
      actionText: "Ver mapa",
      link: "/dashboard/farms",
      color: "bg-blue-50 border-blue-200",
      icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Calcula tu retorno",
      description: "Proyecta tus ganancias con diferentes escenarios",
      actionText: "Ir a calculadora",
      link: "/dashboard/calculator",
      color: "bg-amber-50 border-amber-200",
      icon: <ArrowRight className="h-6 w-6 text-amber-600" />,
    },
  ];

  // News items
  const newsItems = [
    {
      title: "Nueva finca disponible en Vichada",
      date: "2025-05-10",
      description:
        "Se ha agregado una nueva finca 'Valle Verde' con 500 hectáreas disponibles para inversión.",
    },
    {
      title: "Actualización de fiducia",
      date: "2025-05-05",
      description:
        "Los documentos de fiducia han sido actualizados. Por favor revise los nuevos términos.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Bienvenido, {user.name}
          </h2>
          <p className="text-gray-500 mt-1">
            Último acceso: {lastLoginDate} · Resumen de tu inversión
          </p>
        </div>
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Link to="/dashboard/purchase">
            Ampliar inversión <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Investment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-100 font-medium">
              Inversión total
            </CardDescription>
            <CardTitle className="text-3xl">
              {formatCurrency(user.investment)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-100">
              Tu inversión está creciendo a un ritmo anual proyectado del 13.5%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Árboles de marañón</CardDescription>
            <div className="flex items-baseline">
              <CardTitle className="text-3xl text-green-700">
                {totalTrees.toLocaleString()}
              </CardTitle>
              <span className="ml-2 text-sm text-gray-500">unidades</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <Tree className="h-4 w-4 mr-1 text-green-600" />
              <span>Tus árboles crecen sanos en el Vichada</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hectáreas totales</CardDescription>
            <div className="flex items-baseline">
              <CardTitle className="text-3xl text-green-700">
                {totalHectares}
              </CardTitle>
              <span className="ml-2 text-sm text-gray-500">ha</span>
            </div>
          </CardHeader>
          <CardContent>
            <Link
              to="/dashboard/farms"
              className="text-green-600 text-sm flex items-center hover:underline"
            >
              Ver tus fincas <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Proyección de rendimiento a 10 años</CardTitle>
          <CardDescription>
            Estimación del crecimiento de tu inversión en el tiempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                investment: {
                  label: "Inversión",
                  color: "#16a34a",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `Año ${value}`}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      formatCurrency(value).split(".")[0]
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#16a34a"
                    strokeWidth={3}
                    name="investment"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
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
                          label={`Año ${data.year}`}
                          payload={[
                            {
                              name: "Valor",
                              value: formatCurrency(data.value),
                              color: "#16a34a",
                            },
                            {
                              name: "Crecimiento",
                              value: `${(
                                (data.value / user.investment - 1) *
                                100
                              ).toFixed(0)}%`,
                              color: "#16a34a",
                            },
                          ]}
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-gray-500">Año 3</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(user.investment * 1.08)}
              </p>
              <p className="text-sm font-medium text-green-600">
                +8% acumulado
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-gray-500">Año 5</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(user.investment * 1.47)}
              </p>
              <p className="text-sm font-medium text-green-600">
                +47% acumulado
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-gray-500">Año 10</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(user.investment * 3.55)}
              </p>
              <p className="text-sm font-medium text-green-600">
                +255% acumulado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Próximos pasos
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {nextStepsCards.map((card, index) => (
            <Card key={index} className={`${card.color} border`}>
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
                <div className="rounded-full p-2 bg-white bg-opacity-70">
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="mt-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                >
                  <Link to={card.link}>
                    {card.actionText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* News and Important Updates */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="mr-2 h-5 w-5 text-amber-500" /> Noticias y
          actualizaciones
        </h3>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2 flex flex-row items-center">
                <div>
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <CardDescription>
                    {new Date(item.date).toLocaleDateString("es-CO")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{item.description}</p>
                <Button variant="link" className="p-0 mt-2 h-auto">
                  Leer más <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
