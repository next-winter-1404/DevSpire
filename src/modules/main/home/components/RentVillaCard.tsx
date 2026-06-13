import Image from "next/image";
import Link from "next/link";
import React from "react";
import BigArrowLink from "../../../../../public/icons/BigArrowLink";
import RentVillaImg from "../../../../../public/images/home/villa-estate.png";
import { useLocale, useTranslations } from "next-intl";
import { THouse } from "@/components/common/types";

const RentVillaCard = ({ item }: { item: THouse }) => {
  const t = useTranslations("home.rentVillaCard");
  const locale = useLocale();

  return (
    <div
      className="flex gap-4 w-full p-2 bg-[#F5F5F5] rounded-[24px] h-[150px]
     sm:w-[320px] dark:bg-[#404040]"
    >
      <div className="relative w-[125px] h-full flex-shrink-0">
        <Image
          src={RentVillaImg}
          alt="rentVilla"
          fill
          className="rounded-[16px] object-cover"
        />
      </div>

      <div className="flex flex-col justify-between w-full py-1">
        <div className="flex flex-col items-start gap-1">
          {typeof item.location == "string" && (
            <span className="font-regular text-[18px] sm:text-[20px] text-[#1E2022] dark:text-[#E4E4E4] line-clamp-2">
              اجاره ویلا در {item.location}
            </span>
          )}
          <span className="font-regular text-[14px] sm:text-[16px] text-[#777777]">
            {item.num_comments} مورد
          </span>
        </div>

        <Link
          href={`/mortgage-rent/${item.id}`}
          className="flex justify-between items-center w-full pl-1"
        >
          <span className="font-regular text-[16px] text-[#0D3B66] dark:text-[#E4E4E4]">
            {t("seeButton")}
          </span>
          <BigArrowLink
            color="#0D3B66"
            className={`${locale == "en" ? "scale-x-[-1]" : ""}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default RentVillaCard;
