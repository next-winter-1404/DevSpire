"use client";
import React from "react";
import CurveArrow from "../../../../../../public/icons/CurveArrow";
import { IGeneraData, IStep2Data } from "../types";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";


import { useTranslations } from "next-intl";

const MapView = dynamic(() => import("@/components/common/NeshanMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-[24px] flex items-center justify-center">
      در حال بارگذاری نقشه...
    </div>
  ),
});

interface IProps {
  generalData: IGeneraData;
  handlePrev: () => void;
  handleNext: () => void;
  onChangeData: (data: IGeneraData) => void;
}  

const validationSchema = z.object({
  
  location: z.string().min(1, "لوکیشن الزامی است"),
  address: z.string().min(1, "آدرس الزامی است"),
});

const EstateStep2 = ({
  generalData,
  handleNext,
  handlePrev,
  onChangeData,
}: IProps) => {
  const t = useTranslations("sellerDashboard.estateForm.step2");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStep2Data>({
    defaultValues: generalData.step2,
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: IStep2Data) => {
    console.log(data);
    onChangeData({ ...generalData, step2: data });
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 pb-8 relative">
          <label
            htmlFor="address"
            className="font-regular text-[16px] text-[#1E2022]"
          >
  {t("location")}
          </label>
          <input
            {...register("location")}
            id="location"
            type="text"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
          {errors.location && (
            <span className="text-red-500 text-sm absolute bottom-0 right-0">
              {errors.location.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 pb-8 relative">
          <label
            htmlFor="address"
            className="font-regular text-[16px] text-[#1E2022]"
          >
              {t("address")}

          </label>
          <input
            {...register("address")}
            id="address"
            type="text"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
          {errors.address && (
            <span className="text-red-500 text-sm absolute bottom-0 right-0">
              {errors.address.message}
            </span>
          )}
        </div>
        <div className="w-full h-[240px] mt-1">
          <MapView />
        </div>
      </div>
      <div className=" w-full flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
        >
          <CurveArrow className="rotate-270" />
          <span className="font-regular text-[16px]">{t("prevStep")}</span>
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]"></span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default EstateStep2;
