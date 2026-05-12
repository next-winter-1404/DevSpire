import { IFastReserveParams, THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import FastReserveView from "@/modules/fastReserve/views/FastReserveView";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const FastReserve = async ({ searchParams }: Props) => {
  const params: IFastReserveParams = await searchParams;
  const payLoad = {
    search: params.search ?? "",
    sort: params.sort ?? "",
    order: params.order ?? "DESC",
    // minPrice: params.minPrice ?? "0",
    // maxPrice: params.maxPrice ?? "",
    limit: params.limit ?? "12",
    page: params.page ?? "1",
    propertyType: params.propertyType ?? "",
    // maxArea: params.maxArea ?? "",
    // minArea: params.minArea ?? "",
    location: params.location ?? "",
    transactionType: "reservation",
  };
  const data = await apiFetch<THousesResponse>("/houses", {
    params: payLoad,
    cache: "no-cache",
  });

  console.log("data ", data);

  return (
    <div>
      <FastReserveView
        data={
          data ?? {
            houses: [],
            totalCount: 0,
          }
        }
        limit={parseInt(payLoad.limit)}
        location={payLoad.location}
      />
    </div>
  );
};

export default FastReserve;
