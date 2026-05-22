"use client";
import Close from "../../../../public/icons/Close";
import { Links } from "@/modules/header/mock/Links";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ToggleThem from "@/components/common/ToggleTheme";

interface HeaderMenuProps {
  toggleMenu: (value: boolean) => void;
}

const HeaderMenu = ({ toggleMenu }: HeaderMenuProps) => {
  const pathname = usePathname();
  const t = useTranslations("header");

  return (
    <div className="fixed inset-0 z-50 flex   md:hidden">
      <div
        onClick={() => {
          toggleMenu(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      ></div>
      <div
        className="relative  flex flex-col w-[75%] max-w-sm h-full bg-[#FFFFFF] dark:bg-[#3F3F46] shadow-2xl p-6 animate-in 
      slide-in-from-right-8 duration-300"
      >
        <div className="flex justify-between items-center pb-6 border-b dark:border-gray-600">
          <div className="flex items-center gap-6 h-full">
            <span className="font-bold text-xl text-[#0D3B66] dark:text-[#E4E4E4]">
              {t("logo")}
            </span>
            <div className="flex items-center gap-4 h-full">
              <div className="h-full">
                <LanguageSwitcher />
              </div>
              <ToggleThem />
            </div>
          </div>

          <button
            onClick={() => {
              toggleMenu(false);
            }}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Close />
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-8 overflow-y-auto">
          {Links.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                onClick={() => {
                  toggleMenu(false);
                }}
                key={index}
                href={item.link}
                className={` cursor-pointer block w-full px-4 py-3 rounded-xl font-semibold text-[16px] transition-all duration-200 ${
                  (
                    item.link == "/"
                      ? pathname == "/"
                      : pathname.includes(item.link)
                  )
                    ? "text-[#0D3B66] bg-blue-50 dark:text-white dark:bg-gray-700"
                    : "text-[#777777] dark:text-gray-300 "
                }`}
              >
                {t(`${item.title}`)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
