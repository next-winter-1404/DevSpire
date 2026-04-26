import React from 'react'
import SayAboutUsSlider from './SayAboutUsSlider'
import BigArrowRight from '../../../public/icons/BigArrowRight'
import BigArrowLeft from '../../../public/icons/BigArrowLeft'

const SayAboutUs = () => {
  return (
    <div className='flex flex-col items-center gap-10 w-full mt-30 mx-auto px-12'>
        <div className='flex flex-col items-start gap-8'>
            <h2 className='font-bold text-[24px] text-[#1E2022]'>مشتریان درباره ما چه می گویند؟</h2>
            <SayAboutUsSlider/>
        </div>
        <div className='flex gap-8'>
            <BigArrowRight/>
            <BigArrowLeft/>
        </div>
    </div>
  )
}

export default SayAboutUs