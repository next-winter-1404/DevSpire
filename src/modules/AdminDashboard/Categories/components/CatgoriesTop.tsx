"use client"
import { useState } from "react"
import Filter from "../../../../../public/icons/Filter"
import Plus from "../../../../../public/icons/Plus"
import AddLocationsModal from "./AddCategoryModal";
import { useTranslations } from "next-intl";
import FilterLocationsModal from "./FilterCategoriesModal";




const CategoriesTop = () => {

    const t = useTranslations("adminDashboard.categories")

    const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
    const [isOpenAddLocModal, setIsOpenAddLocModal] = useState<boolean>(false)

    const handleLocFilterModal = (value: boolean) => {
        setIsOpenFilterModal(value);
    }
    const handleAddCatModal = (value: boolean) => {
        setIsOpenAddLocModal(value);
    }


    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full   sm:flex-row sm:justify-between">                
                <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("title")}</h1>
                <div className="flex flex-col items-center gap-4 w-full   sm:flex-row sm:w-auto">
                    <button 
                    onClick={() => {handleLocFilterModal(true)}}
                    className="flex justify-center items-center gap-3 w-full py-[13px] text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] 
                    rounded-[16px] cursor-pointer
                    sm:w-auto sm:px-3
                    dark:text-[#E4E4E4] dark:bg-[#404040] dark:border-[#E4E4E4]">
                        <Filter/>
                        <span>{t("filtersBtn")}</span>
                    </button>
                    <button 
                    onClick={() => {handleAddCatModal(true)}}
                    className="flex justify-center items-center gap-3 w-full py-[13px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] 
                    cursor-pointer
                    sm:w-auto sm:px-3">
                        <Plus/>
                        <span>{t("addCategoryBtn")}</span>
                    </button>
                </div>
            </div>
            {isOpenFilterModal && <FilterLocationsModal handleLocFilterModal={handleLocFilterModal}/>}
            {isOpenAddLocModal && <AddLocationsModal handleAddCatModal={handleAddCatModal}/>}
        </>
    )

}

export default CategoriesTop