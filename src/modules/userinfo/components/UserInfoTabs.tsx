"use client";
import { useState } from "react";
import UserInfoForm from "./UserInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import UserAvatarUploader from "./UserAvatarUploader";
import { useTranslations } from "next-intl";
interface UserInfoTabsProps {
    userId: string;
}

export default function UserInfoTabs({ userId }: UserInfoTabsProps) {
    const t = useTranslations("User");
    const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");
    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6">
                <button
                    type="button"
                    onClick={() => setActiveTab("personal")}
                    className={`w-[150px] h-[48px] flex items-center justify-center rounded-[16px] border-2 text-[16px] transition-all 
            ${activeTab === "personal"
                            ? "border-[#0D3B66] text-[#0D3B66] font-bold dark:border-white dark:text-white"
                            : "border-[#DDDDDD] text-gray-500 dark:border-white/10 dark:text-white/40"
                        }`}
                >
                    {t("personalInfo")}
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("security")}
                    className={`w-[150px] h-[48px] flex items-center justify-center rounded-[16px] border-2 text-[16px] cursor-pointer transition-all 
            ${activeTab === "security"
                            ? "border-[#0D3B66] text-[#0D3B66] font-bold dark:border-white dark:text-white"
                            : "border-[#DDDDDD] text-gray-500 dark:border-white/10 dark:text-white/40"
                        }`}
                >
                    {t("securityInfo")}
                </button>
            </div>
            <div className="flex justify-center">
                <UserAvatarUploader userId={userId} />
            </div>
            <div className="w-full mt-6">
                {activeTab === "personal" ? (
                    <UserInfoForm userId={userId} />
                ) : (
                    <ChangePasswordForm />
                )}
            </div>
        </div>
    );
}
