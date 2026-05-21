import React from 'react'
import CurveArrow from '../../../../../public/icons/CurveArrow'
import { Link } from '@/i18n/routing'
import { THouse } from '@/components/common/types'


interface IProps{
    house: THouse
}

const Top = ({house}: IProps) => {

    return(
        <div className='flex justify-between'>
            <h1 className='font-bold text-[24px] text-[#1E2022]'>{house.title}</h1>
            <Link href={"/dashboard/seller/estates-management"} className='flex items-center gap-2'>
                <span className="font-regular text-[16px] text-[#0D3B66]">رفتن به لیست املاک</span>
                <CurveArrow className='w-5 h-5 rotate-90'/>
            </Link>
        </div>  
    )

}

export default Top