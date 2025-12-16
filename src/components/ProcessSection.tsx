import { ClipboardList, Search, UserCheck, Briefcase } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Inscription",
    description: "Créez votre compte en quelques minutes et complétez votre profil.",
    number: "01",
  },
  {
    icon: Search,
    title: "Matching",
    description: "Notre algorithme identifie les meilleures opportunités pour vous.",
    number: "02",
  },
  {
    icon: UserCheck,
    title: "Validation",
    description: "Un conseiller vérifie votre dossier et vos qualifications.",
    number: "03",
  },
  {
    icon: Briefcase,
    title: "Mission",
    description: "Vous démarrez votre mission avec un accompagnement personnalisé.",
    number: "04",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="relative text-center">
                {/* Step Number */}
                <span className="absolute -top-2 -left-2 text-6xl font-extrabold text-muted/50 select-none">
                  {step.number}
                </span>
                
                {/* Icon */}
                <div className="relative w-20 h-20 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
