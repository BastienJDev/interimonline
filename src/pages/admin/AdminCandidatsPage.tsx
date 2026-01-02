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
  X,
  Filter,
  History,
  Building2,
  Calendar,
  Star,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { metiers } from "@/components/MetierCombobox";

interface Candidat {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  metier: string | null;
  experience: string | null;
  competences: string | null;
  permis: string | null;
  deplacement: string | null;
  mobilite: string | null;
  approval_date: string | null;
  created_at: string;
  cv_url: string | null;
  mission_status: string | null;
}

interface MissionHistory {
  id: string;
  titre: string;
  entreprise_name: string;
  lieu: string | null;
  date_debut: string | null;
  date_fin: string | null;
  status: string;
  note: string | null;
  rating: number | null;
}

const AdminCandidatsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMetier, setFilterMetier] = useState<string>("");
  const [filterVille, setFilterVille] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [selectedCandidat, setSelectedCandidat] = useState<Candidat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch validated interimaires from profiles with their ratings
  const { data: candidats, isLoading } = useQuery({
    queryKey: ['admin-candidats-valides'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'interimaire')
        .eq('approval_status', 'approved')
        .order('approval_date', { ascending: false });
      
      if (error) throw error;

      // Fetch all ratings for these candidats
      const candidatIds = profiles.map(p => p.id);
      const { data: allMissions } = await supabase
        .from('mission_history')
        .select('candidat_id, rating')
        .in('candidat_id', candidatIds)
        .not('rating', 'is', null);

      // Calculate average ratings
      const ratingsMap: Record<string, { total: number; count: number }> = {};
      allMissions?.forEach(m => {
        if (!ratingsMap[m.candidat_id]) {
          ratingsMap[m.candidat_id] = { total: 0, count: 0 };
        }
        ratingsMap[m.candidat_id].total += m.rating!;
        ratingsMap[m.candidat_id].count += 1;
      });

      // Attach average rating to each candidat
      const candidatsWithRating = profiles.map(p => ({
        ...p,
        averageRating: ratingsMap[p.id] ? ratingsMap[p.id].total / ratingsMap[p.id].count : null,
        ratingCount: ratingsMap[p.id]?.count || 0,
      }));
      
      return candidatsWithRating as (Candidat & { averageRating: number | null; ratingCount: number })[];
    },
  });

  // Fetch mission history for selected candidat
  const { data: missionHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['mission-history', selectedCandidat?.id],
    queryFn: async () => {
      if (!selectedCandidat) return [];
      const { data, error } = await supabase
        .from('mission_history')
        .select('*')
        .eq('candidat_id', selectedCandidat.id)
        .order('date_debut', { ascending: false });
      
      if (error) throw error;
      return data as MissionHistory[];
    },
    enabled: !!selectedCandidat,
  });

  // Calculate average rating
  const averageRating = missionHistory && missionHistory.length > 0
    ? missionHistory.filter(m => m.rating !== null).reduce((acc, m) => acc + (m.rating || 0), 0) / 
      missionHistory.filter(m => m.rating !== null).length
    : null;

  const ratedMissionsCount = missionHistory?.filter(m => m.rating !== null).length || 0;

  // Get unique cities from candidats for filter suggestions
  const uniqueCities = [...new Set(candidats?.map(c => c.city || c.mobilite).filter(Boolean) || [])];

  const filteredCandidats = candidats?.filter(c => {
    // Text search
    const matchesSearch = !searchTerm || 
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Métier filter
    const matchesMetier = !filterMetier || c.metier === filterMetier;
    
    // Ville/Region filter
    const matchesVille = !filterVille || 
      c.city?.toLowerCase().includes(filterVille.toLowerCase()) ||
      c.mobilite?.toLowerCase().includes(filterVille.toLowerCase());
    
    // Status filter
    const matchesStatus = !filterStatus || c.mission_status === filterStatus;
    
    return matchesSearch && matchesMetier && matchesVille && matchesStatus;
  }) || [];

  const hasActiveFilters = filterMetier || filterVille || filterStatus;

  const clearFilters = () => {
    setFilterMetier("");
    setFilterVille("");
    setFilterStatus("");
  };

  const getMetierLabel = (value: string | null) => {
    if (!value) return '-';
    const metier = metiers.find(m => m.value === value);
    return metier ? metier.label : value;
  };

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

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filters row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Métier filter */}
            <Select value={filterMetier} onValueChange={setFilterMetier}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Tous les métiers" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="">Tous les métiers</SelectItem>
                {metiers.map((metier) => (
                  <SelectItem key={metier.value} value={metier.value}>
                    {metier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ville/Region filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Input
                placeholder="Ville ou région..."
                className="pl-10"
                value={filterVille}
                onChange={(e) => setFilterVille(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Tous les statuts" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="en_mission">En mission</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="gap-2">
                <X className="w-4 h-4" />
                Effacer les filtres
              </Button>
            )}
          </div>

          {/* Results count */}
          {(searchTerm || hasActiveFilters) && (
            <p className="text-sm text-muted-foreground">
              {filteredCandidats.length} résultat{filteredCandidats.length > 1 ? 's' : ''} trouvé{filteredCandidats.length > 1 ? 's' : ''}
            </p>
          )}
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
                  <TableHead>Note</TableHead>
                  <TableHead>Statut</TableHead>
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
                    <TableCell>{getMetierLabel(candidat.metier)}</TableCell>
                    <TableCell>
                      {candidat.averageRating !== null ? (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3.5 h-3.5 ${
                                star <= Math.round(candidat.averageRating!) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({candidat.ratingCount})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {candidat.mission_status === 'en_mission' ? (
                        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                          <Briefcase className="w-3 h-3 mr-1" />
                          En mission
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Disponible
                        </Badge>
                      )}
                    </TableCell>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Profil du candidat</DialogTitle>
            <DialogDescription>
              Informations complètes du candidat validé
            </DialogDescription>
          </DialogHeader>
          {selectedCandidat && (
            <Tabs defaultValue="profil" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profil">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </TabsTrigger>
                <TabsTrigger value="historique">
                  <History className="w-4 h-4 mr-2" />
                  Historique des missions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profil" className="space-y-6 mt-4">
                {/* Header with avatar and rating */}
                <div className="flex items-center justify-between">
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
                  
                  {/* Average Rating Display */}
                  {averageRating !== null && !isNaN(averageRating) && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-5 h-5 ${
                              star <= Math.round(averageRating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 font-semibold text-foreground">
                          {averageRating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ratedMissionsCount} avis
                      </p>
                    </div>
                  )}
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
              </TabsContent>

              <TabsContent value="historique" className="mt-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Missions effectuées
                  </h4>
                  
                  {isLoadingHistory ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : missionHistory && missionHistory.length > 0 ? (
                    <div className="space-y-3">
                      {missionHistory.map((mission) => (
                        <div 
                          key={mission.id} 
                          className="p-4 bg-muted/50 rounded-lg border border-border/50"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="font-medium text-foreground">{mission.titre}</h5>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Building2 className="w-4 h-4" />
                                <span>{mission.entreprise_name}</span>
                              </div>
                            </div>
                            <Badge 
                              className={
                                mission.status === 'terminee' 
                                  ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                  : mission.status === 'en_cours'
                                  ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                                  : 'bg-gray-500/10 text-gray-600 border-gray-500/20'
                              }
                            >
                              {mission.status === 'terminee' ? 'Terminée' : 
                               mission.status === 'en_cours' ? 'En cours' : mission.status}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                            {mission.lieu && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{mission.lieu}</span>
                              </div>
                            )}
                            {(mission.date_debut || mission.date_fin) && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {mission.date_debut ? format(new Date(mission.date_debut), 'dd/MM/yyyy', { locale: fr }) : '?'}
                                  {' → '}
                                  {mission.date_fin ? format(new Date(mission.date_fin), 'dd/MM/yyyy', { locale: fr }) : 'En cours'}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Rating display */}
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
                              <span className="text-sm text-muted-foreground ml-1">
                                Note de l'entreprise
                              </span>
                            </div>
                          )}
                          
                          {mission.note && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              {mission.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune mission enregistrée pour ce candidat</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCandidatsPage;
