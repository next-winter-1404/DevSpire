"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Filter from "../../../../../../public/icons/Filter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter } from "@/i18n/routing";
import FilterSocBookMarksModal from "./FilterSocBookMarksModal";

const SocialBookMarksTop = () => {
  const t = useTranslations("customerDashboard.socialBookMarks");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
  const [query, setQuery] = useState(searchParams.get("note") ?? "");
  const [search] = useDebounce(query, 950);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("note", search);
    } else {
      params.delete("note");
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

  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-4 w-full   sm:flex-row">
          <h1 className="font-bold text-[24px] text-[#1E2022] dark:text-[#F5F5F5]">
            {t("title")}
          </h1>
          <input
            value={query}
            onChange={getQuery}
            type="text"
            placeholder={t("searchPlc")}
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]   
                    sm:w-80
                    dark:border-[#777777] dark:bg-[#262626]"
          />
        </div>
        <button
          onClick={() => handleLocFilterModal(true)}
          className="flex justify-center items-center gap-3 w-full py-[13px] text-[#1E2022] bg-[#FFFFFF] border 
                border-[#DDDDDD] rounded-[16px] cursor-pointer 
                sm:w-32 sm:px-3 
                dark:text-[#E4E4E4] dark:bg-[#404040] dark:border-[#E4E4E4]"
        >
          <Filter />
          <span>{t("filtersBtn")}</span>
        </button>
      </div>
      {isOpenFilterModal && (
        <FilterSocBookMarksModal handleLocFilterModal={handleLocFilterModal} />
      )}
    </>
  );
};

export default SocialBookMarksTop;
