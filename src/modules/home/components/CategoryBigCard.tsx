'use client'
import React from 'react'
import BigArrowLink from '../../../../public/icons/BigArrowLink'
import { useLocale } from 'next-intl'


interface ICategoryBigCard{
    imageUrl: string
    title: string
}

const CategoryBigCard = ({imageUrl , title}: ICategoryBigCard) => {

    const locale = useLocale();

    return (
        <div 
        style={{ backgroundImage: `url('${imageUrl}')` }}
        className='flex flex-col justify-end w-full h-[542px] pb-4 px-4 bg-cover bg-center rounded-[24px] 
        before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative
        md:w-[305px]
        dark:bg-black/100'>
            <div className='flex justify-between items-center relative z-10'>
                <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px] cursor-pointer   dark:bg-[#262626]'>
                    <span className='font-regular text-[20px] text-[#1E2022]   dark:text-[#F5F5F5]'>{title}</span>
                </div>
                <div className='flex justify-center items-center w-[43px] h-[43px] text-[#1E2022] bg-[#FFFFFF] rounded-[48px] cursor-pointer
                dark:text-[#E4E4E4] dark:bg-[#262626]'>
                    <BigArrowLink className={`${locale == 'en' ? 'scale-x-[-1]' : ''}`}/>
                </div>
            </div>
        </div>  
    )
}

export default CategoryBigCard