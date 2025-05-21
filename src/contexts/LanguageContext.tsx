
import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  language: "es" | "en";
  setLanguage: (language: "es" | "en") => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Our translations
const translations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.cashew": "Marañón",
    "nav.farms": "Fincas",
    "nav.investment": "Inversión",
    "nav.calculator": "Calculadora",
    "nav.about": "Nosotros",
    "nav.login": "Acceder",
    
    // Hero
    "hero.title": "Invierte en el futuro del marañón colombiano",
    "hero.subtitle": "Diversifica tu portafolio con inversiones agrícolas transparentes y rentables, respaldadas por un modelo fiduciario seguro.",
    "hero.cta.invest": "Comienza a invertir",
    "hero.cta.calculator": "Calcular rentabilidad",
    "hero.stats.return": "Rendimiento anual promedio",
    "hero.stats.transparency": "Transparencia en la inversión",
    "hero.stats.years": "Años de tiempo mínimo",
    
    // Dashboard Sidebar
    "sidebar.dashboard": "Panel Principal",
    "sidebar.portfolio": "Mi Portafolio",
    "sidebar.calculator": "Calculadora",
    "sidebar.farms": "Fincas",
    "sidebar.balance": "Mi Balance",
    "sidebar.kyc": "Verificación KYC",
    "sidebar.support": "Soporte",
    "sidebar.logout": "Cerrar Sesión",
    
    // Footer
    "footer.subscribe": "Suscribirse",
    "footer.email": "Tu correo electrónico",
    "footer.quickLinks": "Enlaces rápidos",
    "footer.contact": "Contacto",
    "footer.address": "Dirección",
    "footer.phone": "Teléfono",
    "footer.email.label": "Email",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",
    "footer.rights": "Todos los derechos reservados.",
    
    // Language
    "language": "Idioma",
    "language.en": "Inglés",
    "language.es": "Español"
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.cashew": "Cashew",
    "nav.farms": "Farms",
    "nav.investment": "Investment",
    "nav.calculator": "Calculator",
    "nav.about": "About Us",
    "nav.login": "Login",
    
    // Hero
    "hero.title": "Invest in the future of Colombian cashew",
    "hero.subtitle": "Diversify your portfolio with transparent and profitable agricultural investments, backed by a secure fiduciary model.",
    "hero.cta.invest": "Start investing",
    "hero.cta.calculator": "Calculate returns",
    "hero.stats.return": "Average annual return",
    "hero.stats.transparency": "Investment transparency",
    "hero.stats.years": "Minimum time in years",
    
    // Dashboard Sidebar
    "sidebar.dashboard": "Main Panel",
    "sidebar.portfolio": "My Portfolio",
    "sidebar.calculator": "Calculator",
    "sidebar.farms": "Farms",
    "sidebar.balance": "My Balance",
    "sidebar.kyc": "KYC Verification",
    "sidebar.support": "Support",
    "sidebar.logout": "Logout",
    
    // Footer
    "footer.subscribe": "Subscribe",
    "footer.email": "Your email",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.address": "Address",
    "footer.phone": "Phone",
    "footer.email.label": "Email",
    "footer.terms": "Terms and Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "All rights reserved.",
    
    // Language
    "language": "Language",
    "language.en": "English",
    "language.es": "Spanish"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get browser language or use Spanish as default
  const getBrowserLanguage = (): "es" | "en" => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'en' ? 'en' : 'es';
  };

  // Try to get language from localStorage or use browser language
  const getInitialLanguage = (): "es" | "en" => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'es') 
      ? savedLanguage 
      : getBrowserLanguage();
  };

  const [language, setLanguageState] = useState<"es" | "en">(getInitialLanguage);

  // Translate function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Set language and save to localStorage
  const setLanguage = (newLanguage: "es" | "en") => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Initial loading from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      setLanguageState(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
