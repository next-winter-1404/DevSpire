import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useLocale, useTranslations } from 'next-intl'
import Date from '../../../../public/icons/Date'
import CustomSelect from '@/components/common/CustomSelectOption'



const EstateReserveForm = () => {

    const t = useTranslations('home.heroSectionForm')

    const locale = useLocale()

    const onSubmitForm = () => {

    }

    return (
        <Formik initialValues={{ selectDestination: "", peopleNumber: "", arrivalDate: "", departureDate: "" }} onSubmit={onSubmitForm}>
            <Form className='flex flex-col gap-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col items-start gap-2'>
                        <CustomSelect placeholder={t('selectDestinationPlc')} 
                        options={[{value: "1", label: "گزینه اول" }, {value: "2", label: "گزینه دوم"}]}
                        onValueChange={(value) => console.log(value)}
                        className='w-[160px]   sm:w-[360px]   md:[455px]'>
                        </CustomSelect>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='peopleNumber' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('numOfPeople')}
                        </label>
                        <Field placeholder={t('numOfPeoplePlc')} type='number'
                        className='w-[160px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 
                        focus:border-[#0D3B66] rounded-[40px]   
                        sm:w-[360px]   md:w-[455px]            
                        dark:bg-[#404040]'
                        name='peopleNumber'/>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='arrivalDate' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('arrivalDate')}
                        </label>
                        <div className='relative'>
                            <Field placeholder={t('arrivalDate')}
                            className='w-[160px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 
                            focus:border-[#0D3B66] rounded-[40px]   
                            sm:w-[360px]   md:w-[455px]            
                            dark:bg-[#404040]'
                            name='arrivalDate'/>
                            <Date className={`absolute top-[30%] ${locale == 'en' ? 'right-5' : 'left-5'}`}/>
                        </div>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='departureDate' className='font-bold text-[16px] text-[#1E2022] dark:text-[#E4E4E4]'>
                            {t('departureDate')}
                        </label>
                        <div className='relative'>
                            <Field placeholder={t('departureDatePlc')}
                            className='w-[160px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] outline-none focus:border-1 
                            focus:border-[#0D3B66] rounded-[40px]   
                            sm:w-[360px]   md:w-[455px]            
                            dark:bg-[#404040]'
                            name='departureDate'/>
                            <Date className={`absolute top-[30%] ${locale == 'en' ? 'right-5' : 'left-5'}`}/>
                        </div>
                    </div>
                </div>
                <button className='w-full py-4 text-[#FFFFFF] bg-[#0D3B66] rounded-[40px] cursor-pointer'>{t('searchButton')}</button>
            </Form>
        </Formik>
    )
}

export default EstateReserveForm