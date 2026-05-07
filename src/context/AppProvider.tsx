import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient";

import { AppContext } from "./app-context";

import type {
  UserProfile,
  OnboardingState,
} from "./app-types";

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
    useState(true);

  const [activeLanguage, setActiveLanguage] =
    useState("es");

  const [onboarding, setOnboarding] =
    useState<OnboardingState>({});

  const [isOnboarded, setIsOnboarded] =
    useState(false);

  const loadProfile = async (
    userId: string
  ) => {
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

  const refreshProfile =
    async (): Promise<void> => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      await loadProfile(user.id);
    };

  useEffect(() => {
    const initialize = async () => {
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

            setOnboarding({});
          }
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        setProfile,
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