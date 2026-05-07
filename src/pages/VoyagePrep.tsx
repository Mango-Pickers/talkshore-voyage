import { useEffect, useState } from "react";
import { Clock3, BookOpen } from "lucide-react";
import { getLessons } from "@/api/lessons";

type Scenario = {
  id: string;
  title: string;
};

type Lesson = {
  id: string;
  duration_min: number;
  prepares_for: string;
  status: string;
  progress: number;
  scheduled_for: string;
  description: string;
  scenarios: Scenario | null;
};

const VoyagePrep = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      const data = await getLessons();
      setLessons(data || []);
    };

    loadLessons();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <h1 className="font-serif text-4xl mb-2">
        Voyage Prep
      </h1>

      <p className="text-muted-foreground mb-6">
        Practice before boarding live conversation sessions.
      </p>

      {/* Lessons */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="ts-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-serif text-2xl">
                  {lesson.scenarios?.title}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {lesson.description}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-surface-2">
                {lesson.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Clock3 size={14} />
                {lesson.duration_min} mins
              </span>

              <span className="flex items-center gap-1">
                <BookOpen size={14} />
                {lesson.prepares_for}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${lesson.progress}%`,
                  }}
                />
              </div>

              <p className="text-xs mt-1 text-muted-foreground">
                {lesson.progress}% complete
              </p>
            </div>

            {/* CTA */}
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:opacity-90 transition">
              Start Lesson
            </button>
          </div>
        ))}
      </div>

      {/* Empty */}
      {lessons.length === 0 && (
        <div className="ts-card p-6 text-center text-muted-foreground">
          No lessons available yet.
        </div>
      )}
    </div>
  );
};

export default VoyagePrep;