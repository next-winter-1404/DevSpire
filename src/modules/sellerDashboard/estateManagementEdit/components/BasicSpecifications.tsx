import React from "react";
import CurveArrow from "../../../../../public/icons/CurveArrow";
import { THouse } from "@/components/common/types";
import CustomSelect from "@/components/common/CustomSelectOption";
import { useLocale } from "next-intl";
import { Controller, useForm } from "react-hook-form";

interface IProps {
  house: THouse;
  handlePrev: (stepData: any) => void;
  handleNext: (stepData: any) => void;
  handleFinalSubmit: (stepData: any) => void;
  formData: any;
}

const BasicSpecifications = ({ house, handleNext, formData }: IProps) => {
  const locale = useLocale();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: house.title,
      capacity: house.capacity,
      transactionType: formData?.transactionType || "reserve",
      price: house.price,
      category: formData?.category || "apartment",
      caption: house.caption,
    },
  });

  const transactionTypeOptions = [
    { value: "reserve", label: locale === "en" ? "reserve" : "رزرو" },
    { value: "mortgage", label: locale === "en" ? "mortgage" : "رهن" },
    { value: "rental", label: locale === "en" ? "rental" : "اجاره ای" },
  ];

  const categoryOptions = [
    { value: "apartment", label: locale === "en" ? "apartment" : "آپارتمان" },
    { value: "villa", label: locale === "en" ? "villa" : "ویلا" },
  ];

  const onSubmit = (data: any) => {
    handleNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-8 w-full">
      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">نام ملک</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]" />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">ظرفیت</label>
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]" />
            )}
          />
        </div>
      </div>

      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <span className="font-regular text-[16px] text-[#1E2022]">نوع معامله</span>
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={transactionTypeOptions}
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">قیمت</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]" />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[570px]">
        <span className="font-regular text-[16px] text-[#1E2022]">نوع ملک</span>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CustomSelect
              options={categoryOptions}
              defaultValue={field.value}
              onValueChange={field.onChange}
              className="w-[570px] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="font-regular text-[16px] text-[#1E2022]">توضیحات</label>
        <Controller
          name="caption"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]" />
          )}
        />
      </div>

      <div className="flex justify-end w-full">
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

export default BasicSpecifications;
