import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, Search, UserCheck, Briefcase,
  Building2, Users, FileCheck, Clock, HeartHandshake, Shield,
  HardHat, Factory, Wrench, Zap, Paintbrush, Building,
  CheckCircle, ArrowRight, Phone
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Inscription",
    description: "Créez votre compte en quelques minutes et complétez votre profil avec vos compétences, certifications et disponibilités.",
    number: "01",
  },
  {
    icon: Search,
    title: "Matching",
    description: "Notre algorithme analyse votre profil et identifie les meilleures opportunités correspondant à vos critères.",
    number: "02",
  },
  {
    icon: UserCheck,
    title: "Validation",
    description: "Un conseiller dédié vérifie votre dossier, vos qualifications et s'assure que tout est en ordre.",
    number: "03",
  },
  {
    icon: Briefcase,
    title: "Mission",
    description: "Vous démarrez votre mission avec un accompagnement personnalisé tout au long de votre contrat.",
    number: "04",
  },
];

const servicesEmployeur = [
  {
    icon: Users,
    title: "Recrutement Express",
    description: "Trouvez le candidat idéal en 24h grâce à notre base de données qualifiée de plus de 5000 intérimaires.",
  },
  {
    icon: FileCheck,
    title: "Gestion Administrative Complète",
    description: "Contrats, paie, déclarations URSSAF, attestations : nous gérons toute la paperasse pour vous.",
  },
  {
    icon: Shield,
    title: "Candidats Certifiés",
    description: "Tous nos intérimaires possèdent les certifications et habilitations requises (CACES, habilitations électriques, etc.).",
  },
];

const servicesCandidat = [
  {
    icon: Clock,
    title: "Missions Variées",
    description: "CDD, CDI intérimaire, missions courtes ou longues selon vos disponibilités et objectifs de carrière.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement Personnalisé",
    description: "Un conseiller dédié vous guide dans votre recherche d'emploi et votre évolution professionnelle.",
  },
  {
    icon: Building2,
    title: "Entreprises de Qualité",
    description: "Accédez aux meilleures entreprises du BTP et de l'industrie en Île-de-France.",
  },
];

const sectors = [
  { icon: HardHat, title: "Gros Œuvre", description: "Maçonnerie, coffrage, ferraillage, béton armé" },
  { icon: Building, title: "Second Œuvre", description: "Plâtrerie, menuiserie, carrelage, peinture" },
  { icon: Zap, title: "Électricité", description: "Installation, maintenance, courant fort et faible" },
  { icon: Wrench, title: "Plomberie & CVC", description: "Chauffage, ventilation, climatisation, sanitaires" },
  { icon: Factory, title: "Industrie", description: "Production, maintenance industrielle, logistique" },
  { icon: Paintbrush, title: "Finitions", description: "Peinture, ravalement, isolation, étanchéité" },
];

const avantages = [
  "Plus de 20 ans d'expérience dans le BTP",
  "Plus de 500 entreprises partenaires",
  "Plus de 5000 intérimaires qualifiés",
  "Réactivité 24h/24",
  "Accompagnement personnalisé",
  "Gestion administrative simplifiée",
];

const NosServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Nos Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Des solutions sur mesure pour vos besoins
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-8">
              Que vous soyez une entreprise à la recherche de talents ou un professionnel en quête de missions, 
              nous avons les services adaptés pour répondre à vos attentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard-entreprise">
                <Button variant="cta" size="lg">
                  Espace Recruteur
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard-interimaire">
                <Button variant="outline" size="lg">
                  Espace Intérimaire
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Comment ça marche
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Simple, rapide, efficace
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                En 4 étapes, trouvez votre prochaine mission ou le candidat idéal.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
                  )}
                  
                  <div className="relative text-center">
                    <span className="absolute -top-2 -left-2 text-6xl font-extrabold text-muted/50 select-none">
                      {step.number}
                    </span>
                    
                    <div className="relative w-20 h-20 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <step.icon className="w-9 h-9 text-primary-foreground" />
                    </div>
                    
                    <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Une solution pour chaque besoin
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos offres de services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Employer Services */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 mb-4">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Pour les employeurs</span>
                </div>
                {servicesEmployeur.map((service) => (
                  <div
                    key={service.title}
                    className="group bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border/50"
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
                {servicesCandidat.map((service) => (
                  <div
                    key={service.title}
                    className="group bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border/50"
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

        {/* Sectors Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Nos Secteurs d'Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Experts dans tous les métiers du BTP
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre expertise couvre l'ensemble des corps de métiers du bâtiment et de l'industrie.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="group relative bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border/50 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                      <sector.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{sector.title}</h3>
                    <p className="text-muted-foreground text-sm">{sector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                    Pourquoi nous choisir
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Les avantages Interim Online Pro-Tech
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Nous nous engageons à offrir un service de qualité, réactif et personnalisé 
                    pour répondre aux besoins spécifiques de chaque client et candidat.
                  </p>
                  <div className="flex gap-4">
                    <a href="tel:+33140341045">
                      <Button variant="cta" size="lg">
                        <Phone className="mr-2 w-4 h-4" />
                        01 40 34 10 45
                      </Button>
                    </a>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {avantages.map((avantage, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-card rounded-lg p-4 shadow-card border border-border/50"
                    >
                      <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{avantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NosServices;
