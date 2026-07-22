import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "@/lib/firebaseClient";

/* ================= TYPES ================= */

export type Session = {
  id: string;

  status: "live" | "upcoming";

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string;

  room_url?: string;

  title?: string;
};

/* ================= API ================= */

export async function getSessions(): Promise<
  Session[]
> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "sessions"), orderBy("starts_at", "asc"))
    );

    return snapshot.docs.map((session) => ({
      id: session.id,
      ...session.data(),
    })) as Session[];
  } catch (error) {
    console.error("Firebase session error:", error);
    return [];
  }
}
