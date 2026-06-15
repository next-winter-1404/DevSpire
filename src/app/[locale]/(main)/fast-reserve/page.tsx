import { IFastReserveParams, THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import FastReserveView from "@/modules/main/fastReserve/views/FastReserveView";
import { customMetadataGenerator } from "@/utils/helper/Metadata";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata() {
  return customMetadataGenerator({
    title: "رزرو",
    description: "ملک مورد نظرتان را رزرو کنید",
  });
}

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
    // maxArea: params.maxArea ?? "",
    // minArea: params.minArea ?? "",
    location: params.location ?? "",
    transactionType: "reservation",
  };
  const data = await apiFetch<THousesResponse | null>("/houses", {
    params: payLoad,
    cache: "no-store",
  });

  console.log("data ", data);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data?.houses.map((house, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: house.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/fast-reserve/${house.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
};

export default FastReserve;
