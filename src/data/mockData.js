// TalkShore mock data. Shape mirrors a Supabase/PostgreSQL response so this file
// can be swapped for real queries without changing component props.

// Table: languages
export const languages = [
  { id: "lang_es", created_at: "2025-01-01", name: "Spanish", flag: "🇪🇸", code: "es" },
  { id: "lang_fr", created_at: "2025-01-01", name: "French", flag: "🇫🇷", code: "fr" },
  { id: "lang_it", created_at: "2025-01-01", name: "Italian", flag: "🇮🇹", code: "it" },
  { id: "lang_jp", created_at: "2025-01-01", name: "Japanese", flag: "🇯🇵", code: "jp" },
  { id: "lang_de", created_at: "2025-01-01", name: "German", flag: "🇩🇪", code: "de" },
  { id: "lang_pt", created_at: "2025-01-01", name: "Portuguese", flag: "🇵🇹", code: "pt" },
];

// Table: guides
export const guides = [
  { id: "guide_1", created_at: "2024-09-01", name: "Elena Vasquez", initials: "EV", verified: true, languages: ["es"], bio: "Madrid-born. Six years guiding learners into real Spanish conversation.", streak_days: 1240 },
  { id: "guide_2", created_at: "2024-08-15", name: "Marco Bianchi", initials: "MB", verified: true, languages: ["it"], bio: "Florentine. Specialises in opinion and debate-style shores.", streak_days: 1810 },
  { id: "guide_3", created_at: "2024-07-20", name: "Camille Laurent", initials: "CL", verified: true, languages: ["fr"], bio: "Parisian editor turned Guide. Loves nuance and tone.", streak_days: 1455 },
  { id: "guide_4", created_at: "2024-06-10", name: "Hiroshi Tanaka", initials: "HT", verified: true, languages: ["jp"], bio: "Tokyo-based. Calm, patient, formal-to-casual range.", streak_days: 1100 },
  { id: "guide_5", created_at: "2024-05-12", name: "Sofia Romero", initials: "SR", verified: true, languages: ["es"], bio: "Buenos Aires. Travel and market scenarios her speciality.", streak_days: 1325 },
];

// Table: sessions (live "Shores")
export const sessions = [
  { id: "ses_1", created_at: "2025-04-29T10:00:00Z", guide_id: "guide_1", language_code: "es", level: "B1", scenario: "At the Market", participants: 8, max_participants: 12, starts_at: "live", status: "live" },
  { id: "ses_2", created_at: "2025-04-29T10:00:00Z", guide_id: "guide_2", language_code: "it", level: "B2", scenario: "Sharing Opinions", participants: 14, max_participants: 16, starts_at: "live", status: "live" },
  { id: "ses_3", created_at: "2025-04-29T10:00:00Z", guide_id: "guide_3", language_code: "fr", level: "A2", scenario: "Greetings and Arrivals", participants: 5, max_participants: 10, starts_at: "live", status: "live" },
  { id: "ses_4", created_at: "2025-04-29T10:00:00Z", guide_id: "guide_5", language_code: "es", level: "B1", scenario: "Making Plans", participants: 11, max_participants: 14, starts_at: "live", status: "live" },
  { id: "ses_5", created_at: "2025-04-29T10:00:00Z", guide_id: "guide_4", language_code: "jp", level: "A2", scenario: "Getting Around", participants: 6, max_participants: 10, starts_at: "Departing 7:00 PM WAT", status: "upcoming" },
  { id: "ses_6", created_at: "2025-04-29T10:00:00Z", guide_id: "guide_1", language_code: "es", level: "B2", scenario: "Professional Conversations", participants: 4, max_participants: 12, starts_at: "Departing 8:30 PM WAT", status: "upcoming" },
];

// Table: lessons (Voyage Prep scenarios)
export const lessons = [
  { id: "lesson_1", created_at: "2025-01-10", scenario: "Greetings and Arrivals", duration_min: 12, prepares_for: "ses_3", status: "complete", topics: ["Hello and goodbye", "Introductions", "Polite forms"], description: "Open every conversation with warmth and clarity." },
  { id: "lesson_2", created_at: "2025-01-10", scenario: "At the Market", duration_min: 18, prepares_for: "ses_1", status: "ready", topics: ["Numbers and prices", "Asking for items", "Bargaining lightly", "Paying"], description: "Walk into any market and walk out with what you wanted." },
  { id: "lesson_3", created_at: "2025-01-10", scenario: "Getting Around", duration_min: 20, prepares_for: "ses_5", status: "in_progress", progress: 45, topics: ["Directions", "Public transport", "Asking for help"], description: "Move through a city without freezing at the first question." },
  { id: "lesson_4", created_at: "2025-01-10", scenario: "Making Plans", duration_min: 16, prepares_for: "ses_4", status: "scheduled", scheduled_for: "Thursday", topics: ["Inviting", "Agreeing on time", "Cancelling politely"], description: "Make a plan. Move it. Keep the relationship." },
  { id: "lesson_5", created_at: "2025-01-10", scenario: "Sharing Opinions", duration_min: 24, prepares_for: "ses_2", status: "scheduled", scheduled_for: "Saturday", topics: ["Agreeing", "Disagreeing softly", "Holding ground"], description: "Speak your mind without losing the room." },
  { id: "lesson_6", created_at: "2025-01-10", scenario: "Handling Conflict", duration_min: 22, prepares_for: null, status: "locked", topics: ["De-escalating", "Apologising", "Resolving"], description: "Resting in port until you complete Sharing Opinions." },
  { id: "lesson_7", created_at: "2025-01-10", scenario: "Professional Conversations", duration_min: 28, prepares_for: "ses_6", status: "locked", topics: ["Meetings", "Email tone", "Negotiation"], description: "Resting in port." },
];

// Table: videos (Ports of Call)
export const videos = [
  { id: "vid_1", created_at: "2025-02-01", title: "Ordering at a Madrid market", scenario: "At the Market", guide_id: "guide_1", language_code: "es", level: "B1", duration: "8:24", views: 2841, featured: true },
  { id: "vid_2", created_at: "2025-02-01", title: "Three ways to disagree in French", scenario: "Sharing Opinions", guide_id: "guide_3", language_code: "fr", level: "B2", duration: "6:12", views: 1922 },
  { id: "vid_3", created_at: "2025-02-01", title: "Getting around Rome by metro", scenario: "Getting Around", guide_id: "guide_2", language_code: "it", level: "A2", duration: "9:48", views: 3104 },
  { id: "vid_4", created_at: "2025-02-01", title: "Polite Japanese greetings", scenario: "Greetings and Arrivals", guide_id: "guide_4", language_code: "jp", level: "A1", duration: "5:30", views: 4210 },
  { id: "vid_5", created_at: "2025-02-01", title: "Making weekend plans in Spanish", scenario: "Making Plans", guide_id: "guide_5", language_code: "es", level: "B1", duration: "7:15", views: 1455 },
  { id: "vid_6", created_at: "2025-02-01", title: "Workplace email tone in Italian", scenario: "Professional Conversations", guide_id: "guide_2", language_code: "it", level: "B2", duration: "10:02", views: 988 },
  { id: "vid_7", created_at: "2025-02-01", title: "Bargaining at a Marrakech-style market", scenario: "At the Market", guide_id: "guide_5", language_code: "es", level: "B1", duration: "6:48", views: 2110 },
];

// Table: profiles
export const userProfile = {
  id: "user_1",
  created_at: "2024-11-04",
  name: "Abraham",
  email: "abraham@example.com",
  avatar_initials: "A",
  streak_days: 47,
  active_languages: [
    { code: "es", name: "Spanish", flag: "🇪🇸", level: "B1", sessions_completed: 12, sessions_to_next: 8 },
    { code: "it", name: "Italian", flag: "🇮🇹", level: "A2", sessions_completed: 4, sessions_to_next: 12 },
  ],
  resting_languages: [
    { code: "fr", name: "French", flag: "🇫🇷" },
  ],
  stats: {
    shores_joined: 23,
    hours_spoken: 18,
    guides_sailed_with: 7,
    languages_active: 2,
  },
  log: [
    { id: "log_1", text: "Boarded At the Market Shore", when: "Yesterday", guide: "Elena V." },
    { id: "log_2", text: "Completed Solo Sail in Spanish", when: "3 days ago" },
    { id: "log_3", text: "Boarded Greetings and Arrivals Shore", when: "Last week", guide: "Camille L." },
    { id: "log_4", text: "Watched Ordering at a Madrid market", when: "Last week" },
  ],
};
