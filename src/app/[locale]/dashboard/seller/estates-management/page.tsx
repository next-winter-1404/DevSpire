import {
  IUserHouseParams,
  TUserHouseResponse,
} from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import EstatesManagementView from "../../../../../modules/sellerDashboard/estatesManagement/views/EstatesManagementView";
import EstateManagementDataStreaming from "@/modules/sellerDashboard/estatesManagement/views/EstateManagementDataStreaming";
import { Suspense } from "react";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";

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
    <Suspense fallback={<DashboardTableSkeleton />}>
      <EstateManagementDataStreaming />
    </Suspense>
  );
};

export default page;
