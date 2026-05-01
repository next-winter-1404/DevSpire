import BreadCrumbs from '@/components/common/BreadCrumbs'
import { useTranslations } from 'next-intl'
import React from 'react'
import Filters from '../components/Filters'

const MortgageRentView = () => {

    const t = useTranslations('header')

    return (
        <div className='flex flex-col px-12'>
            <div className='flex justify-start mt-10'>
                <BreadCrumbs
                items={[
                {label: t('home'), href: '/'},
                {label: t('mortgageAndRent'), href: '/mortgage-rent'},
                {label: 'رهن و اجاره آپارتمان رشت', href: '/'},
                {label: 'رهن و اجاره آپارتمان رشت', href: '/'}
                ]} 
                />
            </div>
            <Filters/>
        </div>
    )

}

export default MortgageRentView