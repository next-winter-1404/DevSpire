import Home from '@/icons/Home'
import Telegram from '@/icons/Telegram'
import Instagram from '@/icons/Instagram'
import Linkedin from '@/icons/Linkedin'
import Image from 'next/image'

const Footer = () => {

    return (
        <div className='flex flex-col gap-10 pt-20 pb-10 px-10 bg-primary'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-8'>
                    <div className='flex gap-2 text-secondary'>
                        <Home/>
                        <span className='text-[40px]'>لوگو</span>
                    </div>
                    <div className='w-[501px]'>
                        <p className='text-white'>ما همراه شما هستیم در مسیر اجاره، خرید و فروش ویلا؛ تا با اطمینان و آرامش، تجربه‌ای دلنشین از انتخاب اقامتگاه یا سرمایه‌گذاری به‌یادماندنی داشته باشید.</p>
                    </div>
                    <div className='flex gap-8'>
                        <Telegram/>
                        <Instagram/>
                        <Linkedin/>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[20px] text-secondary'>نحوه رزرو اقامتگاه</h3>
                        <span className='text-[16px] text-white'>راهنمای رزرو اقامتگاه</span>
                        <span className='text-[16px] text-white'>شیوه پرداخت</span>
                        <span className='text-[16px] text-white'>لغو رزرو اقامتگاه</span>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[20px] text-secondary'>خدمات مشتریان</h3>
                        <span className='text-[16px] text-white'>پرسش های متداول مهمان</span>
                        <span className='text-[16px] text-white'>پرسش های متداول میزبان</span>
                        <span className='text-[16px] text-white'>چطور اقامتگاه ثبت کنم ؟</span>
                        <span className='text-[16px] text-white'>حریم شخصی کاربران</span>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[20px] text-secondary'>راه ارتباطی با ما</h3>
                        <span className='text-[16px] text-white'>09229167194 - 098541612310</span>
                        <span className='text-[16px] text-white'>Delta@gmail.com</span>
                        <span className='text-[16px] text-white'>گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظیمی زاده</span>
                    </div>
                </div>
            </div>
            <div className='w-full h-[0.5px] bg-white'></div>
            <div className='flex justify-between'>
                <p className='text-white'>تمام حقوق مادی و معنوی این اثر برای برند شما محفوظ است .</p>
                <div className='flex gap-6'>
                    <Image src={'/assets/pictures/e.png'} alt='e' width={32} height={32}/>                
                    <Image src={'/assets/pictures/rasane.png'} alt='rasane' width={32} height={32}/>                
                    <Image src={'/assets/pictures/enamad.png'} alt='enamad' width={32} height={32}/>                
                </div>
            </div>
        </div>
    )

}

export default Footer