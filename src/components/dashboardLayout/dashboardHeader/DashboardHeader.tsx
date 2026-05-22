import Image from "next/image";
import ToggleTheme from "@/components/common/ToggleTheme";
import Home from "../../../../public/icons/Home";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Notification from "../../../../public/icons/Notification";
import { TUserRes } from "@/modules/customerDashboard/dashboard/components/CustomerDashboardCharts";

interface IDashboardHeader {
  hasNotification: boolean;
  userInfo: TUserRes | null;
}

const DashboardHeader = ({ hasNotification, userInfo }: IDashboardHeader) => {
  const t = useTranslations("sellerDashboard.header");

  return (
    <div
      className="flex justify-between w-full py-2 px-4 bg-[#F5F5F5] border
       border-[#DDDDDD] rounded-[24px]   
    dark:bg-[#404040] dark:border-[#777777]"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-[40px] bg-[#777777]/50 overflow-hidden
         relative "
        >
          <Image
            src={"/images/mortgageRentDetail/estate-owner.jpg"}
            alt="userProfile"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="font-regular text-[20px] text-[#1E2022]   dark:text-[#F5F5F5]">
              {userInfo?.user?.fullName ?? "بدون نام"}
            </span>
            <span className="font-regular text-[14px] text-[#0D3B66]   dark:text-[#E4E4E4]">
              {userInfo?.user?.role === "buyer"
                ? "(خریدار)"
                : userInfo?.user?.role == "seller"
                  ? "(فروشنده)"
                  : "(ادمین)"}
            </span>
          </div>
          <div className="flex items-center gap-1 font-regular text-[16px]">
            {/* <span className="text-[#1E2022]   dark:text-[#F5F5F5]">
              {t("balance")}
            </span>
            <span className="text-[#777777]   dark:text-[#E4E4E4]">
              30,000,000 تومان
            </span> */}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10">
          <LanguageSwitcher />
        </div>
        <ToggleTheme />
        {hasNotification && (
          <div className="p-2 rounded-full bg-[#0D3B66]">
            <Notification color="#FFFFFF" />
          </div>
        )}
        <Link
          href={"/"}
          className="p-2 bg-[#0D3B66] rounded-[40px] cursor-pointer"
        >
          <Home color="#FFFFFF" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
