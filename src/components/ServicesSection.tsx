import { Building2, Users, FileCheck, Clock, HeartHandshake, Shield } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Recrutement Express",
    description: "Trouvez le candidat idéal en 24h grâce à notre base de données qualifiée.",
    forEmployer: true,
  },
  {
    icon: FileCheck,
    title: "Gestion Administrative",
    description: "Contrats, paie, déclarations : nous gérons toute la paperasse pour vous.",
    forEmployer: true,
  },
  {
    icon: Shield,
    title: "Candidats Certifiés",
    description: "Tous nos intérimaires possèdent les certifications et habilitations requises.",
    forEmployer: true,
  },
  {
    icon: Clock,
    title: "Missions Variées",
    description: "CDD, CDI intérimaire, missions courtes ou longues selon vos disponibilités.",
    forEmployer: false,
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement Personnalisé",
    description: "Un conseiller dédié vous guide dans votre recherche d'emploi.",
    forEmployer: false,
  },
  {
    icon: Building2,
    title: "Entreprises de Qualité",
    description: "Accédez aux meilleures entreprises du BTP et de l'industrie.",
    forEmployer: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Une solution pour chaque besoin
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Que vous soyez employeur ou candidat, nous avons les services adaptés pour répondre à vos attentes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Employer Services */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 mb-4">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Pour les employeurs</span>
            </div>
            {services
              .filter((s) => s.forEmployer)
              .map((service, index) => (
                <div
                  key={service.title}
                  className="group bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Candidate Services */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Pour les candidats</span>
            </div>
            {services
              .filter((s) => !s.forEmployer)
              .map((service, index) => (
                <div
                  key={service.title}
                  className="group bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
