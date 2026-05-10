import { IFastReserveParams } from "@/modules/fastReserve/types";
import FastReserveView from "@/modules/fastReserve/views/FastReserveView";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const FastReserve = async ({ searchParams }: Props) => {
  const params: IFastReserveParams = await searchParams;
  const payLoad = {
    search: params.search ?? "",
    sort: params.sort ?? "",
    order: params.order ?? "DESC",
    minPrice: params.minPrice ?? "0",
    maxPrice: params.maxPrice ?? "",
    limit: params.limit ?? "12",
    page: params.page ?? "1",
    propertyType: params.propertyType ?? "",
    maxArea: params.maxArea ?? "",
    minArea: params.minArea ?? "",
    location: params.location ?? "",
    transactionType: "reservation",
  };
  console.log("payload : ", payLoad);
  return (
    <div>
      <FastReserveView location={payLoad.location} />
    </div>
  );
};

export default FastReserve;
