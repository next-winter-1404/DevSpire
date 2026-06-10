import HouseCard from "@/components/common/HouseCard";
import { MOCK_DATA } from "../mocks/data";
import { THouse } from "@/components/common/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ReserveCardList = ({ houses }: { houses: THouse[] }) => {
  const t = useTranslations("fastReserve.list");
  console.log("houses", houses);
  return (
    <div className="w-full">
      {houses?.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-3">
          {houses.map((property) => (
            <HouseCard
              key={property.id}
              property={property}
              transactionType="reservation"
              className="w-full "
            />
          ))}
        </div>
      ) : (
        <div
          className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border
           border-dashed border-gray-300 bg-gray-50 px-6 text-center"
        >
          <div className="mb-4 text-6xl">🏠</div>

          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {t("noHouseTitle")}
          </h3>

          <p className="mb-6 max-w-md text-sm leading-7 text-gray-500">
                        {t("noHouseDesc")}

          </p>

          <Link
            href="/"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {t("backHome")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReserveCardList;
