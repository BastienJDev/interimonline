import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardEntreprise from "./pages/DashboardEntreprise";
import DashboardInterimaire from "./pages/DashboardInterimaire";
import OffresPage from "./pages/entreprise/OffresPage";
import CandidaturesPage from "./pages/entreprise/CandidaturesPage";
import MissionsPage from "./pages/interimaire/MissionsPage";
import ProfilPage from "./pages/interimaire/ProfilPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard-entreprise" element={<DashboardEntreprise />} />
          <Route path="/dashboard-entreprise/offres" element={<OffresPage />} />
          <Route path="/dashboard-entreprise/candidatures" element={<CandidaturesPage />} />
          <Route path="/dashboard-interimaire" element={<DashboardInterimaire />} />
          <Route path="/dashboard-interimaire/missions" element={<MissionsPage />} />
          <Route path="/dashboard-interimaire/profil" element={<ProfilPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
