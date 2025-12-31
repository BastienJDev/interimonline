import { useParams, Link } from "react-router-dom";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MessageSquare
} from "lucide-react";

// Mock data
const mockCandidat = {
  id: 1,
  nom: "Jean",
  prenom: "Dupont",
  email: "jean.dupont@email.com",
  telephone: "06 12 34 56 78",
  adresse: "15 rue de la Paix",
  ville: "Paris",
  codePostal: "75001",
  dateNaissance: "15/03/1988",
  permis: "B",
  vehicule: "Oui",
  disponibilite: "Immédiate",
  mobilite: "50 km",
  salaireAttendu: "15-17€/h",
  presentation: "Maçon qualifié avec plus de 5 ans d'expérience dans la construction neuve et la rénovation. Spécialisé dans les travaux de gros œuvre, je maîtrise les techniques de maçonnerie traditionnelle et moderne. Rigoureux et autonome, je suis capable de travailler en équipe comme en autonomie.",
  competences: ["Maçonnerie traditionnelle", "Béton armé", "Coffrage", "Ferraillage", "Lecture de plans", "Enduits"],
  langues: ["Français (natif)", "Portugais (courant)"],
  experiences: [
    {
      id: 1,
      poste: "Maçon qualifié",
      entreprise: "BTP Construction",
      lieu: "Paris",
      periode: "2020 - 2024",
      description: "Réalisation de travaux de gros œuvre sur chantiers de construction neuve. Maçonnerie traditionnelle, coffrage et béton armé."
    },
    {
      id: 2,
      poste: "Aide maçon",
      entreprise: "Rénov Express",
      lieu: "Versailles",
      periode: "2018 - 2020",
      description: "Assistance aux maçons qualifiés sur chantiers de rénovation. Préparation des matériaux et des surfaces."
    }
  ],
  formations: [
    { id: 1, diplome: "CAP Maçon", etablissement: "CFA du Bâtiment - Paris", annee: "2018" },
    { id: 2, diplome: "CACES R482 Cat. A", etablissement: "Formation Pro", annee: "2021" },
    { id: 3, diplome: "Habilitation travail en hauteur", etablissement: "Sécurité BTP", annee: "2022" }
  ],
  documents: [
    { id: 1, nom: "CV", type: "pdf", date: "10/01/2025" },
    { id: 2, nom: "Carte d'identité", type: "pdf", date: "05/01/2025" },
    { id: 3, nom: "Permis de conduire", type: "pdf", date: "05/01/2025" },
    { id: 4, nom: "CACES R482", type: "pdf", date: "12/01/2025" },
    { id: 5, nom: "Attestation travail en hauteur", type: "pdf", date: "12/01/2025" }
  ],
  candidature: {
    poste: "Maçon qualifié",
    datePostulation: "15/01/2025",
    status: "nouveau",
    offreId: 1
  }
};

const CandidatDetailPage = () => {
  const { id } = useParams();

  const getCandidatureStatus = (status: string) => {
    switch (status) {
      case "nouveau":
        return <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded-full"><Clock className="w-4 h-4" /> Nouveau</span>;
      case "en_cours":
        return <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full"><Clock className="w-4 h-4" /> En cours d'évaluation</span>;
      case "accepte":
        return <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 rounded-full"><CheckCircle className="w-4 h-4" /> Accepté</span>;
      case "rejete":
        return <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-red-100 text-red-700 rounded-full"><XCircle className="w-4 h-4" /> Rejeté</span>;
      default:
        return null;
    }
  };

  return (
    <OffresLayout title="Profil du candidat">
      <div className="space-y-6">
        {/* Back button */}
        <Link 
          to="/dashboard-entreprise/candidatures" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux candidatures
        </Link>

        {/* Header avec actions */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary">
                  {mockCandidat.prenom[0]}{mockCandidat.nom[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {mockCandidat.prenom} {mockCandidat.nom[0]}.
                </h1>
                <p className="text-muted-foreground mt-1">Candidature pour: {mockCandidat.candidature.poste}</p>
                <div className="flex items-center gap-3 mt-3">
                  {getCandidatureStatus(mockCandidat.candidature.status)}
                  <span className="text-sm text-muted-foreground">
                    Postulé le {mockCandidat.candidature.datePostulation}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Envoyer un message
              </Button>
              <Button variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <CheckCircle className="w-4 h-4 mr-2" />
                Accepter
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" />
                Refuser
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Colonne gauche - Infos */}
          <div className="space-y-6">
            {/* Coordonnées - Masquées pour les recruteurs */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Coordonnées</h2>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Les coordonnées du candidat seront disponibles après validation par notre équipe.
                </p>
              </div>
            </div>

            {/* Informations */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Informations</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Permis</span>
                  <span className="text-sm font-medium text-foreground">{mockCandidat.permis}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Véhicule</span>
                  <span className="text-sm font-medium text-foreground">{mockCandidat.vehicule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Disponibilité</span>
                  <span className="text-sm font-medium text-green-600">{mockCandidat.disponibilite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mobilité</span>
                  <span className="text-sm font-medium text-foreground">{mockCandidat.mobilite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Salaire attendu</span>
                  <span className="text-sm font-medium text-foreground">{mockCandidat.salaireAttendu}</span>
                </div>
              </div>
            </div>

            {/* Documents - Masqués pour les recruteurs */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Documents</h2>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Les documents du candidat seront disponibles après validation par notre équipe.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne principale */}
          <div className="xl:col-span-2 space-y-6">
            {/* Présentation */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Présentation</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{mockCandidat.presentation}</p>
            </div>

            {/* Compétences */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {mockCandidat.competences.map((comp, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg">
                    {comp}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-2">Langues</p>
                <div className="flex flex-wrap gap-2">
                  {mockCandidat.langues.map((langue, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg">
                      {langue}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expériences */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                Expériences professionnelles
              </h2>
              <div className="space-y-6">
                {mockCandidat.experiences.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-muted">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.poste}</h3>
                      <p className="text-sm text-primary">{exp.entreprise} • {exp.lieu}</p>
                      <p className="text-xs text-muted-foreground mt-1">{exp.periode}</p>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formations */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                Formations et certifications
              </h2>
              <div className="space-y-4">
                {mockCandidat.formations.map((form) => (
                  <div key={form.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{form.diplome}</h3>
                      <p className="text-sm text-muted-foreground">{form.etablissement} • {form.annee}</p>
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

export default CandidatDetailPage;
