"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";

interface FilterModalProps {
  onClose: () => void;
}

export default function ReserveFilterModal({ onClose }: FilterModalProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [sort, setSort] = useState<string>(
    searchParams.get("sort") ?? "created_at",
  );
  const [order, setOrder] = useState<string>(
    searchParams.get("order") ?? "DESC",
  );
  const [limit, setLimit] = useState<number>(
    parseInt(searchParams.get("limit") ?? "6"),
  );

  const ApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", sort);
    params.set("order", order);
    params.set("limit", String(limit));
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
       bg-black/40 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="bg-white dark:!bg-[#262626] rounded-3xl shadow-xl w-full max-w-md p-6 border dark:border-[#333]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100
 ">فیلتر و مرتب‌سازی</h2>
          <button
            onClick={onClose}
            className="p-2
bg-gray-50 dark:bg-[#262626]
rounded-full
hover:bg-gray-100 dark:hover:bg-[#333]
text-gray-500 dark:text-gray-300
cursor-pointer transition"
          >
            <X className="w-5 h-5 " />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block dark:text-gray-300 text-sm font-medium text-gray-700 mb-2">
              مرتب‌سازی بر اساس
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full
bg-gray-50 dark:bg-[#262626]
border border-gray-200 dark:border-[#333]
rounded-xl py-3 px-4
text-gray-700 dark:text-gray-200
focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="created_at">تاریخ ایجاد </option>
              <option value="updated_at">تاریخ بروزرسانی </option>
              <option value="check_in_date">تاریخ ورود </option>
              <option value="check_out_date">تاریخ خروج</option>
            </select>
          </div>

          <div>
            <label className="block dark:text-gray-300 text-sm font-medium text-gray-700 mb-2">
              ترتیب
            </label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full
bg-gray-50 dark:bg-[#262626]
border border-gray-200 dark:border-[#333]
rounded-xl py-3 px-4

text-gray-700 dark:text-gray-200
focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DESC">نزولی - جدید به قدیم</option>
              <option value="ASC">صعودی - قدیم به جدید </option>
            </select>
          </div>

          <div>
            <label className="block dark:text-gray-300 text-sm font-medium text-gray-700 mb-2">
              تعداد در صفحه
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full
bg-gray-50 dark:bg-[#262626]
border border-gray-200 dark:border-[#333]
rounded-xl py-3 px-4
text-gray-700 dark:text-gray-200
focus:outline-none focus:ring-2 focus:ring-blue-500"

            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={ApplyFilters}
            className="flex-1 bg-[#0F2E53] hover:bg-[#0a1e36] cursor-pointer 
             text-white py-3 rounded-xl font-medium transition-colors"
          >
            اعمال تغییرات
          </button>
          <button
            onClick={onClose}
            className="flex-1
bg-white dark:!bg-[#262626]
border border-gray-300 dark:border-[#333]
hover:bg-gray-50 dark:hover:bg-[#333]
text-gray-700 dark:text-gray-200
py-3 rounded-xl font-medium transition-colors cursor-pointer"

          >
            انصراف
          </button>
        </div>
      </div>
    </div >
  );
}
