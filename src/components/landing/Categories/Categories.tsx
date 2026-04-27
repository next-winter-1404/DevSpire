import React from 'react'
import CategoryBigCard from './CategoryBigCard'
import CategorySmallCard from './CategorySmallCard'

const Categories = () => {
  return (
    <div className='flex justify-center mt-30 px-12'>
        <div className='flex flex-col items-start gap-8'>
            <h2 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>دسته بندی ها</h2>
            <div className='flex flex-row flex-wrap justify-center gap-10'>
                <CategoryBigCard title='آپارتمان' imageUrl='/images/landing/apartment.jpg'/>
                <div className='flex flex-col gap-10'>
                    <CategorySmallCard title='ملک ویلایی' imageUrl='/images/landing/villa-estate.png'/>
                    <CategorySmallCard title='استخردار' imageUrl='/images/landing/with-swimmingpool.jpg'/>
                </div>
                <div className='flex flex-col gap-10'>
                    <CategorySmallCard title='ملک کلبه' imageUrl='/images/landing/cottage-estate.jpg'/>
                    <CategorySmallCard title='ملک ساحلی' imageUrl='/images/landing/coastal-estate.png'/>
                </div>
                <CategoryBigCard title='بوم گردی' imageUrl='/images/landing/ecotourism.png'/>
            </div>
        </div>
    </div>
  )
}

export default Categories