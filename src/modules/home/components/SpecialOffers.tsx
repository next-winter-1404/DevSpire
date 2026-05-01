import React from 'react'
import SpecialOffersSlider from './SpecialOffersSlider'
import { useTranslations } from 'next-intl'


const SpecialOffers = () => {

  const t = useTranslations('home.specialOffers')

  return (
    <div className='flex justify-center mt-30 px-12'>
      <div className='flex flex-col gap-8 w-full'>
        <div className='flex justify-between w-full px-12'>
          <div className='flex gap-2 font-bold text-[24px]'>
            <h2 className='text-[#FF5555]'>{t('redTitle')}</h2>
            <h2 className='text-[#1E2022]'>{t('darkTitle')}</h2>
          </div>
          <button className='w-[137px] py-2 text-[#0D3B66] border border-[#0D3B66] rounded-[40px]
          dark:text-[#E4E4E4] dark:border-[#E4E4E4]'>{t('seeAllButton')}</button>
        </div>
        <SpecialOffersSlider/>
      </div>
    </div>
  )
}

export default SpecialOffers