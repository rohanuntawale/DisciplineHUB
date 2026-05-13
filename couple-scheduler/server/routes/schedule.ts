import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

type Owner = "me" | "gf";
type ActivityType = "study" | "workout" | "water" | "lunch" | "dinner" | "custom";

interface Activity {
  id: string;
  date: string;
  type: ActivityType;
  title: string;
  owner: Owner;
}

interface DbShape {
  activities: Activity[];
}

const router = Router();
const DB_PATH = path.join(__dirname, "..", "data", "db.json");
const VALID_OWNERS: Owner[] = ["me", "gf"];
const VALID_TYPES: ActivityType[] = ["study", "workout", "water", "lunch", "dinner", "custom"];

const readDB = (): DbShape => {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<DbShape>;
    return { activities: Array.isArray(parsed.activities) ? parsed.activities : [] };
  } catch {
    return { activities: [] };
  }
};

const writeDB = (data: DbShape): void => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

router.get("/:date", (req, res) => {
  const { date } = req.params;
  const db = readDB();
  const dayActivities = db.activities.filter((a) => a.date === date);
  res.json(dayActivities);
});

router.post("/", (req, res) => {
  const { date, type, title, owner } = req.body as Partial<Activity>;

  if (!date || !type || !title || !owner) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (!VALID_TYPES.includes(type) || !VALID_OWNERS.includes(owner)) {
    return res.status(400).json({ error: "Invalid type or owner" });
  }

  const db = readDB();
  const newAct: Activity = { id: uuidv4(), date, type, title, owner };
  db.activities.push(newAct);
  writeDB(db);
  return res.status(201).json(newAct);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body as Partial<Activity>;
  const db = readDB();
  const index = db.activities.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  if (updates.owner && !VALID_OWNERS.includes(updates.owner)) {
    return res.status(400).json({ error: "Invalid owner" });
  }
  if (updates.type && !VALID_TYPES.includes(updates.type)) {
    return res.status(400).json({ error: "Invalid activity type" });
  }

  db.activities[index] = { ...db.activities[index], ...updates, id };
  writeDB(db);
  return res.json(db.activities[index]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const nextActivities = db.activities.filter((a) => a.id !== id);

  if (nextActivities.length === db.activities.length) {
    return res.status(404).json({ error: "Not found" });
  }

  db.activities = nextActivities;
  writeDB(db);
  return res.status(204).end();
});

export const scheduleRouter = router;
