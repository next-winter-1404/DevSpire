"use client";
import { Link, useRouter } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Dashboard from "../../../../public/icons/Dashboard";
import EditUser from "../../../../public/icons/EditUser";
import Notification from "../../../../public/icons/Notification";
import Estates from "../../../../public/icons/Estates";
import CheckList from "../../../../public/icons/CheckList";
import FinantialManagement from "../../../../public/icons/FinantialManagement";
import Chats from "../../../../public/icons/Chats";
import LogOut from "../../../../public/icons/LogOut";
import Heart from "../../../../public/icons/Heart";
import Logo from "../../../../public/icons/Logo";
import toast from "react-hot-toast";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import LogoutModal from "@/components/common/LogoutModal";
import { Newspaper, UsersIcon } from "lucide-react";
import Location from "../../../../public/icons/Location";

import { Globe } from "lucide-react";
import Chat from "../../../../public/icons/Chat";
import Category from "../../../../public/icons/Category";

interface IProps {
  role: "seller" | "buyer" | "admin";
}

const sellerBasePath = "/dashboard/seller";
const customerBasePath = "/dashboard/customer";
const adminBasePath = "/dashboard/admin";

const DashboardSidebar = ({ role }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("sellerDashboard.sidebar");

  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const isActiveText = (path: string) =>
    pathname === path
      ? "font-bold text-[#1E2022] dark:text-[#E4E4E4]"
      : "text-[#777777] dark:text-[#A3A3A3]";

  const isActiveIcon = (path: string) =>
    pathname === path
      ? "text-[#0D3B66] dark:text-[#E4E4E4]"
      : "dark:text-[#A3A3A3]";

  const sellerMenuItems = {
    general: [
      { href: `${sellerBasePath}`, label: t("dashboard"), Icon: Dashboard },
      {
        href: `${sellerBasePath}/user-info`,
        label: t("userProfile"),
        Icon: EditUser,
      },
      {
        href: `${sellerBasePath}/notifications`,
        label: t("notifications"),
        Icon: Notification,
      },
    ],
    management: [
      {
        href: `${sellerBasePath}/estates-management`,
        label: t("estatesManagement"),
        Icon: Estates,
      },
      {
        href: `${sellerBasePath}/reserves-management`,
        label: t("reservesManagement"),
        Icon: CheckList,
      },
      {
        href: `${sellerBasePath}/payments`,
        label: t("finantialManagement"),
        Icon: FinantialManagement,
      },
      {
        href: `${sellerBasePath}/comments-management`,
        label: t("commentsManagement"),
        Icon: Chats,
      },
    ],
  };

  const customerMenuItems = {
    general: [
      { href: `${customerBasePath}`, label: t("dashboard"), Icon: Dashboard },
      {
        href: `${customerBasePath}/user-info`,
        label: t("userProfile"),
        Icon: EditUser,
      },
      {
        href: `${customerBasePath}/notifications`,
        label: t("notifications"),
        Icon: Notification,
      },
    ],
    management: [
      {
        href: `${customerBasePath}/reserves-management`,
        label: t("reservesManagement"),
        Icon: CheckList,
      },
      {
        href: `${customerBasePath}/payments`,
        label: t("paymentsManagement"),
        Icon: FinantialManagement,
      },
      {
        href: `${customerBasePath}/favorites`,
        label: t("favorites"),
        Icon: Heart,
      },
    ],
  };
  const adminMenuItems = {
    general: [
      { href: `${adminBasePath}`, label: t("dashboard"), Icon: Dashboard },
      {
        href: `${adminBasePath}/user-info`,
        label: t("userProfile"),
        Icon: EditUser,
      },
      {
        href: `${adminBasePath}/notifications`,
        label: t("notifications"),
        Icon: Notification,
      },
    ],
    management: [
      {
        href: `${adminBasePath}/categories`,
        label: t("categories"),
        Icon: Category,
      },
      {
        href: `${adminBasePath}/estates-management`,
        label: t("estatesManagement"),
        Icon: Estates,
      },
      {
        href: `${adminBasePath}/reserves-management`,
        label: t("reservesManagement"),
        Icon: CheckList,
      },
      {
        href: `${adminBasePath}/locations-management`,
        label: t("locationsManagement"),
        Icon: Location,
      },
      {
        href: `${adminBasePath}/users-management`,
        label: t("usersManagement"),
        Icon: UsersIcon,
      },
      {
        href: `${adminBasePath}/tours-management`,
        label: "مدیریت تور ها",
        Icon: UsersIcon,
      },
      {
        href: `${adminBasePath}/payments`,
        label: t("paymentsManagement"),
        Icon: FinantialManagement,
      },
      {
        href: `${adminBasePath}/social-media`,
        label: "شبکه های اجتماعی",
        Icon: Globe,
      },
      {
        href: `${adminBasePath}/comments-management`,
        label: "مدیریت کامنت ها",
        Icon: Chat,
      },
      {
        href: `${adminBasePath}/blogs`,
        label: "مدیریت مقالات",
        Icon: Newspaper,
      },
    ],
  };

  const menuItems =
    role == "seller"
      ? sellerMenuItems
      : role == "buyer"
        ? customerMenuItems
        : adminMenuItems;

  return (
    <div
      className="hidden flex flex-col gap-8 w-[268px] max-h-screen p-8 bg-[#F5F5F5] 
      border border-[#DDDDDD] rounded-[40px]
      dark:bg-[#404040] dark:border-[#777777]
      md:flex md:flex-col "
    >
      <div className="flex items-center gap-4">
        <Logo color="text-[#0D3B66]" className="w-8 h-8" />
        <h2 className="font-bold text-[32px] text-[#1E2022] dark:text-[#F5F5F5]">
          {t("logo")}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-regular text-[16px] text-[#0D3B66] dark:text-[#E6EDF5]">
          {t("menu")}
        </h3>
        <div className="flex flex-col gap-6 font-regular text-[16px]">
          {menuItems.general.map(({ href, label, Icon }) => (
            <div key={href} className="flex items-center gap-4 text-[#777777]">
              <Icon className={isActiveIcon(href)} />
              <Link href={href} className={isActiveText(href)}>
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-col gap-3 h-full 
       overflow-y-auto scroll-smooth pe-4 whitespace-nowrap"
      >
        <h3 className="font-regular text-[16px] text-[#0D3B66] dark:text-[#E6EDF5]">
          {t("management")}
        </h3>
        <div className="flex flex-col gap-6 font-regular text-[16px] ">
          {menuItems.management.map(({ href, label, Icon }) => (
            <div key={href} className="flex items-center gap-4 text-[#777777]">
              <Icon className={isActiveIcon(href)} />
              <Link href={href} className={isActiveText(href)}>
                {label}
              </Link>
            </div>
          ))}
          <button
            className=" cursor-pointer flex items-center gap-4
            text-[#777777] dark:text-[#A3A3A3] "
            onClick={() => setOpenLogoutModal(true)}
          >
            <LogOut />
            <h2>{t("logOut")}</h2>
          </button>
        </div>
      </div>

      {openLogoutModal && (
        <LogoutModal
          onClose={() => setOpenLogoutModal(false)}
          open={openLogoutModal}
          onConfirm={() => {
            deleteCookie("refreshToken");
            deleteCookie("accessToken");
            toast.success("با موفقیت از حسابتان خارج شدید");
            router.push("/");
          }}
        />
      )}
    </div>
  );
};

export default DashboardSidebar;
