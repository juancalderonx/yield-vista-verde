
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

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
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          </div>
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
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-700">{t("language")}:</span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-sm"
                  onClick={() => {
                    const { setLanguage } = useLanguage();
                    setLanguage("es");
                    setIsMenuOpen(false);
                  }}
                >
                  {t("language.es")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-sm"
                  onClick={() => {
                    const { setLanguage } = useLanguage();
                    setLanguage("en");
                    setIsMenuOpen(false);
                  }}
                >
                  {t("language.en")}
                </Button>
              </div>
            </div>
            <Button
              asChild
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                {t("nav.login")}
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
  const { t } = useLanguage();
  
  const handleClick = () => {
    if (mobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const links = [
    { text: t("nav.home"), href: "/" },
    { text: t("nav.cashew"), href: "#cashew" },
    { text: t("nav.farms"), href: "#farms" },
    { text: t("nav.investment"), href: "#investment" },
    { text: t("nav.calculator"), href: "#calculator" },
    { text: t("nav.about"), href: "#about" },
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
