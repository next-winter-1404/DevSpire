"use client";
import { useState } from "react";
import ReserveInfo from "./ReserveInfo";
import CommentsSection from "./CommentsSection";
import { useTranslations } from "next-intl";
import { TArticle } from "@/components/common/types";


type Tab = "about" | "facilities" | "reviews";


const DetailTabs = ({ article }: { article: TArticle }) => {

  const t = useTranslations("articleDetail");

  const [activeTab, setActiveTab] = useState<Tab>("about");

  return (
    <div className="w-full flex flex-col items-start gap-6">
      <div className="flex gap-4  md:text-[20px]">
        <button
          onClick={() => setActiveTab("about")}
          className={`px-3 py-2 transition-colors rounded-[40px] cursor-pointer ${
            activeTab === "about"
              ? "bg-primary text-[#ffff]"
              : "bg-[#F5F5F5] text-[#777777] hover:text-gray-700"
          }`}
        >
          {t("articleText")}
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-3 py-2 transition-colors rounded-[40px] cursor-pointer  ${
            activeTab === "reviews"
              ? "bg-primary text-[#ffff]"
              : "bg-[#F5F5F5] text-[#777777] hover:text-gray-700"
          }`}
        >
          {t("userComments")}
        </button>
      </div>
      <div className="mt-4 w-full">
        {activeTab === "about" && <ReserveInfo article={article} />}
        {activeTab === "reviews" && <CommentsSection />}
      </div>
    </div>
  );
};

export default DetailTabs;
