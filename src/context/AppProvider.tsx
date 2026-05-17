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
  /* ================= STATE ================= */

  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<UserProfile | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [
    activeLanguage,
    setActiveLanguage,
  ] = useState("es");

  const [onboarding, setOnboarding] =
    useState<OnboardingState>({});

  const [isOnboarded, setIsOnboarded] =
    useState(false);

  /* ================= LOAD PROFILE ================= */

  const loadProfile = async (
    userId: string
  ) => {
    try {
      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

      if (error) {
        console.error(
          "PROFILE LOAD ERROR:",
          error
        );

        return;
      }

      const typedProfile =
        data as UserProfile;

      setProfile(typedProfile);

      /* ================= ACTIVE LANGUAGE ================= */

      if (
        typedProfile.learning_language
      ) {
        setActiveLanguage(
          typedProfile.learning_language
        );
      }

      /* ================= ONBOARDING ================= */

      const completed =
        !!typedProfile.learning_language &&
        !!typedProfile.level &&
        !!typedProfile.goal &&
        !!typedProfile.days_per_week;

      setIsOnboarded(completed);
    } catch (err) {
      console.error(
        "PROFILE CRASH:",
        err
      );
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

  /* ================= INITIALIZE APP ================= */

  useEffect(() => {
    const initialize = async () => {
      try {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        setUser(user);

        if (user) {
          await loadProfile(user.id);
        }
      } catch (err) {
        console.error(
          "INITIALIZATION ERROR:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    initialize();

    /* ================= AUTH LISTENER ================= */

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          const currentUser =
            session?.user ?? null;

          setUser(currentUser);

          if (currentUser) {
            loadProfile(
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

  /* ================= PROVIDER ================= */

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