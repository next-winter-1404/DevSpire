import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import SellerReserveManagementView from "@/modules/sellerDashboard/ReservesManagement/view/SellerReserveManagementView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}
const SellerReservePage = async ({ searchParams }: IProps) => {
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
        <SellerReserveManagementView params={params} />
      </Suspense>
    </div>
  );
};

export default SellerReservePage;
