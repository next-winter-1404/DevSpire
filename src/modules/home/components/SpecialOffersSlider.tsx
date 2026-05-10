"use client";
import { useState, useEffect } from "react";
import { GetHouses } from "../../services/api/get/GetHouses";
import SliderWrapper from "@/components/common/SliderWrapper";
import HouseCard from "@/components/common/HouseCard";

const SpecialOffersSlider = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    GetHouses({ transactionType: "rental", propertyType: "villa" }).then(
      setData,
    );
  }, []);

  if (!data || data.houses.length === 0) return <div>در حال بارگذاری...</div>;

  return (
    <div>
      <SliderWrapper>
        {data.houses?.slice(0, 5).map((property: any) => (
          <div
            key={property.id}
            dir="rtl"
            className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
          >
            <HouseCard className="w-full" property={property} transactionType="rental"/>
          </div>
        ))}
      </SliderWrapper>
    </div>
  );
};

export default SpecialOffersSlider;
