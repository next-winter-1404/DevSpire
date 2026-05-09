import React from 'react'
import CurveArrow from '../../../../../public/icons/CurveArrow'


const Top = () => {

    return(
        <div className='flex justify-between'>
            <h1 className='font-bold text-[24px] text-[#1E2022]'>ملک 1</h1>
            <button className='flex items-center gap-2 font-regular text-[16px] text-[#0D3B66]'>
                رفتن به لیست املاک
                <CurveArrow className='w-5 h-5 rotate-90'/>
            </button>
        </div>  
    )

}

export default Top