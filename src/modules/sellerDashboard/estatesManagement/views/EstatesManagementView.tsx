"use client"
import Search from '../../../../../public/icons/Search'
import { useLocale, useTranslations } from 'next-intl'
import Filter from '../../../../../public/icons/Filter'
import Plus from '../../../../../public/icons/Plus'
import DataTable from '../components/DataTable'
import { TUserHouseResponse } from '@/components/common/types'
import EstManagementPagination from '../components/EstManagementPagination'


interface IProps{
  data: TUserHouseResponse;
  limit: number;
}


const EstatesManagementView = ({data, limit}:IProps) => {

  const locale = useLocale();

  return (
    <div className='flex flex-col gap-4 p-6 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]   
    dark:bg-[#404040] dark:border-[#777777]'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>{t('estatesManagement')}</h1>
        <div className='flex gap-4'>
          <div className='relative text-[#777777]   dark:text-[#E4E4E4]'>
            <input type='text' placeholder={t('searchPlaceholder')}
            className='w-[440px] h-12 indent-5 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]   
            dark:bg-[#777777] dark:border-[#A3A3A3]'/>
            <Search className={`absolute top-[30%] ${locale == 'en' ? 'right-5' : 'left-5'}`}/>
          </div>
          <button className='flex items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]
          cursor-pointer
          dark:text-[#E6EDF5] dark:bg-transparent dark:border-[#E6EDF5]'>
            <Filter/>
            <span className='font-regular text-[16px]'>{t('filtersBtn')}</span>
          </button>
          <button className='flex items-center gap-3 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]
          cursor-pointer
          dark:text-[#0D3B66] dark:bg-[#E6EDF5]'>
            <Plus/>
            <span className='font-regular text-[16px]'>{t('addEstateBtn')}</span>
          </button>
        </div>
      </div>
      <DataTable dataTableHeaderItems={[
        {id:1, label: "نام اقامتگاه", className: "w-[320px]"},
        {id:2, label: "تاریخ رزرو", className: "w-[240px]"},
        {id:3, label: "قیمت", className: "w-[240px]"},
        {id:4, label: "وضعیت", className: "w-[224px]"},
        {id:5, label: "عملیات", className: "w-[48px]"}
      ]}
      houses={data?.houses}/>
      <EstManagementPagination totalPages={Math.ceil(data?.totalCount / limit)}/>
    </div>
  );
};

export default EstatesManagementView;
