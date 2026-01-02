import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import OffresLayout from "./OffresLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Edit2,
  Save,
  Loader2,
  Globe,
  Users,
  Briefcase
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
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

const ProfilEntreprisePage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
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

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["entreprise-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!user?.id,
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
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
    }
  }, [profile]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!user?.id) throw new Error("User not found");
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
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entreprise-profile"] });
      setIsEditing(false);
      toast({ title: "Profil mis à jour avec succès" });
    },
    onError: () => {
      toast({ title: "Erreur lors de la mise à jour", variant: "destructive" });
    },
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <OffresLayout title="Mon profil">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </OffresLayout>
    );
  }

  return (
    <OffresLayout title="Mon profil">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profil entreprise</h1>
            <p className="text-muted-foreground">Gérez les informations de votre entreprise</p>
          </div>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : isEditing ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit2 className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "Enregistrer" : "Modifier"}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Informations de contact */}
            <div className="bg-card rounded-xl shadow-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Informations de contact
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prénom du responsable</Label>
                  <Input 
                    value={formData.first_name} 
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nom du responsable</Label>
                  <Input 
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={profile?.email || ""} 
                    disabled 
                    type="email" 
                  />
                  <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié</p>
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="01 23 45 67 89"
                  />
                </div>
              </div>
            </div>

            {/* Informations entreprise */}
            <div className="bg-card rounded-xl shadow-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Informations de l'entreprise
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'entreprise</Label>
                    <Input 
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Votre entreprise"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SIRET</Label>
                    <Input 
                      value={formData.siret}
                      onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                      disabled={!isEditing}
                      placeholder="123 456 789 00012"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secteur d'activité</Label>
                    <Input 
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      disabled={!isEditing}
                      placeholder="BTP, Industrie..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre d'employés</Label>
                    <Input 
                      value={formData.employees_count}
                      onChange={(e) => setFormData({ ...formData, employees_count: e.target.value })}
                      disabled={!isEditing}
                      placeholder="10-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Site web</Label>
                  <Input 
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://www.votresite.fr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description de l'entreprise</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Décrivez votre activité, vos valeurs..."
                  />
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div className="bg-card rounded-xl shadow-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Adresse
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    placeholder="123 rue de l'Exemple"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input 
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      disabled={!isEditing}
                      placeholder="75001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input 
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Paris"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Résumé du profil */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {formData.company_name || "Votre entreprise"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.sector || "Secteur non défini"}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{profile?.email || "Email non renseigné"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{formData.phone || "Téléphone non renseigné"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.city || "Ville non renseignée"}</span>
                </div>
                {formData.website && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Site web
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Votre activité</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Offres publiées</span>
                  </div>
                  <span className="font-semibold text-foreground">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Candidatures reçues</span>
                  </div>
                  <span className="font-semibold text-foreground">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Intérimaires placés</span>
                  </div>
                  <span className="font-semibold text-foreground">0</span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                Documents
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Ajoutez vos documents légaux (Kbis, attestation URSSAF...)
              </p>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Ajouter un document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OffresLayout>
  );
};

export default ProfilEntreprisePage;
