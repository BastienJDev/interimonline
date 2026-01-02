import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Eye,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Briefcase,
  Calendar,
  Euro,
  Building2,
  User,
  Download,
  UserCheck
} from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Candidature {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  ville: string | null;
  adresse: string | null;
  poste: string;
  experience: string | null;
  disponibilite: string | null;
  cv_url: string | null;
  status: string;
  validated_at: string | null;
  rejection_reason: string | null;
  created_at: string;
}

interface CandidatureDocument {
  id: string;
  name: string;
  document_type: string | null;
  file_url: string | null;
}

interface Mission {
  id: string;
  titre: string;
  lieu: string;
  type_contrat: string;
  date_debut: string | null;
  date_fin: string | null;
  salaire_min: number | null;
  salaire_max: number | null;
  status: string;
}

const AdminCandidatsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidat, setSelectedCandidat] = useState<Candidature | null>(null);
  const [candidatDocuments, setCandidatDocuments] = useState<CandidatureDocument[]>([]);
  const [candidatMissions, setCandidatMissions] = useState<Mission[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [candidatToReject, setCandidatToReject] = useState<Candidature | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch candidatures
  const { data: candidatures, isLoading } = useQuery({
    queryKey: ['admin-candidatures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidatures')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Candidature[];
    },
  });

  // Validate candidature mutation
  const validateMutation = useMutation({
    mutationFn: async (candidatureId: string) => {
      const { error } = await supabase
        .from('candidatures')
        .update({
          status: 'valide',
          validated_by: user?.id,
          validated_at: new Date().toISOString(),
        })
        .eq('id', candidatureId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-candidatures'] });
      toast({
        title: "Candidature validée",
        description: "Le candidat a été validé avec succès",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de valider la candidature",
        variant: "destructive",
      });
      console.error('Validation error:', error);
    },
  });

  // Reject candidature mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ candidatureId, reason }: { candidatureId: string; reason: string }) => {
      const { error } = await supabase
        .from('candidatures')
        .update({
          status: 'rejete',
          validated_by: user?.id,
          validated_at: new Date().toISOString(),
          rejection_reason: reason,
        })
        .eq('id', candidatureId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-candidatures'] });
      toast({
        title: "Candidature rejetée",
        description: "Le candidat a été rejeté",
      });
      setIsDialogOpen(false);
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      setCandidatToReject(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter la candidature",
        variant: "destructive",
      });
      console.error('Rejection error:', error);
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_attente":
        return <Badge variant="outline" className="border-amber-500 text-amber-600"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case "valide":
        return <Badge variant="outline" className="border-green-500 text-green-600"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
      case "rejete":
        return <Badge variant="outline" className="border-red-500 text-red-600"><XCircle className="w-3 h-3 mr-1" />Rejeté</Badge>;
      case "accepte":
        return <Badge variant="outline" className="border-blue-500 text-blue-600"><CheckCircle className="w-3 h-3 mr-1" />Accepté</Badge>;
      default:
        return null;
    }
  };

  const handleViewCandidat = async (candidat: Candidature) => {
    setSelectedCandidat(candidat);
    setIsDialogOpen(true);
    
    // Fetch documents for this candidature
    const { data: docs } = await supabase
      .from('candidature_documents')
      .select('*')
      .eq('candidature_id', candidat.id);
    
    setCandidatDocuments(docs || []);

    // Fetch missions where this candidat was placed
    const { data: missions } = await supabase
      .from('offres')
      .select('id, titre, lieu, type_contrat, date_debut, date_fin, salaire_min, salaire_max, status')
      .eq('candidat_place_id', candidat.id)
      .order('date_debut', { ascending: false });
    
    setCandidatMissions(missions || []);
  };

  const handleValidate = (candidat: Candidature) => {
    validateMutation.mutate(candidat.id);
  };

  const handleReject = (candidat: Candidature) => {
    setCandidatToReject(candidat);
    setIsRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (candidatToReject) {
      rejectMutation.mutate({
        candidatureId: candidatToReject.id,
        reason: rejectionReason,
      });
    }
  };

  const filteredCandidats = candidatures?.filter(c => 
    `${c.prenom} ${c.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.poste.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR');
  };

  const handleExportPDF = async (exportType: 'full' | 'anonymous') => {
    if (!selectedCandidat) return;
    
    setIsExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-candidat-pdf', {
        body: {
          candidat: selectedCandidat,
          missions: candidatMissions,
          exportType
        }
      });

      if (error) throw error;

      // Import html2pdf dynamically
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Create a temporary container
      const container = document.createElement('div');
      container.innerHTML = data.html;
      document.body.appendChild(container);

      // Generate PDF
      await html2pdf()
        .set({
          margin: 0,
          filename: data.filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(container)
        .save();

      // Clean up
      document.body.removeChild(container);

      toast({
        title: "Export réussi",
        description: `Le PDF a été téléchargé`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
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
          <h1 className="text-2xl font-bold text-foreground">Gestion des candidats</h1>
          <p className="text-muted-foreground mt-1">Accès complet aux coordonnées et documents</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un candidat..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Candidates table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Candidat</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Contact</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Poste</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Date</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCandidats.map((candidat) => (
                <tr key={candidat.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {candidat.prenom[0]}{candidat.nom[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{candidat.prenom} {candidat.nom}</p>
                        <p className="text-xs text-muted-foreground">{candidat.ville}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{candidat.email}</span>
                      </div>
                      {candidat.telephone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-foreground">{candidat.telephone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{candidat.poste}</p>
                    <p className="text-xs text-muted-foreground">{candidat.experience}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(candidat.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(candidat.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewCandidat(candidat)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                      {candidat.status === "en_attente" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleValidate(candidat)}
                            disabled={validateMutation.isPending}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleReject(candidat)}
                            disabled={rejectMutation.isPending}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCandidats.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucun candidat trouvé
          </div>
        )}
      </div>

      {/* Candidate detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails du candidat</DialogTitle>
          </DialogHeader>
          {selectedCandidat && (
            <div className="space-y-6">
              {/* Header with avatar and status */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedCandidat.prenom[0]}{selectedCandidat.nom[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedCandidat.prenom} {selectedCandidat.nom}
                  </h3>
                  <p className="text-muted-foreground">{selectedCandidat.poste}</p>
                  <div className="mt-1">{getStatusBadge(selectedCandidat.status)}</div>
                </div>
              </div>

              {/* Grid with all information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coordonnées complètes */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Coordonnées
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCandidat.email}</span>
                    </div>
                    {selectedCandidat.telephone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedCandidat.telephone}</span>
                      </div>
                    )}
                    {selectedCandidat.ville && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedCandidat.ville}</span>
                      </div>
                    )}
                    {selectedCandidat.adresse && (
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>{selectedCandidat.adresse}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations professionnelles */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Informations professionnelles
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Poste recherché</span>
                      <span className="font-medium">{selectedCandidat.poste}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expérience</span>
                      <span className="font-medium">{selectedCandidat.experience || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disponibilité</span>
                      <span className="font-medium text-green-600">{selectedCandidat.disponibilite || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date de candidature</span>
                      <span className="font-medium">{formatDate(selectedCandidat.created_at)}</span>
                    </div>
                    {selectedCandidat.validated_at && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date de validation</span>
                        <span className="font-medium">{formatDate(selectedCandidat.validated_at)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rejection reason if rejected */}
              {selectedCandidat.status === 'rejete' && selectedCandidat.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-700 mb-2">Motif du rejet</h4>
                  <p className="text-sm text-red-600">{selectedCandidat.rejection_reason}</p>
                </div>
              )}

              {/* Documents */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Documents
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidat.cv_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedCandidat.cv_url} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        CV
                      </a>
                    </Button>
                  )}
                  {candidatDocuments.map((doc) => (
                    <Button key={doc.id} variant="outline" size="sm" asChild>
                      <a href={doc.file_url || '#'} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        {doc.name}
                      </a>
                    </Button>
                  ))}
                  {!selectedCandidat.cv_url && candidatDocuments.length === 0 && (
                    <p className="text-sm text-muted-foreground">Aucun document</p>
                  )}
                </div>
              </div>

              {/* Anciennes missions */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Missions réalisées
                </h4>
                {candidatMissions.length > 0 ? (
                  <div className="space-y-3">
                    {candidatMissions.map((mission) => (
                      <div 
                        key={mission.id} 
                        className="bg-background rounded-lg p-3 border border-border"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">{mission.titre}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{mission.lieu}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className={
                            mission.status === 'pourvue' 
                              ? 'border-green-500 text-green-600' 
                              : mission.status === 'terminee'
                              ? 'border-gray-500 text-gray-600'
                              : 'border-blue-500 text-blue-600'
                          }>
                            {mission.status === 'pourvue' ? 'Pourvue' : 
                             mission.status === 'terminee' ? 'Terminée' : 
                             mission.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Briefcase className="w-3 h-3" />
                            <span>{mission.type_contrat.toUpperCase()}</span>
                          </div>
                          {mission.date_debut && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {formatDate(mission.date_debut)}
                                {mission.date_fin && ` - ${formatDate(mission.date_fin)}`}
                              </span>
                            </div>
                          )}
                          {(mission.salaire_min || mission.salaire_max) && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Euro className="w-3 h-3" />
                              <span>
                                {mission.salaire_min && mission.salaire_max 
                                  ? `${mission.salaire_min}€ - ${mission.salaire_max}€/h`
                                  : mission.salaire_min 
                                  ? `${mission.salaire_min}€/h`
                                  : `${mission.salaire_max}€/h`
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune mission réalisée</p>
                )}
              </div>

              {/* Export buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleExportPDF('full')}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Export complet (interne)
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleExportPDF('anonymous')}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <UserCheck className="w-4 h-4 mr-2" />
                  )}
                  Export client (anonyme)
                </Button>
              </div>

              {/* Validation actions */}
              {selectedCandidat.status === "en_attente" && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    variant="cta" 
                    className="flex-1"
                    onClick={() => handleValidate(selectedCandidat)}
                    disabled={validateMutation.isPending}
                  >
                    {validateMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Valider le candidat
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => handleReject(selectedCandidat)}
                    disabled={rejectMutation.isPending}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject confirmation dialog */}
      <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeter cette candidature ?</AlertDialogTitle>
            <AlertDialogDescription>
              Veuillez indiquer le motif du rejet (optionnel).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Motif du rejet..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setRejectionReason("");
              setCandidatToReject(null);
            }}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Confirmer le rejet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCandidatsPage;
