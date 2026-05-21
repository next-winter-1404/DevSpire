"use client"
import Image from "next/image";
import EstateOwner from "../../../../public/images/mortgageRentDetail/estate-owner.jpg";
import ToggleTheme from "@/components/common/ToggleTheme";
import Home from "../../../../public/icons/Home";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Notification from "../../../../public/icons/Notification";
import { useState } from "react";
import Menu from "../../../../public/icons/Menu";
import DashSidebarMenu from "../dashboardSidebar/DashSidebarMenu";

interface IProps {
  hasNotification: boolean;
  isSellerDashboard: boolean
}


const DashboardHeader = ({hasNotification, isSellerDashboard}: IProps) => {

  const t = useTranslations('sellerDashboard.header')

  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState<boolean>(false);

  const useToggleMenu = (value: boolean) => {
    setIsOpenSidebarMenu(value);
  };


  return (
    <div
      className="flex justify-between w-full py-2 px-4 bg-[#F5F5F5] border
       border-[#DDDDDD] rounded-[24px]   
    dark:bg-[#404040] dark:border-[#777777]"
    >
      <div className="flex items-center gap-4">
        <button onClick={() => useToggleMenu(true)} className="block md:hidden p-1">
          <Menu className="w-8 h-8"/>
        </button>
        <Image
          src={EstateOwner}
          alt="estateOwner"
          className="w-12 h-12 rounded-[40px]"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="font-regular text-[20px] text-[#1E2022]   dark:text-[#F5F5F5]">
              متین قربان زاده
            </span>
            <span className="font-regular text-[14px] text-[#0D3B66]   dark:text-[#E4E4E4]">
              (فروشنده)
            </span>
          </div>
          <div className="flex items-center gap-1 font-regular text-[16px]">
            <span className="text-[#1E2022]   dark:text-[#F5F5F5]">
              {t("balance")}
            </span>
            <span className="text-[#777777]   dark:text-[#E4E4E4]">
              30,000,000 تومان
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden h-10   md:block">
          <LanguageSwitcher />
        </div>
        <div className="hidden   md:block">
          <ToggleTheme />
        </div>
        {hasNotification && (
          <div className="p-2 rounded-full bg-[#0D3B66]">
            <Notification color="#FFFFFF" />
          </div>
        )}
        <Link
          href={"/"}
          className="p-2 bg-[#0D3B66] rounded-[40px] cursor-pointer"
        >
          <Home color="#FFFFFF" />
        </Link>
      </div>
      {isOpenSidebarMenu && <DashSidebarMenu useToggleMenu={useToggleMenu} isSellerDashboard={isSellerDashboard}/>}
    </div>
  );
};

export default DashboardHeader;
