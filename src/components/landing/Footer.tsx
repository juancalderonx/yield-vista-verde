import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Suscripción enviada");
    // Here you would integrate with a newsletter service
  };

  return (
    <footer className="bg-green-900 text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">
                Green<span className="text-green-300">Yield</span>
              </span>
            </div>
            <p className="text-green-100 max-w-md mb-8">
              GreenYield es una empresa de tecnología agrícola que democratiza
              la inversión en cultivos de marañón colombiano con un enfoque
              fiduciario, transparente y sostenible.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex max-w-md flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-green-800 border-green-700 text-white placeholder:text-green-300"
              />
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-white shrink-0"
              >
                Suscribirse
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Enlaces rápidos</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#farms"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Fincas
                </a>
              </li>
              <li>
                <a
                  href="#investment"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Inversión
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Calculadora
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Nosotros
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="text-green-200">
                <span className="block text-white font-medium">Dirección</span>
                Calle 93 #11-36, Bogotá, Colombia
              </li>
              <li className="text-green-200">
                <span className="block text-white font-medium">Teléfono</span>
                +57 (601) 123-4567
              </li>
              <li className="text-green-200">
                <span className="block text-white font-medium">Email</span>
                info@greenyield.co
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-green-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} GreenYield. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="text-green-300 hover:text-white transition-colors text-sm"
            >
              Términos y Condiciones
            </a>
            <a
              href="#"
              className="text-green-300 hover:text-white transition-colors text-sm"
            >
              Política de Privacidad
            </a>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-800"
            >
              <Link to="/login" className="flex items-center">
                Acceder <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
