"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, User } from "lucide-react";
import Image from "next/image";
import { TUser } from "@/modules/mortgageRentDetail/types";
import { FormatDate } from "@/utils/helper/FormatDate";
import UsersManagementActionsModal from "./UsersManagementActionModal";
import { useTranslations, useLocale } from "next-intl";

export default function UserManagementTable({ data }: { data: TUser[] }) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const t = useTranslations("adminDashboard.users");
  const locale = useLocale();

  const renderRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <span className="bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 px-2 py-1 rounded text-xs">
            {t("admin")}          </span>
        );
      case "buyer":
        return (
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 px-2 py-1 rounded text-xs">
            {t("buyer")}          </span>
        );
      case "seller":
        return (
          <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-1 rounded text-xs">
            {t("seller")}          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[1050px] text-sm text-right">
          <thead className="text-gray-600 dark:text-gray-400 font-medium">
            <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
              <th className="py-4 px-4 whitespace-nowrap">{t("user")}</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">{t("role")}</th>
              <th className="py-4 px-4 whitespace-nowrap"> {t("phoneNumber")}</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
{t("phoneNumber")}              </th>
              <th className="py-4 px-4 whitespace-nowrap"> {t("membershipDate")}</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                {t("actions")}
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
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                      {row.profilePicture ? (
                        <Image
                          src={"/images/fastReservePage/NoImage.png"}
                          alt={
                            row.fullName || `${row.firstName} ${row.lastName}`
                          }
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-foreground line-clamp-1">
                        {row.firstName} {row.lastName}
                      </span>
                      <span className="text-xs text-gray-400 mt-1 line-clamp-1">
                        {row.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 text-center align-middle">
                  {renderRoleBadge(row.role)}
                </td>

                <td
                  className="py-4 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap align-middle"
                  dir="ltr"
                >
                  {row.phoneNumber ? (
                    <span className="text-right inline-block w-full">
                      {row.phoneNumber}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="py-4 px-4 text-center align-middle">
                  {row.emailVerified ? (
                    <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-100 dark:border-emerald-500/20">
{t("emailVerified")}                    </span>
                  ) : (
                    <span className="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 px-2 py-1 rounded text-xs border border-rose-100 dark:border-rose-500/20">
{t("emailNotVerified")}                    </span>
                  )}
                </td>

                <td className="py-4 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap align-middle">
                  {FormatDate(row.createdAt, "fa") || "-"}
                </td>

                <td className="py-4 px-4 text-center relative align-middle">
                  <UsersManagementActionsModal id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
{t("noUsers")}
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {data.map((row) => (
          <div
            key={row.id}
            className="relative rounded-2xl border border-[#DDDDDD] bg-white p-4 shadow-sm dark:bg-[#1F2937] dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                  {row.profilePicture ? (
                    <Image
                      // src={row.profilePicture}
                      src={"/images/fastReservePage/NoImage.png"}
                      alt={row.fullName || `${row.firstName} ${row.lastName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("user")}

                  </p>
                  <h3 className="mt-1 text-[15px] font-bold text-foreground line-clamp-1">
                    {row.firstName} {row.lastName}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 line-clamp-1">
                    {row.email}
                  </p>
                </div>
              </div>

              <div className="relative shrink-0">
                <UsersManagementActionsModal id={row.id} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t("role")}
</p>
                <div className="mt-1">{renderRoleBadge(row.role)}</div>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
{t("emailStatus")}
                </p>
                <div className="mt-1">
                  {row.emailVerified ? (
                    <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-100 dark:border-emerald-500/20">
{t("emailVerified")}                      </span>
                  ) : (
                    <span className="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 px-2 py-1 rounded text-xs border border-rose-100 dark:border-rose-500/20">
                 {t("emailNotVerified")} 
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
{t("phoneNumber")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground whitespace-nowrap">
                  {row.phoneNumber || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
{t("membershipDate")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground whitespace-nowrap">
                  {FormatDate(row.createdAt, "fa") || "-"}
                </p>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
{t("noUsers")}
          </div>
        )}
      </div>
    </div>
  );
}
