import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebaseClient";

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
      const profileSnapshot = await getDoc(doc(db, "profiles", userId));

      if (!profileSnapshot.exists()) return;

      const typedProfile = {
        id: profileSnapshot.id,
        ...profileSnapshot.data(),
      } as UserProfile;

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
      const user = auth.currentUser;

      if (!user) return;

      await loadProfile(user.uid);
    };

  /* ================= INITIALIZE APP ================= */

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = auth.currentUser;

        setUser(user);

        if (user) {
          await loadProfile(user.uid);
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

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

          setUser(currentUser);

          if (currentUser) {
            loadProfile(
              currentUser.uid
            );
          } else {
            setProfile(null);

            setIsOnboarded(false);

            setOnboarding({});
          }
      }
    );

    return unsubscribe;
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
