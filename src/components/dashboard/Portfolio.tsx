import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/calculators";

const UserPanel = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Mock data
  const lastLoginDate = new Date().toLocaleDateString("es-CO");
  const totalTrees = Math.floor(user.investment / 50); // $50 per tree
  const totalHectares = (totalTrees / 100).toFixed(2); // 100 trees per hectare

  // Next steps cards
  const nextStepsCards = [
    {
      title: "Amplía tu inversión",
      description: "Aumenta tu portafolio de marañón y maximiza tus retornos",
      actionText: "Comprar árboles",
      link: "/dashboard/portfolio",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Explora tus fincas",
      description: "Conoce dónde están ubicados tus cultivos de marañón",
      actionText: "Ver mapa",
      link: "/dashboard/farms",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Calcula tu retorno",
      description: "Proyecta tus ganancias con diferentes escenarios",
      actionText: "Ir a calculadora",
      link: "/dashboard/calculator",
      color: "bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user.name}
        </h2>
        <span className="text-sm text-gray-500">
          Último acceso: {lastLoginDate}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Inversión total</CardDescription>
            <CardTitle className="text-2xl text-green-700">
              {formatCurrency(user.investment)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to="/dashboard/portfolio"
              className="text-green-600 text-sm flex items-center hover:underline"
            >
              Ver detalles <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Árboles de marañón</CardDescription>
            <CardTitle className="text-2xl text-green-700">
              {totalTrees.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to="/dashboard/portfolio"
              className="text-green-600 text-sm flex items-center hover:underline"
            >
              Ver detalle de cultivo <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hectáreas totales</CardDescription>
            <CardTitle className="text-2xl text-green-700">
              {totalHectares}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to="/dashboard/farms"
              className="text-green-600 text-sm flex items-center hover:underline"
            >
              Ver fincas <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <CardHeader>
          <CardTitle>Resumen de rendimiento</CardTitle>
          <CardDescription className="text-green-100">
            Proyección de tus inversiones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mt-2">
            <div>
              <p className="text-green-200 text-sm">Rendimiento año 3</p>
              <p className="text-2xl font-bold">
                {formatCurrency(user.investment * 1.08)}
              </p>
              <p className="text-green-200 text-sm">+8% acumulado</p>
            </div>
            <div>
              <p className="text-green-200 text-sm">Rendimiento año 5</p>
              <p className="text-2xl font-bold">
                {formatCurrency(user.investment * 1.47)}
              </p>
              <p className="text-green-200 text-sm">+47% acumulado</p>
            </div>
            <div>
              <p className="text-green-200 text-sm">Rendimiento año 10</p>
              <p className="text-2xl font-bold">
                {formatCurrency(user.investment * 3.55)}
              </p>
              <p className="text-green-200 text-sm">+255% acumulado</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Próximos pasos
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {nextStepsCards.map((card, index) => (
            <Card key={index} className={`${card.color} border`}>
              <CardHeader>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
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
    </div>
  );
};

export default UserPanel;
