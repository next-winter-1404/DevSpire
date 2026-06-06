"use client"
import { TToursResponse } from "@/components/common/types";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ToursDataTable from "./ToursDataTable";
import CustomPagination from "@/components/common/CustomPagination";
import CustomSelect from "@/components/common/CustomSelectOption";


interface IProps{
  data: TToursResponse;
}

const ToursList = ({data}: IProps) => {


    const t = useTranslations("adminDashboard.toursManagement");
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




    const limitNumberOptions = [
        {id:1, value: "5", label: "5"},
        {id:2, value: "10", label: "10"},
        {id:3, value: "15", label: "15"},
        {id:4, value: "20", label: "20"},
    ]

    const handleLimitChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", value);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };


    return (
        <div className="flex flex-col gap-6 p-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   dark:bg-[#262626] dark:border-[#777777]">
            <ToursDataTable data={data.data}/>
            <div className="flex justify-between">
                <div>
                <CustomPagination currentPage={page} totalPages={Math.ceil(data?.totalCount / limit)} onPageChange={onPageChange}/>
                </div>
                <div className="w-40">
                <CustomSelect defaultValue={limit.toString()} options={limitNumberOptions} onValueChange={handleLimitChange}
                placeholder={t("showNumber")} className="bg-[#FFFFFF] border border-[#DDDDDD]"/>
                </div>
            </div>
        </div>
    )

}

export default ToursList