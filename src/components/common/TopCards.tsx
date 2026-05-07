import ArrowLinkCircle from "../../../public/icons/ArrowLinkCircle"
import React from 'react'

interface CardItem {
  icon: React.ElementType
  title: string
  value: number | string
}

interface TopCardsProps {
  items: CardItem[]
}

const TopCards: React.FC<TopCardsProps> = ({ items }) => {
  return (
    <div className='flex gap-4'>
      {items.map((item, index) => (
        <div key={index} className='flex flex-grow justify-between p-4 bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626]'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-[#E6EDF5] rounded-[8px] dark:bg-[#404040]'>
              <item.icon />
            </div>
            <div className='flex flex-col text-[#1E2022] dark:text-[#F5F5F5]'>
              <span className='font-regular text-[16px]'>{item.title}</span>
              <span className='font-bold text-[24px] dark:text-[#E6EDF5]'>{item.value}</span>
            </div>
          </div>
          <ArrowLinkCircle />
        </div>
      ))}
    </div>
  )
}

export default TopCards
