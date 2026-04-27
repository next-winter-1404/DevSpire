import { MOCK_DATA } from "../../../modules/fastReserve/mocks/data";
import FastReserveCard from '@/modules/fastReserve/components/FastReserveCard'
import React from 'react'

const SpecialOffersSlider = () => {

  return (
    <div className='flex gap-10 px-12'>
        {MOCK_DATA.map((property) => (
          <FastReserveCard
            key={property.id}
            property={property}
            className="w-full lg:w-[31%]"
          />
        ))}
    </div>
  )
}

export default SpecialOffersSlider
