import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import PaymentsView from "@/modules/customerDashboard/payments/views/PaymentsView";
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
    <>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <PaymentsView params={params} />
      </Suspense>
    </>
  );
};

export default PaymentsPage;
