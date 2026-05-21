"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import CirclePlus from "../../../../../public/icons/CirclePlus";
import CurveArrow from "../../../../../public/icons/CurveArrow";
import { THouse } from "@/components/common/types";
import { uploadHousePhotos } from "../services/POST/uploadHousePhotos";

interface IProps {
  house: THouse;
  handlePrev: (stepData?: any) => void;
  handleNext: (stepData?: any) => void;
  handleFinalSubmit: (stepData?: any) => void;
  formData: any;
}

type FormValues = {
  photo: FileList;
};

const EstateImage = ({ house, handlePrev, handleNext }: IProps) => {

  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const file = data.photo?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await uploadHousePhotos(house.id, formData);
    } catch (err) {
      console.error(err);
    }
  };

  const photoField = register("photo");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-36">
      <div className="flex gap-8">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col justify-center items-center gap-5 w-50 h-50 border-2 border-dashed border-[#1E2022] rounded-[24px] cursor-pointer hover:bg-[#FFFFFF]"
        >
          <CirclePlus />
          <span className="font-regular text-[20px] text-[#1E2022]">افزودن عکس</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(e) => {
              fileInputRef.current = e;
              photoField.ref(e);
            }}
            name={photoField.name}
            onBlur={photoField.onBlur}
            onChange={(e) => {
              photoField.onChange(e);
              setValue("photo", e.target.files as FileList);
              handleSubmit(onSubmit)();
            }}
          />
        </div>

        {house?.photos?.map((item, index) => (
          <div key={index}>
            <Image src={item} alt={item} width={200} height={200} className="w-50 h-50" />
          </div>
        ))}
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
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]">مرحله بعد</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default EstateImage;
