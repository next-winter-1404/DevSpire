import { useTranslations } from "next-intl";
import Close from "../../../../../public/icons/Close";



interface IProps{
    handleTourFilterModal: (value: boolean) => void;
}

const FilterToursModal = ({handleTourFilterModal}: IProps) => {


    const t = useTranslations("adminDashboard.toursManagement");


    return (
        <>
            <div 
            onClick={() => {handleTourFilterModal(false)}}
            className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 z-30"></div>
            <div className="flex flex-col gap-8 w-[480px] p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[12%] left-[35%] z-90
            dark:bg-[#404040]">
                <div className="flex justify-between w-full">
                    <span className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("filters")}</span>
                    <div onClick={() => {handleTourFilterModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer
                    dark:bg-[#525252]">
                        <Close/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default FilterToursModal