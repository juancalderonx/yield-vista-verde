import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2 bg-green-700 relative">
        <div className="absolute inset-0 bg-black/30">
          <img
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80"
            alt="Cashew trees"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Invierte en el futuro del marañón colombiano
          </h1>
          <p className="text-lg md:text-xl text-center max-w-md">
            Accede a tu cuenta para gestionar tus inversiones y monitorear el
            crecimiento de tu capital.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-green-700 hover:text-green-600 mb-4 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Volver al inicio
            </Link>
            <div className="mb-2 text-center">
              <span className="text-2xl font-bold text-green-700">
                Green<span className="text-green-500">Yield</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Accede a tu cuenta
            </h2>
            <p className="text-gray-600 mt-2">
              Ingresa tus credenciales para acceder al dashboard de inversiones
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="#"
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="ml-2 text-sm">
                Recordar mis datos
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Contáctanos para invertir
              </Link>
            </p>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6">
            <p className="text-xs text-gray-500 text-center">
              Al acceder, aceptas nuestros{" "}
              <a href="#" className="text-green-600 hover:underline">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-green-600 hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
