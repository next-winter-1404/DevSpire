"use client";
import React, { useEffect, useState } from "react";
import SliderWrapper from "@/components/common/SliderWrapper";
import { GetHouses } from "@/modules/services/api/get/GetHouses";
import HouseCard from "@/components/common/HouseCard";

const BestChoiceSlider = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    GetHouses({ transactionType: "reservation", propertyType: "" }).then(
      setData,
    );
  }, []);

  if (!data || data.houses.length === 0) return <div>در حال بارگذاری...</div>;

  return (
    <SliderWrapper>
      {data.houses?.slice(0, 5).map((property: any) => (
        <div
          key={property.id}
          dir="rtl"
          className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
        >
          <HouseCard className="w-full" property={property} transactionType="reservation"/>
        </div>
      ))}
    </SliderWrapper>
  );
};

export default BestChoiceSlider;
