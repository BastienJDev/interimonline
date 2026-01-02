import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Eye, 
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  FileText,
  MapPin,
  Briefcase,
  Loader2,
  User,
  Star,
  UserCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

interface Proposition {
  id: string;
  type: string;
  admin_status: string;
  entreprise_status: string;
  created_at: string;
  offre_id: string;
  candidat_id: string;
  offre: {
    id: string;
    titre: string;
    lieu: string;
    date_debut: string | null;
  };
  candidat: {
    id: string;
    prenom: string;
    nom: string;
    poste: string;
    experience: string | null;
    ville: string | null;
    cv_url: string | null;
  };
}

const CandidaturesPage = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProposition, setSelectedProposition] = useState<Proposition | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch propositions for this enterprise
  const { data: propositions, isLoading } = useQuery({
    queryKey: ['entreprise-propositions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { data, error } = await supabase
        .from('offre_candidatures')
        .select(`
          *,
          offre:offres!inner(id, titre, lieu, date_debut, created_by),
          candidat:candidatures(id, prenom, nom, poste, experience, ville, cv_url)
        `)
        .eq('admin_status', 'valide')
        .eq('offre.created_by', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as unknown as Proposition[];
    },
  });

  // Accept proposition mutation
  const acceptMutation = useMutation({
    mutationFn: async (proposition: Proposition) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get enterprise profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      // Update proposition status
      const { error: propError } = await supabase
        .from('offre_candidatures')
        .update({
          entreprise_status: 'accepte',
          entreprise_response_at: new Date().toISOString(),
        })
        .eq('id', proposition.id);
      
      if (propError) throw propError;

      // Update offre status to "pourvue" and set candidat_place_id
      const { error: offreError } = await supabase
        .from('offres')
        .update({
          status: 'pourvue',
          candidat_place_id: proposition.candidat_id,
        })
        .eq('id', proposition.offre_id);
      
      if (offreError) throw offreError;

      // Create mission history entry
      const { error: historyError } = await supabase
        .from('mission_history')
        .insert({
          candidat_id: proposition.candidat_id,
          offre_id: proposition.offre_id,
          titre: proposition.offre.titre,
          entreprise_name: profile?.company_name || 'Entreprise',
          lieu: proposition.offre.lieu,
          date_debut: proposition.offre.date_debut,
          status: 'en_cours',
        });
      
      if (historyError) throw historyError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entreprise-propositions'] });
      queryClient.invalidateQueries({ queryKey: ['entreprise-offres'] });
      setSelectedProposition(null);
      toast({ title: "Candidat accepté ! La mission commence." });
    },
    onError: () => {
      toast({ title: "Erreur lors de l'acceptation", variant: "destructive" });
    },
  });

  // Reject proposition mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ proposition, reason }: { proposition: Proposition; reason: string }) => {
      const { error } = await supabase
        .from('offre_candidatures')
        .update({
          entreprise_status: 'refuse',
          entreprise_response_at: new Date().toISOString(),
          entreprise_rejection_reason: reason || null,
        })
        .eq('id', proposition.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entreprise-propositions'] });
      setIsRejectDialogOpen(false);
      setSelectedProposition(null);
      setRejectReason("");
      toast({ title: "Candidat refusé" });
    },
    onError: () => {
      toast({ title: "Erreur lors du refus", variant: "destructive" });
    },
  });

  const formatCandidatName = (prenom: string, nom: string) => {
    return `${prenom} ${nom ? nom[0] + '.' : ''}`.trim();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_attente":
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="w-3 h-3 mr-1" /> En attente</Badge>;
      case "accepte":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Accepté</Badge>;
      case "refuse":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" /> Refusé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPropositions = propositions?.filter((p) => {
    const candidatName = `${p.candidat?.prenom || ''} ${p.candidat?.nom || ''}`.toLowerCase();
    const matchesSearch = candidatName.includes(searchQuery.toLowerCase()) ||
      p.offre?.titre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.entreprise_status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const stats = {
    total: propositions?.length || 0,
    en_attente: propositions?.filter(p => p.entreprise_status === "en_attente").length || 0,
    accepte: propositions?.filter(p => p.entreprise_status === "accepte").length || 0,
    refuse: propositions?.filter(p => p.entreprise_status === "refuse").length || 0,
  };

  if (isLoading) {
    return (
      <OffresLayout title="Candidatures">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </OffresLayout>
    );
  }

  return (
    <OffresLayout title="Candidatures">
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Candidats proposés</h1>
        <p className="text-muted-foreground">Consultez et validez les candidats proposés pour vos offres</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">En attente</p>
          <p className="text-2xl font-bold text-blue-600">{stats.en_attente}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Acceptés</p>
          <p className="text-2xl font-bold text-green-600">{stats.accepte}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Refusés</p>
          <p className="text-2xl font-bold text-red-600">{stats.refuse}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un candidat ou une offre..."
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
            <SelectItem value="en_attente">En attente</SelectItem>
            <SelectItem value="accepte">Accepté</SelectItem>
            <SelectItem value="refuse">Refusé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Propositions List */}
      {filteredPropositions.length > 0 ? (
        <div className="grid gap-4">
          {filteredPropositions.map((proposition) => (
            <div key={proposition.id} className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg text-foreground">
                        {proposition.candidat ? formatCandidatName(proposition.candidat.prenom, proposition.candidat.nom) : 'Candidat'}
                      </h3>
                      {getStatusBadge(proposition.entreprise_status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {proposition.candidat?.poste}
                      {proposition.candidat?.experience && ` • ${proposition.candidat.experience} d'expérience`}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
                        <Briefcase className="w-4 h-4" /> 
                        Pour: {proposition.offre?.titre}
                      </span>
                      {proposition.candidat?.ville && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" /> {proposition.candidat.ville}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Proposé le {format(new Date(proposition.created_at), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {proposition.candidat?.cv_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={proposition.candidat.cv_url} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        CV
                      </a>
                    </Button>
                  )}
                  
                  {proposition.entreprise_status === 'en_attente' && (
                    <>
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={() => acceptMutation.mutate(proposition)}
                        disabled={acceptMutation.isPending}
                      >
                        {acceptMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Accepter
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setSelectedProposition(proposition);
                          setIsRejectDialogOpen(true);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Refuser
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-12 shadow-card text-center">
          <UserCheck className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Aucun candidat proposé pour le moment</p>
          <p className="text-sm text-muted-foreground mt-1">
            Les candidats validés par notre équipe apparaîtront ici
          </p>
        </div>
      )}
    </div>

    {/* Reject Dialog */}
    <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Refuser ce candidat ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous pouvez indiquer une raison pour le refus (optionnel).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Textarea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Raison du refus (optionnel)..."
          rows={3}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setRejectReason("")}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              if (selectedProposition) {
                rejectMutation.mutate({ proposition: selectedProposition, reason: rejectReason });
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
    </OffresLayout>
  );
};

export default CandidaturesPage;
