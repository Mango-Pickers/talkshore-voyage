import {
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User }
from "@supabase/supabase-js";

import { supabase }
from "@/lib/supabaseClient";

import { AppContext }
from "./app-context";

import type {
  UserProfile,
  OnboardingState,
} from "./app-types";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({
  children,
}: Props) => {
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
      console.error(error);
      return;
    }

    const typed =
      data as UserProfile;

    setProfile(typed);

    if (
      typed.learning_language
    ) {
      setActiveLanguage(
        typed.learning_language
      );
    }

    if (
      typed.learning_language &&
      typed.level
    ) {
      setIsOnboarded(true);
    }
  };

  const refreshProfile =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      await loadProfile(user.id);
    };

  useEffect(() => {
    const init = async () => {
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

    init();

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

            setOnboarding({});

            setIsOnboarded(false);
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