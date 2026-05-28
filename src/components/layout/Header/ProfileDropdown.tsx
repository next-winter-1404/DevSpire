"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import { LogOut, Settings, User } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import LogoutModal from "@/components/common/LogoutModal";
import { TUser } from "@/modules/mortgageRentDetail/types";

export default function ProfileDropdown({ data }: { data: TUser }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const locale = useLocale();
  return (
    <div
      className={`relative inline-block ${locale == "fa" ? "text-right" : "text-left"} `}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden 
        border border-[#777777] hover:border-[#10375c] focus:outline-none focus:border-[#10375c]
         transition-all duration-300 ring-2 ring-transparent focus:ring-blue-100 "
      >
        {data.profilePicture ? (
          // <Image
          //   src="/images"
          //   alt="پروفایل"
          //   width={50}
          //   height={50}
          //   className="object-cover bg-[#777777]/50 "
          // />
          <User size={30} />
        ) : (
          <User size={30} />
        )}
      </button>
      {isOpen && (
        <div
          className="absolute left-0 mt-3 w-50 p-2 bg-[#ffff]
            dark:bg-[#27272A] border
           border-gray-100 rounded-2xl
         shadow-2xl z-50 animate-in fade-in 
         zoom-in-95 duration-200"
        >
          <div className="px-4 py-3 border-b border-gray-50 text-right">
            <p className="text-sm font-semibold text-primary ">
              {data.firstName
                ? `${data.firstName} ${data.lastName}`
                : `${data.fullName}`}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {data.email}
            </p>
          </div>

          <div className="py-2 text-right">
            <Link
              href={`/dashboard/${
                data.role == "seller"
                  ? "seller"
                  : data.role == "buyer"
                    ? "customer"
                    : "admin"
              }`}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600
               hover:bg-gray-50 hover:text-[#10375c] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <DashboardIcon />
              داشبورد
            </Link>
          </div>

          <div className="border-t border-gray-50 py-1 text-right">
            <button
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600
               hover:bg-red-50 transition-colors cursor-pointer "
              onClick={() => setOpenLogoutModal(true)}
            >
              <LogOut size={18} />
              خروج از حساب
            </button>
          </div>
          {openLogoutModal && (
            <LogoutModal
              open={openLogoutModal}
              onClose={() => setOpenLogoutModal(false)}
              onConfirm={() => {
                setIsOpen(false);
                deleteCookie("refreshToken");
                deleteCookie("accessToken");
                toast.success("با موفقیت از حسابتان خارج شدید");
                router.push("/");
                router.refresh();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
