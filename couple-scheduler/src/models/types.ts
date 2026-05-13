export type Owner = "me" | "gf";

export type ActivityType = "study" | "workout" | "water" | "lunch" | "dinner" | "custom";

export interface Activity {
  id: string;
  date: string;
  type: ActivityType;
  title: string;
  owner: Owner;
}
