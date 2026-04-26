import React from "react";
import Home from "../../../public/icons/Home";
import Arrow from "../../../public/icons/Arrow";
import ToggleThem from "../common/ToggleTheme";

const Header = () => {

  return (
    <div className="flex justify-between w-ful mt-6 mx-auto px-12">
      <div className="flex items-center gap-2">
        <Home />
        <span className="font-medium text-[#0D3B66]">لوگو</span>
        <div>
          <ToggleThem />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <span className="cursor-pointer">خانه</span>
        <div className="flex items-center gap-2">
          <span className="cursor-pointer">رزرو سریع</span>
          <Arrow />
        </div>
        <div className="flex items-center gap-2">
          <span className="cursor-pointer">رهن و اجاره</span>
          <Arrow />
        </div>
        <span className="cursor-pointer">مقالات</span>
        <span className="cursor-pointer">درباره ما</span>
      </div>
      <div className="flex gap-6">
        <button className="py-2 px-6 text-[#FFFFFF] bg-[#0D3B66] rounded-[48px] cursor-pointer">
          ورود
        </button>
        <button className="py-2 px-6 text-[#0D3B66] border border-[#0D3B66] rounded-[48px] cursor-pointer">
          ثبت نام
        </button>
      </div>
    </div>
  );
};

export default Header;
