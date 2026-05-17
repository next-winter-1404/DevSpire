"use client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPayment } from "../services/Post/verifyPayment";
import toast from "react-hot-toast";
import axios from "axios";
import { CheckCircle2, Ticket, Home, XCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

const BookingStepFive = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") ?? "";

  const [status, setStatus] = useState<string | null>(
    searchParams.get("status") ?? null,
  );

  // const { mutate: verify, isPending } = useMutation({
  //   mutationFn: async () => await verifyPayment(paymentId),
  //   onSuccess: (res) => {
  //     toast.success(res?.data?.message || "پرداخت شما با موفقیت تایید شد ");
  //     setStatus("success");
  //   },
  //   onError: (err) => {
  //     if (axios.isAxiosError(err)) {
  //       toast.error(
  //         err.response?.data?.message ||
  //           "مشکلی در پرداخت تایید پرداخت شما پیش امده !",
  //       );
  //     }
  //     setStatus("failed");
  //   },
  // });
  // useEffect(() => {
  //   verify();
  // }, []);

  if (!paymentId) {
    return notFound();
  }
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-[32px] border border-gray-100 bg-white p-6 shadow-xl md:p-10"
      >
        {status == "pending" && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-blue-700 border-t-transparent" />

            <h2 className="text-2xl font-bold text-foreground">
              در حال تایید پرداخت...
            </h2>

            <p className="mt-3 text-center leading-8 text-gray-500">
              لطفاً چند لحظه صبر کنید
            </p>
          </div>
        )}

        {status !== "pending" && status === "success" && (
          <>
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-3xl" />

                <CheckCircle2 className="relative h-28 w-28 text-green-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h1 className="mb-4 text-3xl font-extrabold text-foreground">
                  پرداخت با موفقیت انجام شد 🎉
                </h1>

                <p className="mx-auto max-w-md leading-8 text-gray-500">
                  رزرو شما بعد از تایید مالک ثبت میشود
                </p>
              </motion.div>
            </div>

            <div className="mt-10 rounded-3xl border border-green-100 bg-green-50 p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">وضعیت پرداخت</span>

                <span className="rounded-full bg-green-500 px-4 py-1 text-sm font-medium text-white">
                  موفق
                </span>
              </div>

              <div className="my-5 h-px bg-green-100" />

              <div className="flex items-center justify-between">
                <span className="text-gray-500">کد پرداخت</span>

                <span className="font-bold text-foreground">{paymentId}</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 md:flex-row">
              <Link
                href="/"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-300 
                px-5 py-4 text-[18px] font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <Home size={20} />
                بازگشت به صفحه اصلی
              </Link>

              <Link
                href="/dashboard/my-tickets"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 
                py-4 text-[18px] font-medium text-white transition hover:opacity-90"
              >
                <Ticket size={20} />
                بلیط‌های من
              </Link>
            </div>
          </>
        )}

        {status !== "pending" && status !== "success" && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-foreground">
              پرداخت ناموفق بود
            </h2>

            <p className="max-w-md leading-8 text-gray-500">
              متأسفانه تایید پرداخت انجام نشد. در صورت کسر وجه، مبلغ طی ۷۲ ساعت
              آینده به حساب شما باز خواهد گشت.
            </p>

            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 md:flex-row">
              <Link
                href="/"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-300 px-5 py-4 text-[18px] font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <Home size={20} />
                صفحه اصلی
              </Link>

              {/* <button
                onClick={() => verify()}
                className="flex flex-1 items-center justify-center rounded-2xl bg-red-500 px-5 py-4 
                text-[18px] font-medium text-white transition hover:bg-red-600"
              >
                تلاش مجدد
              </button> */}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingStepFive;
