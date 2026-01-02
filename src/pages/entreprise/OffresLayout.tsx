import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Briefcase, Users, FileText, BarChart3, X } from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/dashboard-entreprise", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Mes offres", href: "/dashboard-entreprise/offres", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Candidatures", href: "/dashboard-entreprise/candidatures", icon: <Users className="w-5 h-5" /> },
  { label: "Mon profil", href: "/dashboard-entreprise/profil", icon: <FileText className="w-5 h-5" /> },
];

interface OffresLayoutProps {
  children: React.ReactNode;
  title: string;
}

const OffresLayout = ({ children, title }: OffresLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} userType="entreprise" />

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
          title={title}
          userName="BTP Construct" 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OffresLayout;
