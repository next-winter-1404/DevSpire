import React from 'react'
import Close from '../../../../public/icons/Close'
import { useTranslations } from 'next-intl'


const ReadNotificationsModal = () => {

    const t = useTranslations("sellerDashboard.notifications");


    return (
        <div className="flex flex-col items-center gap-8 p-8 bg-[#FFFFFF] rounded-[24px]">
            <div className="flex justify-end">
                <div className="p-4 bg-[#F5F5F5] rounded-full">
                    <Close className="w-4 h-4"/>
                </div>
            </div>
            <p>{t("markAsReadModalText")}</p>
            <div className="flex w-full gap-6">
                <button className="w-full text-[#777777] border border-[#777777] rounded-[16px]">{t("cancelBtn")}</button>
                <button className="w-full text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]">{t("agreeBtn")}</button>
            </div>
        </div>
    )

}

export default ReadNotificationsModal