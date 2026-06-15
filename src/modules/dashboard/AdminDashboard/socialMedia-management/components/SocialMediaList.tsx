"use client";
import CustomPagination from "@/components/common/CustomPagination";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { TSocialMediaRes } from "../types";
import SocialMediaTable from "./SocialMediaTable";

const SocialMediaList = ({ data }: { data: TSocialMediaRes }) => {
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
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-[86%] overflow-y-auto scroll-auto w-full">
        <SocialMediaTable data={data.data} />
      </div>
      <div className="flex items-center pb-4 ">
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(data.totalCount / limit)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default SocialMediaList;
