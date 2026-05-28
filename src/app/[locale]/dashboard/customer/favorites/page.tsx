import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import FavoritesView from "@/modules/customerDashboard/favorites/views/FavoritesView";
import React, { Suspense } from "react";

const FavoritesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null }>;
}) => {
  const sparams = await searchParams;
  const params = {
    sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    page: sparams.page ?? "",
  } as Record<string, string>;
  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <FavoritesView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default FavoritesPage;
