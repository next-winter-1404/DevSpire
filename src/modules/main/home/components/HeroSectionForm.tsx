'use client'
import React, { useState } from 'react'
import EstateReserveForm from './EstateReserveForm'
import MortgageRentForm from './MortgageRentForm'
import BuySellForm from './BuySellForm'
import { useTranslations } from 'next-intl'



const HeroSectionForm = () => {

  const t = useTranslations('home.heroSectionForm')

  const [activeTab, setActiveTab] = useState('estateReserveForm')

  return (
    <div className='flex flex-col gap-5 p-6 bg-[#FFFFFF] rounded-[24px]   dark:bg-[#404040]'>
      <h2 className='font-bold text-[20px] text-[#0D3B66]   dark:text-[#F5F5F5]'>{t('title')}</h2>
      <div className='flex gap-4'>
        <button 
        onClick={() => {setActiveTab('estateReserveForm')}}
        className={`py-[10px] px-[14px] font-regular text-[14px] rounded-[40px] 
        ${activeTab == 'estateReserveForm' ? 'text-[#FFFFFF] bg-[#0D3B66]' : ''}`}>
          {t('estateReserveTab')}
        </button>
        <button 
        onClick={() => {setActiveTab('mortgageRentForm')}}
        className={`py-[10px] px-[14px] font-regular text-[14px] rounded-[40px] 
        ${activeTab == 'mortgageRentForm' ? 'text-[#FFFFFF] bg-[#0D3B66]' : ''}`}>
          {t('mortgageRentTab')}
        </button>
        <button 
        onClick={() => {setActiveTab('buySellForm')}}
        className={`py-[10px] px-[14px] font-regular text-[14px] rounded-[40px] 
        ${activeTab == 'buySellForm' ? 'text-[#FFFFFF] bg-[#0D3B66]' : ''}`}>
          {t('buySellTab')}
        </button>
      </div>
      <div>
        {activeTab == 'estateReserveForm' && <EstateReserveForm/>}
        {activeTab == 'mortgageRentForm' && <MortgageRentForm/>}
        {activeTab == 'buySellForm' && <BuySellForm/>}
      </div>
    </div>
  )
}

export default HeroSectionForm