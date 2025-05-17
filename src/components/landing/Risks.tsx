import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Risks = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["item-1"]);

  const cashewBenefits = [
    {
      id: "item-1",
      title: "¿Por qué invertir en marañón?",
      content:
        "El marañón colombiano representa una excelente oportunidad de inversión debido a su creciente demanda internacional, resistencia a condiciones climáticas adversas, y su capacidad para generar rendimientos sostenibles por más de 30 años. Además, contribuye al desarrollo sostenible de las comunidades rurales en Colombia.",
    },
    {
      id: "item-2",
      title: "Características del cultivo",
      content:
        "El árbol de marañón (Anacardium occidentale) es una especie perenne que se adapta perfectamente a las condiciones de la Orinoquia colombiana. Es resistente a sequías, requiere menos agua que otros cultivos y comienza su producción comercial desde el tercer año. Cada árbol puede producir entre 8 y 15 kg de nueces anualmente cuando alcanza su madurez.",
    },
    {
      id: "item-3",
      title: "Mercado internacional",
      content:
        "La demanda global de marañón ha crecido consistentemente a un ritmo del 7-9% anual durante la última década. Los principales mercados son Estados Unidos, Europa, China e India. Colombia tiene una posición estratégica para la exportación y beneficios arancelarios con varios de estos mercados, lo que mejora la competitividad de nuestra producción.",
    },
    {
      id: "item-4",
      title: "Impacto ambiental positivo",
      content:
        "El cultivo de marañón contribuye a la regeneración de suelos, captura de carbono y mitigación del cambio climático. Nuestras fincas implementan prácticas agroecológicas sostenibles que mejoran la biodiversidad y conservan los recursos naturales de la región.",
    },
  ];

  const faqs = [
    {
      id: "faq-1",
      title: "¿Cuál es la inversión mínima?",
      content:
        "La inversión mínima es de $5,000 USD (aproximadamente $20,000,000 COP). Este monto te permite adquirir aproximadamente 100 árboles de marañón o 1 hectárea de cultivo.",
    },
    {
      id: "faq-2",
      title: "¿Cómo se garantiza la seguridad de mi inversión?",
      content:
        "Tu inversión está respaldada por un esquema fiduciario regulado por la Superintendencia Financiera de Colombia. Los recursos se administran a través de este fideicomiso, asegurando la transparencia y trazabilidad de los fondos.",
    },
    {
      id: "faq-3",
      title: "¿Cuándo empezaré a recibir retornos?",
      content:
        "Los primeros retornos se generan a partir del tercer año, cuando los árboles comienzan su producción comercial. Los rendimientos aumentan progresivamente hasta alcanzar su máximo potencial alrededor del año 10.",
    },
    {
      id: "faq-4",
      title: "¿Puedo visitar las fincas?",
      content:
        "Sí, organizamos visitas periódicas para inversionistas a nuestras fincas en Vichada. Estas visitas te permiten conocer de primera mano el desarrollo de los cultivos y el impacto de tu inversión. Contacta a nuestro equipo para programar una visita.",
    },
    {
      id: "faq-5",
      title: "¿Qué sucede si quiero vender mi inversión?",
      content:
        "Después de un período mínimo de 5 años, ofrecemos opciones para la venta de tu participación. Contamos con un mercado secundario donde otros inversionistas pueden adquirir tu participación, o GreenYield puede ejercer una opción de recompra según las condiciones del mercado.",
    },
    {
      id: "faq-6",
      title: "¿Cómo se manejan los riesgos del cultivo?",
      content:
        "Implementamos protocolos avanzados de gestión de riesgos que incluyen sistemas de riego, monitoreo satelital, control integrado de plagas y diversificación geográfica de las plantaciones. Además, contamos con seguros agrícolas que cubren eventos climáticos extremos.",
    },
  ];

  return (
    <section className="section bg-gradient-to-b from-white to-green-50 py-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                El marañón como inversión
              </h2>
              <p className="text-lg text-gray-600">
                Conoce por qué el marañón colombiano representa una oportunidad
                excepcional para diversificar tu portafolio con inversiones
                agrícolas de alto impacto.
              </p>
            </div>

            <Accordion
              type="multiple"
              value={expandedItems}
              onValueChange={setExpandedItems}
              className="mb-10"
            >
              {cashewBenefits.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-green-200"
                >
                  <AccordionTrigger className="text-lg font-medium text-green-800 hover:text-green-600 py-5">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-5">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="relative overflow-hidden rounded-xl h-64 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80"
                alt="Plantación de marañón"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium text-xl">
                    El futuro sostenible de la agroindustria colombiana
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-gray-600">
                Resolvemos tus dudas sobre inversión en marañón con GreenYield.
              </p>
            </div>

            <Accordion type="single" collapsible className="mb-10">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b border-green-200"
                >
                  <AccordionTrigger className="text-lg font-medium text-green-800 hover:text-green-600 py-5">
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-5">
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="bg-green-100 border border-green-200 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-green-800 mb-3">
                ¿Tienes más preguntas?
              </h3>
              <p className="text-gray-700 mb-6">
                Nuestro equipo de asesores está disponible para resolver todas
                tus dudas y ayudarte a tomar la mejor decisión de inversión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <a href="mailto:inversiones@greenyield.co">
                    Contactar asesor
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 flex-1"
                >
                  <Link to="/login">
                    Iniciar inversión <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Risks;
