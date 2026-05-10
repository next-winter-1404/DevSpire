import { useTranslations } from 'next-intl'
import React from 'react'
import Search from './Search'
import SortBy from './SortBy'
import EstateType from './EstateType'
import Transaction from './Transaction'
import DesiredLocation from './DesiredLocation'
import MortgageAmountRange from './MortgageAmountRange'
import RentAmountRange from './RentAmountRange'
import EstateMeterage from './EstateMeterageRange'

const Filters = () => {

    const t = useTranslations('mortgageAndRent.filters')

    return (
        <div className='flex flex-col gap-8 mt-10'>
            <div className='flex justify-between'>
                <h2 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>{t('title')}</h2>
                <div className='flex gap-2'>
                    <span></span>
                    <span className='font-regular text-[20px] text-[#0D3B66]   dark:text-[#E4E4E4]'>{t('result')}</span>
                </div>
            </div>
            <div className='flex flex-col gap-5 p-4 border border-[#DDDDDD] rounded-[24px]   dark:border-[#404040]'>
                <div className='flex flex-col gap-5   lg:flex-row'>
                    <Search/>
                    <div className='flex flex-col flex-wrap gap-5 w-full   sm:flex-row'>
                        <SortBy/>
                        <EstateType/>
                        <Transaction/>
                    </div>
                </div>
                <div className='flex flex-col gap-5   lg:flex-row'>
                    <DesiredLocation/>
                    <div className='flex flex-col flex-wrap gap-5 w-full   sm:flex-row'>
                        <MortgageAmountRange/>
                        <div className='hidden h-[88px] bg-[#DDDDDD] rounded-[48px]   sm:w-[1px]'></div>
                        <RentAmountRange/>
                        <div className='hidden h-[88px] bg-[#DDDDDD] rounded-[48px]   sm:w-[1px]'></div>
                        <EstateMeterage/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Filters