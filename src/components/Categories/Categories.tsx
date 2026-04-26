import BigArrowLink from '../../../public/icons/BigArrowLink'
import React from 'react'

const Categories = () => {
  return (
    <div className='flex flex-col items-start gap-8 w-[1340px] mt-30 mx-auto'>
        <h2 className='font-bold text-[24px] text-[#1E2022]'>دسته بندی ها</h2>
        <div className='flex gap-10'>
            <div className="flex flex-col justify-end w-[305px] h-[542px] pb-4 px-4 bg-[url(/images/landing/apartment.jpg)] bg-cover bg-center rounded-[24px] 
            before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative">
                <div className='flex justify-between items-center relative z-10'>
                    <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]'>
                        <span className='font-regular text-[20px] text-[#1E2022]'>آپارتمان</span>
                    </div>
                    <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]'>
                        <BigArrowLink/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div className="flex flex-col justify-end w-[305px] h-[251px] pb-4 px-4 bg-[url('/images/landing/villa-estate.png')] bg-cover bg-center rounded-[24px] 
                before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative">
                    <div className='flex justify-between items-center relative z-10'>
                        <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]'>
                            <span className='font-regular text-[20px] text-[#1E2022]'>ملک ویلایی</span>
                        </div>
                        <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]'>
                            <BigArrowLink/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-end w-[305px] h-[251px] pb-4 px-4 bg-[url('/images/landing/with-swimmingpool.jpg')] bg-cover bg-center rounded-[24px] 
                before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative">
                    <div className='flex justify-between items-center relative z-10'>
                        <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]'>
                            <span className='font-regular text-[20px] text-[#1E2022]'>استخردار</span>
                        </div>
                        <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]'>
                            <BigArrowLink/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div className="flex flex-col justify-end w-[305px] h-[251px] pb-4 px-4 bg-[url('/images/landing/cottage-estate.jpg')] bg-cover bg-center rounded-[24px] 
                before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative">
                    <div className='flex justify-between items-center relative z-10'>
                        <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]'>
                            <span className='font-regular text-[20px] text-[#1E2022]'>ملک کلبه</span>
                        </div>
                        <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]'>
                            <BigArrowLink/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-end w-[305px] h-[251px] pb-4 px-4 bg-[url('/images/landing/coastal-estate.png')] bg-cover bg-center rounded-[24px] 
                before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative">
                    <div className='flex justify-between items-center relative z-10'>
                        <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]'>
                            <span className='font-regular text-[20px] text-[#1E2022]'>ملک ساحلی</span>
                        </div>
                        <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]'>
                            <BigArrowLink/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-end w-[305px] h-[542px] pb-4 px-4 bg-[url('/images/landing/ecotourism.png')] bg-cover bg-center rounded-[24px] 
            before:absolute before:inset-0 before:bg-black/50 overflow-hidden relative">
                <div className='flex justify-between items-center relative z-10'>
                    <div className='py-2 px-4 bg-[#FFFFFF] rounded-[48px]'>
                        <span className='font-regular text-[20px] text-[#1E2022]'>بوم گردی</span>
                    </div>
                    <div className='flex justify-center items-center w-[43px] h-[43px] bg-[#FFFFFF] rounded-[48px]'>
                        <BigArrowLink/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Categories