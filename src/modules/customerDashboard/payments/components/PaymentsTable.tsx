"use client";

import { MoreVertical, Newspaper } from "lucide-react";
import { FormatDate } from "@/utils/helper/FormatDate";
import { IPayment } from "../types";
import { useEffect, useRef, useState } from "react";
import PaymentDetailModal from "./PaymentDetailModal";
import PaymentsActionsMenu from "@/modules/sellerDashboard/payments/components/SellerPaymentsActoinsModal";

export function PaymentTable({
  data,
  role,
}: {
  data: IPayment[];
  role: string;
}) {
  const [openModal, setOpenModal] = useState<number | null>(null);

  const openForRow = (id: number) => setOpenModal(id);

  return (
    <div className="w-full h-full">
      <div className="hidden md:block overflow-x-auto h-full">
        <table className="w-full min-w-[900px] text-sm text-right ">
          <thead className="text-gray-600 dark:text-gray-400 font-medium dark:bg-gray-800/50">
            <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
              <th className="py-4 px-4 whitespace-nowrap">شناسه پرداخت</th>
              <th className="py-4 px-4">توضیحات</th>
              <th className="py-4 px-4 whitespace-nowrap">مبلغ (تومان)</th>
              <th className="py-4 px-4 whitespace-nowrap">تاریخ تراکنش</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">وضعیت</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDDDDD] dark:divide-gray-700 h-full">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle font-mono whitespace-nowrap">
                  #{row.id}
                </td>

                <td className="py-4 px-4 text-gray-700 dark:text-gray-200 align-middle max-w-[260px] truncate">
                  {row.description || "بدون توضیح"}
                </td>

                <td className="py-4 px-4 text-gray-900 dark:text-gray-100 align-middle font-semibold whitespace-nowrap">
                  {Number(row.amount).toLocaleString("fa-IR")}
                </td>

                <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle whitespace-nowrap">
                  {row.createdAt ? FormatDate(row.createdAt, "fa") : "-"}
                </td>

                <td className="py-4 px-3 whitespace-nowrap text-center align-middle">
                  <StatusBadge status={row.status} />
                </td>

                <td className="relative py-4 px-4 text-center align-middle">
                  {role === "buyer" ? (
                    <button
                      onClick={() => openForRow(row.id)}
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-all"
                      aria-label="جزئیات پرداخت"
                    >
                      <Newspaper />
                    </button>
                  ) : (
                    <PaymentsActionsMenu detail={row} id={row.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            پرداختی‌ای برای نمایش وجود ندارد.
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
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  شناسه پرداخت
                </p>
                <p className="mt-1 font-mono text-[14px] font-semibold text-foreground whitespace-nowrap">
                  #{row.id}
                </p>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  توضیحات
                </p>
                <p className="mt-1 text-sm text-foreground line-clamp-2">
                  {row.description || "بدون توضیح"}
                </p>
              </div>

              <div className="relative shrink-0">
                {role === "buyer" ? (
                  <button
                    onClick={() => openForRow(row.id)}
                    className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-all"
                    aria-label="جزئیات پرداخت"
                  >
                    <Newspaper />
                  </button>
                ) : (
                  <button
                    onClick={() => openForRow(row.id)}
                    className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-all"
                    aria-label="عملیات"
                  >
                    <MoreVertical />
                  </button>
                )}

                {role === "seller" && row.id && (
                  <PaymentsActionsMenu detail={row} id={row.id} />
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  وضعیت
                </p>
                <div className="mt-1">
                  <StatusBadge status={row.status} />
                </div>
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  مبلغ (تومان)
                </p>
                <p className="mt-1 text-[15px] font-bold text-foreground whitespace-nowrap">
                  {Number(row.amount).toLocaleString("fa-IR")}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  تاریخ تراکنش
                </span>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {row.createdAt ? FormatDate(row.createdAt, "fa") : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            پرداختی‌ای برای نمایش وجود ندارد.
          </div>
        )}
      </div>

      {role === "buyer" && openModal !== null && (
        <PaymentDetailModal
          isOpen={openModal !== null}
          onClose={() => setOpenModal(null)}
          id={openModal}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let label = "نامشخص";
  let colorClasses =
    "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";

  if (status === "completed") {
    label = "موفق";
    colorClasses =
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
  } else if (status === "pending") {
    label = "در انتظار تایید";
    colorClasses =
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  } else if (status === "failed") {
    label = "ناموفق";
    colorClasses =
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}
