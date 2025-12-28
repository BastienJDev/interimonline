import { Building2, MapPin, Users, Calendar, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const clients = [
  {
    id: 1,
    nom: "Bouygues Construction",
    secteur: "BTP & Construction",
    ville: "Paris",
    logo: "BC",
    partenaire_depuis: "2018",
    interimaires_recrutes: 245,
    description: "Leader français de la construction et des travaux publics",
    specialites: ["Gros œuvre", "Génie civil", "Bâtiment"],
  },
  {
    id: 2,
    nom: "Vinci Énergies",
    secteur: "Énergie & Électricité",
    ville: "Rueil-Malmaison",
    logo: "VE",
    partenaire_depuis: "2019",
    interimaires_recrutes: 189,
    description: "Spécialiste des infrastructures énergétiques et électriques",
    specialites: ["Électricité industrielle", "Automatisme", "Maintenance"],
  },
  {
    id: 3,
    nom: "Eiffage Infrastructure",
    secteur: "Travaux Publics",
    ville: "Vélizy-Villacoublay",
    logo: "EI",
    partenaire_depuis: "2017",
    interimaires_recrutes: 312,
    description: "Expert en infrastructures de transport et d'énergie",
    specialites: ["Routes", "VRD", "Ouvrages d'art"],
  },
  {
    id: 4,
    nom: "Spie Batignolles",
    secteur: "Construction",
    ville: "Malakoff",
    logo: "SB",
    partenaire_depuis: "2020",
    interimaires_recrutes: 156,
    description: "Groupe de construction et de génie civil",
    specialites: ["Construction", "Rénovation", "Aménagement"],
  },
  {
    id: 5,
    nom: "Colas France",
    secteur: "Routes & Infrastructures",
    ville: "Paris",
    logo: "CF",
    partenaire_depuis: "2016",
    interimaires_recrutes: 423,
    description: "Leader mondial de la construction de routes",
    specialites: ["Enrobés", "Terrassement", "Signalisation"],
  },
  {
    id: 6,
    nom: "Engie Solutions",
    secteur: "Services énergétiques",
    ville: "La Défense",
    logo: "ES",
    partenaire_depuis: "2019",
    interimaires_recrutes: 178,
    description: "Solutions énergétiques et services techniques",
    specialites: ["CVC", "Plomberie", "Électricité"],
  },
  {
    id: 7,
    nom: "Fayat Bâtiment",
    secteur: "Bâtiment",
    ville: "Bordeaux",
    logo: "FB",
    partenaire_depuis: "2021",
    interimaires_recrutes: 89,
    description: "Construction et réhabilitation de bâtiments",
    specialites: ["Bâtiment neuf", "Réhabilitation", "Monuments historiques"],
  },
  {
    id: 8,
    nom: "NGE Fondations",
    secteur: "Géotechnique",
    ville: "Lyon",
    logo: "NF",
    partenaire_depuis: "2020",
    interimaires_recrutes: 112,
    description: "Spécialiste des fondations spéciales",
    specialites: ["Pieux", "Parois", "Renforcement de sols"],
  },
];

const NosClients = () => {
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
                Nos <span className="text-primary">Clients</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ils nous font confiance pour leurs recrutements. Découvrez nos entreprises partenaires.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clients.map((client) => (
              <Card key={client.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {client.logo}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      Partenaire
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {client.nom}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-3">{client.secteur}</p>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {client.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {client.ville}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Partenaire depuis {client.partenaire_depuis}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {client.interimaires_recrutes} intérimaires recrutés
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {client.specialites.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {client.specialites.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{client.specialites.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Vous souhaitez devenir partenaire ?
            </p>
            <Link to="/dashboard-entreprise">
              <Button variant="cta" size="lg">
                Rejoindre nos clients
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NosClients;
