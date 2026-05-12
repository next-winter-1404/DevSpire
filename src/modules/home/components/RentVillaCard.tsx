import Image from 'next/image'
import Link from 'next/link'
import BigArrowLink from '../../../../public/icons/BigArrowLink'
import RentVillaImg from '../../../../public/images/home/villa-estate.png'
import { useLocale, useTranslations } from 'next-intl'


interface IRentVillaCard{
    item:{
        title: string
        location: string
        link: string
    }
}

const RentVillaCard = ({item}: IRentVillaCard) => {

    const t = useTranslations('home.rentVillaCard')
    const locale = useLocale()

    return (
        <div className='flex gap-4 w-full p-2 bg-[#F5F5F5] rounded-[24px]   sm:w-[320px]   dark:bg-[#404040]'>
            <Image src={RentVillaImg} alt='rentVilla' width={100} height={100} className='rounded-[16px]'/>
            <div className='flex flex-col justify-between gap-6 w-full'>
                <div className='flex flex-col items-start'>
                    <span className='font-regular text-[20px] text-[1E2022] truncate   dark:text-[#E4E4E4]'>{item.title}</span>
                    <span className='font-regular text-[16px] text-[#777777]'>{item.location}</span>
                </div>
                <Link href={''} className='flex justify-between items-center w-full'>
                    <span className='font-regular text-[16px] text-[#0D3B66]   
                    dark:text-[#E4E4E4] dark:border-[#E4E4E4]'>{t('seeButton')}</span>
                    <BigArrowLink color='#0D3B66' className={`${locale == 'en' ? 'scale-x-[-1]' : ''}`}/>
                </Link>
            </div>
        </div>
    )
}

export default RentVillaCard