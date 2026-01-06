import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import PendingApproval from "./pages/PendingApproval";
import DashboardEntreprise from "./pages/DashboardEntreprise";
import DashboardInterimaire from "./pages/DashboardInterimaire";
import OffresPage from "./pages/entreprise/OffresPage";
import CandidaturesPage from "./pages/entreprise/CandidaturesPage";
import OffreDetailPage from "./pages/entreprise/OffreDetailPage";
import CandidatDetailPage from "./pages/entreprise/CandidatDetailPage";
import ProfilEntreprisePage from "./pages/entreprise/ProfilEntreprisePage";
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
import AdminEntreprisesPage from "./pages/admin/AdminEntreprisesPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminCandidaturesSpontaneesPage from "./pages/admin/AdminCandidaturesSpontaneesPage";
import PolitiqueCookies from "./pages/PolitiqueCookies";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            <Route path="/nos-interimaires" element={<NosInterimaires />} />
            <Route path="/nos-clients" element={<NosClients />} />
            <Route path="/nos-services" element={<NosServices />} />
            <Route path="/nous-rejoindre" element={<NousRejoindre />} />
            <Route path="/politique-cookies" element={<PolitiqueCookies />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/dashboard-entreprise" element={<DashboardEntreprise />} />
            <Route path="/dashboard-entreprise/offres" element={<OffresPage />} />
            <Route path="/dashboard-entreprise/offres/:id" element={<OffreDetailPage />} />
            <Route path="/dashboard-entreprise/candidatures" element={<CandidaturesPage />} />
            <Route path="/dashboard-entreprise/profil" element={<ProfilEntreprisePage />} />
            <Route path="/dashboard-entreprise/candidat/:id" element={<CandidatDetailPage />} />
            <Route path="/dashboard-interimaire" element={<DashboardInterimaire />} />
            <Route path="/dashboard-interimaire/missions" element={<MissionsPage />} />
            <Route path="/dashboard-interimaire/missions/:id" element={<MissionDetailPage />} />
            <Route path="/dashboard-interimaire/profil" element={<ProfilPage />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="validations" element={<AdminUsersPage />} />
              <Route path="candidats" element={<AdminCandidatsPage />} />
              <Route path="offres" element={<AdminOffresPage />} />
              <Route path="entreprises" element={<AdminEntreprisesPage />} />
              <Route path="candidatures" element={<AdminCandidaturesSpontaneesPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
