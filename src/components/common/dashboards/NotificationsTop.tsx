"use client"
import { useLocale, useTranslations } from "next-intl"
import CustomSelect from "../CustomSelectOption"
import { useMutation } from "@tanstack/react-query"
import { ReadAllNotifications } from "@/modules/sellerDashboard/Notifications/services/PUT/ReadAllNotifications"
import Filter from "../../../../public/icons/Filter"
import { useState } from "react"
import NotificationsFilterModal from "./NotificationsFilterModal"


const NotificationsTop = () => {

    
    const t = useTranslations("sellerDashboard.notifications")
    const locale = useLocale()


    const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
    const handleNotifFilterModal = (value: boolean) => {
        setIsOpenFilterModal(value)
    }



    const notifTypeOptions = [
        {id:1, label: locale === "en" ? "اعلان ها" : "Notifications", value: "notifications"}
    ]

    const readAllNotifMutation = useMutation({
        mutationFn: async () => {
            const result = await ReadAllNotifications();
            return result;
        },        
        onSuccess: () => {
            window.location.reload();
        },
        onError: (error) => {
            locale === "en" ? alert("Error. Try Again") : alert("مشکلی پیش آمد، دوباره تلاش کنید.");
        }
    })


    return (
        <>
            <div className="flex justify-between items-center w-full">
                <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("title")}</h1>
                <div className="flex gap-4">
                    <button 
                    onClick={() => {handleNotifFilterModal(true)}}
                    className="flex items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]
                    cursor-pointer
                    dark:text-[#FFFFFF] dark:bg-[#404040]">
                        <Filter/>
                        <span>{t("filters")}</span>
                    </button>
                    <button 
                    onClick={() => {readAllNotifMutation.mutate()}}
                    className="py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]">
                        {t("markAsRead")}
                    </button>
                </div>
            </div>
            {isOpenFilterModal && <NotificationsFilterModal handleNotifFilterModal={handleNotifFilterModal}/>}
        </>
    )

}

export default NotificationsTop