
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LayoutDashboard,
  Landmark,
  LineChart,
  MapPin,
  WalletCards,
  UserCheck,
  HelpCircle,
  LogOut,
  Menu,
  ChevronRight,
  X,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    {
      path: "/dashboard",
      label: "Panel Principal",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      path: "/dashboard/portfolio",
      label: "Mi Portafolio",
      icon: <Landmark className="h-5 w-5" />,
    },
    {
      path: "/dashboard/calculator",
      label: "Calculadora",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      path: "/dashboard/farms",
      label: "Fincas",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      path: "/dashboard/balance",
      label: "Mi Balance",
      icon: <WalletCards className="h-5 w-5" />,
    },
    {
      path: "/dashboard/kyc",
      label: "Verificación KYC",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      path: "/dashboard/support",
      label: "Soporte",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarClassName = `fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300
    ${collapsed ? "w-20" : "w-64"} 
    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`;

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside className={sidebarClassName}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between h-16 px-4">
            <Link to="/" className="flex items-center gap-2">
              {!collapsed && (
                <span className="text-xl font-bold text-green-700 dark:text-green-500">
                  Green<span className="text-green-500 dark:text-green-400">Yield</span>
                </span>
              )}
              {collapsed && (
                <span className="text-xl font-bold text-green-700 dark:text-green-500">G</span>
              )}
            </Link>

            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="hidden md:flex">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${
                    collapsed ? "" : "rotate-180"
                  }`}
                />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 px-4">
            <nav className="flex flex-col gap-2 py-4">
              {links.map((link) => (
                <Button
                  key={link.path}
                  asChild
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className={`justify-start ${
                    isActive(link.path)
                      ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"
                  }`}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.icon}
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </Button>
              ))}
            </nav>

            <Separator className="my-4" />

            <div className="py-4 flex flex-col gap-2">
              {!collapsed && <ThemeToggle />}
              
              <Button
                variant="outline"
                className="w-full justify-start border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                {!collapsed && <span>Cerrar Sesión</span>}
              </Button>
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
