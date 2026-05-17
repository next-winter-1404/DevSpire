import React from "react";
import Search from "../../../../../public/icons/Search";
import { useLocale, useTranslations } from "next-intl";
import Filter from "../../../../../public/icons/Filter";
import Plus from "../../../../../public/icons/Plus";

const EstatesManagementView = () => {
  const t = useTranslations("sellerDashboard.estatesManagement");

  const locale = useLocale();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
          {t("estatesManagement")}
        </h1>
        <div className="flex gap-4">
          <div className="relative text-[#777777]   dark:text-[#E4E4E4]">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-[440px] h-12 indent-5 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]   
            dark:bg-[#777777] dark:border-[#A3A3A3]"
            />
            <Search
              className={`absolute top-[30%] ${locale == "en" ? "right-5" : "left-5"}`}
            />
          </div>
          <button
            className="flex items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]
          dark:text-[#E6EDF5] dark:bg-transparent dark:border-[#E6EDF5]"
          >
            <Filter />
            <span className="font-regular text-[16px]">{t("filtersBtn")}</span>
          </button>
          <button
            className="flex items-center gap-3 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]
          dark:text-[#0D3B66] dark:bg-[#E6EDF5]"
          >
            <Plus />
            <span className="font-regular text-[16px]">
              {t("addEstateBtn")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstatesManagementView;
