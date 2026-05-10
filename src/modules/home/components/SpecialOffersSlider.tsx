import SliderWrapper from "@/components/common/SliderWrapper";
import { MOCK_DATA } from "../../fastReserve/mocks/data";
import React from "react";
import HouseCard from "@/components/common/HouseCard";

const SpecialOffersSlider = () => {
  return (
    <div>
      <SliderWrapper>
        {MOCK_DATA.map((property) => (
          <div
            className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
            dir="rtl"
            key={property.id}
          >
            <HouseCard
              className="w-full"
              transactionType="rental"
              property={property}
            />
          </div>
        ))}
      </SliderWrapper>
    </div>
  );
};

export default SpecialOffersSlider;
