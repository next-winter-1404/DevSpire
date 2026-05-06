import React from 'react'
import FeatureSecImg from '../../../../public/images/home/Usability testing-pana 1.svg'
import Image from 'next/image'
import FeatureSecCard from './FeatureSecCard'
import { useTranslations } from 'next-intl'


const FeaturesSec = () => {

    const t = useTranslations('home.featureSec')

    return (
        <div className='flex justify-center mt-24 px-12'>
            <div className='flex gap-30 w-full'>
                <Image src={FeatureSecImg} alt='featureSec' width={480} height={480}
                className='hidden w-[120px] h-[120px]   lg:block lg:w-[480px] lg:h-[480px]'/>
                <div className='flex flex-col gap-10'>
                    <h2 className='font-bold text-[32px] text-[#1E2022]   dark:text-[#F5F5F5]'>{t('title')}</h2>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-10'>
                            <FeatureSecCard 
                            title={t('title1')}
                            text1={t('title1text1')}
                            text2={t('title1text2')}
                            text3={t('title1text3')}/>
                            <FeatureSecCard
                            title={t('title2')}
                            text1={t('title2text1')}
                            text2={t('title2text2')}
                            text3={t('title2text3')}/>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <FeatureSecCard
                            title={t('title3')}
                            text1={t('title3text1')}
                            text2={t('title3text2')}
                            text3={t('title3text3')}/>
                            <FeatureSecCard
                            title={t('title4')}
                            text1={t('title4text1')}
                            text2={t('title4text2')}
                            text3={t('title4text3')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FeaturesSec