// Single source of truth for staff/leaders referenced across the site —
// About > Leadership, sermon speakers, and ministry leaders all previously
// hand-typed names independently (e.g. "Pastor David Chen" on the About page
// vs. "Ptr. David Chen" as a ministry leader — same person, inconsistent
// title). Update a name, title, or email here once and every page picks it
// up.
export interface Person {
  id: string;
  name: string;
  title: string; // role, shown on its own (e.g. About page leader cards)
  displayName: string; // honorific + name, ready to drop into copy/speaker lines
  email?: string;
}

export const people = {
  sarahJenkins: {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    title: "Lead Pastor",
    displayName: "Pastor Sarah Jenkins",
  },
  davidChen: {
    id: "david-chen",
    name: "David Chen",
    title: "Executive Pastor",
    displayName: "Pastor David Chen",
    email: "connect@goldenfaith.church",
  },
  noelGonzales: {
    id: "noel-gonzales",
    name: "Noel Gonzales",
    title: "Bishop",
    displayName: "Bishop Noel Gonzales",
  },
  annaReyes: {
    id: "anna-reyes",
    name: "Anna Reyes",
    title: "Pastor",
    displayName: "Pastor Anna Reyes",
  },
  maricelSantos: {
    id: "maricel-santos",
    name: "Maricel Santos",
    title: "Kids Ministry Leader",
    displayName: "Pastor Maricel Santos",
    email: "kids@goldenfaith.church",
  },
  jomarVillanueva: {
    id: "jomar-villanueva",
    name: "Jomar Villanueva",
    title: "Youth Pastor",
    displayName: "Pastor Jomar Villanueva",
    email: "youth@goldenfaith.church",
  },
} as const satisfies Record<string, Person>;