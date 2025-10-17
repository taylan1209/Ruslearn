import type { MetricCard } from "@/types/dashboard";

interface MetricsGridProps {
  metrics: MetricCard[];
}

const statusColorMap: Record<
  NonNullable<MetricCard["status"]>,
  string
> = {
  up: "text-green-600 bg-green-500/10",
  stable: "text-slate-500 bg-slate-100",
  down: "text-red-600 bg-red-500/10"
};

export const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.id}
          className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm text-slate-500">{metric.label}</p>
          <div className="flex items-end justify-between pt-2">
            <span className="text-2xl font-semibold text-slate-800">
              {metric.value}
            </span>
            {metric.delta ? (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  metric.status
                    ? statusColorMap[metric.status]
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {metric.delta}
              </span>
            ) : null}
          </div>
          {metric.hint ? (
            <p className="pt-3 text-xs text-slate-400">{metric.hint}</p>
          ) : null}
        </article>
      ))}
    </section>
  );
};
