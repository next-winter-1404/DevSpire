"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardCardsSkeleton = () => {
  const arr = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {arr.map((i) => (
        <div
          key={i}
          className="flex flex-col justify-between bg-white
           dark:bg-[#262626] rounded-[24px] p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <Skeleton width={100} height={18} />
            <Skeleton width={32} height={32} borderRadius={8} />
          </div>
          <div className="self-end mt-4">
            <Skeleton width={24} height={28} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCardsSkeleton;
