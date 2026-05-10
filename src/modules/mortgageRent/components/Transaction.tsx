import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import Arrow from '../../../../public/icons/Arrow'


const Transaction = () => {

    const t = useTranslations('mortgageAndRent.filters')
    const locale = useLocale()

    return (
        <div className='flex flex-col flex-grow gap-4 min-w-[168px]'>
            <span className='font-bold text-[16px] text-[#1E2022]'>{t('transactionType')}</span>
            <div className='relative'>
                <select className='w-full h-[46px] font-regular text-[16px] text-[#777777] indent-5 bg-[#F5F5F5] rounded-[40px] 
                appearance-none
                dark:bg-[#404040]'>                    
                    <option value="">{t('mortgageAndRent')}</option>
                </select>                
                <Arrow className={`absolute ${locale == 'en' ? 'right-5' : 'left-5'} top-[40%]`}/>
            </div>
        </div>
    )
}

export default Transaction