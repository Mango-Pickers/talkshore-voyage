import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { supabase } from "@/lib/supabaseClient";

import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "@/components/ui/toaster";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { AppProvider } from "@/context/AppProvider";

import ProtectedRoute from "@/components/ProtectedRoute";

import AppShell from "@/components/AppShell";

/* ================= PAGES ================= */

import Index from "@/pages/Index";

import Auth from "@/pages/Auth";

import Onboarding from "@/pages/Onboarding";

import Home from "@/pages/Home";

import VoyagePrep from "@/pages/VoyagePrep";

import Shore from "@/pages/Shore";

import SoloSail from "@/pages/SoloSail";

import PortsOfCall from "@/pages/PortsOfCall";

import Profile from "@/pages/Profile";

import TestVideo from "@/pages/TestVideo";

import NotFound from "@/pages/NotFound";

/* ================= QUERY ================= */

const queryClient =
  new QueryClient();

/* ================= APP ================= */

const App = () => {
  /* ================= TEST SUPABASE ================= */

  useEffect(() => {
    const testConnection =
      async () => {
        try {
          const {
            data,
            error,
          } = await supabase
            .from("languages")
            .select("*");

          console.log(
            "SUPABASE DATA:",
            data
          );

          console.log(
            "SUPABASE ERROR:",
            error
          );
        } catch (err) {
          console.error(
            "SUPABASE CRASH:",
            err
          );
        }
      };

    testConnection();
  }, []);

  /* ================= UI ================= */

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <TooltipProvider>
        <Toaster />

        <Sonner />

        <AppProvider>
          <BrowserRouter>
            <Routes>
              {/* ================= LANDING ================= */}

              <Route
                path="/"
                element={<Index />}
              />

              {/* ================= AUTH ================= */}

              <Route
                path="/auth"
                element={<Auth />}
              />

              {/* ================= ONBOARDING ================= */}

              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              {/* ================= APP ================= */}

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                {/* HOME */}

                <Route
                  index
                  element={<Home />}
                />

                {/* PREP */}

                <Route
                  path="prep"
                  element={
                    <VoyagePrep />
                  }
                />

                {/* SHORE */}

                <Route
                  path="shore"
                  element={<Shore />}
                />

                {/* SOLO */}

                <Route
                  path="sail"
                  element={
                    <SoloSail />
                  }
                />

                {/* PORTS */}

                <Route
                  path="ports"
                  element={
                    <PortsOfCall />
                  }
                />

                {/* PROFILE */}

                <Route
                  path="profile"
                  element={
                    <Profile />
                  }
                />
              </Route>

              {/* ================= VIDEO TEST ================= */}

              <Route
                path="/test-video"
                element={
                  <ProtectedRoute>
                    <TestVideo />
                  </ProtectedRoute>
                }
              />

              {/* ================= REDIRECTS ================= */}

              <Route
                path="/home"
                element={
                  <Navigate
                    to="/app"
                    replace
                  />
                }
              />

              {/* ================= 404 ================= */}

              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

/* ================= ENV DEBUG ================= */

console.log(
  "SUPABASE URL:",
  import.meta.env
    .VITE_SUPABASE_URL
);