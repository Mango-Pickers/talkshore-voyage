import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebaseClient";

export const bookSession = async (sessionId: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const bookingId = `${user.uid}_${sessionId}`;
  await setDoc(doc(db, "bookings", bookingId), {
    session_id: sessionId,
    user_id: user.uid,
    created_at: serverTimestamp(),
  });

  return { id: bookingId, session_id: sessionId, user_id: user.uid };
};

export const hasBooking = async (sessionId: string) => {
  const user = auth.currentUser;

  if (!user) return false;

  const bookingId = `${user.uid}_${sessionId}`;
  const snapshot = await getDoc(doc(db, "bookings", bookingId));

  return snapshot.exists();
};
