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
                <h2 className='font-bold text-[24px] text-[#1E2022]'>{t('title')}</h2>
                <div className='flex gap-2'>
                    <span></span>
                    <span className='font-regular text-[20px] text-[#0D3B66]'>{t('result')}</span>
                </div>
            </div>
            <div className='flex flex-col gap-5 p-4 border border-[#DDDDDD] rounded-[24px]'>
                <div className='flex gap-5'>
                    <Search/>
                    <SortBy/>
                    <EstateType/>
                    <Transaction/>
                </div>
                <div className='flex gap-5'>
                    <DesiredLocation/>
                    <MortgageAmountRange/>
                    <div className='w-[1px] h-[88px] bg-[#DDDDDD] rounded-[48px]'></div>
                    <RentAmountRange/>
                    <div className='w-[1px] h-[88px] bg-[#DDDDDD] rounded-[48px]'></div>
                    <EstateMeterage/>
                </div>
            </div>
        </div>
    )

}

export default Filters