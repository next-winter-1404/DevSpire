import SliderWrapper from "@/components/common/SliderWrapper";
import { MOCK_DATA } from "../../../modules/fastReserve/mocks/data";
import FastReserveCard from "@/modules/fastReserve/components/FastReserveCard";
import React from "react";

const BestChoiceSlider = () => {
  return (
    <div className="px-12">
      <SliderWrapper>
        {MOCK_DATA.map((property) => (
          <div
            className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
            dir="rtl"
            key={property.id}
          >
            <FastReserveCard className="w-full" property={property} />
          </div>
        ))}
      </SliderWrapper>
    </div>
  );
};

export default BestChoiceSlider;
