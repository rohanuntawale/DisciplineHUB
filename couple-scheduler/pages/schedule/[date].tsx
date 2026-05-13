import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getActivities, addActivity, deleteActivity } from "../../src/lib/api";
import { Activity, Owner, ActivityType } from "../../src/models/types";
import { Card } from "../../src/components/Card";
import AnimatedButton from "../../src/components/AnimatedButton";
import { ActivityIcon } from "../../src/components/ActivityIcon";
import { motion, AnimatePresence } from "framer-motion";
import QuoteBanner from "../../src/components/QuoteBanner";

type Tab = "list" | "add" | "chart";

export default function DaySchedule() {
  const router = useRouter();
  const { date } = router.query as { date: string };
  const [activities, setActivities] = useState<Activity[]>([]);
  const [active, setActive] = useState<Tab>("list");
  const [newAct, setNewAct] = useState<{ type: ActivityType; title: string; owner: Owner }>({
    type: "study",
    title: "",
    owner: "me",
  });

  const load = async () => {
    const data = await getActivities(date);
    setActivities(data);
  };

  useEffect(() => {
    if (date) {
      load();
    }
  }, [date]);

  const create = async () => {
    if (!newAct.title.trim()) return;
    await addActivity({ date, ...newAct });
    setNewAct({ type: "study", title: "", owner: "me" });
    await load();
    setActive("list");
  };

  const remove = async (id: string) => {
    await deleteActivity(id);
    await load();
  };

  return (
    <section className="space-y-6">
      <QuoteBanner />

      <nav className="flex space-x-4 border-b border-gray-300 dark:border-gray-600">
        {(["list", "add", "chart"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`pb-2 ${
              active === t ? "border-b-2 border-indigo-500 text-indigo-500" : "text-gray-300"
            }`}
            type="button"
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {active === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {activities.length === 0 && <p>No activities for this day yet.</p>}
            <div className="grid md:grid-cols-2 gap-4">
              {activities.map((act) => (
                <Card key={act.id} title={act.title} owner={act.owner} bgImage="/images/card-texture.jpg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ActivityIcon type={act.type} className="text-xl" />
                    <span className="capitalize">{act.type}</span>
                  </div>
                  <AnimatedButton variant="secondary" onClick={() => remove(act.id)}>
                    ❌ Delete
                  </AnimatedButton>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {active === "add" && (
          <motion.div
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid gap-4 max-w-md mx-auto">
              <select
                value={newAct.type}
                onChange={(e) => setNewAct((s) => ({ ...s, type: e.target.value as ActivityType }))}
                className="p-2 border rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="study">Study</option>
                <option value="workout">Workout</option>
                <option value="water">Water</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="custom">Custom</option>
              </select>
              <input
                className="p-2 border rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Activity title (e.g., Read Chapter 3)"
                value={newAct.title}
                onChange={(e) => setNewAct((s) => ({ ...s, title: e.target.value }))}
              />
              <select
                value={newAct.owner}
                onChange={(e) => setNewAct((s) => ({ ...s, owner: e.target.value as Owner }))}
                className="p-2 border rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="me">You</option>
                <option value="gf">Girlfriend</option>
              </select>
              <AnimatedButton onClick={create}>➕ Add activity</AnimatedButton>
            </div>
          </motion.div>
        )}

        {active === "chart" && (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-center text-gray-300">📊 Activity distribution chart coming soon...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
