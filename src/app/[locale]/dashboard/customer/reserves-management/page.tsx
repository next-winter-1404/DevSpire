import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import CustomerReservationManagementView from "@/modules/dashboard/customerDashboard/ReserveManagement/view/CustomerReservationManagement";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}
const CustomerReservePage = async ({ searchParams }: IProps) => {
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
        <CustomerReservationManagementView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default CustomerReservePage;
