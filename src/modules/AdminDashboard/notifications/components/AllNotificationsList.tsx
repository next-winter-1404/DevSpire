"use client";
import { TNotificationsResponse } from "@/components/common/types";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AllNotificationsTable from "./AllNotificationsTable";
import CustomPagination from "@/components/common/CustomPagination";
import { useTranslations } from "next-intl";

interface IProps {
  data: TNotificationsResponse | null;
}

const AllNotificationsList = ({ data }: IProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
const t = useTranslations("adminDashboard.notifications");

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
    <div
      className="p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   
        dark:border-[#777777] dark:bg-[#262626] h-full flex flex-col md:justify-between gap-4 "
    >
      {data ? (
        <div className="  overflow-y-auto scroll-smooth ">
          <AllNotificationsTable data={data.data} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
         <p className="text-gray-500 dark:text-gray-400 text-sm">
  {t("noNotifications")}
</p>

<p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
  {t("noNotificationsDescription")}
</p>

        </div>
      )}
      {data && (
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(data?.totalCount / limit)}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default AllNotificationsList;
