import { createContext, useContext, useState, ReactNode } from "react";
import { userProfile as defaultProfile } from "@/data/mockData";

type OnboardingState = {
  language?: string;
  level?: string;
  goal?: string;
  daysPerWeek?: number;
  role?: "learner" | "guide";
  name?: string;
  email?: string;
};

type AppContextType = {
  profile: typeof defaultProfile;
  setProfile: (p: typeof defaultProfile) => void;
  activeLanguage: string;
  setActiveLanguage: (l: string) => void;
  onboarding: OnboardingState;
  setOnboarding: (o: OnboardingState) => void;
  isOnboarded: boolean;
  setIsOnboarded: (b: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [activeLanguage, setActiveLanguage] = useState("es");
  const [onboarding, setOnboarding] = useState<OnboardingState>({});
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <AppContext.Provider value={{ profile, setProfile, activeLanguage, setActiveLanguage, onboarding, setOnboarding, isOnboarded, setIsOnboarded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
