
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Support = () => {
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSupportForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (
      !supportForm.name ||
      !supportForm.email ||
      !supportForm.message ||
      !supportForm.category
    ) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Submit form (mock)
    toast.success(
      "Tu solicitud ha sido enviada. Te responderemos a la brevedad."
    );

    // Reset form
    setSupportForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  // FAQ items
  const faqs = [
    {
      id: "faq-1",
      question: "¿Cómo puedo aumentar mi inversión?",
      answer:
        "Puedes aumentar tu inversión en cualquier momento accediendo a la sección 'Mi Portafolio' y haciendo clic en el botón 'Aumentar Inversión'. El monto mínimo adicional es de $1,000 USD.",
    },
    {
      id: "faq-2",
      question: "¿Cuándo recibiré mis primeros retornos?",
      answer:
        "Los árboles de marañón comienzan a producir comercialmente a partir del tercer año. Los primeros retornos se distribuyen trimestralmente una vez que los árboles entran en producción.",
    },
    {
      id: "faq-3",
      question: "¿Puedo vender mi inversión antes de los 5 años?",
      answer:
        "El período mínimo recomendado de inversión es de 5 años. Sin embargo, en casos excepcionales, podemos facilitar la venta de tu participación en el mercado secundario, sujeto a una comisión del 5%.",
    },
    {
      id: "faq-4",
      question: "¿Cómo se maneja el riesgo climático?",
      answer:
        "Implementamos diversas estrategias de mitigación, incluyendo sistemas de riego, monitoreo satelital del clima y seguros agrícolas que cubren eventos climáticos extremos como sequías prolongadas o inundaciones.",
    },
    {
      id: "faq-5",
      question: "¿Puedo visitar las fincas donde están mis árboles?",
      answer:
        "¡Absolutamente! Organizamos visitas periódicas para inversionistas. Puedes solicitar una visita a través de la sección de soporte o directamente con tu asesor asignado.",
    },
    {
      id: "faq-6",
      question: "¿Qué documentos necesito para completar la verificación KYC?",
      answer:
        "Necesitas proporcionar una copia de tu documento de identidad (por ambos lados), una selfie sosteniendo tu documento, y un comprobante de domicilio reciente (menos de 3 meses de antigüedad).",
    },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800">Centro de Soporte</h2>

      {/* Contact Cards - More compact and modern */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
          <CardContent className="p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-3">
              <Phone className="h-5 w-5 text-green-700" />
            </div>
            <h3 className="text-base font-medium text-green-800 mb-1">
              Línea Directa
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Atención personalizada
            </p>
            <p className="text-green-700 font-medium text-sm">+57 (601) 123-4567</p>
            <p className="text-xs text-gray-500 mt-1">Lun-Vie: 8:00 - 18:00</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
          <CardContent className="p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mb-3">
              <Mail className="h-5 w-5 text-blue-700" />
            </div>
            <h3 className="text-base font-medium text-blue-800 mb-1">
              Correo Electrónico
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Escríbenos
            </p>
            <p className="text-blue-700 font-medium text-sm">soporte@greenyield.co</p>
            <p className="text-xs text-gray-500 mt-1">Respuesta en 24 horas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden">
          <CardContent className="p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mb-3">
              <MessageSquare className="h-5 w-5 text-amber-700" />
            </div>
            <h3 className="text-base font-medium text-amber-800 mb-1">
              Chat en Vivo
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Asistencia inmediata
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-xs h-8 px-3">
              Iniciar Chat
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
              Disponible ahora
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* FAQ Section - Modern and clean */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="flex items-center text-lg font-medium">
                <HelpCircle className="h-4 w-4 mr-2 text-green-600" />
                Preguntas Frecuentes
              </CardTitle>
              <CardDescription className="text-xs">
                Respuestas a las consultas más comunes
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 py-2">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-100">
                    <AccordionTrigger className="text-sm font-medium text-green-800 hover:text-green-600 py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Request Status - Cleaner design */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="flex items-center text-lg font-medium">
                <Clock className="h-4 w-4 mr-2 text-green-600" />
                Estado de Solicitudes
              </CardTitle>
              <CardDescription className="text-xs">
                Seguimiento de tus solicitudes recientes
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 py-2">
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-md border border-green-100 flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      Solicitud #12345 - Resuelta
                    </p>
                    <p className="text-xs text-gray-600">
                      Consulta sobre proceso de reinversión
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      17-05-2024
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-md border border-amber-100 flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      Solicitud #12380 - En proceso
                    </p>
                    <p className="text-xs text-gray-600">
                      Coordinación de visita a finca
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      15-05-2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  Ver todas las solicitudes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form - Modern design */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-lg font-medium">
              Formulario de Contacto
            </CardTitle>
            <CardDescription className="text-xs">
              Envíanos tu consulta y te responderemos pronto
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-2 pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Nombre Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={supportForm.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="h-9 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={supportForm.email}
                    onChange={handleInputChange}
                    placeholder="email@ejemplo.com"
                    className="h-9 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-xs">Categoría *</Label>
                  <Select
                    value={supportForm.category}
                    onValueChange={(value) =>
                      setSupportForm((prev) => ({ ...prev, category: value }))
                    }
                    required
                  >
                    <SelectTrigger id="category" className="h-9 text-sm">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investments">Inversiones</SelectItem>
                      <SelectItem value="account">Cuenta y KYC</SelectItem>
                      <SelectItem value="returns">Rendimientos</SelectItem>
                      <SelectItem value="visits">Visitas a fincas</SelectItem>
                      <SelectItem value="technical">Soporte técnico</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={supportForm.subject}
                    onChange={handleInputChange}
                    placeholder="Asunto de tu consulta"
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs">Mensaje *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={supportForm.message}
                  onChange={handleInputChange}
                  placeholder="Escribe tu mensaje detallado aquí"
                  rows={4}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Nuestro equipo responderá a tu consulta en un plazo máximo de
                  24 horas hábiles.
                </p>
              </div>

              <CardFooter className="px-0 pt-2 pb-0 flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-sm h-9"
                >
                  Enviar Consulta
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
