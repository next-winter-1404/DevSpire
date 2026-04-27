"use client";
import { useTheme } from "@/utils/helper/useTheme";
import Image from "next/image";

const ToggleThem = () => {
  const { theme, setTheme, mounted } = useTheme();
  if (!mounted) return null;
  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full  cursor-pointer pr-6 "
    >
      {theme == "light" ? (
        <div className="bg-slate-700/50 rounded-full  transition-colors hover:bg-[#644DB3] transition-all duration-100 p-2">
          <Image
            src="/icons/fastReservePage/moon.svg"
            alt="sun"
            width={25}
            height={25}
            className=""
          />
        </div>
      ) : (
        // <span className="bg-orange-400  transition-colors">sun</span>
        <div className="bg-orange-400 p-2 rounded-full transition-colors">
          <Image
            src="/icons/fastReservePage/sun.svg"
            alt="sun"
            width={25}
            height={25}
            className=""
          />
        </div>
      )}
    </div>
  );
};

export default ToggleThem;
