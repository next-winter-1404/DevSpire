"use client";
import { useTheme } from "@/utils/helper/useTheme";
import Moon from "../../../public/icons/Moon";
import Sun from "../../../public/icons/Sun";


const ToggleTheme = () => {


  const { theme, setTheme, mounted } = useTheme();
  if (!mounted) return null;


  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full  cursor-pointer  "
    >
      {theme == "light" ? (
        <div className="bg-slate-700/50 rounded-full transition-all duration-100 hover:bg-[#644DB3] p-2 flex items-center justify-center">
          <div className="relative w-5 h-5   md:w-[25px] md:h-[25px]">
            <Moon className="object-contain"/>
          </div>
        </div>
      ) : (
        <div className="bg-orange-400 p-2 rounded-full transition-colors flex items-center justify-center">
          <Sun className="w-5 h-5   md:w-[25px] md:h-[25px]"/>
        </div>
      )}
    </div>
  );
};

export default ToggleTheme;
