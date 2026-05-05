import Image from 'next/image'
import React from 'react'
import EstateOwner from '../../../../public/images/mortgageRentDetail/estate-owner.jpg'
import Money from '../../../../public/icons/Cash'
import MoneyExchange from '../../../../public/icons/MoneyExchange'
import MobileCall from '../../../../public/icons/MobileCall'
import Chat from '../../../../public/icons/Chat'
import Date from '../../../../public/icons/Date'
import Clock from '../../../../public/icons/Clock'


const MortgageRentCard = () => {

  return(
    <div className='flex flex-col items-center gap-6 p-4 border border-[#DDDDDD] rounded-[24px]'>
      <div className='flex flex-col gap-4'>
        <Image src={EstateOwner} alt='estateOwner' className='w-30 h-30 rounded-[120px]'/>
        <span className='font-regular text-[20px] text-[#1E2022]'>متین قربان زاده</span>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-2 font-regular text-[16px] text-[#0D3B66]'>
          <Money/>
          <span>قیمت رهن از :</span>
        </div>
        <div className='flex gap-2 font-bold text-[20px] text-[#1E2022]'>
          <span>30,000</span>
          <span>تومان</span>
        </div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-2 font-regular text-[16px] text-[#0D3B66]'>
          <MoneyExchange/>
          <span>قیمت اجاره از :</span>
        </div>
        <div className='flex gap-2 font-bold text-[20px] text-[#1E2022]'>
          <span>30,000</span>
          <span>تومان</span>
        </div>
      </div>
      <button className='flex justify-center gap-4 w-full py-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[40px]'>
        <MobileCall/>
        <span>تماس با 0939****353</span>
      </button>
      <button className='flex justify-center gap-4 w-full py-3 text-[#FF7F11] border border-[#FF7F11] rounded-[40px]'>
        <Chat/>
        <span>گفت و گو با فروشنده</span>
      </button>
      <div className='flex justify-between w-full font-regular text-[14px] text-[#777777]'>
        <div className='flex gap-2'>
          <Date/>
          <span>12 مهر 1404</span>
        </div>
        <div className='flex gap-2'>
          <Clock/>
          <span>12:30</span>
        </div>
      </div>
    </div>
  )

}

export default MortgageRentCard