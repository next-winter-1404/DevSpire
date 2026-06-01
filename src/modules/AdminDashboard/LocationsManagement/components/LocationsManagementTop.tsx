"use client"
import { useState } from "react"
import Filter from "../../../../../public/icons/Filter"
import Plus from "../../../../../public/icons/Plus"
import LocationsFilterModal from "./LocationsFilterModal";
import AddLocationsModal from "./AddLocationsModal";




const LocationsManagementTop = () => {


    const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
    const [isOpenAddLocModal, setIsOpenAddLocModal] = useState<boolean>(false)

    const handleLocFilterModal = (value: boolean) => {
        setIsOpenFilterModal(value);
    }
    const handleAddLocationModal = (value: boolean) => {
        setIsOpenAddLocModal(value);
    }


    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-bold text-[24px] text-[#1E2022]">لیست مکان ها</h1>
                <div className="flex items-center gap-4">
                    <button 
                    onClick={() => {handleLocFilterModal(true)}}
                    className="flex items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] 
                    cursor-pointer">
                        <Filter/>
                        <span>فیلترها</span>
                    </button>
                    <button 
                    onClick={() => {handleAddLocationModal(true)}}
                    className="flex items-center gap-3 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">
                        <Plus/>
                        <span>افزودن مکان</span>
                    </button>
                </div>
            </div>
            {isOpenFilterModal && <LocationsFilterModal handleLocFilterModal={handleLocFilterModal}/>}
            {isOpenAddLocModal && <AddLocationsModal handleAddLocationModal={handleAddLocationModal}/>}
        </>
    )

}

export default LocationsManagementTop