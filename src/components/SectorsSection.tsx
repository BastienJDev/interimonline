import { HardHat, Factory, Wrench, Zap, Paintbrush, Building } from "lucide-react";

const sectors = [
  {
    icon: HardHat,
    title: "Gros Œuvre",
    description: "Maçonnerie, coffrage, ferraillage, béton armé",
  },
  {
    icon: Building,
    title: "Second Œuvre",
    description: "Plâtrerie, menuiserie, carrelage, peinture",
  },
  {
    icon: Zap,
    title: "Électricité",
    description: "Installation, maintenance, courant fort et faible",
  },
  {
    icon: Wrench,
    title: "Plomberie & CVC",
    description: "Chauffage, ventilation, climatisation, sanitaires",
  },
  {
    icon: Factory,
    title: "Industrie",
    description: "Production, maintenance industrielle, logistique",
  },
  {
    icon: Paintbrush,
    title: "Finitions",
    description: "Peinture, ravalement, isolation, étanchéité",
  },
];

const SectorsSection = () => {
  return (
    <section id="secteurs" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nos Secteurs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experts dans tous les métiers du BTP
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre expertise couvre l'ensemble des corps de métiers du bâtiment et de l'industrie.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sectors.map((sector, index) => (
            <div
              key={sector.title}
              className="group relative bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border/50 overflow-hidden"
            >
              {/* Background Decoration */}
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
  );
};

export default SectorsSection;
