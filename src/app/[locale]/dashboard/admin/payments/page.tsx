import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import SellerPaymentsView from "@/modules/sellerDashboard/payments/view/SellerPaymentsView";
import { Suspense } from "react";

const AdminPaymentsManagement = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null | undefined }>;
}) => {
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
        <SellerPaymentsView role={"admin"} params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default AdminPaymentsManagement;
