import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/calculators";
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
import { PieChart, Pie, Cell } from "recharts";

const Balance = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      date: "2023-05-15",
      type: "Inversión Inicial",
      amount: 10000,
      status: "completado",
    },
    {
      id: 2,
      date: "2023-09-22",
      type: "Rendimiento Trimestral",
      amount: 250,
      status: "completado",
    },
    {
      id: 3,
      date: "2023-12-15",
      type: "Rendimiento Trimestral",
      amount: 275,
      status: "completado",
    },
    {
      id: 4,
      date: "2024-03-20",
      type: "Rendimiento Trimestral",
      amount: 300,
      status: "completado",
    },
    {
      id: 5,
      date: "2024-05-10",
      type: "Reinversión",
      amount: 5000,
      status: "completado",
    },
    {
      id: 6,
      date: "2024-06-18",
      type: "Rendimiento Trimestral",
      amount: 475,
      status: "pendiente",
    },
  ];

  // Mock data for projected earnings
  const projectedEarnings = [
    { year: 2023, earnings: 525 },
    { year: 2024, earnings: 1850 },
    { year: 2025, earnings: 2700 },
    { year: 2026, earnings: 3600 },
    { year: 2027, earnings: 4500 },
    { year: 2028, earnings: 6300 },
  ];

  // Mock data for investment distribution
  const investmentDistribution = [
    { name: "Principal", value: 15000 },
    { name: "Rendimientos", value: 1300 },
    { name: "Reinversiones", value: 825 },
  ];

  // Colors for pie chart
  const COLORS = ["#16a34a", "#22c55e", "#4ade80"];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-CO").format(date);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Mi Balance</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Balance Total</CardDescription>
            <CardTitle className="text-3xl text-green-700">
              {formatCurrency(user.investment + 1300)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600">
              +8.6% desde la inversión inicial
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Inversión Principal</CardDescription>
            <CardTitle className="text-3xl">
              {formatCurrency(user.investment)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              Última inversión: {formatDate("2024-05-10")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rendimientos Acumulados</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {formatCurrency(1300)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600">
              Próximo rendimiento: {formatDate("2024-06-18")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="projections">Proyecciones</TabsTrigger>
          <TabsTrigger value="distribution">Distribución</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Transacciones</CardTitle>
              <CardDescription>
                Registro de todas tus inversiones y rendimientos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Fecha</div>
                  <div>Concepto</div>
                  <div>Monto</div>
                  <div>Estado</div>
                </div>
                <div className="divide-y">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="grid grid-cols-4 p-4 items-center"
                    >
                      <div>{formatDate(transaction.date)}</div>
                      <div>{transaction.type}</div>
                      <div
                        className={
                          transaction.type.includes("Rendimiento")
                            ? "text-green-600"
                            : ""
                        }
                      >
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div>
                        <Badge
                          className={
                            transaction.status === "completado"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {transaction.status === "completado"
                            ? "Completado"
                            : "Pendiente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline">Ver todas las transacciones</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proyección de Rendimientos</CardTitle>
              <CardDescription>
                Estimación de tus ganancias en los próximos años
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projectedEarnings}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(1)}k`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        "Rendimientos",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      name="Rendimientos anuales"
                      stroke="#16a34a"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">
                  Nota sobre proyecciones
                </h4>
                <p className="text-sm text-gray-600">
                  Estas proyecciones están basadas en el rendimiento histórico
                  del cultivo de marañón y en las condiciones actuales del
                  mercado. Los rendimientos reales pueden variar según factores
                  externos como condiciones climáticas y precios del mercado.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de tu Inversión</CardTitle>
              <CardDescription>
                Desglose de tu capital invertido y sus rendimientos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {investmentDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${Number(value).toLocaleString()}`,
                          "",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  {investmentDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-sm mr-3"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <div>
                        <div className="font-medium">
                          {formatCurrency(item.value)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(
                            (item.value /
                              investmentDistribution.reduce(
                                (sum, i) => sum + i.value,
                                0
                              )) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">
                        {formatCurrency(
                          investmentDistribution.reduce(
                            (sum, item) => sum + item.value,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Balance;
