"use client";
import Image from "next/image";
import ToggleTheme from "@/components/common/ToggleTheme";
import Home from "../../../../public/icons/Home";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Notification from "../../../../public/icons/Notification";
import { useState } from "react";
import Menu from "../../../../public/icons/Menu";
import DashSidebarMenu from "../dashboardSidebar/DashSidebarMenu";
import EstateOwner from "../../../../public/images/mortgageRentDetail/estate-owner.jpg";
import { TUserRes } from "@/modules/CustomerDashboard/Dashboard/components/CustomerDashboardCharts";

interface IProps {
  hasNotification: boolean;
  userInfo: TUserRes | null;
}

const DashboardHeader = ({ hasNotification, userInfo }: IProps) => {


  const t = useTranslations("dashboardHeader");

  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState<boolean>(false);

  const toggleMenu = (value: boolean) => {
    setIsOpenSidebarMenu(value);
  };

  return (
    <div
      className="flex justify-between w-full py-2 px-4 bg-[#F5F5F5] border
       border-[#DDDDDD] rounded-[24px]   
    dark:bg-[#404040] dark:border-[#777777]"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleMenu(true)}
          className="block md:hidden p-1"
        >
          <Menu className="w-8 h-8" />
        </button>
        <Image
          src={EstateOwner}
          alt="estateOwner"
          className=" w-11 h-11 md:w-12 md:h-12 rounded-[40px]"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center md:gap-1">
            <span
              className="font-regular text-[20px] text-[#1E2022] 
              dark:text-[#F5F5F5] hidden md:block "
            >
              {userInfo?.user?.firstName || "بدون نام"}{" "}
              {userInfo?.user?.lastName}
            </span>
            <span
              className="font-regular text-[14px] text-[#0D3B66] 
              dark:text-[#E4E4E4]"
            >
              {userInfo?.user?.role === "buyer"
                ? t("customer")
                : userInfo?.user?.role == "seller"
                  ? t("seller")
                  : t("admin")}
            </span>
          </div>
          <div className="flex items-center gap-1 font-regular text-[16px]">
            {/* <span className="text-[#1E2022]   dark:text-[#F5F5F5]">
              {t("balance")}
            </span>
            <span className="text-[#777777]   dark:text-[#E4E4E4]">
              30,000,000 تومان
            </span> */}
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
      {isOpenSidebarMenu && (
        <DashSidebarMenu toggleMenu={toggleMenu} role={userInfo?.user?.role} />
      )}
    </div>
  );
};

export default DashboardHeader;
