"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Filter from "../../../../../../public/icons/Filter";
import Plus from "../../../../../../public/icons/Plus";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter } from "@/i18n/routing";
import FilterCategoriesModal from "./FilterCategoriesModal";
import AddCategoryModal from "./AddCategoryModal";

const CategoriesTop = () => {
  const t = useTranslations("adminDashboard.categories");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [isOpenAddLocModal, setIsOpenAddLocModal] = useState(false);

  const [query, setQuery] = useState(searchParams.get("name") ?? "");
  const [search] = useDebounce(query, 950);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("name", search);
    } else {
      params.delete("name");
    }

    params.set("page", "1");

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [search]);

  const getQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleLocFilterModal = (value: boolean) => setIsOpenFilterModal(value);

  const handleAddCatModal = (value: boolean) => setIsOpenAddLocModal(value);

  return (
    <>
      <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:gap-4 lg:w-auto">
          <h1 className="font-bold text-xl sm:text-2xl text-[#1E2022] dark:text-[#F5F5F5] whitespace-nowrap">
            {t("title")}
          </h1>

          <input
            value={query}
            onChange={getQuery}
            type="text"
            placeholder={t("searchPlc")}
            className="
            w-full sm:w-72 lg:w-80
            h-11 sm:h-12
            px-4
            bg-background
            border border-[#DDDDDD]
            rounded-[14px]
            outline-none
            focus:ring-2 focus:ring-[#0D3B66]/30
            dark:border-[#555]
            "
          />
        </div>

        <div className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto">
          <button
            onClick={() => handleLocFilterModal(true)}
            className="
            flex items-center justify-center gap-2
            w-full sm:w-auto
            px-4 py-3
            text-[#1E2022]
            bg-[#FFFFFF]
            border border-[#DDDDDD]
            rounded-[14px]
            cursor-pointer
            hover:bg-[#F7F7F7]
            dark:text-[#E4E4E4]
            dark:bg-[#404040]
            dark:border-[#666]
            "
          >
            <Filter />
            <span>{t("filtersBtn")}</span>
          </button>

          <button
            onClick={() => handleAddCatModal(true)}
            className="
            flex items-center justify-center gap-2
            w-full sm:w-auto
            px-4 py-3
            text-white
            bg-[#0D3B66]
            rounded-[14px]
            cursor-pointer
            hover:bg-[#1B2A42]
            "
          >
            <Plus />
            <span>{t("addCategoryBtn")}</span>
          </button>
        </div>
      </div>

      {isOpenFilterModal && (
        <FilterCategoriesModal handleLocFilterModal={handleLocFilterModal} />
      )}

      {isOpenAddLocModal && (
        <AddCategoryModal handleAddCatModal={handleAddCatModal} />
      )}
    </>
  );
};

export default CategoriesTop;
