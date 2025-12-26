import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  MapPin,
  Euro,
  Clock,
  Users,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Building2,
  Calendar,
  Briefcase
} from "lucide-react";

// Mock data - dans un vrai projet, cela viendrait de la base de données
const mockOffre = {
  id: 1,
  titre: "Maçon qualifié",
  lieu: "Paris 75",
  type: "CDI Intérimaire",
  salaire: "14-16€/h",
  status: "active",
  date: "15/01/2025",
  description: "Nous recherchons un maçon qualifié pour des chantiers de construction neuve. Vous serez responsable de la réalisation d'ouvrages en béton, briques et parpaings. Le poste requiert une bonne maîtrise des techniques de maçonnerie traditionnelle.",
  experience: "3-5 ans",
  competences: ["Maçonnerie traditionnelle", "Lecture de plans", "Béton armé", "Coffrage"],
  avantages: ["Panier repas", "Indemnité transport", "Mutuelle", "Prime de chantier"],
  horaires: "7h-16h du lundi au vendredi",
  dateDebut: "01/02/2025"
};

const mockCandidatures = [
  { 
    id: 1, 
    nom: "Jean Dupont", 
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    ville: "Paris 75",
    experience: "5 ans",
    disponibilite: "Immédiate",
    status: "nouveau",
    datePostulation: "15/01/2025",
    competences: ["Maçonnerie", "Coffrage", "Béton armé"]
  },
  { 
    id: 2, 
    nom: "Pierre Martin", 
    email: "pierre.martin@email.com",
    telephone: "06 23 45 67 89",
    ville: "Versailles 78",
    experience: "3 ans",
    disponibilite: "1 semaine",
    status: "en_cours",
    datePostulation: "14/01/2025",
    competences: ["Maçonnerie traditionnelle", "Lecture de plans"]
  },
  { 
    id: 3, 
    nom: "Marc Leroy", 
    email: "marc.leroy@email.com",
    telephone: "06 34 56 78 90",
    ville: "Créteil 94",
    experience: "7 ans",
    disponibilite: "Immédiate",
    status: "accepte",
    datePostulation: "13/01/2025",
    competences: ["Maçonnerie", "Coffrage", "Ferraillage", "Chef d'équipe"]
  },
  { 
    id: 4, 
    nom: "Lucas Bernard", 
    email: "lucas.bernard@email.com",
    telephone: "06 45 67 89 01",
    ville: "Nanterre 92",
    experience: "2 ans",
    disponibilite: "2 semaines",
    status: "rejete",
    datePostulation: "12/01/2025",
    competences: ["Aide maçon", "Manœuvre"]
  },
];

const OffreDetailPage = () => {
  const { id } = useParams();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 rounded-full">Active</span>;
      case "pourvue":
        return <span className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-full">Pourvue</span>;
      case "en_pause":
        return <span className="px-3 py-1.5 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">En pause</span>;
      default:
        return null;
    }
  };

  const getCandidatureStatus = (status: string) => {
    switch (status) {
      case "nouveau":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"><Clock className="w-3 h-3" /> Nouveau</span>;
      case "en_cours":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"><Clock className="w-3 h-3" /> En cours</span>;
      case "accepte":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full"><CheckCircle className="w-3 h-3" /> Accepté</span>;
      case "rejete":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full"><XCircle className="w-3 h-3" /> Rejeté</span>;
      default:
        return null;
    }
  };

  return (
    <OffresLayout title="Détail de l'offre">
      <div className="space-y-6">
        {/* Back button */}
        <Link 
          to="/dashboard-entreprise/offres" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux offres
        </Link>

        {/* Offre Header */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-foreground">{mockOffre.titre}</h1>
                  {getStatusBadge(mockOffre.status)}
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {mockOffre.lieu}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Euro className="w-4 h-4 text-primary" /> {mockOffre.salaire}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" /> {mockOffre.experience}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" /> Début: {mockOffre.dateDebut}
                  </span>
                </div>
                <span className="inline-block mt-3 px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full">
                  {mockOffre.type}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit2 className="w-4 h-4 mr-2" />
                Modifier
              </Button>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Détails de l'offre */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{mockOffre.description}</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Compétences requises</h2>
              <div className="flex flex-wrap gap-2">
                {mockOffre.competences.map((comp, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Avantages</h2>
              <div className="flex flex-wrap gap-2">
                {mockOffre.avantages.map((av, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm font-medium bg-green-50 text-green-700 rounded-lg">
                    ✓ {av}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Informations</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Horaires</span>
                  <span className="text-sm font-medium text-foreground">{mockOffre.horaires}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date de publication</span>
                  <span className="text-sm font-medium text-foreground">{mockOffre.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date de début</span>
                  <span className="text-sm font-medium text-foreground">{mockOffre.dateDebut}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Candidatures */}
          <div className="xl:col-span-2">
            <div className="bg-card rounded-xl shadow-card">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Candidatures ({mockCandidatures.length})
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-border">
                {mockCandidatures.map((candidat) => (
                  <div key={candidat.id} className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">
                            {candidat.nom.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-foreground">{candidat.nom}</h3>
                            {getCandidatureStatus(candidat.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <span className="text-sm text-muted-foreground">{candidat.ville}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{candidat.experience} d'exp.</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">Dispo: {candidat.disponibilite}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {candidat.competences.slice(0, 3).map((comp, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                        <p className="text-xs text-muted-foreground">Postulé le {candidat.datePostulation}</p>
                        <div className="flex gap-2">
                          <Link to={`/dashboard-entreprise/candidat/${candidat.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Voir profil
                            </Button>
                          </Link>
                          {(candidat.status === "nouveau" || candidat.status === "en_cours") && (
                            <>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-green-600 hover:text-green-700 hover:bg-green-50">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </OffresLayout>
  );
};

export default OffreDetailPage;
