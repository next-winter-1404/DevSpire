"use client"
import { usePathname, useRouter } from "@/i18n/routing";
import CustomPagination from "../CustomPagination"
import { TNotificationsResponse } from "../types";
import NotificationsDataTable from "./NotificationsDataTable"
import { useSearchParams } from "next/navigation";
import { useState } from "react";



interface IProps{
    data: TNotificationsResponse;
}

const NotificationsList = ({data}: IProps) => {

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
        <div className="flex flex-col gap-4">
            <NotificationsDataTable notifications={data.data}/>
            <CustomPagination currentPage={page} totalPages={Math.ceil(data.totalCount / limit)} onPageChange={onPageChange}/>
        </div>
    )

}

export default NotificationsList