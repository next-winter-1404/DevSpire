'use client'
import React, { useState } from 'react'
import SayAboutUsCard from './SayAboutUsCard'
import BigArrowRight from '../../../../public/icons/BigArrowRight'
import BigArrowLeft from '../../../../public/icons/BigArrowLeft'
import Person1 from '../../../../public/images/home/person1.png'
import { useLocale } from 'next-intl'

const cardsData = [
  {
    id: 1,
    image: Person1,
    quote: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
    name: 'اما واتسون',
    date: '11 دی 1404'
  },
  {
    id: 2,
    image: Person1,
    quote: 'چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.',
    name: 'جان دو',
    date: '12 دی 1404'
  },
  {
    id: 3,
    image: Person1,
    quote: 'برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
    name: 'سارا احمدی',
    date: '13 دی 1404'
  },
  {
    id: 4,
    image: Person1,
    quote: 'امروز با پیشرفت تکنولوژی جدیدی مانند هوش مصنوعی و یادگیری ماشین روبرو هستیم.',
    name: 'علی رضایی',
    date: '14 دی 1404'
  },
  {
    id: 5,
    image: Person1,
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
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex gap-6 overflow-hidden">
        {cardsData
          .slice(currentIndex * itemsPerView, (currentIndex + 1) * itemsPerView)
          .map((card) => (
            <div 
              key={card.id} 
              className="shrink-0 w-full md:w-[calc(33.333%-16px)]"
            >
              <SayAboutUsCard 
                data={card} 
              />
            </div>
        ))}
        <div className="flex gap-8 w-full">
          <div onClick={nextSlide}>
            <BigArrowRight className={locale === "en" ? "scale-x-[-1]" : ""} />
          </div>
          <div onClick={prevSlide}>
            <BigArrowLeft className={locale === "en" ? "scale-x-[-1]" : ""} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SayAboutUsSlider
