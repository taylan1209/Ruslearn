"use client";

import { useEffect, useState } from "react";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { ContentInputPanel } from "@/components/dashboard/ContentInputPanel";
import { FlashcardPreview } from "@/components/dashboard/FlashcardPreview";
import { QuizPreview } from "@/components/dashboard/QuizPreview";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TopNav } from "@/components/layout/TopNav";
import { getDashboardData } from "@/lib/dashboardService";
import { mockDashboardData } from "@/lib/mockData";
import type { DashboardData } from "@/types/dashboard";
import { initAnalytics } from "@/lib/firebaseAnalytics";

type LoadState = "idle" | "loading" | "ready" | "error";

export const DashboardClient = () => {
  const [data, setData] = useState<DashboardData>(mockDashboardData);
  const [status, setStatus] = useState<LoadState>("idle");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setStatus("loading");
      try {
        const dashboardData = await getDashboardData();
        if (isMounted) {
          setData(dashboardData);
          setStatus("ready");
        }
      } catch (error) {
        console.warn(
          "[DashboardClient] Veri alınırken hata oluştu. Mock verilerle devam ediliyor.",
          error
        );
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    initAnalytics().catch((error) => {
      console.warn("[DashboardClient] Firebase Analytics başlatılamadı.", error);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8">
        <HeroBanner />
        <ContentInputPanel />
        <div className="grid gap-6 lg:grid-cols-[1.15fr,1fr]">
          <FlashcardPreview flashcard={data.flashcard} />
          <QuizPreview question={data.quizQuestion} />
        </div>
        <MetricsGrid metrics={data.metrics} />
        <ActivityFeed activities={data.activities} />
        {status === "loading" ? (
          <p className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
            Gerçek zamanlı veriler yükleniyor...
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Firebase verilerine erişilemedi. Şu an örnek veriler gösteriliyor.
          </p>
        ) : null}
      </main>
      <footer className="border-t border-slate-200 bg-white/80 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} RusLearn. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-primary">
              Kullanım Şartları
            </a>
            <a href="#" className="hover:text-primary">
              Destek
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
