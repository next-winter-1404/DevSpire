"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardChartsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col bg-white dark:bg-[#262626] rounded-[24px] p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton width={120} height={20} />
          <Skeleton width={90} height={32} borderRadius={24} />
        </div>

        <div className="flex flex-col justify-between sm:flex-row items-center gap-6">
          <div className="flex-grow min-w-[200px] space-y-3">
            <Skeleton width={"75%"} height={16} />
            <Skeleton width={"90%"} height={16} />
            <Skeleton width={"50%"} height={14} />
          </div>

          <Skeleton circle width={100} height={100} />
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-[#262626] rounded-[24px] p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton width={100} height={20} />
          <Skeleton width={90} height={32} borderRadius={24} />
        </div>

        <div
          className="flex flex-col justify-between sm:flex-row
         items-center gap-6"
        >
          <div className="flex-grow min-w-[200px] space-y-3">
            <Skeleton width={"75%"} height={16} />
            <Skeleton width={"85%"} height={16} />
            <div className="flex gap-2 mt-2">
              <Skeleton width={20} height={20} circle />
              <Skeleton width={100} height={16} />
            </div>
            <div className="flex gap-2">
              <Skeleton width={20} height={20} circle />
              <Skeleton width={130} height={16} />
            </div>
          </div>

          <Skeleton circle width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default DashboardChartsSkeleton;
