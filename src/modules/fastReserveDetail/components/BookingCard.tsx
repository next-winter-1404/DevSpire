"use client";

import { FormatPrice } from "@/utils/helper/FormatPrice";
import { CalendarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useDispatch } from "react-redux";
import { setBookingData } from "@/redux/slice/BookingSlice";
import { usePathname, useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";

interface IFormRes {
  insertDate: Date | null;
  exitDate: Date | null;
  travelersCount: number;
}

interface IProps {
  price: number;
  discountedPrice?: number;
}

const BookingCard = ({ price, discountedPrice }: IProps) => {
  const locale = useLocale();
  const t = useTranslations("fastReserveDetail");
  const isRtl = locale === "fa";
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormRes>();
  const watchedInsertDate = watch("insertDate");
  const onSubmit = (data: IFormRes) => {
    dispatch(
      setBookingData({
        insertDate: data.insertDate?.toISOString(),
        exitDate: data.exitDate?.toISOString(),
        travelersCount: data.travelersCount,
      }),
    );
    toast.success("اطلاعاتتان ثبت شد . برای رزرو ادامه ی مراحل را طی کنید");
    router.push(`${pathname}/booking`);
  };

  return (
    <div
      className="w-full rounded-2xl p-6 shadow-sm border border-[#dddd] dark:border-[#333333]
       bg-[#ffff] dark:bg-[#27272A]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-5 mb-6">
          <div className="flex flex-col gap-2 items-start w-full relative pb-6">
            <label className="text-[14px] text-foreground font-bold">
              تاریخ ورود
            </label>
            <Controller
              control={control}
              name={"insertDate"}
              rules={{ required: "تاریخ ورود الزامی است" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  containerClassName="w-full"
                  calendar={locale === "fa" ? persian : gregorian}
                  locale={locale === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-center"
                  value={value}
                  onChange={(date) => {
                    onChange(date?.toDate?.() || date);
                  }}
                  className={locale === "fa" ? "rmdp-persian" : ""}
                  render={(datePickerValue, openCalendar) => (
                    <div
                      onClick={openCalendar}
                      className={`w-full relative bg-[#F5F5F5] dark:bg-[#3F3F46] rounded-[40px] py-2.5 
                            text-[14px] cursor-pointer outline-none px-3 border border-transparent ${
                              errors.insertDate?.message
                                ? "border-red-500 ring-2 ring-red-500"
                                : "focus-within:ring-2 focus-within:ring-blue-500"
                            }`}
                    >
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRtl ? "left-3" : "right-3"
                        }`}
                      >
                        <CalendarIcon className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>
                      <span
                        className={`block text-gray-500 font-medium w-full ${
                          isRtl ? "text-right pl-8" : "text-left pr-8"
                        }`}
                      >
                        {datePickerValue ||
                          (locale === "fa" ? "انتخاب تاریخ" : "Select date")}
                      </span>
                    </div>
                  )}
                />
              )}
            />
            {errors.insertDate?.message && (
              <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                {errors.insertDate.message as string}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start w-full relative pb-6">
            <label className="text-[14px] text-foreground font-bold">
              تاریخ خروج
            </label>
            <Controller
              control={control}
              name={`exitDate`}
              rules={{
                required: "تاریخ خروج الزامی است",
                validate: (value) => {
                  const insert = getValues("insertDate");
                  if (insert && value && value < insert) {
                    return "تاریخ خروج نمی‌تواند قبل از تاریخ ورود باشد";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  containerClassName="w-full"
                  calendar={locale === "fa" ? persian : gregorian}
                  locale={locale === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-center"
                  minDate={watchedInsertDate || undefined}
                  value={value}
                  onChange={(date) => {
                    onChange(date?.toDate?.() || date);
                  }}
                  className={locale === "fa" ? "rmdp-persian" : ""}
                  render={(datePickerValue, openCalendar) => (
                    <div
                      onClick={openCalendar}
                      className={`w-full relative bg-[#F5F5F5] dark:bg-[#3F3F46] rounded-[40px] py-2.5 
                            text-[14px] cursor-pointer outline-none px-3 border border-transparent ${
                              errors.exitDate?.message
                                ? "border-red-500 ring-2 ring-red-500"
                                : "focus-within:ring-2 focus-within:ring-blue-500"
                            }`}
                    >
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRtl ? "left-3" : "right-3"
                        }`}
                      >
                        <CalendarIcon className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>
                      <span
                        className={`block text-gray-500 font-medium w-full ${
                          isRtl ? "text-right pl-8" : "text-left pr-8"
                        }`}
                      >
                        {datePickerValue ||
                          (locale === "fa" ? "انتخاب تاریخ" : "Select date")}
                      </span>
                    </div>
                  )}
                />
              )}
            />
            {errors.exitDate?.message && (
              <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                {errors.exitDate.message as string}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start w-full relative pb-6">
            <label className="text-[14px] font-bold text-foreground">
              {t("membersCount")}
            </label>
            <div className="relative w-full">
              <input
                type="number"
                placeholder="0"
                {...register("travelersCount", {
                  required: "تعداد نفرات الزامی است",
                  min: { value: 1, message: "حداقل باید ۱ نفر باشد" },
                  valueAsNumber: true,
                })}
                className={`w-full bg-[#F5F5F5] rounded-[40px] py-2.5 px-5 text-[14px] outline-none dark:bg-[#3F3F46] border border-transparent ${
                  errors.travelersCount
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.travelersCount?.message && (
              <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                {errors.travelersCount.message as string}
              </span>
            )}
          </div>
        </div>

        <hr className="my-4 border-[#DDDDDD] dark:border-[#454545]" />

        <div className="mb-6">
          {discountedPrice && discountedPrice > 0 ? (
            <>
              <div className="flex justify-between items-center mb-1">
                <span className="bg-red-500 text-white text-[14px] font-bold px-2 py-1 rounded-full">
                  60٪ {t("discount")}
                </span>
                <span className="text-[#777777] text-[24px] line-through decoration-1">
                  {price.toLocaleString()} {t("toman")}
                </span>
              </div>
              <div className="flex justify-end items-center">
                <span className="text-[24px] font-bold text-[#1E2022] dark:text-[#FAFAFA]">
                  {discountedPrice.toLocaleString()} <span>{t("toman")}</span>
                </span>
              </div>
            </>
          ) : (
            <div className="flex justify-end items-center">
              <span className="text-[24px] font-bold text-[#1E2022] dark:text-[#FAFAFA]">
                {price.toLocaleString()} <span>{t("toman")}</span>
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-[#0c2a4a] text-white py-3 rounded-[24px] text-[16px] font-medium
           transition-colors cursor-pointer "
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default BookingCard;
