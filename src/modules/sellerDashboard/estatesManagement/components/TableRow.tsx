import React from 'react'
import UserEstate from "../../../../../public/images/sellerDashboard/userEstate.png"
import Image from 'next/image'
import Dots from '../../../../../public/icons/Dots'


const TableRow = () => {

    return (
        <div className="flex items-center py-3 px-6">
            <div className="flex items-center gap-4 w-[280px]">
                <Image src={UserEstate} alt="userEstate" className="w-10 h-10 rounded-full"/>
                <span className="font-regular text-[16px] text-[#1E2022]">هتل سراوان رانین رشت</span>
            </div>
            <span className="w-[240px]">12 مرداد 1401 - 12:33</span>
            <div className="flex items-center gap-1 w-[264px] font-regular text-[16px] text-[#1E2022]">
                <span>30,000,000</span>
                <span>تومان</span>
            </div>
            <div className="w-[252px]">
                <span className="py-1 px-2 text-[#008C78] bg-[#CCF2ED] rounded-[8px]">تایید شده</span>
            </div>
            <Dots/>
        </div>    
    )

}

export default TableRow