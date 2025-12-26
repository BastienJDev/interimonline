import { useState } from "react";
import { Link } from "react-router-dom";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit2, 
  Trash2,
  MapPin,
  Euro,
  Clock,
  Users,
  Filter,
  MoreVertical
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockOffres = [
  { 
    id: 1, 
    titre: "Maçon qualifié", 
    lieu: "Paris 75", 
    type: "CDI Intérimaire", 
    salaire: "14-16€/h",
    candidatures: 12, 
    status: "active", 
    date: "15/01/2025",
    description: "Nous recherchons un maçon qualifié pour des chantiers de construction neuve.",
    experience: "3-5 ans"
  },
  { 
    id: 2, 
    titre: "Électricien industriel", 
    lieu: "Lyon 69", 
    type: "Mission", 
    salaire: "15-18€/h",
    candidatures: 8, 
    status: "active", 
    date: "14/01/2025",
    description: "Mission de 6 mois pour installation électrique industrielle.",
    experience: "5+ ans"
  },
  { 
    id: 3, 
    titre: "Soudeur TIG/MIG", 
    lieu: "Marseille 13", 
    type: "Mission", 
    salaire: "16-20€/h",
    candidatures: 5, 
    status: "pourvue", 
    date: "10/01/2025",
    description: "Soudure sur structures métalliques.",
    experience: "3-5 ans"
  },
  { 
    id: 4, 
    titre: "Chef d'équipe BTP", 
    lieu: "Bordeaux 33", 
    type: "CDI Intérimaire", 
    salaire: "18-22€/h",
    candidatures: 15, 
    status: "active", 
    date: "12/01/2025",
    description: "Encadrement d'équipe sur chantier de rénovation.",
    experience: "5+ ans"
  },
  { 
    id: 5, 
    titre: "Plombier chauffagiste", 
    lieu: "Toulouse 31", 
    type: "Mission", 
    salaire: "14-17€/h",
    candidatures: 6, 
    status: "en_pause", 
    date: "08/01/2025",
    description: "Installation et maintenance de systèmes de chauffage.",
    experience: "2-3 ans"
  },
];

const OffresPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Active</span>;
      case "pourvue":
        return <span className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">Pourvue</span>;
      case "en_pause":
        return <span className="px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">En pause</span>;
      default:
        return null;
    }
  };

  const filteredOffres = mockOffres.filter((offre) => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offre.lieu.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || offre.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <OffresLayout title="Mes offres">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes offres d'emploi</h1>
          <p className="text-muted-foreground">Gérez vos offres et suivez les candidatures</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="cta" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle offre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle offre</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titre">Titre du poste</Label>
                <Input id="titre" placeholder="Ex: Maçon qualifié" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lieu">Lieu</Label>
                  <Input id="lieu" placeholder="Ex: Paris 75" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type de contrat</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mission">Mission</SelectItem>
                      <SelectItem value="cdi">CDI Intérimaire</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salaire">Salaire (€/h)</Label>
                  <Input id="salaire" placeholder="Ex: 14-16" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="experience">Expérience requise</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="1-2">1-2 ans</SelectItem>
                      <SelectItem value="2-3">2-3 ans</SelectItem>
                      <SelectItem value="3-5">3-5 ans</SelectItem>
                      <SelectItem value="5+">5+ ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description du poste</Label>
                <Textarea id="description" placeholder="Décrivez les missions et compétences requises..." rows={4} />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Annuler</Button>
                <Button variant="cta" onClick={() => setIsCreateDialogOpen(false)}>Publier l'offre</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une offre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pourvue">Pourvue</SelectItem>
            <SelectItem value="en_pause">En pause</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Offres Grid */}
      <div className="grid gap-4">
        {filteredOffres.map((offre) => (
          <div key={offre.id} className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg text-foreground">{offre.titre}</h3>
                      {getStatusBadge(offre.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{offre.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" /> {offre.lieu}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Euro className="w-4 h-4" /> {offre.salaire}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" /> {offre.experience}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                        {offre.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{offre.candidatures}</span>
                  <span className="text-sm text-muted-foreground">candidatures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/dashboard-entreprise/offres/${offre.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOffres.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune offre trouvée</p>
        </div>
      )}
    </div>
    </OffresLayout>
  );
};

export default OffresPage;
