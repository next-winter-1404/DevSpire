import { Suspense } from "react";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import { IUserHouseParams } from "@/components/common/types";
import EstateManagementDataStreaming from "@/modules/dashboard/sellerDashboard/estatesManagement/views/EstateManagementDataStreaming";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({ searchParams }: Props) => {
  const params: IUserHouseParams = await searchParams;
  const payLoad = {
    search: params.search ?? "",
    // sort: params.sort ?? "",
    order: params.order ?? "DESC",
    limit: params.limit ?? "5",
    page: params.page ?? "1",
    // propertyType: params.propertyType ?? "",
  };

  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <EstateManagementDataStreaming role="admin" params={payLoad} />
      </Suspense>
    </DashboardContainer>
  );
};

export default page;
