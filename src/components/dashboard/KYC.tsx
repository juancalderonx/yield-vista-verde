import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  AlertCircle,
  Info,
} from "lucide-react";

const KYC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    idType: "cc",
    idNumber: "",
    birthDate: "",
    nationality: "CO",
    address: "",
    city: "",
    phone: "",
  });

  const [financialInfo, setFinancialInfo] = useState({
    occupation: "",
    company: "",
    monthlyIncome: "",
    sourceOfFunds: "",
  });

  const [documents, setDocuments] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinancialInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFinancialInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Información enviada con éxito. Procesaremos tu verificación KYC en las próximas 24-48 horas."
      );
    }, 2000);
  };

  // Helper function to determine the next tab
  const goToNextTab = () => {
    if (activeTab === "personal") {
      setActiveTab("financial");
    } else if (activeTab === "financial") {
      setActiveTab("documents");
    }
  };

  // KYC steps
  const steps = [
    {
      id: "personal",
      title: "Información Personal",
      description: "Datos básicos de identificación",
      icon: <Info className="h-5 w-5" />,
    },
    {
      id: "financial",
      title: "Información Financiera",
      description: "Datos sobre tu actividad económica",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "documents",
      title: "Documentación",
      description: "Sube los documentos requeridos",
      icon: <Upload className="h-5 w-5" />,
    },
    {
      id: "verification",
      title: "Verificación",
      description: "Estado del proceso",
      icon: user?.kycVerified ? (
        <CheckCircle2 className="h-5 w-5" />
      ) : (
        <Clock className="h-5 w-5" />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Verificación KYC</h2>
          <p className="text-gray-500 mt-1">
            Completa el proceso de "Conoce a Tu Cliente" para activar todas las
            funcionalidades
          </p>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
            user?.kycVerified
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {user?.kycVerified ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Verificado
            </>
          ) : (
            <>
              <Clock className="h-4 w-4 mr-1" />
              Pendiente
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {steps.map((step) => (
          <Card
            key={step.id}
            className={`cursor-pointer hover:border-green-200 transition-colors ${
              activeTab === step.id ? "border-green-500 bg-green-50" : ""
            }`}
            onClick={() => setActiveTab(step.id)}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <div
                className={`p-2 rounded-full ${
                  activeTab === step.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Proporciona tus datos personales para el proceso de verificación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    placeholder="Ingresa tus nombres"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    placeholder="Ingresa tus apellidos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idType">Tipo de Documento</Label>
                  <Select
                    value={personalInfo.idType}
                    onValueChange={(value) =>
                      setPersonalInfo((prev) => ({ ...prev, idType: value }))
                    }
                  >
                    <SelectTrigger id="idType">
                      <SelectValue placeholder="Selecciona el tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                      <SelectItem value="passport">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">Número de Documento</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={personalInfo.idNumber}
                    onChange={handlePersonalInfoChange}
                    placeholder="Ingresa tu número de documento"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={personalInfo.birthDate}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nacionalidad</Label>
                  <Select
                    value={personalInfo.nationality}
                    onValueChange={(value) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        nationality: value,
                      }))
                    }
                  >
                    <SelectTrigger id="nationality">
                      <SelectValue placeholder="Selecciona tu nacionalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CO">Colombia</SelectItem>
                      <SelectItem value="US">Estados Unidos</SelectItem>
                      <SelectItem value="MX">México</SelectItem>
                      <SelectItem value="ES">España</SelectItem>
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="CL">Chile</SelectItem>
                      <SelectItem value="PE">Perú</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    placeholder="Ingresa tu dirección completa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                    placeholder="Ingresa tu ciudad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={goToNextTab}
                className="bg-green-600 hover:bg-green-700"
              >
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Financiera</CardTitle>
              <CardDescription>
                Datos sobre tu actividad económica y origen de fondos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Ocupación</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    value={financialInfo.occupation}
                    onChange={handleFinancialInfoChange}
                    placeholder="Ej: Ingeniero, Médico, Empresario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={financialInfo.company}
                    onChange={handleFinancialInfoChange}
                    placeholder="Nombre de la empresa donde trabajas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">
                    Ingresos Mensuales (USD)
                  </Label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={financialInfo.monthlyIncome}
                    onChange={handleFinancialInfoChange}
                    placeholder="Ej: 5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds">Origen de Fondos</Label>
                  <Select
                    value={financialInfo.sourceOfFunds}
                    onValueChange={(value) =>
                      setFinancialInfo((prev) => ({
                        ...prev,
                        sourceOfFunds: value,
                      }))
                    }
                  >
                    <SelectTrigger id="sourceOfFunds">
                      <SelectValue placeholder="Selecciona el origen de tus fondos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salario</SelectItem>
                      <SelectItem value="business">Negocio Propio</SelectItem>
                      <SelectItem value="investments">Inversiones</SelectItem>
                      <SelectItem value="inheritance">Herencia</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Información Importante</p>
                  <p>
                    Esta información es necesaria para cumplir con las
                    regulaciones contra el lavado de activos y financiación del
                    terrorismo. Todos tus datos están protegidos y son tratados
                    con estricta confidencialidad según nuestra política de
                    privacidad.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("personal")}
              >
                Atrás
              </Button>
              <Button
                onClick={goToNextTab}
                className="bg-green-600 hover:bg-green-700"
              >
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carga de Documentos</CardTitle>
              <CardDescription>
                Sube los documentos necesarios para verificar tu identidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="idFront">
                    Documento de Identidad (Frente)
                  </Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Haga clic para cargar o arrastrar y soltar
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG o PDF hasta 5MB
                    </p>
                    <Input
                      id="idFront"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idBack">
                    Documento de Identidad (Reverso)
                  </Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Haga clic para cargar o arrastrar y soltar
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG o PDF hasta 5MB
                    </p>
                    <Input
                      id="idBack"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selfie">Selfie con Documento</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Foto sosteniendo tu documento y una nota con la fecha
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG o JPG hasta 5MB
                    </p>
                    <Input
                      id="selfie"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proofOfAddress">
                    Comprobante de Domicilio
                  </Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Factura de servicios o estado de cuenta bancario
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG o PDF hasta 5MB
                    </p>
                    <Input
                      id="proofOfAddress"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md border border-amber-100 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">
                    Requisitos para los documentos
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Documentos vigentes y legibles</li>
                    <li>
                      El comprobante de domicilio debe tener menos de 3 meses de
                      antigüedad
                    </li>
                    <li>
                      En la selfie debe verse claramente tu rostro y el
                      documento
                    </li>
                    <li>No se aceptan documentos recortados o alterados</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("financial")}
              >
                Atrás
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Enviando..." : "Enviar Documentos"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Verificación</CardTitle>
              <CardDescription>
                Seguimiento del proceso de verificación KYC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <div className="flex items-center">
                  {user?.kycVerified ? (
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {user?.kycVerified
                        ? "Verificación Completada"
                        : "Verificación en Proceso"}
                    </h3>
                    <p className="text-gray-600">
                      {user?.kycVerified
                        ? "Tu identidad ha sido verificada correctamente. Ya puedes acceder a todas las funcionalidades de la plataforma."
                        : "Estamos revisando tu documentación. Este proceso puede tomar entre 24-48 horas hábiles."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Pasos de la verificación
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Envío de documentación</p>
                      <p className="text-sm text-gray-500">
                        Completado el 15-05-2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Validación de documentos</p>
                      <p className="text-sm text-gray-500">
                        Completado el 16-05-2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {user?.kycVerified ? (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">Verificación de identidad</p>
                      <p className="text-sm text-gray-500">
                        {user?.kycVerified
                          ? "Completado el 17-05-2024"
                          : "En proceso"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {user?.kycVerified ? (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      </div>
                    )}
                    <div>
                      <p
                        className={`font-medium ${
                          !user?.kycVerified && "text-gray-400"
                        }`}
                      >
                        Activación de cuenta
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.kycVerified
                          ? "Completado el 17-05-2024"
                          : "Pendiente"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {!user?.kycVerified && (
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-800">
                    Te notificaremos por correo electrónico cuando tu
                    verificación KYC haya sido completada. Si tienes alguna
                    pregunta, por favor contacta a nuestro equipo de soporte.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setActiveTab("documents")}
                className="mr-4"
              >
                Volver a documentos
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Contactar soporte
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KYC;
