'use client'
import React, { useEffect, useState } from "react";
import RentVillaCard from "./RentVillaCard";
import { useTranslations } from "next-intl";
import { GetHouses } from "@/modules/services/api/get/GetHouses";

const RentVilla = () => {

  const t = useTranslations("home.rentVilla");

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    GetHouses({ transactionType: 'rental', propertyType: 'villa' }).then(setData);
  }, []);

  if (!data || data.length === 0) return <div>در حال بارگذاری...</div>;

  return (
    <div className="  mt-30 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex flex-col gap-10">
        <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
          {t("title")}
        </h2>
        <div className="flex flex-row flex-wrap gap-6 justify-between w-full">
          {
            data?.slice(0,5).map((item) => (
              <RentVillaCard key={item.id} item={item}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default RentVilla;
