import React from "react";
import Home from "@/icons/Home";
import Arrow from "@/icons/Arrow";
import ToggleThem from "../common/ToggleTheme";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Home />
        <span className="font-medium text-primary">لوگو</span>
        <div>
          <ToggleThem />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <span>خانه</span>
        <div className="flex items-center gap-2">
          <span>رزرو سریع</span>
          <Arrow />
        </div>
        <div className="flex items-center gap-2">
          <span>رهن و اجاره</span>
          <Arrow />
        </div>
        <span>مقالات</span>
        <span>درباره ما</span>
      </div>
      <div className="flex gap-6">
        <button className="py-2 px-6 text-[#FFFFFF] bg-primary rounded-[48px]">
          ورود
        </button>
        <button className="py-2 px-6 text-primary border border-primary rounded-[48px]">
          ثبت نام
        </button>
      </div>
    </div>
  );
};

export default Header;
