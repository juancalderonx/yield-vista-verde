import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Types
type User = {
  id: string;
  name: string;
  email: string;
  investment: number; // In USD
  kycVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Mock user data
const MOCK_USER: User = {
  id: "1",
  name: "Carlos Investor",
  email: "carlos@example.com",
  investment: 10000, // $10,000 USD
  kycVerified: true,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation
      if (email && password) {
        setUser(MOCK_USER);
        toast.success("¡Inicio de sesión exitoso!");
        return true;
      }

      throw new Error("Credenciales inválidas");
    } catch (error) {
      toast.error("Error al iniciar sesión: credenciales incorrectas.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Has cerrado sesión correctamente.");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Protected route component
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
}
