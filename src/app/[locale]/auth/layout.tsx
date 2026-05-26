import AuthImagePanel from "@/modules/auth/components/AuthImagePanel";
import { Home } from "lucide-react";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen md:h-[850px] w-full px-4 md:px-8 py-2 md:flex md:items-center md:gap-10">
      <div className="bg-[#ffff] shadow-2xl rounded-[40px] w-full h-full p-6 md:px-8 md:py-8 dark:bg-[#27272A] flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </div>
      <div className="w-full h-full hidden md:block">
        <AuthImagePanel />
      </div>
    </div>
  );
}
