import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebaseClient";

/* ================= TYPES ================= */

export type SignUpData = {
  first_name: string;

  email: string;

  password: string;

  role: "learner" | "guide";
};

/* ================= SIGN UP ================= */

export const signUp = async ({
  first_name,
  email,
  password,
  role,
}: SignUpData) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(credential.user, { displayName: first_name });
  await setDoc(doc(db, "profiles", credential.user.uid), {
    id: credential.user.uid,
    full_name: first_name,
    email,
    role,
    created_at: serverTimestamp(),
  });

  return credential;
};

/* ================= SIGN IN ================= */

export const signIn = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/* ================= SIGN OUT ================= */

export const signOut = async () => {
  await firebaseSignOut(auth);
};
