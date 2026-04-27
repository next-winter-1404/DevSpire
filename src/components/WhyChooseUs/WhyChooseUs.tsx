import React from 'react'
import WhyChooseUsImg from '../../../public/images/landing/Furniture store-amico 1.svg'
import Image from 'next/image'

const WhyChooseUs = () => {
  return (
    <div className='flex justify-between items-center w-full mt-30 mx-auto px-12 bg-[#F5F5F5]'>
      <div className='w-[723px]'>
        <h2 className='font-bold text-[32px] text-[#0D3B66]'>چرا باید ما رو انتخاب کنید؟</h2>
        <p className='font-regular text-[20px] text-[#1E2022]'>پیدا کردن ویلای مناسب همیشه کار راحتی نیست. ما اینجاییم تا همه چیز رو برای شما ساده کنیم. از بین صدها فایل، فقط بهترین و معتبرترین گزینه‌ها رو گلچین می‌کنیم تا وقت ارزشمندتون صرف جستجوی بی‌پایان نشه. چه به دنبال اجاره کوتاه‌مدت برای تعطیلات باشین و چه به فکر خرید یا اجاره بلندمدت، ما با توجه به بودجه و نیاز شما، بهترین انتخاب‌ها رو معرفی می‌کنیم. پشتیبانی ۲۴ ساعته و همراهی قدم‌به‌قدم ما باعث میشه هیچوقت تنها نباشید و با خیال راحت ویلای رویایی خودتون رو پیدا کنید.</p>
      </div>
      <Image src={WhyChooseUsImg} alt='whyChooseUsImg' width={480} height={480}
      className='hidden w-[120px] h-[120px]   sm:block sm:w-[480px] h-[480px]'/>
    </div>
  )
}

export default WhyChooseUs