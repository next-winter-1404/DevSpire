"use client";
import { useTheme } from "@/utils/helper/useTheme";

const ToggleThem = () => {
  const { theme, setTheme, mounted } = useTheme();
  if (!mounted) return null;
  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full  cursor-pointer pr-6 "
    >
      {theme == "light" ? (
        <span className="bg-slate-700  transition-colors hover:bg-[#644DB3] transition-all duration-100">
          moon
        </span>
      ) : (
        <span className="bg-orange-400  transition-colors">sun</span>
      )}
    </div>
  );
};

export default ToggleThem;
