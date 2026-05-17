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

import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Toaster,
} from "@/components/ui/toaster";

import {
  Toaster as Sonner,
} from "@/components/ui/sonner";

import { AppProvider } from "@/context/AppProvider";

import ProtectedRoute from "@/components/ProtectedRoute";

import AppShell from "@/components/AppShell";

/* ================= LEARNER PAGES ================= */

import Landing from "@/pages/Landing";

import Auth from "@/pages/Auth";

import Onboarding from "@/pages/Onboarding";

import Home from "@/pages/Home";

import VoyagePrep from "@/pages/VoyagePrep";

import Shore from "@/pages/Shore";

import SoloSail from "@/pages/SoloSail";

import PortsOfCall from "@/pages/PortsOfCall";

import Profile from "@/pages/Profile";

/* ================= GUIDE PAGES ================= */

import GuideDashboard from "@/pages/GuideDashboard";

import GuideOnboarding from "@/pages/GuideOnboarding";

/* ================= SYSTEM ================= */

import NotFound from "@/pages/NotFound";

/* ================= QUERY ================= */

const queryClient =
  new QueryClient();

/* ================= APP ================= */

const App = () => {
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
                element={<Landing />}
              />

              {/* ================= AUTH ================= */}

              <Route
                path="/auth"
                element={<Auth />}
              />

              {/* ================= LEARNER ONBOARDING ================= */}

              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              {/* ================= GUIDE ONBOARDING ================= */}

              <Route
                path="/guide-onboarding"
                element={
                  <ProtectedRoute>
                    <GuideOnboarding />
                  </ProtectedRoute>
                }
              />

              {/* ================= LEARNER APP ================= */}

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

                {/* VOYAGE PREP */}

                <Route
                  path="prep"
                  element={
                    <VoyagePrep />
                  }
                />

                {/* LIVE SHORES */}

                <Route
                  path="shore"
                  element={<Shore />}
                />

                {/* SOLO SAIL */}

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

              {/* ================= GUIDE DASHBOARD ================= */}

              <Route
                path="/guide-dashboard"
                element={
                  <ProtectedRoute>
                    <GuideDashboard />
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