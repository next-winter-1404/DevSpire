import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TReservationsResponse } from "@/components/common/types";
import { BookOpen } from "lucide-react";
import ReservationTable from "../../ReservesManagement/components/ReserveTable";

const SellerLatestReservesView = async () => {
  const data = await apiFetch<TReservationsResponse | null>("/bookings", {
    params: {
      limit: "6",
      sort: "created_at",
      order: "DESC",
    },
    cache: "no-store",
  });
  return (
    <>
      {data ? (
        <ReservationTable data={data.data} />
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
    </>
  );
};

export default SellerLatestReservesView;
