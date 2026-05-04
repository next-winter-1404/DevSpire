import React from "react";
import SayAboutUsSlider from "./SayAboutUsSlider";
import BigArrowRight from "../../../../public/icons/BigArrowRight";
import BigArrowLeft from "../../../../public/icons/BigArrowLeft";
import { useLocale, useTranslations } from "next-intl";

const SayAboutUs = () => {
  const t = useTranslations("home.sayAboutUs");
  const locale = useLocale();

  return (
    <div className="flex justify-center mt-30 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col items-start gap-8">
          <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
            {t("title")}
          </h2>
          <SayAboutUsSlider />
        </div>
        <div className="flex gap-8">
          <BigArrowRight className={locale === "en" ? "scale-x-[-1]" : ""} />
          <BigArrowLeft className={locale === "en" ? "scale-x-[-1]" : ""} />
        </div>
      </div>
    </div>
  );
};

export default SayAboutUs;
