import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CommentItemSkeleton() {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-200">
      <Skeleton circle width={55} height={55} />

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton width={120} height={18} />
          <Skeleton width={80} height={14} />
        </div>

        <div className="space-y-2">
          <Skeleton height={14} />
          <Skeleton height={14} />
          <Skeleton height={14} width="70%" />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Skeleton width={60} height={16} />
          <Skeleton width={60} height={16} />
        </div>
      </div>
    </div>
  );
}
