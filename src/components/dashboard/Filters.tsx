"use client";

import { Filter, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";
import ReserveFilterModal from "./FiltersModal";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const ReserveFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  // const [query, setQuery] = useState<string>(searchParams.get("search") ?? "");
  // const [search] = useDebounce(query, 800);

  const onClose = () => {
    setIsFilterOpen(false);
  };
  const locale = useLocale();
  const isRTL = locale == "fa";

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
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1 md:w-64">
        {/* <input
          type="text"
          placeholder="جستجو ..."
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          className="w-full pl-10 pr-4 py-3 bg-white border
           border-gray-200 rounded-[16px] focus:outline-none focus:ring-2
            focus:ring-blue-500 text-sm"
        />
        <Search
          className="absolute left-3 top-[50%] -translate-y-[50%] w-5 h-5
         text-gray-400"
        /> */}
      </div>

      <button
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 px-4 py-3  border
         border-gray-200 rounded-[16px]  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626] text-foreground hover:bg-gray-50 
         transition-colors text-sm font-medium cursor-pointer "
      >
        <Filter className="w-5 h-5" />
        فیلتر ها
      </button>
      {isFilterOpen && <ReserveFilterModal onClose={onClose} />}
    </div>
  );
};

export default ReserveFilters;
