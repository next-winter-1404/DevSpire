import React from 'react'
import SpecialOffersSlider from './SpecialOffersSlider'

const SpecialOffers = () => {
  return (
    <div className='flex flex-col gap-8 w-full mt-30 mx-auto'>
      <div className='flex justify-between w-full px-12'>
        <div className='flex gap-2 font-bold text-[24px]'>
          <h2 className='text-dark'>پیشنهادهای خاص</h2>
          <h2 className='text-red'>اجاره ویلا</h2>
        </div>
        <button className='w-[137px] py-2 text-[#0D3B66] border border-[#0D3B66] rounded-[40px]'>مشاهده همه</button>
      </div>
      <SpecialOffersSlider/>
    </div>
  )
}

export default SpecialOffers