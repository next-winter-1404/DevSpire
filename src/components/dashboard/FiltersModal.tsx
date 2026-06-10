"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
interface FilterModalProps {
  onClose: () => void;
}

export default function ReserveFilterModal({ onClose }: FilterModalProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("reserveFilterModal");
  const locale = useLocale();
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
      dir={locale === "fa" ? "rtl" : "ltr"}    >
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{t("title")}</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-full cursor-pointer
             hover:bg-gray-100 text-gray-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("sortBy")}</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100
               rounded-xl py-3 px-4 text-gray-600 focus:outline-none
                focus:ring-2 focus:ring-blue-500"
            >
              <option value="created_at">{t("sort.created_at")}</option>
              <option value="updated_at">{t("sort.updated_at")}</option>
              <option value="check_in_date">{t("sort.check_in_date")}</option>
              <option value="check_out_date">{t("sort.check_out_date")}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("order")}            </label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100
               rounded-xl py-3 px-4 text-gray-600 focus:outline-none focus:ring-2
                focus:ring-blue-500"
            >
              <option value="DESC">{t("orderOptions.DESC")}</option>
              <option value="ASC">{t("orderOptions.ASC")}</option>

            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("limit")}            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-100 
              rounded-xl py-3 px-4 text-gray-600 focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={ApplyFilters}
            className="flex-1 bg-[#0F2E53] hover:bg-[#0a1e36] cursor-pointer 
             text-white py-3 rounded-xl font-medium transition-colors"
          >
            {t("apply")}          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300
             hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium 
             transition-colors cursor-pointer "
          >
            {t("cancel")}          </button>
        </div>
      </div>
    </div>
  );
}
