import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";



const WhyChooseUs = () => {

  const t = useTranslations("home.whyChooseUs");
  return (
    <div className="flex justify-between items-center w-full mt-30 mx-auto p-12 bg-[#F5F5F5]   dark:bg-[#404040]">
      <div className="flex flex-col gap-6 w-[723px]">
        <h2 className="font-bold text-[32px] text-[#0D3B66]   dark:text-[#F5F5F5]">
          {t("title")}
        </h2>
        <p className="font-regular text-[20px] text-[#1E2022]   dark:text-[#E4E4E4]">
          {t("text")}
        </p>
      </div>
      <Image
        src={'/images/home/Furniture store-amico 1.svg'}
        alt="whyChooseUsImg"
        width={480}
        height={480}
        className="hidden w-[120px] h-[120px]   md:block md:w-[480px] md:h-[480px]"
      />
    </div>
  );

};

export default WhyChooseUs;
