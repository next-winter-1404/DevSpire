import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import Search from '../../../../public/icons/Search'


const SearchCom = () => {

    const t = useTranslations('mortgageAndRent.filters')
    const locale = useLocale()

    return (
        <div className='flex flex-col gap-4'>
            <span className='font-bold text-[16px] text-[#1E2022]'>{t('search')}</span>
            <div className='relative'>
                <input placeholder={t('searchPlaceholder')} className='w-[510px] h-[46px] indent-5 bg-[#F5F5F5] rounded-[40px]
                dark:bg-[#404040]'/>
                <Search className={`absolute ${locale == 'en' ? 'right-5' : 'left-5'} top-[30%]`}/>
            </div>
        </div>
    )
}

export default SearchCom