import Image from 'next/image'
import React from 'react'
import Person1 from '../../../../public/images/landing/person1.png'
import Virgule from '../../../../public/icons/Virgule'


const SayAboutUsCard = () => {
  return (
    <div className='flex flex-col gap-6 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   
    dark:bg-[#262626] dark:border-[#404040]'>
      <div className='flex justify-between'>
        <Image src={Person1} alt='person1' width={100} height={100} className='rounded-[8px]'/>
        <Virgule/>
      </div>
      <p className='font-regular text-[16px] text-[#1E2022]   
      dark:text-[#A3A3A3]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم</p>
      <div className='flex gap-2'>
        <span className='font-bold text-[14px] text-[#1E2022]   dark:text-[#E4E4E4]'>اما واتسون</span>
        <span className='font-regular text-[14px] text-[#777777]   dark:text-[#A3A3A3]'>-</span>
        <span className='font-regular text-[14px] text-[#777777]   dark:text-[#A3A3A3]'>11 دی 1404</span>
      </div>
    </div>
  )
}

export default SayAboutUsCard