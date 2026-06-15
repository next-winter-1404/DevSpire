"use client";
import { useState } from "react";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import Menu from "../../../../public/icons/Menu";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Links } from "@/modules/main/header/mock/Links";
import HeaderMenu from "./HeaderMenu";
import ToggleTheme from "../../common/ToggleTheme";
import Logo from "../../../../public/icons/Logo";
import ProfileDropdown from "./ProfileDropdown";
import { TUserRes } from "@/modules/dashboard/customerDashboard/dashboard/components/CustomerDashboardCharts";

const Header = ({ user }: { user: TUserRes | null }) => {
  const pathname = usePathname();
  const t = useTranslations("header");
  const locale = useLocale();

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const toggleMenu = (value: boolean) => {
    setIsOpenMenu(value);
  };

  return (
    <>
      <div
        className="flex justify-center fixed w-full top-0 left-0 pb-4 pt-5 px-4
       sm:px-6 lg:px-12 z-50 bg-background shadow "
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                toggleMenu(true);
              }}
              className="block md:hidden p-1"
            >
              <Menu />
            </button>
            <div className="flex items-center gap-2 text-[#0D3B66]">
              <Logo className="w-6 h-6 dark:text-[#E4E4E4]" />
              <span className="font-bold text-[24px]   dark:text-[#E4E4E4]">
                {t("logo")}
              </span>
            </div>
          </div>
          <div className="hidden   md:flex md:items-center md:gap-8">
            {Links.map((item, index) => {
              const isActive =
                item.link === "/"
                  ? pathname === "/"
                  : pathname.includes(item.link);

              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`relative group transition-all ${
                    isActive ? "font-bold text-[#0D3B66]" : "hover:font-bold"
                  }`}
                >
                  {t(item.title)}

                  <span
                    className={`absolute -bottom-1.5 h-0.5 w-full bg-primary transition-all duration-200
                       ease-out
        ${locale === "fa" ? "right-0 " : "left-0 "}
        ${
          isActive
            ? "scale-x-100 opacity-100"
            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
        }`}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex gap-2 md:gap-6">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <ToggleTheme />
            </div>
            {user ? (
              <ProfileDropdown data={user.user} />
            ) : (
              <>
                <Link
                  href={"/auth/login"}
                  className="py-2 px-4 text-[#FFFFFF] bg-[#0D3B66] rounded-[48px] cursor-pointer   md:px-6"
                >
                  {t("login")}
                </Link>
                <Link
                  href={"/auth/register"}
                  className="py-2 px-4 text-[#0D3B66] border border-[#0D3B66] rounded-[48px] cursor-pointer   md:px-6
            dark:text-[#F5F5F5] dark:border-[#F5F5F5]"
                >
                  {t("signUp")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {isOpenMenu && <HeaderMenu toggleMenu={toggleMenu} />}
    </>
  );
};

export default Header;
