'use client'
import { useTranslations } from "next-intl";


const RentVillaTop = () => {

    const t = useTranslations('home.rentVilla');

    return (
        <h2 className='font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]'>
          {t('title')}
        </h2>
    )

}

export default RentVillaTop