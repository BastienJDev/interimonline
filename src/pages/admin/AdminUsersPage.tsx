import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Loader2,
  UserCheck,
  UserX,
  Eye,
  Briefcase,
  Car,
  MapPin,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  user_type: string | null;
  approval_status: string | null;
  approval_date: string | null;
  rejection_reason: string | null;
  created_at: string;
  metier: string | null;
  experience: string | null;
  competences: string | null;
  permis: string | null;
  deplacement: string | null;
  mobilite: string | null;
  cv_url: string | null;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_type', 'interimaire')
      .eq('approval_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les utilisateurs',
        variant: 'destructive',
      });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.first_name?.toLowerCase().includes(term) ||
          u.last_name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.metier?.toLowerCase().includes(term)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleApprove = async (userProfile: UserProfile) => {
    setIsProcessing(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        approval_status: 'approved',
        approval_date: new Date().toISOString(),
        approved_by: user?.id,
        rejection_reason: null,
      })
      .eq('id', userProfile.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de valider l\'utilisateur',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Utilisateur validé',
        description: `${userProfile.first_name} ${userProfile.last_name} peut maintenant accéder à son espace.`,
      });
      fetchUsers();
      setShowDetailDialog(false);
    }
    setIsProcessing(false);
  };

  const handleReject = async () => {
    if (!selectedUser) return;
    
    setIsProcessing(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        approval_status: 'rejected',
        approval_date: new Date().toISOString(),
        approved_by: user?.id,
        rejection_reason: rejectionReason,
      })
      .eq('id', selectedUser.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de refuser l\'utilisateur',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Utilisateur refusé',
        description: `${selectedUser.first_name} ${selectedUser.last_name} a été refusé.`,
      });
      fetchUsers();
      setShowRejectDialog(false);
      setShowDetailDialog(false);
      setRejectionReason('');
    }
    setIsProcessing(false);
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Validé
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Refusé
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        );
    }
  };

  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Validations</h1>
          <p className="text-muted-foreground">
            Validez les nouvelles inscriptions des intérimaires
          </p>
        </div>
        {users.length > 0 && (
          <Badge variant="destructive" className="text-sm px-3 py-1">
            {users.length} en attente de validation
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou métier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inscriptions en attente</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune inscription en attente
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Métier</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((userProfile) => (
                  <TableRow key={userProfile.id}>
                    <TableCell className="font-medium">
                      {userProfile.first_name} {userProfile.last_name}
                    </TableCell>
                    <TableCell>{userProfile.metier || '-'}</TableCell>
                    <TableCell>{userProfile.phone || '-'}</TableCell>
                    <TableCell>
                      {format(new Date(userProfile.created_at), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(userProfile);
                            setShowDetailDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(userProfile)}
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(userProfile);
                            setShowRejectDialog(true);
                          }}
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails du candidat</DialogTitle>
            <DialogDescription>
              Toutes les informations fournies lors de l'inscription
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* Header avec nom et statut */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h3>
                  {getStatusBadge(selectedUser.approval_status)}
                </div>
              </div>

              {/* Informations de contact */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground">Contact</h4>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{selectedUser.email}</span>
                  </div>
                  {selectedUser.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{selectedUser.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      Inscrit le{' '}
                      {format(new Date(selectedUser.created_at), 'dd MMMM yyyy à HH:mm', {
                        locale: fr,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expérience professionnelle */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground">Expérience professionnelle</h4>
                <div className="grid gap-3">
                  {selectedUser.metier && (
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Métier principal</p>
                        <p className="text-muted-foreground">{selectedUser.metier}</p>
                      </div>
                    </div>
                  )}
                  {selectedUser.experience && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Années d'expérience</p>
                        <p className="text-muted-foreground">{selectedUser.experience}</p>
                      </div>
                    </div>
                  )}
                  {selectedUser.competences && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Compétences</p>
                        <p className="text-muted-foreground whitespace-pre-wrap">{selectedUser.competences}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobilité */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground">Mobilité</h4>
                <div className="grid gap-3">
                  {selectedUser.permis && (
                    <div className="flex items-start gap-2">
                      <Car className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Permis</p>
                        <p className="text-muted-foreground">{selectedUser.permis}</p>
                      </div>
                    </div>
                  )}
                  {selectedUser.deplacement && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Moyen de déplacement</p>
                        <p className="text-muted-foreground">{selectedUser.deplacement}</p>
                      </div>
                    </div>
                  )}
                  {selectedUser.mobilite && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Zone de mobilité</p>
                        <p className="text-muted-foreground">{selectedUser.mobilite}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CV */}
              {selectedUser.cv_url && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">Documents</h4>
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedUser.cv_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Voir le CV
                    </a>
                  </Button>
                </div>
              )}

              {selectedUser.rejection_reason && (
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="text-sm font-medium text-destructive">Motif du refus :</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.rejection_reason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedUser?.approval_status === 'pending' && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setShowRejectDialog(true)}
                  disabled={isProcessing}
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Refuser
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => handleApprove(selectedUser)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <UserCheck className="w-4 h-4 mr-2" />
                  )}
                  Valider
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refuser l'inscription</DialogTitle>
            <DialogDescription>
              Indiquez le motif du refus. L'utilisateur pourra le consulter.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Motif du refus</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Expliquez pourquoi cette inscription est refusée..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason('');
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isProcessing || !rejectionReason.trim()}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <UserX className="w-4 h-4 mr-2" />
              )}
              Confirmer le refus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;
