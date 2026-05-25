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
    <div>
      {tabs.map((item) => (
        <span
          key={item.id}
          onClick={() => onTabChange(item.value)} 
          className={`py-[13px] px-3 rounded-[16px] cursor-pointer ${activeTab === item.value ? 'font-bold border-b-2 border-[#0D3B66]' : ''}`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
