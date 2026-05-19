import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import ReserveActionsMenu from "./ReserveActionsMenu";
import { TReservation } from "@/components/common/types";
import { FormatDate } from "@/utils/helper/FormatDate";

export default function ReservationTable({ data }: { data: TReservation[] }) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleCloseMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleCloseMenu);
    return () => document.removeEventListener("mousedown", handleCloseMenu);
  }, []);

  return (
    <table className="w-full text-sm text-right">
      <thead className="text-gray-600 font-medium">
        <tr className="border-b border-[#DDDDDD]">
          <th className="py-4 px-4">نام اقامتگاه</th>
          <th className="py-4 px-4">اطلاعات مسافرین</th>
          <th className="py-4 px-4">تاریخ رزرو</th>
          <th className="py-4 px-4">قیمت</th>
          <th className="py-4 px-4 text-center">وضعیت رزرو</th>
          <th className="py-4 px-4 text-center">عملیات</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          const startDate = row.reservedDates?.[0];
          const endDate = row.reservedDates?.[1];

          const travelersCount = row.traveler_details?.length || 0;
          const firstTraveler =
            travelersCount > 0 ? row.traveler_details![0] : null;

          return (
            <tr
              key={row.id}
              className="border-b border-[#DDDDDD]
               hover:bg-slate-50 dark:hover:bg-slate-50/10 transition-colors"
            >
              <td className="py-4 px-4 text-gray-500 align-middle">
                {row.house?.title}
              </td>

              <td className="py-4 px-4 text-gray-600 align-middle">
                {firstTraveler ? (
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span>
                      {firstTraveler.firstName} {firstTraveler.lastName}
                    </span>
                    {travelersCount > 1 && (
                      <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                        +{travelersCount - 1} نفر
                      </span>
                    )}
                  </div>
                ) : (
                  <span>-</span>
                )}
              </td>

              <td className="py-4 px-4 text-gray-500 align-middle whitespace-nowrap">
                {startDate && endDate
                  ? `${FormatDate(startDate, "fa")} تا ${FormatDate(endDate, "fa")}`
                  : "-"}
              </td>

              <td className="py-4 px-4 text-gray-500 align-middle whitespace-nowrap">
                {row.house?.price
                  ? parseInt(row.house.price).toLocaleString()
                  : 0}{" "}
                تومان
              </td>

              <td className="py-4 px-3 whitespace-nowrap text-center align-middle">
                <StatusBadge status={row.status} />
              </td>

              <td className="  relative text-center align-middle">
                <button
                  onClick={() => toggleMenu(row.id)}
                  className="p-1 rounded-md hover:bg-gray-200
                   text-gray-500"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {row.id === openMenuId && (
                  <div ref={menuRef}>
                    <ReserveActionsMenu
                      isCanceled={row.status === "canceled"}
                      id={row.id}
                    />
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function StatusBadge({ status }: { status: string }) {
  let label = "نامشخص";
  let colorClasses = "bg-gray-100 text-gray-700";

  if (status === "confirmed") {
    label = "تایید شده";
    colorClasses = "bg-teal-100 text-teal-700";
  } else if (status === "pending") {
    label = "در انتظار تایید";
    colorClasses = "bg-amber-100 text-amber-600";
  } else {
    label = "لغو شده";
    colorClasses = "bg-red-100 text-red-500";
  }

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}
