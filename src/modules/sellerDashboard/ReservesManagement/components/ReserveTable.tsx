"use client";

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
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full min-w-[850px] text-sm text-right">
          <thead className="text-gray-600 font-medium">
            <tr className="border-b border-[#DDDDDD]">
              <th className="py-4 px-4 whitespace-nowrap">نام اقامتگاه</th>
              <th className="py-4 px-4 whitespace-nowrap">اطلاعات مسافرین</th>
              <th className="py-4 px-4 whitespace-nowrap">تاریخ ثبت رزرو</th>
              <th className="py-4 px-4 whitespace-nowrap">قیمت</th>
              <th className="py-4 px-4 whitespace-nowrap text-center">
                وضعیت رزرو
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-center">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const travelersCount = row.traveler_details?.length || 0;
              const firstTraveler =
                travelersCount > 0 ? row.traveler_details![0] : null;

              return (
                <tr
                  key={row.id}
                  className="border-b border-[#DDDDDD] hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-500 align-middle">
                    <span className="line-clamp-1">
                      {row.house?.title || "-"}
                    </span>
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
                    {FormatDate(row.updated_at ?? "", "fa") || "-"}
                  </td>

                  <td className="py-4 px-4 text-gray-500 align-middle whitespace-nowrap">
                    {row.house?.price
                      ? Number(row.house.price).toLocaleString()
                      : 0}{" "}
                    تومان
                  </td>

                  <td className="py-4 px-3 whitespace-nowrap text-center align-middle">
                    <StatusBadge status={row.status} />
                  </td>

                  <td className="py-4 px-4 relative text-center align-middle">
                    <button
                      onClick={() => toggleMenu(row.id)}
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {row.id === openMenuId && (
                      <div ref={menuRef}>
                        <ReserveActionsMenu
                          isPending={row.status === "pending"}
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
      </div>

      {/* Mobile Cards */}
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
                  <p className="text-xs text-gray-500">نام اقامتگاه</p>
                  <h3 className="mt-1 text-[15px] font-bold text-foreground line-clamp-2">
                    {row.house?.title || "-"}
                  </h3>
                </div>

                <div className="relative shrink-0">
                  <button
                    onClick={() => toggleMenu(row.id)}
                    className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {row.id === openMenuId && (
                    <div ref={menuRef}>
                      <ReserveActionsMenu
                        isPending={row.status === "pending"}
                        isCanceled={row.status === "canceled"}
                        id={row.id}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500">وضعیت رزرو</p>
                  <div className="mt-1">
                    <StatusBadge status={row.status} />
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-xs text-gray-500">قیمت</p>
                  <p className="mt-1 text-[15px] font-bold text-foreground">
                    {row.house?.price
                      ? Number(row.house.price).toLocaleString()
                      : 0}{" "}
                    تومان
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">مسافر اصلی</span>
                  <span className="text-sm font-medium text-foreground">
                    {firstTraveler
                      ? `${firstTraveler.firstName} ${firstTraveler.lastName}`
                      : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">تعداد مسافرین</span>
                  <span className="text-sm font-medium text-foreground">
                    {travelersCount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">تاریخ ثبت رزرو</span>
                  <span className="text-sm font-medium text-foreground">
                    {FormatDate(row.updated_at ?? "", "fa") || "-"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
