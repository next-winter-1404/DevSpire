"use client";
import React from "react";
import HeroSectionForm from "./HeroSectionForm";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import FastSearchForm from "@/components/common/FastSearchForm";

const HeroSection = () => {
  const t = useTranslations("heroSection");
  return (
    <div className="flex justify-center mt-6 px-12">
      <div
        className="heroSectionBG relative flex flex-col gap-4 items-center py-6 px-14 bg-cover rounded-[48px] overflow-hidden 
      md:flex md:flex-row md:gap-16"
        style={{ backgroundImage: `url('/images/landing/herosection.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 flex flex-col gap-4 items-center py-6 px-14 md:flex md:flex-row md:gap-16">
          <FastSearchForm />
          <div className="flex flex-col gap-6 md:w-[651px]">
            <h1 className="font-bold text-[36px] text-[#FFFFFF]">
              {t("title")}
            </h1>
            <p className="font-regular text-[24px] text-[#FFFFFF]">
              {t("description")}
            </p>
            <div>
              <button className=" py-2 px-3 text-[#FFFFFF] border border-[#FFFFFF] rounded-[48px]">
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
