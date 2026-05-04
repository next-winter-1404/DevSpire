"use client";
import React from "react";
import { useTranslations } from "next-intl";
import FastSearchForm from "@/components/common/FastSearchForm";

const HeroSection = () => {
  const t = useTranslations("home.heroSection");

  return (
    <div className="flex justify-center mt-6 px-4 sm:px-6 lg:px-10 w-full">
      <div
        className="heroSectionBG w-full  flex flex-col items-center bg-cover rounded-[32px] md:rounded-[48px] overflow-hidden relative"
        style={{ backgroundImage: `url('/images/home/herosection.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div
          className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 items-center
         justify-between w-full py-10 px-6 sm:px-10 lg:px-14 relative z-10"
        >
          <div className="w-full lg:w-auto flex justify-center">
            <FastSearchForm />
          </div>

          <div className="flex flex-col gap-4 md:gap-6 w-full max-w-full lg:max-w-[600px] xl:max-w-[650px] text-center lg:text-start items-center lg:items-start">
            <h1 className="font-bold text-[24px] md:text-[36px] text-white leading-tight">
              {t("title")}
            </h1>
            <p className="font-regular text-[16px] md:text-[24px] text-white">
              {t("description")}
            </p>
            <div>
              <button className="mt-2 py-2 px-6 text-white border border-white rounded-[48px] cursor-pointer hover:bg-white/20 hover:text-black transition-colors duration-300">
                {t("mortgageButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
