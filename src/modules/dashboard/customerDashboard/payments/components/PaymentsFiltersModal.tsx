"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";

interface FilterModalProps {
  onClose: () => void;
}

export default function PaymentsFilterModal({ onClose }: FilterModalProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [order, setOrder] = useState<string>(
    searchParams.get("order") ?? "DESC",
  );
  const [limit, setLimit] = useState<number>(
    parseInt(searchParams.get("limit") ?? "6"),
  );
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "");
  const [status, setStatus] = useState<string>(
    searchParams.get("status") ?? "",
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", sort);
    params.set("order", order);
    params.set("limit", String(limit));
    params.set("status", status);
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
      <div className="bg-background rounded-3xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">فیلتر و مرتب‌سازی</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 dark:bg-blue-50 rounded-full cursor-pointer
             hover:bg-gray-100 transition text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مرتب‌سازی بر اساس
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-background border border-gray-100 rounded-xl py-3 
              px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                انتخاب کنید...
              </option>
              <option value="createdAt">تاریخ ایجاد</option>
              <option value="updatedAt">تاریخ بروزرسانی</option>
              <option value="status">وضعیت</option>
              <option value="amount">مبلغ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ترتیب
            </label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-background border border-gray-100 rounded-xl py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DESC">نزولی - جدید به قدیم</option>
              <option value="ASC">صعودی - قدیم به جدید</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تعداد در صفحه
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full bg-background border border-gray-100 rounded-xl
               py-3 px-4 text-gray-600 focus:outline-none focus:ring-2
                focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وضعیت
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-background border border-gray-100 rounded-xl py-3
               px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                انتخاب کنید...
              </option>
              <option value="pending">در انتظار تایید</option>
              <option value="completed">تایید شده</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={applyFilters}
            className="flex-1 bg-[#0F2E53] hover:bg-[#0a1e36]
             cursor-pointer text-white py-3 rounded-xl font-medium
              transition-colors"
          >
            اعمال تغییرات
          </button>
          <button
            onClick={() => {
              setSort("");
              setStatus("");
              setOrder("DESC");
              setLimit(6);
            }}
            className="w-full text-red-500 hover:text-red-600 text-sm py-2 
            font-medium"
          >
            حذف تمام فیلترها
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-background border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
