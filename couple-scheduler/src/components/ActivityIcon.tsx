import { FC } from "react";
import { ActivityType } from "../models/types";

type Props = { type: ActivityType; className?: string };

export const ActivityIcon: FC<Props> = ({ type, className }) => {
  const map: Record<ActivityType, string> = {
    study: "📚",
    workout: "💪",
    water: "💧",
    lunch: "🥗",
    dinner: "🍲",
    custom: "⭐",
  };
  return <span className={className}>{map[type] ?? "❓"}</span>;
};
