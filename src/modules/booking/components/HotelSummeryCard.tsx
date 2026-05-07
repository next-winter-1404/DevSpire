"use client";

import { useRouter } from "@/i18n/routing";
import { Building, Calendar, MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";

const HotelSummeryCard = () => {
  const locale = useLocale();
  const router = useRouter();
  return (
    <div
      className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD]
      flex flex-col md:flex-row items-start md:items-center justify-between 
      h-auto md:h-[195px] p-4 gap-4 md:gap-6 dark:bg-[#27272A]"
    >
      <div className="w-full md:w-2/3 h-full flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
        <div className="w-full sm:w-[180px] md:w-[30%] h-[180px] sm:h-full relative shrink-0">
          <Image
            src="/images/fastReservePage/bigHouse.png"
            alt="house"
            fill
            className="object-cover rounded-[16px] md:rounded-[8px]"
          />
        </div>

        <div className="flex-1 w-full h-full flex flex-col items-start justify-between gap-3 md:gap-0 py-1">
          <h2 className="text-[18px] md:text-[20px] font-bold text-foreground">
            هتل همایون فر کیش ایران
          </h2>

          <div className="flex items-start sm:items-center gap-2 text-[14px] md:text-[16px]">
            <Calendar className="w-4 h-4 text-[#777777] shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="text-[#777777]">تاریخ ورود :</span>
              <span className="text-foreground font-medium">
                ۱۲ شهریور ۱۴۰۴ - ساعت ۱۲:۳۰
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-2 text-[14px] md:text-[16px]">
            <Calendar className="w-4 h-4 text-[#777777] shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="text-[#777777]">تاریخ خروج :</span>
              <span className="text-foreground font-medium">
                ۱۲ شهریور ۱۴۰۴ - ساعت ۱۲:۳۰
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-2 text-[14px] md:text-[16px]">
            <MapPin className="w-4 h-4 text-[#777777] shrink-0 mt-0.5 sm:mt-0" />
            <span className="text-[#777777] shrink-0">آدرس :</span>
            <span className="text-foreground line-clamp-2 sm:truncate leading-relaxed">
              گیلان، رشت، میدان آزادی، جنب چهار راه عظیم گیلان
            </span>
          </div>
        </div>
      </div>

      <div
        className="w-full md:w-auto flex flex-row md:flex-col justify-between
       items-center md:items-end h-auto md:h-full pt-4 md:pt-0  border-dashed border-t-2
        border-gray-200 md:border-none"
      >
        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <span className="text-[#777777] line-through font-medium text-[14px] md:text-[20px]">
              ۵,۰۰۰,۰۰۰ تومان
            </span>
            <span className="bg-[#FF5555] text-[#ffff] text-[12px] md:text-[14px] font-bold px-2 py-0.5 md:py-1 rounded-full">
              %۵۰
            </span>
          </div>
          <div className="text-[18px] md:text-[24px] font-bold text-foreground">
            ۲,۵۰۰,۰۰۰{" "}
            <span className="text-[14px] md:text-[18px] font-medium">
              تومان
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push("/fast-reserve")}
          className="flex items-center justify-center gap-2 px-3 py-2 md:mt-4
          border border-[#0D3B66] text-[#0D3B66] text-[14px] md:text-base rounded-[12px] md:rounded-[16px] hover:bg-blue-50 transition-colors shrink-0"
        >
          <Building className="w-4 h-4 text-[#0D3B66]" />
          تغییر هتل
        </button>
      </div>
    </div>
  );
};

export default HotelSummeryCard;
