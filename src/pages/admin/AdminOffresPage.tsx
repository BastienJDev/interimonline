import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
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
import { toast } from "@/hooks/use-toast";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  UserCheck,
  Loader2,
  MapPin,
  Euro,
  Clock,
  Briefcase,
} from "lucide-react";

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
  status: string;
  candidat_place_id: string | null;
  created_at: string;
}

interface Candidature {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  status: string;
}

const AdminOffresPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffre, setSelectedOffre] = useState<Offre | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPlaceDialogOpen, setIsPlaceDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCandidatId, setSelectedCandidatId] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    lieu: "",
    type_contrat: "mission",
    salaire_min: "",
    salaire_max: "",
    experience_requise: "",
    horaires: "",
    avantages: "",
    date_debut: "",
    date_fin: "",
    status: "active",
  });

  // Fetch offres
  const { data: offres, isLoading } = useQuery({
    queryKey: ["admin-offres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offres")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Offre[];
    },
  });

  // Fetch validated candidatures for placement
  const { data: candidatures } = useQuery({
    queryKey: ["validated-candidatures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("candidatures")
        .select("id, nom, prenom, poste, status")
        .eq("status", "valide");
      if (error) throw error;
      return data as Candidature[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("offres").insert({
        titre: data.titre,
        description: data.description || null,
        lieu: data.lieu,
        type_contrat: data.type_contrat,
        salaire_min: data.salaire_min ? parseFloat(data.salaire_min) : null,
        salaire_max: data.salaire_max ? parseFloat(data.salaire_max) : null,
        experience_requise: data.experience_requise || null,
        horaires: data.horaires || null,
        avantages: data.avantages || null,
        date_debut: data.date_debut || null,
        date_fin: data.date_fin || null,
        status: data.status,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offres"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({ title: "Offre créée avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("offres")
        .update({
          titre: data.titre,
          description: data.description || null,
          lieu: data.lieu,
          type_contrat: data.type_contrat,
          salaire_min: data.salaire_min ? parseFloat(data.salaire_min) : null,
          salaire_max: data.salaire_max ? parseFloat(data.salaire_max) : null,
          experience_requise: data.experience_requise || null,
          horaires: data.horaires || null,
          avantages: data.avantages || null,
          date_debut: data.date_debut || null,
          date_fin: data.date_fin || null,
          status: data.status,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offres"] });
      setIsEditDialogOpen(false);
      setSelectedOffre(null);
      resetForm();
      toast({ title: "Offre mise à jour avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la mise à jour", variant: "destructive" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("offres").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offres"] });
      setIsDeleteDialogOpen(false);
      setSelectedOffre(null);
      toast({ title: "Offre supprimée avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    },
  });

  // Place candidat mutation
  const placeMutation = useMutation({
    mutationFn: async ({ offreId, candidatId }: { offreId: string; candidatId: string }) => {
      const { error } = await supabase
        .from("offres")
        .update({
          candidat_place_id: candidatId,
          status: "pourvue",
        })
        .eq("id", offreId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offres"] });
      setIsPlaceDialogOpen(false);
      setSelectedOffre(null);
      setSelectedCandidatId("");
      toast({ title: "Candidat placé avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors du placement", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      titre: "",
      description: "",
      lieu: "",
      type_contrat: "mission",
      salaire_min: "",
      salaire_max: "",
      experience_requise: "",
      horaires: "",
      avantages: "",
      date_debut: "",
      date_fin: "",
      status: "active",
    });
  };

  const handleEdit = (offre: Offre) => {
    setSelectedOffre(offre);
    setFormData({
      titre: offre.titre,
      description: offre.description || "",
      lieu: offre.lieu,
      type_contrat: offre.type_contrat,
      salaire_min: offre.salaire_min?.toString() || "",
      salaire_max: offre.salaire_max?.toString() || "",
      experience_requise: offre.experience_requise || "",
      horaires: offre.horaires || "",
      avantages: offre.avantages || "",
      date_debut: offre.date_debut || "",
      date_fin: offre.date_fin || "",
      status: offre.status,
    });
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "pourvue":
        return <Badge variant="secondary">Pourvue</Badge>;
      case "en_pause":
        return <Badge className="bg-yellow-100 text-yellow-700">En pause</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredOffres = offres?.filter(
    (offre) =>
      offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.lieu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des offres</h1>
          <p className="text-muted-foreground">Créez, modifiez et gérez les offres d'emploi</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle offre
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une offre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Poste</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Salaire</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffres?.map((offre) => (
              <TableRow key={offre.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{offre.titre}</p>
                      <p className="text-sm text-muted-foreground">{offre.experience_requise}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {offre.lieu}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{offre.type_contrat}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Euro className="w-4 h-4" />
                    {offre.salaire_min && offre.salaire_max
                      ? `${offre.salaire_min}-${offre.salaire_max}€/h`
                      : "Non défini"}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(offre.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOffre(offre);
                        setIsPlaceDialogOpen(true);
                      }}
                      disabled={offre.status === "pourvue"}
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Placer
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(offre)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setSelectedOffre(offre);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedOffre(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Modifier l'offre" : "Créer une nouvelle offre"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="titre">Titre du poste *</Label>
              <Input
                id="titre"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                placeholder="Ex: Maçon qualifié"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lieu">Lieu *</Label>
                <Input
                  id="lieu"
                  value={formData.lieu}
                  onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                  placeholder="Ex: Paris 75"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type de contrat</Label>
                <Select
                  value={formData.type_contrat}
                  onValueChange={(value) => setFormData({ ...formData, type_contrat: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                  value={formData.salaire_min}
                  onChange={(e) => setFormData({ ...formData, salaire_min: e.target.value })}
                  placeholder="14"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salaire_max">Salaire max (€/h)</Label>
                <Input
                  id="salaire_max"
                  type="number"
                  value={formData.salaire_max}
                  onChange={(e) => setFormData({ ...formData, salaire_max: e.target.value })}
                  placeholder="18"
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
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="en_pause">En pause</SelectItem>
                    <SelectItem value="pourvue">Pourvue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date_debut">Date de début</Label>
                <Input
                  id="date_debut"
                  type="date"
                  value={formData.date_debut}
                  onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date_fin">Date de fin</Label>
                <Input
                  id="date_fin"
                  type="date"
                  value={formData.date_fin}
                  onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="horaires">Horaires</Label>
              <Input
                id="horaires"
                value={formData.horaires}
                onChange={(e) => setFormData({ ...formData, horaires: e.target.value })}
                placeholder="Ex: 7h-16h, du lundi au vendredi"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez les missions..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avantages">Avantages</Label>
              <Textarea
                id="avantages"
                value={formData.avantages}
                onChange={(e) => setFormData({ ...formData, avantages: e.target.value })}
                placeholder="Ex: Panier repas, mutuelle..."
                rows={2}
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  if (isEditDialogOpen && selectedOffre) {
                    updateMutation.mutate({ id: selectedOffre.id, data: formData });
                  } else {
                    createMutation.mutate(formData);
                  }
                }}
                disabled={!formData.titre || !formData.lieu || createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {isEditDialogOpen ? "Mettre à jour" : "Créer l'offre"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Place Candidat Dialog */}
      <Dialog open={isPlaceDialogOpen} onOpenChange={setIsPlaceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Placer un candidat sur l'offre</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Offre: <strong>{selectedOffre?.titre}</strong>
            </p>
            <div className="grid gap-2">
              <Label>Sélectionner un candidat validé</Label>
              <Select value={selectedCandidatId} onValueChange={setSelectedCandidatId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un candidat" />
                </SelectTrigger>
                <SelectContent>
                  {candidatures?.map((candidat) => (
                    <SelectItem key={candidat.id} value={candidat.id}>
                      {candidat.prenom} {candidat.nom} - {candidat.poste}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsPlaceDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  if (selectedOffre && selectedCandidatId) {
                    placeMutation.mutate({
                      offreId: selectedOffre.id,
                      candidatId: selectedCandidatId,
                    });
                  }
                }}
                disabled={!selectedCandidatId || placeMutation.isPending}
              >
                {placeMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Confirmer le placement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'offre ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'offre "{selectedOffre?.titre}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => selectedOffre && deleteMutation.mutate(selectedOffre.id)}
            >
              {deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminOffresPage;
