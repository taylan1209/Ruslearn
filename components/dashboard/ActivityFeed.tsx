import type { ActivityItem } from "@/types/dashboard";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const activityColorMap: Record<ActivityItem["type"], string> = {
  flashcard: "bg-emerald-500/10 text-emerald-600",
  quiz: "bg-primary/10 text-primary",
  content: "bg-blue-500/10 text-blue-600",
  practice: "bg-orange-500/10 text-orange-600"
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <section className="glass-panel flex flex-col gap-4 p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
        <p className="text-sm text-slate-500">
          Earn XP automatically as you move through your daily goals.
        </p>
      </div>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-inner"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-slate-700">
                {activity.description}
              </span>
              <span className="text-xs text-slate-400">{activity.timestamp}</span>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${activityColorMap[activity.type]}`}
            >
              +{activity.xp} XP
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
