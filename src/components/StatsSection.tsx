const stats = [
  {
    value: "15 000+",
    label: "Intérimaires actifs",
    description: "dans notre base de données",
  },
  {
    value: "500+",
    label: "Entreprises partenaires",
    description: "nous font confiance",
  },
  {
    value: "2 000+",
    label: "Missions mensuelles",
    description: "pourvues avec succès",
  },
  {
    value: "98%",
    label: "Taux de satisfaction",
    description: "clients et intérimaires",
  },
];

const StatsSection = () => {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nos Chiffres
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            La confiance en chiffres
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Des résultats concrets qui témoignent de notre engagement quotidien.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-primary-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/60">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
