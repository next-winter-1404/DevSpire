'use client'
import React from 'react'
import TwoRangeSlider from '@/components/common/TwoRangeSlider'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';


const EstateMeterageRange = () => {

    const t = useTranslations('mortgageAndRent.filters')
    

    const searchParams = useSearchParams()
    const [range, setRange] = useState<[number, number]>([
        parseInt(searchParams.get("minPrice") ?? "0"),
        parseInt(searchParams.get("maxPrice") ?? "25000000"),
    ]);
    const getSliderValues = (values: [number, number]) => setRange(values);


    return (
        <div className="flex flex-col flex-grow justify-start items-start gap-4">
            <label className="font-bold text-[16px] text-[#1E2022]   dark:text-[#FAFAFA]">{t('estateMeterageRange')}</label>
            <div className="w-full">
                <TwoRangeSlider
                defaultValues={range}
                getValues={getSliderValues}
                />
            </div>
        </div>  
    )

}

export default EstateMeterageRange