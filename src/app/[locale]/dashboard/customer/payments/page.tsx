import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import PaymentsView from "@/modules/CustomerDashboard/Payments/views/PaymentsView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
const PaymentsPage = async ({ searchParams }: IProps) => {
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
        <PaymentsView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default PaymentsPage;
