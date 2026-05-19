"use client";

import { useState } from "react";
import UserInfoForm from "./UserInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";

type TabType = "personal" | "security";

export default function UserInfoTabs() {
    const [activeTab, setActiveTab] = useState<TabType>("personal");

    return (
        <div className="flex flex-col gap-6">

            {/* تب‌ها */}
            <div className="flex w-[332px] h-[48px] gap-[32px]">
                <button
                    onClick={() => setActiveTab("personal")}
                    className={`w-[150px] h-[48px] flex items-center justify-center rounded-[16px] px-[12px] py-[8px] border-2 text-[16px] leading-[100%] whitespace-nowrap transition-all ${activeTab === "personal"
                        ? "border-[#0D3B66] text-[#0D3B66] font-bold"
                        : "border-[#DDDDDD] text-gray-500 dark:text-gray-300 font-normal"
                        }`}
                >
                    اطلاعات شخصی
                </button>

                <button
                    onClick={() => setActiveTab("security")}
                    className={`w-[150px] h-[48px] flex items-center justify-center rounded-[16px] px-[12px] py-[8px] border-2 text-[16px] leading-[100%] whitespace-nowrap transition-all ${activeTab === "security"
                        ? "border-[#0D3B66] text-[#0D3B66] font-bold"
                        : "border-[#DDDDDD] text-gray-500 dark:text-gray-300 font-normal"
                        }`}
                >
                    اطلاعات امنیتی
                </button>
            </div>

            {/* دایره عکس وسط صفحه */}
            <div className="flex justify-center">
                <div className="w-[160px] h-[160px] rounded-[80px] py-[55px] px-[60px] flex items-center justify-center gap-[10px] bg-gray-200">

                </div>
            </div>

            {/* فرم */}
            <div className="w-full mt-6">
                {activeTab === "personal" ? <UserInfoForm /> : <ChangePasswordForm />}
            </div>

        </div>
    );
}
