import type { DashboardData } from "@/types/dashboard";
import { mockDashboardData } from "./mockData";

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    if (typeof window === "undefined") {
      return mockDashboardData;
    }

    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return mockDashboardData;
    }

    const { fetchDashboardSnapshot } = await import("./firebase");
    return await fetchDashboardSnapshot();
  } catch (error) {
    console.warn(
      "[dashboardService] Firebase verisi alınırken hata oluştu. Mock veriler kullanılacak.",
      error
    );
    return mockDashboardData;
  }
};
