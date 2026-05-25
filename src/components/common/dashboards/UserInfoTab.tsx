import React, { useState } from 'react'
import Trash from '../../../../public/icons/Trash'
import ChooseProfileModal from './ChooseProfileModal'
import { useTranslations } from 'next-intl'


const UserInfoTab = () => {
    
    const t = useTranslations("sellerDashboard.userInfo")

    const [openChooseProfModal, setOpenChooseProfModal] = useState<boolean>(false)

    const handleChooseProfModal = (value: boolean) => {
        setOpenChooseProfModal(value);
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <div onClick={() => {handleChooseProfModal(true)}} className="relative">
                    <div className="p-1 bg-[#E6EDF5] rounded-full absolute top-[50%] left-[#50%]">
                        <Trash/>
                    </div>
                </div>
                <div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("firstName")}</span>
                            <input type="text" placeholder={t("firstNameInputPlc")}
                            className="w-full h-12 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("lastName")}</span>
                            <input type="text" placeholder={t("lastNameInputPlc")}
                            className="w-full h-12 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("phoneNumber")}</span>
                            <input type="text" placeholder={t("phoneNumberInputPlc")}
                            className="w-full h-12 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("email")}</span>
                            <input type="text" placeholder="example@gmail.com"
                            className="w-full h-12 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                    </div>
                </div>
                <button className="py-[13px] px-4 font-regular text-[16px] text-[#FFFFFF]">{t("applyChanges")}</button>
            </div>
            {
                openChooseProfModal && <ChooseProfileModal handleChooseProfModal={handleChooseProfModal}/>
            }
        </>
    )

}

export default UserInfoTab