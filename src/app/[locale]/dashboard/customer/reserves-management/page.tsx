import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import CustomerReservationManagementView from "@/modules/customerDashboard/ReserveManagement/view/CustomerReservationManagement";
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
    <div className="h-full">
      <Suspense fallback={<DashboardTableSkeleton />}>
        <CustomerReservationManagementView params={params} />
      </Suspense>
    </div>
  );
};

export default CustomerReservePage;
