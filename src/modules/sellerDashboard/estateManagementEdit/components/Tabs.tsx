'use client'
import React, { useState, useEffect } from 'react'
import BasicSpecifications from './BasicSpecifications'
import Location from './Location'
import EstateFacilities from './EstateFacilities'
import EstateImage from './EstateImage'
import FinalApproval from './FinalApproval'
import { THouse } from '@/components/common/types'

const tabsData = [
    { id: 1, label: 'مشخصات اولیه', component: BasicSpecifications },
    { id: 2, label: 'موقعیت مکانی', component: Location },
    { id: 3, label: 'امکانات ملک', component: EstateFacilities },
    { id: 4, label: 'تصویر ملک', component: EstateImage },
    { id: 5, label: 'تایید نهایی', component: FinalApproval },
]

interface IProps{
    house: THouse
}

type FormDataMap = Record<number, any>;

const Tabs = ({house}:IProps) => {
    
    const [activeTab, setActiveTab] = useState(1)
    const [allFormData, setAllFormData] = useState<FormDataMap>({});

    useEffect(() => {
        const initialData: FormDataMap = {};
        tabsData.forEach(tab => {
            initialData[tab.id] = {};
        });
        setAllFormData(initialData);
    }, []);

    const handleNext = (stepData: any) => {
        setAllFormData(prev => ({ ...prev, [activeTab]: stepData }))
        if (activeTab < tabsData.length) {
            setActiveTab(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (activeTab > 1) {
            setActiveTab(prev => prev - 1)
        }
    }

    const handleFinalSubmit = () => {
        console.log('داده‌های نهایی:', allFormData)
    }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex gap-8 font-regular text-[16px] text-[#777777]'>
                {tabsData.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-[13px] px-3 border rounded-[16px] cursor-pointer ${activeTab === tab.id
                            ? 'border-2 text-[#0D3B66] font-bold' : 'border-[#777777]'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            {tabsData.map((tab) => {
                const CurrentComponent = tab.component;
                return (
                    activeTab === tab.id && (
                        <CurrentComponent
                            house={house}
                            key={tab.id}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handleFinalSubmit={handleFinalSubmit}
                            formData={allFormData[tab.id] || {}}
                        />
                    )
                );
            })}
        </div>
    )
}

export default Tabs
