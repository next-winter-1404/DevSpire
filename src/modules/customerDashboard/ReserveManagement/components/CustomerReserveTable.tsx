"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { TReservation } from "@/components/common/types";
import { FormatDate } from "@/utils/helper/FormatDate";
import ReserveActionsMenu from "./CustomerReserveActionsMenu";

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
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm text-right">
          <thead className="text-gray-600 dark:text-gray-400 font-medium">
            <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
              <th className="py-4 px-4 whitespace-nowrap">نام اقامتگاه</th>
              <th className="py-4 px-4 whitespace-nowrap">اطلاعات مسافرین</th>
              <th className="py-4 px-4 whitespace-nowrap">تاریخ ثبت رزرو</th>
              <th className="py-4 px-4 whitespace-nowrap">قیمت</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                وضعیت رزرو
              </th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDDDDD] dark:divide-gray-700">
            {data.map((row) => {
              const travelersCount = row.traveler_details?.length || 0;
              const firstTraveler =
                travelersCount > 0 ? row.traveler_details![0] : null;

              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-200 align-middle">
                    <span className="line-clamp-1">
                      {row.house?.title || "-"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300 align-middle">
                    {firstTraveler ? (
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span>
                          {firstTraveler.firstName} {firstTraveler.lastName}
                        </span>

                        {travelersCount > 1 && (
                          <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-0.5 rounded-full">
                            +{travelersCount - 1} نفر
                          </span>
                        )}
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle whitespace-nowrap">
                    {FormatDate(row.created_at, "fa")}
                  </td>

                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle whitespace-nowrap">
                    {row.house?.price
                      ? Number(row.house.price).toLocaleString()
                      : 0}{" "}
                    تومان
                  </td>

                  <td className="py-4 px-3 whitespace-nowrap text-center align-middle">
                    <StatusBadge status={row.status} />
                  </td>

                  <td className="relative py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => toggleMenu(row.id)}
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                      aria-label="عملیات"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {row.id === openMenuId && (
                      <div ref={menuRef} className="relative z-10">
                        <ReserveActionsMenu id={row.id} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            رزروی برای نمایش وجود ندارد.
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {data.map((row) => {
          const travelersCount = row.traveler_details?.length || 0;
          const firstTraveler =
            travelersCount > 0 ? row.traveler_details![0] : null;

          return (
            <div
              key={row.id}
              className="relative rounded-2xl border border-[#DDDDDD] bg-white p-4 shadow-sm dark:bg-[#1F2937] dark:border-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    نام اقامتگاه
                  </p>
                  <h3 className="mt-1 text-[15px] font-bold text-foreground line-clamp-2">
                    {row.house?.title || "-"}
                  </h3>
                </div>

                <div className="relative shrink-0">
                  <button
                    onClick={() => toggleMenu(row.id)}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                    aria-label="عملیات"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {row.id === openMenuId && (
                    <div ref={menuRef} className="relative z-10">
                      <ReserveActionsMenu id={row.id} />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    اطلاعات مسافرین
                  </p>

                  {firstTraveler ? (
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {firstTraveler.firstName} {firstTraveler.lastName}
                      </span>

                      {travelersCount > 1 && (
                        <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-0.5 rounded-full">
                          +{travelersCount - 1} نفر
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-foreground">-</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    تاریخ ثبت رزرو
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground whitespace-nowrap">
                    {FormatDate(row.created_at, "fa")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    قیمت
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground whitespace-nowrap">
                    {row.house?.price
                      ? Number(row.house.price).toLocaleString()
                      : 0}{" "}
                    تومان
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    وضعیت رزرو
                  </p>
                  <div className="mt-1">
                    <StatusBadge status={row.status} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            رزروی برای نمایش وجود ندارد.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let label = "نامشخص";
  let colorClasses =
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";

  if (status === "confirmed") {
    label = "تایید شده";
    colorClasses =
      "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400";
  } else if (status === "pending") {
    label = "در انتظار تایید";
    colorClasses =
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
  } else if (status === "canceled") {
    label = "لغو شده";
    colorClasses =
      "bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400";
  }

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}
