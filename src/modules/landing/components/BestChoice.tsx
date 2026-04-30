import React from "react";
import BestChoiceSlider from "./BestChoiceSlider";

const BestChoice = () => {
  return (
    <div className="flex justify-between mt-30 px-12">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between px-12">
          <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
            بهترین انتخاب برای تعطیلات و اقامت
          </h2>
          <button
            className="w-[137px] py-2 text-[#0D3B66] border border-[#0d3B66] rounded-[40px]
          dark:text-[#F5F5F5] dark:border-[#F5F5F5]"
          >
            مشاهده همه
          </button>
        </div>
        <BestChoiceSlider />
      </div>
    </div>
  );
};

export default BestChoice;
