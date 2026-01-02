import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import InterimaireLayout from "./InterimaireLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin,
  Euro,
  Clock,
  Building2,
  Filter,
  Briefcase,
  Heart,
  Loader2,
  CheckCircle,
  Send,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Offre {
  id: string;
  titre: string;
  description: string | null;
  lieu: string;
  type_contrat: string;
  salaire_min: number | null;
  salaire_max: number | null;
  experience_requise: string | null;
  horaires: string | null;
  avantages: string | null;
  date_debut: string | null;
  date_fin: string | null;
  created_at: string;
}

const types = ["Tous", "mission", "cdi", "cdd"];

const MissionsPage = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterLieu, setFilterLieu] = useState("");
  const [selectedMission, setSelectedMission] = useState<Offre | null>(null);
  const [isPostulerDialogOpen, setIsPostulerDialogOpen] = useState(false);
  const [favoris, setFavoris] = useState<string[]>([]);

  // Fetch active offres
  const { data: offres, isLoading } = useQuery({
    queryKey: ['offres-interimaire'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offres')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Offre[];
    },
  });

  // Fetch user's candidatures to check if already applied
  const { data: mesCandidatures } = useQuery({
    queryKey: ['mes-candidatures'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Get user's candidature ID from candidatures table
      const { data: candidature } = await supabase
        .from('candidatures')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!candidature) return [];

      const { data, error } = await supabase
        .from('offre_candidatures')
        .select('offre_id')
        .eq('candidat_id', candidature.id);
      
      if (error) return [];
      return data.map(c => c.offre_id);
    },
  });

  // Postuler mutation
  const postulerMutation = useMutation({
    mutationFn: async (offreId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      // Get user's candidature
      const { data: candidature, error: candError } = await supabase
        .from('candidatures')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (candError || !candidature) {
        throw new Error("Profil candidat non trouvé. Veuillez compléter votre profil.");
      }

      const { error } = await supabase
        .from('offre_candidatures')
        .insert({
          offre_id: offreId,
          candidat_id: candidature.id,
          type: 'candidature',
          admin_status: 'en_attente',
          entreprise_status: 'en_attente',
        });

      if (error) {
        if (error.code === '23505') {
          throw new Error("Vous avez déjà postulé à cette offre");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mes-candidatures'] });
      setIsPostulerDialogOpen(false);
      setSelectedMission(null);
      toast({ title: "Candidature envoyée !", description: "Votre candidature sera examinée par notre équipe." });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const toggleFavori = (id: string) => {
    setFavoris(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const hasApplied = (offreId: string) => {
    return mesCandidatures?.includes(offreId) || false;
  };

  const filteredMissions = offres?.filter((offre) => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offre.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "Tous" || offre.type_contrat === filterType;
    const matchesLieu = !filterLieu || offre.lieu.toLowerCase().includes(filterLieu.toLowerCase());
    return matchesSearch && matchesType && matchesLieu;
  }) || [];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "mission": return "Mission";
      case "cdi": return "CDI Intérimaire";
      case "cdd": return "CDD";
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <InterimaireLayout title="Rechercher des missions">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </InterimaireLayout>
    );
  }

  return (
    <InterimaireLayout title="Rechercher des missions">
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Offres disponibles</h1>
        <p className="text-muted-foreground">Trouvez la mission qui correspond à vos compétences</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Métier, compétence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative flex-1 lg:max-w-[200px]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ville ou code postal"
              value={filterLieu}
              onChange={(e) => setFilterLieu(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <Briefcase className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous">Tous les types</SelectItem>
              <SelectItem value="mission">Mission</SelectItem>
              <SelectItem value="cdi">CDI Intérimaire</SelectItem>
              <SelectItem value="cdd">CDD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredMissions.length}</span> offres disponibles
        </p>
      </div>

      {/* Missions List */}
      <div className="grid gap-4">
        {filteredMissions.map((offre) => (
          <div key={offre.id} className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{offre.titre}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {offre.description || "Pas de description"}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleFavori(offre.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${favoris.includes(offre.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                        />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" /> {offre.lieu}
                      </span>
                      {(offre.salaire_min || offre.salaire_max) && (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <Euro className="w-4 h-4 text-primary" /> {offre.salaire_min}-{offre.salaire_max}€/h
                        </span>
                      )}
                      {offre.experience_requise && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" /> {offre.experience_requise}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">{getTypeLabel(offre.type_contrat)}</Badge>
                      {hasApplied(offre.id) && (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Candidature envoyée
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                <p className="text-xs text-muted-foreground">
                  Publié le {format(new Date(offre.created_at), 'dd/MM/yyyy', { locale: fr })}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedMission(offre)}
                  >
                    Voir détails
                  </Button>
                  {!hasApplied(offre.id) && (
                    <Button 
                      variant="cta" 
                      size="sm"
                      onClick={() => {
                        setSelectedMission(offre);
                        setIsPostulerDialogOpen(true);
                      }}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Postuler
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl shadow-card">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Aucune offre disponible pour le moment</p>
        </div>
      )}

      {/* Mission Detail Dialog */}
      <Dialog open={!!selectedMission && !isPostulerDialogOpen} onOpenChange={() => setSelectedMission(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détail de l'offre</DialogTitle>
          </DialogHeader>
          {selectedMission && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedMission.titre}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline">{getTypeLabel(selectedMission.type_contrat)}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Salaire</p>
                  <p className="font-semibold text-foreground">
                    {selectedMission.salaire_min && selectedMission.salaire_max 
                      ? `${selectedMission.salaire_min}-${selectedMission.salaire_max}€/h`
                      : 'Non défini'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lieu</p>
                  <p className="font-semibold text-foreground">{selectedMission.lieu}</p>
                </div>
                {selectedMission.experience_requise && (
                  <div>
                    <p className="text-xs text-muted-foreground">Expérience</p>
                    <p className="font-semibold text-foreground">{selectedMission.experience_requise}</p>
                  </div>
                )}
                {selectedMission.horaires && (
                  <div>
                    <p className="text-xs text-muted-foreground">Horaires</p>
                    <p className="font-semibold text-foreground">{selectedMission.horaires}</p>
                  </div>
                )}
              </div>

              {selectedMission.description && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedMission.description}</p>
                </div>
              )}

              {selectedMission.avantages && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Avantages</h4>
                  <p className="text-sm text-muted-foreground">{selectedMission.avantages}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => toggleFavori(selectedMission.id)}>
                  <Heart className={`w-4 h-4 mr-2 ${favoris.includes(selectedMission.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {favoris.includes(selectedMission.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </Button>
                {!hasApplied(selectedMission.id) ? (
                  <Button 
                    variant="cta" 
                    className="flex-1"
                    onClick={() => setIsPostulerDialogOpen(true)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Postuler maintenant
                  </Button>
                ) : (
                  <Button variant="secondary" className="flex-1" disabled>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Candidature envoyée
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Postuler Confirmation Dialog */}
      <AlertDialog open={isPostulerDialogOpen} onOpenChange={setIsPostulerDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer votre candidature</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de postuler pour le poste de{' '}
              <strong>{selectedMission?.titre}</strong>.
              <br /><br />
              Votre candidature sera examinée par notre équipe avant d'être transmise à l'entreprise.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedMission && postulerMutation.mutate(selectedMission.id)}
              disabled={postulerMutation.isPending}
            >
              {postulerMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmer ma candidature
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </InterimaireLayout>
  );
};

export default MissionsPage;
