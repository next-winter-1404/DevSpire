"use client"
import { useState } from "react"
import Filter from "../../../../../public/icons/Filter"
import FilterToursModal from "./FilterToursModal";
import { useTranslations } from "next-intl";




const ToursManagementTop = () => {


    const t = useTranslations("adminDashboard.toursManagement");

    const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
    const handleTourFilterModal = (value: boolean) => {
        setIsOpenFilterModal(value);
    }


    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full   sm:flex-row sm:justify-between">
                <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("title")}</h1>
                <button 
                onClick={() => {handleTourFilterModal(true)}}
                className="flex justify-center items-center gap-3 w-full py-[13px] text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] 
                rounded-[16px] cursor-pointer
                sm:w-auto sm:px-3
                dark:text-[#E4E4E4] dark:bg-[#404040] dark:border-[#E4E4E4]">
                    <Filter/>
                    <span>{t("filters")}</span>
                </button>
            </div>
            {isOpenFilterModal && <FilterToursModal handleTourFilterModal={handleTourFilterModal}/>}
        </>
    )

}

export default ToursManagementTop