import { useEffect, useRef, useState } from "react";
import { MoreVertical, Home, Users, BedDouble, Bath } from "lucide-react";
import Image from "next/image";
import ActionsModal from "./ActionsModal";
import { FormatDate } from "@/utils/helper/FormatDate";
import { THouse } from "@/components/common/types";

export default function UserHousesTable({ data }: { data: THouse[] }) {
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
    <div className=" ">
      <table className="w-full text-sm text-right">
        <thead className=" font-medium">
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
            <th className="py-4 px-4 whitespace-nowrap text-center">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#DDDDDD] overflow-y-auto
              hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className=" relative w-10 h-10 rounded-full bg-[#777777]/50
                   overflow-hidden"
                  >
                    {row.photos?.[3] && (
                      <Image
                        src={row.photos[0]}
                        alt={row.title}
                        fill
                        className=" object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-[16px] text-foreground line-clamp-1">
                      {row.title}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1 truncate max-w-[200px]">
                      {row.location}
                    </span>
                    <div className="flex gap-1 mt-1">
                      <span
                        className="text-[10px] bg-blue-100 text-blue-700
                       px-2 py-0.5 rounded-full"
                      >
                        {row.transaction_type == "mortgage"
                          ? "رهن"
                          : row.transaction_type == "rental"
                            ? "اجاره"
                            : row.transaction_type == "direct_purchase"
                              ? "خرید و فروش "
                              : "رزرو"}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              <td className="py-4 px-4 text-gray-600 text-[16px] ">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1" title="ظرفیت">
                    <Users size={18} className="text-gray-400" />
                    <span>{row.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1" title="تعداد اتاق">
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

              <td className="py-4 px-4 text-center text-xs text-gray-500">
                {FormatDate(row.last_updated, "fa") || "-"}
              </td>

              <td className="py-4 px-4 text-center relative">
                <button
                  onClick={() => toggleMenu(row.id)}
                  className="p-1 rounded-md hover:bg-gray-200 text-gray-500 
                  transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {openMenuId === row.id && (
                  <div ref={menuRef}>
                    <ActionsModal
                      onClose={() => setOpenMenuId(null)}
                      item={row}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
