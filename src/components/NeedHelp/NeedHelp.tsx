import React from 'react'

const NeedHelp = () => {
  return (
    <div className='flex justify-between items-center mt-30 mx-auto py-12 px-20 bg-[#0D3B66] rounded-[24px]'>
      <div className='flex flex-col items-start gap-4'>
        <h2 className='font-bold text-[32px] text-[#FFFFFF]'>نیاز به راهنمایی دارید؟</h2>
        <p className='font-regular text-[20px] text-[#FFFFFF]'>کارشناسان ما همیشه آماده پاسخگویی به سوالات شما عزیزان هستند . </p>
      </div>
      <button className='h-[60px] px-20 font-regular text-[20px] text-[#FFFFFF] bg-[#FF7F11] rounded-[40px]'>دریافت مشاوره رایگان</button>
    </div>
  )
}

export default NeedHelp