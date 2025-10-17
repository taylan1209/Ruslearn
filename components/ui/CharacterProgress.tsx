"use client";

import { useMemo } from "react";

interface CharacterProgressProps {
  value: number;
  limit: number;
  progress: number;
}

export const CharacterProgress = ({
  value,
  limit,
  progress
}: CharacterProgressProps) => {
  const statusLabel = useMemo(() => {
    if (progress >= 100) return "Limit doldu";
    if (progress > 80) return "Son birkaç karakter";
    return "Hazır";
  }, [progress]);

  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600">
      <div className="flex-1">
        <div className="flex items-center justify-between pb-1 text-[11px] uppercase tracking-wide">
          <span>Karakter</span>
          <span>
            {value}/{limit}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
        {statusLabel}
      </span>
    </div>
  );
};
