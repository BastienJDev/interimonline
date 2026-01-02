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
import { toast } from "@/hooks/use-toast";
import {
  Search,
  Loader2,
  Building2,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit2,
  MapPin,
  Globe,
  Users,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  company_name: string | null;
  siret: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  website: string | null;
  description: string | null;
  sector: string | null;
  employees_count: string | null;
}

interface UserRole {
  role: string;
}

const AdminEntreprisesPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [profileRoles, setProfileRoles] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    company_name: "",
    siret: "",
    address: "",
    city: "",
    postal_code: "",
    website: "",
    description: "",
    sector: "",
    employees_count: "",
  });

  // Fetch all profiles
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Profile[];
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.first_name || null,
          last_name: data.last_name || null,
          phone: data.phone || null,
          company_name: data.company_name || null,
          siret: data.siret || null,
          address: data.address || null,
          city: data.city || null,
          postal_code: data.postal_code || null,
          website: data.website || null,
          description: data.description || null,
          sector: data.sector || null,
          employees_count: data.employees_count || null,
        })
        .eq("user_id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
      setIsEditDialogOpen(false);
      setSelectedProfile(null);
      toast({ title: "Profil mis à jour avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la mise à jour", variant: "destructive" });
    },
  });

  const handleViewProfile = async (profile: Profile) => {
    setSelectedProfile(profile);
    
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", profile.user_id);
    
    setProfileRoles(roles?.map((r: UserRole) => r.role) || []);
    setIsDetailDialogOpen(true);
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setFormData({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      phone: profile.phone || "",
      company_name: profile.company_name || "",
      siret: profile.siret || "",
      address: profile.address || "",
      city: profile.city || "",
      postal_code: profile.postal_code || "",
      website: profile.website || "",
      description: profile.description || "",
      sector: profile.sector || "",
      employees_count: profile.employees_count || "",
    });
    setIsEditDialogOpen(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-700">Admin</Badge>;
      case "moderator":
        return <Badge className="bg-purple-100 text-purple-700">Modérateur</Badge>;
      case "user":
        return <Badge className="bg-blue-100 text-blue-700">Utilisateur</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const filteredProfiles = profiles?.filter(
    (profile) =>
      (profile.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (profile.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (profile.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
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
          <h1 className="text-2xl font-bold text-foreground">Entreprises</h1>
          <p className="text-muted-foreground">Gérez les profils des entreprises</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une entreprise..."
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
              <TableHead>Entreprise</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles?.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {profile.company_name || "Entreprise non renseignée"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {profile.sector || "Secteur non défini"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{profile.email || "-"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{profile.phone || "-"}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {profile.city || "Non renseigné"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(profile.created_at), "dd MMM yyyy", { locale: fr })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(profile)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditProfile(profile)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProfiles?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucune entreprise trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Détails de l'entreprise</DialogTitle>
          </DialogHeader>
          {selectedProfile && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedProfile.company_name || "Entreprise non renseignée"}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedProfile.sector || "Secteur non défini"}</p>
                  <div className="flex gap-2 mt-1">
                    {profileRoles.map((role) => (
                      <span key={role}>{getRoleBadge(role)}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedProfile.email || "Non renseigné"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{selectedProfile.phone || "Non renseigné"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">
                      {selectedProfile.address ? `${selectedProfile.address}, ` : ""}
                      {selectedProfile.postal_code || ""} {selectedProfile.city || "Non renseigné"}
                    </p>
                  </div>
                </div>
                {selectedProfile.siret && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">SIRET</p>
                      <p className="font-medium">{selectedProfile.siret}</p>
                    </div>
                  </div>
                )}
                {selectedProfile.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Site web</p>
                      <a href={selectedProfile.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                        {selectedProfile.website}
                      </a>
                    </div>
                  </div>
                )}
                {selectedProfile.employees_count && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Effectif</p>
                      <p className="font-medium">{selectedProfile.employees_count} employés</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Inscription</p>
                    <p className="font-medium">
                      {format(new Date(selectedProfile.created_at), "dd MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>
              </div>

              {selectedProfile.description && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{selectedProfile.description}</p>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button onClick={() => {
                  setIsDetailDialogOpen(false);
                  handleEditProfile(selectedProfile);
                }}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le profil entreprise</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prénom du responsable</Label>
                <Input
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Nom du responsable</Label>
                <Input
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01 23 45 67 89"
              />
            </div>

            <div className="border-t pt-4 mt-2">
              <h3 className="font-medium mb-4">Informations entreprise</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'entreprise</Label>
                    <Input
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SIRET</Label>
                    <Input
                      value={formData.siret}
                      onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                      placeholder="123 456 789 00012"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Secteur d'activité</Label>
                    <Input
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      placeholder="BTP, Industrie..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre d'employés</Label>
                    <Input
                      value={formData.employees_count}
                      onChange={(e) => setFormData({ ...formData, employees_count: e.target.value })}
                      placeholder="10-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Site web</Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://www.exemple.fr"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-2">
              <h3 className="font-medium mb-4">Adresse</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 rue de l'Exemple"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      placeholder="75001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Paris"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description de l'entreprise</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Décrivez l'activité de l'entreprise..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  if (selectedProfile) {
                    updateMutation.mutate({ userId: selectedProfile.user_id, data: formData });
                  }
                }}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEntreprisesPage;
