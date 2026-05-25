import { useTranslations } from 'next-intl'
import React from 'react'


const SecurityTab = () => {

    const t = useTranslations("sellerDashboard.userInfo")

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <span>{t("prevPasswordInputTitle")}</span>
                    <input type="text" placeholder={t("prevPasswordInputPlc")}/>
                </div>
                <div className="flex flex-col gap-4">
                    <span>{t("newPasswordInputTitle")}</span>
                    <input type="text" placeholder={t("newPasswordInputPlc")}/>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <span>{t("repeatNewPassInputTitle")}</span>
                <input type="text" placeholder={t("repeatNewPassInputPlc")}/>
            </div>
            <button className="py-[13px] px-4 font-regular text-[16px] text-[#FFFFFF]">{t("applyChanges")}</button>
        </div>
    )

}

export default SecurityTab