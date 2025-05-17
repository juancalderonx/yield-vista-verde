import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-cashew-pattern opacity-5 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
              Invierte en el futuro del{" "}
              <span className="text-green-600">marañón colombiano</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-lg">
              Diversifica tu portafolio con inversiones agrícolas transparentes
              y rentables, respaldadas por un modelo fiduciario seguro.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                <Link to="/login">
                  Comienza a invertir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                <a href="#calculator">Calcular rentabilidad</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-green-600">12%</span>
                <span className="text-sm text-gray-600">
                  Rendimiento anual promedio
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-green-600">100%</span>
                <span className="text-sm text-gray-600">
                  Transparencia en la inversión
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-green-600">5</span>
                <span className="text-sm text-gray-600">
                  Años de tiempo mínimo
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-2xl bg-green-700/90 backdrop-blur overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80"
                  alt="Campo de marañón en Colombia"
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&q=80&w=2942&ixlib=rb-4.0.3"
                alt="Nueces de marañón"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
