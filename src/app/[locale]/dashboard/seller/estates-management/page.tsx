import {
  IUserHouseParams,
  TUserHouseResponse,
} from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import EstatesManagementView from "../../../../../modules/SellerDashboard/EstatesManagement/views/EstatesManagementView";
import EstateManagementDataStreaming from "@/modules/SellerDashboard/EstatesManagement/views/EstateManagementDataStreaming";
import { Suspense } from "react";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({ searchParams }: Props) => {
  // const params: IUserHouseParams = await searchParams;
  // const payLoad = {
  //   search: params.search ?? "",
  //   // sort: params.sort ?? "",
  //   // order: params.order ?? "DESC",
  //   limit: params.limit ?? "5",
  //   page: params.page ?? "1",
  //   // propertyType: params.propertyType ?? "",
  // };

  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <EstateManagementDataStreaming />
      </Suspense>
    </DashboardContainer>
  );
};

export default page;
