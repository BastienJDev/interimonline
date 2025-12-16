import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block bg-accent text-accent-foreground font-semibold text-sm px-4 py-2 rounded-full mb-6">
            Prêt à commencer ?
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Rejoignez la première agence d'intérim{" "}
            <span className="text-gradient">100% digitale</span> du BTP
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Inscription gratuite, sans engagement. Trouvez votre prochaine mission ou le talent qu'il vous faut en quelques clics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl">
              Créer mon compte entreprise
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              Je suis candidat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
