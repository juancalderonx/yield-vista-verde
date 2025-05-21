
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "sidebar" | "navbar";
}

const LanguageSwitcher = ({ variant = "navbar" }: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();

  if (variant === "sidebar") {
    return (
      <div className="py-4">
        <div className="flex items-center justify-between px-4 mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {t("language")}
          </span>
          <Globe className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex space-x-2 px-4">
          <Button
            size="sm"
            variant={language === "es" ? "default" : "outline"}
            className={language === "es" ? "bg-green-600 hover:bg-green-700" : ""}
            onClick={() => setLanguage("es")}
          >
            {t("language.es")}
          </Button>
          <Button
            size="sm"
            variant={language === "en" ? "default" : "outline"}
            className={language === "en" ? "bg-green-600 hover:bg-green-700" : ""}
            onClick={() => setLanguage("en")}
          >
            {t("language.en")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          <span className={language === "es" ? "font-bold text-green-600" : ""}>
            {t("language.es")}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          <span className={language === "en" ? "font-bold text-green-600" : ""}>
            {t("language.en")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
