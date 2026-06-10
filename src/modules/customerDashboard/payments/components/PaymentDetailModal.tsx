"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import { X, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { FormatDate } from "@/utils/helper/FormatDate";
import PaymentDetailSkeleton from "./PaymentDetailSkeleton";
import { IPayment } from "../types";
import { useTranslations, useLocale } from "next-intl";

interface TPaymentDetail {
  id: number;
  userId: number;
  bookingId: number | null;
  amount: string;
  description: string;
  status: "pending" | "completed" | string;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface IProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  detail?: IPayment;
}

const PaymentDetailModal = ({ id, isOpen, onClose, detail }: IProps) => {
  const t = useTranslations("customerDashboard.payments");
const locale = useLocale();
  const { data, isPending, error } = useQuery({
    queryKey: ["PAYMENT_DETAIL", id],
    enabled: isOpen && !!id && !detail,
    queryFn: async () => {
      const res = await httpClient(`/payments/${id}`);
      return res.data as TPaymentDetail;
    },
  });
  const details = detail ?? data;
  console.log(details);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/50 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className="relative w-[92%] max-w-md rounded-2xl bg-white dark:bg-[#1f2937]
          shadow-xl border border-gray-200 dark:border-gray-700
          animate-scaleIn overflow-hidden"
      >
        <div
          className="flex items-center justify-between px-5 py-4 
          border-b border-gray-300 dark:border-gray-700"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
{t("paymentDetails")}
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-5">
          {!details && !error && <PaymentDetailSkeleton />}
          {error && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
              <p className="text-sm text-red-500">
{t("errorFetch")}
              </p>
            </div>
          )}

          {details && (
            <div className="space-y-5">
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center 
                  bg-gray-100 dark:bg-gray-800 mb-3"
                >
                  {details.status === "completed" ? (
                    <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                  ) : details.status === "pending" ? (
                    <Clock className="w-9 h-9 text-amber-500" />
                  ) : (
                    <AlertTriangle className="w-9 h-9 text-red-500" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                 {parseInt(details.amount).toLocaleString(locale)} تومان
                </h3>

                <div className="mt-2">
                  <StatusBadge status={details.status} />
                </div>
              </div>

              <div
                className="rounded-xl border border-gray-200 dark:border-gray-700 
                divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden"
              >
<InfoRow label={t("paymentId")} value={`#${details.id}`} />
               <InfoRow
  label={t("description")}
  value={details.description || t("noDescription")}
/>

               <InfoRow
  label={t("transactionId")}
  value={details.transactionId ?? "-"}
/>

                <InfoRow
label={t("transactionDate")}
                  value={
                    details.createdAt
                      ? FormatDate(details.createdAt, "fa")


                      : "-"
                  }
                />
                <InfoRow
label={t("lastUpdate")}
                  value={
                    details.updatedAt
                      ? FormatDate(details.updatedAt, "fa")

                      : "-"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-gray-100">
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
    const t = useTranslations("customerDashboard.payments");

  let label = t("unknown");
  let color = "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";

  if (status === "completed") {
    label = t("success");
    color =
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
  } else if (status === "pending") {
    label = t("pending");
    color =
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  } else if (status === "failed") {
    label = t("failed");
    color = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block ${color}`}
    >
      {label}
    </span>
  );
}
