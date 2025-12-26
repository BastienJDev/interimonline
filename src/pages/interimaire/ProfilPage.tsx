import { useState } from "react";
import InterimaireLayout from "./InterimaireLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Edit2,
  Plus,
  Trash2,
  Save
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfilPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profil, setProfil] = useState({
    nom: "Jean",
    prenom: "Dupont",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    adresse: "15 rue de la Paix",
    ville: "Paris",
    codePostal: "75001",
    metier: "Maçon",
    experience: "5 ans",
    disponibilite: "immediate",
    mobilite: "50km",
    presentation: "Maçon qualifié avec 5 ans d'expérience dans la construction neuve et la rénovation. Spécialisé dans les travaux de gros œuvre et la maçonnerie traditionnelle."
  });

  const experiences = [
    { id: 1, poste: "Maçon qualifié", entreprise: "BTP Construction", periode: "2020 - 2024", description: "Travaux de gros œuvre sur chantiers de construction neuve" },
    { id: 2, poste: "Aide maçon", entreprise: "Rénov Express", periode: "2018 - 2020", description: "Rénovation de bâtiments anciens" },
  ];

  const formations = [
    { id: 1, diplome: "CAP Maçon", etablissement: "CFA du Bâtiment", annee: "2018" },
    { id: 2, diplome: "CACES R482", etablissement: "Formation Pro", annee: "2021" },
  ];

  const documents = [
    { id: 1, nom: "CV", type: "pdf", status: "valide", date: "10/01/2025" },
    { id: 2, nom: "Carte d'identité", type: "pdf", status: "valide", date: "05/01/2025" },
    { id: 3, nom: "Permis de conduire", type: "pdf", status: "valide", date: "05/01/2025" },
    { id: 4, nom: "CACES R482", type: "pdf", status: "en_attente", date: "12/01/2025" },
    { id: 5, nom: "RIB", type: "pdf", status: "manquant", date: null },
  ];

  const competences = ["Maçonnerie traditionnelle", "Béton armé", "Lecture de plans", "Coffrage", "Ferraillage"];

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "valide":
        return <span className="flex items-center gap-1 text-xs font-medium text-green-600"><CheckCircle className="w-3 h-3" /> Validé</span>;
      case "en_attente":
        return <span className="flex items-center gap-1 text-xs font-medium text-yellow-600"><AlertCircle className="w-3 h-3" /> En attente</span>;
      case "manquant":
        return <span className="flex items-center gap-1 text-xs font-medium text-red-600"><AlertCircle className="w-3 h-3" /> Manquant</span>;
      default:
        return null;
    }
  };

  const completionPercentage = 70;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et professionnelles</p>
        </div>
        <Button 
          variant={isEditing ? "cta" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Modifier
            </>
          )}
        </Button>
      </div>

      {/* Completion Bar */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <p className="font-medium text-foreground">Complétion du profil</p>
          <span className="text-sm font-semibold text-primary">{completionPercentage}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Ajoutez votre RIB pour compléter votre profil à 100%
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <div className="bg-card rounded-xl shadow-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informations personnelles
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prénom</Label>
                <Input value={profil.prenom} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input value={profil.nom} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={profil.email} disabled={!isEditing} type="email" />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input value={profil.telephone} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input value={profil.adresse} disabled={!isEditing} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Code postal</Label>
                  <Input value={profil.codePostal} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input value={profil.ville} disabled={!isEditing} />
                </div>
              </div>
            </div>
          </div>

          {/* Informations professionnelles */}
          <div className="bg-card rounded-xl shadow-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Informations professionnelles
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Métier principal</Label>
                  <Input value={profil.metier} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Années d'expérience</Label>
                  <Input value={profil.experience} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Disponibilité</Label>
                  <Select disabled={!isEditing} value={profil.disponibilite}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immédiate</SelectItem>
                      <SelectItem value="1_semaine">1 semaine</SelectItem>
                      <SelectItem value="2_semaines">2 semaines</SelectItem>
                      <SelectItem value="1_mois">1 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Mobilité</Label>
                  <Select disabled={!isEditing} value={profil.mobilite}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10km">10 km</SelectItem>
                      <SelectItem value="25km">25 km</SelectItem>
                      <SelectItem value="50km">50 km</SelectItem>
                      <SelectItem value="national">National</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Présentation</Label>
                <Textarea 
                  value={profil.presentation} 
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Compétences</Label>
                <div className="flex flex-wrap gap-2">
                  {competences.map((comp, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg flex items-center gap-2">
                      {comp}
                      {isEditing && (
                        <button className="hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg flex items-center gap-1 hover:bg-muted/80">
                      <Plus className="w-3 h-3" /> Ajouter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Expériences */}
          <div className="bg-card rounded-xl shadow-card">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Expériences professionnelles
              </h2>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              )}
            </div>
            <div className="divide-y divide-border">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.poste}</h3>
                      <p className="text-sm text-primary">{exp.entreprise}</p>
                      <p className="text-xs text-muted-foreground mt-1">{exp.periode}</p>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div className="bg-card rounded-xl shadow-card">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Formations et certifications
              </h2>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              )}
            </div>
            <div className="divide-y divide-border">
              {formations.map((form) => (
                <div key={form.id} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{form.diplome}</h3>
                    <p className="text-sm text-muted-foreground">{form.etablissement} • {form.annee}</p>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Documents */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Mes documents
              </h2>
            </div>
            <div className="divide-y divide-border">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.status === 'valide' ? 'bg-green-50' : 
                      doc.status === 'en_attente' ? 'bg-yellow-50' : 'bg-red-50'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        doc.status === 'valide' ? 'text-green-600' : 
                        doc.status === 'en_attente' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{doc.nom}</p>
                      {doc.date && (
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDocumentStatus(doc.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Ajouter un document
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Télécharger mon CV
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Modifier mes préférences email
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer mon compte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
