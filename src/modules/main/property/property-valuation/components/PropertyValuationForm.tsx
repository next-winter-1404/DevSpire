"use client";

import httpClient from "@/core/interceptor/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type PredictRequest = {
  size: number;
  rooms: number;
  location: string;
  amenities: string[];
};

type PredictResponse = {
  predictedPrice: number;
};

const AMENITIES = [
  "استخر",
  "سونا",
  "پارکینگ",
  "انباری",
  "آسانسور",
  "بالکن",
  "لابی",
  "جکوزی",
  "مستر",
];

export default function PropertyValuationForm() {
  const [serverError, setServerError] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const { mutate: getPredict, isPending } = useMutation({
    mutationFn: async (data: PredictRequest) => {
      try {
        const res = await httpClient.post("/recommendations/predict", data);
        return res.data as PredictResponse;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      setResult(data.predictedPrice);
      setServerError(false);
    },
    onError: (err) => {
      setServerError(true);
      if (axios.isAxiosError(err)) {
        if (err.response?.status != 401 && err.response?.status != 403) {
          toast.error(err.response?.data?.message || "مشکلی پیش آمده است");
        }
      }
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PredictRequest>({
    defaultValues: {
      size: 300,
      rooms: 3,
      location: "تهران",
      amenities: ["استخر", "سونا"],
    },
    mode: "onChange",
  });

  const selectedAmenities = watch("amenities") || [];
  const watchedValues = watch();

  const toggleAmenity = (item: string) => {
    const currentAmenities = watch("amenities") || [];
    const exists = currentAmenities.includes(item);

    const updatedAmenities = exists
      ? currentAmenities.filter((a) => a !== item)
      : [...currentAmenities, item];

    setValue("amenities", updatedAmenities, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: PredictRequest) => {
    getPredict(data);
  };

  return (
    <section className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div
        className="rounded-[28px] border border-slate-200 bg-background p-5 
      shadow-[0_10px_40px_rgba(13,59,102,0.08)] md:p-8"
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <span
              className="mb-3 inline-flex rounded-full bg-[#0d3b66]/10 px-3 py-1 
            text-xs font-medium text-[#0d3b66]"
            >
              ارزش‌گذاری هوشمند
            </span>
            <h2 className="text-2xl font-black text-[#1e2022] md:text-3xl">
              مشخصات ملک
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              اطلاعات ملک را وارد کنید تا قیمت تخمینی به‌صورت هوشمند محاسبه شود.
            </p>
          </div>

          <div className="rounded-2xl bg-[#ff7f11]/10 px-3 py-2 text-xs font-medium text-[#ff7f11]">
            {selectedAmenities.length} امکانات انتخاب شده
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              متراژ
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="مثلاً 120"
                className={`h-14 w-full rounded-2xl border bg-background px-4 text-foreground outline-none transition placeholder:text-slate-400 ${
                  errors.size
                    ? "border-[#ff5555] focus:border-[#ff5555]"
                    : "border-slate-200 focus:border-[#0d3b66]"
                }`}
                {...register("size", {
                  required: "متراژ الزامی است.",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "متراژ باید بیشتر از 0 باشد.",
                  },
                })}
              />
            </div>
            {errors.size && (
              <p className="mt-2 text-sm text-[#ff5555]">
                {errors.size.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              تعداد اتاق
            </label>
            <select
              className={`h-14 w-full rounded-2xl border bg-background px-4 text-foreground outline-none transition ${
                errors.rooms
                  ? "border-[#ff5555] focus:border-[#ff5555]"
                  : "border-slate-200 focus:border-[#0d3b66]"
              }`}
              {...register("rooms", {
                required: "تعداد اتاق الزامی است.",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "تعداد اتاق باید حداقل 1 باشد.",
                },
              })}
            >
              <option value={1}>1 اتاق</option>
              <option value={2}>2 اتاق</option>
              <option value={3}>3 اتاق</option>
              <option value={4}>4 اتاق</option>
              <option value={5}>5 اتاق یا بیشتر</option>
            </select>
            {errors.rooms && (
              <p className="mt-2 text-sm text-[#ff5555]">
                {errors.rooms.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              موقعیت ملک
            </label>
            <input
              type="text"
              placeholder="مثلاً تهران، نیاوران"
              className={`h-14 w-full rounded-2xl border bg-background px-4 text-foreground outline-none transition placeholder:text-slate-400 ${
                errors.location
                  ? "border-[#ff5555] focus:border-[#ff5555]"
                  : "border-slate-200 focus:border-[#0d3b66]"
              }`}
              {...register("location", {
                required: "موقعیت ملک الزامی است.",
                validate: (value) =>
                  value.trim().length > 0 || "موقعیت ملک الزامی است.",
              })}
            />
            {errors.location && (
              <p className="mt-2 text-sm text-[#ff5555]">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-foreground">
              امکانات رفاهی
            </label>

            <input
              type="hidden"
              {...register("amenities", {
                validate: (value) =>
                  (value && value.length > 0) ||
                  "حداقل یک امکانات رفاهی را انتخاب کنید.",
              })}
            />

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {AMENITIES.map((item) => {
                const active = selectedAmenities.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "border-[#0d3b66] bg-[#0d3b66] text-white shadow-sm"
                        : "border-slate-200 bg-background text-foreground hover:border-[#0d3b66]/30 hover:bg-[#0d3b66]/5"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {errors.amenities && (
              <p className="mt-2 text-sm text-[#ff5555]">
                {errors.amenities.message}
              </p>
            )}
          </div>

          {serverError && (
            <div
              className="rounded-2xl border border-[#ff5555]/20 bg-[#ff5555]/10 
            px-4 py-3 text-sm text-[#ff5555]"
            >
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#ff7f11] font-bold text-white transition hover:scale-[1.01] hover:bg-[#e8730d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "در حال محاسبه..." : "محاسبه ارزش ملک"}
          </button>
        </form>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-[#0d3b66] p-6 text-white shadow-[0_10px_40px_rgba(13,59,102,0.18)] md:p-8">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[#ff7f11]/20 blur-3xl" />

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white">
              خروجی مدل پیش‌بینی
            </span>

            <h3 className="mt-4 text-3xl font-black leading-tight">
              ارزش تخمینی ملک شما
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
              نتیجه بر اساس اطلاعاتی که وارد کرده‌اید نمایش داده می‌شود و
              می‌تواند مبنای اولیه‌ای برای قیمت‌گذاری دقیق‌تر باشد.
            </p>
          </div>

          <div className="my-8 rounded-[24px] bg-background p-6 text-[#1e2022] shadow-lg">
            {isPending ? (
              <div className="space-y-4">
                <Skeleton width={112} height={16} />
                <Skeleton width={224} height={46} />
                <Skeleton width={"100%"} height={14} />
                <Skeleton width={"70%"} height={12} />
              </div>
            ) : result !== null ? (
              <div>
                <div className="text-sm text-slate-500">قیمت تخمینی</div>

                <div className="mt-3 flex flex-wrap items-end gap-2">
                  <span className="text-3xl font-black text-[#0d3b66] md:text-5xl">
                    {result.toLocaleString()}
                  </span>
                  <span className="pb-1 text-base font-medium text-slate-500 md:text-lg">
                    تومان
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-slate-500">متراژ</div>
                    <div className="mt-1 font-bold text-[#1e2022]">
                      {watchedValues.size} متر
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-slate-500">اتاق</div>
                    <div className="mt-1 font-bold text-[#1e2022]">
                      {watchedValues.rooms} اتاق
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-slate-500">موقعیت</div>
                    <div className="mt-1 font-bold text-[#1e2022]">
                      {watchedValues.location}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-slate-500">امکانات</div>
                    <div className="mt-1 font-bold text-[#1e2022]">
                      {watchedValues.amenities?.length
                        ? watchedValues.amenities.join("، ")
                        : "ثبت نشده"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-sm text-slate-500">
                  هنوز محاسبه‌ای انجام نشده
                </div>
                <div className="mt-3 text-2xl font-black text-[#0d3b66] md:text-4xl">
                  منتظر اطلاعات ملک شما هستیم
                </div>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                  فرم را کامل کنید تا قیمت تقریبی ملک شما در این بخش نمایش داده
                  شود.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white/80">
            این قیمت یک تخمین هوشمند است و بهتر است در کنار تحلیل کارشناس و
            شرایط واقعی بازار بررسی شود.
          </div>
        </div>
      </div>
    </section>
  );
}
