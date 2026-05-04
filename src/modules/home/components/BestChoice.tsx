import React from 'react'
import BestChoiceSlider from './BestChoiceSlider'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing';


const BestChoice = () => {

  const t = useTranslations('home.bestChoice')

  return (
    <div className='flex justify-between mt-30 px-12'>
      <div className='flex flex-col gap-8 w-full'>
        <div className='flex justify-between px-12'>
          <h2 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>{t('title')}</h2>
          <Link href={'/fast-reserve'}
          className='py-2 px-4 font-regular text-[20px] text-[#0D3B66] border border-[#0d3B66] rounded-[40px] transition-all 
          duration-300 ease-in-out cursor-pointer
          hover:text-[#FFFFFF] hover:bg-[#0D3B66]
          dark:text-[#F5F5F5] dark:border-[#F5F5F5]'>
            {t('seeAllButton')}
          </Link>
        </div>
        <BestChoiceSlider />
      </div>
    </div>
  );
};

export default BestChoice;
