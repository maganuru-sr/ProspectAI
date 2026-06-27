export interface Prospect {
  id: number;
  company: string;
  contact: string;
  email: string;
  score: number;
  status: "Hot" | "Warm" | "Cold";
}