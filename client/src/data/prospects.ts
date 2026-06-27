import type { Prospect } from "../types/prospect";
export const initialProspects: Prospect[] = [
  {
    id: 1,
    company: "Acme Technologies",
    contact: "John Anderson",
    email: "john@acme.com",
    score: 92,
    status: "Hot",
  },
  {
    id: 2,
    company: "TechNova",
    contact: "Sarah Wilson",
    email: "sarah@technova.io",
    score: 81,
    status: "Warm",
  },
  {
    id: 3,
    company: "CloudSync",
    contact: "Michael Lee",
    email: "michael@cloudsync.ai",
    score: 67,
    status: "Cold",
  },
];