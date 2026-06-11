import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardCardsSkeleton from "@/components/dashboard/DashboardCardsSkeleton";
import DashboardChartsSkeleton from "@/components/dashboard/DashboardChartsSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDashboardSkeleton = () => {
  return (
    <>
      <DashboardCardsSkeleton />
      <div className="w-full mt-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col bg-white dark:bg-[#262626] rounded-[24px] h-full p-6">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
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
        </div>
      </div>
      <DashboardTableSkeleton />
    </>
  );
};

export default AdminDashboardSkeleton;
