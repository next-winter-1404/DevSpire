"use client";
import { useEffect, useRef, useState } from "react";
import { MoreVertical, User } from "lucide-react";
import Image from "next/image";
import { TUser } from "@/modules/mortgageRentDetail/types";
import { FormatDate } from "@/utils/helper/FormatDate";
import UsersManagementActionsModal from "./UsersManagementActionModal";

export default function UserManagementTable({ data }: { data: TUser[] }) {
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

  const renderRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
            ادمین
          </span>
        );
      case "buyer":
        return (
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            خریدار
          </span>
        );
      case "seller":
        return (
          <span
            className="bg-emerald-100 text-emerald-700 px-2 
          py-1 rounded text-xs"
          >
            فروشنده
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {role}
          </span>
        );
    }
  };

  return (
    <table className="w-full text-sm text-right">
      <thead className="text-gray-600 font-medium">
        <tr className="border-b border-[#DDDDDD]">
          <th className="py-4 px-4">کاربر</th>
          <th className="py-4 px-4 text-center">نقش</th>
          <th className="py-4 px-4">شماره تماس</th>
          <th className="py-4 px-4 text-center">وضعیت ایمیل</th>
          <th className="py-4 px-4">تاریخ عضویت</th>
          <th className="py-4 px-4 text-center">عملیات</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className="border-b border-[#DDDDDD] 
             hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <td className="py-4 px-4 text-gray-600">
              <div className="flex items-center gap-3">
                <div
                  className="relative w-10 h-10 flex items-center justify-center 
                rounded-full bg-slate-200 overflow-hidden shrink-0"
                >
                  {row.profilePicture ? (
                    <Image
                      src={"/images/fastReservePage/NoImage.png"}
                      alt={row.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {row.firstName} {row.lastName}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {row.email}
                  </span>
                </div>
              </div>
            </td>

            <td className="py-4 px-4 text-center">
              {renderRoleBadge(row.role)}
            </td>

            <td className="py-4 px-4 text-gray-500 whitespace-nowrap" dir="ltr">
              {row.phoneNumber ? (
                <span className="text-right inline-block w-full">
                  {row.phoneNumber}
                </span>
              ) : (
                "-"
              )}
            </td>

            <td className="py-4 px-4 text-center">
              {row.emailVerified ? (
                <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs border border-emerald-100">
                  تایید شده
                </span>
              ) : (
                <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded text-xs border border-rose-100">
                  تایید نشده
                </span>
              )}
            </td>

            <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
              {FormatDate(row.createdAt, "fa") || "-"}
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
                  <UsersManagementActionsModal id={row.id} />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
