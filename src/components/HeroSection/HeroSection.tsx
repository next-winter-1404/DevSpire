'use client'
import React from 'react'
import { useTranslation } from 'next-i18next/pages'
import HeroSectionForm from './HeroSectionForm';


const HeroSection = () => {

  const {t} = useTranslation();

  return (
    <div className='heroSectionBG flex items-center gap-16 w-[1344px] h-[640px] rounded-[48px]'>
      <HeroSectionForm/>
      <div className='flex flex-col gap-6'>
        <h1 className='font-bold text-[36px] text-white'>{t('heroSection.title')}</h1>
        <p className='font-regular text-[24px] text-white'>{t('heroSection.description')}</p>
        <button className='py-2 px-6 text-white border border-white rounded-[48px]'>{t('heroSection.button')}</button>
      </div>
    </div>
  )
}

export default HeroSection