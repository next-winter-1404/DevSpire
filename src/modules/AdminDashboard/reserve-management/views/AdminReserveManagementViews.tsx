import { TReservation, TReservationsResponse } from "@/components/common/types";
import ReserveFilters from "@/components/dashboard/Filters";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ReserveList from "@/modules/sellerDashboard/ReservesManagement/components/ReserveList";
import ReservationTable from "@/modules/sellerDashboard/ReservesManagement/components/ReserveTable";
import { getTranslations } from "next-intl/server";

const AdminReserveManagementViews = async ({
  params,
}: {
  params: Record<string, string>;
}) => {const t = await getTranslations("adminDashboard.reservations");

  const data = await apiFetch<TReservationsResponse | null>("/admin/bookings", {
    cache: "no-store",
    params,
  });
  console.log(data);

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground whitespace-nowrap">
  {t("reservationsList")}
        </h1>
        <ReserveFilters />
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {data && data?.totalCount > 0 ? (
          <div className="w-full h-full">
            <ReserveList role="admin" data={data} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
  {t("noReservations")}
            </p>

            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
  {t("noReservationsDescription")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReserveManagementViews;
