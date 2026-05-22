"use client";
import CustomPagination from "@/components/common/CustomPagination";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ICommentResponse } from "@/modules/sellerDashboard/payments/types";
import CommentsTable from "./CommentsTable";

const CommentsList = ({
  data,
  role,
}: {
  data: ICommentResponse;
  role: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(parseInt(String(data.currentPage)));
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
        <CommentsTable comments={data.comments} />
      </div>
      <div className="flex items-center pb-4 ">
        <CustomPagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default CommentsList;
