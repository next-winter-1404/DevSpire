"use client";

import { Filter, House, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import ReserveFilterModal from "./FiltersModal";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const ReserveFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsFilterOpen(false);
  };

  const locale = useLocale();
  const isRTL = locale == "fa";
const t = useTranslations("reserveFilters");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    // if (search) {
    //   params.set("search", search);
    // }
    params.set("limit", "6");
    params.set("order", "DESC");
    params.set("page", "1");
    params.set("sort", "created_at");
    router.push(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 px-4 py-3  border
         border-gray-200 rounded-[16px]  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626] text-foreground hover:bg-gray-50 
         transition-colors text-sm font-medium cursor-pointer "
      >
        <Filter className="w-5 h-5" />
{t("filters")}
      </button>
      {isFilterOpen && <ReserveFilterModal onClose={onClose} />}
    </>
  );
};

export default ReserveFilters;
