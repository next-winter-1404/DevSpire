"use client";

import { useState, useEffect } from "react";
import { IGetPayment } from "../types";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";

type PaymentFormData = {
  cardNumber: string;
  cvv2: string;
  expYear: string;
  expMonth: string;
  otp: string;
};
export default function MockPaymentView({
  paymentData,
}: {
  paymentData: IGetPayment;
}) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    mode: "onBlur",
  });

  const data = paymentData;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const onSubmit = (data: PaymentFormData) => {
    toast.success(
      "اطلاعات پرداحت شما با موفقیت ثبت شد ! درحال بررسیه وضعیت هستیم ",
    );
    const houseId = localStorage.getItem("houseId");
    router.push(
      `/fast-reserve/${houseId}/booking?step=5&paymentId=${paymentData.id}&status=success`,
    );
    localStorage.removeItem("houseId");
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-blue-600 text-white md:w-1/3 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b border-blue-400 pb-4">
              درگاه تست
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-200">شماره پذیرنده:</span>
                <span>{data.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">شماره سفارش:</span>
                <span>{data.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">کد تراکنش:</span>
                <span>{data.id}</span>
              </div>
              <div className="flex justify-between items-center mt-6 p-4 bg-blue-700 rounded-lg">
                <span className="text-blue-200">مبلغ قابل پرداخت:</span>
                <div className="text-left">
                  <span className="text-2xl font-bold block">
                    {parseInt(data.amount).toLocaleString()}
                  </span>
                  <span className="text-xs text-blue-300">تومان</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center bg-blue-700/50 py-3 rounded-lg">
            <p className="text-sm text-blue-200 mb-1">زمان باقیمانده</p>
            <p className="text-3xl font-mono" dir="ltr">
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        <div className="md:w-2/3 p-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            اطلاعات کارت بانکی
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شماره کارت
              </label>
              <input
                type="text"
                dir="ltr"
                placeholder="1234567812345678"
                className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg ${
                  errors.cardNumber
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                maxLength={16}
                {...register("cardNumber", {
                  required: "وارد کردن شماره کارت الزامی است",
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: "شماره کارت باید ۱۶ رقم عدد باشد",
                  },
                })}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.cardNumber?.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره شناسایی (CVV2)
                </label>
                <input
                  type="password"
                  dir="ltr"
                  placeholder="***"
                  className={`w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 text-center tracking-widest ${
                    errors.cvv2 ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  maxLength={4}
                  {...register("cvv2", {
                    required: "CVV2 الزامی است",
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: "باید ۳ یا ۴ رقم باشد",
                    },
                  })}
                />
                {errors.cvv2 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cvv2.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ انقضا
                </label>
                <div className="flex items-center gap-2" dir="ltr">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="سال"
                      className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 text-center ${
                        errors.expYear
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      maxLength={2}
                      {...register("expYear", {
                        required: "الزامی",
                        pattern: {
                          value: /^[0-9]{2}$/,
                          message: "نامعتبر",
                        },
                      })}
                    />
                  </div>
                  <span className="text-gray-400">/</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="ماه"
                      className={`w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 text-center ${
                        errors.expMonth
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      maxLength={2}
                      {...register("expMonth", {
                        required: "الزامی",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])$/,
                          message: "نامعتبر",
                        },
                      })}
                    />
                  </div>
                </div>
                {(errors.expYear || errors.expMonth) && (
                  <p className="text-red-500 text-xs mt-1 text-right">
                    تاریخ انقضا نامعتبر است
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز پویا
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="password"
                    dir="ltr"
                    placeholder="******"
                    className={`w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 text-center 
                        tracking-widest ${
                          errors.otp
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                    maxLength={6}
                    {...register("otp", {
                      required: "رمز پویا الزامی است",
                      pattern: {
                        value: /^[0-9]{5,6}$/,
                        message: "رمز باید ۵ یا ۶ رقم باشد",
                      },
                    })}
                  />
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg
                   text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                >
                  دریافت رمز
                </button>
              </div>
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="pt-6 flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting || timeLeft === 0}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "در حال پردازش..." : "پرداخت"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="flex-1 bg-red-100 text-red-600 py-3 px-4 rounded-lg font-medium text-lg
                 hover:bg-red-200 focus:ring-4 focus:ring-red-100 transition"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
