"use client"
import LocationsDataTable from "@/modules/AdminDashboard/LocationsManagement/components/LocationsDataTable";
import CustomPagination from "@/components/common/CustomPagination";
import { TLocationsResponse } from "@/components/common/types"
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CustomSelect from "@/components/common/CustomSelectOption";
import { useLocale } from "next-intl";

interface IProps{
  data: TLocationsResponse;
}

const LocationsList = ({data}: IProps) => {


  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

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
    {id:1, value: "6", label: "6"},
    {id:2, value: "9", label: "9"},
    {id:3, value: "12", label: "12"},
    {id:4, value: "15", label: "15"},
  ]

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  

  return (
    <div className="flex flex-col gap-6 p-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]">
      <LocationsDataTable data={data.data}/>
      <div className="flex justify-between">
        <CustomPagination currentPage={page} totalPages={Math.ceil(data?.totalCount / limit)} onPageChange={onPageChange}/>
        {/* <div>
          <CustomSelect defaultValue={limit.toString()} options={limitNumberOptions} onValueChange={handleLimitChange}
          placeholder="تعداد نمایش" className="bg-[#FFFFFF] border border-[#DDDDDD]"/>
        </div> */}
      </div>
    </div>
  )
}

export default LocationsList
