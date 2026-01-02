import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Eye,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data avec coordonnées complètes (visibles uniquement par admin)
const mockCandidats = [
  { 
    id: 1, 
    prenom: "Jean", 
    nom: "Dupont",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    ville: "Paris 75012",
    adresse: "15 rue de la République, 75012 Paris",
    poste: "Maçon qualifié",
    experience: "5 ans",
    status: "en_attente",
    datePostulation: "15/01/2025",
    cv: "cv_jean_dupont.pdf",
    documents: ["Carte identité", "Permis B", "CACES"],
    disponibilite: "Immédiate"
  },
  { 
    id: 2, 
    prenom: "Pierre", 
    nom: "Martin",
    email: "pierre.martin@email.com",
    telephone: "06 98 76 54 32",
    ville: "Lyon 69003",
    adresse: "28 avenue Jean Jaurès, 69003 Lyon",
    poste: "Électricien industriel",
    experience: "8 ans",
    status: "valide",
    datePostulation: "14/01/2025",
    cv: "cv_pierre_martin.pdf",
    documents: ["Carte identité", "Habilitation électrique"],
    disponibilite: "Sous 1 semaine"
  },
  { 
    id: 3, 
    prenom: "Marc", 
    nom: "Leroy",
    email: "marc.leroy@email.com",
    telephone: "07 11 22 33 44",
    ville: "Marseille 13001",
    adresse: "5 boulevard Longchamp, 13001 Marseille",
    poste: "Soudeur TIG/MIG",
    experience: "3 ans",
    status: "rejete",
    datePostulation: "13/01/2025",
    cv: "cv_marc_leroy.pdf",
    documents: ["Carte identité"],
    disponibilite: "Immédiate"
  },
];

const AdminCandidatsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidat, setSelectedCandidat] = useState<typeof mockCandidats[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_attente":
        return <Badge variant="outline" className="border-amber-500 text-amber-600"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case "valide":
        return <Badge variant="outline" className="border-green-500 text-green-600"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
      case "rejete":
        return <Badge variant="outline" className="border-red-500 text-red-600"><XCircle className="w-3 h-3 mr-1" />Rejeté</Badge>;
      default:
        return null;
    }
  };

  const handleViewCandidat = (candidat: typeof mockCandidats[0]) => {
    setSelectedCandidat(candidat);
    setIsDialogOpen(true);
  };

  const filteredCandidats = mockCandidats.filter(c => 
    `${c.prenom} ${c.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.poste.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des candidats</h1>
          <p className="text-muted-foreground mt-1">Accès complet aux coordonnées et documents</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un candidat..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Candidates table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Candidat</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Contact</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Poste</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Documents</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCandidats.map((candidat) => (
                <tr key={candidat.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {candidat.prenom[0]}{candidat.nom[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{candidat.prenom} {candidat.nom}</p>
                        <p className="text-xs text-muted-foreground">{candidat.ville}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{candidat.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{candidat.telephone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{candidat.poste}</p>
                    <p className="text-xs text-muted-foreground">{candidat.experience}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(candidat.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{candidat.documents.length} docs</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewCandidat(candidat)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                      {candidat.status === "en_attente" && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du candidat</DialogTitle>
          </DialogHeader>
          {selectedCandidat && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedCandidat.prenom[0]}{selectedCandidat.nom[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedCandidat.prenom} {selectedCandidat.nom}
                  </h3>
                  <p className="text-muted-foreground">{selectedCandidat.poste}</p>
                  {getStatusBadge(selectedCandidat.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coordonnées complètes */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Coordonnées
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCandidat.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCandidat.telephone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>{selectedCandidat.adresse}</span>
                    </div>
                  </div>
                </div>

                {/* Informations */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Informations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expérience</span>
                      <span className="font-medium">{selectedCandidat.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disponibilité</span>
                      <span className="font-medium text-green-600">{selectedCandidat.disponibilite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date postulation</span>
                      <span className="font-medium">{selectedCandidat.datePostulation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Documents
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    CV
                  </Button>
                  {selectedCandidat.documents.map((doc, index) => (
                    <Button key={index} variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {doc}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {selectedCandidat.status === "en_attente" && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="cta" className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider le candidat
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCandidatsPage;
