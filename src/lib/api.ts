import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "./firebaseClient";

/* ================= TYPES ================= */

export interface Session {
  id: string;

  title?: string;

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string;

  status: string;

  room_url?: string;
}

/* ================= API ================= */

export const getSessions =
  async (): Promise<
    Session[]
  > => {
    try {
      const snapshot = await getDocs(
        query(collection(db, "sessions"), orderBy("starts_at", "asc"))
      );

      return snapshot.docs.map((session) => ({
        id: session.id,
        ...session.data(),
      })) as Session[];
    } catch (error) {
      console.error(
        "Error fetching sessions:",
        error
      );

      return [];
    }

  };
