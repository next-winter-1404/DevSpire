import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { IFavorites } from "../types";
import Image from "next/image";
import { FormatDate } from "@/utils/helper/FormatDate";
import FavoritesActionsModal from "./FavoritesActionModal";

export default function FavoritesTable({ data }: { data: IFavorites[] }) {
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
          <th className="py-4 px-4">آدرس</th>
          <th className="py-4 px-4 text-center">امتیاز</th>
          <th className="py-4 px-4">قیمت</th>
          <th className="py-4 px-4 text-center">عملیات</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className="border-b border-[#DDDDDD] hover:bg-slate-50
             dark:hover:bg-slate-800/40 transition-colors"
          >
            <td className="py-4 px-4 text-gray-600">
              <div className="flex items-center gap-3">
                <div className=" relative w-10 h-10 rounded-full bg-[#777777]/50 overflow-hidden">
                  {row.house?.photos?.[3] && (
                    <Image
                      src={row.house.photos[0]}
                      alt={row.house.title}
                      fill
                      className=" object-cover"
                    />
                  )}
                </div>

                <span>{row.house?.title}</span>
              </div>
            </td>

            <td className="py-4 px-4 text-gray-500">
              {row.house?.address || "-"}
            </td>

            <td className="py-4 px-4 text-center">
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">
                {row.house?.rate} ⭐
              </span>
            </td>

            <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
              {parseInt(row.house?.price || "0").toLocaleString()} تومان
            </td>

            <td className="py-4 px-4 text-center relative">
              <button
                onClick={() => toggleMenu(row.id)}
                className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {openMenuId === row.id && (
                <div ref={menuRef}>
                  <FavoritesActionsModal id={row.id} houseId={row.house.id} />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
