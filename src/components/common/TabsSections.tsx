"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export interface IOptions {
  id: number;
  label: string;
}

const TabsSections = ({ options }: { options: IOptions[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = parseInt(searchParams.get("tab") || "1");

  const handleTabChange = (tabId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", String(tabId));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex items-center overflow-x-auto gap-3 pb-2">
      {options.map((item) => {
        const isActive = currentTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`py-2.5 px-4 border-2 rounded-[16px] cursor-pointer
               transition-all whitespace-nowrap text-sm ${
                 isActive
                   ? "border-primary text-primary font-bold"
                   : "border-[#777777]/20 text-gray-500 hover:border-[#777777]/50"
               }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabsSections;
