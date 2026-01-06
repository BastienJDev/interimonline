import { Star, MapPin, Briefcase, Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const interimaires = [
  {
    id: 1,
    nom: "Jean-Pierre Martin",
    metier: "Maçon qualifié",
    ville: "Paris",
    experience: "15 ans",
    note: 4.9,
    avis: 47,
    missions: 124,
    specialites: ["Maçonnerie traditionnelle", "Rénovation", "Béton armé"],
    disponible: true,
  },
  {
    id: 2,
    nom: "Ahmed Benali",
    metier: "Électricien industriel",
    ville: "Lyon",
    experience: "12 ans",
    note: 4.8,
    avis: 38,
    missions: 98,
    specialites: ["Haute tension", "Automatisme", "Maintenance"],
    disponible: true,
  },
  {
    id: 3,
    nom: "Patrick Durand",
    metier: "Plombier chauffagiste",
    ville: "Marseille",
    experience: "10 ans",
    note: 4.7,
    avis: 32,
    missions: 86,
    specialites: ["Chauffage", "Climatisation", "Plomberie sanitaire"],
    disponible: false,
  },
  {
    id: 4,
    nom: "Mohamed Kaddouri",
    metier: "Soudeur TIG/MIG",
    ville: "Lille",
    experience: "8 ans",
    note: 4.9,
    avis: 29,
    missions: 72,
    specialites: ["Soudure TIG", "Soudure MIG", "Inox"],
    disponible: true,
  },
  {
    id: 5,
    nom: "François Leroy",
    metier: "Chef de chantier",
    ville: "Bordeaux",
    experience: "20 ans",
    note: 5.0,
    avis: 56,
    missions: 145,
    specialites: ["Gros œuvre", "Management", "Planification"],
    disponible: true,
  },
  {
    id: 6,
    nom: "Karim Cherif",
    metier: "Carreleur",
    ville: "Toulouse",
    experience: "7 ans",
    note: 4.6,
    avis: 24,
    missions: 58,
    specialites: ["Pose carrelage", "Mosaïque", "Faïence"],
    disponible: true,
  },
  {
    id: 7,
    nom: "Stéphane Petit",
    metier: "Conducteur d'engins",
    ville: "Nantes",
    experience: "14 ans",
    note: 4.8,
    avis: 41,
    missions: 112,
    specialites: ["Pelle mécanique", "Chargeuse", "Niveleuse"],
    disponible: false,
  },
  {
    id: 8,
    nom: "David Moreau",
    metier: "Menuisier",
    ville: "Strasbourg",
    experience: "11 ans",
    note: 4.7,
    avis: 35,
    missions: 89,
    specialites: ["Menuiserie bois", "Agencement", "Pose de cuisine"],
    disponible: true,
  },
];

const NosInterimaires = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Nos <span className="text-primary">Intérimaires</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos professionnels qualifiés, évalués et recommandés par nos clients
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {interimaires.map((interimaire) => (
              <Card key={interimaire.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      <img src={logo} alt="Interim Online" className="w-10 h-10 object-contain" />
                    </div>
                    <Badge variant={interimaire.disponible ? "default" : "secondary"}>
                      {interimaire.disponible ? "Disponible" : "En mission"}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {interimaire.nom.split(' ').map((n, i, arr) => i === arr.length - 1 ? n[0] + '.' : n).join(' ')}
                  </h3>
                  <p className="text-primary font-medium mb-3">{interimaire.metier}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(interimaire.note)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-foreground ml-1">
                      {interimaire.note}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({interimaire.avis} avis)
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {interimaire.ville}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      {interimaire.experience} d'expérience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      {interimaire.missions} missions réalisées
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {interimaire.specialites.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {interimaire.specialites.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{interimaire.specialites.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Vous souhaitez accéder à tous nos profils qualifiés ?
            </p>
            <Link to="/dashboard-entreprise">
              <Button variant="cta" size="lg">
                Créer un compte recruteur
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NosInterimaires;
