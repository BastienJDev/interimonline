import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { 
  Briefcase, 
  Users, 
  FileText, 
  BarChart3, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  X
} from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/dashboard-entreprise", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Mes offres", href: "/dashboard-entreprise/offres", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Candidatures", href: "/dashboard-entreprise/candidatures", icon: <Users className="w-5 h-5" /> },
  { label: "Mon profil", href: "/dashboard-entreprise/profil", icon: <FileText className="w-5 h-5" /> },
];

const mockOffres = [
  { id: 1, titre: "Maçon qualifié", lieu: "Paris 75", type: "CDI Intérimaire", candidatures: 12, status: "active", date: "15/01/2025" },
  { id: 2, titre: "Électricien industriel", lieu: "Lyon 69", type: "Mission", candidatures: 8, status: "active", date: "14/01/2025" },
  { id: 3, titre: "Soudeur TIG/MIG", lieu: "Marseille 13", type: "Mission", candidatures: 5, status: "pourvue", date: "10/01/2025" },
  { id: 4, titre: "Chef d'équipe BTP", lieu: "Bordeaux 33", type: "CDI Intérimaire", candidatures: 15, status: "active", date: "12/01/2025" },
];

const mockCandidatures = [
  { id: 1, nom: "Jean Dupont", poste: "Maçon qualifié", date: "15/01/2025", status: "nouveau" },
  { id: 2, nom: "Pierre Martin", poste: "Électricien industriel", date: "14/01/2025", status: "en_cours" },
  { id: 3, nom: "Marc Leroy", poste: "Maçon qualifié", date: "13/01/2025", status: "accepte" },
  { id: 4, nom: "Lucas Bernard", poste: "Chef d'équipe BTP", date: "12/01/2025", status: "rejete" },
];

const DashboardEntreprise = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Active</span>;
      case "pourvue":
        return <span className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">Pourvue</span>;
      default:
        return null;
    }
  };

  const getCandidatureStatus = (status: string) => {
    switch (status) {
      case "nouveau":
        return <span className="flex items-center gap-1 text-xs font-medium text-blue-600"><Clock className="w-3 h-3" /> Nouveau</span>;
      case "en_cours":
        return <span className="flex items-center gap-1 text-xs font-medium text-primary"><Clock className="w-3 h-3" /> En cours</span>;
      case "accepte":
        return <span className="flex items-center gap-1 text-xs font-medium text-green-600"><CheckCircle className="w-3 h-3" /> Accepté</span>;
      case "rejete":
        return <span className="flex items-center gap-1 text-xs font-medium text-red-600"><XCircle className="w-3 h-3" /> Rejeté</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} userType="entreprise" />

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
            <DashboardSidebar navItems={navItems} userType="entreprise" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Tableau de bord" 
          userName="BTP Construct" 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />

        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Offres actives"
              value={3}
              icon={<Briefcase className="w-6 h-6 text-primary" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Candidatures reçues"
              value={40}
              icon={<Users className="w-6 h-6 text-primary" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Postes pourvus"
              value={7}
              icon={<CheckCircle className="w-6 h-6 text-primary" />}
              trend={{ value: 3, isPositive: true }}
            />
            <StatsCard
              title="Taux de conversion"
              value="17%"
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              trend={{ value: 2, isPositive: true }}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Offres récentes */}
            <div className="bg-card rounded-xl shadow-card">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Mes offres récentes</h2>
                <Button variant="cta" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle offre
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Poste</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Lieu</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Candidatures</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Status</th>
                      <th className="text-right text-xs font-medium text-muted-foreground uppercase px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockOffres.map((offre) => (
                      <tr key={offre.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{offre.titre}</p>
                          <p className="text-xs text-muted-foreground">{offre.type}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{offre.lieu}</td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">{offre.candidatures}</span>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(offre.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Candidatures récentes */}
            <div className="bg-card rounded-xl shadow-card">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Candidatures récentes</h2>
                <Link to="/dashboard-entreprise/candidatures" className="text-sm font-medium text-primary hover:underline">
                  Voir tout
                </Link>
              </div>
              <div className="divide-y divide-border">
                {mockCandidatures.map((candidature) => (
                  <div key={candidature.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {candidature.nom.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{candidature.nom}</p>
                          <p className="text-sm text-muted-foreground">{candidature.poste}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getCandidatureStatus(candidature.status)}
                        <p className="text-xs text-muted-foreground mt-1">{candidature.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardEntreprise;
