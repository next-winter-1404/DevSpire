'use client'
import React from 'react'
import HeroSectionForm from './HeroSectionForm';

const HeroSection = () => {
  return (
    <div className='flex justify-center mt-6 px-12'>
      <div className='heroSectionBG relative flex flex-col gap-4 items-center py-6 px-14 bg-cover rounded-[48px] overflow-hidden 
      md:flex md:flex-row md:gap-16' 
      style={{backgroundImage: `url('/images/landing/herosection.jpg')`}} 
      >
        <div className='absolute inset-0 bg-black/50 z-0'></div>
        <div className='relative z-10 flex flex-col gap-4 items-center py-6 px-14 md:flex md:flex-row md:gap-16'>
          <HeroSectionForm/>
          <div className='flex flex-col gap-6 md:w-[651px]'>
            <h1 className='font-bold text-[36px] text-[#FFFFFF]'>خانه رویایی یا هتل دلخواهت رو اینجا پیدا کن</h1>
            <p className='font-regular text-[24px] text-[#FFFFFF]'>از خرید و فروش ملک تا اجاره کوتاه‌مدت هتل و آپارتمان؛ به راحتی جستجو کن، مقایسه کن و بهترین انتخاب رو داشته باش.</p>
            <button className='w-[181px] py-2 text-[#FFFFFF] border border-[#FFFFFF] rounded-[48px]'>رهن و اجاره ملک</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
