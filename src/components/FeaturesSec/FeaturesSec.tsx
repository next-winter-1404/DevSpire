import React from 'react'
import FeatureSecImg from '../../../public/images/landing/Usability testing-pana 1.svg'
import Image from 'next/image'
import Tick from '../../../public/icons/Tick'

const FeaturesSec = () => {
  return (
    <div className='flex gap-30 w-full mt-24 mx-auto px-[144px]'>
        <Image src={FeatureSecImg} alt='featureSec' width={480} height={480}/>
        <div className='flex flex-col gap-10'>
            <h2 className='font-bold text-[32px] text-[#1E2022]'>ویژگی هایی که ما را متفاوت می سازد</h2>
            <div className='flex flex-col gap-10'>
                <div className='flex gap-10'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <Tick/>
                            <span className='font-bold text-[24px] text-[#0D3B66]'>پشتیبانی کامل و شفافیت</span>
                        </div>
                        <div className='flex flex-col gap-4 font-regular text-[16px] text-[#777777]'>
                            <span>پاسخگویی سریع و ۲۴ ساعته</span>
                            <span>توضیحات دقیق درباره شرایط ملک</span>
                            <span>شفافیت در قیمت و قرارداد</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <Tick/>
                            <span className='font-bold text-[24px] text-[#0D3B66]'>فایل‌های واقعی و به‌روز</span>
                        </div>
                        <div className='flex flex-col gap-4 font-regular text-[16px] text-[#777777]'>
                            <span>فقط ویلاهای معتبر و تاییدشده</span>
                            <span>به‌روزرسانی مداوم فایل‌ها</span>
                            <span>حذف فایل‌های تکراری و نامعتبر</span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-10'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <Tick/>
                            <span className='font-bold text-[24px] text-[#0D3B66]'>تنوع گسترده ویلاها</span>
                        </div>
                        <div className='flex flex-col gap-4 font-regular text-[16px] text-[#777777]'>
                            <span>ویلاهای ساحلی، جنگلی و شهری</span>
                            <span>گزینه‌های اقتصادی تا لوکس</span>
                            <span>انتخاب متناسب با سبک زندگی شما</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <Tick/>
                            <span className='font-bold text-[24px] text-[#0D3B66]'>مشاوره تخصصی و رایگان</span>
                        </div>
                        <div className='flex flex-col gap-4 font-regular text-[16px] text-[#777777]'>
                            <span>راهنمایی بر اساس بودجه و نیاز شما</span>
                            <span>پیشنهاد بهترین مناطق برای اقامت</span>
                            <span>همراهی تا عقد قرارداد</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturesSec