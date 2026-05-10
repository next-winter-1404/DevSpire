"use client";
import React, { useState } from "react";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import Menu from "../../../../public/icons/Menu";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Links } from "@/modules/header/mock/Links";
import HeaderMenu from "./HeaderMenu";
import ToggleTheme from "../../common/ToggleTheme";
import Logo from "../../../../public/icons/Logo";



const Header = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const useToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const pathname = usePathname();

  const t = useTranslations("header");

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <button onClick={useToggleMenu} className="block md:hidden p-1">
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
            {Links.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`${
                  (
                    item.link == "/"
                      ? pathname == "/"
                      : pathname.includes(item.link)
                  )
                    ? "font-bold text-[#0D3B66] border-b-2 border-[#0D3B66] pb-2 "
                    : "hover:font-bold  "
                } transition-all `}
              >
                {t(`${item.title}`)}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 md:gap-6">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <ToggleTheme/>
            </div>
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
          </div>
        </div>
      </div>
      {toggleMenu && <HeaderMenu useToggleMenu={useToggleMenu} />}
    </>
  );
};

export default Header;
