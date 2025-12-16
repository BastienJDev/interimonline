import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Équipe de construction professionnelle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-85" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              +2000 missions pourvues chaque mois
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
            Trouvez les meilleurs{" "}
            <span className="text-gradient">talents BTP</span> en quelques clics
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-up animation-delay-200">
            Agence d'intérim spécialisée dans le bâtiment et l'industrie. 
            Recrutement rapide, candidats qualifiés, accompagnement personnalisé.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl">
              Je recrute
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Je cherche une mission
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 animate-fade-up animation-delay-400">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">+15 000 intérimaires</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">+500 entreprises partenaires</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">98% de satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
