import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { 
  Search, 
  User, 
  FileText, 
  Briefcase,
  MapPin,
  Euro,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Building2,
  Calendar,
  X
} from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/dashboard-interimaire", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Rechercher missions", href: "/dashboard-interimaire/missions", icon: <Search className="w-5 h-5" /> },
  { label: "Mon profil", href: "/dashboard-interimaire/profil", icon: <User className="w-5 h-5" /> },
  { label: "Mes documents", href: "/dashboard-interimaire/documents", icon: <FileText className="w-5 h-5" /> },
];

const mockMissions = [
  { 
    id: 1, 
    titre: "Maçon qualifié", 
    entreprise: "BTP Construct", 
    lieu: "Paris 75", 
    salaire: "14-16€/h",
    type: "Mission",
    duree: "3 mois",
    date: "15/01/2025"
  },
  { 
    id: 2, 
    titre: "Électricien industriel", 
    entreprise: "Indus Pro", 
    lieu: "Lyon 69", 
    salaire: "15-18€/h",
    type: "CDI Intérimaire",
    duree: "Long terme",
    date: "14/01/2025"
  },
  { 
    id: 3, 
    titre: "Soudeur TIG", 
    entreprise: "Metal Works", 
    lieu: "Marseille 13", 
    salaire: "16-20€/h",
    type: "Mission",
    duree: "6 mois",
    date: "13/01/2025"
  },
];

const mockCandidatures = [
  { id: 1, poste: "Plombier chauffagiste", entreprise: "Confort Habitat", date: "12/01/2025", status: "en_attente" },
  { id: 2, poste: "Carreleur", entreprise: "Rénov Express", date: "10/01/2025", status: "accepte" },
  { id: 3, poste: "Peintre en bâtiment", entreprise: "Color Pro", date: "08/01/2025", status: "rejete" },
];

const DashboardInterimaire = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getCandidatureStatus = (status: string) => {
    switch (status) {
      case "en_attente":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full"><Clock className="w-3 h-3" /> En attente</span>;
      case "accepte":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full"><CheckCircle className="w-3 h-3" /> Acceptée</span>;
      case "rejete":
        return <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full"><XCircle className="w-3 h-3" /> Refusée</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} userType="interimaire" />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-foreground/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-card animate-fade-in">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <DashboardSidebar navItems={navItems} userType="interimaire" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Mon espace" 
          userName="Jean Dupont" 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />

        <main className="flex-1 p-6">
          {/* Profil completion alert */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Complétez votre profil</p>
                <p className="text-sm text-muted-foreground">Votre profil est complété à 70%. Ajoutez vos certifications pour augmenter vos chances.</p>
              </div>
            </div>
            <Button variant="cta" size="sm">
              Compléter
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Candidatures envoyées"
              value={8}
              icon={<FileText className="w-6 h-6 text-primary" />}
            />
            <StatsCard
              title="Entretiens prévus"
              value={2}
              icon={<Calendar className="w-6 h-6 text-primary" />}
            />
            <StatsCard
              title="Missions effectuées"
              value={12}
              icon={<Briefcase className="w-6 h-6 text-primary" />}
            />
            <StatsCard
              title="Profil consulté"
              value={34}
              icon={<User className="w-6 h-6 text-primary" />}
              trend={{ value: 15, isPositive: true }}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Missions recommandées */}
            <div className="xl:col-span-2 bg-card rounded-xl shadow-card">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Missions recommandées</h2>
                <Link to="/dashboard-interimaire/missions" className="text-sm font-medium text-primary hover:underline">
                  Voir tout
                </Link>
              </div>
              <div className="divide-y divide-border">
                {mockMissions.map((mission) => (
                  <div key={mission.id} className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{mission.titre}</h3>
                            <p className="text-sm text-muted-foreground">{mission.entreprise}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" /> {mission.lieu}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Euro className="w-3 h-3" /> {mission.salaire}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" /> {mission.duree}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                        <span className="px-2.5 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                          {mission.type}
                        </span>
                        <Button variant="outline" size="sm">
                          Postuler
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mes candidatures */}
              <div className="bg-card rounded-xl shadow-card">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">Mes candidatures</h2>
                </div>
                <div className="divide-y divide-border">
                  {mockCandidatures.map((candidature) => (
                    <div key={candidature.id} className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-foreground text-sm">{candidature.poste}</p>
                          <p className="text-xs text-muted-foreground">{candidature.entreprise}</p>
                        </div>
                        {getCandidatureStatus(candidature.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{candidature.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-card rounded-xl shadow-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Mes documents</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">CV</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Carte d'identité</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-foreground">Certifications</span>
                    </div>
                    <span className="text-xs text-yellow-600 font-medium">Manquant</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardInterimaire;
