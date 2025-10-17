import type { DashboardData } from "@/types/dashboard";
import { mockDashboardData } from "./mockData";

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return mockDashboardData;
    }

    const { fetchDashboardSnapshot } = await import("./firebase");
    return await fetchDashboardSnapshot();
  } catch (error) {
    console.warn(
      "[dashboardService] Failed to load Firebase data. Falling back to mock payload.",
      error
    );
    return mockDashboardData;
  }
};
