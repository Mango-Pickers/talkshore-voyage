import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppProvider } from "@/context/AppContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";

import AppShell from "./components/AppShell";

import Home from "./pages/Home";
import VoyagePrep from "./pages/VoyagePrep";
import Shore from "./pages/Shore";
import SoloSail from "./pages/SoloSail";
import PortsOfCall from "./pages/PortsOfCall";
import Profile from "./pages/Profile";

/* ✅ Jitsi test page */
import TestVideo from "./pages/TestVideo";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from("languages")
          .select("*");

        console.log("SUPABASE DATA:", data);
        console.log("SUPABASE ERROR:", error);
      } catch (err) {
        console.error("SUPABASE CRASH:", err);
      }
    };

    testConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <AppProvider>
          <BrowserRouter>
            <Routes>
              {/* Landing */}
              <Route path="/" element={<Index />} />

              {/* Onboarding */}
              <Route
                path="/onboarding"
                element={<Onboarding />}
              />

              {/* Main App */}
              <Route path="/app" element={<AppShell />}>
                <Route index element={<Home />} />

                <Route
                  path="prep"
                  element={<VoyagePrep />}
                />

                <Route
                  path="shore"
                  element={<Shore />}
                />

                <Route
                  path="sail"
                  element={<SoloSail />}
                />

                <Route
                  path="ports"
                  element={<PortsOfCall />}
                />

                <Route
                  path="profile"
                  element={<Profile />}
                />
              </Route>

              {/* ✅ Jitsi Test Route */}
              <Route
                path="/test-video"
                element={<TestVideo />}
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

/* ENV DEBUG */
console.log(import.meta.env.VITE_SUPABASE_URL);