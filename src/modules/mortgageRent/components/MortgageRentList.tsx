import FastReserveCard from '@/modules/fastReserve/components/FastReserveCard'
import { MOCK_DATA } from '@/modules/fastReserve/mocks/data'
import React from 'react'


const MortgageRentList = () => {

    return (
        <div className='flex flex-wrap gap-6 w-full mt-10'>
            {MOCK_DATA.map((property) => (
                <div dir="rtl" key={property.id} className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]">
                    <FastReserveCard className="w-full" property={property} linkHref={`/mortgage-rent/${property.id}`}/>
                </div>
            ))}        
        </div>
    )

}

export default MortgageRentList