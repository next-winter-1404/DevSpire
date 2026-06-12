"use client";

import { useState } from "react";
import { Users, BedDouble, Bath } from "lucide-react";
import Image from "next/image";
import { FormatDate } from "@/utils/helper/FormatDate";
import { THouse } from "@/components/common/types";
import ActionsModal from "./ActionsModal";

export default function UserHousesTable({
  data,
  role,
}: {
  data: THouse[];
  role: "admin" | "seller";
}) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const getTransactionTypeLabel = (type: string) => {
    return type === "mortgage"
      ? "رهن"
      : type === "rental"
        ? "اجاره"
        : type === "direct_purchase"
          ? "خرید و فروش"
          : "رزرو";
  };

  return (
    <div className="w-full">
      <div className="hidden md:block w-full overflow-x-auto ">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm text-right min-w-[900px] ">
            <thead className="font-medium">
              <tr className="border-b border-[#DDDDDD]">
                <th className="py-4 px-4 whitespace-nowrap">ملک و آدرس</th>
                <th className="py-4 px-4 whitespace-nowrap">مشخصات</th>
                <th className="py-4 px-4 whitespace-nowrap">قیمت (تومان)</th>
                <th className="py-4 px-4 whitespace-nowrap text-center">
                  امتیاز / نظرات
                </th>
                <th className="py-4 px-4 whitespace-nowrap text-center">
                  آخرین بروزرسانی
                </th>
                <th className="py-4 px-4 whitespace-nowrap text-center">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#DDDDDD] hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="relative w-10 h-10 rounded-full bg-[#777777]/50
                       overflow-hidden shrink-0"
                      >
                        {/* {row.photos?.[0] && (
                          <Image
                            src={row.photos[0]}
                            alt={row.title}
                            fill
                            className="object-cover"
                          />
                        )} */}
                      </div>

                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-bold text-[16px] text-foreground line-clamp-1">
                          {row.title}
                        </span>
                        {typeof row.location === "string" && (
                          <span className="text-xs text-gray-500 line-clamp-1 truncate max-w-[220px]">
                            {row.location}
                          </span>
                        )}

                        <div className="flex gap-1 mt-1">
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {getTransactionTypeLabel(row.transaction_type)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-gray-600 text-[16px]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1" title="ظرفیت">
                        <Users size={18} className="text-gray-400" />
                        <span>{row.capacity}</span>
                      </div>
                      <div
                        className="flex items-center gap-1"
                        title="تعداد اتاق"
                      >
                        <BedDouble size={18} className="text-gray-400" />
                        <span>{row.rooms}</span>
                      </div>
                      <div
                        className="flex items-center gap-1"
                        title="حمام و دستشویی"
                      >
                        <Bath size={18} className="text-gray-400" />
                        <span>{row.bathrooms}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {row.discounted_price ? (
                        <>
                          <span className="text-gray-400 line-through text-[16px]">
                            {parseInt(row.price).toLocaleString()}
                          </span>
                          <span className="text-foreground text-[16px] font-medium">
                            {parseInt(row.discounted_price).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-foreground text-[16px] font-medium">
                          {parseInt(row.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        {row.rate} ⭐
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center text-xs text-gray-500 whitespace-nowrap">
                    {FormatDate(row.last_updated, "fa") || "-"}
                  </td>

                  <td className="py-4 px-4 text-center relative">
                    <ActionsModal
                      role={role}
                      item={row}
                      onClose={() => setOpenMenuId(null)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {data.map((row) => (
          <div
            key={row.id}
            className="w-full rounded-2xl border border-[#DDDDDD] bg-white p-4 shadow-sm relative dark:bg-[#1F2937] dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative w-14 h-14 rounded-xl bg-[#777777]/30 overflow-hidden shrink-0">
                  {/* {row.photos?.[0] && (
                    <Image
                      src={row.photos[0]}
                      alt={row.title}
                      fill
                      className="object-cover"
                    />
                  )} */}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[15px] text-foreground line-clamp-1">
                    {row.title}
                  </span>
                  {typeof row.location === "string" && (
                    <span className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {row.location}
                    </span>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {getTransactionTypeLabel(row.transaction_type)}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold">
                      {row.rate} ⭐
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative shrink-0">
                <ActionsModal
                  role={role}
                  item={row}
                  onClose={() => setOpenMenuId(null)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
              <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-3 dark:bg-white/5">
                <div className="flex items-center gap-1 text-gray-500">
                  <Users size={16} />
                  <span className="text-xs">ظرفیت</span>
                </div>
                <span className="mt-1 font-bold text-foreground">
                  {row.capacity}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-3 dark:bg-white/5">
                <div className="flex items-center gap-1 text-gray-500">
                  <BedDouble size={16} />
                  <span className="text-xs">اتاق</span>
                </div>
                <span className="mt-1 font-bold text-foreground">
                  {row.rooms}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-3 dark:bg-white/5">
                <div className="flex items-center gap-1 text-gray-500">
                  <Bath size={16} />
                  <span className="text-xs">حمام</span>
                </div>
                <span className="mt-1 font-bold text-foreground">
                  {row.bathrooms}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#DDDDDD] pt-4 dark:border-white/10">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">قیمت</span>
                {row.discounted_price ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">
                      {parseInt(row.price).toLocaleString()}
                    </span>
                    <span className="font-bold text-[15px] text-foreground">
                      {parseInt(row.discounted_price).toLocaleString()} تومان
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-[15px] text-foreground">
                    {parseInt(row.price).toLocaleString()} تومان
                  </span>
                )}
              </div>

              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">آخرین بروزرسانی</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {FormatDate(row.last_updated, "fa") || "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
