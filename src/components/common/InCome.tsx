"use client";

import PieChart from "@/components/common/PieChart";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface InComeProps {
  title?: string;
  dateRange?: string;
  totalIncome?: string;
  currentIncome?: string;
  percentage?: number;
}

const InCome: React.FC<InComeProps> = ({
  title,
  dateRange,
  totalIncome,
  currentIncome,
  percentage,
}) => {  const t = useTranslations("customerDashboard.income");

  return (
    <div className="flex flex-col w-full p-4 sm:p-5 md:p-6 bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[18px] sm:text-[20px] text-[#1E2022] dark:text-[#F5F5F5]">
            {title}
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#777777] dark:text-[#E4E4E4]">
            {dateRange}
          </p>
        </div>

        <Link
          href="/dashboard/seller/financial"
          className="w-fit py-[10px] px-4 border border-[#DDDDDD] rounded-[40px] text-sm sm:text-base"
        >
          {t("view")}
        </Link>
      </div>

      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#E6EDF5] rounded-full shrink-0"></div>
              <span className="text-sm sm:text-base">{t("totalIncome")}</span>
            </div>
            <div className="flex gap-2 text-[13px] sm:text-[14px] text-[#1E2022] dark:text-[#F5F5F5]">
              <span>{totalIncome}</span>
              <span>{t("currency")}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#0D3B66] rounded-full shrink-0"></div>
              <span className="text-sm sm:text-base"> {t("monthlyIncome")}</span>
            </div>
            <div className="flex gap-2 text-[13px] sm:text-[14px] text-[#1E2022] dark:text-[#F5F5F5]">
              <span>{currentIncome}</span>
              <span>{t("currency")}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <PieChart percentage={percentage} size={110} color="#0D3B66" />
        </div>
      </div>
    </div>
  );
};

export default InCome;
