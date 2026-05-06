import React from 'react'
import SayAboutUsCard from './SayAboutUsCard'
import SliderWrapper from '@/components/common/SliderWrapper'


const SayAboutUsSlider = () => {
  return (
    <div className='flex gap-8'>
      <SliderWrapper>
        <SayAboutUsCard className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"/>
        <SayAboutUsCard className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"/>
        <SayAboutUsCard className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"/>
        <SayAboutUsCard className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"/>
        <SayAboutUsCard className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"/>
      </SliderWrapper>
    </div>
  )
}


export default SayAboutUsSlider