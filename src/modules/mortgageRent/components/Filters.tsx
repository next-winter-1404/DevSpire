"use client"
import { useLocale, useTranslations } from "next-intl"
import Search from "../../../../public/icons/Search"
import Arrow from "../../../../public/icons/Arrow"
import TwoRangeSlider from "@/components/common/TwoRangeSlider"
import { useSearchParams } from "next/navigation"
import { useState } from "react"



const Filters = () => {

    const t = useTranslations("mortgageAndRent.filters")

    const locale = useLocale()

    const searchParams = useSearchParams()
    const [range, setRange] = useState<[number, number]>([
        parseInt(searchParams.get("minPrice") ?? "0"),
        parseInt(searchParams.get("maxPrice") ?? "25000000"),
    ]);
    const getSliderValues = (values: [number, number]) => setRange(values);

    return (
        <div className="flex flex-col gap-8 mt-10">
            <div className="flex justify-between">
                <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("title")}</h2>
                <div className="flex gap-2">
                    <span></span>
                    <span className="font-regular text-[20px] text-[#0D3B66]   dark:text-[#E4E4E4]">{t("result")}</span>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-4 border border-[#DDDDDD] rounded-[24px]   dark:border-[#404040]">
                <div className="flex flex-col gap-5   lg:flex-row">
                    <div className="flex flex-col gap-4 w-full  
                    sm:w-[320px]   lg:w-[510px]">
                        <span className="font-bold text-[16px] text-[#1E2022]">{t("search")}</span>
                        <div className="relative">
                            <input placeholder={t("searchPlaceholder")} className="w-full h-[46px] indent-5 bg-[#F5F5F5] rounded-[40px]
                            dark:bg-[#404040]"/>
                            <Search className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[30%]`}/>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap gap-5 w-full   sm:flex-row">
                        <div className="flex flex-col flex-grow gap-4 min-w-[168px]">
                            <span className="font-bold text-[16px] text-[#1E2022]">{t("sortBy")}</span>
                            <div className="relative">
                                <select className="w-full h-[46px] font-regular text-[16px] text-[#777777] indent-5 bg-[#F5F5F5] rounded-[40px] 
                                appearance-none
                                dark:bg-[#404040]">
                                    <option value="">{t("newest")}</option>
                                </select>
                                <Arrow className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[40%]`}/>
                            </div>
                        </div>                        
                        <div className="flex flex-col flex-grow gap-4 min-w-[168px]">
                            <span className="font-bold text-[16px] text-[#1E2022]">{t("estateType")}</span>
                            <div className="relative">
                                <select className="w-full h-[46px] font-regular text-[16px] text-[#777777] indent-5 bg-[#F5F5F5] rounded-[40px] 
                                appearance-none
                                dark:bg-[#404040]">                    
                                    <option value="">{t("apartment")}</option>
                                </select>                
                                <Arrow className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[40%]`}/>
                            </div>
                        </div>                        
                        <div className="flex flex-col flex-grow gap-4 min-w-[168px]">
                            <span className="font-bold text-[16px] text-[#1E2022]">{t("transactionType")}</span>
                            <div className="relative">
                                <select className="w-full h-[46px] font-regular text-[16px] text-[#777777] indent-5 bg-[#F5F5F5] rounded-[40px] 
                                appearance-none
                                dark:bg-[#404040]">                    
                                    <option value="">{t("mortgageAndRent")}</option>
                                </select>                
                                <Arrow className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[40%]`}/>
                            </div>
                        </div>                    
                    </div>
                </div>
                <div className="flex flex-col gap-5   lg:flex-row">
                    <div className="flex flex-col gap-4 w-full   
                    sm:w-[304px]">
                        <span className="font-bold text-[16px] text-[#1E2022]">{t("desiredLocation")}</span>
                        <div className="relative">
                            <select className="w-full h-[46px] font-regular text-[16px] text-[#777777] indent-5 bg-[#F5F5F5] rounded-[40px] 
                            appearance-none
                            dark:bg-[#404040]">                    
                                <option value="">{t("provinceCity")}</option>
                            </select>                
                            <Arrow className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[40%]`}/>
                        </div>
                    </div>                    
                    <div className="flex flex-col flex-wrap gap-5 w-full   sm:flex-row">
                        <div className="flex flex-col flex-grow justify-start items-start gap-4 min-w-[168px]">
                            <label className="font-bold text-[16px] text-[#1E2022]   dark:text-[#FAFAFA]">{t("mortgageAmountRange")}</label>
                            <div className="w-full">
                                <TwoRangeSlider
                                defaultValues={range}
                                getValues={getSliderValues}
                                />
                            </div>
                        </div>                         
                        <div className="hidden h-[88px] bg-[#DDDDDD] rounded-[48px]   sm:w-[1px]"></div>
                        <div className="flex flex-col flex-grow justify-start items-start gap-4 min-w-[168px]">
                            <label className="font-bold text-[16px] text-[#1E2022]   dark:text-[#FAFAFA]">{t("rentAmountRange")}</label>
                            <div className="w-full">
                                <TwoRangeSlider
                                defaultValues={range}
                                getValues={getSliderValues}
                                />
                            </div>
                        </div>                          
                        <div className="hidden h-[88px] bg-[#DDDDDD] rounded-[48px]   sm:w-[1px]"></div>
                        <div className="flex flex-col flex-grow justify-start items-start gap-4 min-w-[168px]">
                            <label className="font-bold text-[16px] text-[#1E2022]   dark:text-[#FAFAFA]">{t("estateMeterageRange")}</label>
                            <div className="w-full">
                                <TwoRangeSlider
                                defaultValues={range}
                                getValues={getSliderValues}
                                />
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Filters