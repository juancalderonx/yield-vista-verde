import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STRATEGIC_PARTNERS, TEAM_MEMBERS } from "@/lib/constants";

const About = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Sobre GreenYield
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Somos una empresa de tecnología agrícola enfocada en ofrecer
            oportunidades de inversión en cultivos de marañón colombiano a
            través de un modelo transparente y sostenible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-700">
              Nuestra Misión
            </h3>
            <p className="text-gray-700">
              Democratizar la inversión en agricultura sostenible, conectando
              capital con proyectos agrícolas de alto impacto que generen
              retornos consistentes y contribuyan al desarrollo rural de
              Colombia.
            </p>

            <h3 className="text-2xl font-bold text-green-700 mt-8">
              Nuestra Visión
            </h3>
            <p className="text-gray-700">
              Ser la plataforma líder en inversiones agrícolas en Latinoamérica,
              reconocida por su transparencia, impacto positivo en comunidades
              rurales y adopción de tecnología para el monitoreo de cultivos.
            </p>
          </div>

          <div className="relative h-72 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80"
              alt="Campo de marañón"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end">
              <div className="p-6 text-white">
                <p className="font-semibold">Fincas en Vichada, Colombia</p>
                <p className="text-sm opacity-80">
                  Agricultura sostenible y de alto rendimiento
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-green-700 text-center mb-10">
            Nuestro Equipo
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <Card
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {member.name}
                  </CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-700 text-center mb-10">
            Aliados Estratégicos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {STRATEGIC_PARTNERS.map((partner, index) => (
              <Card
                key={index}
                className="bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-green-800">
                        {partner.name}
                      </CardTitle>
                      <CardDescription>{partner.type}</CardDescription>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Aliado
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
