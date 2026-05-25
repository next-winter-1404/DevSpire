import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function DashboardTableSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton height={28} width={180} />
        <Skeleton height={40} width={260} borderRadius={10} />
      </div>

      <div
        className="dark:bg-[#262626] bg-[#ffff] border border-gray-200
       dark:border-gray-700 rounded-xl p-4"
      >
        <div className="grid grid-cols-5 gap-4 mb-4">
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 py-3">
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} width={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
