"use client";

import { useLocale, useTranslations } from "next-intl";
import Search from "../../../../../public/icons/Search";
import { IOption } from "@/components/common/FastSearchForm";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CustomSelect from "@/components/common/CustomSelectOption";

const Filters = ({
  totalCount,
  categories,
}: {
  totalCount: number;
  categories: [];
}) => {
  const locale = useLocale();
  const t = useTranslations("blogs.filters");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortOptions: IOption[] = [
    {
      value: "created_at",
      label: locale == "en" ? "created at" : "زمان ایجاد",
    },
    {
      value: "updated_at",
      label: locale == "en" ? "last updated" : "آخرین بروزرسانی",
    },
  ];

  const orderOptions: IOption[] = [
    { value: "DESC", label: locale == "en" ? "desc" : "نزولی" },
    { value: "ASC", label: locale == "en" ? "asc" : "صعودی" },
  ];

  const limitOptions: IOption[] = [
    { value: "12", label: "12" },
    { value: "18", label: "18" },
    { value: "24", label: "24" },
  ];

  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [search] = useDebounce(query, 900);

  const [sort, setSort] = useState(
    searchParams.get("sort") ?? sortOptions[0].value,
  );

  const [order, setOrder] = useState(
    searchParams.get("order") ?? orderOptions[0].value,
  );

  const [limit, setLimit] = useState(
    searchParams.get("limit") ?? limitOptions[0].value,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const setOrDelete = (key: string, value: string) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };

    setOrDelete("search", search);
    setOrDelete("sort", sort);
    setOrDelete("order", order);
    setOrDelete("limit", limit);

    params.set("page", "1");

    const current = searchParams.toString();
    const next = params.toString();

    if (current !== next) {
      router.push(`${pathname}?${next}`, { scroll: false });
    }
  }, [search, sort, order, limit]);

  const getQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <div className="flex flex-col gap-8 mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-[#1E2022] dark:text-white">
          {t("title")}
        </h2>

        <div className="flex items-center gap-2 text-[18px] text-[#0D3B66] dark:text-gray-300">
          <span className="font-bold">{totalCount}</span>
          <span>{t("result")}</span>
        </div>
      </div>
      <div
        className="
    relative
    p-6
    rounded-3xl
    border border-[#E5E7EB]
    bg-white
    shadow-sm        
    dark:!bg-[#262626]
    dark:border-[#333333]
  "
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-3 max-w-[520px]">
            <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
              {t("search")}
            </span>

            <div className="relative group">
              <input
                value={query}
                onChange={getQuery}
                placeholder={t("searchPlaceholder")}
                className="
w-full h-[48px] rounded-full bg-gray-100 px-5 text-[15px] outline-none transition
focus:ring-2 focus:ring-blue-500
dark:bg-[#333333]
dark:text-white
dark:placeholder-gray-500
border border-transparent
dark:border-[#444]
"/>


              <Search
                className={`absolute top-[50%] translate-y-[-50%] 
              ${locale == "en" ? "right-5" : "left-5"}
              text-gray-400`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
              {t("sortBy")}
            </span>

            <CustomSelect
              options={sortOptions}
              defaultValue={sortOptions[0].value}
              onValueChange={setSort}
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
              ترتیب مرتب سازی
            </span>

            <CustomSelect
              options={orderOptions}
              defaultValue={orderOptions[0].value}
              onValueChange={setOrder}
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
              تعداد نمایش
            </span>

            <CustomSelect
              options={limitOptions}
              defaultValue={limitOptions[0].value}
              onValueChange={setLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
