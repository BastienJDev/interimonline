import { useState } from "react";
import { Link } from "react-router-dom";
import InterimaireLayout from "./InterimaireLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin,
  Euro,
  Clock,
  Building2,
  Filter,
  Briefcase,
  Heart,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockMissions = [
  { 
    id: 1, 
    titre: "Maçon qualifié", 
    entreprise: "BTP Construct", 
    lieu: "Paris 75", 
    salaire: "14-16€/h",
    type: "Mission",
    duree: "3 mois",
    date: "15/01/2025",
    description: "Nous recherchons un maçon qualifié pour des travaux de construction neuve. Vous serez responsable de la réalisation d'ouvrages en béton, briques et parpaings.",
    competences: ["Maçonnerie traditionnelle", "Lecture de plans", "Béton armé"],
    avantages: ["Panier repas", "Indemnité transport", "Mutuelle"]
  },
  { 
    id: 2, 
    titre: "Électricien industriel", 
    entreprise: "Indus Pro", 
    lieu: "Lyon 69", 
    salaire: "15-18€/h",
    type: "CDI Intérimaire",
    duree: "Long terme",
    date: "14/01/2025",
    description: "Mission longue durée pour installation et maintenance électrique industrielle dans une usine de production.",
    competences: ["Habilitations électriques", "Câblage industriel", "Automatismes"],
    avantages: ["13ème mois", "Prime de performance", "Formation continue"]
  },
  { 
    id: 3, 
    titre: "Soudeur TIG", 
    entreprise: "Metal Works", 
    lieu: "Marseille 13", 
    salaire: "16-20€/h",
    type: "Mission",
    duree: "6 mois",
    date: "13/01/2025",
    description: "Soudure TIG sur acier inoxydable et aluminium pour la fabrication de structures métalliques.",
    competences: ["Soudure TIG", "Lecture de plans", "Contrôle qualité"],
    avantages: ["Prime qualité", "Équipement fourni", "Parking"]
  },
  { 
    id: 4, 
    titre: "Plombier chauffagiste", 
    entreprise: "Confort Habitat", 
    lieu: "Toulouse 31", 
    salaire: "14-17€/h",
    type: "Mission",
    duree: "2 mois",
    date: "12/01/2025",
    description: "Installation et maintenance de systèmes de chauffage central et plomberie sanitaire.",
    competences: ["Plomberie", "Chauffage", "Climatisation"],
    avantages: ["Véhicule de service", "Téléphone", "Outillage"]
  },
  { 
    id: 5, 
    titre: "Carreleur", 
    entreprise: "Rénov Express", 
    lieu: "Bordeaux 33", 
    salaire: "13-15€/h",
    type: "Mission",
    duree: "1 mois",
    date: "11/01/2025",
    description: "Pose de carrelage et faïence sur chantier de rénovation d'appartements.",
    competences: ["Pose carrelage", "Découpe", "Joints"],
    avantages: ["Panier repas", "IFM", "ICP"]
  },
  { 
    id: 6, 
    titre: "Chef d'équipe BTP", 
    entreprise: "Construction Plus", 
    lieu: "Nantes 44", 
    salaire: "18-22€/h",
    type: "CDI Intérimaire",
    duree: "Long terme",
    date: "10/01/2025",
    description: "Encadrement d'une équipe de 5 à 10 personnes sur chantiers de gros œuvre.",
    competences: ["Management", "Gestion de chantier", "Sécurité"],
    avantages: ["Véhicule", "Prime encadrement", "Intéressement"]
  },
];

const secteurs = ["Tous", "BTP", "Industrie", "Électricité", "Plomberie"];
const types = ["Tous", "Mission", "CDI Intérimaire", "CDD"];

const MissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSecteur, setFilterSecteur] = useState("Tous");
  const [filterType, setFilterType] = useState("Tous");
  const [filterLieu, setFilterLieu] = useState("");
  const [selectedMission, setSelectedMission] = useState<typeof mockMissions[0] | null>(null);
  const [favoris, setFavoris] = useState<number[]>([]);

  const toggleFavori = (id: number) => {
    setFavoris(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredMissions = mockMissions.filter((mission) => {
    const matchesSearch = mission.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.entreprise.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "Tous" || mission.type === filterType;
    const matchesLieu = !filterLieu || mission.lieu.toLowerCase().includes(filterLieu.toLowerCase());
    return matchesSearch && matchesType && matchesLieu;
  });

  return (
    <InterimaireLayout title="Rechercher des missions">
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rechercher des missions</h1>
        <p className="text-muted-foreground">Trouvez la mission qui correspond à vos compétences</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Métier, compétence, entreprise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative flex-1 lg:max-w-[200px]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ville ou code postal"
              value={filterLieu}
              onChange={(e) => setFilterLieu(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="cta" size="lg">
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <Briefcase className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterSecteur} onValueChange={setFilterSecteur}>
            <SelectTrigger className="w-[160px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Secteur" />
            </SelectTrigger>
            <SelectContent>
              {secteurs.map(secteur => (
                <SelectItem key={secteur} value={secteur}>{secteur}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredMissions.length}</span> missions trouvées
        </p>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Plus récentes</SelectItem>
            <SelectItem value="salaire">Salaire décroissant</SelectItem>
            <SelectItem value="pertinence">Pertinence</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Missions List */}
      <div className="grid gap-4">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{mission.titre}</h3>
                        <p className="text-muted-foreground">{mission.entreprise}</p>
                      </div>
                      <button 
                        onClick={() => toggleFavori(mission.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${favoris.includes(mission.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                        />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" /> {mission.lieu}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Euro className="w-4 h-4 text-primary" /> {mission.salaire}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" /> {mission.duree}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2.5 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                        {mission.type}
                      </span>
                      {mission.competences.slice(0, 2).map((comp, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                <p className="text-xs text-muted-foreground">Publié le {mission.date}</p>
                <div className="flex gap-2">
                  <Link to={`/dashboard-interimaire/missions/${mission.id}`}>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </Link>
                  <Link to={`/dashboard-interimaire/missions/${mission.id}`}>
                    <Button variant="cta" size="sm">
                      Postuler
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune mission trouvée</p>
        </div>
      )}

      {/* Mission Detail Dialog */}
      <Dialog open={!!selectedMission} onOpenChange={() => setSelectedMission(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détail de la mission</DialogTitle>
          </DialogHeader>
          {selectedMission && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedMission.titre}</h3>
                  <p className="text-muted-foreground">{selectedMission.entreprise}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-2.5 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                      {selectedMission.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{selectedMission.duree}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Salaire</p>
                  <p className="font-semibold text-foreground">{selectedMission.salaire}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Lieu</p>
                  <p className="font-semibold text-foreground">{selectedMission.lieu}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Durée</p>
                  <p className="font-semibold text-foreground">{selectedMission.duree}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedMission.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Compétences requises</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMission.competences.map((comp, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Avantages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMission.avantages.map((av, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm font-medium bg-green-50 text-green-700 rounded-lg">
                      ✓ {av}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => toggleFavori(selectedMission.id)}>
                  <Heart className={`w-4 h-4 mr-2 ${favoris.includes(selectedMission.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {favoris.includes(selectedMission.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </Button>
                <Button variant="cta" className="flex-1">
                  Postuler maintenant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </InterimaireLayout>
  );
};

export default MissionsPage;
