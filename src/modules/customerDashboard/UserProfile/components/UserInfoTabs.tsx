"use client"
import SecurityTab from '@/components/common/dashboards/SecurityTab';
import Tabs from '@/components/common/dashboards/Tabs';
import UserInfoTab from '@/components/common/dashboards/UserInfoTab';
import { useLocale } from 'next-intl';
import React, { useState } from 'react'



interface Tab {
  id: number; 
  label: string;
  value: string;
}

const UserInfoTabs = () => {

    const [activeTab, setActiveTab] = useState<string>("personalInfo");
    const locale = useLocale()

    const tabsData: Tab[] = [
        { id: 1, label: locale == "en" ? "Personal Information" : "اطلاعات شخصی", value: "personalInfo" },
        { id: 2, label: locale == "en" ? "Security Information" : "اطلاعات امنیتی", value: "securityInfo" },
    ];

    const onTabChange = (value: string) => {
        setActiveTab(value);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
                <h1 className="font-bold text-[24px] text-[#1E2022]">اطلاعات کاربری</h1>
                <Tabs activeTab={activeTab} onTabChange={onTabChange} tabs={tabsData} />
            </div>  
            <div>
                {activeTab === "personalInfo" && <UserInfoTab/>}
                {activeTab === "securityInfo" && <SecurityTab/>}
            </div>  
        </div>
    )

}

export default UserInfoTabs