import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Search, User, FileText, Briefcase, X } from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/dashboard-interimaire", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Rechercher missions", href: "/dashboard-interimaire/missions", icon: <Search className="w-5 h-5" /> },
  { label: "Mon profil", href: "/dashboard-interimaire/profil", icon: <User className="w-5 h-5" /> },
  { label: "Mes documents", href: "/dashboard-interimaire/documents", icon: <FileText className="w-5 h-5" /> },
];

interface InterimaireLayoutProps {
  children: React.ReactNode;
  title: string;
}

const InterimaireLayout = ({ children, title }: InterimaireLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} userType="interimaire" />

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
          title={title}
          userName="Jean Dupont" 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InterimaireLayout;
