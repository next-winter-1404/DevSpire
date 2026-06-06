import CustomPagination from "@/components/common/CustomPagination";
import ReserveFilters from "../../../../components/dashboard/Filters";
import ReserveList from "../components/ReserveList";
import { useLocale } from "next-intl";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TReservationsResponse } from "@/components/common/types";

const SellerReserveManagementView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const data = await apiFetch<TReservationsResponse | null>("/bookings", {
    params,
    cache: "no-store",
  });

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground">
          لیست رزرو های مشتریان
        </h1>
        <div className=" w-full md:w-[50%]">
          <ReserveFilters />
        </div>
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {data && data?.totalCount > 0 ? (
          <ReserveList role="seller" data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز رزروی ثبت نشده است
            </p>

            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
              وقتی کاربران اقامتگاه شما را رزرو کنند در اینجا نمایش داده می‌شود
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerReserveManagementView;
