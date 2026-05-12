"use client";
import React, { useState } from "react";
import SayAboutUsCard from "./SayAboutUsCard";
import BigArrowRight from "../../../../public/icons/BigArrowRight";
import BigArrowLeft from "../../../../public/icons/BigArrowLeft";
import { useLocale } from "next-intl";
import SliderWrapper from "@/components/common/SliderWrapper";

interface Property {
  id: number;
  [key: string]: any;
}

interface Props {
  initialData: Property[];
}


const SayAboutUsSliderClient = ({ initialData } : Props) => {

  const locale = useLocale();

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const totalSlides = Math.ceil(initialData.length / itemsPerView);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <SliderWrapper>
        {initialData?.map((data: any) => (
          <div
            className='shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]'
            dir='rtl'
            key={data.id}
          >
            <SayAboutUsCard data={data}/>
          </div>
        ))}
      </SliderWrapper>
      <div className="flex gap-8">
        <div onClick={nextSlide}>
          <BigArrowRight className={locale === "en" ? "scale-x-[-1]" : ""} />
        </div>
        <div onClick={prevSlide}>
          <BigArrowLeft className={locale === "en" ? "scale-x-[-1]" : ""} />
        </div>
      </div>
    </div>
  );
};

export default SayAboutUsSliderClient;
