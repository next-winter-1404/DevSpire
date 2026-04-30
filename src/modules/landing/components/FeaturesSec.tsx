import React from 'react'
import FeatureSecImg from '../../../../public/images/landing/Usability testing-pana 1.svg'
import Image from 'next/image'
import Tick from '../../../../public/icons/Tick'
import FeatureSecCard from './FeatureSecCard'

const FeaturesSec = () => {
  return (
    <div className='flex justify-center mt-24 px-36'>
        <div className='flex gap-30 w-full'>
            <Image src={FeatureSecImg} alt='featureSec' width={480} height={480}
            className='hidden w-[120px] h-[120px]   md:block md:w-[480px] md:h-[480px]'/>
            <div className='flex flex-col gap-10'>
                <h2 className='font-bold text-[32px] text-[#1E2022]   dark:text-[#F5F5F5]'>ویژگی هایی که ما را متفاوت می سازد</h2>
                <div className='flex gap-10'>
                    <div className='flex flex-col gap-10'>
                        <FeatureSecCard 
                        title='پشتیبانی کامل و شفافیت'
                        text1='پاسخگویی سریع و ۲۴ ساعته'
                        text2='توضیحات دقیق درباره شرایط ملک'
                        text3='شفافیت در قیمت و قرارداد'/>
                        <FeatureSecCard
                        title='تنوع گسترده ویلاها'
                        text1='ویلاهای ساحلی، جنگلی و شهری'
                        text2='گزینه‌های اقتصادی تا لوکس'
                        text3='انتخاب متناسب با سبک زندگی شما'/>
                    </div>
                    <div className='flex flex-col gap-10'>
                        <FeatureSecCard
                        title='فایل‌های واقعی و به‌روز'
                        text1='فقط ویلاهای معتبر و تاییدشده'
                        text2='به‌روزرسانی مداوم فایل‌ها'
                        text3='حذف فایل‌های تکراری و نامعتبر'/>
                        <FeatureSecCard
                        title='مشاوره تخصصی و رایگان'
                        text1='راهنمایی بر اساس بودجه و نیاز شما'
                        text2='پیشنهاد بهترین مناطق برای اقامت'
                        text3='همراهی تا عقد قرارداد'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturesSec