import { IFastReserveParams } from "@/modules/fastReserve/types";
import FastReserveView from "@/modules/fastReserve/views/FastReserveView";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const FastReserve = async ({ searchParams }: Props) => {
  const params: IFastReserveParams = await searchParams;
  const payLoad = {
    query: params.query ?? "",
    sort: params.sort ?? "desc",
    option: params.option ?? "",
    lat: params.lat ?? "",
    lng: params.lng ?? "",
    minPrice: params.minPrice ?? "0",
    maxPrice: params.maxPrice ?? "25000000",
    limit: params.limit ?? "12",
    page: params.page ?? "1",
  } as IFastReserveParams;
  console.log("payload : ", payLoad);
  return (
    <div>
      <FastReserveView />
    </div>
  );
};

export default FastReserve;
