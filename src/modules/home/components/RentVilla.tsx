import React from 'react'
import RentVillaCard from './RentVillaCard'
import { useTranslations } from 'next-intl'


const RentVilla = () => {

  const t = useTranslations('home.rentVilla')

  return (
    <div className='flex justify-center mt-30 px-12'>
      <div className='flex flex-col gap-10'>
        <h2 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>{t('title')}</h2>
        <div className='flex flex-row flex-wrap gap-8'>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
        </div>
      </div>
    </div>
  )
}

export default RentVilla