import React, { useState } from 'react'
import Trash from '../../../../public/icons/Trash'
import ChooseProfileModal from './ChooseProfileModal'
import { useTranslations } from 'next-intl'
import Image from 'next/image'


const UserInfoTab = () => {
    
    const t = useTranslations("sellerDashboard.userInfo")

    const [openChooseProfModal, setOpenChooseProfModal] = useState<boolean>(false)

    const handleChooseProfModal = (value: boolean) => {
        setOpenChooseProfModal(value);
    }

    return (
        <>
            <div className="flex flex-col items-center gap-8">
                <div 
                onClick={() => {handleChooseProfModal(true)}} 
                className="flex justify-center items-center w-40 h-40 bg-[#FFFFFF] border border-[#DDDDDD] rounded-full 
                cursor-pointer">
                    {/* <Image src={} alt={} className="absolute top-0 left-0"/> */}
                    <div className="p-1 bg-[#E6EDF5] rounded-full">
                        <Trash/>
                    </div>
                </div>
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("firstNameInputTitle")}</span>
                            <input type="text" placeholder={t("firstNameInputPlc")}
                            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("lastNameInputTitle")}</span>
                            <input type="text" placeholder={t("lastNameInputPlc")}
                            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("phoneNumberInputTitle")}</span>
                            <input type="text" placeholder={t("phoneNumberInputPlc")}
                            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <span>{t("emailInputTitle")}</span>
                            <input type="text" placeholder="example@gmail.com"
                            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start w-full">
                    <button className="py-[13px] px-4 font-regular text-[16px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]">
                        {t("applyChangesBtn")}
                    </button>
                </div>            
            </div>
            {openChooseProfModal && <ChooseProfileModal handleChooseProfModal={handleChooseProfModal}/>}
        </>
    )

}

export default UserInfoTab