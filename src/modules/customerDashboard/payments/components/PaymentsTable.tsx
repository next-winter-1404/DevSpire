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
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOpen = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(null);
      }
    };

    document.addEventListener("mousedown", handleOpen);
    return () => document.removeEventListener("mousedown", handleOpen);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="text-gray-600 dark:text-gray-400 font-medium dark:bg-gray-800/50">
          <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
            <th className="py-4 px-4 whitespace-nowrap">شناسه پرداخت</th>
            <th className="py-4 px-4">توضیحات</th>
            <th className="py-4 px-4">مبلغ (تومان)</th>
            <th className="py-4 px-4">تاریخ تراکنش</th>
            <th className="py-4 px-4 text-center">وضعیت</th>
            <th className="py-4 px-4 text-center">عملیات</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#DDDDDD] dark:divide-gray-700">
          {data?.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle font-mono">
                #{row.id}
              </td>

              <td className="py-4 px-4 text-gray-700 dark:text-gray-200 align-middle max-w-[200px] truncate">
                {row.description || "بدون توضیح"}
              </td>

              <td className="py-4 px-4 text-gray-900 dark:text-gray-100 align-middle font-semibold whitespace-nowrap">
                {parseInt(row.amount).toLocaleString("fa-IR")}
              </td>

              <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle whitespace-nowrap">
                {row.createdAt ? FormatDate(row.createdAt, "fa") : "-"}
              </td>

              <td className="py-4 px-3 whitespace-nowrap text-center align-middle">
                <StatusBadge status={row.status} />
              </td>

              <td className="relative text-center align-middle">
                {role == "buyer" ? (
                  <button
                    onClick={() => setOpenModal(row.id)}
                    className="p-1.5 rounded-full hover:bg-gray-200
                   dark:hover:bg-gray-700 text-gray-500 transition-all"
                  >
                    <Newspaper />
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenModal(row.id)}
                    className="p-1.5 rounded-full hover:bg-gray-200
                   dark:hover:bg-gray-700 text-gray-500 transition-all"
                  >
                    <MoreVertical />
                  </button>
                )}
                {role == "seller" &&
                  openModal !== null &&
                  openModal == row.id && (
                    <div ref={modalRef}>
                      <PaymentsActionsMenu detail={row} id={openModal} />
                    </div>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {role == "buyer" && openModal !== null && (
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
