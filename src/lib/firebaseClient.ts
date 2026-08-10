import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web configuration is public by design. Environment variables can
// override these identifiers, while the defaults keep Git-based Vercel builds
// working when a deployment target has not imported its environment settings.
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ??
    "AIzaSyD9Te-5wjvcfIJL4oUwmtNrrJ40EhT38QQ",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ??
    "talkshore-voyage.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "talkshore-voyage",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ??
    "talkshore-voyage.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "264843515690",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ??
    "1:264843515690:web:a6daf4658afd0ea87df053",
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-PGCKD6EMFS",
};

const missingConfig = Object.entries(firebaseConfig)
  .filter(([key, value]) => key !== "measurementId" && !value)
  .map(([key]) => key);

if (missingConfig.length > 0) {
  throw new Error(`Missing Firebase configuration: ${missingConfig.join(", ")}`);
}

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  void isSupported().then((supported) => {
    if (supported) getAnalytics(firebaseApp);
  });
}
