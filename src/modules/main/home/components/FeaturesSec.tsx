import React from "react";
import FeatureSecImg from "../../../../../public/images/home/Usability testing-pana 1.svg";
import Image from "next/image";
import FeatureSecCard from "./FeatureSecCard";
import { useTranslations } from "next-intl";

const FeaturesSec = () => {
  const t = useTranslations("home.featureSec");

  return (
    <section className="mt-16 md:mt-24 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">
        <div className="hidden lg:flex shrink-0 justify-center">
          <Image
            src={FeatureSecImg}
            alt="featureSec"
            width={480}
            height={480}
            className="w-[320px] xl:w-[420px] 2xl:w-[480px] h-auto"
            priority={false}
          />
        </div>

        <div className="w-full flex flex-col gap-8 md:gap-10">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#1E2022] dark:text-[#F5F5F5] text-center lg:text-right">
            {t("title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <div className="flex flex-col gap-8 lg:gap-10">
              <FeatureSecCard
                title={t("title1")}
                text1={t("title1text1")}
                text2={t("title1text2")}
                text3={t("title1text3")}
              />
              <FeatureSecCard
                title={t("title2")}
                text1={t("title2text1")}
                text2={t("title2text2")}
                text3={t("title2text3")}
              />
            </div>

            <div className="flex flex-col gap-8 lg:gap-10">
              <FeatureSecCard
                title={t("title3")}
                text1={t("title3text1")}
                text2={t("title3text2")}
                text3={t("title3text3")}
              />
              <FeatureSecCard
                title={t("title4")}
                text1={t("title4text1")}
                text2={t("title4text2")}
                text3={t("title4text3")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSec;
