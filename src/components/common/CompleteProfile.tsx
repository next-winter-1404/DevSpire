"use client";
import PieChart from "@/components/common/PieChart";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface CompleteProfileProps {
  lastEditText?: string;
  percentage?: number;
  linkHref?: string;
  linkText?: string;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({
  lastEditText,
  percentage,
  linkHref = "",
}) => {
  const t = useTranslations("customerDashboard.dashboard");

  return (
    <div className="flex flex-col flex-grow p-6 bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[20px] text-[#1E2022] dark:text-[#F5F5F5]">
            {t("profCompletionChart")}
          </h2>
          <p className="font-regular text-[16px] text-[#777777] dark:text-[#E4E4E4]">
            پروفایل باید حداقل ۷۰٪ تکمیل شده باشد.
          </p>
        </div>
        <Link
          href={linkHref}
          className="py-[10px] px-4 border border-[#DDDDDD] rounded-[40px]"
        >
          ویرایش پروفایل
        </Link>
      </div>
      <div className="flex justify-between items-end">
        <span className="font-regular text-[14px] text-[#777777] dark:text-[#E4E4E4]">
          {lastEditText}
        </span>
        <PieChart percentage={percentage} size={130} color="#0D3B66" />
      </div>
    </div>
  );
};

export default CompleteProfile;
