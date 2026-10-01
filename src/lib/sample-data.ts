// Illustrative data used until the real backend is connected.
// Every surface that shows this data carries an "Illustrative" note.

export type Accent = "lime" | "violet" | "coral" | "pink" | "sky";

export type Leader = {
  rank: number;
  initials: string;
  name: string;
  craft: string;
  city: string;
  invited: number;
  week: number;
  accent: Accent;
};

export const LEADERS: Leader[] = [
  { rank: 1, initials: "MK", name: "Meera K.", craft: "Dance", city: "Bengaluru", invited: 214, week: 31, accent: "lime" },
  { rank: 2, initials: "AR", name: "Arjun R.", craft: "Film", city: "Chennai", invited: 188, week: 22, accent: "sky" },
  { rank: 3, initials: "SN", name: "Sana N.", craft: "Photography", city: "Mumbai", invited: 161, week: 18, accent: "pink" },
  { rank: 4, initials: "DV", name: "Dev V.", craft: "Music", city: "Kochi", invited: 139, week: 12, accent: "violet" },
  { rank: 5, initials: "IP", name: "Ishita P.", craft: "Painting", city: "Kolkata", invited: 117, week: 4, accent: "coral" },
  { rank: 6, initials: "TJ", name: "Tara J.", craft: "Poetry", city: "Delhi", invited: 96, week: 9, accent: "sky" },
  { rank: 7, initials: "RK", name: "Rahul K.", craft: "Sculpture", city: "Pune", invited: 81, week: 2, accent: "pink" },
  { rank: 8, initials: "NB", name: "Nila B.", craft: "Design", city: "Hyderabad", invited: 77, week: 15, accent: "lime" },
  { rank: 9, initials: "FZ", name: "Farah Z.", craft: "Photography", city: "Lucknow", invited: 70, week: 6, accent: "violet" },
  { rank: 10, initials: "SG", name: "Sid G.", craft: "Music", city: "Shillong", invited: 64, week: 11, accent: "coral" },
  { rank: 11, initials: "KM", name: "Kavya M.", craft: "Poetry", city: "Chennai", invited: 58, week: 7, accent: "pink" },
  { rank: 12, initials: "AP", name: "Arun P.", craft: "Film", city: "Kochi", invited: 51, week: 3, accent: "sky" },
  { rank: 13, initials: "LS", name: "Leela S.", craft: "Dance", city: "Chennai", invited: 47, week: 10, accent: "lime" },
  { rank: 14, initials: "RV", name: "Rohan V.", craft: "Sculpture", city: "Pune", invited: 41, week: 1, accent: "violet" },
  { rank: 15, initials: "ZA", name: "Zoya A.", craft: "Painting", city: "Jaipur", invited: 36, week: 5, accent: "coral" },
];

export const NEIGHBOURS = [
  { initials: "RV", name: "Rohan V.", craft: "Sculpture", city: "Pune", accent: "sky" as Accent },
  { initials: "LS", name: "Leela S.", craft: "Dance", city: "Chennai", accent: "pink" as Accent },
  { initials: "KA", name: "Kabir A.", craft: "Music", city: "Goa", accent: "violet" as Accent },
  { initials: "MD", name: "Maya D.", craft: "Film", city: "Delhi", accent: "coral" as Accent },
];

export const CITIES = [
  { city: "Chennai", count: 1412 },
  { city: "Bengaluru", count: 1288 },
  { city: "Mumbai", count: 1151 },
  { city: "Delhi", count: 974 },
  { city: "Kochi", count: 602 },
  { city: "Kolkata", count: 540 },
  { city: "Hyderabad", count: 498 },
  { city: "Pune", count: 455 },
];

export const LINE_STATS = { inLine: 12480, crafts: 41, cities: 186 };

export const LINE_GOALS = [
  { target: 5000, title: "Founding wall opens", body: "The first works wall goes live on this page." },
  { target: 20000, title: "Chennai opens a week early", body: "Our home city gets in first. Every city can earn this next." },
  { target: 50000, title: "Film section on day one", body: "Long-form film and video support ships at launch, not later." },
];

export const FIRST_WORKS = [
  { craft: "Painting", by: "Ishita P.", h: 300, from: "#FF5B3A", to: "#FFD35C" },
  { craft: "Photography", by: "Sana N.", h: 220, from: "#6FD3FF", to: "#7C5CFF" },
  { craft: "Music", by: "Dev V.", h: 200, from: "#C8FF2E", to: "#1C1C21" },
  { craft: "Dance", by: "Meera K.", h: 320, from: "#FF9EE6", to: "#FF5B3A" },
  { craft: "Film", by: "Arjun R.", h: 340, from: "#7C5CFF", to: "#09090B" },
  { craft: "Poetry", by: "Tara J.", h: 180, from: "#FFD35C", to: "#C8FF2E" },
  { craft: "Sculpture", by: "Rahul K.", h: 240, from: "#1C1C21", to: "#6FD3FF" },
  { craft: "Design", by: "Nila B.", h: 280, from: "#FF9EE6", to: "#7C5CFF" },
];

/** Known demo invite codes so /r/[code] renders a real inviter without a backend. */
export const SAMPLE_INVITERS: Record<string, { name: string; first: string; craft: string; city: string; number: number; initials: string }> = {
  anjali: { name: "Anjali R.", first: "Anjali", craft: "Painter", city: "Chennai", number: 1284, initials: "AR" },
  meera: { name: "Meera K.", first: "Meera", craft: "Dancer", city: "Bengaluru", number: 1, initials: "MK" },
  arjun: { name: "Arjun R.", first: "Arjun", craft: "Filmmaker", city: "Chennai", number: 2, initials: "AR" },
};

export const ACCENT_BG: Record<Accent, string> = {
  lime: "bg-lime",
  violet: "bg-violet",
  coral: "bg-coral",
  pink: "bg-pink",
  sky: "bg-sky",
};

export const ACCENT_TEXT: Record<Accent, string> = {
  lime: "text-lime",
  violet: "text-violet",
  coral: "text-coral",
  pink: "text-pink",
  sky: "text-sky",
};
