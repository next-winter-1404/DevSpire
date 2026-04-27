import React from 'react'
import BigArrowLink from '../../../../public/icons/BigArrowLink'


interface ICategorySmallCard{
    imageUrl: string
    title: string
}

const CategorySmallCard = ({imageUrl , title}: ICategorySmallCard) => {
    return (
        <div 
        style={{ backgroundImage: `url('${imageUrl}')` }}
        className='flex flex-col justify-end w-[305px] h-[251px] pb-4 px-4 bg-cover bg-center rounded-[24px] 
        before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative'>
            <div className='flex justify-between items-center relative z-10'>
                <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]   dark:bg-[#262626]'>
                    <span className='font-regular text-[20px] text-[#1E2022]   dark:text-[#F5F5F5]'>{title}</span>
                </div>
                <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]   dark:bg-[#262626]'>
                    <BigArrowLink color='#1E2022' className='dark:text-[#E4E4E4]'/>
                </div>
            </div>
        </div>
  )
}

export default CategorySmallCard