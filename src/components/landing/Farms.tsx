import { useState } from "react";
import Map from "@/components/Map";
import { FARM_LOCATIONS } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Farms = () => {
  const [selectedFarm, setSelectedFarm] = useState<number | null>(null);

  return (
    <section id="farms" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Nuestras Fincas en Vichada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Las plantaciones de marañón están ubicadas estratégicamente en el
            departamento del Vichada, donde las condiciones climáticas y de
            suelo son ideales para este cultivo.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                ¿Por qué Vichada?
              </h3>
              <p className="text-gray-700 mb-4">
                El departamento de Vichada ofrece condiciones ideales para el
                cultivo de marañón:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">
                    Clima seco y cálido ideal para el desarrollo del marañón
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">
                    Suelos de sabana adaptables al cultivo
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">
                    Alta luminosidad que favorece la fotosíntesis
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">
                    Baja incidencia de plagas y enfermedades
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">
                    Ubicación estratégica para exportación
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Nuestras Fincas
              </h3>
              <div className="space-y-3">
                {FARM_LOCATIONS.map((farm) => (
                  <Card
                    key={farm.id}
                    className={`cursor-pointer transition-all ${
                      selectedFarm === farm.id
                        ? "border-green-500 shadow-md bg-green-50"
                        : "hover:border-green-200"
                    }`}
                    onClick={() => setSelectedFarm(farm.id)}
                  >
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-lg text-green-800">
                        {farm.name}
                      </CardTitle>
                      <CardDescription>
                        {farm.hectares} hectáreas totales | {farm.available}{" "}
                        disponibles
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <Map
                highlightedFarmId={selectedFarm || undefined}
                height="500px"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 bg-green-50 p-6 md:p-8 rounded-xl border border-green-100">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Desarrollo Sostenible
          </h3>
          <p className="text-gray-700">
            Nuestras operaciones están comprometidas con la sostenibilidad
            ambiental y el desarrollo de las comunidades locales. Implementamos
            prácticas agrícolas regenerativas, generamos empleo rural estable y
            apoyamos la economía local.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-green-600 mb-1">450+</div>
              <p className="text-sm text-gray-600">Empleos generados</p>
            </div>
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-green-600 mb-1">35%</div>
              <p className="text-sm text-gray-600">Mujeres empleadas</p>
            </div>
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
              <p className="text-sm text-gray-600">Prácticas sostenibles</p>
            </div>
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-green-600 mb-1">0</div>
              <p className="text-sm text-gray-600">Deforestación</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Farms;
