"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { IFavorites } from "../types";
import Image from "next/image";
import FavoritesActionsModal from "./FavoritesActionModal";

export default function FavoritesTable({ data }: { data: IFavorites[] }) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[850px] text-sm text-right">
          <thead className="text-gray-600 dark:text-gray-400 font-medium">
            <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
              <th className="py-4 px-4 whitespace-nowrap">نام اقامتگاه</th>
              <th className="py-4 px-4 whitespace-nowrap">آدرس</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                امتیاز
              </th>
              <th className="py-4 px-4 whitespace-nowrap">قیمت</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDDDDD] dark:divide-gray-700">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-4 px-4 text-gray-700 dark:text-gray-200 align-middle">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="relative w-10 h-10 rounded-full bg-[#777777]/20 
                    overflow-hidden shrink-0"
                    >
                      {/* {row.house?.photos?.[0] && (
                        <Image
                          src={row.house.photos[0]}
                          alt={row.house.title}
                          fill
                          className="object-cover"
                        />
                      )} */}
                    </div>

                    <span className="line-clamp-1 font-medium">
                      {row.house?.title || "-"}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle">
                  <span className="line-clamp-1">
                    {row.house?.address || "-"}
                  </span>
                </td>

                <td className="py-4 px-4 text-center align-middle">
                  <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 px-2 py-1 rounded text-xs inline-block">
                    {row.house?.rate ?? 0} ⭐
                  </span>
                </td>

                <td className="py-4 px-4 text-gray-600 dark:text-gray-300 whitespace-nowrap align-middle">
                  {Number(row.house?.price || 0).toLocaleString()} تومان
                </td>

                <td className="py-4 px-4 text-center relative align-middle">
                  <FavoritesActionsModal id={row.id} houseId={row.house_id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            موردی در علاقه‌مندی‌ها وجود ندارد.
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {data.map((row) => (
          <div
            key={row.id}
            className="relative rounded-2xl border border-[#DDDDDD] bg-[#ffff] p-4 shadow-sm dark:bg-[#1F2937] dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative w-12 h-12 rounded-full bg-[#777777]/20 overflow-hidden shrink-0">
                  {/* {row.house?.photos?.[0] && (
                    <Image
                      src={row.house.photos[0]}
                      alt={row.house.title}
                      fill
                      className="object-cover"
                    />
                  )} */}
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    نام اقامتگاه
                  </p>
                  <h3 className="mt-1 text-[15px] font-bold text-foreground line-clamp-2">
                    {row.house?.title || "-"}
                  </h3>
                </div>
              </div>

              <div className="relative shrink-0">
                <FavoritesActionsModal id={row.id} houseId={row.house_id} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">آدرس</p>
                <p className="mt-1 text-sm font-medium text-foreground line-clamp-2">
                  {row.house?.address || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  امتیاز
                </p>
                <div className="mt-1">
                  <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 px-2 py-1 rounded text-xs inline-block">
                    {row.house?.rate ?? 0} ⭐
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">قیمت</p>
                <p className="mt-1 text-sm font-medium text-foreground whitespace-nowrap">
                  {Number(row.house?.price || 0).toLocaleString()} تومان
                </p>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            موردی در علاقه‌مندی‌ها وجود ندارد.
          </div>
        )}
      </div>
    </div>
  );
}
