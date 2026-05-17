import { THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import MortgageRentView from "@/modules/mortgageRent/view/MortgageRentView";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null | undefined }>;
}) => {
  const sparams = await searchParams;
  const payLoad = {
    search: sparams.search ?? "",
    sort: sparams.sort ?? "last_updated",
    order: sparams.order ?? "DESC",
    minPrice: sparams.minPrice ?? "0",
    maxPrice: sparams.maxPrice ?? "50000000000",
    limit: sparams.limit ?? "12",
    page: sparams.page ?? "1",
    propertyType: sparams.propertyType ?? "",
    // maxArea: params.maxArea ?? "",
    // minArea: params.minArea ?? "",
    location: sparams.location ?? "",
    transactionType: sparams.transactionType ?? "mortgage",
  };
  console.log(payLoad);

  const data = await apiFetch<THousesResponse>("/houses", {
    params: payLoad,
    cache: "no-store",
  });

  return (
    <div>
      <MortgageRentView
        location={payLoad.location}
        data={data?.houses}
        totalPages={Math.ceil(
          (data?.totalCount ?? 0) / parseInt(payLoad.limit),
        )}
      />
    </div>
  );
};

export default page;
