"use client"
import CustomSelect from '@/components/common/CustomSelectOption'
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Close from '../../../../../public/icons/Close';
import TwoRangeSlider from '@/components/common/TwoRangeSlider';


interface IProps{
    setIsOpenFilterModal: (value: boolean) => void
}

const FilterModal = ({setIsOpenFilterModal}:IProps) => {

    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [range, setRange] = useState<[number, number]>([
        parseInt(searchParams.get("minPrice") ?? "0"),
        parseInt(searchParams.get("maxPrice") ?? "50000000000"),
    ]);
    const estateTypeOptions = [
        {value: "created_at", label: locale == "en" ? "created at" : "زمان ایجاد شده"},
        {value: "updated_at", label: locale == "en" ? "last updated" : "زمان بروز شده"},
    ];
    const estateStatusOptions = [
        {value: "created_at", label: locale == "en" ? "created at" : "زمان ایجاد شده"},
        {value: "updated_at", label: locale == "en" ? "last updated" : "زمان بروز شده"},
    ];
    


    const [estateType, setEstateType] = useState<string>(
        searchParams.get("category")?.toString() ?? "",
    );
    const [estateStatus, setEstateStatus] = useState<string>(
        searchParams.get("sort") ?? estateStatusOptions[0].value,
    );


    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const setOrDelete = (key: string, value: string) => {
        if (value) params.set(key, value);
        else params.delete(key);
        };
        setOrDelete("estateType", estateType);
        setOrDelete("estateStatus", estateStatus);
        if (range) {
        params.set("minPrice", String(range[0]));
        params.set("maxPrice", String(range[1]));
        }
        params.set("page", "1");
        const currentQueryString = searchParams.toString();
        const newQueryString = params.toString();
        if (currentQueryString !== newQueryString) {router.push(`${pathname}?${newQueryString}`, { scroll: false })}
    }, [estateType, estateStatus]);

    const deleteFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const isAvailble = params.get(key);
        if (isAvailble) {
        params.delete(key);
        }
        router.push(`${pathname}?${params}`);
    };



    const getEstateTypeOptions = (value: string) => {
        setEstateType(value);
    };
    const getEstateStatusOptions = (value: string) => {
        setEstateStatus(value);
    };
    const getSliderValues = (values: [number, number]) => setRange(values);


    return (
        <>
            <div className="flex flex-col gap-8 w-[563px] p-8 bg-[#FFFFFF] rounded-[24px] absolute top-40 right-124 z-30">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-[24px] text-[#1E2022]">فیلتر ها</h2>
                    <div onClick={() => {setIsOpenFilterModal(false)}} className="flex items-center p-4 bg-[#F5F5F5] rounded-full">
                        <Close className="w-4 h-4"/>
                    </div>
                </div>
                <div className="flex gap-8">
                    <CustomSelect options={estateTypeOptions} defaultValue={estateTypeOptions[0].value} onValueChange={getEstateTypeOptions}/>
                    <CustomSelect options={estateStatusOptions} defaultValue={estateStatusOptions[0].value} onValueChange={getEstateStatusOptions}/>
                </div>
                <TwoRangeSlider max={50000000000} defaultValues={range} getValues={getSliderValues}/>
                <div className="flex gap-6 font-regular text-[16px]">
                    <button 
                    onClick={() => {setIsOpenFilterModal(false)}}
                    className="w-full py-[13px] text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer">
                        انصراف
                    </button>
                    <button className="w-full py-[13px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">اعمال فیلتر</button>
                </div>
            </div>
            <div className="w-full h-full bg-black/40 backdrop-blur-sm fixed inset-0 z-0 animate-fadeIn"></div>
        </>
    )

}

export default FilterModal