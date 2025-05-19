
import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Upload, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const KYC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    country: "",
    documentType: "",
    confirmVerification: false,
  });

  const [documents, setDocuments] = useState({
    frontSide: null,
    backSide: null,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.country || !formData.documentType) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    
    if (!formData.confirmVerification) {
      toast.error("Por favor confirma la veracidad de tus documentos");
      return;
    }
    
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Información enviada con éxito. Procesaremos tu verificación KYC en las próximas 24-48 horas.");
      setCurrentStep(2);
    }, 2000);
  };

  const getTotalSteps = () => {
    return 3;
  };

  const getStepProgress = () => {
    return (currentStep / getTotalSteps()) * 100;
  };

  // Render the content based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Sube una prueba de tu identidad</h2>
              <p className="text-gray-500">
                Se requiere un documento de identidad válido (licencia de conducir, pasaporte, DNI)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">Tu País</Label>
                <Select 
                  value={formData.country} 
                  onValueChange={(value) => updateFormData("country", value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CO">Colombia</SelectItem>
                    <SelectItem value="ES">España</SelectItem>
                    <SelectItem value="MX">México</SelectItem>
                    <SelectItem value="PE">Perú</SelectItem>
                    <SelectItem value="AR">Argentina</SelectItem>
                    <SelectItem value="CL">Chile</SelectItem>
                    <SelectItem value="US">Estados Unidos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentType">Tipo de Documento</Label>
                <Select 
                  value={formData.documentType} 
                  onValueChange={(value) => updateFormData("documentType", value)}
                >
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Selecciona un tipo de documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                    <SelectItem value="passport">Pasaporte</SelectItem>
                    <SelectItem value="driver">Licencia de Conducir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center">
                <div className="bg-gray-50 p-4 rounded-full mb-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Parte frontal de tu documento</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Sube la parte frontal de tu documento
                  <br />Formatos: JPG, PNG, PDF
                </p>
                <Button variant="outline" className="mt-2">
                  Seleccionar Archivo
                </Button>
                <input type="file" className="hidden" accept="image/png,image/jpeg,application/pdf" />
              </div>

              <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center">
                <div className="bg-gray-50 p-4 rounded-full mb-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Parte posterior de tu documento</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Sube la parte posterior de tu documento
                  <br />Formatos: JPG, PNG, PDF
                </p>
                <Button variant="outline" className="mt-2">
                  Seleccionar Archivo
                </Button>
                <input type="file" className="hidden" accept="image/png,image/jpeg,application/pdf" />
              </div>
            </div>

            <div className="flex items-start space-x-2 mt-6">
              <Checkbox 
                id="confirmVerification"
                checked={formData.confirmVerification}
                onCheckedChange={(checked) => 
                  updateFormData("confirmVerification", checked)
                }
              />
              <Label 
                htmlFor="confirmVerification" 
                className="text-sm leading-tight"
              >
                Confirmo que he subido una foto de identificación válida emitida por el gobierno. Esta ID incluye mi foto, firma, nombre, fecha de nacimiento y dirección.
              </Label>
            </div>

            <Button 
              className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Continuar"}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-amber-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Verificación en proceso</h2>
              <p className="text-gray-500 mb-8">
                Estamos verificando tu identidad. Este proceso puede tomar entre 24-48 horas hábiles.
              </p>
              <Button 
                variant="outline" 
                className="mx-auto"
                onClick={() => setCurrentStep(1)}
              >
                Regresar a documentos
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Verificación Completada</h2>
              <p className="text-gray-500 mb-8">
                Tu identidad ha sido verificada correctamente. Ya puedes acceder a todas las funcionalidades de la plataforma.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Verificación KYC</h1>
        <p className="text-gray-500">
          Completa el proceso de "Conoce a Tu Cliente" para activar todas las funcionalidades
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="relative">
          <Progress value={getStepProgress()} className="h-2" />
          <div className="flex justify-between mt-2">
            {Array.from({ length: getTotalSteps() }, (_, i) => i + 1).map((step) => (
              <div 
                key={step} 
                className={`flex flex-col items-center relative`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    step < currentStep
                      ? "bg-indigo-500 text-white"
                      : step === currentStep
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm text-gray-500 mt-2">Paso {step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="bg-gray-50 border-none shadow-sm">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default KYC;
