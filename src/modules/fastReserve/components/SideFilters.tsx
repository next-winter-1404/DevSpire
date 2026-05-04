"use client";

import CustomSelect from "@/components/common/CustomSelectOption";
import TwoRangeSlider from "@/components/common/TwoRangeSlider";
import { ChangeEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { IOption } from "@/components/common/FastSearchForm";

const FastReserveSideFilters = () => {
  const locale = useLocale();
  const t = useTranslations("fastReserve");

  const sortOptions: IOption[] = [
    {
      value: "last_updated",
      label: locale == "en" ? "last updated" : "آخرین به‌روزرسانی",
    },
    { value: "price", label: locale == "en" ? "price" : "قیمت" },
    { value: "area", label: locale == "en" ? "area" : "متراژ" },
    {
      value: "created_at",
      label: locale == "en" ? "created at" : "تاریخ ثبت آگهی",
    },
  ];
  const orderOptions: IOption[] = [
    { value: "DESC", label: locale == "en" ? "desc" : "نزولی" },
    { value: "ASC", label: locale == "en" ? "asc" : "صعودی" },
  ];

  const propertyOptions: IOption[] = [
    { value: "villa", label: locale == "en" ? "villa" : "ویلا" },
    {
      value: "apartment",
      label: locale == "en" ? "apartment" : "آپارتمان",
    },
    { value: "house", label: locale == "en" ? "house" : "خانه" },
    { value: "land", label: locale == "en" ? "land" : "زمین" },
    {
      value: "commercial",
      label: locale == "en" ? "commercial" : "اقتصادی",
    },
  ];
  const limitOptions: IOption[] = [
    { value: "12", label: "12" },
    {
      value: "18",
      label: `18`,
    },
    { value: "24", label: "24" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [range, setRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") ?? "0"),
    parseInt(searchParams.get("maxPrice") ?? "25000000"),
  ]);
  const [Area, setArea] = useState<[number, number]>([
    parseInt(searchParams.get("minArea") ?? "0"),
    parseInt(searchParams.get("maxArea") ?? "400"),
  ]);
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get("propertyType")?.toString() ?? "",
  );
  const [order, setOrder] = useState<string>(
    searchParams.get("order") ?? orderOptions[0].value,
  );
  const [limit, setLimit] = useState<string>(
    searchParams.get("Limit") ?? limitOptions[0].value,
  );

  const [sort, setSort] = useState<string>(
    searchParams.get("sort") ?? sortOptions[0].value,
  );
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [locQuery, setLocQuery] = useState(searchParams.get("location") ?? "");

  const [search] = useDebounce(query, 950);
  const [location] = useDebounce(locQuery, 950);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const setOrDelete = (key: string, value: string) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };

    setOrDelete("search", search);
    setOrDelete("location", location);
    setOrDelete("sort", sort);
    setOrDelete("propertyType", propertyType);
    setOrDelete("order", order);
    setOrDelete("limit", limit);

    if (range) {
      params.set("minPrice", String(range[0]));
      params.set("maxPrice", String(range[1]));
    }
    if (Area) {
      params.set("minArea", String(Area[0]));
      params.set("maxArea", String(Area[1]));
    }

    params.set("page", "1");

    const currentQueryString = searchParams.toString();
    const newQueryString = params.toString();

    if (currentQueryString !== newQueryString) {
      router.push(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [search, range, sort, Area, location, propertyType, order, limit]);
  const deleteFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isAvailble = params.get(key);
    if (isAvailble) {
      params.delete(key);
    }
    router.push(`${pathname}?${params}`);
  };

  const getSliderValues = (values: [number, number]) => setRange(values);
  const getAreaValues = (values: [number, number]) => setArea(values);
  const getQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const getLocQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setLocQuery(e.target.value);
  };
  const getSortOptions = (value: string) => setSort(value);
  const getPropertyType = (value: string) => {
    setPropertyType(value);
  };
  const getOrderOption = (value: string) => {
    setOrder(value);
  };
  const getLimit = (value: string) => {
    setLimit(value);
  };
  return (
    <div className="border border-[#dddd] dark:border-[#333333] bg-[#ffff] dark:bg-[#27272A] rounded-[24px] p-4">
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-6 lg:justify-between w-full">
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <h2 className="text-[16px] text-[#1E2022] font-bold dark:text-[#FAFAFA]">
              {t("search")}
            </h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) => getQuery(e)}
                className={`w-full bg-[#F5F5F5] dark:bg-[#3F3F46] border-none rounded-[40px] py-3 px-5 placeholder:text-[#777777] placeholder:text-[16px] ${locale == "fa" ? "text-right" : "text-left"} outline-none text-foreground text-[16px] focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black`}
              />
              <MagnifyingGlassIcon
                className={`w-5 h-5 absolute top-[50%] translate-y-[-50%] ${locale == "fa" ? "left-5" : "right-5"}`}
              />
            </div>
          </div>
          <div className="w-full flex lg:flex-row items-center lg:justify-center lg:gap-6 flex-col gap-4 justify-start ">
            <div className="flex flex-col gap-4 justify-start items-start w-full">
              <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
                {t("sort")}
              </label>
              <div className="relative w-full">
                <CustomSelect
                  options={sortOptions}
                  defaultValue={sortOptions[0].value}
                  onValueChange={getSortOptions}
                />
              </div>
            </div>

            <div className=" flex flex-col gap-4 justify-start items-start w-full">
              <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
                {t("limit")}
              </label>
              <CustomSelect
                defaultValue={limit}
                onValueChange={getLimit}
                options={limitOptions}
              />
            </div>
          </div>

          <div className="w-full flex lg:flex-row items-center lg:justify-center lg:gap-6 flex-col gap-4 justify-start ">
            <div className="w-full flex flex-col gap-4 justify-start items-start">
              <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
                {t("propertyType")}
              </label>
              <CustomSelect
                options={propertyOptions}
                placeholder={t("propertyTypePlaceholder")}
                onValueChange={getPropertyType}
              />
            </div>
            <div className="w-full flex flex-col gap-4 justify-start items-start">
              <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
                {t("order")}
              </label>
              <CustomSelect
                defaultValue={orderOptions[0].value}
                options={orderOptions}
                onValueChange={getOrderOption}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              {t("location")}
            </label>
            <input
              type="text"
              value={locQuery}
              placeholder={t("locationPlaceholder")}
              onChange={getLocQuery}
              className={`w-full bg-[#F5F5F5] dark:bg-[#3F3F46] border-none rounded-[40px] py-3 px-5 placeholder:text-[#777777] placeholder:text-[16px] ${locale == "fa" ? "text-right" : "text-left"} outline-none text-foreground text-[16px] focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black`}
            />
          </div>

          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              {t("priceRange")}
            </label>
            <div className="w-full">
              <TwoRangeSlider
                max={50000000}
                defaultValues={range}
                getValues={getSliderValues}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              {t("areaRange")}
            </label>
            <div className="w-full">
              <TwoRangeSlider
                max={1000}
                defaultValues={Area}
                getValues={getAreaValues}
                step={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReserveSideFilters;
