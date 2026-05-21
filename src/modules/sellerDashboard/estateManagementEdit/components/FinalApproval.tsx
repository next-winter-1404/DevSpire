import { THouse } from "@/components/common/types";
import Image from "next/image";
import React from "react";
import Location from "../../../../../public/icons/Location";
import Bed from "../../../../../public/icons/Bed";
import Faucet from "../../../../../public/icons/Faucet";
import Parking from "../../../../../public/icons/Parking";
import Group from "../../../../../public/icons/Group";
import Apartment from "../../../../../public/icons/Apartment";
import House from "../../../../../public/icons/House";
import { useLocale } from "next-intl";
import MoneyExchange from "../../../../../public/icons/MoneyExchange";
import Cash from "../../../../../public/icons/Cash";
import CurveArrow from "../../../../../public/icons/CurveArrow";
import { useForm } from "react-hook-form";

interface IProps {
  house: THouse;
  handlePrev: (stepData: any) => void;
  handleNext: (stepData: any) => void;
  handleFinalSubmit: (stepData: any) => void;
  formData: any;
}

const FinalApproval = ({ house, handlePrev, handleNext, handleFinalSubmit, formData }: IProps) => {
  const locale = useLocale();

  const tagsArray = Array.isArray(house.tags) ? house.tags : [house.tags];

  const specs = [
    { value: house.rooms, fa: "خوابه", en: "Bedrooms", icon: <Bed className="text-[#FFFFFF]" /> },
    { value: house.bathrooms, fa: "حمامه", en: "Bathrooms", icon: <Faucet className="text-[#FFFFFF]" /> },
    { value: house.parking, fa: "پارکینگ", en: "Parking", icon: <Parking className="text-[#FFFFFF]" /> },
    { value: house.capacity, fa: "نفر ظرفیت", en: "Guests", icon: <Group className="text-[#FFFFFF]" /> },
  ];

  const categoryLabelByKey: Record<string, { fa: string; en: string }> = {
    apartment: { fa: "آپارتمان", en: "apartment" },
    villa: { fa: "ویلا", en: "villa" },
  };
  const iconByCategoryValue: Record<string, React.ReactNode> = {
    apartment: <Apartment />,
    villa: <House />,
  };
  const categoryValues = Array.isArray(house.categories)
    ? house.categories
    : house.categories
    ? [house.categories]
    : [];

  const transTypeLabelByKey: Record<string, { fa: string; en: string }> = {
    reserve: { fa: "رزرو", en: "reserve" },
    mortgage: { fa: "رهن", en: "mortgage" },
    rental: { fa: "اجاره ای", en: "rental" },
  };
  const iconByTransTypeValue: Record<string, React.ReactNode> = {
    reserve: <Cash />,
    mortgage: <MoneyExchange />,
    rental: <MoneyExchange />,
  };
  const transTypeValues = Array.isArray(house.transaction_type)
    ? house.transaction_type
    : house.transaction_type
    ? [house.transaction_type]
    : [];

  const { handleSubmit } = useForm({
    defaultValues: { ...formData },
  });

  const onSubmit = (data: any) => {
    handleFinalSubmit(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          {house.photos == null ? (
            <div className="flex justify-center items-center w-[480px] h-[320px] bg-[#E4E4E4] rounded-[24px]">
              <span className="font-regular text-[16px] text-[#777777]">فاقد عکس</span>
            </div>
          ) : (
            <Image
              src={house.photos[0]}
              alt={house.photos[0]}
              className="w-[457px] h-[378px] rounded-[24px]"
            />
          )}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-[20px] text-[#1E2022]">
                {house.title}
              </h2>
              <div className="flex items-center gap-2 text-[#777777]">
                <Location />
                <p className="font-regular text-[16px]">{house.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="font-regular text-[16px] text-[#1E2022] leading-[32px]">
                {house.caption}
              </p>
              <div className="flex items-center gap-2 text-[#1E2022]">
                <span className="font-bold text-[24px]">{house.price}</span>
                <span className="font-regular text-[16px]">تومان</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[16px] text-[#1E2022]">برچسب ها</h3>
          <div className="flex items-center gap-4">
            {tagsArray.map((tag, index) => (
              <span
                key={index}
                className="py-[6px] px-4 font-regular text-[16px] text-[#FFFFFF] bg-[#FF7F11] rounded-[8px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[16px] text-[#1E2022]">سایر مشخصات</h3>
          <div className="flex items-center gap-4">
            {specs.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-[6px] px-2 bg-[#FF7F11] rounded-[8px]"
              >
                {item.icon}
                <div className="flex items-center gap-2 font-reular text-[16px] text-[#FFFFFF]">
                  <span>{item.value}</span>
                  <span>{locale === "en" ? item.en : item.fa}</span>
                </div>
              </div>
            ))}
            {categoryValues.map((cat) => {
              const itemIcon = iconByCategoryValue[cat] ?? "";
              const label = categoryLabelByKey[cat]?.[locale as "fa" | "en"] ?? cat;
              return (
                <div
                  key={cat}
                  className="flex items-center gap-2 py-[6px] px-2 font-regular text-[16px] text-[#FFFFFF] bg-[#FF7F11] rounded-[8px]"
                >
                  <span>{itemIcon}</span>
                  <span>{label}</span>
                </div>
              );
            })}
            {transTypeValues.map((cat) => {
              const itemIcon = iconByTransTypeValue[cat] ?? "";
              const label = transTypeLabelByKey[cat]?.[locale as "fa" | "en"] ?? cat;
              return (
                <div
                  key={cat}
                  className="flex items-center gap-2 py-[6px] px-2 font-regular text-[16px] text-[#FFFFFF] bg-[#FF7F11] rounded-[8px]"
                >
                  <span>{itemIcon}</span>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className='flex items-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer'
        >
          <CurveArrow className='rotate-270'/>
          <span className="font-regular text-[16px]">مرحله قبل</span>
        </button>
        <button
          type="submit"
          className='flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer'
        >
          <span className="font-regular text-[16px]">تایید نهایی</span>
        </button>
      </div>
    </form>
  );
};

export default FinalApproval;
