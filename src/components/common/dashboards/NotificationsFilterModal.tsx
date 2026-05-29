"use client"
import React, { useState } from 'react'
import Close from '../../../../public/icons/Close'
import CustomSelect from '../CustomSelectOption'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'use-intl'


interface IProps{
    handleNotifFilterModal: (value: boolean) => void
}

const NotificationsFilterModal = ({handleNotifFilterModal}: IProps) => {


    const t = useTranslations("sellerDashboard.notifications");
    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();


    const [isRead, setIsRead] = useState<string>(searchParams.get("isRead")?.toString() ?? "")
    const [sort, setSortBy] = useState<string>(searchParams.get("sort")?.toString() ?? "")
    const [order, setOrder] = useState<string>(searchParams.get("order")?.toString() ?? "desc")


    const isReadOptions = [
        {id:1, value: "true", label: locale === "en" ? "Yes" : "بله"},
        {id:2, value: "false", label: locale === "en" ? "No" : "خیر"},
        {id:3, value: "clear", label: locale === "en" ? "Delete This Filter" : "حذف این فیلتر"},
    ]
    const sortByOptions = [
        {id:1, value: "createdAt", label: locale === "en" ? "Created At" : "ایجاد شده"},
        {id:2, value: "updatedAt", label: locale === "en" ? "Updated At" : "بروز شده"},
        {id:3, value: "clear", label: locale === "en" ? "Delete This Filter" : "حذف این فیلتر"},
    ]
    const orderByOptions = [
        {id:1, value: "desc", label: locale === "en" ? "Descending" : "نزولی"},
        {id:2, value: "asc", label: locale === "en" ? "Ascending" : "صعودی"},
    ]


    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);
        
        if(sort && sort !== "clear"){
            params.set("sort", sort);
        } 
        else{
            params.delete("sort");
        }
        if(isRead && isRead !== "clear"){
            params.set("isRead", isRead);
        } 
        else{
            params.delete("isRead");
        }
        params.set("order", order);
        router.push(`?${params.toString()}`);
        handleNotifFilterModal(false);
    }


    return (
        <>
            <div 
            onClick={() => {handleNotifFilterModal(false)}}
            className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 cursor-pointer"></div>
            <div 
            className="flex flex-col gap-8 w-120 p-8 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] absolute top-[12%] left-[35%] z-30
            dark:border-[#777777] dark:bg-[#262626]">
                <div className="flex justify-between">
                    <span className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("filters")}</span>
                    <div 
                    onClick={() => {handleNotifFilterModal(false)}} 
                    className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer   dark:bg-[#525252]">
                        <Close className="w-4 h-4"/>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("read")}</span>
                        <CustomSelect defaultValue={isRead} options={isReadOptions} onValueChange={setIsRead}
                        placeholder={"همه"}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("sortBy")}</span>
                        <CustomSelect defaultValue={sort} options={sortByOptions} onValueChange={setSortBy}
                        placeholder={"همه"}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("orderBy")}</span>
                        <CustomSelect defaultValue={order} options={orderByOptions} onValueChange={setOrder}/>
                    </div>
                </div>
                <div className="flex gap-6">
                    <button 
                    onClick={() => {handleNotifFilterModal(false)}}
                    className="w-full py-[13px] text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer   
                    dark:text-[#E4E4E4] dark:border-[#E4E4E4]">
                        {t("cancelBtn")}
                    </button>
                    <button 
                    onClick={applyFilters}
                    className="w-full py-[13px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">{t("applyFiltersBtn")}</button>
                </div>
            </div>
        </>
    )

}

export default NotificationsFilterModal