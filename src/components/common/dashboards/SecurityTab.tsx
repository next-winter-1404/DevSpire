import { useTranslations } from 'next-intl'
import React from 'react'


const SecurityTab = () => {

    const t = useTranslations("sellerDashboard.userInfo")

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8 w-full">
                <div className="flex flex-col flex-grow gap-4">
                    <span>{t("prevPasswordInputTitle")}</span>
                    <input type="text" placeholder={t("prevPasswordInputPlc")}
                    className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                </div>
                <div className="flex flex-col flex-grow gap-4">
                    <span>{t("newPasswordInputTitle")}</span>
                    <input type="text" placeholder={t("newPasswordInputPlc")}
                    className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-[578px]">
                <span>{t("repeatNewPassInputTitle")}</span>
                <input type="text" placeholder={t("repeatNewPassInputPlc")}
                className="h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
            </div>
            <div className="flex justify-start w-full">
                <button className="py-[13px] px-4 font-regular text-[16px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]">
                    {t("applyChangesBtn")}
                </button>
            </div>
        </div>
    )

}

export default SecurityTab