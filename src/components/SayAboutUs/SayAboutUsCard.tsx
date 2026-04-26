import Image from 'next/image'
import React from 'react'
import SayAboutUsImg from '../../../public/images/landing/Furniture store-amico 1.svg'
import Virgule from '../../../public/icons/Virgule'


const SayAboutUsCard = () => {
  return (
    <div className='flex flex-col gap-6 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]'>
        <div className='flex justify-between'>
            <Image src={SayAboutUsImg} alt='sayAboutUsImg' width={100} height={100}/>
            <Virgule/>
        </div>
        <p className='font-regular text-[16px] text-[#1E2022]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم</p>
        <div className='flex gap-2'>
            <span className='font-bold text-[14px] text-[#1E2022]'>اما واتسون</span>
            <span className='font-regular text-[14px] text-[#777777]'>-</span>
            <span className='font-regular text-[14px] text-[#777777]'>11 دی 1404</span>
        </div>
    </div>
  )
}

export default SayAboutUsCard