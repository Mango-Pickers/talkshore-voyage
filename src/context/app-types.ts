import { User } from "@supabase/supabase-js";

export type UserRole =
  | "learner"
  | "guide";

export type UserProfile = {
  id: string;

  full_name: string;

  email: string;

  role: UserRole;

  avatar_url?: string;

  native_language?: string;

  learning_language?: string;

  level?: string;

  goal?: string;

  created_at?: string;
};

export type OnboardingState = {
  language?: string;

  level?: string;

  goal?: string;

  daysPerWeek?: number;

  role?: UserRole;
};

export type AppContextType = {
  user: User | null;

  profile: UserProfile | null;

  setProfile: (
    profile: UserProfile | null
  ) => void;

  loading: boolean;

  activeLanguage: string;

  setActiveLanguage: (
    language: string
  ) => void;

  onboarding: OnboardingState;

  setOnboarding: (
    onboarding: OnboardingState
  ) => void;

  isOnboarded: boolean;

  setIsOnboarded: (
    onboarded: boolean
  ) => void;

  refreshProfile: () => Promise<void>;
};