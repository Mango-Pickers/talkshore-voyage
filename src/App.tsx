import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Onboarding from "./pages/Onboarding";
import AppShell from "./components/AppShell";
import Home from "./pages/Home";
import VoyagePrep from "./pages/VoyagePrep";
import Shore from "./pages/Shore";
import SoloSail from "./pages/SoloSail";
import PortsOfCall from "./pages/PortsOfCall";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="prep" element={<VoyagePrep />} />
              <Route path="shore" element={<Shore />} />
              <Route path="sail" element={<SoloSail />} />
              <Route path="ports" element={<PortsOfCall />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
