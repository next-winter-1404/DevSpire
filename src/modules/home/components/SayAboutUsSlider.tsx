'use client'
import React, { useState } from 'react'
import SayAboutUsCard from './SayAboutUsCard'
import BigArrowRight from '../../../../public/icons/BigArrowRight'
import BigArrowLeft from '../../../../public/icons/BigArrowLeft'
import { useLocale } from 'next-intl'
import SliderWrapper from '@/components/common/SliderWrapper'

const cardsData = [
  {
    id: 1,
    image: '/../../../../public/images/home/person1.png',
    quote: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
    name: 'اما واتسون',
    date: '11 دی 1404'
  },
  {
    id: 2,
    image: '/../../../../public/images/home/person1.png',
    quote: 'چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.',
    name: 'جان دو',
    date: '12 دی 1404'
  },
  {
    id: 3,
    image: '/../../../../public/images/home/person1.png',
    quote: 'برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
    name: 'سارا احمدی',
    date: '13 دی 1404'
  },
  {
    id: 4,
    image: '/../../../../public/images/home/person1.png',
    quote: 'امروز با پیشرفت تکنولوژی جدیدی مانند هوش مصنوعی و یادگیری ماشین روبرو هستیم.',
    name: 'علی رضایی',
    date: '14 دی 1404'
  },
  {
    id: 5,
    image: '/../../../../public/images/home/person1.png',
    quote: 'توسعه پایدار و رشد اقتصادی از اهداف اصلی ما در این بخش است.',
    name: 'مریم کمالی',
    date: '15 دی 1404'
  },
]

const SayAboutUsSlider = () => {
 
  const locale = useLocale()

  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const totalSlides = Math.ceil(cardsData.length / itemsPerView)

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <SliderWrapper>
        {cardsData.map((property) => (
          <div
            className='shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]'
            dir='rtl'
            key={property.id}
          >
            <SayAboutUsCard className='w-full' data={property}/>
          </div>
        ))}
      </SliderWrapper>
      <div className='flex gap-8'>
        <div onClick={nextSlide}>
          <BigArrowRight className={locale === 'en' ? 'scale-x-[-1]' : ''} />
        </div>
        <div onClick={prevSlide}>
          <BigArrowLeft className={locale === 'en' ? 'scale-x-[-1]' : ''} />
        </div>
      </div>
    </div>
  )
}

export default SayAboutUsSlider
