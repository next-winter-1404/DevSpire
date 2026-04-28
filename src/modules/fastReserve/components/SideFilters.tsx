"use client";

import CustomSelect from "@/components/common/CustomSelectOption";
import TwoRangeSlider from "@/components/common/TwoRangeSlider";
import { locationOptions, sortOptions } from "../mocks/data";
import { ChangeEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FastReserveSideFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [range, setRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") ?? "0"),
    parseInt(searchParams.get("maxPrice") ?? "25000000"),
  ]);

  // final values for queries
  const [sort, setSort] = useState<string>(
    searchParams.get("sort") ?? sortOptions[0].value,
  );
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [hotelOptions, setHotelOptions] = useState<string>(
    searchParams.get("option") ?? "",
  );
  const [search] = useDebounce(query, 850);
  const [finalRange] = useDebounce(range, 850);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const setOrDelete = (key: string, value: string) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };

    setOrDelete("query", search);
    setOrDelete("sort", sort);
    setOrDelete("option", hotelOptions);

    if (finalRange) {
      params.set("minPrice", String(finalRange[0]));
      params.set("maxPrice", String(finalRange[1]));
    }

    params.set("page", "1");
    params.set("limit", "12");

    const currentQueryString = searchParams.toString();
    const newQueryString = params.toString();

    if (currentQueryString !== newQueryString) {
      router.push(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [search, finalRange, sort, hotelOptions, pathname, router, searchParams]);

  // function for get values
  const getSliderValues = (values: [number, number]) => setRange(values);
  const getQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const getHotelOptions = (value: string) => setHotelOptions(value);
  const getSortOptions = (value: string) => setSort(value);
  return (
    <div
      className="border border-[#dddd] dark:border-[#333333] bg-[#ffff]  dark:bg-[#27272A]
     rounded-[24px] p-4 "
    >
      <div className="flex flex-col gap-2 lg:flex-row  lg:gap-6  lg:justify-between w-full ">
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <h2 className="text-[16px] text-[#1E2022] font-bold dark:text-[#FAFAFA] ">
              جستجو
            </h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="نام هتل مورد نظر"
                onChange={(
                  e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
                ) => getQuery(e)}
                className="w-full bg-[#F5F5F5] dark:bg-[#3F3F46] border-none rounded-[40px] py-3 px-5
                 placeholder:text-[#777777] placeholder:text-[16px] text-right  outline-none text-foreground
                  text-[16px] focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black "
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute top-[50%] translate-y-[-50%] left-5" />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              امکانات هتل
            </label>
            <div className="relative w-full">
              <CustomSelect
                placeholder="استان شهر ...."
                options={locationOptions}
                onValueChange={getHotelOptions}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              مرتب سازی بر اساس
            </label>
            <div className="relative w-full">
              <CustomSelect
                options={sortOptions}
                defaultValue={sortOptions[0].value}
                placeholder={sortOptions[0].label}
                onValueChange={getSortOptions}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              رنج قیمت
            </label>
            <div className="w-full">
              <TwoRangeSlider
                defaultValues={range}
                getValues={getSliderValues}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReserveSideFilters;
