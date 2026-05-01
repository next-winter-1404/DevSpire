import { Field, Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import React from 'react'


const MortgageRentForm = () => {

    const t = useTranslations('home.heroSectionForm')

    const onSubmitForm = () => {

    }

    return (
        <Formik initialValues={{ selectDestination: "", peopleNumber: "", arrivalDate: "", departureDate: "" }} onSubmit={onSubmitForm}>
            <Form className='flex flex-col gap-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='selectDestination' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('selectDestination')}
                        </label>
                        <Field placeholder={t('selectDestinationPlc')}
                        className='w-[320px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 focus:border-[#0D3B66] 
                        rounded-[40px]   
                        sm:w-[360px]   md:w-[455px]
                        dark:bg-[#404040]'
                        name='selectDestination'/>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='peopleNumber' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('numOfPeople')}
                        </label>
                        <Field placeholder={t('numOfPeoplePlc')}
                        className='w-[320px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 focus:border-[#0D3B66] 
                        rounded-[40px]   
                        sm:w-[360px]   md:w-[455px]            
                        dark:bg-[#404040]'
                        name='peopleNumber'/>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='arrivalDate' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('arrivalDate')}
                        </label>
                        <Field placeholder={t('arrivalDate')}
                        className='w-[320px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 focus:border-[#0D3B66] 
                        rounded-[40px]   
                        sm:w-[360px]   md:w-[455px]            
                        dark:bg-[#404040]'
                        name='arrivalDate'/>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='departureDate' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('departureDate')}
                        </label>
                        <Field placeholder={t('departureDatePlc')}
                        className='w-[320px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 focus:border-[#0D3B66] 
                        rounded-[40px]   
                        sm:w-[360px]   md:w-[455px]            
                        dark:bg-[#404040]'
                        name='departureDate'/>
                    </div>
                </div>
                <button className='w-full py-4 text-[#FFFFFF] bg-[#0D3B66] rounded-[40px]'>{t('searchButton')}</button>
            </Form>
        </Formik>
    )
}

export default MortgageRentForm