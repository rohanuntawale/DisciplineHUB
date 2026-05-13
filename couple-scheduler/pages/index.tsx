import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getActivities, addActivity, deleteActivity } from "../src/lib/api";
import { Activity, Owner } from "../src/models/types";
import { Card } from "../src/components/Card";
import QuoteBanner from "../src/components/QuoteBanner";
import AnimatedButton from "../src/components/AnimatedButton";
import { ActivityIcon } from "../src/components/ActivityIcon";
import Link from "next/link";

export default function Home() {
  const today = dayjs().format("YYYY-MM-DD");
  const [activities, setActivities] = useState<Activity[]>([]);

  const load = async () => {
    const data = await getActivities(today);
    setActivities(data);
  };

  useEffect(() => {
    load();
  }, []);

  const addSample = async (type: Activity["type"], owner: Owner) => {
    await addActivity({ date: today, type, title: `${type} for ${owner}`, owner });
    await load();
  };

  const remove = async (id: string) => {
    await deleteActivity(id);
    await load();
  };

  return (
    <section className="space-y-8">
      <QuoteBanner />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedButton onClick={() => addSample("study", "me")}>📝 Study (You)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("study", "gf")}>📝 Study (GF)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("water", "me")}>💧 Water (You)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("water", "gf")}>💧 Water (GF)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("lunch", "me")}>🥗 Lunch (You)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("lunch", "gf")}>🥗 Lunch (GF)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("dinner", "me")}>🍲 Dinner (You)</AnimatedButton>
        <AnimatedButton onClick={() => addSample("dinner", "gf")}>🍲 Dinner (GF)</AnimatedButton>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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

      <div className="text-center mt-8">
        <Link href={`/schedule/${today}`} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition">
          Open Full Day Schedule →
        </Link>
      </div>
    </section>
  );
}
