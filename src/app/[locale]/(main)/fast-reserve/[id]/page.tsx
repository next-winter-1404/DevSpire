import { THouse, THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { Link } from "@/i18n/routing";
import FastReserveDetailView from "@/modules/main/fastReserveDetail/views/FastReserveDetailView";
import { customMetadataGenerator } from "@/utils/helper/Metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const param = parseInt(id);

  const data = await apiFetch<THouse | null>(`/houses/${param}`, {
    next: { revalidate: 80 },
  });

  if (!data) {
    return customMetadataGenerator({
      title: "not found",
    });
  }
  return customMetadataGenerator({
    title: data.title,
    description: data.caption,
  });
}

const FastReserveDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const param = parseInt(id);

  const data = await apiFetch<THouse | null>(`/houses/${param}`, {
    next: { revalidate: 80 },
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "house",
    title: data?.title,
    rating: data?.rate,
    description: data?.caption,
  };
  console.log(data);
  const sliderData = await apiFetch<THousesResponse | null>("/houses", {
    params: {
      transactionType: data?.transaction_type || "",
      limit: "10",
    },
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {data ? (
        <FastReserveDetailView sliderData={sliderData?.houses} house={data} />
      ) : (
        <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
          <div className="mb-4 text-6xl">🏠</div>

          <h3 className="mb-2 text-xl font-bold text-gray-800">
            خانه‌ای با این شناسه پیدا نشد
          </h3>

          <Link
            href="/"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
    </>
  );
};

export default FastReserveDetail;
