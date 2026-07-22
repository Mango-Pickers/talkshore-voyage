import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "@/lib/firebaseClient";

export const getLessons = async () => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "lessons"), orderBy("created_at", "desc"))
    );

    return snapshot.docs.map((lesson) => ({
      id: lesson.id,
      ...lesson.data(),
    }));
  } catch (error) {
    console.error("LESSONS ERROR:", error);
    return [];
  }
};
