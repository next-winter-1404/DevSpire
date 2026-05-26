"use client";

import PieChart from "@/components/common/PieChart";
import { Link } from "@/i18n/routing";
import "react-loading-skeleton/dist/skeleton.css";

const PaymentStatusChart = ({ percentage }: { percentage: number }) => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-white rounded-[24px] dark:bg-[#262626]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[20px] text-[#1E2022] dark:text-[#F5F5F5]">
            وضعیت پرداختی ها
          </h2>
          <p className="font-regular text-[16px] text-[#777777] dark:text-[#E4E4E4]">
            پرداختی های شما توسط فروشنده بررسی و تایید میشود
          </p>{" "}
        </div>

        <Link
          href={"/dashboard/customer/payments"}
          className="py-[10px] px-4 border border-[#DDDDDD] dark:border-gray-700 rounded-[40px] text-sm"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#E6EDF5] rounded-full"></div>

            <span className="text-gray-700 dark:text-gray-300 text-sm">
              در انتظار تایید
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#0D3B66] rounded-full"></div>

            <span className="text-gray-700 dark:text-gray-300 text-sm">
              پرداخت‌های تایید شده
            </span>
          </div>
        </div>

        <div>
          <PieChart percentage={percentage} size={132} color="#0D3B66" />
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusChart;
