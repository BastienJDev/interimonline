import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Shield,
  X
} from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Candidats", href: "/admin/candidats", icon: <Users className="w-5 h-5" /> },
  { label: "Offres", href: "/admin/offres", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: <Shield className="w-5 h-5" /> },
];

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, rolesLoading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    // Important: wait for roles to load before deciding access
    if (!loading && !rolesLoading && user && !isAdmin) {
      navigate('/dashboard-entreprise');
    }
  }, [user, loading, rolesLoading, isAdmin, navigate]);

  if (loading || rolesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar navItems={navItems} userType="admin" />

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
            <DashboardSidebar navItems={navItems} userType="admin" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Administration" 
          userName="Administrateur" 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
