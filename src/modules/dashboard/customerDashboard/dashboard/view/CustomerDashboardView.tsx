import { Suspense } from "react";
import CustomerDashboardCharts from "../components/CustomerDashboardCharts";
import CustomerTopCardsView from "./CustomerTopCardsView";
import DashboardCardsSkeleton from "@/components/dashboard/DashboardCardsSkeleton";
import DashboardChartsSkeleton from "@/components/dashboard/DashboardChartsSkeleton";
import CustomerLatestReservesView from "./CustomerLatestReservesView";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";

const CustomerDashboardView = async () => {
  return (
    <div className="flex flex-col gap-4 ">
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <CustomerTopCardsView />
      </Suspense>
      <Suspense fallback={<DashboardChartsSkeleton />}>
        <CustomerDashboardCharts />
      </Suspense>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <div className="bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626] py-4 px-6 ">
          <h2 className="text-[20px] font-bold text-foreground mb-2">
            رزرو های اخیر
          </h2>
          <CustomerLatestReservesView />
        </div>
      </Suspense>
    </div>
  );
};

export default CustomerDashboardView;
