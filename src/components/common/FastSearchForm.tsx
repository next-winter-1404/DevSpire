"use client";

import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";

export interface IOption {
  label: string;
  value: string;
}
const FastSearchForm = () => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("home.heroSectionForm");

  const transactionTypeOptions: IOption[] = [
    { label: t("reserve"), value: "reservation" },
    { label: t("mortgage"), value: "mortgage" },
    { label: t("rent"), value: "rental" },
    { label: t("buyAndSell"), value: "direct_purchase" },
  ];
  const propertyOptions: IOption[] = [
    { value: "villa", label: `${locale == "fa" ? "ویلا" : "villa"}` },
    {
      value: "apartment",
      label: `${locale == "fa" ? "آپارتمان" : "apartment"}`,
    },
    { value: "house", label: `${locale == "fa" ? "خانه" : "house"}` },
    { value: "land", label: `${locale == "fa" ? "زمین" : "land"}` },
    {
      value: "commercial",
      label: `${locale == "fa" ? "تجاری" : "commercial"}`,
    },
  ];
  const [transactionType, setTransactionType] = useState<string>("reservation");

  const handleSubmit = (formData: FormData) => {
    const propertyType = formData.get("propertyType")?.toString() || "";
    const location = formData.get("location")?.toString() || "";
    const maxPrice = formData.get("maxPrice")?.toString() || "";
    const maxArea = formData.get("maxArea")?.toString() || "";

    const params = new URLSearchParams(searchParams.toString());
    if (propertyType) params.set("propertyType", propertyType);
    else params.delete("propertyType");

    if (location) params.set("location", location);
    else params.delete("location");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    if (maxArea) params.set("maxArea", maxArea);
    else params.delete("maxArea");

    if (transactionType !== "reservation")
      params.set("transactionType", transactionType);

    router.push(
      `${pathname}/${transactionType == "reservation" ? "fast-reserve" : "mortgage-rent"}?${params.toString()}`,
    );
  };

  return (
    <div
      className=" w-[350px]  md:w-[503px]  rounded-[24px] p-6 shadow-sm border border-[#dddd] dark:border-[#333333]
       bg-[#ffff]  dark:bg-[#27272A] flex flex-col gap-4 "
    >
      <h2 className="text-[24px] text-[#0d3b66] font-bold   dark:text-[#F5F5F5]">
        {t("title")}
      </h2>
      <div className="md:mx-auto flex items-center gap-3 overflow-x-auto scroll-smooth pb-4 md:p-0 ">
        {transactionTypeOptions.map((item, index) => (
          <button
            onClick={() => {
              setTransactionType(item.value);
            }}
            className={`px-4 py-2 rounded-[40px] whitespace-nowrap ${
              transactionType == item.value
                ? "text-[#FFFFFF] bg-[#0D3B66]   dark:border-none"
                : "text-[#777777]"
            } `}
            key={index}
          >
            {item.label}
          </button>
        ))}
      </div>
      <form action={handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-3 w-full ">
          <label className=" text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA]">
            {t("estateType")}
          </label>
          <Select.Root dir={locale == "fa" ? "rtl" : "ltr"} name="propertyType">
            <Select.Trigger
              className={`
                          flex items-center justify-between w-full bg-[#F5F5F5] dark:bg-[#3F3F46] 
                          border-none rounded-[40px] py-3 px-5 text-right
                          outline-none text-[#777777] dark:text-gray-300 text-sm 
                          focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black
                          data-[placeholder]:text-[#777777] 
                        `}
            >
              <Select.Value placeholder={t("estateTypePlc")} />
              <Select.Icon>
                <ChevronDownIcon
                  className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180 text-[#1E2022]
                dark:text-[#E4E4E4]"
                />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={5}
                className="
                            w-[var(--radix-select-trigger-width)] bg-[#ffff] dark:bg-[#3F3F46] 
                            rounded-2xl shadow-lg z-50 overflow-hidden border dark:border-gray-700
                          "
              >
                <Select.Viewport className="p-2">
                  {propertyOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className={`
                                  ${locale == "fa" ? "text-right  pr-8 " : "text-left pl-8 "} text-[15px] p-2 rounded-md
                                   relative select-none
                                  text-gray-800 dark:text-gray-200 
                                  data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-600 
                                  data-[highlighted]:outline-none cursor-pointer
                                `}
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                      <Select.ItemIndicator
                        className={`absolute ${locale == "fa" ? "right-2" : "left-2"} top-1/2 -translate-y-1/2`}
                      >
                        <CheckIcon className="w-4 h-4" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div className="flex flex-col gap-3 w-full ">
          <label className=" text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA]">
            {t("desiredAddress")}
          </label>
          <input
            type="text"
            name="location"
            placeholder={t("desiredAddressPlc")}
            className="w-full bg-[#F5F5F5] dark:bg-[#3F3F46]  border-none rounded-[24px] py-3 px-5 text-sm 
              focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 w-full ">
          <label className=" text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA]">
            {t("maxPrice")}
          </label>
          <input
            type="number"
            name="maxPrice"
            placeholder={t("maxPricePlc")}
            className="w-full bg-[#F5F5F5] dark:bg-[#3F3F46]  border-none rounded-[24px] py-3 px-5 text-sm 
            focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 w-full ">
          <label className=" text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA]">
            {t("maxMeterage")}
          </label>
          <input
            type="number"
            name="maxArea"
            placeholder={t("maxMeteragePlc")}
            step={1}
            className="w-full bg-[#F5F5F5] dark:bg-[#3F3F46]  border-none rounded-[24px] py-3 px-5 text-sm 
            focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        <button
          type="submit"
          className=" bg-primary 
          hover:bg-[#0c2a4a] text-white py-2 w-full rounded-[24px] text-[16px] font-medium transition-colors cursor-pointer"
        >
          {t("searchButton")}
        </button>
      </form>
    </div>
  );
};

export default FastSearchForm;
