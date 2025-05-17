import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Centro de Soporte</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Línea Directa
            </h3>
            <p className="text-gray-600 mb-4">
              Atención personalizada para inversionistas
            </p>
            <p className="text-green-700 font-medium">+57 (601) 123-4567</p>
            <p className="text-sm text-gray-500 mt-1">Lun-Vie: 8:00 - 18:00</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Correo Electrónico
            </h3>
            <p className="text-gray-600 mb-4">
              Escríbenos en cualquier momento
            </p>
            <p className="text-blue-700 font-medium">soporte@greenyield.co</p>
            <p className="text-sm text-gray-500 mt-1">Respuesta en 24 horas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Chat en Vivo
            </h3>
            <p className="text-gray-600 mb-4">
              Asistencia inmediata para consultas
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Iniciar Chat
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Disponible ahora
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                Preguntas Frecuentes
              </CardTitle>
              <CardDescription>
                Respuestas a las consultas más comunes de nuestros
                inversionistas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="font-medium text-green-800 hover:text-green-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Estado de Solicitudes
              </CardTitle>
              <CardDescription>
                Seguimiento de tus solicitudes de soporte recientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Solicitud #12345 - Resuelta
                    </p>
                    <p className="text-sm text-gray-600">
                      Consulta sobre proceso de reinversión
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Actualizado: 17-05-2024
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Solicitud #12380 - En proceso
                    </p>
                    <p className="text-sm text-gray-600">
                      Coordinación de visita a finca
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Actualizado: 15-05-2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Ver todas las solicitudes</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de Contacto</CardTitle>
            <CardDescription>
              Envíanos tu consulta y te responderemos a la brevedad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={supportForm.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={supportForm.email}
                    onChange={handleInputChange}
                    placeholder="email@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    value={supportForm.category}
                    onValueChange={(value) =>
                      setSupportForm((prev) => ({ ...prev, category: value }))
                    }
                    required
                  >
                    <SelectTrigger id="category">
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

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={supportForm.subject}
                    onChange={handleInputChange}
                    placeholder="Asunto de tu consulta"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={supportForm.message}
                  onChange={handleInputChange}
                  placeholder="Escribe tu mensaje detallado aquí"
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Nuestro equipo responderá a tu consulta en un plazo máximo de
                  24 horas hábiles.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Enviar Consulta
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
