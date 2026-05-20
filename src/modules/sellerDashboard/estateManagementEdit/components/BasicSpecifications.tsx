import React from 'react'
import CurveArrow from '../../../../../public/icons/CurveArrow';
import { THouse } from '@/components/common/types';
import CustomSelect from '@/components/common/CustomSelectOption';
import { useLocale } from 'next-intl';

interface IProps {
  house: THouse;
  handlePrev: (stepData: any) => void;
  handleNext: (stepData: any) => void;
  handleFinalSubmit: (stepData: any) => void;
  formData: any;
}


const BasicSpecifications = ({house, handlePrev, handleNext, handleFinalSubmit, formData}: IProps) => {

  const locale = useLocale()

  const categoryOptions = [
    { value: "apartment", label: locale == "en" ? "apartment" : "آپارتمان" },
    { value: "villa", label: locale == "en" ? "villa" : "ویلا" },
  ];

  const transactionTypeOptions = [
    { value: "apartment", label: locale == "en" ? "apartment" : "آپارتمان" },
    { value: "apartment", label: locale == "en" ? "apartment" : "آپارتمان" },
    { value: "apartment", label: locale == "en" ? "apartment" : "آپارتمان" },
  ]
  

  return(
    <div className='flex flex-col items-end gap-4 w-full'>
      <div className='flex gap-8 w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>نام ملک</label>
          <input type='text' value={house.title} className='w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]'/>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>ظرفیت</label>
          <input type='text' value={house.capacity} className='w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]'/>
        </div>
      </div>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <span className='font-regular text-[16px] text-[#1E2022]'>نوع معامله</span>
          <CustomSelect defaultValue={} options={} onValueChange={}/>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>قیمت</label>
          <input type='text' value={house.price} className='w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]'/>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='font-regular text-[16px] text-[#1E2022]'>نوع ملک</span>
        <CustomSelect defaultValue={categoryOptions[0].value} options={categoryOptions} onValueChange={}/>
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <label htmlFor='' className='font-regular text-[16px] text-[#1E2022]'>توضیحات</label>
        <input type='text' value={house.caption} className='w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]'/>
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