"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

interface FilterModalProps {
  onClose: () => void;
}

export default function UsersManagementFiltersModal({
  onClose,
}: FilterModalProps) {
  const t = useTranslations("adminDashboard.users");
  const locale = useLocale();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [order, setOrder] = useState<string>(
    searchParams.get("order") ?? "DESC",
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get("limit") ?? "10"),
  );
  const [role, setRole] = useState<string>(searchParams.get("role") ?? "");
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "");

  const [membershipDate, setMembershipDate] = useState<DateObject | undefined>(
    () => {
      const stringDate = searchParams.get("membership_date");
      if (stringDate) {
        return new DateObject(new Date(stringDate));
      } else {
        return undefined;
      }
    },
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (membershipDate)
      params.set("membership_date", membershipDate?.toDate().toISOString());
    params.set("order", order);
    params.set("sort", sort);
    params.set("limit", String(limit));
    params.set("role", role);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (membershipDate) params.delete("membership_date");
    params.set("order", "DESC");
    params.set("limit", "10");
    params.set("page", "1");
    params.delete("role");
    params.delete("sort");

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm "
        onClick={() => onClose()}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                {t("clearFilters")}
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
                {t("filterByRole")}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-50 border
               border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2
                focus:ring-blue-100 outline-none"
              >
                <option value="" disabled>
                  {t("select")}
                </option>
                <option value="admin">{t("admin")}
                </option>
                <option value="buyer">{t("buyer")}
                </option>
                <option value="seller">{t("seller")}
                </option>
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
                <option value="DESC">{t("desc")}  </option>
                <option value="ASC">{t("asc")}</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
{t("itemsPerPage")}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
{t("sortBy")}
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 
              px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
{t("select")}
                </option>
                <option value="createdAt">{t("createdDate")}
</option>
                <option value="updatedAt">{t("updatedDate")}
</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
{t("createdDate")}
              </label>
              <DatePicker
                value={membershipDate}
                onChange={(date: DateObject) => {
                  setMembershipDate(date);
                }}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                containerClassName="w-full"
                inputClass="w-full bg-gray-50 border border-gray-200 rounded-lg
               px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
placeholder={t("membershipDatePlaceholder")}
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
    </>
  );
}
