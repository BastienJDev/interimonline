import { Briefcase, Users, Shield, CheckCircle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground mt-1">Gérez les candidats, offres et utilisateurs de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Candidats actifs"
          value={156}
          icon={<Users className="w-6 h-6 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Offres en cours"
          value={24}
          icon={<Briefcase className="w-6 h-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Entreprises"
          value={18}
          icon={<Shield className="w-6 h-6 text-primary" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Placements réussis"
          value={89}
          icon={<CheckCircle className="w-6 h-6 text-primary" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Candidatures en attente de validation</h2>
          <p className="text-muted-foreground">En tant qu'administrateur, vous avez accès complet aux coordonnées et documents des candidats.</p>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Actions rapides</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Valider les candidatures avant envoi aux entreprises</li>
            <li>• Gérer les accès utilisateurs</li>
            <li>• Consulter tous les documents candidats</li>
            <li>• Accéder aux coordonnées complètes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
