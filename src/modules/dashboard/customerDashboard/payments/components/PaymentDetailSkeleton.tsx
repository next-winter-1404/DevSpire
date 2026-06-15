"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PaymentDetailSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Skeleton
          circle
          width={64}
          height={64}
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          className="dark:!bg-gray-700"
        />
      </div>

      <div className="flex justify-center">
        <Skeleton width={180} height={24} />
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <div className="flex justify-between">
          <Skeleton width={100} />
          <Skeleton width={140} />
        </div>

        <div className="flex justify-between">
          <Skeleton width={120} />
          <Skeleton width={160} />
        </div>

        <div className="flex justify-between">
          <Skeleton width={100} />
          <Skeleton width={120} />
        </div>

        <div className="flex justify-between">
          <Skeleton width={110} />
          <Skeleton width={150} />
        </div>

        <div className="flex justify-between">
          <Skeleton width={120} />
          <Skeleton width={100} />
        </div>
      </div>

      <Skeleton height={42} borderRadius={12} />
    </div>
  );
};

export default PaymentDetailSkeleton;
