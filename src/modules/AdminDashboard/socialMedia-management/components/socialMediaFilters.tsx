"use client";

import ReserveFilterModal from "@/components/dashboard/FiltersModal";
import { usePathname, useRouter } from "@/i18n/routing";
import { Filter } from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SocialMediaFiltersModal from "./SocialMediaFiltersModal";
import SocialMediaModal from "./SocialMediaModal";
import { useTranslations } from "next-intl";

const SocialMediaFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("adminDashboard.socialMedia");

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 780);
  const [openSocialModal, setOpenSocialModal] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", "6");
    params.set("order", "DESC");
    params.set("page", "1");

    if (debouncedQuery.trim()) {
      params.set("platform", debouncedQuery.trim());
    } else {
      params.delete("platform");
    }

    const nextUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl);
    }
  }, [debouncedQuery, pathname, router, searchParams]);

  return (
    <div className="flex  flex-col-reverse md:flex-row items-center gap-4 w-full">
      <div className="relative flex-1 md:w-64"></div>
      <input
        type="text"
        value={searchQuery}
        placeholder={t("searchPlatform")}

        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className="w-full h-12 indent-4 bg-[#FFFFFF] rounded-[40px] outline-none 
                        sm:w-80
                        border
         border-gray-200   dark:border-[#333333]
          dark:bg-[#262626] text-foreground "
      />
      <button
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 px-4 py-3  border
         border-gray-200 rounded-[16px]  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626] text-foreground 
         transition-colors text-sm font-medium cursor-pointer whitespace-nowrap "
      >
        <Filter className="w-5 h-5" />
        {t("filters")}
      </button>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 px-4 py-3  border
         border-gray-200 rounded-[16px]  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626] text-foreground  
         transition-colors text-sm font-medium cursor-pointer whitespace-nowrap "
          onClick={() => {
            setOpenSocialModal(true);
          }}
        >
          {t("addNewLink")}
        </button>
      </div>
      {isFilterOpen && (
        <SocialMediaFiltersModal onClose={() => setIsFilterOpen(false)} />
      )}
      {openSocialModal && (
        <SocialMediaModal onClose={() => setOpenSocialModal(false)} />
      )}
    </div>
  );
};

export default SocialMediaFilters;
