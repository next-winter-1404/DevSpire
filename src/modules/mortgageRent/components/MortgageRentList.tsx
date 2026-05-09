import FastReserveCard from '@/modules/fastReserve/components/FastReserveCard'
import { MOCK_DATA } from '@/modules/fastReserve/mocks/data'
import { GetHouses } from '@/modules/services/api/get/GetHouses';
import React, { useEffect, useState } from 'react'


const MortgageRentList = () => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        GetHouses({ transactionType: 'rental', propertyType: '' }).then(setData);
    }, []);

    return (
        <div className='flex flex-wrap gap-6 w-full mt-10'>
            {data?.map((property) => (
                <div dir="rtl" key={property.id} className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]">
                    <FastReserveCard className="w-full" property={property}/>
                </div>
            ))}        
        </div>
    )

}

export default MortgageRentList