import { TReservationsResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ReserveFilters from "@/components/dashboard/Filters";
import ReserveList from "../components/CustomerReserveList";
import { BookOpen } from "lucide-react";

const CustomerReservationManagementView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const data = await apiFetch<TReservationsResponse | null>("/bookings", {
    params,
    cache: "no-store",
  });
  console.log(data);

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground">لیست رزرو های شما</h1>
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
          <ReserveList data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[260px] text-center">
            <BookOpen className="text-gray-400 dark:text-gray-500 text-6xl mb-4" />
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              هنوز رزروی ثبت نشده است.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              به محض ثبت رزرو جدید، این بخش برایتان فعال خواهد شد.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReservationManagementView;
