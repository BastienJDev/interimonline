import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit2, 
  Trash2,
  MapPin,
  Euro,
  Clock,
  Users,
  Filter,
  CalendarClock,
  Loader2,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const OffresPage = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    titre: "",
    lieu: "",
    type_contrat: "mission",
    salaire_min: "",
    salaire_max: "",
    experience_requise: "",
    date_debut: "",
    date_fin: "",
    horaires: "",
    description: "",
    avantages: "",
  });

  const resetForm = () => {
    setFormData({
      titre: "",
      lieu: "",
      type_contrat: "mission",
      salaire_min: "",
      salaire_max: "",
      experience_requise: "",
      date_debut: "",
      date_fin: "",
      horaires: "",
      description: "",
      avantages: "",
    });
  };

  // Fetch offres from Supabase
  const { data: offres, isLoading } = useQuery({
    queryKey: ['entreprise-offres'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { data, error } = await supabase
        .from('offres')
        .select(`
          *,
          candidat_place:candidatures(id, prenom, nom, poste)
        `)
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Create offre mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { error } = await supabase.from('offres').insert({
        titre: formData.titre,
        lieu: formData.lieu,
        type_contrat: formData.type_contrat,
        salaire_min: formData.salaire_min ? parseFloat(formData.salaire_min) : null,
        salaire_max: formData.salaire_max ? parseFloat(formData.salaire_max) : null,
        experience_requise: formData.experience_requise || null,
        date_debut: formData.date_debut || null,
        date_fin: formData.date_fin || null,
        horaires: formData.horaires || null,
        description: formData.description || null,
        avantages: formData.avantages || null,
        created_by: user.id,
        status: 'active',
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entreprise-offres'] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({ title: "Offre créée avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    },
  });

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

  const formatCandidatName = (prenom: string | null, nom: string | null) => {
    if (!prenom && !nom) return "Intérimaire";
    return `${prenom || ''} ${nom ? nom[0] + '.' : ''}`.trim();
  };

  const filteredOffres = offres?.filter((offre) => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offre.lieu.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || offre.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) {
    return (
      <OffresLayout title="Mes offres">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </OffresLayout>
    );
  }

  return (
    <OffresLayout title="Mes offres">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes offres d'emploi</h1>
          <p className="text-muted-foreground">Gérez vos offres et suivez les candidatures</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="cta" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle offre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle offre</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titre">Titre du poste *</Label>
                <Input 
                  id="titre" 
                  placeholder="Ex: Maçon qualifié"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lieu">Lieu *</Label>
                  <Input 
                    id="lieu" 
                    placeholder="Ex: Paris 75"
                    value={formData.lieu}
                    onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type de contrat</Label>
                  <Select 
                    value={formData.type_contrat}
                    onValueChange={(value) => setFormData({ ...formData, type_contrat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mission">Mission</SelectItem>
                      <SelectItem value="cdi">CDI Intérimaire</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salaire_min">Salaire min (€/h)</Label>
                  <Input 
                    id="salaire_min" 
                    type="number"
                    placeholder="14"
                    value={formData.salaire_min}
                    onChange={(e) => setFormData({ ...formData, salaire_min: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salaire_max">Salaire max (€/h)</Label>
                  <Input 
                    id="salaire_max" 
                    type="number"
                    placeholder="18"
                    value={formData.salaire_max}
                    onChange={(e) => setFormData({ ...formData, salaire_max: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="experience">Expérience requise</Label>
                  <Select
                    value={formData.experience_requise}
                    onValueChange={(value) => setFormData({ ...formData, experience_requise: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="1-2 ans">1-2 ans</SelectItem>
                      <SelectItem value="2-3 ans">2-3 ans</SelectItem>
                      <SelectItem value="3-5 ans">3-5 ans</SelectItem>
                      <SelectItem value="5+ ans">5+ ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="horaires">Horaires</Label>
                  <Input 
                    id="horaires" 
                    placeholder="7h-16h"
                    value={formData.horaires}
                    onChange={(e) => setFormData({ ...formData, horaires: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dateDebut">Date de début</Label>
                  <Input 
                    id="dateDebut" 
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dateFin">Date de fin approximative</Label>
                  <Input 
                    id="dateFin" 
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description du poste</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez les missions et compétences requises..." 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avantages">Avantages</Label>
                <Textarea 
                  id="avantages" 
                  placeholder="Ex: Panier repas, indemnités de déplacement, primes..." 
                  rows={2}
                  value={formData.avantages}
                  onChange={(e) => setFormData({ ...formData, avantages: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  variant="cta" 
                  onClick={() => createMutation.mutate()}
                  disabled={!formData.titre || !formData.lieu || createMutation.isPending}
                >
                  {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Publier l'offre
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une offre..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pourvue">En cours</SelectItem>
            <SelectItem value="terminee">Terminée</SelectItem>
            <SelectItem value="en_pause">En pause</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Offres Grid */}
      <div className="grid gap-4">
        {filteredOffres.map((offre) => (
          <div key={offre.id} className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg text-foreground">{offre.titre}</h3>
                      {getStatusBadge(offre.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {offre.description || "Aucune description"}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" /> {offre.lieu}
                      </span>
                      {(offre.salaire_min || offre.salaire_max) && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Euro className="w-4 h-4" /> {offre.salaire_min}-{offre.salaire_max}€/h
                        </span>
                      )}
                      {offre.experience_requise && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" /> {offre.experience_requise}
                        </span>
                      )}
                      {offre.date_fin && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarClock className="w-4 h-4" /> 
                          Fin: {format(new Date(offre.date_fin), 'dd/MM/yyyy', { locale: fr })}
                        </span>
                      )}
                      <Badge variant="outline">{offre.type_contrat}</Badge>
                    </div>
                    
                    {/* Show assigned candidat for "pourvue" status */}
                    {(offre.status === 'pourvue' || offre.status === 'terminee') && offre.candidat_place && (
                      <div className="flex items-center gap-2 mt-3 p-2 bg-muted/50 rounded-lg w-fit">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {formatCandidatName(offre.candidat_place.prenom, offre.candidat_place.nom)}
                        </span>
                        {offre.status === 'terminee' && (
                          <Badge variant="secondary" className="ml-2">Terminée</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/dashboard-entreprise/offres/${offre.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOffres.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Aucune offre trouvée</p>
          <p className="text-sm text-muted-foreground mt-1">Créez votre première offre pour commencer</p>
        </div>
      )}
    </div>
    </OffresLayout>
  );
};

export default OffresPage;
