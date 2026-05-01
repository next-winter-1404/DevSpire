"use client";
import { FormatPrice } from "@/utils/helper/FormatPrice";
import * as Slider from "@radix-ui/react-slider";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface IPros {
  className?: string;
  getValues: (values: [number, number]) => void;
  defaultValues?: [number, number];
}

const TwoRangeSlider = ({ defaultValues, className, getValues }: IPros) => {

  const t = useTranslations('mortgageAndRent.filters')

  const Min = 0;
  const Max = 100_000_000;
  const Step = 100_000;

  const [range, setRange] = useState<[number, number]>(
    defaultValues ?? [0, 20_000_000],
  );

  return (
    <div className={` ${className} w-full flex flex-col gap-3 `}>
      <Slider.Root
        dir="rtl"
        className="relative flex items-center select-none touch-none w-full h-5"
        value={range}
        onValueChange={(newValues: [number, number]) => {
          setRange(newValues);
          getValues(newValues);
        }}
        min={Min}
        max={Max}
        step={Step}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-gray-200 dark:bg-gray-700 relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-grab"
          aria-label="حداقل قیمت"
        />

        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-grab"
          aria-label="حداکثر قیمت"
        />
      </Slider.Root>
      <div className="flex justify-between text-[14px]">
        <span className="text-[#777777]">
          {t('min')}
          <span className=" text-foreground text-16px ">
            {" "}
            {FormatPrice(range[0])}
          </span>
        </span>
        <span className="text-[#777777] ">
          {t('max')}
          <span className="text-foreground text-16px ">
            {" "}
            {FormatPrice(range[1])}
          </span>
        </span>
      </div>
    </div>
  );
};

export default TwoRangeSlider;
