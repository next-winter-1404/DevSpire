import React from 'react'
import BestChoiceSlider from './BestChoiceSlider'

const BestChoice = () => {
  return (
    <div className='flex flex-col gap-8 w-full mt-30'>
        <div className='flex justify-between px-12'>
            <h2 className='font-bold text-[24px] text-[#1E2022]'>بهترین انتخاب برای تعطیلات و اقامت</h2>
            <button className='w-[137px] py-2 text-[#0D3B66] border border-[#0d3B66] rounded-[40px]'>مشاهده همه</button>
        </div>
        <BestChoiceSlider/>
    </div>
  )
}

export default BestChoice