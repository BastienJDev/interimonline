import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Calendar,
  Briefcase,
  Loader2,
  User,
  Star,
  StopCircle,
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
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

const OffreDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isEndMissionDialogOpen, setIsEndMissionDialogOpen] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [ratingNote, setRatingNote] = useState("");

  // Fetch offre details
  const { data: offre, isLoading: isLoadingOffre } = useQuery({
    queryKey: ['offre-detail', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offres')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch candidat placé (if offre is pourvue)
  const { data: candidatPlace } = useQuery({
    queryKey: ['candidat-place', offre?.candidat_place_id],
    queryFn: async () => {
      if (!offre?.candidat_place_id) return null;
      
      // Get candidature info
      const { data: candidature, error: candError } = await supabase
        .from('candidatures')
        .select('*')
        .eq('id', offre.candidat_place_id)
        .maybeSingle();
      
      if (candError) throw candError;
      return candidature;
    },
    enabled: !!offre?.candidat_place_id,
  });

  // Fetch mission history for this offre
  const { data: missionHistory } = useQuery({
    queryKey: ['mission-history-offre', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mission_history')
        .select('*')
        .eq('offre_id', id)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!id,
  });

  // End mission mutation
  const endMissionMutation = useMutation({
    mutationFn: async () => {
      if (!offre || !candidatPlace) return;

      // Create or update mission history entry
      const { error: historyError } = await supabase
        .from('mission_history')
        .upsert({
          id: missionHistory?.id,
          candidat_id: candidatPlace.id,
          offre_id: offre.id,
          titre: offre.titre,
          entreprise_name: 'Mon entreprise', // TODO: get from profile
          lieu: offre.lieu,
          date_debut: offre.date_debut,
          date_fin: new Date().toISOString().split('T')[0],
          status: 'terminee',
        });

      if (historyError) throw historyError;

      // Update offre status
      const { error: offreError } = await supabase
        .from('offres')
        .update({ status: 'terminee' })
        .eq('id', offre.id);

      if (offreError) throw offreError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offre-detail', id] });
      queryClient.invalidateQueries({ queryKey: ['mission-history-offre', id] });
      setIsEndMissionDialogOpen(false);
      setIsRatingDialogOpen(true);
    },
    onError: () => {
      toast({ title: "Erreur lors de la fin de mission", variant: "destructive" });
    },
  });

  // Rating mutation
  const rateMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('mission_history')
        .update({
          rating: selectedRating,
          note: ratingNote || null,
          rated_at: new Date().toISOString(),
          rated_by: user?.id,
        })
        .eq('offre_id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mission-history-offre', id] });
      setIsRatingDialogOpen(false);
      setSelectedRating(0);
      setRatingNote("");
      toast({ title: "Merci pour votre évaluation !" });
    },
    onError: () => {
      toast({ title: "Erreur lors de l'évaluation", variant: "destructive" });
    },
  });

  const formatCandidatName = (prenom: string | null, nom: string | null) => {
    if (!prenom && !nom) return "Intérimaire";
    return `${prenom || ''} ${nom ? nom[0] + '.' : ''}`.trim();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "pourvue":
        return <Badge className="bg-blue-100 text-blue-700">En cours</Badge>;
      case "terminee":
        return <Badge variant="secondary">Terminée</Badge>;
      case "en_pause":
        return <Badge className="bg-yellow-100 text-yellow-700">En pause</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoadingOffre) {
    return (
      <OffresLayout title="Détail de l'offre">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </OffresLayout>
    );
  }

  if (!offre) {
    return (
      <OffresLayout title="Détail de l'offre">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Offre non trouvée</p>
          <Link to="/dashboard-entreprise/offres">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux offres
            </Button>
          </Link>
        </div>
      </OffresLayout>
    );
  }

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
                  <h1 className="text-2xl font-bold text-foreground">{offre.titre}</h1>
                  {getStatusBadge(offre.status)}
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {offre.lieu}
                  </span>
                  {(offre.salaire_min || offre.salaire_max) && (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Euro className="w-4 h-4 text-primary" /> 
                      {offre.salaire_min}-{offre.salaire_max}€/h
                    </span>
                  )}
                  {offre.experience_requise && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" /> {offre.experience_requise}
                    </span>
                  )}
                  {offre.date_debut && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" /> 
                      Début: {format(new Date(offre.date_debut), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  )}
                </div>
                <Badge variant="outline" className="mt-3">
                  {offre.type_contrat}
                </Badge>
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

        {/* Intérimaire en mission - Shown when offre is pourvue */}
        {offre.status === 'pourvue' && candidatPlace && (
          <div className="bg-card rounded-xl p-6 shadow-card border-2 border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Intérimaire en mission</p>
                  <h3 className="text-xl font-semibold text-foreground">
                    {formatCandidatName(candidatPlace.prenom, candidatPlace.nom)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{candidatPlace.poste}</p>
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => setIsEndMissionDialogOpen(true)}
              >
                <StopCircle className="w-4 h-4 mr-2" />
                Mettre fin à la mission
              </Button>
            </div>
          </div>
        )}

        {/* Mission terminée - Shown when offre is terminee */}
        {offre.status === 'terminee' && missionHistory && (
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mission terminée</p>
                  {candidatPlace && (
                    <h3 className="text-lg font-semibold text-foreground">
                      {formatCandidatName(candidatPlace.prenom, candidatPlace.nom)}
                    </h3>
                  )}
                  {missionHistory.rating !== null && (
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= missionHistory.rating! 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        Votre note
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {missionHistory.rating === null && (
                <Button onClick={() => setIsRatingDialogOpen(true)}>
                  <Star className="w-4 h-4 mr-2" />
                  Noter l'intérimaire
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Détails de l'offre */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {offre.description || "Aucune description"}
              </p>
            </div>

            {offre.avantages && (
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h2 className="text-lg font-semibold text-foreground mb-4">Avantages</h2>
                <p className="text-sm text-muted-foreground">{offre.avantages}</p>
              </div>
            )}

            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Informations</h2>
              <div className="space-y-3">
                {offre.horaires && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Horaires</span>
                    <span className="text-sm font-medium text-foreground">{offre.horaires}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date de publication</span>
                  <span className="text-sm font-medium text-foreground">
                    {format(new Date(offre.created_at), 'dd/MM/yyyy', { locale: fr })}
                  </span>
                </div>
                {offre.date_debut && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date de début</span>
                    <span className="text-sm font-medium text-foreground">
                      {format(new Date(offre.date_debut), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
                {offre.date_fin && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date de fin approx.</span>
                    <span className="text-sm font-medium text-foreground">
                      {format(new Date(offre.date_fin), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Candidatures placeholder */}
          <div className="xl:col-span-2">
            <div className="bg-card rounded-xl shadow-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Candidatures
                </h2>
              </div>
              <div className="p-6 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Les candidatures seront affichées ici</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Mission Confirmation Dialog */}
      <AlertDialog open={isEndMissionDialogOpen} onOpenChange={setIsEndMissionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mettre fin à la mission ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir mettre fin à cette mission ? 
              Vous pourrez ensuite noter l'intérimaire.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => endMissionMutation.mutate()}
              disabled={endMissionMutation.isPending}
            >
              {endMissionMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Évaluer l'intérimaire</DialogTitle>
            <DialogDescription>
              {candidatPlace && (
                <>
                  Comment s'est passée la mission avec{' '}
                  <strong>{formatCandidatName(candidatPlace.prenom, candidatPlace.nom)}</strong> ?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Star Rating */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Cliquez sur les étoiles pour noter</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredStar || selectedRating)
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-lg font-semibold mt-2 text-foreground">
                {selectedRating > 0 ? `${selectedRating}/5` : 'Aucune note'}
              </p>
            </div>
            
            {/* Comment */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Commentaire (optionnel)
              </label>
              <Textarea
                value={ratingNote}
                onChange={(e) => setRatingNote(e.target.value)}
                placeholder="Décrivez votre expérience avec cet intérimaire..."
                rows={3}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
                Plus tard
              </Button>
              <Button 
                onClick={() => rateMutation.mutate()}
                disabled={selectedRating === 0 || rateMutation.isPending}
              >
                {rateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Valider
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </OffresLayout>
  );
};

export default OffreDetailPage;
