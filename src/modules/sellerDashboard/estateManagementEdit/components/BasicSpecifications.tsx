import React from 'react'
import CurveArrow from '../../../../../public/icons/CurveArrow';

interface IBasicSpecifications {
  handlePrev: (stepData: any) => void;
  handleNext: (stepData: any) => void;
  handleFinalSubmit: (stepData: any) => void;
  formData: any;
}

const BasicSpecifications = ({handlePrev, handleNext, handleFinalSubmit, formData}: IBasicSpecifications) => {

  return(
    <div className='flex flex-col items-end gap-4 w-full'>
      <div className='flex gap-8 w-full'>
        <div className='flex flex-col gap-4'>
          <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>نام ملک</label>
          <input type='text' className='flex-grow h-12 bg-[#FFFFFF] border-[#DDDDDD]'/>
        </div>
        <div className='flex flex-col gap-4'>
          <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>ظرفیت</label>
          <input type='text' className='flex-grow h-12 bg-[#FFFFFF] border-[#DDDDDD]'/>
        </div>
      </div>
      <div className='flex gap-8'>
        <select name='' id='' className='h-12'>
          <option value=''>نوع معامله</option>
        </select>
        <div className='flex flex-col gap-4'>
          <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>قیمت</label>
          <input type='text' className='flex-grow h-12 bg-[#FFFFFF] border-[#DDDDDD]'/>
        </div>
      </div>
      <div className='flex gap-8'>
        <select name='' id='' className='h-12'>
          <option value=''>نوع ملک</option>
        </select>
        <select name='' id='' className='h-12'>
          <option value=''>زیر نوع ملک</option>
        </select>
      </div>
      <div className='flex flex-col gap-4'>
        <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>توضیحات</label>
        <input type='text' className='flex-grow h-12 bg-[#FFFFFF] border-[#DDDDDD]'/>
      </div>
      <button 
        className='flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer'>
          مرحله بعد
        <CurveArrow className='rotate-90' />
      </button>
    </div>
  )

}

export default BasicSpecifications