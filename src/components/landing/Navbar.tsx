import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 fixed w-full top-0 z-50 shadow-sm">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-700">
              Green<span className="text-green-500">Yield</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Link to="/login">Acceder</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-4">
            <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />
            <Button
              asChild
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Acceder
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

type NavLinksProps = {
  mobile?: boolean;
  setIsMenuOpen?: (value: boolean) => void;
};

const NavLinks = ({ mobile, setIsMenuOpen }: NavLinksProps) => {
  const handleClick = () => {
    if (mobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const links = [
    { text: "Inicio", href: "/" },
    { text: "Marañón", href: "#cashew" },
    { text: "Fincas", href: "#farms" },
    { text: "Inversión", href: "#investment" },
    { text: "Calculadora", href: "#calculator" },
    { text: "Nosotros", href: "#about" },
  ];

  return (
    <div className={mobile ? "flex flex-col space-y-4" : "flex space-x-8"}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={handleClick}
          className="text-gray-700 hover:text-green-600 font-medium transition-colors"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
};

export default Navbar;
