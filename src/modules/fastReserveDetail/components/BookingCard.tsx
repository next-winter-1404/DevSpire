"use client";
import CustomDatepicker from "@/components/common/CustomDatePicker";
import { FormatPrice } from "@/utils/helper/FormatPrice";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const BookingCard = () => {
  const getInsertDate = (date: Date | null) => {
    console.log("insertDate : ", date);
  };
  const getExitDate = (date: Date | null) => {
    console.log("ExitDate : ", date);
  };
  const locale = useLocale();
  const t = useTranslations("fastReserveDetail");
  return (
    <div
      className="w-full  rounded-2xl p-6 shadow-sm border border-[#dddd] dark:border-[#333333]
       bg-[#ffff]  dark:bg-[#27272A]"
    >
      <div className="flex flex-col gap-5 mb-6">
        <div className="w-full">
          {/* <input
              type="text"
              placeholder="۱۴۰۴/۰۶/۱۰"
              className={`w-full bg-gray-50 dark:bg-[#3F3F46]  border-none rounded-[24px] py-3 px-5 text-sm 
              focus:ring-2 focus:ring-blue-100 outline-none`}
            />
            <Image
              src="/icons/fastReservePage/calendar.png"
              alt="Calendar"
              className={`absolute ${locale == "fa" ? "left-5" : "right-5"} top-1/2 -translate-y-1/2 w-5 h-5 opacity-50`}
              width={18}
              height={18}
            /> */}
          <CustomDatepicker onChange={getInsertDate} label={t("insertDate")} />
        </div>

        <div className="w-full">
          <CustomDatepicker onChange={getExitDate} label={t("exitDate")} />
        </div>

        <div>
          <label className="block text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA] mb-3">
            {t("membersCount")}
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[24px] py-3 px-5  text-sm focus:ring-2
               focus:ring-blue-100 outline-none dark:bg-[#3F3F46] "
            />
          </div>
        </div>
      </div>

      <hr className="my-4 border-[#DDDDDD] dark:border-[#454545]" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="bg-red-500 text-white text-[14px] font-bold px-2 py-1 rounded-full">
            60٪ {t("discount")}
          </span>
          <span className="text-[#777777] text-[24px] line-through decoration-1">
            {locale == "fa" ? FormatPrice(5_000_000) : "5,000,000"} {t("toman")}
          </span>
        </div>
        <div className="flex justify-end items-center  ">
          <span className="text-[24px] font-bold text-[#1E2022] dark:text-[#FAFAFA] ">
            {locale == "fa" ? FormatPrice(2_500_000) : "2,500,000"}{" "}
            <span>{t("toman")}</span>
          </span>
        </div>
      </div>

      <button
        className="w-full bg-primary
       hover:bg-[#0c2a4a] text-white py-3 rounded-[24px] text-sm font-medium transition-colors"
      >
        {t("submit")}
      </button>
    </div>
  );
};

export default BookingCard;
