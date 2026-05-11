"use client";

import CustomPagination from "@/components/common/CustomPagination";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FastReservePagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") ?? "1"),
  );

  const onPageChange = (page: number) => {
    if (currentPage == page) return;
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathName}?${params.toString()}`);
  };
  return (
    <>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default FastReservePagination;
