import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import SellerPaymentsView from "@/modules/SellerDashboard/Payments/view/SellerPaymentsView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
const SellerPaymentsPage = async ({ searchParams }: IProps) => {
  const sparams = await searchParams;
  const params = {
    sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    status: sparams.status ?? "",
    page: sparams.page ?? "",
  } as Record<string, string>;
  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <SellerPaymentsView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};
export default SellerPaymentsPage;
