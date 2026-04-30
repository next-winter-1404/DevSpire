'use client'
import { Formik , Form , Field } from 'formik'
import React from 'react'

const HeroSectionForm = () => {

  const onSubmitForm = () => {

  }

  return (
    <Formik initialValues={{selectDestination: "" , peopleNumber: "" , arrivalDate: "", departureDate: ""}} onSubmit={onSubmitForm}>
      <Form className='flex flex-col gap-5 p-6 bg-white rounded-[24px]
      dark:bg-[#262626]'>
        <h2 className='font-bold text-[20px] text-[#0D3B66]   dark:text-[#F5F5F5]'>همین حالا رزرو کنید!</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='selectDestination' className='dark:text-[#E4E4E4]'>انتخاب مقصد</label>
            <Field placeholder='مقصد را وارد کنید'
            className='w-[455px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#404040]' 
            name='selectDestination'/>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='peopleNumber' className='dark:text-[#E4E4E4]'>تعداد نفرات</label>
            <Field placeholder='تعداد نفرات را وارد کنید' 
            className='w-[455px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#404040]' 
            name='peopleNumber'/>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='arrivalDate' className='dark:text-[#E4E4E4]'>تاریخ ورود</label>
            <Field placeholder='تاریخ ورود'
            className='w-[455px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#404040]' 
            name='arrivalDate'/>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='departureDate' className='dark:text-[#E4E4E4]'>تاریخ خروج</label>
            <Field placeholder='تاریخ خروج را انتخاب کنید'
            className='w-[455px] h-[46px] font-regular text-[16px] indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#404040]' 
            name='departureDate'/>
          </div>          
        </div>
        <button className='w-full py-4 text-[#FFFFFF] bg-[#0D3B66] rounded-[40px]'>جستجو کنید</button>
      </Form>
    </Formik>
  )
}

export default HeroSectionForm