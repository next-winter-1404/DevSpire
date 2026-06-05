"use client";
import CustomPagination from "@/components/common/CustomPagination";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PaymentTable } from "@/modules/customerDashboard/payments/components/PaymentsTable";
import { IPaymentResponse, ISellerPaymentsResponse } from "../types";

const PaymentsList = ({
  buyerData,
  sellerData,
  role,
}: {
  buyerData?: IPaymentResponse;
  sellerData?: ISellerPaymentsResponse;
  role: "seller" | "buyer" | "admin";
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") ?? "1"),
  );
  const limit = parseInt(searchParams.get("limit") ?? "6");

  const onPageChange = (pageNum: number) => {
    setPage(pageNum);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNum));
    router.push(`${pathname}?${params.toString()}`);
  };
  const totalCount =
    role === "buyer"
      ? (buyerData?.totalCount ?? 0)
      : (sellerData?.totalCount ?? 0);
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-[86%] overflow-y-auto scroll-auto w-full">
        <PaymentTable
          role={role}
          data={
            role === "buyer"
              ? (buyerData?.payments ?? [])
              : (sellerData?.data ?? [])
          }
        />
      </div>
      <div className="flex items-center pb-4 ">
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / limit)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default PaymentsList;
