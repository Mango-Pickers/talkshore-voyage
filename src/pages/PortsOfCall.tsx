import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "@/lib/firebaseClient";

interface Video {
  id: string;
  title: string;
  duration: string;
  views: number;
  level: string;
  featured: boolean;
  created_at: string;
  guide_id: string;
  language_id: string;
  scenario_id: string;
}

const PortsOfCall = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "videos"), orderBy("created_at", "desc"))
        );
        setVideos(
          snapshot.docs.map((video) => ({
            id: video.id,
            ...video.data(),
          })) as Video[]
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ports of Call</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-2xl p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">
              {video.title}
            </h2>

            <p className="text-sm mb-2">
              Level: {video.level}
            </p>

            <p className="text-sm mb-2">
              Duration: {video.duration}
            </p>

            <p className="text-sm mb-4">
              Views: {video.views}
            </p>

            {video.featured && (
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-black text-white">
                Featured
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortsOfCall;
