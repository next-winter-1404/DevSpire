import { Suspense } from "react";
import DashboardChartsSkeleton from "@/components/dashboard/DashboardChartsSkeleton";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import { Link } from "@/i18n/routing";
import DashboardCardsSkeleton from "@/components/dashboard/DashboardCardsSkeleton";
import SellerTopCardsView from "./SellerTopCardsView";
import SellerChartsView from "./SellerChartsView";
import SellerLatestReservesView from "./SellerLatestReservesView";

import { useTranslations } from "next-intl";

const SellerDashboardView = () => {
  const t = useTranslations("sellerDashboard.sdashboard");
  return (
    <div className="flex flex-col gap-4 ">
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <SellerTopCardsView />
      </Suspense>
      <Suspense fallback={<DashboardChartsSkeleton />}>
        <SellerChartsView />
      </Suspense>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <div className="bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626] py-4 px-6 ">
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-[20px] font-bold text-foreground mb-2">
              {t("latestReservations")}
            </h2>
            <Link
              href="/dashboard/seller/reserves-management"
              className="text-[#777777]"
            >
              {t("viewAll")}
            </Link>
          </div>

          <SellerLatestReservesView />
        </div>
      </Suspense>
    </div>
  );
};

export default SellerDashboardView;
