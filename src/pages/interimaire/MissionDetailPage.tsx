import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import InterimaireLayout from "./InterimaireLayout";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  MapPin,
  Euro,
  Clock,
  Building2,
  Calendar,
  Heart,
  Send,
  CheckCircle,
  Users,
  Briefcase
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock data
const mockMission = {
  id: 1,
  titre: "Maçon qualifié",
  entreprise: "BTP Construct",
  lieu: "Paris 75",
  adresse: "45 avenue des Champs-Élysées, 75008 Paris",
  salaire: "14-16€/h",
  type: "CDI Intérimaire",
  duree: "3 mois",
  dateDebut: "01/02/2025",
  datePublication: "15/01/2025",
  horaires: "7h-16h du lundi au vendredi",
  description: `Nous recherchons un maçon qualifié pour des travaux de construction neuve sur un chantier situé dans le 8ème arrondissement de Paris.

Vous serez responsable de:
- La réalisation d'ouvrages en béton, briques et parpaings
- La mise en œuvre des coffrages et ferraillages
- Le coulage et le vibrage du béton
- La lecture et l'interprétation des plans
- Le respect des consignes de sécurité

Le chantier est un immeuble de bureaux de 6 étages. L'équipe est composée de 8 personnes encadrées par un chef de chantier expérimenté.`,
  competences: ["Maçonnerie traditionnelle", "Lecture de plans", "Béton armé", "Coffrage", "Ferraillage"],
  avantages: ["Panier repas 12€/jour", "Indemnité transport", "Mutuelle entreprise", "Prime de chantier", "EPI fournis"],
  profil: "Maçon avec minimum 3 ans d'expérience en gros œuvre. Vous êtes rigoureux, autonome et appréciez le travail en équipe. Le permis B est un plus pour vous rendre sur le chantier.",
  nombrePostes: 2,
  candidatures: 12,
  contact: {
    nom: "Marie Laurent",
    poste: "Chargée de recrutement",
    email: "recrutement@btpconstruct.fr",
    telephone: "01 40 34 10 45"
  }
};

const MissionDetailPage = () => {
  const { id } = useParams();
  const [isFavori, setIsFavori] = useState(false);
  const [showPostulerDialog, setShowPostulerDialog] = useState(false);
  const [hasPostule, setHasPostule] = useState(false);

  const handlePostuler = () => {
    setHasPostule(true);
    setShowPostulerDialog(false);
  };

  return (
    <InterimaireLayout title="Détail de la mission">
      <div className="space-y-6">
        {/* Back button */}
        <Link 
          to="/dashboard-interimaire/missions" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux missions
        </Link>

        {/* Header */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{mockMission.titre}</h1>
                <p className="text-lg text-muted-foreground">{mockMission.entreprise}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {mockMission.lieu}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Euro className="w-4 h-4 text-primary" /> {mockMission.salaire}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" /> {mockMission.duree}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" /> Début: {mockMission.dateDebut}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full">
                    {mockMission.type}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium bg-muted text-muted-foreground rounded-full">
                    <Users className="w-3 h-3 inline mr-1" />
                    {mockMission.nombrePostes} poste(s)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsFavori(!isFavori)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavori ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavori ? 'Favori' : 'Ajouter aux favoris'}
              </Button>
              {hasPostule ? (
                <Button variant="outline" disabled className="text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Candidature envoyée
                </Button>
              ) : (
                <Button variant="cta" onClick={() => setShowPostulerDialog(true)}>
                  <Send className="w-4 h-4 mr-2" />
                  Postuler maintenant
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="xl:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Description du poste</h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {mockMission.description}
                </p>
              </div>
            </div>

            {/* Profil recherché */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profil recherché</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{mockMission.profil}</p>
            </div>

            {/* Compétences */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Compétences requises</h2>
              <div className="flex flex-wrap gap-2">
                {mockMission.competences.map((comp, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Avantages */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Avantages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockMission.avantages.map((av, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-700">{av}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Informations */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Informations</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Localisation</p>
                  <p className="text-sm font-medium text-foreground">{mockMission.adresse}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Horaires</p>
                  <p className="text-sm font-medium text-foreground">{mockMission.horaires}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date de début</p>
                  <p className="text-sm font-medium text-foreground">{mockMission.dateDebut}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Durée</p>
                  <p className="text-sm font-medium text-foreground">{mockMission.duree}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Publiée le</p>
                  <p className="text-sm font-medium text-foreground">{mockMission.datePublication}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Contact</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">{mockMission.contact.nom}</p>
                  <p className="text-sm text-muted-foreground">{mockMission.contact.poste}</p>
                </div>
                <div className="pt-2 space-y-2">
                  <a 
                    href={`mailto:${mockMission.contact.email}`} 
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {mockMission.contact.email}
                  </a>
                  <a 
                    href={`tel:${mockMission.contact.telephone}`} 
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    {mockMission.contact.telephone}
                  </a>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Statistiques</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Candidatures</span>
                  <span className="text-sm font-semibold text-foreground">{mockMission.candidatures}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Postes disponibles</span>
                  <span className="text-sm font-semibold text-foreground">{mockMission.nombrePostes}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            {!hasPostule && (
              <Button 
                variant="cta" 
                className="w-full" 
                size="lg"
                onClick={() => setShowPostulerDialog(true)}
              >
                <Send className="w-4 h-4 mr-2" />
                Postuler à cette mission
              </Button>
            )}
          </div>
        </div>

        {/* Dialog de candidature */}
        <Dialog open={showPostulerDialog} onOpenChange={setShowPostulerDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Postuler à cette mission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{mockMission.titre}</p>
                    <p className="text-sm text-muted-foreground">{mockMission.entreprise}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message de motivation (optionnel)</Label>
                <Textarea 
                  placeholder="Présentez-vous brièvement et expliquez pourquoi vous êtes intéressé par cette mission..."
                  rows={5}
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Votre CV et vos documents seront automatiquement joints à votre candidature.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowPostulerDialog(false)}>
                  Annuler
                </Button>
                <Button variant="cta" className="flex-1" onClick={handlePostuler}>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer ma candidature
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </InterimaireLayout>
  );
};

export default MissionDetailPage;
