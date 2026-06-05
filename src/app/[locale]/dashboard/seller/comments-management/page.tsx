import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import SellerCommentManagementView from "@/modules/SellerDashboard/CommentsManagement/view/SellerCommentManagementView";
import React, { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
const SellerCommentsManagementPage = async ({ searchParams }: IProps) => {
  const sparams = await searchParams;
  const params = {
    sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    house_id: sparams.house_id ?? "",
    page: sparams.page ?? "",
    rating: sparams.rating ?? "",
    created_at_from: sparams.created_at_from ?? "",
    created_at_to: sparams.created_at_to ?? "",
  } as Record<string, string>;
  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <SellerCommentManagementView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default SellerCommentsManagementPage;
