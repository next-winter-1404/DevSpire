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
  percentage = 0,
  linkHref = "",
  linkText,
}) => {
  const t = useTranslations("customerDashboard.dashboard");

  return (
    <div className="w-full rounded-[24px] bg-white p-4 sm:p-5 md:p-6 dark:bg-[#262626]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1E2022] dark:text-[#F5F5F5]">
            {t("profCompletionChart")}
          </h2>
          <p className="text-[14px] sm:text-[16px] leading-6 text-[#777777] dark:text-[#E4E4E4]">
            {t("profileCompletionHint")}
          </p>
        </div>

        <Link
          href={linkHref}
          className="w-fit rounded-[40px] border border-[#DDDDDD] px-4 py-[10px] text-sm sm:text-base"
        >
          {linkText || t("editProfile")}
        </Link>
      </div>

      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
        <span className="text-[13px] sm:text-[14px] text-[#777777] dark:text-[#E4E4E4]">
          {lastEditText || t("lastEditUnknown")}
        </span>

        <div className="flex justify-center md:justify-end">
          <PieChart percentage={percentage} size={110} color="#0D3B66" />
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
