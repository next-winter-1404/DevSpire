import { useTranslations } from "next-intl";
import React from "react";

const NeedHelp = () => {
  const t = useTranslations("home.needHelp");

  return (
    <div className="flex justify-center mt-30 px-4 sm:px-6 lg:px-10">
      <div
        className="flex flex-col gap-4 items-center w-full py-12 px-6 bg-[#0D3B66] rounded-[24px]
      md:flex-row md:justify-between md:px-20"
      >
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-bold text-[32px] text-[#FFFFFF]">{t("title")}</h2>
          <p className="font-regular text-[20px] text-[#FFFFFF]">
            {t("description")}
          </p>
        </div>
        <button
          className="h-[60px] px-8 font-regular text-[20px] text-[#FFFFFF] bg-[#FF7F11] rounded-[40px]
        md:px-20"
        >
          {t("freeConsultationBtn")}
        </button>
      </div>
    </div>
  );
};

export default NeedHelp;
