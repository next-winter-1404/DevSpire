"use client";

import { Filter, House, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { SellerChooseHouseModal } from "@/modules/SellerDashboard/CommentsManagement/components/SellerChooseHouseModal";
import ReserveFilterModal from "@/components/dashboard/FiltersModal";

const SellerReserveFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsFilterOpen(false);
  };

  const [openChooseHouse, setOpenChooseHouse] = useState<boolean>(false);
  const onCloseHouse = () => {
    setOpenChooseHouse(false);
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
      <div className="relative flex-1 md:w-64"></div>
      <button
        onClick={() => setOpenChooseHouse(true)}
        className="flex items-center gap-2 px-4 py-3  border
         border-gray-200 rounded-[16px]  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626] text-foreground hover:bg-gray-50 
         transition-colors text-sm font-medium cursor-pointer "
      >
        <House className="w-5 h-5" />
        بر اساس خانه های شما
      </button>
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
      {openChooseHouse && (
        <SellerChooseHouseModal
          onClose={onCloseHouse}
          isOpen={openChooseHouse}
        />
      )}
    </div>
  );
};

export default SellerReserveFilters;
