"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { Filter } from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UsersManagementFiltersModal from "./UserManagementFiltersModal";
import { useTranslations } from "next-intl";

const UsersManagementFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
const t = useTranslations("adminDashboard.users");

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsFilterOpen(false);
  };
  const locale = useLocale();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", "10");
    params.set("order", "DESC");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1 md:w-64"></div>

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
      {isFilterOpen && <UsersManagementFiltersModal onClose={onClose} />}
    </div>
  );
};

export default UsersManagementFilters;
