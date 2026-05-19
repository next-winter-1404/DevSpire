"use client"
import UserEstate from "../../../../../public/images/sellerDashboard/userEstate.png"
import Image from 'next/image'
import Dots from '../../../../../public/icons/Dots'
import { useState } from "react";
import ActionsModal from "./ActionsModal";
import { TUserHouse } from "@/components/common/types";


interface IProps{
    item: TUserHouse
}

const TableRow = ({item}: IProps) => {


    const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false)


    return (
        <div className="flex items-center py-3 px-6 border-y border-[#DDDDDD] relative">
            <div className="flex items-center gap-4 w-[316px]">
                <Image src={UserEstate} alt="userEstate" className="w-10 h-10 rounded-full"/>
                <span className="font-regular text-[16px] text-[#1E2022]">{item.title}</span>
            </div>
            <span className="w-[216px]">{item.last_updated.slice(0,10)}</span>
            <div className="flex items-center gap-1 w-[264px] font-regular text-[16px] text-[#1E2022]">
                <span>{item.price}</span>
                <span>تومان</span>
            </div>
            <div className="w-[252px]">
                <span className="py-1 px-2 text-[#008C78] bg-[#CCF2ED] rounded-[8px]">تایید شده</span>
            </div>
            <div className="cursor-pointer" onClick={() => {setIsOpenActionsModal(true)}}>
                <Dots/>
            </div>
            {
                isOpenActionsModal && <ActionsModal setIsOpenActionsModal={setIsOpenActionsModal} item={item}/>
            }
        </div>    
    )

}

export default TableRow