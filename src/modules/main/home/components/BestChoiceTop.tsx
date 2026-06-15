"use client"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl";


const BestChoiceTop = () => {

    const t = useTranslations("home.bestChoice");
    
    return (
        <div className="flex justify-between ">
          <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
            {t("title")}
          </h2>
          <Link
            href={"/fast-reserve"}
            className="py-2 px-4 font-regular text-[20px] text-[#0D3B66] border border-[#0d3B66] rounded-[40px] transition-all 
          duration-300 ease-in-out cursor-pointer
          hover:bg-blue-100
          dark:text-[#F5F5F5] dark:hover:bg-[#404040] dark:border-[#F5F5F5]">
            {t("seeAllButton")}
          </Link>
        </div>  
    )
}

export default BestChoiceTop