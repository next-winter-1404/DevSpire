"use client";
import PieChart from "@/components/common/PieChart";
import { Link } from "@/i18n/routing";

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
}) => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[20px] text-[#1E2022] dark:text-[#F5F5F5]">
            {title}
          </h2>
          <p className="font-regular text-[16px] text-[#777777] dark:text-[#E4E4E4]">
            {dateRange}
          </p>
        </div>
        <Link
          href="/dashboard/seller/financial"
          className="py-[10px] px-4 border border-[#DDDDDD] rounded-[40px]"
        >
          مشاهده
        </Link>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#E6EDF5] rounded-full"></div>
              <span>درآمد کل</span>
            </div>
            <div className="flex gap-2 font-regular text-[14px] text-[#1E2022] dark:text-[#F5F5F5]">
              <span>{totalIncome}</span>
              <span>تومان</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#0D3B66] rounded-full"></div>
              <span>درآمد این ماه</span>
            </div>
            <div className="flex gap-2 font-regular text-[14px] text-[#1E2022] dark:text-[#F5F5F5]">
              <span>{currentIncome}</span>
              <span>تومان</span>
            </div>
          </div>
        </div>
        <PieChart percentage={percentage} size={130} color="#0D3B66" />
      </div>
    </div>
  );
};

export default InCome;
