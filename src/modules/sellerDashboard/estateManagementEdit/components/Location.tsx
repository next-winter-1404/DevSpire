"use client";
import { THouse } from "@/components/common/types";
import dynamic from "next/dynamic";
import React from "react";
import CurveArrow from "../../../../../public/icons/CurveArrow";
import { useForm } from "react-hook-form";

interface IProps {
  house: THouse;
  handlePrev: (stepData: any) => void;
  handleNext: (stepData: any) => void;
  handleFinalSubmit: (stepData: any) => void;
  formData: any;
}

const MapView = dynamic(() => import("@/components/common/NeshanMap"), {
  ssr: false,
});

const Location = ({ house, handlePrev, handleNext }: IProps) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      address: house.address,
    },
  });

  const onSubmit = (data: any) => {
    handleNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="address"
            className="font-regular text-[16px] text-[#1E2022]"
          >
            آدرس
          </label>
          <input
            {...register("address")}
            id="address"
            type="text"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
        </div>
        <div className="w-full h-[240px]">
          <MapView />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
        >
          <CurveArrow className="rotate-270" />
          <span className="font-regular text-[16px]">مرحله قبل</span>
        </button>
        <button
          onClick={handleNext}
          type="submit"
          className="flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]">مرحله بعد</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default Location;
