import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import NotificationsView from "@/modules/SellerDashboard/Notifications/views/NotificationsView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}

const page = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const payLoad = {
    page: params.page ?? "1",
    limit: params.limit ?? "6",
    isRead: params.isRead ?? "",
    type: params.type ?? "",
    sort: params.sort ?? "",
    order: params.order ?? "DESC",
    message: params.message ?? "",
    title: params.title ?? "",
  } as Record<string, string>;

  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <NotificationsView params={payLoad} />
      </Suspense>
    </DashboardContainer>
  );
};

export default page;
