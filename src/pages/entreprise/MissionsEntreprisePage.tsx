import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star,
  User,
  MapPin,
  Calendar,
  Loader2,
  CheckCircle,
  Clock,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

interface Mission {
  id: string;
  titre: string;
  entreprise_name: string;
  lieu: string | null;
  date_debut: string | null;
  date_fin: string | null;
  status: string;
  note: string | null;
  rating: number | null;
  candidat_id: string;
  offre_id: string | null;
}

interface CandidatInfo {
  id: string;
  first_name: string | null;
  last_name: string | null;
  metier: string | null;
}

const MissionsEntreprisePage = () => {
  const queryClient = useQueryClient();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingNote, setRatingNote] = useState("");
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  // Fetch missions for the enterprise (via offres they created)
  const { data: missions, isLoading } = useQuery({
    queryKey: ['entreprise-missions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      // Get missions linked to offres created by this user
      const { data, error } = await supabase
        .from('mission_history')
        .select(`
          *,
          offres!inner(created_by)
        `)
        .eq('offres.created_by', user.id)
        .order('date_fin', { ascending: false });
      
      if (error) throw error;
      return data as Mission[];
    },
  });

  // Fetch candidat info for selected mission
  const { data: candidatInfo } = useQuery({
    queryKey: ['candidat-info', selectedMission?.candidat_id],
    queryFn: async () => {
      if (!selectedMission) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, metier')
        .eq('id', selectedMission.candidat_id)
        .maybeSingle();
      
      if (error) throw error;
      return data as CandidatInfo | null;
    },
    enabled: !!selectedMission,
  });

  // Rating mutation
  const rateMutation = useMutation({
    mutationFn: async ({ missionId, rating, note }: { missionId: string; rating: number; note: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('mission_history')
        .update({
          rating,
          note: note || null,
          rated_at: new Date().toISOString(),
          rated_by: user?.id,
        })
        .eq('id', missionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entreprise-missions'] });
      setIsRatingDialogOpen(false);
      setSelectedMission(null);
      setSelectedRating(0);
      setRatingNote("");
      toast({ title: "Merci pour votre évaluation !" });
    },
    onError: () => {
      toast({ title: "Erreur lors de l'évaluation", variant: "destructive" });
    },
  });

  const openRatingDialog = (mission: Mission) => {
    setSelectedMission(mission);
    setSelectedRating(mission.rating || 0);
    setRatingNote(mission.note || "");
    setIsRatingDialogOpen(true);
  };

  const handleSubmitRating = () => {
    if (selectedMission && selectedRating > 0) {
      rateMutation.mutate({
        missionId: selectedMission.id,
        rating: selectedRating,
        note: ratingNote,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "terminee":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Terminée
          </Badge>
        );
      case "en_cours":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Clock className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <OffresLayout title="Mes missions">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </OffresLayout>
    );
  }

  return (
    <OffresLayout title="Mes missions">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes missions</h1>
          <p className="text-muted-foreground">Suivez vos missions et évaluez les intérimaires</p>
        </div>

        {missions && missions.length > 0 ? (
          <div className="grid gap-4">
            {missions.map((mission) => (
              <Card key={mission.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-lg text-foreground">{mission.titre}</h3>
                            {getStatusBadge(mission.status)}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            {mission.lieu && (
                              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" /> {mission.lieu}
                              </span>
                            )}
                            {(mission.date_debut || mission.date_fin) && (
                              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {mission.date_debut ? format(new Date(mission.date_debut), 'dd/MM/yyyy', { locale: fr }) : '?'}
                                {' → '}
                                {mission.date_fin ? format(new Date(mission.date_fin), 'dd/MM/yyyy', { locale: fr }) : 'En cours'}
                              </span>
                            )}
                          </div>
                          
                          {/* Rating display if already rated */}
                          {mission.rating !== null && (
                            <div className="flex items-center gap-1 mt-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${
                                    star <= mission.rating! 
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
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {mission.status === 'terminee' && (
                        <Button 
                          variant={mission.rating ? "outline" : "default"}
                          onClick={() => openRatingDialog(mission)}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          {mission.rating ? "Modifier la note" : "Noter l'intérimaire"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Aucune mission pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Évaluer l'intérimaire</DialogTitle>
            <DialogDescription>
              {selectedMission && (
                <>
                  Mission: <strong>{selectedMission.titre}</strong>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {candidatInfo && (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {candidatInfo.first_name} {candidatInfo.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{candidatInfo.metier}</p>
                </div>
              </div>
            )}
            
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
                Annuler
              </Button>
              <Button 
                onClick={handleSubmitRating}
                disabled={selectedRating === 0 || rateMutation.isPending}
              >
                {rateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Valider l'évaluation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </OffresLayout>
  );
};

export default MissionsEntreprisePage;
