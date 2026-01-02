import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Eye,
  Briefcase,
  User,
  MapPin,
  FileText,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CandidatureSpontanee {
  id: string;
  type: string;
  admin_status: string;
  created_at: string;
  offre: {
    id: string;
    titre: string;
    lieu: string;
  };
  candidat: {
    id: string;
    prenom: string;
    nom: string;
    poste: string;
    email: string;
    telephone: string | null;
    experience: string | null;
    cv_url: string | null;
  };
}

const AdminCandidaturesSpontaneesPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidature, setSelectedCandidature] = useState<CandidatureSpontanee | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch candidatures spontanées en attente
  const { data: candidatures, isLoading } = useQuery({
    queryKey: ['admin-candidatures-spontanees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offre_candidatures')
        .select(`
          *,
          offre:offres(id, titre, lieu),
          candidat:candidatures(id, prenom, nom, poste, email, telephone, experience, cv_url)
        `)
        .eq('type', 'candidature')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as unknown as CandidatureSpontanee[];
    },
  });

  // Valider candidature
  const validateMutation = useMutation({
    mutationFn: async (candidatureId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('offre_candidatures')
        .update({
          admin_status: 'valide',
          admin_validated_at: new Date().toISOString(),
          admin_validated_by: user?.id,
        })
        .eq('id', candidatureId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-candidatures-spontanees'] });
      setIsDetailDialogOpen(false);
      setSelectedCandidature(null);
      toast({ title: "Candidature validée et transmise à l'entreprise" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la validation", variant: "destructive" });
    },
  });

  // Refuser candidature
  const rejectMutation = useMutation({
    mutationFn: async ({ candidatureId, reason }: { candidatureId: string; reason: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('offre_candidatures')
        .update({
          admin_status: 'refuse',
          admin_validated_at: new Date().toISOString(),
          admin_validated_by: user?.id,
          admin_rejection_reason: reason || null,
        })
        .eq('id', candidatureId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-candidatures-spontanees'] });
      setIsRejectDialogOpen(false);
      setIsDetailDialogOpen(false);
      setSelectedCandidature(null);
      setRejectReason("");
      toast({ title: "Candidature refusée" });
    },
    onError: () => {
      toast({ title: "Erreur lors du refus", variant: "destructive" });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" /> En attente</Badge>;
      case "valide":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Validé</Badge>;
      case "refuse":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" /> Refusé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingCount = candidatures?.filter(c => c.admin_status === 'en_attente').length || 0;
  const validatedCount = candidatures?.filter(c => c.admin_status === 'valide').length || 0;

  const filteredCandidatures = candidatures?.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    return (
      c.candidat?.prenom?.toLowerCase().includes(searchLower) ||
      c.candidat?.nom?.toLowerCase().includes(searchLower) ||
      c.offre?.titre?.toLowerCase().includes(searchLower)
    );
  }) || [];

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
          <h1 className="text-2xl font-bold text-foreground">Candidatures spontanées</h1>
          <p className="text-muted-foreground mt-1">
            Validez les candidatures avant qu'elles soient visibles par les entreprises
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Validées</p>
                <p className="text-2xl font-bold text-green-600">{validatedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{candidatures?.length || 0}</p>
              </div>
              <Send className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou offre..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des candidatures</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCandidatures.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Send className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune candidature spontanée</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Offre</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidatures.map((candidature) => (
                  <TableRow key={candidature.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {candidature.candidat?.prenom} {candidature.candidat?.nom}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {candidature.candidat?.poste}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{candidature.offre?.titre}</p>
                          <p className="text-xs text-muted-foreground">{candidature.offre?.lieu}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(candidature.created_at), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell>{getStatusBadge(candidature.admin_status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCandidature(candidature);
                            setIsDetailDialogOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        {candidature.admin_status === 'en_attente' && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => validateMutation.mutate(candidature.id)}
                              disabled={validateMutation.isPending}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Valider
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedCandidature(candidature);
                                setIsRejectDialogOpen(true);
                              }}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Détail de la candidature</DialogTitle>
            <DialogDescription>
              Candidature spontanée pour une offre
            </DialogDescription>
          </DialogHeader>
          {selectedCandidature && (
            <div className="space-y-4">
              {/* Candidat info */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Candidat
                </h4>
                <p className="font-semibold text-lg">
                  {selectedCandidature.candidat?.prenom} {selectedCandidature.candidat?.nom}
                </p>
                <p className="text-sm text-muted-foreground">{selectedCandidature.candidat?.poste}</p>
                <p className="text-sm text-muted-foreground">{selectedCandidature.candidat?.email}</p>
                {selectedCandidature.candidat?.experience && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Expérience: {selectedCandidature.candidat.experience}
                  </p>
                )}
              </div>

              {/* Offre info */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Offre visée
                </h4>
                <p className="font-semibold">{selectedCandidature.offre?.titre}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedCandidature.offre?.lieu}
                </p>
              </div>

              {/* CV */}
              {selectedCandidature.candidat?.cv_url && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={selectedCandidature.candidat.cv_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Voir le CV
                  </a>
                </Button>
              )}

              {/* Actions */}
              {selectedCandidature.admin_status === 'en_attente' && (
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive"
                    onClick={() => setIsRejectDialogOpen(true)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Refuser
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => validateMutation.mutate(selectedCandidature.id)}
                    disabled={validateMutation.isPending}
                  >
                    {validateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Refuser cette candidature ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous pouvez indiquer une raison pour le refus (optionnel).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Raison du refus..."
            rows={3}
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRejectReason("")}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (selectedCandidature) {
                  rejectMutation.mutate({ candidatureId: selectedCandidature.id, reason: rejectReason });
                }
              }}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmer le refus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCandidaturesSpontaneesPage;
