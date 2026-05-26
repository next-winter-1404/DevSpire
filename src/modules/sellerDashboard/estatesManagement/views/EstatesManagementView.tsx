"use client";
import Search from "../../../../../public/icons/Search";
import { useLocale, useTranslations } from "next-intl";
import Plus from "../../../../../public/icons/Plus";
import DataTable from "../components/DataTable";
import { THousesResponse, TUserHouseResponse } from "@/components/common/types";
import EstManagementPagination from "../components/EstManagementPagination";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useDebounce } from "use-debounce";

interface IProps {
  data: THousesResponse;
}

const EstatesManagementView = ({ data }: IProps) => {
  const locale = useLocale();

  const t = useTranslations("sellerDashboard.estatesManagement");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  // const [query, setQuery] = useState(searchParams.get("query") ?? "");
  // const [search] = useDebounce(query, 950);

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   const setOrDelete = (key: string, value: string) => {
  //     if (value) params.set(key, value);
  //     else params.delete(key);
  //   };
  //   setOrDelete("search", search);
  //   const currentQueryString = searchParams.toString();
  //   const newQueryString = params.toString();
  //   if (currentQueryString !== newQueryString) {
  //     router.push(`${pathname}?${newQueryString}`, { scroll: false });
  //   }
  // }, [search]);

  // const getQuery = (e: ChangeEvent<HTMLInputElement>) =>
  //   setQuery(e.target.value);

  return (
    <>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
            {t("estatesManagement")}
          </h1>
          <div className="flex gap-4 h-full">
            {/* <div className='relative text-[#777777]   dark:text-[#E4E4E4]'>
              <input 
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => getQuery(e)}
              type='text' 
              placeholder={t('searchPlaceholder')}
              className='w-[440px] h-12 indent-5 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]   
              dark:bg-[#777777] dark:border-[#A3A3A3]'/>
              <Search className={`absolute top-[30%] ${locale == 'en' ? 'right-5' : 'left-5'}`}/>
            </div> */}
            {/* <button 
            onClick={() => {setIsOpenFilterModal(true)}}
            className='flex items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]
            cursor-pointer
            dark:text-[#E6EDF5] dark:bg-transparent dark:border-[#E6EDF5]'>
              <Filter/>
              <span className='font-regular text-[16px]'>{t('filtersBtn')}</span>
            </button> */}
            <Link
              href="/dashboard/seller/estates-management/create"
              className="flex items-center gap-3 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer
            dark:text-[#0D3B66] dark:bg-[#E6EDF5]"
            >
              <Plus />
              <span className="font-regular text-[16px]">
                {t("addEstateBtn")}
              </span>
            </Link>
          </div>
        </div>
        <div
          className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]  "
        >
          {data.houses.length > 0 ? (
            <DataTable data={data.houses} />
          ) : (
            <div
              className="flex flex-col items-center justify-center 
            h-[300px] text-center px-4"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                ملکی اضافه نکردید !{" "}
              </p>
            </div>
          )}
        </div>

        {/* <EstManagementPagination
          totalPages={Math.ceil(data?.totalCount / limit)}
        /> */}
      </div>
      {
        // isOpenFilterModal && <FilterModal setIsOpenFilterModal={setIsOpenFilterModal}/>
      }
    </>
  );
};

export default EstatesManagementView;
