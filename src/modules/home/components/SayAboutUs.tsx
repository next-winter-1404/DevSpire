import React from "react";
import SayAboutUsSlider from "./SayAboutUsSlider";
import BigArrowRight from "../../../../public/icons/BigArrowRight";
import BigArrowLeft from "../../../../public/icons/BigArrowLeft";
import { useLocale, useTranslations } from "next-intl";


const SayAboutUs = () => {
  
  const t = useTranslations("home.sayAboutUs");
  const locale = useLocale();

  return (
    <div className="flex justify-center w-full mt-30 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-start gap-8 w-full">
        <h2 className="font-bold text-[24px] text-[#1E2022] dark:text-[#F5F5F5]">
          {t("title")}
        </h2>
        <SayAboutUsSlider/>
      </div>
    </div>
  );
};

export default SayAboutUs;
