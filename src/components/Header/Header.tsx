"use client";
import React, { useState } from "react";
import Home from "../../../public/icons/Home";
import Arrow from "../../../public/icons/Arrow";
import ToggleThem from "../common/ToggleTheme";
import Image from "next/image";
import Menu from "../../../public/icons/menu-2.svg";
import HeaderMenu from "./HeaderMenu";
import LanguageSwitcher from "../common/LanguageSwitcher";

const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("خانه");
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const useToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <Image
              onClick={useToggleMenu}
              src={Menu}
              alt="menu"
              width={32}
              height={32}
              className="block   sm:hidden"
            />
            <Home />
            <span className="font-medium text-[#0D3B66]">لوگو</span>
          </div>
          <div className="hidden   sm:flex sm:items-center sm:gap-8">
            <span
              onClick={() => {
                setActiveTab("خانه");
              }}
              className={`cursor-pointer dark:text-[#F5F5F5] ${activeTab === "خانه" ? "border-b-2 border-[#0D3B66] dark:border-[#F5F5F5]" : ""}`}
            >
              خانه
            </span>
            <div className="flex items-center gap-2">
              <span
                onClick={() => {
                  setActiveTab("رزرو سریع");
                }}
                className={`cursor-pointer dark:text-[#F5F5F5] ${activeTab === "رزرو سریع" ? "border-b-2 border-[#0D3B66] dark:border-[#F5F5F5]" : ""}`}
              >
                رزرو سریع
              </span>
              <Arrow color="#1E2022" className="dark:text-[#F5F5F5]" />
            </div>
            <div className="flex items-center gap-2">
              <span
                onClick={() => {
                  setActiveTab("رهن و اجاره");
                }}
                className={`cursor-pointer dark:text-[#F5F5F5] ${activeTab === "رهن و اجاره" ? "border-b-2 border-[#0D3B66] dark:border-[#F5F5F5]" : ""}`}
              >
                رهن و اجاره
              </span>
              <Arrow />
            </div>
            <span
              onClick={() => {
                setActiveTab("مقالات");
              }}
              className={`cursor-pointer dark:text-[#F5F5F5] ${activeTab === "مقالات" ? "border-b-2 border-[#0D3B66] dark:border-[#F5F5F5]" : ""}`}
            >
              مقالات
            </span>
            <span
              onClick={() => {
                setActiveTab("درباره ما");
              }}
              className={`cursor-pointer dark:text-[#F5F5F5] ${activeTab === "درباره ما" ? "border-b-2 border-[#0D3B66] dark:border-[#F5F5F5]" : ""}`}
            >
              درباره ما
            </span>
          </div>
          <div className="flex gap-2 sm:gap-6">
            <div className=" hidden md:block ">
              <LanguageSwitcher />
            </div>
            <div className=" hidden md:block ">
              <ToggleThem />
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
