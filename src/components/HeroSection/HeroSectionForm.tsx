import { Formik , Form , Field } from 'formik'
import React from 'react'

const HeroSectionForm = () => {

  const onSubmitForm = () => {

  }

  return (
    <Formik initialValues={{selectDestination: "" , peopleNumber: "" , arrivalDate: "", departureDate: ""}} onSubmit={onSubmitForm}>
      <Form className='flex flex-col gap-5 p-6 bg-white rounded-[24px]'>
        <h2 className='font-bold text-[20px] text-primary'>همین حالا رزرو کنید!</h2>
        <div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='selectDestination'>انتخاب مقصد</label>
            <Field className='w-[455px] h-[46px] bg-[#F5F5F5] rounded-[40px]' name='selectDestination'/>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='peopleNumber'>تعداد نفرات</label>
            <Field className='w-[455px] h-[46px] bg-[#F5F5F5] rounded-[40px]' name='peopleNumber'/>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='arrivalDate'>تاریخ ورود</label>
            <Field className='w-[455px] h-[46px] bg-[#F5F5F5] rounded-[40px]' name='arrivalDate'/>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='departureDate'>تاریخ خروج</label>
            <Field className='w-[455px] h-[46px] bg-[#F5F5F5] rounded-[40px]' name='departureDate'/>
          </div>          
        </div>
        <button className='w-full py-4 text-white bg-primary rounded-[40px]'>جستجو کنید</button>
      </Form>
    </Formik>
  )
}

export default HeroSectionForm