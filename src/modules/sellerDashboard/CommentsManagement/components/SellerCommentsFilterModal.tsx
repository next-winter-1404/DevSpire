"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface FilterModalProps {
  onClose: () => void;
}

export default function SellerCommentsFiltersModal({
  onClose,
}: FilterModalProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("sellerDashboard.comments");
  const locale = useLocale();
  const dir = locale === "fa" ? "rtl" : "ltr";

  const [order, setOrder] = useState<string>(
    searchParams.get("order") ?? "DESC",
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get("limit") ?? "10"),
  );
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "");
  const [rating, setRating] = useState<string>(
    searchParams.get("rating") ?? "",
  );

  const [dateRange, setDateRange] = useState<DateObject[] | undefined>(() => {
    const from = searchParams.get("created_at_from");
    const to = searchParams.get("created_at_to");

    if (from && to) {
      return [new DateObject(new Date(from)), new DateObject(new Date(to))];
    }

    return undefined;
  });

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", sort);
    params.set("order", order);
    params.set("limit", String(limit));
    params.set("rating", rating);

    if (dateRange?.length === 2) {
      params.set("created_at_from", dateRange[0].toDate().toISOString());
      params.set("created_at_to", dateRange[1].toDate().toISOString());
    } else {
      params.delete("created_at_from");
      params.delete("created_at_to");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  const resetFilters = () => {
    setSort("");
    setOrder("DESC");
    setLimit(10);
    setRating("");
    setDateRange(undefined);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center
       justify-center p-4"
      dir={dir}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-5">
        <div className="flex items-center justify-between mb-5 border-b pb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800">
              {t("filterAndSort")}
            </h2>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs bg-red-50 px-2 py-1 rounded-md"
            >
              <Trash2 className="w-3 h-3" />
              {t("removeFilters")}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              {t("sortBy")}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="" disabled>
                {t("selectOption")}
              </option>

              <option value="created_at">{t("createdAt")}</option>
              <option value="rating">{t("rating")}</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              {t("order")}
            </label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="DESC">{t("desc")}</option>
              <option value="ASC">{t("asc")}</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              {t("minRating")}
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder={t("exampleRating")}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              {t("perPage")}
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              {t("dateRange")}
            </label>
            <DatePicker
              value={dateRange}
              onChange={(range: DateObject[]) => {
                setDateRange(range as DateObject[]);
              }}
              range
              rangeHover
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              containerClassName="w-full"
              inputClass="w-full bg-gray-50 border border-gray-200 rounded-lg
               px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder={t("selectDateRange")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            onClick={applyFilters}
            className="bg-[#0F2E53] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0a1e36] transition-colors"
          >
            {t("applyFilters")}
          </button>
        </div>
      </div>
    </div>
  );
}
