import {
  IPassenger,
  TBookingRequest,
  TravelerDetail,
} from "@/modules/booking/types";
import moment from "jalali-moment";
import { CalendarIcon, Clock11, Trash, UserPlus } from "lucide-react";
import { useLocale } from "next-intl";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

/* eslint-disable @typescript-eslint/no-explicit-any */

const PassengerFormCard = ({
  append,
  register,
  control,
  fields,
  errors,
  remove,
}: any) => {
  const locale = useLocale();
  const isRtl = locale == "fa";
  const t = useTranslations("booking.form");

  const formatDisplayDate = (dateObj: DateObject | Date | null | any) => {
    if (!dateObj) return "";
    const date = dateObj instanceof DateObject ? dateObj.toDate() : dateObj;
    return moment(date)
      .locale(locale === "fa" ? "fa" : "en")
      .format("YYYY/MM/DD");
  };

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A]">
      <h2 className="text-foreground font-bold text-[24px] mb-6">
        {t("travelerInfo")}
      </h2>
      <div className="w-full flex flex-col gap-4  ">
        {fields.map((Item: IPassenger, index: number) => {
          const passengerErrors = errors?.traveler_details?.[index];
          return (
            <div
              className="w-full flex flex-col gap-3 md:gap-6 md:flex-row md:flex-nowrap  items-center
            py-2  border-b border-primary border-dashed"
              key={index}
            >
              <div className="flex flex-col gap-2 items-start w-full relative pb-6">
                <label className="text-[14px] text-foreground font-bold">
                  <label>{t("firstName")}</label>
                </label>
                <input
                  defaultValue={Item.firstName}
                  placeholder={t("firstNamePlaceholder")}
                  {...register(`traveler_details.${index}.firstName`, {
                    required: t("firstNameRequired")
                    ,
                  })}
                  className={`w-full  placeholder:text-[#777777] text-foreground bg-[#F5F5F5]
                     dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${passengerErrors?.firstName
                      ? " border border-red-500 focus:ring-red-500"
                      : " focus:ring-blue-500"
                    }`}
                />
                {passengerErrors?.firstName && (
                  <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                    {passengerErrors.firstName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 items-start w-full relative pb-6">
                <label className="text-[14px] text-foreground font-bold">
                  <label>{t("lastName")}</label>
                </label>
                <input
                  defaultValue={Item.lastName}
                  placeholder={t("lastNamePlaceholder")}
                  {...register(`traveler_details.${index}.lastName`, {
                    required: t("lastNameRequired")
                    ,
                  })}
                  className={`w-full  placeholder:text-[#777777] text-foreground
                     bg-[#F5F5F5] dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${passengerErrors?.lastName
                      ? " border border-red-500 focus:ring-red-500"
                      : " focus:ring-blue-500"
                    }`}
                />
                {passengerErrors?.lastName && (
                  <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                    {passengerErrors.lastName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 items-start w-full relative pb-6">
                <label className="text-[14px] text-foreground font-bold">
                  {t("gender")}                </label>
                <select
                  defaultValue={Item.gender}
                  {...register(`traveler_details.${index}.gender`, {
                    required: t("genderRequired")
                    ,
                  })}
                  className={`w-full  placeholder:text-[#777777] text-foreground bg-[#F5F5F5]
                     dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${passengerErrors?.gender
                      ? " border border-red-500 focus:ring-red-500"
                      : " focus:ring-blue-500"
                    }`}
                >
                  <option value="male">{t("male")}</option>
                  <option value="female">{t("female")}</option>

                </select>
                {passengerErrors?.gender && (
                  <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                    {passengerErrors.gender.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 items-start w-full relative pb-6">
                <label className="text-[14px] text-foreground font-bold">
                  {t("nationalId")}                </label>
                <input
                  defaultValue={Item.nationalId}
                  placeholder={t("nationalIdPlaceholder")}
                  {...register(`traveler_details.${index}.nationalId`, {
                    required: t("nationalIdRequired")
                    ,
                    minLength: {
                      value: 10,
                      message: t("nationalIdMin")
                      ,
                    },
                    maxLength: {
                      value: 10,
                      message: t("nationalIdMax"),
                    },
                    validate: (value: string, formValues: TBookingRequest) => {
                      const travelers = formValues?.traveler_details || [];

                      const duplicateCount = travelers.filter(
                        (t) => t.nationalId === value,
                      ).length;

                      return (
                        duplicateCount <= 1 ||
                        "این کد ملی تکراری و برای مسافر دیگری وارد شده"
                      );
                    },
                  })}
                  className={`w-full  placeholder:text-[#777777] text-foreground bg-[#F5F5F5]
                     dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${passengerErrors?.nationalId
                      ? "border border-red-500 focus:ring-red-500"
                      : " focus:ring-blue-500"
                    }`}
                />
                {passengerErrors?.nationalId && (
                  <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                    {passengerErrors.nationalId.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 items-start w-full relative pb-6">
                <label className="text-[14px] text-foreground font-bold">
                  {t("birthDate")}                </label>
                <Controller
                  control={control}
                  name={`traveler_details.${index}.birthDate`}
                  rules={{ required: t("birthDateRequired") }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      containerClassName="w-full"
                      calendar={locale === "fa" ? persian : gregorian}
                      locale={locale === "fa" ? persian_fa : gregorian_en}
                      calendarPosition="bottom-center"
                      value={value || Item.birthDate}
                      onChange={(date) => {
                        onChange(date?.toDate?.().toISOString() || date);
                      }}
                      className={locale === "fa" ? "rmdp-persian" : ""}
                      render={(datePickerValue, openCalendar) => (
                        <div
                          onClick={openCalendar}
                          className={`w-full  relative  bg-[#F5F5F5] dark:bg-[#3F3F46] rounded-[40px] p-3.5 
                            text-[14px] cursor-pointer outline-none focus-within:ring-2 px-3 ${passengerErrors?.birthDate
                              ? "border border-red-500 focus-within:ring-red-500"
                              : " focus-within:ring-blue-500"
                            }`}
                        >
                          <div
                            className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3" : "right-3"
                              }`}
                          >
                            <CalendarIcon className="w-5 h-5 text-gray-400 shrink-0" />
                          </div>
                          <span
                            className={` text-gray-500 font-medium w-full ${isRtl ? "text-right pl-8" : "text-left pr-8"
                              }`}
                          >
                            {datePickerValue ||
                              (locale === "fa" ? t("selectDate") : t("selectDate"))
                            }
                          </span>
                        </div>
                      )}
                    />
                  )}
                />
                {passengerErrors?.birthDate && (
                  <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
                    {passengerErrors.birthDate.message as string}
                  </span>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:bg-red-100 p-2 
                  rounded-[40px]  "
                >
                  <Trash size={20} />
                </button>
              )}
            </div>
          );
        })}
        <div className="w-full flex flex-col-reverse  gap-3 md:gap-0 md:flex-row md:justify-between items-center">
          {/* <button
            type="button"
            className="flex items-center gap-2 text-[16px] text-primary border border-primary
           font-bold hover:bg-blue-50 px-3 py-2 rounded-[16px] transition-colors"
          >
            <Clock11 size={20} />
            انتخاب مسافران سابق
          </button> */}
          <button
            type="button"
            onClick={() =>
              append({
                firstName: "",
                lastName: "",
                gender: "male",
                nationalId: "",
                birthDate: "",
              })
            }
            className="flex items-center gap-2 text-[16px] text-primary border border-primary
           font-bold hover:bg-blue-50 px-3 py-2 whitespace-nowrap rounded-[16px] transition-colors"
          >
            <UserPlus size={20} />
            {t("addTraveler")}
            {" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerFormCard;
