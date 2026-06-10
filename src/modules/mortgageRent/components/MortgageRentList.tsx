import HouseCard from "@/components/common/HouseCard";
import { THouse } from "@/components/common/types";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const MortgageRentList = ({ data }: { data: THouse[] | undefined }) => {
  const tList = useTranslations("mortgageRent.list");

  return (
    <div className="w-full">
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-3">
          {data.map((property) => (
            <HouseCard
              key={property.id}
              property={property}
              transactionType="reservation"
              className="w-full"
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
          <div className="mb-4 text-6xl">🏠</div>

          <h3 className="mb-2 text-xl font-bold text-gray-800">
  {tList("notFoundTitle")}
          </h3>

          <p className="mb-6 max-w-md text-sm leading-7 text-gray-500">  {tList("notFoundDesc")}

          </p>

          <Link
            href="/"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
  {tList("backHome")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MortgageRentList;
