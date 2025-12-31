import { useState } from "react";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Eye, 
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockCandidatures = [
  { 
    id: 1, 
    nom: "Jean Dupont", 
    poste: "Maçon qualifié", 
    date: "15/01/2025", 
    status: "nouveau",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    ville: "Paris 75",
    experience: "5 ans",
    disponibilite: "Immédiate"
  },
  { 
    id: 2, 
    nom: "Pierre Martin", 
    poste: "Électricien industriel", 
    date: "14/01/2025", 
    status: "en_cours",
    email: "pierre.martin@email.com",
    telephone: "06 23 45 67 89",
    ville: "Lyon 69",
    experience: "3 ans",
    disponibilite: "2 semaines"
  },
  { 
    id: 3, 
    nom: "Marc Leroy", 
    poste: "Maçon qualifié", 
    date: "13/01/2025", 
    status: "accepte",
    email: "marc.leroy@email.com",
    telephone: "06 34 56 78 90",
    ville: "Marseille 13",
    experience: "7 ans",
    disponibilite: "Immédiate"
  },
  { 
    id: 4, 
    nom: "Lucas Bernard", 
    poste: "Chef d'équipe BTP", 
    date: "12/01/2025", 
    status: "rejete",
    email: "lucas.bernard@email.com",
    telephone: "06 45 67 89 01",
    ville: "Bordeaux 33",
    experience: "10 ans",
    disponibilite: "1 mois"
  },
  { 
    id: 5, 
    nom: "Antoine Moreau", 
    poste: "Électricien industriel", 
    date: "11/01/2025", 
    status: "nouveau",
    email: "antoine.moreau@email.com",
    telephone: "06 56 78 90 12",
    ville: "Toulouse 31",
    experience: "4 ans",
    disponibilite: "Immédiate"
  },
];

const CandidaturesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCandidat, setSelectedCandidat] = useState<typeof mockCandidatures[0] | null>(null);

  const getStatusBadge = (status: string) => {
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

  const filteredCandidatures = mockCandidatures.filter((c) => {
    const matchesSearch = c.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.poste.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockCandidatures.length,
    nouveau: mockCandidatures.filter(c => c.status === "nouveau").length,
    en_cours: mockCandidatures.filter(c => c.status === "en_cours").length,
    accepte: mockCandidatures.filter(c => c.status === "accepte").length,
  };

  return (
    <OffresLayout title="Candidatures">
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Candidatures reçues</h1>
        <p className="text-muted-foreground">Consultez et gérez les candidatures pour vos offres</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Nouvelles</p>
          <p className="text-2xl font-bold text-blue-600">{stats.nouveau}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">En cours</p>
          <p className="text-2xl font-bold text-primary">{stats.en_cours}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Acceptées</p>
          <p className="text-2xl font-bold text-green-600">{stats.accepte}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un candidat..."
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
            <SelectItem value="nouveau">Nouveau</SelectItem>
            <SelectItem value="en_cours">En cours</SelectItem>
            <SelectItem value="accepte">Accepté</SelectItem>
            <SelectItem value="rejete">Rejeté</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Candidatures List */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-4">Candidat</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-4">Poste</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-4">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-4">Statut</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCandidatures.map((candidature) => (
                <tr key={candidature.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {candidature.nom.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{candidature.nom.split(' ').map((n, i, arr) => i === arr.length - 1 ? n[0] + '.' : n).join(' ')}</p>
                        <p className="text-xs text-muted-foreground">{candidature.ville}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{candidature.poste}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{candidature.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(candidature.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCandidat(candidature)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir profil
                      </Button>
                      {candidature.status === "nouveau" || candidature.status === "en_cours" ? (
                        <>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-green-600 hover:text-green-700 hover:bg-green-50">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCandidatures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune candidature trouvée</p>
        </div>
      )}

      {/* Candidat Detail Dialog */}
      <Dialog open={!!selectedCandidat} onOpenChange={() => setSelectedCandidat(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Profil du candidat</DialogTitle>
          </DialogHeader>
          {selectedCandidat && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {selectedCandidat.nom.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedCandidat.nom.split(' ').map((n, i, arr) => i === arr.length - 1 ? n[0] + '.' : n).join(' ')}</h3>
                  <p className="text-muted-foreground">{selectedCandidat.poste}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidat.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidat.telephone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidat.ville}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Disponibilité: {selectedCandidat.disponibilite}</span>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Expérience</p>
                <p className="text-sm text-muted-foreground">{selectedCandidat.experience} d'expérience dans le domaine</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Voir CV
                </Button>
                <Button variant="cta" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </OffresLayout>
  );
};

export default CandidaturesPage;
