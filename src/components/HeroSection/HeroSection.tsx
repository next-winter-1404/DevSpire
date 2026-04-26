'use client'
import React from 'react'
import HeroSectionForm from './HeroSectionForm';


const HeroSection = () => {

  return (
    <div className='heroSectionBG flex items-center gap-16 w-[1344px] h-[640px] mt-6 mx-auto px-14 rounded-[48px]'>
      <HeroSectionForm/>
      <div className='flex flex-col gap-6 w-[651px]'>
        <h1 className='font-bold text-[36px] text-[#FFFFFF]'>خانه رویایی یا هتل دلخواهت رو اینجا پیدا کن</h1>
        <p className='font-regular text-[24px] text-[#FFFFFF]'>از خرید و فروش ملک تا اجاره کوتاه‌مدت هتل و آپارتمان؛ به راحتی جستجو کن، مقایسه کن و بهترین انتخاب رو داشته باش.</p>
        <button className='w-[181px] py-2 text-[#FFFFFF] border border-[#FFFFFF] rounded-[48px]'>رهن و اجاره ملک</button>
      </div>
    </div>
  )
}

export default HeroSection