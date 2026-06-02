"use client"
import { useState } from "react"
import Filter from "../../../../../public/icons/Filter"
import Plus from "../../../../../public/icons/Plus"
import AddLocationsModal from "./AddLocationsModal";
import { useTranslations } from "next-intl";
import FilterLocationsModal from "./FilterLocationsModal";




const LocationsManagementTop = () => {

    const t = useTranslations("adminDashboard.locationsManagement")

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
                <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("title")}</h1>
                <div className="flex items-center gap-4">
                    <button 
                    onClick={() => {handleLocFilterModal(true)}}
                    className="flex items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] 
                    cursor-pointer
                    dark:text-[#E4E4E4] dark:bg-[#404040] dark:border-[#E4E4E4]">
                        <Filter/>
                        <span>{t("filters")}</span>
                    </button>
                    <button 
                    onClick={() => {handleAddLocationModal(true)}}
                    className="flex items-center gap-3 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">
                        <Plus/>
                        <span>{t("addLocation")}</span>
                    </button>
                </div>
            </div>
            {isOpenFilterModal && <FilterLocationsModal handleLocFilterModal={handleLocFilterModal}/>}
            {isOpenAddLocModal && <AddLocationsModal handleAddLocationModal={handleAddLocationModal}/>}
        </>
    )

}

export default LocationsManagementTop