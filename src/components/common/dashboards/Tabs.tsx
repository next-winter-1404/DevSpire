import React from 'react';


interface Tab {
  id: number; 
  label: string;
  value: string;
}

interface IProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const Tabs = ({ tabs, activeTab, onTabChange }:IProps) => {
  
  return (
    <div className="flex gap-4">
      {tabs.map((item) => (
        <div             
        key={item.id}
        onClick={() => onTabChange(item.value)} 
        className={`py-[13px] px-3 text-[16px] border-2 rounded-[16px] cursor-pointer 
        ${activeTab === item.value ? 'font-bold text-[#0D3B66] border-[#0D3B66]' : 'text-[#777777] border-[#777777]'}`}>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
