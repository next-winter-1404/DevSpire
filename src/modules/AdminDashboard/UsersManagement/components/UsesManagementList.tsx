"use client";
import CustomPagination from "@/components/common/CustomPagination";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { IAllUsers } from "@/components/common/types";
import UserManagementTable from "./UserManagementTable";

const UsersList = ({ data }: { data: IAllUsers }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") ?? "1"),
  );
  const limit = parseInt(searchParams.get("limit") ?? "10");

  const onPageChange = (pageNum: number) => {
    setPage(pageNum);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNum));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-[86%] overflow-y-auto scroll-smooth w-full">
        <UserManagementTable data={data.data} />
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

export default UsersList;
