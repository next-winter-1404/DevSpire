import HouseCard from "@/components/common/HouseCard";
import { MOCK_DATA } from "../mocks/data";
import { THouse } from "@/components/common/types";
import { Link } from "@/i18n/routing";

const ReserveCardList = ({ houses }: { houses: THouse[] }) => {
  console.log("houses", houses);
  return (
    <div className="w-full">
      <div className="w-full flex lg:flex-row lg:flex-wrap flex-col sm:gap-5 justify-between">
        {houses?.length > 0 ? (
          houses.map((property) => (
            <HouseCard
              key={property.id}
              property={property}
              transactionType="reservation"
              className="w-full lg:w-[32%]"
            />
          ))
        ) : (
          <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
            <div className="mb-4 text-6xl">🏠</div>

            <h3 className="mb-2 text-xl font-bold text-gray-800">
              خانه‌ای پیدا نشد
            </h3>

            <p className="mb-6 max-w-md text-sm leading-7 text-gray-500">
              در حال حاضر موردی برای نمایش وجود ندارد. فیلترها را تغییر بده یا
              دوباره تلاش کن.
            </p>

            <Link
              href="/"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReserveCardList;
