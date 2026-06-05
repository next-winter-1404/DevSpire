import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import NotificationsView from "@/modules/SellerDashboard/Notifications/views/NotificationsView";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}

const page = async ({ searchParams }: IProps) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const params = await searchParams;
  const payLoad = {
    page: params.page ?? "",
    limit: params.limit ?? "",
    isRead: params.isRead ?? "",
    type: params.type ?? "",
    sort: params.sort ?? "",
    order: params.order ?? "",
    title: params.title ?? "",
    message: params.message ?? "",
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
