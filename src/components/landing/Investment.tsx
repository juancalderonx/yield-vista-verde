import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  INVESTMENT_DISTRIBUTION,
  INVESTMENT_COMPARISON,
  RISK_CATEGORIES,
} from "@/lib/constants";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Investment = () => {
  const [activeTab, setActiveTab] = useState("modelo");

  // Colors for the pie chart
  const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

  return (
    <section
      id="investment"
      className="section bg-gradient-to-b from-white to-green-50"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Modelo de Inversión
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Un enfoque transparente, seguro y rentable para invertir en la
            agricultura del futuro.
          </p>
        </div>

        <Tabs
          defaultValue="modelo"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="modelo">Modelo Fiduciario</TabsTrigger>
            <TabsTrigger value="distribucion">Distribución</TabsTrigger>
            <TabsTrigger value="riesgos">Riesgos y Beneficios</TabsTrigger>
          </TabsList>

          <TabsContent value="modelo" className="mt-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-6">
                  Respaldo Fiduciario
                </h3>
                <p className="text-gray-700 mb-4">
                  En GreenYield, tu inversión está protegida por un esquema
                  fiduciario regulado que garantiza la transparencia y seguridad
                  de tus recursos. Así es cómo funciona:
                </p>

                <div className="space-y-6 mt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Inversión Segura
                      </h4>
                      <p className="text-gray-600">
                        Tu inversión ingresa directamente a una cuenta
                        fiduciaria regulada por la Superintendencia Financiera
                        de Colombia.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Verificación KYC
                      </h4>
                      <p className="text-gray-600">
                        Realizamos un proceso de verificación de identidad para
                        garantizar la seguridad de todos los inversionistas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Monitoreo Constante
                      </h4>
                      <p className="text-gray-600">
                        Seguimiento detallado de la operación y desarrollo de
                        los cultivos con informes periódicos sobre el estado de
                        tu inversión.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Distribución de Utilidades
                      </h4>
                      <p className="text-gray-600">
                        Los retornos son distribuidos de forma automática según
                        el esquema establecido, directamente a tu cuenta
                        registrada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
                  Proceso de Inversión
                </h3>

                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-green-200"></div>

                  <div className="space-y-8">
                    <div className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-green-800">
                        Registro y KYC
                      </h4>
                      <p className="text-gray-600">
                        Crea tu cuenta y completa la validación de identidad.
                      </p>
                    </div>

                    <div className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-green-800">
                        Selección de Inversión
                      </h4>
                      <p className="text-gray-600">
                        Elige la cantidad de hectáreas o árboles para tu
                        inversión.
                      </p>
                    </div>

                    <div className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-green-800">
                        Depósito Fiduciario
                      </h4>
                      <p className="text-gray-600">
                        Realiza la transferencia a la cuenta fiduciaria segura.
                      </p>
                    </div>

                    <div className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <h4 className="font-semibold text-green-800">
                        Seguimiento
                      </h4>
                      <p className="text-gray-600">
                        Monitorea el progreso de tu inversión en tiempo real.
                      </p>
                    </div>

                    <div className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">5</span>
                      </div>
                      <h4 className="font-semibold text-green-800">
                        Recepción de Retornos
                      </h4>
                      <p className="text-gray-600">
                        Recibe tus ganancias directamente en tu cuenta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="distribucion" className="mt-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-6">
                  Distribución de la Inversión
                </h3>
                <p className="text-gray-700 mb-8">
                  En GreenYield nos comprometemos con la transparencia total.
                  Por eso, te mostramos exactamente cómo se distribuye cada
                  dólar que inviertes:
                </p>

                <div className="space-y-4">
                  {INVESTMENT_DISTRIBUTION.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-sm mr-3"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-gray-700">{item.category}</span>
                      </div>
                      <span className="font-semibold text-green-700">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">
                    ¿Por qué este modelo?
                  </h4>
                  <p className="text-gray-600">
                    Este modelo de distribución está diseñado para garantizar la
                    sostenibilidad del proyecto, beneficiar directamente a los
                    agricultores locales y asegurar retornos atractivos para
                    nuestros inversionistas.
                  </p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={INVESTMENT_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {INVESTMENT_DISTRIBUTION.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="riesgos" className="mt-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-6">
                  Matriz de Riesgos
                </h3>
                <p className="text-gray-700 mb-6">
                  Como en toda inversión, existen riesgos que debes conocer. En
                  GreenYield trabajamos para minimizarlos, pero es importante
                  que estés informado:
                </p>

                <div className="space-y-4">
                  {RISK_CATEGORIES.map((risk, index) => (
                    <Card
                      key={index}
                      className="border-l-4"
                      style={{
                        borderLeftColor:
                          risk.level === "Bajo"
                            ? "#22c55e"
                            : risk.level === "Medio"
                            ? "#eab308"
                            : "#ef4444",
                      }}
                    >
                      <CardHeader className="py-4 px-5">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{risk.name}</CardTitle>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              risk.level === "Bajo"
                                ? "bg-green-100 text-green-800"
                                : risk.level === "Medio"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {risk.level}
                          </span>
                        </div>
                        <CardDescription>{risk.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-6">
                  Comparativa de Inversiones
                </h3>
                <p className="text-gray-700 mb-6">
                  El marañón de GreenYield ofrece ventajas competitivas frente a
                  otras alternativas de inversión en el sector agrícola:
                </p>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={INVESTMENT_COMPARISON}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        name="Retorno Anual (%)"
                        dataKey="returnRate"
                        fill="#22c55e"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Ventajas del marañón
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Demanda internacional creciente</li>
                    <li>Alta resistencia a sequías y condiciones adversas</li>
                    <li>Menor requerimiento de insumos que otros cultivos</li>
                    <li>Vida productiva superior a 30 años</li>
                    <li>Cultivo con certificación orgánica</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Investment;
