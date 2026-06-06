import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import AdminReserveManagementViews from "@/modules/AdminDashboard/reserve-management/views/AdminReserveManagementViews";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}
const AdminReservesManagementPage = async ({ searchParams }: IProps) => {
  const sparams = await searchParams;
  const params = {
    sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    page: sparams.page ?? "",
  } as Record<string, string>;

  return (
    <Suspense fallback={<DashboardTableSkeleton />}>
      <DashboardContainer>
        <>
          <AdminReserveManagementViews params={params} />
        </>
      </DashboardContainer>
    </Suspense>
  );
};

export default AdminReservesManagementPage;
