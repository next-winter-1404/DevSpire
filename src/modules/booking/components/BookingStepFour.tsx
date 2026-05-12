"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { PostPayment } from "../services/Post/PostPayment";
import { IPaymentRequest } from "../types";
import toast from "react-hot-toast";
import { usePathname } from "@/i18n/routing";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { notFound, useSearchParams } from "next/navigation";

const BookingStepFour = () => {
  const pathname = usePathname();

  const bookingId = useSearchParams().get("bookingId");
  const amount = useSearchParams().get("amount");

  const {
    mutate: paymentReq,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["POSTPAYMENT"],
    mutationFn: (data: IPaymentRequest) => PostPayment(data),
    onSuccess: (res) => {
      toast.success("به صفحه پرداخت هدایت میشوید");
      window.location.href = res.data.paymentUrl;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          toast.error("شما دسترسی لازم برای انجام این عملیات را ندارید");
        } else if (err.response?.status == 400) {
          toast.error(err.response?.data?.message || "400 bad request");
        } else {
          toast.error("مشکلی در ارسال اطلاعات پیش آمد");
        }
      }
    },
  });
  useEffect(() => {
    if (!bookingId || !amount) return;

    paymentReq({
      bookingId: Number(bookingId),
      amount: Number(amount),
      description: "رزرو خانه",
      callbackUrl: `${window.location.origin}${pathname}?bookingId=${bookingId}`,
    });
  }, [bookingId]);

  return (
    <>
      {isPending ? (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full 
          animate-spin mb-6"
          />

          <p className="text-lg font-semibold text-gray-700">
            در حال انتقال به درگاه پرداخت
          </p>

          <p className="mt-2 text-sm text-gray-500 animate-pulse">
            لطفاً چند لحظه صبر کنید…
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-red-100 text-red-500 rounded-full mb-4 text-3xl">
            ✕
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            مشکلی در اتصال به درگاه پرداخت پیش آمد
          </p>
          <p className="text-sm text-gray-500 mb-6">
            لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.
          </p>
          <button
            onClick={() =>
              paymentReq({
                description: "رزرو خانه از سایت لوگو",
                amount,
                callbackUrl: pathname,
                bookingId,
              })
            }
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full 
          animate-spin mb-6"
          />

          <p className="text-lg font-semibold text-gray-700">
            درگاهی با مشخصات شما یافت نشد !
          </p>
        </div>
      )}
    </>
  );
};

export default BookingStepFour;
