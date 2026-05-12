"use client";
import React from "react";
import CategoryBigCard from "./CategoryBigCard";
import CategorySmallCard from "./CategorySmallCard";
import { useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations("home.categories");

  return (
    <div className="flex justify-center mt-30">
      <div className="flex flex-col items-start gap-8">
        <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
          {t("title")}
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-10">
          <CategoryBigCard
            title={t("apartment")}
            imageUrl="/images/home/apartment.jpg"
          />
          <div className="flex flex-col gap-10">
            <CategorySmallCard
              title={t("villaEstate")}
              imageUrl="/images/home/villa-estate.png"
            />
            <CategorySmallCard
              title={t("withSwimmingPool")}
              imageUrl="/images/home/with-swimmingpool.jpg"
            />
          </div>
          <div className="flex flex-col gap-10">
            <CategorySmallCard
              title={t("cottageEstate")}
              imageUrl="/images/home/cottage-estate.jpg"
            />
            <CategorySmallCard
              title={t("coastalEstate")}
              imageUrl="/images/home/coastal-estate.png"
            />
            {/* {data?.map((item, index) => (
              <CategorySmallCard
                imageUrl="/jjj"
                title={item.name}
                key={index}
              />
            ))} */}
          </div>
          <CategoryBigCard
            title={t("ecotourism")}
            imageUrl="/images/home/ecotourism.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
