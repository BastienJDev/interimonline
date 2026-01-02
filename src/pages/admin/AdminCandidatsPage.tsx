import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Eye,
  Mail,
  Phone,
  Loader2,
  Briefcase,
  User,
  Clock,
  CheckCircle,
  Car,
  MapPin,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Candidat {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  metier: string | null;
  experience: string | null;
  competences: string | null;
  permis: string | null;
  deplacement: string | null;
  mobilite: string | null;
  approval_date: string | null;
  created_at: string;
  cv_url: string | null;
}

const AdminCandidatsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidat, setSelectedCandidat] = useState<Candidat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch validated interimaires from profiles
  const { data: candidats, isLoading } = useQuery({
    queryKey: ['admin-candidats-valides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'interimaire')
        .eq('approval_status', 'approved')
        .order('approval_date', { ascending: false });
      
      if (error) throw error;
      return data as Candidat[];
    },
  });

  const filteredCandidats = candidats?.filter(c => 
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.metier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return format(new Date(dateStr), 'dd MMM yyyy', { locale: fr });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Candidats validés</h1>
          <p className="text-muted-foreground mt-1">
            Liste des intérimaires dont l'inscription a été validée
          </p>
        </div>
        {candidats && candidats.length > 0 && (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1">
            {candidats.length} candidat{candidats.length > 1 ? 's' : ''} validé{candidats.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou métier..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Candidates table */}
      <Card>
        <CardHeader>
          <CardTitle>Intérimaires validés</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCandidats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun candidat validé trouvé
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Métier</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date de validation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidats.map((candidat) => (
                  <TableRow key={candidat.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {candidat.first_name?.[0] || ''}{candidat.last_name?.[0] || ''}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {candidat.first_name} {candidat.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{candidat.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidat.metier || '-'}</TableCell>
                    <TableCell>{candidat.phone || '-'}</TableCell>
                    <TableCell>{formatDate(candidat.approval_date)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCandidat(candidat);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Candidate detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Profil du candidat</DialogTitle>
            <DialogDescription>
              Informations complètes du candidat validé
            </DialogDescription>
          </DialogHeader>
          {selectedCandidat && (
            <div className="space-y-6">
              {/* Header with avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedCandidat.first_name} {selectedCandidat.last_name}
                  </h3>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Validé
                  </Badge>
                </div>
              </div>

              {/* Contact info */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground">Contact</h4>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{selectedCandidat.email}</span>
                  </div>
                  {selectedCandidat.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{selectedCandidat.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      Validé le{' '}
                      {selectedCandidat.approval_date 
                        ? format(new Date(selectedCandidat.approval_date), 'dd MMMM yyyy', { locale: fr })
                        : '-'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional info */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground">Expérience professionnelle</h4>
                <div className="grid gap-3">
                  {selectedCandidat.metier && (
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Métier principal</p>
                        <p className="text-muted-foreground">{selectedCandidat.metier}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidat.experience && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Années d'expérience</p>
                        <p className="text-muted-foreground">{selectedCandidat.experience}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidat.competences && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Compétences</p>
                        <p className="text-muted-foreground whitespace-pre-wrap">{selectedCandidat.competences}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobility info */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground">Mobilité</h4>
                <div className="grid gap-3">
                  {selectedCandidat.permis && (
                    <div className="flex items-start gap-2">
                      <Car className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Permis</p>
                        <p className="text-muted-foreground">{selectedCandidat.permis}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidat.deplacement && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Moyen de déplacement</p>
                        <p className="text-muted-foreground">{selectedCandidat.deplacement}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidat.mobilite && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Zone de mobilité</p>
                        <p className="text-muted-foreground">{selectedCandidat.mobilite}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CV */}
              {selectedCandidat.cv_url && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">Documents</h4>
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedCandidat.cv_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Voir le CV
                    </a>
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
