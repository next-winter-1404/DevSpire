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

  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
  const [isOpenAddLocModal, setIsOpenAddLocModal] = useState<boolean>(false);
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

  const handleLocFilterModal = (value: boolean) => {
    setIsOpenFilterModal(value);
  };
  const handleAddCatModal = (value: boolean) => {
    setIsOpenAddLocModal(value);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full   sm:flex-row sm:justify-between">
        <div className="flex flex-col items-start gap-4 w-full   sm:flex-row sm:items-center sm:w-auto">
          <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
            {t("title")}
          </h1>
          <input
            value={query}
            onChange={getQuery}
            type="text"
            placeholder={t("searchPlc")}
            className="w-full h-12 indent-4 bg-background border border-[#DDDDDD] rounded-[16px]   sm:w-80   dark:border-[#777777]"
          />
        </div>
        <div className="flex flex-col items-center gap-4 w-full sm:flex-row sm:w-auto">
          <button
            onClick={() => handleLocFilterModal(true)}
            className="flex justify-center items-center gap-3 w-full py-[13px] text-[#1E2022] bg-[#FFFFFF] border 
                    border-[#DDDDDD] rounded-[16px] cursor-pointer 
                    sm:w-auto sm:px-3 
                    dark:text-[#E4E4E4] dark:bg-[#404040] dark:border-[#E4E4E4]"
          >
            <Filter />
            <span>{t("filtersBtn")}</span>
          </button>
          <button
            onClick={() => handleAddCatModal(true)}
            className="flex justify-center items-center gap-3 w-full py-[13px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] 
                    cursor-pointer 
                    hover:bg-[#1B2A42]
                    sm:w-auto sm:px-3"
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
