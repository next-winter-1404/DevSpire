import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import SocialMediaView from "@/modules/dashboard/AdminDashboard/socialMedia-management/views/SocialMediaView";
import React, { Suspense } from "react";

const SocialMediaManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const sparams = await searchParams;
  const params = {
    page: sparams.page ?? "1",
    order: sparams.order ?? "DESC",
    limit: sparams.limit ?? "6",
    platform: sparams.platform ?? "",
  };
  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <SocialMediaView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default SocialMediaManagementPage;
