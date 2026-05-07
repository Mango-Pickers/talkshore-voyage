import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

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

/* ================= CONTEXT TYPE ================= */

export type AppContextType = {
  user: User | null;

  profile: UserProfile | null;

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

/* ================= CONTEXT ================= */

import { AppContext } from "./app-context";

/* ================= PROVIDER ================= */

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<UserProfile | null>(
      null
    );

  const [loading, setLoading] =
    useState<boolean>(true);

  const [activeLanguage, setActiveLanguage] =
    useState<string>("es");

  const [onboarding, setOnboarding] =
    useState<OnboardingState>({});

  const [isOnboarded, setIsOnboarded] =
    useState<boolean>(false);

  /* ================= LOAD PROFILE ================= */

  const loadProfile = async (
    userId: string
  ): Promise<void> => {
    const { data, error } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
      console.error(
        "Failed to load profile:",
        error
      );

      return;
    }

    const typedProfile =
      data as UserProfile;

    setProfile(typedProfile);

    if (
      typedProfile.learning_language
    ) {
      setActiveLanguage(
        typedProfile.learning_language
      );
    }

    if (
      typedProfile.learning_language &&
      typedProfile.level
    ) {
      setIsOnboarded(true);
    }
  };

  /* ================= REFRESH PROFILE ================= */

  const refreshProfile =
    async (): Promise<void> => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      await loadProfile(user.id);
    };

  /* ================= INIT AUTH ================= */

  useEffect(() => {
    const initialize =
      async (): Promise<void> => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        setUser(user);

        if (user) {
          await loadProfile(user.id);
        }

        setLoading(false);
      };

    initialize();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const currentUser =
            session?.user ?? null;

          setUser(currentUser);

          if (currentUser) {
            await loadProfile(
              currentUser.id
            );
          } else {
            setProfile(null);

            setIsOnboarded(false);
          }
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /* ================= PROVIDER ================= */

  return (
    <AppContext.Provider
      value={{
        user,

        profile,

        loading,

        activeLanguage,

        setActiveLanguage,

        onboarding,

        setOnboarding,

        isOnboarded,

        setIsOnboarded,

        refreshProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};