import React from "react";
import Link from "next/link";
import Home from "@/icons/Home";
import Arrow from "@/icons/Arrow";

const Header = () => {
  return (
    <div className="flex justify-between mt-6 px-12">
      <div className="flex items-center gap-2">
        <Home />
        <span className="font-medium text-primary">لوگو</span>
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
        <Link href="/auth/login">

          <button className="py-2 px-6 text-[#FFFFFF] bg-primary rounded-[48px]">
            ورود
          </button>
        </Link>
        <Link href="/auth/register">

          <button className="py-2 px-6 text-primary border border-primary rounded-[48px]">
            ثبت نام
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Header;
