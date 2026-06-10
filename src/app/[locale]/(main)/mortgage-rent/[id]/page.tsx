import { THouse, THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { Link } from "@/i18n/routing";
import MortgageRentDetailViewx from "@/modules/mortgageRentDetail/views/MortgageRentDetailView";
import { getTranslations } from "next-intl/server";
const MortgageRentDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {const t = await getTranslations("common");
  const { id } = await params;

  const data = await apiFetch<THouse | null>(`/houses/${id}`, {
    next: {
      revalidate: 70,
    },
  });
  const sliderData = await apiFetch<THousesResponse | null>("/houses", {
    params: {
      transactionType: data?.transaction_type || "",
      limit: "10",
    },
  });

  return (
    <>
      {data ? (
        <MortgageRentDetailViewx sliderData={sliderData?.houses} data={data} />
      ) : (
        <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
          <div className="mb-4 text-6xl">🏠</div>

          <h3 className="mb-2 text-xl font-bold text-gray-800">
    {t("houseNotFound")}
          </h3>

          <Link
            href="/"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
    {t("backHome")}
          </Link>
        </div>
      )}
    </>
  );
};

export default MortgageRentDetail;
