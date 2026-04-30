import React from 'react'
import Tick from '../../../../public/icons/Tick'

interface IFeatureSecCard{
    title: string
    text1: string
    text2: string
    text3: string
}

const FeatureSecCard = ({title , text1 , text2 , text3}: IFeatureSecCard) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
                <Tick/>
                <span className='font-bold text-[24px] text-[#0D3B66]   dark:text-[#E4E4E4]'>{title}</span>
            </div>
            <div className='flex flex-col gap-4 font-regular text-[16px] text-[#777777]   dark:text-[#A3A3A3]'>
                <span>{text1}</span>
                <span>{text2}</span>
                <span>{text3}</span>
            </div>
        </div>  
    )
}

export default FeatureSecCard