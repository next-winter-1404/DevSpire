import LeafletMapClientWrapper from '@/components/common/LeafletMapClientWrapper'
import React from 'react'

const EstateLocation = () => {

    const getParamsLoc = (values: [number, number]) => {
        console.log("موقعیت جدید:", values);
    };

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='font-bold text-[24px] text-[#1E2022]'>هتل همایون فر کیش ایران</h2>
            <div className='w-full h-[228px]'>
                <LeafletMapClientWrapper getParamsLoc={getParamsLoc} />
            </div>        
        </div>
    )

}

export default EstateLocation