"use client";
import React, { useState } from "react";
import Home from "../../../../public/icons/Home";
import Arrow from "../../../../public/icons/Arrow";
import ToggleThem from "../../common/ToggleTheme";
import HeaderMenu from "./HeaderMenu";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import Menu from "../../../../public/icons/Menu";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Links } from "@/modules/header/mock/Links";


const Header = () => {
  
  const [activeTab, setActiveTab] = useState<string>("خانه");
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const useToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const pathname = usePathname()
  const t = useTranslations('header')

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <Menu onClick={useToggleMenu} className="block   sm:hidden"/>
            <Home/>
            <span className="font-medium text-[#0D3B66]">لوگو</span>
          </div>
          <div className="hidden   sm:flex sm:items-center sm:gap-8">
            {
              Links.map((item, index) => (
                <Link 
                key={index} 
                href={item.link}
                className={`${pathname == item.link 
                ? 'font-bold text-[#0D3B66] border-b-2 border-[#0D3B66]   dark:text-[#E4E4E4] dark:border-[#E4E4E4]' 
                : ''}`}>
                  {t(`${item.title}`)}
                </Link>
              ))
            }
          </div>
          <div className="flex gap-2 sm:gap-6">
            <div className="hidden md:block">
              <LanguageSwitcher/>
            </div>
            <div className="hidden md:block">
              <ToggleThem/>
            </div>
            <button
              className="py-2 px-4 text-[#FFFFFF] bg-[#0D3B66] rounded-[48px] cursor-pointer
            sm:px-6"
            >
              ورود
            </button>
            <button
              className="py-2 px-4 text-[#0D3B66] border border-[#0D3B66] rounded-[48px] cursor-pointer
            sm:px-6
            dark:text-[#F5F5F5] dark:border-[#F5F5F5]"
            >
              ثبت نام
            </button>
          </div>
        </div>
      </div>
      {toggleMenu && <HeaderMenu useToggleMenu={useToggleMenu} />}
    </>
  );
};

export default Header;
