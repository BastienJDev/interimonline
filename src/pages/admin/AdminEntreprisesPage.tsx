import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Loader2,
  Building2,
  Mail,
  Phone,
  Calendar,
  Eye,
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
}

interface UserRole {
  role: string;
}

const AdminEntreprisesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [profileRoles, setProfileRoles] = useState<string[]>([]);

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

  const handleViewProfile = async (profile: Profile) => {
    setSelectedProfile(profile);
    
    // Fetch user roles
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", profile.user_id);
    
    setProfileRoles(roles?.map((r: UserRole) => r.role) || []);
    setIsDetailDialogOpen(true);
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
      (profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
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
          <p className="text-muted-foreground">Liste des utilisateurs entreprise de la plateforme</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un utilisateur..."
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
              <TableHead>Utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
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
                        {profile.first_name || profile.last_name
                          ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
                          : "Non renseigné"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {profile.email || "Non renseigné"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {profile.phone || "Non renseigné"}
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProfiles?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
          </DialogHeader>
          {selectedProfile && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedProfile.first_name || selectedProfile.last_name
                      ? `${selectedProfile.first_name || ""} ${selectedProfile.last_name || ""}`.trim()
                      : "Non renseigné"}
                  </h3>
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
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date d'inscription</p>
                    <p className="font-medium">
                      {format(new Date(selectedProfile.created_at), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEntreprisesPage;
