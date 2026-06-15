"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { IOption } from "@/components/common/FastSearchForm";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/common/CustomSelectOption";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import TwoRangeSlider from "@/components/common/TwoRangeSlider";

const Filters = ({ resultLength }: { resultLength?: number }) => {
  const locale = useLocale();
  const t = useTranslations("fastReserve");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const transactionTypeOptions: IOption[] = [
    { label: "رهن", value: "mortgage" },
    { label: "اجاره", value: "rental" },
    { label: "خرید و فروش", value: "direct_purchase" },
  ];
  const [transactionType, setTransactionType] = useState<string>(
    searchParams.get("transactionType") ?? transactionTypeOptions[0].value,
  );
  const getTransactionType = (value: string) => {
    setTransactionType(value);
  };
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
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get("propertyType")?.toString() ?? "",
  );
  const getPropertyType = (value: string) => {
    setPropertyType(value);
  };
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

  const [sort, setSort] = useState<string>(
    searchParams.get("sort") ?? sortOptions[0].value,
  );
  const getSortOptions = (value: string) => setSort(value);

  const [query, setQuery] = useState<string>(searchParams.get("search") ?? "");
  const [search] = useDebounce(query, 850);

  const [locQuery, setLocQuery] = useState(searchParams.get("location") ?? "");
  const [location] = useDebounce(locQuery, 950);
  const getLocQuery = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setLocQuery(e.target.value);
  };
  const orderOptions: IOption[] = [
    { value: "DESC", label: locale == "en" ? "desc" : "نزولی" },
    { value: "ASC", label: locale == "en" ? "asc" : "صعودی" },
  ];

  const [order, setOrder] = useState<string>(
    searchParams.get("order") ?? orderOptions[0].value,
  );
  const getOrderOption = (value: string) => {
    setOrder(value);
  };

  const limitOptions: IOption[] = [
    { value: "12", label: "12" },
    {
      value: "18",
      label: `18`,
    },
    { value: "24", label: "24" },
  ];
  const [limit, setLimit] = useState<string>(
    searchParams.get("Limit") ?? limitOptions[0].value,
  );
  const getLimit = (value: string) => {
    setLimit(value);
  };
  const [range, setRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") ?? "0"),
    parseInt(searchParams.get("maxPrice") ?? "50000000000"),
  ]);
  const getSliderValues = (values: [number, number]) => setRange(values);

  const [Area, setArea] = useState<[number, number]>([
    parseInt(searchParams.get("minArea") ?? "0"),
    parseInt(searchParams.get("maxArea") ?? "400"),
  ]);
  const getAreaValues = (values: [number, number]) => setArea(values);

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
    setOrDelete("transactionType", transactionType);

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
      router.replace(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [
    search,
    range,
    sort,
    Area,
    location,
    propertyType,
    order,
    limit,
    transactionType,
  ]);
  return (
    <div className="flex flex-col gap-8 mt-10">
      <div className="flex justify-between">
        <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
          {locale == "fa" ? "فیلترها" : "filters"}
        </h2>
        <div className="flex gap-2 font-regular text-[20px] text-[#0D3B66]   dark:text-[#E4E4E4]">
          <span>{resultLength}</span>
          <span>{locale == "fa" ? "نتیجه" : "result"}</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4 border border-[#DDDDDD] rounded-[24px] dark:border-[#404040]">
        <div className="flex flex-col gap-5 w-full lg:flex-row">
          <div
            className="flex flex-col gap-4 w-full  
        sm:w-[320px]   lg:w-[510px]"
          >
            <span className="font-bold text-[16px] text-foreground">
              {locale == "fa" ? "جستجو" : "search"}
            </span>
            <div className="relative">
              <input
                placeholder="نام ملک مورد نظر را سرچ کنید"
                value={query}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
                ) => {
                  setQuery(e.target.value);
                }}
                className={`w-full bg-[#F5F5F5] dark:bg-[#3F3F46] border-none rounded-[40px] py-3 px-5
                   placeholder:text-[#777777] placeholder:text-[16px] ${locale == "fa" ? "text-right" : "text-left"} 
                   outline-none text-foreground text-[16px] focus:ring-1 focus:ring-blue-500 focus:ring-offset-2
                    dark:focus:ring-offset-black`}
              />
              <Search
                className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[30%]`}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-4 justify-start items-start w-full">
              <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
                {t("sort")}
              </label>
              <div className="relative w-full">
                <CustomSelect
                  options={sortOptions}
                  defaultValue={sort}
                  onValueChange={getSortOptions}
                />
              </div>
            </div>
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
            <div className=" flex flex-col gap-4 justify-start items-start w-full">
              <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
                {locale == "fa" ? "نوع معامله" : "transaction type"}{" "}
              </label>
              <CustomSelect
                defaultValue={transactionType}
                onValueChange={getTransactionType}
                options={transactionTypeOptions}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 w-full">
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
          <div className=" flex flex-col gap-4 justify-start items-start w-full">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              {t("limit")}
            </label>
            <CustomSelect
              defaultValue={limit}
              onValueChange={getLimit}
              options={limitOptions}
            />
          </div>{" "}
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              {t("priceRange")}
            </label>
            <div className="w-full">
              <TwoRangeSlider
                max={50000000000}
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
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Filters;
