import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DashboardEntreprise from "./pages/DashboardEntreprise";
import DashboardInterimaire from "./pages/DashboardInterimaire";
import OffresPage from "./pages/entreprise/OffresPage";
import CandidaturesPage from "./pages/entreprise/CandidaturesPage";
import OffreDetailPage from "./pages/entreprise/OffreDetailPage";
import CandidatDetailPage from "./pages/entreprise/CandidatDetailPage";
import MissionsPage from "./pages/interimaire/MissionsPage";
import ProfilPage from "./pages/interimaire/ProfilPage";
import MissionDetailPage from "./pages/interimaire/MissionDetailPage";
import NosInterimaires from "./pages/NosInterimaires";
import NosClients from "./pages/NosClients";
import NosServices from "./pages/NosServices";
import NousRejoindre from "./pages/NousRejoindre";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCandidatsPage from "./pages/admin/AdminCandidatsPage";
import AdminOffresPage from "./pages/admin/AdminOffresPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/nos-interimaires" element={<NosInterimaires />} />
            <Route path="/nos-clients" element={<NosClients />} />
            <Route path="/nos-services" element={<NosServices />} />
            <Route path="/nous-rejoindre" element={<NousRejoindre />} />
            <Route path="/dashboard-entreprise" element={<DashboardEntreprise />} />
            <Route path="/dashboard-entreprise/offres" element={<OffresPage />} />
            <Route path="/dashboard-entreprise/offres/:id" element={<OffreDetailPage />} />
            <Route path="/dashboard-entreprise/candidatures" element={<CandidaturesPage />} />
            <Route path="/dashboard-entreprise/candidat/:id" element={<CandidatDetailPage />} />
            <Route path="/dashboard-interimaire" element={<DashboardInterimaire />} />
            <Route path="/dashboard-interimaire/missions" element={<MissionsPage />} />
            <Route path="/dashboard-interimaire/missions/:id" element={<MissionDetailPage />} />
            <Route path="/dashboard-interimaire/profil" element={<ProfilPage />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="candidats" element={<AdminCandidatsPage />} />
              <Route path="offres" element={<AdminOffresPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
