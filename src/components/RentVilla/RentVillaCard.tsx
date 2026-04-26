import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BigArrowLink from '../../../public/icons/BigArrowLink'
import RentVillaImg from '../../../public/images/landing/villa-estate.png'

const RentVillaCard = () => {
  return (
    <div className='flex gap-4 p-2 bg-[#F5F5F5] rounded-[24px]'>
        <Image src={RentVillaImg} alt='rentVilla' width={100} height={100} className='rounded-[16px]'/>
        <div>
            <div className='flex flex-col items-start'>
                <span className='font-regular text-[20px] text-[1E2022]'>اجاره ویلا در رامسر</span>
                <span className='font-regular text-[16px] text-[#777777]'>50 مورد</span>
            </div>
            <Link href={''} className='flex justify-between w-[196px]'>
                <span className='font-regular text-[16px] text-[#0D3B66]'>مشاهده</span>
                <BigArrowLink/>
            </Link>
        </div>
    </div>
  )
}

export default RentVillaCard