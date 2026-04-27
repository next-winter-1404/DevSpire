import React from 'react'
import RentVillaCard from './RentVillaCard'

const RentVilla = () => {
  return (
    <div className='flex justify-center mt-30 px-12'>
      <div className='flex flex-col gap-10'>
        <h2 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>اجاره ویلا در محبوب ترین مقاصد ایران</h2>
        <div className='flex flex-row flex-wrap gap-8'>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
          <RentVillaCard/>
        </div>
      </div>
    </div>
  )
}

export default RentVilla