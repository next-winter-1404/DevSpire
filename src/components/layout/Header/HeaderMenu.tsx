import React from "react";
import Arrow from "../../../../public/icons/Arrow";
import Close from "../../../../public/icons/close.svg";
import Image from "next/image";

interface HeaderMenuProps {
  useToggleMenu: () => void;
}

const HeaderMenu = ({ useToggleMenu }: HeaderMenuProps) => {
  return (
    <div className="flex flex-col items-start gap-8 w-full h-full px-6 bg-[#FFFFFF] absolute top-0">
      <div onClick={useToggleMenu} className="flex justify-end w-full">
        <Image src={Close} alt="close" width={24} height={24} />
      </div>
      <span className="cursor-pointer">خانه</span>
      <div className="flex justify-between items-center w-full">
        <span className="cursor-pointer">رزرو سریع</span>
        <Arrow />
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="cursor-pointer">رهن و اجاره</span>
        <Arrow />
      </div>
      <span className="cursor-pointer">مقالات</span>
      <span className="cursor-pointer">درباره ما</span>
    </div>
  );
};

export default HeaderMenu;
